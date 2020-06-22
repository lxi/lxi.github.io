# 第 4 篇：用类视图实现首页 API

django-rest-framework 类视图拓展自 django 的类视图，只是针对数据的序列化和反序列化等逻辑做了封装。

django-rest-framework 中最基本的类视图是 `views.APIView`，这个类可以看成是上一篇教程中用到的 api_view 装饰器的类版本。这个类比较基础，其核心功能就是 HTTP 请求预处理、分发请求给对应的处理函数，以及 HTTP 响应后处理，还有就是 `as_view` 方法将类转为函数（要注意与被请求的 URL 绑定的视图必须是一个可调用对象，普通的的类是无法被直接调用的）。除非需要深度定制视图函数的逻辑，一般情况下我们的视图不会直接继承这个类。

更为通用的类视图是 `GenericAPIView`，这个类继承自 `APIView`，对基类的功能做了拓展。继承自这个类的视图，只需对其类属性做一些简单的配置，就能获得获取单个资源、获取资源列表、资源列表分页等功能。当然，这个类作为其他特定功能类视图的基类，我们一般也很少使用。

回顾一下此前讲的 RESTful 架构的基本概念，客户端使用 URL 访问资源，通过 HTTP 请求的动词表达对资源的操作。django-rest-framework 针对各种类型的资源操作，提供了对应的通用类视图，这些通用类视图主要包括：

- **CreateAPIView**
  用于创建资源的 POST 请求。
- **ListAPIView** 和 **RetrieveAPIView**
  用于访问资源列表和单个资源的 GET 请求。
- **DestroyAPIView**
  用于删除资源的 DELETE 请求。
- **UpdateAPIView**
  用于更新资源的 PUT（全量更新）和 PATCH（部分更新）请求。

以及以上视图的各种组合通用类视图：`ListCreateAPIView`、`RetrieveUpdateAPIView`、`RetrieveDestroyAPIView`、`RetrieveUpdateDestroyAPIView`。

博客首页 API 返回首页文章列表数据，显然应该选用的是 `ListAPIView`。其代码如下：

```python
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

class IndexPostListAPIView(ListAPIView):
    serializer_class = PostListSerializer
    queryset = Post.objects.all()
    pagination_class = PageNumberPagination
    permission_classes = [AllowAny]
```

That all！首页 API 就写好了。我们基本没有写任何逻辑代码，只是指定了类视图的几个属性值。因为逻辑基本都是通用的，通用类视图在背后帮我们做了全部工作，我们只要告诉它：用哪个序列化器去做，序列化哪个资源等就可以了。以这里的类视图为例，我们指定了：

使用 `PostListSerializer` 序列化器（通过 `serializer_class` 指定）；

序列化博客文章（Post）列表（通过 `queryset` 指定）；

对资源列表分页（通过 `pagination_class` 指定，`PageNumberPagination` 会自动对资源进行分页，后面的教程会详细介绍分页功能）；

允许任何人访问该资源（通过 `permission_classes` 指定，`AllowAny` 权限类不对任何访问做拦截，即允许任何人调用这个 API 以访问其资源）。

最后一步就是在 urls.py 中绑定接口，把原来绑定的函数视图改为现在的类视图：

```python
path('api/index/', views.IndexPostListAPIView.as_view())
```

启动开发服务器，打开浏览器访问 [http://127.0.0.1:8000/api/index/](https://link.zhihu.com/?target=http%3A//127.0.0.1%3A8000/api/index/)，可以看到和上一篇教程中使用函数视图返回的结果是一样的：

```json
{
    "count": 201,
    "next": "http://127.0.0.1:10000/api/index/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "title": "Markdown 与代码高亮测试",
            "created_time": "2020-04-23T14:22:36.129383+08:00",
            "excerpt": "欢迎使用马克飞象\n@(示例笔记本)[马克飞象|帮助|Markdown]\n马克飞象是一款专为印象笔记（Ever",
            "category": {
                "id": 6,
                "name": "Markdown测试"
            },
            "author": {
                "id": 1,
                "username": "admin"
            },
            "views": 0
        }
    ]
}
```

而且可以看到，返回的结果进行了分页，next 字段指示了下一页的链接，这样分页访问资源就变的非常方便了。