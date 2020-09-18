# Django-rest-framework 是个什么鬼？

我们首先来回顾一下传统的基于模板引擎的 django 开发工作流：

1. 绑定 URL 和视图函数。当用户访问某个 URL 时，调用绑定的视图函数进行处理。
2. 编写视图函数的逻辑。视图中通常涉及数据库的操作。
3. 在视图中渲染 HTML 模板，返回 HTTP 响应。

其实，基于 django-rest-framework 的 RESTful API 的开发，过程是完全类似的：

1. 绑定 URL 和视图函数。当用户访问某个 URL 时，调用绑定的视图函数进行处理。
2. 编写视图函数的逻辑，根据 HTTP 请求类型，对请求的资源进行相应操作，这个过程通常涉及数据库的操作。
3. 使用约定的资源描述格式（例如 XML 或者 JSON）序列化资源并将数据返回给客户端（通过 HTTP 响应）。

对比发现，前两步几乎是完全相同的。不同点在于，在传统的基于模板引擎的开发方式中，资源使用 HTML 文档进行描述并返回给客户端，而在 RESTful API 的开发方式中，资源通常被描述为 JSON 或者 XML 的格式返回给客户端。

有的同学就要问了，虽然 django 的视图函数通常情况下返回 HTML 文档的响应，但是 django 也支持返回 XML 格式或者 JSON 格式的响应，那么为什么还要使用 django-rest-framework 呢？

事实上，的确能够在 django 中返回 JSON 或者 XML 格式的数据，但是 django 框架本身只提供了十分基础的功能。django-rest-framework 是基于 django 的拓展，专为 RESTful API 的开发而设计，提供了十分丰富的辅助类和函数，帮助我们方便地开发 API。下面就来简单介绍 django-rest-framework 为我们提供了哪些功能特性，这些功能和特性我们在接下来的实战中会进一步学习其用法，这里可以先从宏观层面，做一个简单的了解。

- 内容协商（Content Negotiation）。之前说过，在 RESFful 架构的系统中，资源以某种描述形式在客户端和服务器之间传递，django-rest-framework 根据客户端能够接受的资源格式，自动使用合适的资源描述工具，返回客户端可接受的资源。
- 认证与鉴权（Authentication and Permission）。客户端对资源的操作通常是受限的，有些资源只能由经过身份认证或具有相应权限的用户才能操作，django-rest-framework 提供了丰富的认证类和鉴权类，帮助我们对用户的身份和权限进行校验。
- 序列化（Serialization）。django 基于 Python 语言开发，因此资源通常由 Python 对象描述，那么在传递给客户端时，就要进行转换，例如将 Python 对象转换为 JSON 字符串，这个过程就叫做序列化。django 内置的序列化器功能有限，django-rest-framework 提供了功能更加丰富和强大的序列化器，让资源的序列化工作变得异常简单。
- 各种通用视图（Generic Views）。django 针对 Web 开发中常见的处理逻辑，提供了各种通用视图函数，以提高代码的复用性，减少开发者的工作量。django-rest-framework 同样针对 RESTful API 开发中常见的处理逻辑，提供了各种通用视图函数。
- 路由自动生成器（Router）。django-rest-framework 根据编写的视图函数，自动生成符合 RESTful 设计的 URL 路由。
- 文档（Documentation）。django-rest-framework 基于 OpenAPI 模式自动生成 API 文档，无需我们手动编写和维护。

除此以外，django-rest-framework 还提供了分页（Pagination）、API 版本控制（Versioning）、缓存（Caching）、限流（Throtting）等各种功能类。

在接下来的实战教程中，我们会逐一的学习并使用它们。

让我们正式开启 django-rest-framework 的学习之旅吧！