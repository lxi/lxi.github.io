const katex = require('katex');
// import katex from 'katex';
var hljs = require('highlight.js');
// hljs 只针对pre code 里面的样式
 
hljs.registerLanguage('actionscript', require('highlight.js/lib/languages/actionscript'));
hljs.registerLanguage('apache',       require('highlight.js/lib/languages/apache'));
hljs.registerLanguage('armasm',       require('highlight.js/lib/languages/armasm'));
hljs.registerLanguage('xml',          require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('asciidoc',     require('highlight.js/lib//languages/asciidoc'));
hljs.registerLanguage('avrasm',       require('highlight.js/lib/languages/avrasm'));
hljs.registerLanguage('bash',         require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('clojure',      require('highlight.js/lib/languages/clojure'));
hljs.registerLanguage('cmake',        require('highlight.js/lib/languages/cmake'));
hljs.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'));
hljs.registerLanguage('cpp',          require('highlight.js/lib/languages/cpp'));
hljs.registerLanguage('arduino',      require('highlight.js/lib/languages/arduino'));
hljs.registerLanguage('css',          require('highlight.js/lib/languages/css'));
hljs.registerLanguage('diff',         require('highlight.js/lib/languages/diff'));
hljs.registerLanguage('django',       require('highlight.js/lib/languages/django'));
hljs.registerLanguage('dockerfile',   require('highlight.js/lib/languages/dockerfile'));
hljs.registerLanguage('ruby',         require('highlight.js/lib/languages/ruby'));
hljs.registerLanguage('fortran',      require('highlight.js/lib/languages/fortran'));
hljs.registerLanguage('glsl',         require('highlight.js/lib/languages/glsl'));
hljs.registerLanguage('go',           require('highlight.js/lib/languages/go'));
hljs.registerLanguage('groovy',       require('highlight.js/lib/languages/groovy'));
hljs.registerLanguage('handlebars',   require('highlight.js/lib/languages/handlebars'));
hljs.registerLanguage('haskell',      require('highlight.js/lib/languages/haskell'));
hljs.registerLanguage('ini',          require('highlight.js/lib/languages/ini'));
hljs.registerLanguage('java',         require('highlight.js/lib/languages/java'));
hljs.registerLanguage('javascript',   require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json',         require('highlight.js/lib/languages/json'));
hljs.registerLanguage('less',         require('highlight.js/lib/languages/less'));
hljs.registerLanguage('lisp',         require('highlight.js/lib/languages/lisp'));
hljs.registerLanguage('livescript',   require('highlight.js/lib/languages/livescript'));
hljs.registerLanguage('lua',          require('highlight.js/lib/languages/lua'));
hljs.registerLanguage('makefile',     require('highlight.js/lib/languages/makefile'));
hljs.registerLanguage('matlab',       require('highlight.js/lib/languages/matlab'));
hljs.registerLanguage('mipsasm',      require('highlight.js/lib/languages/mipsasm'));
hljs.registerLanguage('perl',         require('highlight.js/lib/languages/perl'));
hljs.registerLanguage('nginx',        require('highlight.js/lib/languages/nginx'));
hljs.registerLanguage('objectivec',   require('highlight.js/lib/languages/objectivec'));
hljs.registerLanguage('php',          require('highlight.js/lib/languages/php'));
hljs.registerLanguage('python',       require('highlight.js/lib/languages/python'));
hljs.registerLanguage('rust',         require('highlight.js/lib/languages/rust'));
hljs.registerLanguage('scala',        require('highlight.js/lib/languages/scala'));
hljs.registerLanguage('scheme',       require('highlight.js/lib/languages/scheme'));
hljs.registerLanguage('scss',         require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('smalltalk',    require('highlight.js/lib/languages/smalltalk'));
hljs.registerLanguage('stylus',       require('highlight.js/lib/languages/stylus'));
hljs.registerLanguage('swift',        require('highlight.js/lib/languages/swift'));
hljs.registerLanguage('tcl',          require('highlight.js/lib/languages/tcl'));
hljs.registerLanguage('typescript',   require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('verilog',      require('highlight.js/lib/languages/verilog'));
hljs.registerLanguage('vhdl',         require('highlight.js/lib/languages/vhdl'));
hljs.registerLanguage('yaml',         require('highlight.js/lib/languages/yaml'));

var mdHtml;
var defaults = {
  html:         true,        // 在源中启用HTML标记
  xhtmlOut:     false,        // 使用“/”关闭单个标记（<br/>）
  breaks:       true,        // 将段落中的'\n'转换为<br>
  langPrefix:   'language-',  // 栅栏块的CSS语言前缀
  linkify:      true,         // 自动将类似URL的文本转换为链接
  typographer:  true,         // 启用smartypants和其他甜美的转换

  // options below are for demo only
  _highlight: true,
  _strict: false,
  _view: 'html'               // html / src / debug
};
defaults.highlight = function (str, lang) {
  var esc = mdHtml.utils.escapeHtml;

  try {
    if (!defaults._highlight) {
      throw 'highlighting disabled';
    }

    if (lang && lang !== 'auto' && hljs.getLanguage(lang)) {

      return '<pre class="hljs language-' + esc(lang.toLowerCase()) + '"><code>' +
             hljs.highlight(lang, str, true).value +
             '</code></pre>';

    } else if (lang === 'auto') {

      var result = hljs.highlightAuto(str);

      /*eslint-disable no-console*/
      console.log('highlight language: ' + result.language + ', relevance: ' + result.relevance);

      return '<pre class="hljs language-' + esc(result.language) + '"><code>' +
             result.value +
             '</code></pre>';
    }
  } catch (__) { /**/ }

  return '<pre class="hljs"><code>' + esc(str) + '</code></pre>';
};

// 该方法用来按需实例化markdownit为mdHtml
function mdInit() {
    mdHtml = window.markdownit(defaults)
      .use(require('markdown-it-abbr'))
      .use(require('markdown-it-container'), 'warning')
      .use(require('markdown-it-deflist'))
      .use(require('markdown-it-emoji'))
      .use(require('markdown-it-footnote'))
      .use(require('markdown-it-ins'))
      .use(require('markdown-it-mark'))
      .use(require('markdown-it-sub'))
      .use(require('markdown-it-sup'))
      .use(require('markdown-it-imsize'), { autofill: true })
      .use(require('markdown-it-attrs'),{
        // optional, these are default options
        leftDelimiter: '{',
        rightDelimiter: '}',
        allowedAttributes: []  // empty array = all attributes are allowed
      }) // 可以添加class
      .use(require('markdown-it-kbd')) //模拟kbd [[x]]
      .use(require('markdown-it-math'), {	// 数学公式
                  inlineRenderer: function(str) {
                      return katex.renderToString(str, {throwOnError: false});
                  },
                  blockRenderer: function(str) {
                      return katex.renderToString(str, {throwOnError: false,displayMode:true});
                  }
              });
  // html 标签美化
  mdHtml.renderer.rules.table_open = function () {
    return '<table class="table table-striped">\n';
  };
  // 替换 emoji
  mdHtml.renderer.rules.emoji = function (token, idx) {
    return window.twemoji.parse(token[idx].content);
  };
 
  // Inject line numbers for sync scroll. Notes:
  //
  // - We track only headings and paragraphs on first level. That's enough.
  // - Footnotes content causes jumps. Level limit filter it automatically.
  function injectLineNumbers(tokens, idx, options, env, slf) {
    var line;
    if (tokens[idx].map && tokens[idx].level === 0) {
      line = tokens[idx].map[0];
      tokens[idx].attrJoin('class', 'line');
      tokens[idx].attrSet('data-line', String(line));
    }
    return slf.renderToken(tokens, idx, options, env, slf);
  }
 
  mdHtml.renderer.rules.paragraph_open = mdHtml.renderer.rules.heading_open = injectLineNumbers;
}
 
$(function () {
  mdInit();
  var source = $('.source').val();
  $('#markinit').html(mdHtml.render(source));
  
  // 同步更新
  $('.source').on('keyup paste cut mouseup',function(){
    var source = $('.source').val();
    $('#markinit').html(mdHtml.render(source));
  });
 
})	
	

