# 初始化 RESTful API 风格的博客系统

在 HelloDjango 全栈系列教程的第一步——**[Django博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)**中，我们一步步地开发了一个功能完善的个人博客系统。

接下来，我们将使用 django-rest-framework，一步步为博客系统开发 RESTful API，并在这个过程中深入学习 django-rest-framework 的使用方法，为后续使用 Vue 开发博客应用提供后端 API 的支持（Vue 的开发教程将在 Django REST Framework 教程完结后推出，敬请期待）。

如果你已经跟着第一步的教程 **[Django博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)**完成了博客系统的开发，那么可以继续在原来的项目上进行，只需要注意和这个教程中个别细微的差异就可以了。

你也可以 fork 新仓库的项目，新仓库和 **[Django博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)**中示例仓库代码几乎完全一样，只是个别地方（例如 Docker 容器名、镜像名等）做了一些修改，以体现本教程的特色。

随便以哪个仓库为基础，你都可以顺畅地跟进本教程。

项目代码准备好以后，先来把本地开发环境搭建起来，过程非常简单，只需要执行几条命令就可以了。这里以 Pipenv 为例，Virtualenv 或者 Docker 的启动方式可以参考项目的 **[README](https://link.zhihu.com/?target=https%3A//github.com/HelloGitHub-Team/HelloDjango-REST-framework-tutorial)**。

> **注意：**
> 因为博客全文搜索功能依赖 Elasticsearch 服务，如果使用 Virtualenv 或者 Pipenv 启动项目而不想搭建 Elasticsearch 服务的话，请先设置环境变量 `ENABLE_HAYSTACK_REALTIME_SIGNAL_PROCESSOR=no` 以关闭实时索引，否则无法创建博客文章。如果关闭实时索引，全文搜索功能将不可用。
> Windows 设置环境变量的方式：`set ENABLE_HAYSTACK_REALTIME_SIGNAL_PROCESSOR=no`
> Linux 或者 macOS：`export ENABLE_HAYSTACK_REALTIME_SIGNAL_PROCESSOR=no`
> 使用 Docker 启动则无需设置，因为会自动启动一个包含 Elasticsearch 服务的 Docker 容器。

**第一步**，进入项目的根目录，安装项目启动所需依赖。关于虚拟环境的管理，如果不熟悉的话可以参考：

```shell
# --dev 参数会指导 pipenv 同时安装线上运行时的依赖以及开发时所需的依赖
$ pipenv install --dev
```

**第二步**，生成数据库文件。

```shell
$ pipenv run python manage.py migrate
```

**第三步**，创建后台管理员账户。

```shell
$ pipenv run python manage.py createsuperuser
```

具体请参阅 **[创作后台开启，请开始你的表演](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/materials/65/)**。

**第四步**，运行开发服务器。

```shell
$ pipenv run python manage.py runserver
```

浏览器访问 [http://127.0.0.1:8000/](https://link.zhihu.com/?target=http%3A//127.0.0.1%3A8000/) 可进入博客首页，[http://127.0.0.1:8000/admin](https://link.zhihu.com/?target=http%3A//127.0.0.1%3A8000/admin) 为博客后台，可以使用 **第三步** 创建的超级管理员账户登录。

**第五步**，为了方便开发和测试，运行脚本生成一些虚拟的测试数据。

```shell
$ pipenv run python -m scripts.fake
```

这样，基础项目就启动成功了~

接下来就可以开始进行 RESTful API 的开发了。既然要使用 django-rest-framework，第一件事当然是先安装它。进入到项目根目录，运行：

```shell
$ pipenv install djangorestframework django-filter
```

django-filter 这个库用来提供 API 查询结果过滤的功能，我们后面会讲到怎么用。

将 django-rest-framework 添加到 `INSTALLED_APPS` 里：

```python
blogproject/settings/common.py

INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

django-rest-framework 还为我们提供了一个与 API 进行交互的后台，有时候 API 可能需要登录认证，因此将 django-rest-framework 提供 API 交互后台和登录认证 URL 添加进来：

```python
blogproject/urls.py

from rest_framework import routers

router = routers.DefaultRouter()
urlpatterns = [
    ...
    path("api/", include(router.urls)),
    path("api/auth/", include("rest_framework.urls", namespace="rest_framework")),
]
```

这里我们用到了 django-rest-framework 的 Router，它能帮我们自动注册视图函数到指定的 URL 路径。`DefaultRouter` 类默认会帮我们生成一个API 交互后台的根视图，直接访问 [http://127.0.0.1:8000/api/](https://link.zhihu.com/?target=http%3A//127.0.0.1%3A8000/api/) 就可以进入 API 交互后台。

![img](C:\Users\64206\Desktop\django-rest-framework\img\2\1.jpg)

这个页面会列出所有可用的 API，因为现在没有开发任何 API，所以列表为空。

点击右上角的 Log in 可进行认证登录，登录后就能和需要认证登录才能访问的 API 进行交互。

这个 API 交互后台是我们开发调试的利器，我们以后还会不断接触，到时候大家就能体会到他的作用了。

至此，django-rest-framework 的安装和基本设置已经完成，接下来就来开始开发博客 API 了。