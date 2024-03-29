var a, 
dp = {
    sh: {
        Toolbar: {
        },
        Utils: {
        },
        RegexLib: {
        },
        Brushes: {
        },
        Strings: {
            AboutDialog: '<html><head><title>About...</title></head><body class="dp-about"><table cellspacing="0"><tr><td class="copy"><p class="title">dp.SyntaxHighlighter</div><div class="para">Version: {V}</p><p><a href="http://www.dreamprojections.com/syntaxhighlighter/?ref=about" target="_blank">http://www.dreamprojections.com/syntaxhighlighter</a></p>&copy;2004-2007 Alex Gorbatchev.</td></tr><tr><td class="footer"><input type="button" class="close" value="OK" onClick="window.close()"/></td></tr></table></body></html>'
        },
        ClipboardSwf: 'http://static.blog.csdn.net/scripts/ZeroClipboard/ZeroClipboard.swf',
        Version: '1.5.1'
    }
};
dp.SyntaxHighlighter = dp.sh;
dp.sh.Toolbar.Commands = {
    ExpandSource: {
        label: '+ expand source',
        check: function(c) {
            return c.collapse
        },
        func: function(d, e) {
            d.parentNode.removeChild(d);
            e.div.className = e.div.className.replace('collapsed', '')
        }
    },
    ViewSource: {
        label: 'view plain',
        func: function(d, e) {
            d = dp.sh.Utils.FixForBlogger(e.originalCode).replace(/</g, '&lt;');
            e = window.open('', '_blank', 'width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=0');
            e.document.write('<textarea style="width:99%;height:99%">' + d + '</textarea>');
            e.document.close()
        }
    },
    CopyToClipboard: {
        label: 'copy',
        check: function() {
            return window.clipboardData != null || dp.sh.ClipboardSwf != null
        },
        func: function(e, g) {
            e = dp.sh.Utils.FixForBlogger(g.originalCode).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            if (window.clipboardData) {
                window.clipboardData.setData('text', e)
            } else {
                //if (dp.sh.ClipboardSwf != null) {
                //    var f = g.flashCopier;
                //    if (f == null) {
                //       f = document.createElement('div');
                //        g.flashCopier = f;
                //        g.div.appendChild(f)
                //    }
                //    f.innerHTML = '<embed src="' + dp.sh.ClipboardSwf + '" FlashVars="clipboard=' + encodeURIComponent(e) + '" width="0" height="0" type="application/x-shockwave-flash"></embed>'
                //}
				doResize();
				alert('拷贝失败，请再拷贝一次');
				return;
            }
            alert('The code is in your clipboard now')
        }
    },
    PrintSource: {
        label: 'print',
        func: function(e, g) {
            e = document.createElement('IFRAME');
            var f = null;
            e.style.cssText = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
            document.body.appendChild(e);
            f = e.contentWindow.document;
            dp.sh.Utils.CopyStyles(f, window.document);
            f.write('<div class="' + g.div.className.replace('collapsed', '') + ' printing">' + g.div.innerHTML + '</div>');
            f.close();
            e.contentWindow.focus();
            e.contentWindow.print();
            alert('Printing...');
            document.body.removeChild(e)
        }
    },
    About: {
        label: '?',
        func: function() {
            var d = window.open('', '_blank', 'dialog,width=300,height=150,scrollbars=0'), 
            e = d.document;
            dp.sh.Utils.CopyStyles(e, window.document);
            e.write(dp.sh.Strings.AboutDialog.replace('{V}', dp.sh.Version));
            e.close();
            d.focus()
        }
    }
};
dp.sh.Toolbar.Create = function(e) {
    var g = e.source.className;
    var j = document.createElement('DIV');
    j.className = 'tools';
    j.innerHTML = '<b>[' + g + ']</b> ';
    for (var i in dp.sh.Toolbar.Commands) {
        var h = dp.sh.Toolbar.Commands[i];
        h.check != null && !h.check(e) || (j.innerHTML += '<a href="#" class="' + i + '" title="' + h.label + '" onclick="dp.sh.Toolbar.Command(\'' + i + '\',this);return false;">' + h.label + '</a>')
    }
    return j
};
dp.sh.Toolbar.Command = function(e, g) {
    for (var f = g; f != null && f.className.indexOf('dp-highlighter') == -1; ) {
        f = f.parentNode
    }
    f != null && dp.sh.Toolbar.Commands[e].func(g, f.highlighter)
};
dp.sh.Utils.CopyStyles = function(e, g) {
    g = g.getElementsByTagName('link');
    for (var f = 0; f < g.length; f++) {
        g[f].rel.toLowerCase() == 'stylesheet' && e.write('<link type="text/css" rel="stylesheet" href="' + g[f].href + '"></link>')
    }
};
dp.sh.Utils.FixForBlogger = function(c) {
    return dp.sh.isBloggerMode == true ? c.replace(/<br\s*\/?>|&lt;br\s*\/?&gt;/gi, '\n') : c
};
dp.sh.RegexLib = {
    MultiLineCComments: new RegExp('/\\*[\\s\\S]*?\\*/', 'gm'),
    SingleLineCComments: new RegExp('//.*$', 'gm'),
    SingleLinePerlComments: new RegExp('#.*$', 'gm'),
    DoubleQuotedString: new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"', 'g'),
    SingleQuotedString: new RegExp('\'(?:\\.|(\\\\\\\')|[^\\\'\'\\n])*\'', 'g')
};
dp.sh.Match = function(e, g, f) {
    this.value = e;
    this.index = g;
    this.length = e.length;
    this.css = f
};
dp.sh.Highlighter = function() {
    this.noGutter = false;
    this.addControls = true;
    this.collapse = false;
    this.tabsToSpaces = true;
    this.wrapColumn = 80;
    this.showColumns = true
};
dp.sh.Highlighter.SortCallback = function(d, e) {
    if (d.index < e.index) {
        return -1
    } else {
        if (d.index > e.index) {
            return 1
        } else {
            if (d.length < e.length) {
                return -1
            } else {
                if (d.length > e.length) {
                    return 1
                }
            }
        }
    }
    return 0
};
a = dp.sh.Highlighter.prototype;
a.CreateElement = function(c) {
    c = document.createElement(c);
    c.highlighter = this;
    return c
};
a.GetMatches = function(e, g) {
    for (var f = null; (f = e.exec(this.code)) != null; ) {
        this.matches[this.matches.length] = new dp.sh.Match(f[0], f.index, g)
    }
};
a.AddBit = function(e, i) {
    if (!(e == null || e.length == 0)) {
        var h = this.CreateElement('SPAN');
        e = e.replace(/ /g, '&nbsp;');
        e = e.replace(/</g, '&lt;');
        e = e.replace(/(\r?\n)|(\[BR\])/gm, '&nbsp;<br>');
        if (i != null) {
            if (/br/gi.test(e)) {
                e = e.split('&nbsp;<br>');
                for (var g = 0; g < e.length; g++) {
                    h = this.CreateElement('SPAN');
                    h.className = i;
                    h.innerHTML = e[g];
                    this.div.appendChild(h);
                    g + 1 < e.length && this.div.appendChild(this.CreateElement('BR'))
                }
            } else {
                h.className = i;
                h.innerHTML = e;
                this.div.appendChild(h)
            }
        } else {
            h.innerHTML = e;
            this.div.appendChild(h)
        }
    }
};
a.IsInside = function(e) {
    if (e == null || e.length == 0) {
        return false
    }
    for (var g = 0; g < this.matches.length; g++) {
        var f = this.matches[g];
        if (f != null) {
            if (e.index > f.index && e.index < f.index + f.length) {
                return true
            }
        }
    }
    return false
};
a.ProcessRegexList = function() {
    for (var c = 0; c < this.regexList.length; c++) {
        this.GetMatches(this.regexList[c].regex, this.regexList[c].css)
    }
};
a.ProcessSmartTabs = function(e) {
    function k(f, n, c) {
        var b = f.substr(0, n);
        f = f.substr(n + 1, f.length);
        n = '';
        for (var d = 0; d < c; d++) {
            n += ' '
        }
        return b + n + f
    }
    function j(c, d) {
        if (c.indexOf(i) == -1) {
            return c
        }
        for (var b = 0; (b = c.indexOf(i)) != -1; ) {
            c = k(c, b, d - b % d)
        }
        return c
    }
    e = e.split('\n');
    for (var h = '', i = '\t', g = 0; g < e.length; g++) {
        h += j(e[g], 4) + '\n'
    }
    return h
};
a.SwitchToList = function() {
    var e = this.div.innerHTML.replace(/<(br)\/?>/gi, '\n').split('\n');
    this.addControls == true && this.bar.appendChild(dp.sh.Toolbar.Create(this));
    if (this.showColumns) {
        for (var j = this.CreateElement('div'), i = this.CreateElement('div'), g = 1; g <= 150; ) {
            if (g % 10 == 0) {
                j.innerHTML += g;
                g += (g + '').length
            } else {
                j.innerHTML += '&middot;';
                g++
            }
        }
        i.className = 'columns';
        i.appendChild(j);
        this.bar.appendChild(i)
    }
    g = 0;
    for (j = this.firstLine; g < e.length - 1; g++, j++) {
        i = this.CreateElement('LI');
        var h = this.CreateElement('SPAN');
        i.className = g % 2 == 0 ? 'alt' : '';
        h.innerHTML = e[g] + '&nbsp;';
        i.appendChild(h);
        this.ol.appendChild(i)
    }
    this.div.innerHTML = ''
};
a.Highlight = function(e) {
    function m(b) {
        return b.replace(/^\s*(.*?)[\s\n]*$/g, '$1')
    }
    function l(b) {
        return b.replace(/\n*$/, '').replace(/^\n*/, '')
    }
    function j(h) {
        h = dp.sh.Utils.FixForBlogger(h).split('\n');
        for (var c = new RegExp('^\\s*', 'g'), b = 1000, d = 0; d < h.length && b > 0; d++) {
            if (m(h[d]).length != 0) {
                var f = c.exec(h[d]);
                if (f != null && f.length > 0) {
                    b = Math.min(f[0].length, b)
                }
            }
        }
        if (b > 0) {
            for (d = 0; d < h.length; d++) {
                h[d] = h[d].substr(b)
            }
        }
        return h.join('\n')
    }
    function k(d, c, b) {
        return d.substr(c, b - c)
    }
    var i = 0;
    if (e == null) {
        e = ''
    }
    this.originalCode = e;
    this.code = l(j(e));
    this.div = this.CreateElement('DIV');
    this.bar = this.CreateElement('DIV');
    this.ol = this.CreateElement('OL');
    this.matches = [
    ];
    this.div.className = 'dp-highlighter';
    this.div.highlighter = this;
    this.bar.className = 'bar';
    this.ol.start = this.firstLine;
    if (this.CssClass != null) {
        this.ol.className = this.CssClass
    }
    if (this.collapse) {
        this.div.className += ' collapsed'
    }
    if (this.noGutter) {
        this.div.className += ' nogutter'
    }
    if (this.tabsToSpaces == true) {
        this.code = this.ProcessSmartTabs(this.code)
    }
    this.ProcessRegexList();
    if (this.matches.length == 0) {
        this.AddBit(this.code, null)
    } else {
        this.matches = this.matches.sort(dp.sh.Highlighter.SortCallback);
        for (e = 0; e < this.matches.length; e++) {
            if (this.IsInside(this.matches[e])) {
                this.matches[e] = null
            }
        }
        for (e = 0; e < this.matches.length; e++) {
            var g = this.matches[e];
            if (!(g == null || g.length == 0)) {
                this.AddBit(k(this.code, i, g.index), null);
                this.AddBit(g.value, g.css);
                i = g.index + g.length
            }
        }
        this.AddBit(this.code.substr(i), null)
    }
    this.SwitchToList();
    this.div.appendChild(this.bar);
    this.div.appendChild(this.ol)
};
a.GetKeywords = function(c) {
    return '\\b' + c.replace(/ /g, '\\b|\\b') + '\\b'
};
dp.sh.BloggerMode = function() {
    dp.sh.isBloggerMode = true
};
dp.sh.HighlightAll = function(K, J, I, G, z, y) {
    function E() {
        for (var b = arguments, c = 0; c < b.length; c++) {
            if (b[c] != null) {
                if (typeof b[c] == 'string' && b[c] != '') {
                    return b[c] + ''
                }
                if (typeof b[c] == 'object' && b[c].value != '') {
                    return b[c].value + ''
                }
            }
        }
        return null
    }
    function H(b, c) {
        for (var d = 0; d < c.length; d++) {
            if (c[d] == b) {
                return true
            }
        }
        return false
    }
    function C(b, d, f) {
        b = new RegExp('^' + b + '\\[(\\w+)\\]$', 'gi');
        for (var e = null, c = 0; c < d.length; c++) {
            if ((e = b.exec(d[c])) != null) {
                return e[1]
            }
        }
        return f
    }
    function B(b, c, e) {
        e = document.getElementsByTagName(e);
        for (var d = 0; d < e.length; d++) {
            e[d].getAttribute('name') == c && b.push(e[d])
        }
    }
    var D = [
    ], 
    F = null, 
    o = {
    };
    B(D, K, 'pre');
    B(D, K, 'textarea');
    if (D.length != 0) {
        for (var A in dp.sh.Brushes) {
            F = dp.sh.Brushes[A].Aliases;
            if (F != null) {
                for (K = 0; K < F.length; K++) {
                    o[F[K]] = A
                }
            }
        }
        for (K = 0; K < D.length; K++) {
            A = D[K];
            var u = E(A.attributes['class'], A.className, A.attributes.language, A.language);
            F = '';
            if (u != null) {
                u = u.split(':');
                F = u[0].toLowerCase();
                if (o[F] != null) {
                    F = new dp.sh.Brushes[o[F]];
                    A.style.display = 'none';
                    F.noGutter = J == null ? H('nogutter', u) : !J;
                    F.addControls = I == null ? !H('nocontrols', u) : I;
                    F.collapse = G == null ? H('collapse', u) : G;
                    F.showColumns = y == null ? H('showcolumns', u) : y;
                    var k = document.getElementsByTagName('head')[0];
                    if (F.Style && k) {
                        var s = document.createElement('style');
                        s.setAttribute('type', 'text/css');
                        if (s.styleSheet) {
                            s.styleSheet.cssText = F.Style
                        } else {
                            var j = document.createTextNode(F.Style);
                            s.appendChild(j)
                        }
                        k.appendChild(s)
                    }
                    F.firstLine = z == null ? parseInt(C('firstline', u, 1)) : z;
                    F.source = A;
                    F.Highlight(A.innerHTML);
                    F.div.className += ' bg_' + A.className;
                    A.parentNode.insertBefore(F.div, A)
                }
            }
        }
    }
};
dp.sh.Brushes.Xml = function() {
    this.CssClass = 'dp-xml';
    this.Style = ''
};
dp.sh.Brushes.Xml.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Xml.Aliases = [
    'xml', 
    'xhtml', 
    'xslt', 
    'html', 
    'xhtml'
];
dp.sh.Brushes.Xml.prototype.ProcessRegexList = function() {
    function f(c, b) {
        c[c.length] = b
    }
    var e = null, 
    d = null;
    this.GetMatches(new RegExp('(&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](&gt;|>)', 'gm'), 'cdata');
    this.GetMatches(new RegExp('(&lt;|<)!--\\s*.*?\\s*--(&gt;|>)', 'gm'), 'comments');
    for (d = new RegExp('([:\\w-.]+)\\s*=\\s*(".*?"|\'.*?\'|\\w+)*|(\\w+)', 'gm'); (e = d.exec(this.code)) != null; ) {
        if (e[1] != null) {
            f(this.matches, new dp.sh.Match(e[1], e.index, 'attribute'));
            e[2] != undefined && f(this.matches, new dp.sh.Match(e[2], e.index + e[1].length + e[0].substr(e[1].length).indexOf(e[2]), 'attribute-value'))
        }
    }
    this.GetMatches(new RegExp('(&lt;|<)/*\\?*(?!\\!)|/*\\?*(&gt;|>)', 'gm'), 'tag');
    for (d = new RegExp('(?:&lt;|<)/*\\?*\\s*([:\\w-.]+)', 'gm'); (e = d.exec(this.code)) != null; ) {
        f(this.matches, new dp.sh.Match(e[1], e.index + e[0].indexOf(e[1]), 'tag-name'))
    }
};
dp.sh.Brushes.Vb = function() {
    this.regexList = [
        {
            regex: new RegExp('\'.*$', 'gm'),
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('^\\s*#.*', 'gm'),
            css: 'preprocessor'
        }, 
        {
            regex: new RegExp(this.GetKeywords('AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType Date Decimal Declare Default Delegate Dim DirectCast Do Double Each Else ElseIf End Enum Erase Error Event Exit False Finally For Friend Function Get GetType GoSub GoTo Handles If Implements Imports In Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing NotInheritable NotOverridable Object On Option Optional Or OrElse Overloads Overridable Overrides ParamArray Preserve Private Property Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume Return Select Set Shadows Shared Short Single Static Step Stop String Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until Variant When While With WithEvents WriteOnly Xor'), 'gm'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-vb'
};
dp.sh.Brushes.Vb.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Vb.Aliases = [
    'vb', 
    'vb.net'
];
dp.sh.Brushes.Sql = function() {
    this.regexList = [
        {
            regex: new RegExp('--(.*)$', 'gm'),
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp(this.GetKeywords('abs avg case cast coalesce convert count current_timestamp current_user day isnull left lower month nullif replace right session_user space substring sum system_user upper user year'), 'gmi'),
            css: 'func'
        }, 
        {
            regex: new RegExp(this.GetKeywords('all and any between cross in join like not null or outer some'), 'gmi'),
            css: 'op'
        }, 
        {
            regex: new RegExp(this.GetKeywords('absolute action add after alter as asc at authorization begin bigint binary bit by cascade char character check checkpoint close collate column commit committed connect connection constraint contains continue create cube current current_date current_time cursor database date deallocate dec decimal declare default delete desc distinct double drop dynamic else end end-exec escape except exec execute false fetch first float for force foreign forward free from full function global goto grant group grouping having hour ignore index inner insensitive insert instead int integer intersect into is isolation key last level load local max min minute modify move name national nchar next no numeric of off on only open option order out output partial password precision prepare primary prior privileges procedure public read real references relative repeatable restrict return returns revoke rollback rollup rows rule schema scroll second section select sequence serializable set size smallint static statistics table temp temporary then time timestamp to top transaction translation trigger true truncate uncommitted union unique update values varchar varying view when where with work'), 'gmi'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-sql';
    this.Style = ''
};
dp.sh.Brushes.Sql.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Sql.Aliases = [
    'sql'
];
dp.sh.Brushes.Ruby = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.SingleLinePerlComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp(':[a-z][A-Za-z0-9_]*', 'g'),
            css: 'symbol'
        }, 
        {
            regex: new RegExp('(\\$|@@|@)\\w+', 'g'),
            css: 'variable'
        }, 
        {
            regex: new RegExp(this.GetKeywords('alias and BEGIN begin break case class def define_method defined do each else elsif END end ensure false for if in module new next nil not or raise redo rescue retry return self super then throw true undef unless until when while yield'), 'gm'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp(this.GetKeywords('Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol ThreadGroup Thread Time TrueClass'), 'gm'),
            css: 'builtin'
        }
    ];
    this.CssClass = 'dp-rb';
    this.Style = ''
};
dp.sh.Brushes.Ruby.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Ruby.Aliases = [
    'ruby', 
    'rails', 
    'ror'
];
dp.sh.Brushes.Python = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.SingleLinePerlComments,
            css: 'comment'
        }, 
        {
            regex: new RegExp('^\\s*@\\w+', 'gm'),
            css: 'decorator'
        }, 
        {
            regex: new RegExp('([\'"]{3})([^\\1])*?\\1', 'gm'),
            css: 'comment'
        }, 
        {
            regex: new RegExp('"(?!")(?:\\.|\\\\\\"|[^\\""\\n\\r])*"', 'gm'),
            css: 'string'
        }, 
        {
            regex: new RegExp('\'(?!\')*(?:\\.|(\\\\\\\')|[^\\\'\'\\n\\r])*\'', 'gm'),
            css: 'string'
        }, 
        {
            regex: new RegExp('\\b\\d+\\.?\\w*', 'g'),
            css: 'number'
        }, 
        {
            regex: new RegExp(this.GetKeywords('and assert break class continue def del elif else except exec finally for from global if import in is lambda not or pass print raise return try yield while'), 'gm'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp(this.GetKeywords('None True False self cls class_'), 'gm'),
            css: 'special'
        }
    ];
    this.CssClass = 'dp-py';
    this.Style = ''
};
dp.sh.Brushes.Python.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Python.Aliases = [
    'py', 
    'python'
];
dp.sh.Brushes.Plain = function() {
    this.regexList = [
    ]
};
dp.sh.Brushes.Plain.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Plain.Aliases = [
    'plain', 
    'text', 
    'txt'
];
dp.sh.Brushes.Php = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.SingleLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.MultiLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('\\$\\w+', 'g'),
            css: 'vars'
        }, 
        {
            regex: new RegExp(this.GetKeywords('abs acos acosh addcslashes addslashes array_change_key_case array_chunk array_combine array_count_values array_diff array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill array_filter array_flip array_intersect array_intersect_assoc array_intersect_key array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map array_merge array_merge_recursive array_multisort array_pad array_pop array_product array_push array_rand array_reduce array_reverse array_search array_shift array_slice array_splice array_sum array_udiff array_udiff_assoc array_udiff_uassoc array_uintersect array_uintersect_assoc array_uintersect_uassoc array_unique array_unshift array_values array_walk array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists closedir closelog copy cos cosh count count_chars date decbin dechex decoct deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br parse_ini_file parse_str parse_url passthru pathinfo readlink realpath rewind rewinddir rmdir round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime strtoupper strtr strval substr substr_compare'), 'gmi'),
            css: 'func'
        }, 
        {
            regex: new RegExp(this.GetKeywords('and or xor __FILE__ __LINE__ array as break case cfunction class const continue declare default die do else elseif enddeclare endfor endforeach endif endswitch endwhile extends for foreach function include include_once global if new old_function return static switch use require require_once var while __FUNCTION__ __CLASS__ __METHOD__ abstract interface public implements extends private protected throw'), 'gm'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-c'
};
dp.sh.Brushes.Php.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Php.Aliases = [
    'php'
];
dp.sh.Brushes.JScript = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.SingleLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.MultiLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('^\\s*#.*', 'gm'),
            css: 'preprocessor'
        }, 
        {
            regex: new RegExp(this.GetKeywords('abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with'), 'gm'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-c'
};
dp.sh.Brushes.JScript.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.JScript.Aliases = [
    'js', 
    'jscript', 
    'javascript'
];
dp.sh.Brushes.Java = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.SingleLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.MultiLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b', 'gi'),
            css: 'number'
        }, 
        {
            regex: new RegExp('(?!\\@interface\\b)\\@[\\$\\w]+\\b', 'g'),
            css: 'annotation'
        }, 
        {
            regex: new RegExp('\\@interface\\b', 'g'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp(this.GetKeywords('abstract assert boolean break byte case catch char class const continue default do double else enum extends false final finally float for goto if implements import instanceof int interface long native new null package private protected public return short static strictfp super switch synchronized this throw throws true transient try void volatile while'), 'gm'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-j';
    this.Style = ''
};
dp.sh.Brushes.Java.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Java.Aliases = [
    'java'
];
dp.sh.Brushes.Delphi = function() {
    this.regexList = [
        {
            regex: new RegExp('\\(\\*[\\s\\S]*?\\*\\)', 'gm'),
            css: 'comment'
        }, 
        {
            regex: new RegExp('{(?!\\$)[\\s\\S]*?}', 'gm'),
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.SingleLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('\\{\\$[a-zA-Z]+ .+\\}', 'g'),
            css: 'directive'
        }, 
        {
            regex: new RegExp('\\b[\\d\\.]+\\b', 'g'),
            css: 'number'
        }, 
        {
            regex: new RegExp('\\$[a-zA-Z0-9]+\\b', 'g'),
            css: 'number'
        }, 
        {
            regex: new RegExp(this.GetKeywords('abs addr and ansichar ansistring array as asm begin boolean byte cardinal case char class comp const constructor currency destructor div do double downto else end except exports extended false file finalization finally for function goto if implementation in inherited int64 initialization integer interface is label library longint longword mod nil not object of on or packed pansichar pansistring pchar pcurrency pdatetime pextended pint64 pointer private procedure program property pshortstring pstring pvariant pwidechar pwidestring protected public published raise real real48 record repeat set shl shortint shortstring shr single smallint string then threadvar to true try type unit until uses val var varirnt while widechar widestring with word write writeln xor'), 'gm'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-delphi';
    this.Style = ''
};
dp.sh.Brushes.Delphi.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Delphi.Aliases = [
    'delphi', 
    'pascal'
];
dp.sh.Brushes.CSS = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.MultiLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('\\#[a-zA-Z0-9]{3,6}', 'g'),
            css: 'value'
        }, 
        {
            regex: new RegExp('(-?\\d+)(.\\d+)?(px|em|pt|:|%|)', 'g'),
            css: 'value'
        }, 
        {
            regex: new RegExp('!important', 'g'),
            css: 'important'
        }, 
        {
            regex: new RegExp(this.GetKeywordsCSS('ascent azimuth background-attachment background-color background-image background-position background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width border-bottom-width border-left-width border-width border cap-height caption-side centerline clear clip color content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font height letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position quotes richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress table-layout text-align text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index'), 'gm'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp(this.GetValuesCSS('above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow'), 'g'),
            css: 'value'
        }, 
        {
            regex: new RegExp(this.GetValuesCSS('[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif'), 'g'),
            css: 'value'
        }
    ];
    this.CssClass = 'dp-css';
    this.Style = ''
};
dp.sh.Highlighter.prototype.GetKeywordsCSS = function(b) {
    return '\\b([a-z_]|)' + b.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b'
};
dp.sh.Highlighter.prototype.GetValuesCSS = function(b) {
    return '\\b' + b.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + ':\\b'
};
dp.sh.Brushes.CSS.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.CSS.Aliases = [
    'css'
];
dp.sh.Brushes.CSharp = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.SingleLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.MultiLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('^\\s*#.*', 'gm'),
            css: 'preprocessor'
        }, 
        {
            regex: new RegExp(this.GetKeywords('abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach get goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void while'), 'gm'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-c';
    this.Style = ''
};
dp.sh.Brushes.CSharp.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.CSharp.Aliases = [
    'c#', 
    'c-sharp', 
    'csharp'
];
dp.sh.Brushes.Cpp = function() {
    this.regexList = [
        {
            regex: dp.sh.RegexLib.SingleLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.MultiLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('^ *#.*', 'gm'),
            css: 'preprocessor'
        }, 
        {
            regex: new RegExp(this.GetKeywords('ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t __wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler sig_atomic_t size_t _stat __stat64 _stati64 terminate_function time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf va_list wchar_t wctrans_t wctype_t wint_t signed'), 'gm'),
            css: 'datatypes'
        }, 
        {
            regex: new RegExp(this.GetKeywords('break case catch class const __finally __exception __try const_cast continue private public protected __declspec default delete deprecated dllexport dllimport do dynamic_cast else enum explicit extern if for friend goto inline mutable naked namespace new noinline noreturn nothrow register reinterpret_cast return selectany sizeof static static_cast struct switch template this thread throw true false try typedef typeid typename union using uuid virtual void volatile whcar_t while'), 'gm'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-cpp';
    this.Style = ''
};
dp.sh.Brushes.Cpp.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Cpp.Aliases = [
    'cpp', 
    'c', 
    'c++'
];
dp.sh.Brushes.Objc = function() {
    var c = 'ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t __wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t id jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler sig_atomic_t size_t _stat __stat64 _stati64 terminate_function time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf va_list wchar_t wctrans_t wctype_t wint_t signed';
    var b = 'break case catch class copy const __finally __exception __try const_cast continue private public protected __declspec default delete deprecated dllexport dllimport do dynamic_cast else enum explicit extern if for friend getter goto inline mutable naked namespace new nil NO noinline nonatomic noreturn nothrow NULL readonly readwrite register reinterpret_cast retain strong return SEL selectany self setter sizeof static static_cast struct super switch template thread throw true false try typedef typeid typename union using uuid virtual void volatile whcar_t while YES';
    this.regexList = [
        {
            regex: new RegExp(this.GetKeywords(c), 'gm'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp(this.GetKeywords(b), 'gm'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp('@\\w+\\b', 'g'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp('[: ]nil', 'g'),
            css: 'keyword'
        }, 
        {
            regex: new RegExp('\\.\\w+', 'g'),
            css: 'xcodeconstants'
        }, 
        {
            regex: new RegExp(' \\w+(?=[:\\]])', 'g'),
            css: 'vars'
        }, 
        {
            regex: dp.sh.RegexLib.SingleLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.MultiLineCComments,
            css: 'comment'
        }, 
        {
            regex: dp.sh.RegexLib.DoubleQuotedString,
            css: 'string'
        }, 
        {
            regex: dp.sh.RegexLib.SingleQuotedString,
            css: 'string'
        }, 
        {
            regex: new RegExp('@"[^"]*"', 'gm'),
            css: 'string'
        }, 
        {
            regex: new RegExp('\\d', 'gm'),
            css: 'xcodenumber'
        }, 
        {
            regex: new RegExp('^ *#.*', 'gm'),
            css: 'xcodepreprocessor'
        }, 
        {
            regex: new RegExp('\\w+(?= \\*)', 'g'),
            css: 'keyword'
        }
    ];
    this.CssClass = 'dp-objc';
    this.Style = '.dp-objc .vars { color: #d00; }'
};
dp.sh.Brushes.Objc.prototype = new dp.sh.Highlighter;
dp.sh.Brushes.Objc.Aliases = [
    'objc'
];
var ZeroClipboard = {
    version: '1.0.7',
    clients: {
    },
    moviePath: 'http://static.blog.csdn.net/scripts/ZeroClipboard/ZeroClipboard.swf',
    nextId: 1,
    $: function(b) {
        if (typeof (b) == 'string') {
            b = document.getElementById(b)
        }
        if (true || !b.addClass) {
            b.hide = function() {
                this.style.display = 'none'
            };
            b.show = function() {
                this.style.display = ''
            };
            b.addClass = function(c) {
                this.removeClass(c);
                this.className += ' ' + c
            };
            b.removeClass = function(e) {
                var f = this.className.split(/\s+/);
                var c = -1;
                for (var d = 0; d < f.length; d++) {
                    if (f[d] == e) {
                        c = d;
                        d = f.length
                    }
                }
                if (c > -1) {
                    f.splice(c, 1);
                    this.className = f.join(' ')
                }
                return this
            };
            b.hasClass = function(c) {
                return !!this.className.match(new RegExp('\\s*' + c + '\\s*'))
            }
        }
        return b
    },
    setMoviePath: function(b) {
        this.moviePath = b
    },
    dispatch: function(e, c, d) {
        var b = this.clients[e];
        if (b) {
            b.receiveEvent(c, d)
        }
    },
    register: function(c, b) {
        this.clients[c] = b
    },
    getDOMObjectPosition: function(d, b) {
        var c = {
            left: 0,
            top: 0,
            width: d.width ? d.width : d.offsetWidth,
            height: d.height ? d.height : d.offsetHeight
        };
        while (d && (d != b)) {
            c.left += d.offsetLeft;
            c.top += d.offsetTop;
            d = d.offsetParent
        }
        return c
    },
    Client: function(b) {
        this.handlers = {
        };
        this.id = ZeroClipboard.nextId++;
        this.movieId = 'ZeroClipboardMovie_' + this.id;
        ZeroClipboard.register(this.id, this);
        if (b) {
            this.glue(b)
        }
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: false,
    movie: null,
    clipText: '',
    handCursorEnabled: true,
    cssEffects: true,
    handlers: null,
    glue: function(e, c, f) {
        this.domElement = ZeroClipboard.$(e);
        var g = 99;
        if (this.domElement.style.zIndex) {
            g = parseInt(this.domElement.style.zIndex, 10) + 1
        }
        if (typeof (c) == 'string') {
            c = ZeroClipboard.$(c)
        } else {
            if (typeof (c) == 'undefined') {
                c = document.getElementsByTagName('body')[0]
            }
        }
        var d = ZeroClipboard.getDOMObjectPosition(this.domElement, c);
        this.div = document.createElement('div');
        var b = this.div.style;
        b.position = 'absolute';
        b.left = '' + d.left + 'px';
        b.top = '' + d.top + 'px';
        b.width = '' + d.width + 'px';
        b.height = '' + d.height + 'px';
        b.zIndex = g;
        if (typeof (f) == 'object') {
            for (addedStyle in f) {
                b[addedStyle] = f[addedStyle]
            }
        }
        c.appendChild(this.div);
        this.div.innerHTML = this.getHTML(d.width, d.height)
    },
    getHTML: function(e, b) {
        var d = '';
        var c = 'id=' + this.id + '&width=' + e + '&height=' + b;
        if (navigator.userAgent.match(/MSIE/)) {
            var f = location.href.match(/^https/i) ? 'https://' : 'http://';
            d += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + f + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + e + '" height="' + b + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + c + '"/><param name="wmode" value="transparent"/></object>'
        } else {
            d += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + e + '" height="' + b + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + c + '" wmode="transparent" />'
        }
        return d
    },
    hide: function() {
        if (this.div) {
            this.div.style.left = '-2000px'
        }
    },
    show: function() {
        this.reposition()
    },
    destroy: function() {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = '';
            var b = document.getElementsByTagName('body')[0];
            try {
                b.removeChild(this.div)
            } catch (c) {
            }
            this.domElement = null;
            this.div = null
        }
    },
    reposition: function(d) {
        if (d) {
            this.domElement = ZeroClipboard.$(d);
            if (!this.domElement) {
                this.hide()
            }
        }
        if (this.domElement && this.div) {
            var c = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var b = this.div.style;
            b.left = '' + c.left + 'px';
            b.top = '' + c.top + 'px'
        }
    },
    setText: function(b) {
        this.clipText = b;
        if (this.ready) {
            this.movie.setText(b)
        }
    },
    addEventListener: function(b, c) {
        b = b.toString().toLowerCase().replace(/^on/, '');
        if (!this.handlers[b]) {
            this.handlers[b] = [
            ]
        }
        this.handlers[b].push(c)
    },
    setHandCursor: function(b) {
        this.handCursorEnabled = b;
        if (this.ready) {
            this.movie.setHandCursor(b)
        }
    },
    setCSSEffects: function(b) {
        this.cssEffects = !!b
    },
    receiveEvent: function(e, f) {
        e = e.toString().toLowerCase().replace(/^on/, '');
        switch (e) {
            case 'load':
                this.movie = document.getElementById(this.movieId);
                if (!this.movie) {
                    var d = this;
                    setTimeout(function() {
                        d.receiveEvent('load', null)
                    }, 1);
                    return
                }
                if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                    var d = this;
                    setTimeout(function() {
                        d.receiveEvent('load', null)
                    }, 100);
                    this.ready = true;
                    return
                }
                this.ready = true;
                this.movie.setText(this.clipText);
                this.movie.setHandCursor(this.handCursorEnabled);
                break;
            case 'mouseover':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('hover');
                    if (this.recoverActive) {
                        this.domElement.addClass('active')
                    }
                }
                break;
            case 'mouseout':
                if (this.domElement && this.cssEffects) {
                    this.recoverActive = false;
                    if (this.domElement.hasClass('active')) {
                        this.domElement.removeClass('active');
                        this.recoverActive = true
                    }
                    this.domElement.removeClass('hover')
                }
                break;
            case 'mousedown':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('active')
                }
                break;
            case 'mouseup':
                if (this.domElement && this.cssEffects) {
                    this.domElement.removeClass('active');
                    this.recoverActive = false
                }
                break
        }
        if (this.handlers[e]) {
            for (var c = 0, b = this.handlers[e].length; c < b; c++) {
                var g = this.handlers[e][c];
                if (typeof (g) == 'function') {
                    g(this, f)
                } else {
                    if ((typeof (g) == 'object') && (g.length == 2)) {
                        g[0][g[1]](this, f)
                    } else {
                        if (typeof (g) == 'string') {
                            window[g](this, f)
                        }
                    }
                }
            }
        }
    }
};
$(document).ready(function() {
    $('.violet-post pre').each(function() {
        var b = $(this);
        if (b.attr('class').indexOf('brush:') != -1) {
            var c = b.attr('class').split(';')[0].split(':')[1];
            b.attr('name', 'code');
            b.attr('class', c)
        }
        if (b.attr('class')) {
            b.attr('name', 'code')
        }
    });
    $('.violet-post textarea[name=code]').each(function() {
        var b = $(this);
        if (b.attr('class').indexOf(':') != -1) {
            b.attr('class', b.attr('class').split(':')[0])
        }
    });
    dp.SyntaxHighlighter.HighlightAll('code');
    $('.highlighter').addClass('dp-highlighter');
    if (!window.clipboardData) {
        setTimeout('setCopyBtn()', 200)
    }
});
var clips = new Array();
var resizeTimer = null;
function setCopyBtn() {
    clips.length = 0;
    $('.CopyToClipboard').each(function() {
        var b = new ZeroClipboard.Client();
        clips.push(b);
        b.setHandCursor(true);
        b.addEventListener('load', function(c) {
        });
        b.addEventListener('mouseOver', function(c) {
            var d = c.movie.parentNode.parentNode.parentNode.parentNode.nextSibling.innerHTML;
            d = d.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            c.setText(d)
        });
        b.addEventListener('complete', function(c, d) {
            alert('代码已经复制到你的剪贴板。')
        });
        b.glue(this, this.parentNode);
    
    });
    window.onresize = function() {
        if (resizeTimer == null) {
            resizeTimer = setTimeout("doResize()", 1000);
        }
    }
}

function doResize() {
    if(clips!=null) {
         for (var i = 0; i < clips.length; i++) {
              clips[i].reposition();
         }
         resizeTimer = null;
    }
}



