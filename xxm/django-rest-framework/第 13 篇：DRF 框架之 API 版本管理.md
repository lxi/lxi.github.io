# 第 13 篇：DRF 框架之 API 版本管理

API 不可能一成不变，无论是新增或者删除已有 API，都会对调用它的客户端产生影响。如果对 API 的增删没有管理，随着 API 的增增减减，调用它的客户端就会逐渐陷入迷茫，到底哪个 API 是可用的？为什么之前可用的 API 又不可用了，新增了哪些 API 可以使用？为了方便 API 的管理，我们引入版本功能。

给 API 打上版本号，在某个特定版本下，原来已有的 API 总是可用的。如果要对 API 做重大变更，可以发布一个新版本的 API，并及时提醒用户 API 已变更，敦促用户迁移到新的 API，这样可以给客户端提供一个缓冲过渡期，不至于昨天能用的 API，今天突然报错了。

django-rest-framework 提供了多个 API 版本辅助类，分别实现不同的 API 版本管理方式。比较实用的有：

**AcceptHeaderVersioning**

这个类要求客户端在 HTTP 的 Accept 请求头加上版本号以表明想请求的 API 版本，例如如下请求：

```text
GET /bookings/ HTTP/1.1
Host: example.com
Accept: application/json; version=1.0
```

这将请求版本号为 1.0 的接口。

**URLPathVersioning**

这个类要求客户端在请求的 url 中指定版本号，一个缺点是你在书写 URL 模式时，必须包含关键字为 version 的模式，例如官网的一个例子：

```text
urlpatterns = [
    url(
        r'^(?P<version>(v1|v2))/bookings/$',
        bookings_list,
        name='bookings-list'
    ),
    url(
        r'^(?P<version>(v1|v2))/bookings/(?P<pk>[0-9]+)/$',
        bookings_detail,
        name='bookings-detail'
    )
]
```

这样的话很不方便，因此我们一般不使用。

**NamespaceVersioning**

和上面提到的 `URLPathVersioning` 类似，只不过版本号不是在 URL 模式中指定，而是通过 `namespace` 参数指定 （稍后我们将看到它的具体用法）。

当然，django-rest-framework 还提供了其它诸如 `HostNameVersioning`、`QueryParameterVersioning` 的版本管理辅助类，可自行查看文档了解：[https://www.django-rest-framework.org/api-guide/versioning/](https://link.zhihu.com/?target=https%3A//www.django-rest-framework.org/api-guide/versioning/)

综合来看，`NamespaceVersioning` 模式便于 URL 的设计与管理，因此我们的博客应用决定采用这种 API 版本管理方式。

为了开启 api 版本管理，在项目的配置中加入如下配置：

```text
settings/common.py

REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'DEFAULT_VERSION': 'v1'
}
```

以上两项设置分别全局指定使用的 API 版本管理方式和客户端缺省版本号的情况下默认请求的 API 版本。尽管这些配置项也可以在单个视图或者视图集的范围内指定，但是，统一的版本管理模式更为可取，因此我们在全局配置中指定。

接着在注册的 API 接口前带上版本号：

```text
blogproject/urls.py

urlpatterns = [
    # ...
    path("api/v1/", include((router.urls, "api"), namespace="v1")),
]
```

注意这里比之前多了个 `namespace` 参数，参数值为 v1，代表包含的 URL 模式均属于 v1 这个命名空间。还有一点需要注意，对于 `include` 函数，如果指定了 `namespace` 的值，第一个参数必须是一个元组，形式为：(url_patterns, app_name)，这里我们将 app_name 指定为 api。

一旦我们开启了版本管理，所有请求对象 request 就会多出一个属性 `version`，其值为用户请求的版本号（如果没有指定，就为默认的 `DEFAULT_VERSION` 的值）。因此，我们可以在请求中针对不同版本的请求执行不同的代码逻辑。比如我们的博客修改文章列表 API，序列化器对返回数据的字段做了一些改动，发布在版本 v2，那么可以根据用户用户请求的版本，返回不同的数据，即新增了 API，又保持对原 api 的兼容：

```text
if request.version == 'v1':
 return PostSerializerV1()
return PostSerializer
```

if 分支可以视为一段临时代码，我们可以通过适当的方式提醒用户，API 已经更改，请尽快迁移到新的版本 v2，并且在未来的某个时间，确认大部分用户都成功迁移到新版api后移除掉这些代码，并将默认版本设为v2，这样原本的 v1 版本的 API 就彻底被废弃了。

当然，我们目前的博客接口还暂时没有需要修改升级的地方，不过为了测试 API 版本管理的设置是否生效了，我们认为添加一个测试用的视图集，在里面做针对不同版本请求的处理，看看不同版本的请求下是否会返回符合预期的不同内容。

首先在 blog/views.py 中加一个简单的测试视图集，这个视图集中有个测试用的接口，接口处理逻辑是根据不同的版本号，返回不同的内容：

```text
class ApiVersionTestViewSet(viewsets.ViewSet):
    @action(
        methods=["GET"], detail=False, url_path="test", url_name="test",
    )
    def test(self, request, *args, **kwargs):
        if request.version == "v1":
            return Response(
                data={
                    "version": request.version,
                    "warning": "该接口的 v1 版本已废弃，请尽快迁移至 v2 版本",
                }
            )
        return Response(data={"version": request.version})
```

当然视图集别忘了在 router 中注册：

```text
blogproject/urls.py

# 仅用于 API 版本管理测试
router.register(
    r"api-version", blog.views.ApiVersionTestViewSet, basename="api-version"
)
```

这相当于一次接口版本升级，我们再加入 v2 命名空间的接口：

```text
urlpatterns = [
    path("api/v1/", include((router.urls, "api"), namespace="v1")),
    path("api/v2/", include((router.urls, "api"), namespace="v2")),
]
```

可以看到，包含的 URL 都是一样的，只是 namespace 是 v2。

来测试一下效果，启动开发服务器，先访问版本号为 v1 的测试接口，请求返回结果如下，可以看到如期返回了 v1 版本下的内容：

```text
GET /api/v1/api-version/test/

HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "version": "v1",
    "warning": "该接口的 v1 版本已废弃，请尽快迁移至 v2 版本"
}
```

再访问版本号为 v2 的测试接口，返回的内容就是 v2 了。

```text
GET /api/v2/api-version/test/

HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "version": "v2"
}
```

对于其它接口，无论 v1，v2 版本的接口均可以访问，这样就相当于完成了一次兼容的接口升级。