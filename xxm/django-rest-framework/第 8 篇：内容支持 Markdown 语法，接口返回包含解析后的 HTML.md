# 第 8 篇：内容支持 Markdown 语法，接口返回包含解析后的 HTML

在 **[Django博客教程（第二版）](https://link.zhihu.com/?target=https%3A//www.zmrenwu.com/courses/hellodjango-blog-tutorial/)** 中，我们给博客内容增加了 Markdown 的支持，博客详情接口应该返回解析后的 HTML 内容。

来回顾一下 `Post` 模型的代码，Markdown 解析后的 HTML 保存在这几个属性中：

```python
class Post(models.Model):
    # ...
    
    @property
    def toc(self):
        return self.rich_content.get("toc", "")

    @property
    def body_html(self):
        return self.rich_content.get("content", "")

    @cached_property
    def rich_content(self):
        return generate_rich_content(self.body)
```

`rich_content` 是 `body` Markdown 内容解析后的 HTML 内容，使用了 `cached_property` 装饰器缓存解析后的结果，以降低多次访问的开销。`body_html` 属性为解析后的正文内容，`toc` 属性是从正文标题中提取的目录。

`toc` 和 `body_html` 这两个属性的值是我们需要序列化并在接口中返回的，那么可否像之前那样，直接在序列化器 `PostRetrieveSerializer` 的 `Meta.fields` 中添加这两个属性就行了呢？

答案是不能。之前说过，模型字段不同类型的值都需要不同的序列化字段对其进行序列化，我们之所以能直接在 `Meta.fields` 中指定需要序列化的字段而不需要额外的代码是因为这些字段都是直接定义在 django 的模型中的。django-rest-framework 可以根据模型中的字段的定义自动推断该使用何种类型的序列化字段，但对于这里提到的 `toc`、`body_html` 属性，django-rest-framework 就无法推断其值的类型，也就无法自动使用对应的序列化字段对其进行序列化了。不过解决方法很简单，既然 django-rest-framework 无法自动推断，那我们就人工指定该使用何种类型的序列化字段就行了。

这里需要序列化的字段值都是字符串，因此在序列化器中显示地指定需要序列化的字段以及使用的系列化字段类型就可以了：

```python
class PostRetrieveSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    author = UserSerializer()
    tags = TagSerializer(many=True)
    toc = serializers.CharField()
    body_html = serializers.CharField()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "body",
            "created_time",
            "modified_time",
            "excerpt",
            "views",
            "category",
            "author",
            "tags",
            "toc",
            "body_html",
        ]
```

添加完成后，访问一篇文章的详情接口，就可以看到被序列化并返回的文章目录和正文 HTML 内容了。