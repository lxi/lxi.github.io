# 欢迎来到 HelloDjango 全栈系列教程第二步——Django REST Framework 教程！

![img](C:\Users\64206\Desktop\django-rest-framework\img\Django REST Framework.jpg)

首先恭喜你完成了 HelloDjango 全栈系列教程的第一步——**[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)**，在这个教程中，我们学习了基于传统模板引擎的开发方式，前端展示的 HTML 页面由后端负责渲染，后端程序员包揽了前后端开发的全部工作。

但是随着前端技术的演进，前后端分离的开发方式变得越来越流行。稍有规模的公司大都采用前后端分离的开发方式，在这种开发方式下，后端程序员只需关注业务逻辑，通过接口返回业务数据，无需懂得 HTML、CSS、JavaScript 这些前端语言（当然作为优秀的程序员，虽然不用再写，但这些都还是要懂的）；前端程序员，则可以使用借助 Vue、React 等优秀的 js 框架以及 Webpack 等打包工具，专注于页面开发。而将他们联系起来的桥梁就是前后端之间数据交互的接口规范。

现在最流行的数据交互接口规范当然要属 REST 规范。REST 全称 Representational State Transfer，意为"表现层状态转化"。简单来说，在符合 REST 原则的 RESTful 架构中，一个 URL 代表某个网络资源，网络资源可以指一篇博客文章、一张图片、一首歌曲或者一种服务等。资源通常由某种标准化的格式进行描述，描述资源的格式有很多种，例如 HTML 文档就是一种描述形式。在此之前，XML 是最为常用的格式，但现在，也有越来越多的系统采用 JSON 这种更加轻量的描述形式。在客户端和服务器交互时，资源便以某种描述的格式进行传递。客户端则使用 HTTP 协议，充分借助 HTTP 协议的动词（例如 GET、POST）来表达对服务端资源进行某种操作的意图，例如 GET 用来获取资源，POST 用来新建资源（也可以用于更新资源），PUT 用来更新资源，DELETE 用来删除资源。

因此，假设我们的系统采用 RESTful 架构，对于前端工程师来说，他的工作就是根据渲染的页面，向后端发起符合 RESTful 风格的 HTTP 请求，获取接口返回的数据，渲染前端页面。而对于后端程序员来说，就是要编写接口，解读前端发来的请求，对资源进行相应操作并返回前端需要的数据。

如何解读前端的请求、如何使用指定的格式描述并传递资源等都是一系列标准化且重复的工作，所以可以由一套统一的框架来实现。django 本身没有提供这样的处理框架，但 django 的第三方拓展——django-rest-framework 就是一套专门用来开发符合 REST 规范的 RESTful 接口的框架。可以说在现在这个前后端分离的大环境下，django 开发基本离不开 django-rest-framework。因此接下来的教程里，我们将全面学习 django-rest-framework 的使用。

我们的示例项目将延续 **[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)** 中开发的博客，如果你是跟着教程到这里的话，那你可以很顺畅地继续走下去。如果你没有看上一部教程也没有关系，在 django-rest-framework 教程正式开始之前会指导大家如何一步步将博客运行起来。django-rest-framework 教程虽然延续 **[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)** 中的项目，但在内容上并无太大关联，如果你已经有了 django 基础（了解 ORM 以及类视图就行），就可以直接开始本教程。当然如果是纯 django 新手，对 django 中的基础概念还比较陌生的话，推荐先学习 **[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)**，打好基础，再来学习本教程会事半功倍。

欢迎来到 HelloDjango 全栈系列教程第二步——Django REST Framework 教程！

首先恭喜你完成了 HelloDjango 全栈系列教程的第一步——**[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)**，在这个教程中，我们学习了基于传统模板引擎的开发方式，前端展示的 HTML 页面由后端负责渲染，后端程序员包揽了前后端开发的全部工作。

但是随着前端技术的演进，前后端分离的开发方式变得越来越流行。稍有规模的公司大都采用前后端分离的开发方式，在这种开发方式下，后端程序员只需关注业务逻辑，通过接口返回业务数据，无需懂得 HTML、CSS、JavaScript 这些前端语言（当然作为优秀的程序员，虽然不用再写，但这些都还是要懂的）；前端程序员，则可以使用借助 Vue、React 等优秀的 js 框架以及 Webpack 等打包工具，专注于页面开发。而将他们联系起来的桥梁就是前后端之间数据交互的接口规范。

现在最流行的数据交互接口规范当然要属 REST 规范。REST 全称 Representational State Transfer，意为"表现层状态转化"。简单来说，在符合 REST 原则的 RESTful 架构中，一个 URL 代表某个网络资源，网络资源可以指一篇博客文章、一张图片、一首歌曲或者一种服务等。资源通常由某种标准化的格式进行描述，描述资源的格式有很多种，例如 HTML 文档就是一种描述形式。在此之前，XML 是最为常用的格式，但现在，也有越来越多的系统采用 JSON 这种更加轻量的描述形式。在客户端和服务器交互时，资源便以某种描述的格式进行传递。客户端则使用 HTTP 协议，充分借助 HTTP 协议的动词（例如 GET、POST）来表达对服务端资源进行某种操作的意图，例如 GET 用来获取资源，POST 用来新建资源（也可以用于更新资源），PUT 用来更新资源，DELETE 用来删除资源。

因此，假设我们的系统采用 RESTful 架构，对于前端工程师来说，他的工作就是根据渲染的页面，向后端发起符合 RESTful 风格的 HTTP 请求，获取接口返回的数据，渲染前端页面。而对于后端程序员来说，就是要编写接口，解读前端发来的请求，对资源进行相应操作并返回前端需要的数据。

如何解读前端的请求、如何使用指定的格式描述并传递资源等都是一系列标准化且重复的工作，所以可以由一套统一的框架来实现。django 本身没有提供这样的处理框架，但 django 的第三方拓展——django-rest-framework 就是一套专门用来开发符合 REST 规范的 RESTful 接口的框架。可以说在现在这个前后端分离的大环境下，django 开发基本离不开 django-rest-framework。因此接下来的教程里，我们将全面学习 django-rest-framework 的使用。

我们的示例项目将延续 **[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)** 中开发的博客，如果你是跟着教程到这里的话，那你可以很顺畅地继续走下去。如果你没有看上一部教程也没有关系，在 django-rest-framework 教程正式开始之前会指导大家如何一步步将博客运行起来。django-rest-framework 教程虽然延续 **[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)** 中的项目，但在内容上并无太大关联，如果你已经有了 django 基础（了解 ORM 以及类视图就行），就可以直接开始本教程。当然如果是纯 django 新手，对 django 中的基础概念还比较陌生的话，推荐先学习 **[Django 博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)**，打好基础，再来学习本教程会事半功倍。