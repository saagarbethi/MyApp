! function($) {
    "use strict";
    $.jgrid = $.jgrid || {}, $.jgrid.hasOwnProperty("defaults") || ($.jgrid.defaults = {}), $.extend($.jgrid, {
        version: "1.2",
        htmlDecode: function(a) {
            return a && ("&nbsp;" === a || "&#160;" === a || 1 === a.length && 160 === a.charCodeAt(0)) ? "" : a ? String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : a
        },
        htmlEncode: function(a) {
            return a ? String(a).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : a
        },
        template: function(a) {
            var b, c = $.makeArray(arguments).slice(1),
                d = c.length;
            return null == a && (a = ""), a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(a, e) {
                if (!isNaN(parseInt(e, 10))) return c[parseInt(e, 10)];
                for (b = 0; d > b; b++)
                    if ($.isArray(c[b]))
                        for (var f = c[b], g = f.length; g--;)
                            if (e === f[g].nm) return f[g].v
            })
        },
        msie: "Microsoft Internet Explorer" === navigator.appName,
        msiever: function() {
            var a = -1,
                b = navigator.userAgent,
                c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            return null != c.exec(b) && (a = parseFloat(RegExp.$1)), a
        },
        getCellIndex: function(a) {
            var b = $(a);
            return b.is("tr") ? -1 : (b = (b.is("td") || b.is("th") ? b : b.closest("td,th"))[0], $.jgrid.msie ? $.inArray(b, b.parentNode.cells) : b.cellIndex)
        },
        stripHtml: function(a) {
            a = String(a);
            var b = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            return a ? (a = a.replace(b, ""), a && "&nbsp;" !== a && "&#160;" !== a ? a.replace(/\"/g, "'") : "") : a
        },
        stripPref: function(a, b) {
            var c = $.type(a);
            return ("string" === c || "number" === c) && (a = String(a), b = "" !== a ? String(b).replace(String(a), "") : b), b
        },
        parse: function(jsonString) {
            var js = jsonString;
            return "while(1);" === js.substr(0, 9) && (js = js.substr(9)), "/*" === js.substr(0, 2) && (js = js.substr(2, js.length - 4)), js || (js = "{}"), $.jgrid.useJSON === !0 && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(js) : eval("(" + js + ")")
        },
        parseDate: function(a, b, c, d) {
            var e, f, g, h = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
                i = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                j = /[^-+\dA-Z]/g,
                k = new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"),
                l = "string" == typeof b ? b.match(k) : null,
                m = function(a, b) {
                    for (a = String(a), b = parseInt(b, 10) || 2; a.length < b;) a = "0" + a;
                    return a
                },
                n = {
                    m: 1,
                    d: 1,
                    y: 1970,
                    h: 0,
                    i: 0,
                    s: 0,
                    u: 0
                },
                o = 0,
                p = function(a, b) {
                    return 0 === a ? 12 === b && (b = 0) : 12 !== b && (b += 12), b
                },
                q = 0;
            if (void 0 === d && (d = $.jgrid.getRegional(this, "formatter.date")), void 0 === d.parseRe && (d.parseRe = /[#%\\\/:_;.,\t\s-]/), d.masks.hasOwnProperty(a) && (a = d.masks[a]), b && null != b)
                if (isNaN(b - 0) || "u" !== String(a).toLowerCase())
                    if (b.constructor === Date) o = b;
                    else if (null !== l) o = new Date(parseInt(l[1], 10)), l[3] && (q = 60 * Number(l[5]) + Number(l[6]), q *= "-" === l[4] ? 1 : -1, q -= o.getTimezoneOffset(), o.setTime(Number(Number(o) + 60 * q * 1e3)));
            else {
                for ("ISO8601Long" === d.srcformat && "Z" === b.charAt(b.length - 1) && (q -= (new Date).getTimezoneOffset()), b = String(b).replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), a = a.replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), f = 0, g = a.length; g > f; f++) {
                    switch (a[f]) {
                        case "M":
                            e = $.inArray(b[f], d.monthNames), -1 !== e && 12 > e && (b[f] = e + 1, n.m = b[f]);
                            break;
                        case "F":
                            e = $.inArray(b[f], d.monthNames, 12), -1 !== e && e > 11 && (b[f] = e + 1 - 12, n.m = b[f]);
                            break;
                        case "n":
                            a[f] = "m";
                            break;
                        case "j":
                            a[f] = "d";
                            break;
                        case "a":
                            e = $.inArray(b[f], d.AmPm), -1 !== e && 2 > e && b[f] === d.AmPm[e] && (b[f] = e, n.h = p(b[f], n.h));
                            break;
                        case "A":
                            e = $.inArray(b[f], d.AmPm), -1 !== e && e > 1 && b[f] === d.AmPm[e] && (b[f] = e - 2, n.h = p(b[f], n.h));
                            break;
                        case "g":
                            n.h = parseInt(b[f], 10)
                    }
                    void 0 !== b[f] && (n[a[f].toLowerCase()] = parseInt(b[f], 10))
                }
                if (n.f && (n.m = n.f), 0 === n.m && 0 === n.y && 0 === n.d) return "&#160;";
                n.m = parseInt(n.m, 10) - 1;
                var r = n.y;
                r >= 70 && 99 >= r ? n.y = 1900 + n.y : r >= 0 && 69 >= r && (n.y = 2e3 + n.y), o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u), q > 0 && o.setTime(Number(Number(o) + 60 * q * 1e3))
            } else o = new Date(1e3 * parseFloat(b));
            else o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u);
            if (d.userLocalTime && 0 === q && (q -= (new Date).getTimezoneOffset(), q > 0 && o.setTime(Number(Number(o) + 60 * q * 1e3))), void 0 === c) return o;
            d.masks.hasOwnProperty(c) ? c = d.masks[c] : c || (c = "Y-m-d");
            var s = o.getHours(),
                t = o.getMinutes(),
                u = o.getDate(),
                v = o.getMonth() + 1,
                w = o.getTimezoneOffset(),
                x = o.getSeconds(),
                y = o.getMilliseconds(),
                z = o.getDay(),
                A = o.getFullYear(),
                B = (z + 6) % 7 + 1,
                C = (new Date(A, v - 1, u) - new Date(A, 0, 1)) / 864e5,
                D = {
                    d: m(u),
                    D: d.dayNames[z],
                    j: u,
                    l: d.dayNames[z + 7],
                    N: B,
                    S: d.S(u),
                    w: z,
                    z: C,
                    W: 5 > B ? Math.floor((C + B - 1) / 7) + 1 : Math.floor((C + B - 1) / 7) || ((new Date(A - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
                    F: d.monthNames[v - 1 + 12],
                    m: m(v),
                    M: d.monthNames[v - 1],
                    n: v,
                    t: "?",
                    L: "?",
                    o: "?",
                    Y: A,
                    y: String(A).substring(2),
                    a: 12 > s ? d.AmPm[0] : d.AmPm[1],
                    A: 12 > s ? d.AmPm[2] : d.AmPm[3],
                    B: "?",
                    g: s % 12 || 12,
                    G: s,
                    h: m(s % 12 || 12),
                    H: m(s),
                    i: m(t),
                    s: m(x),
                    u: y,
                    e: "?",
                    I: "?",
                    O: (w > 0 ? "-" : "+") + m(100 * Math.floor(Math.abs(w) / 60) + Math.abs(w) % 60, 4),
                    P: "?",
                    T: (String(o).match(i) || [""]).pop().replace(j, ""),
                    Z: "?",
                    c: "?",
                    r: "?",
                    U: Math.floor(o / 1e3)
                };
            return c.replace(h, function(a) {
                return D.hasOwnProperty(a) ? D[a] : a.substring(1)
            })
        },
        jqID: function(a) {
            return String(a).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
        },
        guid: 1,
        uidPref: "jqg",
        randId: function(a) {
            return (a || $.jgrid.uidPref) + $.jgrid.guid++
        },
        getAccessor: function(a, b) {
            var c, d, e, f = [];
            if ("function" == typeof b) return b(a);
            if (c = a[b], void 0 === c) try {
                if ("string" == typeof b && (f = b.split(".")), e = f.length)
                    for (c = a; c && e--;) d = f.shift(), c = c[d]
            } catch (g) {}
            return c
        },
        getXmlData: function(a, b, c) {
            var d, e = "string" == typeof b ? b.match(/^(.*)\[(\w+)\]$/) : null;
            return "function" == typeof b ? b(a) : e && e[2] ? e[1] ? $(e[1], a).attr(e[2]) : $(a).attr(e[2]) : (d = $(b, a), c ? d : d.length > 0 ? $(d).text() : void 0)
        },
        cellWidth: function() {
            var a = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable ui-common-table' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"),
                b = a.appendTo("body").find("td").width();
            return a.remove(), Math.abs(b - 5) > .1
        },
        isLocalStorage: function() {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch (a) {
                return !1
            }
        },
        getRegional: function(a, b, c) {
            var d;
            return void 0 !== c ? c : (a.p && a.p.regional && $.jgrid.regional && (d = $.jgrid.getAccessor($.jgrid.regional[a.p.regional] || {}, b)), void 0 === d && (d = $.jgrid.getAccessor($.jgrid, b)), d)
        },
        cell_width: !0,
        ajaxOptions: {},
        from: function(source) {
            var $t = this,
                QueryObject = function(d, q) {
                    "string" == typeof d && (d = $.data(d));
                    var self = this,
                        _data = d,
                        _usecase = !0,
                        _trim = !1,
                        _query = q,
                        _stripNum = /[\$,%]/g,
                        _lastCommand = null,
                        _lastField = null,
                        _orDepth = 0,
                        _negate = !1,
                        _queuedOperator = "",
                        _sorting = [],
                        _useProperties = !0;
                    if ("object" != typeof d || !d.push) throw "data provides is not an array";
                    return d.length > 0 && (_useProperties = "object" != typeof d[0] ? !1 : !0), this._hasData = function() {
                        return null === _data ? !1 : 0 === _data.length ? !1 : !0
                    }, this._getStr = function(a) {
                        var b = [];
                        return _trim && b.push("jQuery.trim("), b.push("String(" + a + ")"), _trim && b.push(")"), _usecase || b.push(".toLowerCase()"), b.join("")
                    }, this._strComp = function(a) {
                        return "string" == typeof a ? ".toString()" : ""
                    }, this._group = function(a, b) {
                        return {
                            field: a.toString(),
                            unique: b,
                            items: []
                        }
                    }, this._toStr = function(a) {
                        return _trim && (a = $.trim(a)), a = a.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"'), _usecase ? a : a.toLowerCase()
                    }, this._funcLoop = function(a) {
                        var b = [];
                        return $.each(_data, function(c, d) {
                            b.push(a(d))
                        }), b
                    }, this._append = function(a) {
                        var b;
                        for (null === _query ? _query = "" : _query += "" === _queuedOperator ? " && " : _queuedOperator, b = 0; _orDepth > b; b++) _query += "(";
                        _negate && (_query += "!"), _query += "(" + a + ")", _negate = !1, _queuedOperator = "", _orDepth = 0
                    }, this._setCommand = function(a, b) {
                        _lastCommand = a, _lastField = b
                    }, this._resetNegate = function() {
                        _negate = !1
                    }, this._repeatCommand = function(a, b) {
                        return null === _lastCommand ? self : null !== a && null !== b ? _lastCommand(a, b) : null === _lastField ? _lastCommand(a) : _useProperties ? _lastCommand(_lastField, a) : _lastCommand(a)
                    }, this._equals = function(a, b) {
                        return 0 === self._compare(a, b, 1)
                    }, this._compare = function(a, b, c) {
                        var d = Object.prototype.toString;
                        return void 0 === c && (c = 1), void 0 === a && (a = null), void 0 === b && (b = null), null === a && null === b ? 0 : null === a && null !== b ? 1 : null !== a && null === b ? -1 : "[object Date]" === d.call(a) && "[object Date]" === d.call(b) ? b > a ? -c : a > b ? c : 0 : (_usecase || "number" == typeof a || "number" == typeof b || (a = String(a), b = String(b)), b > a ? -c : a > b ? c : 0)
                    }, this._performSort = function() {
                        0 !== _sorting.length && (_data = self._doSort(_data, 0))
                    }, this._doSort = function(a, b) {
                        var c = _sorting[b].by,
                            d = _sorting[b].dir,
                            e = _sorting[b].type,
                            f = _sorting[b].datefmt,
                            g = _sorting[b].sfunc;
                        if (b === _sorting.length - 1) return self._getOrder(a, c, d, e, f, g);
                        b++;
                        var h, i, j, k = self._getGroup(a, c, d, e, f),
                            l = [];
                        for (h = 0; h < k.length; h++)
                            for (j = self._doSort(k[h].items, b), i = 0; i < j.length; i++) l.push(j[i]);
                        return l
                    }, this._getOrder = function(a, b, c, d, e, f) {
                        var g, h, i, j, k = [],
                            l = [],
                            m = "a" === c ? 1 : -1;
                        void 0 === d && (d = "text"), j = "float" === d || "number" === d || "currency" === d || "numeric" === d ? function(a) {
                            var b = parseFloat(String(a).replace(_stripNum, ""));
                            return isNaN(b) ? Number.NEGATIVE_INFINITY : b
                        } : "int" === d || "integer" === d ? function(a) {
                            return a ? parseFloat(String(a).replace(_stripNum, "")) : Number.NEGATIVE_INFINITY
                        } : "date" === d || "datetime" === d ? function(a) {
                            return $.jgrid.parseDate.call($t, e, a).getTime()
                        } : $.isFunction(d) ? d : function(a) {
                            return a = a ? $.trim(String(a)) : "", _usecase ? a : a.toLowerCase()
                        }, $.each(a, function(a, c) {
                            h = "" !== b ? $.jgrid.getAccessor(c, b) : c, void 0 === h && (h = ""), h = j(h, c), l.push({
                                vSort: h,
                                index: a
                            })
                        }), $.isFunction(f) ? l.sort(function(a, b) {
                            return a = a.vSort, b = b.vSort, f.call(this, a, b, m)
                        }) : l.sort(function(a, b) {
                            return a = a.vSort, b = b.vSort, self._compare(a, b, m)
                        }), i = 0;
                        for (var n = a.length; n > i;) g = l[i].index, k.push(a[g]), i++;
                        return k
                    }, this._getGroup = function(a, b, c, d, e) {
                        var f, g = [],
                            h = null,
                            i = null;
                        return $.each(self._getOrder(a, b, c, d, e), function(a, c) {
                            f = $.jgrid.getAccessor(c, b), null == f && (f = ""), self._equals(i, f) || (i = f, null !== h && g.push(h), h = self._group(b, f)), h.items.push(c)
                        }), null !== h && g.push(h), g
                    }, this.ignoreCase = function() {
                        return _usecase = !1, self
                    }, this.useCase = function() {
                        return _usecase = !0, self
                    }, this.trim = function() {
                        return _trim = !0, self
                    }, this.noTrim = function() {
                        return _trim = !1, self
                    }, this.execute = function() {
                        var match = _query,
                            results = [];
                        return null === match ? self : ($.each(_data, function() {
                            eval(match) && results.push(this)
                        }), _data = results, self)
                    }, this.data = function() {
                        return _data
                    }, this.select = function(a) {
                        if (self._performSort(), !self._hasData()) return [];
                        if (self.execute(), $.isFunction(a)) {
                            var b = [];
                            return $.each(_data, function(c, d) {
                                b.push(a(d))
                            }), b
                        }
                        return _data
                    }, this.hasMatch = function() {
                        return self._hasData() ? (self.execute(), _data.length > 0) : !1
                    }, this.andNot = function(a, b, c) {
                        return _negate = !_negate, self.and(a, b, c)
                    }, this.orNot = function(a, b, c) {
                        return _negate = !_negate, self.or(a, b, c)
                    }, this.not = function(a, b, c) {
                        return self.andNot(a, b, c)
                    }, this.and = function(a, b, c) {
                        return _queuedOperator = " && ", void 0 === a ? self : self._repeatCommand(a, b, c)
                    }, this.or = function(a, b, c) {
                        return _queuedOperator = " || ", void 0 === a ? self : self._repeatCommand(a, b, c)
                    }, this.orBegin = function() {
                        return _orDepth++, self
                    }, this.orEnd = function() {
                        return null !== _query && (_query += ")"), self
                    }, this.isNot = function(a) {
                        return _negate = !_negate, self.is(a)
                    }, this.is = function(a) {
                        return self._append("this." + a), self._resetNegate(), self
                    }, this._compareValues = function(a, b, c, d, e) {
                        var f;
                        f = _useProperties ? "jQuery.jgrid.getAccessor(this,'" + b + "')" : "this", void 0 === c && (c = null);
                        var g = c,
                            h = void 0 === e.stype ? "text" : e.stype;
                        if (null !== c) switch (h) {
                            case "int":
                            case "integer":
                                g = isNaN(Number(g)) || "" === g ? "0" : g, f = "parseInt(" + f + ",10)", g = "parseInt(" + g + ",10)";
                                break;
                            case "float":
                            case "number":
                            case "numeric":
                                g = String(g).replace(_stripNum, ""), g = isNaN(Number(g)) || "" === g ? "0" : g, f = "parseFloat(" + f + ")", g = "parseFloat(" + g + ")";
                                break;
                            case "date":
                            case "datetime":
                                g = String($.jgrid.parseDate.call($t, e.srcfmt || "Y-m-d", g).getTime()), f = 'jQuery.jgrid.parseDate.call(jQuery("#' + $.jgrid.jqID($t.p.id) + '")[0],"' + e.srcfmt + '",' + f + ").getTime()";
                                break;
                            default:
                                f = self._getStr(f), g = self._getStr('"' + self._toStr(g) + '"')
                        }
                        return self._append(f + " " + d + " " + g), self._setCommand(a, b), self._resetNegate(), self
                    }, this.equals = function(a, b, c) {
                        return self._compareValues(self.equals, a, b, "==", c)
                    }, this.notEquals = function(a, b, c) {
                        return self._compareValues(self.equals, a, b, "!==", c)
                    }, this.isNull = function(a, b, c) {
                        return self._compareValues(self.equals, a, null, "===", c)
                    }, this.greater = function(a, b, c) {
                        return self._compareValues(self.greater, a, b, ">", c)
                    }, this.less = function(a, b, c) {
                        return self._compareValues(self.less, a, b, "<", c)
                    }, this.greaterOrEquals = function(a, b, c) {
                        return self._compareValues(self.greaterOrEquals, a, b, ">=", c)
                    }, this.lessOrEquals = function(a, b, c) {
                        return self._compareValues(self.lessOrEquals, a, b, "<=", c)
                    }, this.startsWith = function(a, b) {
                        var c = null == b ? a : b,
                            d = _trim ? $.trim(c.toString()).length : c.toString().length;
                        return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(b) + '"')) : (null != b && (d = _trim ? $.trim(b.toString()).length : b.toString().length), self._append(self._getStr("this") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(a) + '"'))), self._setCommand(self.startsWith, a), self._resetNegate(), self
                    }, this.endsWith = function(a, b) {
                        var c = null == b ? a : b,
                            d = _trim ? $.trim(c.toString()).length : c.toString().length;
                        return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(" + self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".length-" + d + "," + d + ') == "' + self._toStr(b) + '"') : self._append(self._getStr("this") + ".substr(" + self._getStr("this") + '.length-"' + self._toStr(a) + '".length,"' + self._toStr(a) + '".length) == "' + self._toStr(a) + '"'), self._setCommand(self.endsWith, a), self._resetNegate(), self
                    }, this.contains = function(a, b) {
                        return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + '.indexOf("' + self._toStr(b) + '",0) > -1') : self._append(self._getStr("this") + '.indexOf("' + self._toStr(a) + '",0) > -1'), self._setCommand(self.contains, a), self._resetNegate(), self
                    }, this.groupBy = function(a, b, c, d) {
                        return self._hasData() ? self._getGroup(_data, a, b, c, d) : null
                    }, this.orderBy = function(a, b, c, d, e) {
                        return b = null == b ? "a" : $.trim(b.toString().toLowerCase()), null == c && (c = "text"), null == d && (d = "Y-m-d"), null == e && (e = !1), ("desc" === b || "descending" === b) && (b = "d"), ("asc" === b || "ascending" === b) && (b = "a"), _sorting.push({
                            by: a,
                            dir: b,
                            type: c,
                            datefmt: d,
                            sfunc: e
                        }), self
                    }, self
                };
            return new QueryObject(source, null)
        },
        getMethod: function(a) {
            return this.getAccessor($.fn.jqGrid, a)
        },
        extend: function(a) {
            $.extend($.fn.jqGrid, a), this.no_legacy_api || $.fn.extend(a)
        },
        clearBeforeUnload: function(a) {
            var b, c = $("#" + $.jgrid.jqID(a))[0];
            if (c.grid) {
                b = c.grid, $.isFunction(b.emptyRows) && b.emptyRows.call(c, !0, !0), $(document).unbind("mouseup.jqGrid" + c.p.id), $(b.hDiv).unbind("mousemove"), $(c).unbind();
                var d, e = b.headers.length,
                    f = ["formatCol", "sortData", "updatepager", "refreshIndex", "setHeadCheckBox", "constructTr", "formatter", "addXmlData", "addJSONData", "grid", "p"];
                for (d = 0; e > d; d++) b.headers[d].el = null;
                for (d in b) b.hasOwnProperty(d) && (b[d] = null);
                for (d in c.p) c.p.hasOwnProperty(d) && (c.p[d] = $.isArray(c.p[d]) ? [] : null);
                for (e = f.length, d = 0; e > d; d++) c.hasOwnProperty(f[d]) && (c[f[d]] = null, delete c[f[d]])
            }
        },
        gridUnload: function(a) {
            if (a) {
                a = $.trim(a), 0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    var c = {
                        id: $(b).attr("id"),
                        cl: $(b).attr("class")
                    };
                    b.p.pager && $(b.p.pager).unbind().empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
                    var d = document.createElement("table");
                    d.className = c.cl;
                    var e = $.jgrid.jqID(b.id);
                    $(d).removeClass("ui-jqgrid-btable ui-common-table").insertBefore("#gbox_" + e), 1 === $(b.p.pager).parents("#gbox_" + e).length && $(b.p.pager).insertBefore("#gbox_" + e), $.jgrid.clearBeforeUnload(a), $("#gbox_" + e).remove(), $(d).attr({
                        id: c.id
                    }), $("#alertmod_" + $.jgrid.jqID(a)).remove()
                }
            }
        },
        gridDestroy: function(a) {
            if (a) {
                a = $.trim(a), 0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    b.p.pager && $(b.p.pager).remove();
                    try {
                        $.jgrid.clearBeforeUnload(a), $("#gbox_" + $.jgrid.jqID(a)).remove()
                    } catch (c) {}
                }
            }
        },
        styleUI: {
            jQueryMobile: {
                common: {
                    disabled: "ui-state-disabled",
                    highlight: "ui-flipswitch-active",
                    hover: "ui-jqgrid-hover",
                    cornerall: "ui-corner-all",
                    cornertop: "ui-corner-top",
                    cornerbottom: "ui-corner-bottom",
                    hidden: "ui-screen-hidden",
                    icon_base: "",
                    overlay: "ui-overlay",
                    active: "ui-btn-active",
                    error: "ui-error",
                    button: "ui-btn",
                    content: "ui-content"
                },
                base: {
                    entrieBox: "ui-responsive ui-corner-all",
                    viewBox: "",
                    headerTable: "ui-responsive table-stroke",
                    headerBox: "",
                    rowTable: "ui-responsive table-stroke",
                    rowBox: "",
                    footerTable: "ui-responsive table-stroke",
                    footerBox: "",
                    headerDiv: "",
                    bodyDiv: "ui-content",
                    gridtitleBox: "ui-corner-top",
                    customtoolbarBox: "",
                    loadingBox: "",
                    rownumBox: "",
                    scrollBox: "",
                    multiBox: "cbox",
                    pagerBox: "ui-corner-bottom",
                    toppagerBox: "",
                    pgInput: "ui-corner-all",
                    pgSelectBox: "ui-corner-all",
                    pgButtonBox: "ui-corner-all",
                    icon_first: "ui-icon-seek-first",
                    icon_prev: "ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-corner-all ui-btn-inline",
                    icon_next: "ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-corner-all ui-btn-inline",
                    icon_end: "ui-icon-seek-end",
                    icon_popup: "ui-btn ui-icon-gear ui-btn-icon-notext ui-corner-all ui-btn-inline",
                    icon_asc: "ui-btn ui-icon-arrow-u ui-btn-icon-notext ui-corner-all ui-btn-inline ui-mini",
                    icon_desc: "ui-btn ui-icon-arrow-d ui-btn-icon-notext ui-corner-all ui-btn-inline ui-mini",
                    icon_caption_open: "ui-btn ui-icon-carat-u ui-btn-icon-notext ui-corner-all ui-btn-inline ui-mini",
                    icon_caption_close: "ui-btn ui-icon-carat-d ui-btn-icon-notext ui-corner-all ui-btn-inline ui-mini"
                },
                modal: {
                    modal: "ui-content ui-corner-all",
                    header: "ui-corner-all",
                    content: "ui-content",
                    resizable: "",
                    icon_close: "ui-btn ui-icon-close",
                    icon_resizable: ""
                },
                celledit: {
                    inputClass: ""
                },
                inlinedit: {
                    inputClass: "",
                    icon_edit_nav: "",
                    icon_add_nav: "",
                    icon_save_nav: "",
                    icon_cancel_nav: ""
                },
                formedit: {
                    inputClass: "",
                    icon_prev: "ui-btn ui-btn-icon-notext ui-corner-all ui-btn-inline ui-icon-carat-l ui-mini",
                    icon_next: "ui-btn ui-btn-icon-notext ui-corner-all ui-btn-inline ui-icon-carat-r ui-mini",
                    icon_save: "ui-btn ui-corner-all ui-btn-inline ui-mini",
                    icon_close: "ui-btn ui-corner-all ui-btn-inline ui-mini",
                    icon_del: "",
                    icon_cancel: "ui-btn ui-corner-all ui-btn-inline ui-mini"
                },
                navigator: {
                    icon_edit_nav: "",
                    icon_add_nav: "",
                    icon_del_nav: "",
                    icon_search_nav: "",
                    icon_refresh_nav: "",
                    icon_view_nav: "",
                    icon_newbutton_nav: ""
                },
                grouping: {
                    icon_plus: "ui-icon-circlesmall-plus",
                    icon_minus: "ui-icon-circlesmall-minus"
                },
                filter: {
                    table_widget: "",
                    srSelect: "ui-corner-all ui-mini",
                    srInput: "ui-corner-all ui-mini",
                    menu_widget: "ui-content",
                    icon_search: "ui-btn ui-corner-all ui-btn-inline ui-mini",
                    icon_reset: "ui-btn ui-corner-all ui-btn-inline ui-mini",
                    icon_query: "ui-btn ui-corner-all ui-btn-inline ui-mini",
                    icon_clear: "ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all"
                },
                subgrid: {
                    icon_plus: "ui-btn ui-btn-icon-notext ui-corner-all ui-icon-arrow-r ui-mini",
                    icon_minus: "ui-btn ui-btn-icon-notext ui-corner-all ui-icon-arrow-d ui-mini",
                    icon_open: ""
                },
                treegrid: {
                    icon_plus: "ui-icon-triangle-1-",
                    icon_minus: "ui-icon-triangle-1-s",
                    icon_leaf: "ui-icon-radio-off"
                },
                fmatter: {
                    icon_edit: "ui-icon-pencil",
                    icon_add: "ui-icon-plus",
                    icon_save: "ui-icon-disk",
                    icon_cancel: "ui-icon-cancel",
                    icon_del: "ui-icon-trash"
                }
            }
        }
    }), $.fn.jqGrid = function(a) {
        if ("string" == typeof a) {
            var b = $.jgrid.getMethod(a);
            if (!b) throw "jqGrid - No such method: " + a;
            var c = $.makeArray(arguments).slice(1);
            return b.apply(this, c)
        }
        return this.each(function() {
            if (!this.grid) {
                var b;
                null != a && void 0 !== a.data && (b = a.data, a.data = []);
                var c = $.extend(!0, {
                    url: "",
//                    height: 150,
                    page: 1,
                    rowNum: 20,
                    rowTotal: null,
                    records: 0,
                    pager: "",
                    pgbuttons: !0,
                    pginput: !0,
                    colModel: [],
                    rowList: [],
                    colNames: [],
                    sortorder: "asc",
                    sortname: "",
                    datatype: "xml",
                    mtype: "GET",
                    altRows: !1,
                    selarrrow: [],
                    savedRow: [],
                    shrinkToFit: !0,
                    xmlReader: {},
                    jsonReader: {},
                    subGrid: !1,
                    subGridModel: [],
                    reccount: 0,
                    lastpage: 0,
                    lastsort: 0,
                    selrow: null,
                    beforeSelectRow: null,
                    onSelectRow: null,
                    onSortCol: null,
                    ondblClickRow: null,
                    onRightClickRow: null,
                    onPaging: null,
                    onSelectAll: null,
                    onInitGrid: null,
                    loadComplete: null,
                    gridComplete: null,
                    loadError: null,
                    loadBeforeSend: null,
                    afterInsertRow: null,
                    beforeRequest: null,
                    beforeProcessing: null,
                    onHeaderClick: null,
                    viewrecords: !1,
                    loadonce: !1,
                    multiselect: !1,
                    multikey: !1,
                    editurl: null,
                    search: !1,
                    caption: "",
                    hidegrid: !0,
                    hiddengrid: !1,
                    postData: {},
                    userData: {},
                    treeGrid: !1,
                    treeGridModel: "nested",
                    treeReader: {},
                    treeANode: -1,
                    ExpandColumn: null,
                    tree_root_level: 0,
                    prmNames: {
                        page: "page",
                        rows: "rows",
                        sort: "sidx",
                        order: "sord",
                        search: "_search",
                        nd: "nd",
                        id: "id",
                        oper: "oper",
                        editoper: "edit",
                        addoper: "add",
                        deloper: "del",
                        subgridid: "id",
                        npage: null,
                        totalrows: "totalrows"
                    },
                    forceFit: !1,
                    gridstate: "visible",
                    cellEdit: !1,
                    cellsubmit: "remote",
                    nv: 0,
                    loadui: "enable",
                    toolbar: [!1, ""],
                    scroll: !1,
                    multiboxonly: !1,
                    deselectAfterSort: !0,
                    scrollrows: !1,
                    autowidth: !1,
                    scrollOffset: 18,
                    cellLayout: 10,
                    subGridWidth: 20,
                    multiselectWidth: 30,
                    gridview: !0,
                    rownumWidth: 35,
                    rownumbers: !1,
                    pagerpos: "center",
                    recordpos: "right",
                    footerrow: !1,
                    userDataOnFooter: !1,
                    hoverrows: !0,
                    altclass: "ui-priority-secondary",
                    viewsortcols: [!1, "horizontal", !0],
                    resizeclass: "",
                    autoencode: !1,
                    remapColumns: [],
                    ajaxGridOptions: {},
                    direction: "ltr",
                    toppager: !1,
                    headertitles: !1,
                    scrollTimeout: 40,
                    data: [],
                    _index: {},
                    grouping: !1,
                    groupingView: {
                        groupField: [],
                        groupOrder: [],
                        groupText: [],
                        groupColumnShow: [],
                        groupSummary: [],
                        showSummaryOnHide: !1,
                        sortitems: [],
                        sortnames: [],
                        summary: [],
                        summaryval: [],
                        plusicon: "",
                        minusicon: "",
                        displayField: [],
                        groupSummaryPos: [],
                        formatDisplayField: [],
                        _locgr: !1
                    },
                    ignoreCase: !0,
                    cmTemplate: {},
                    idPrefix: "",
                    multiSort: !1,
                    minColWidth: 33,
                    scrollPopUp: !1,
                    scrollTopOffset: 0,
                    scrollLeftOffset: "100%",
                    storeNavOptions: !1,
                    regional: "en",
                    styleUI: "jQueryMobile",
                    iScroll: {},
                    scrollPaging: !1,
                    refreshContent: !0,
                    dataTheme: ""
                }, $.jgrid.defaults, $.jgrid.mobile, a);
                void 0 !== b && (c.data = b, a.data = b);
                var d, e = this,
                    f = {
                        headers: [],
                        cols: [],
                        footers: [],
                        dragStart: function(a, b, d) {
                            var f = $(this.bDiv).offset().left;
                            this.resizing = {
                                idx: a,
                                startX: b.pageX,
                                sOL: b.pageX - f
                            }, this.hDiv.style.cursor = "col-resize", this.curGbox = $("#rs_m" + $.jgrid.jqID(c.id), "#gbox_" + $.jgrid.jqID(c.id)), this.curGbox.css({
                                display: "block",
                                left: b.pageX - f,
                                top: d[1],
                                height: d[2]
                            }), $(e).triggerHandler("jqGridResizeStart", [b, a]), $.isFunction(c.resizeStart) && c.resizeStart.call(e, b, a), document.onselectstart = function() {
                                return !1
                            }
                        },
                        dragMove: function(a) {
                            if (this.resizing) {
                                var b, d, e = a.pageX - this.resizing.startX,
                                    f = this.headers[this.resizing.idx],
                                    g = "ltr" === c.direction ? f.width + e : f.width - e;
                                g > 33 && (this.curGbox.css({
                                    left: this.resizing.sOL + e
                                }), c.forceFit === !0 ? (b = this.headers[this.resizing.idx + c.nv], d = "ltr" === c.direction ? b.width - e : b.width + e, d > c.minColWidth && (f.newWidth = g, b.newWidth = d)) : (this.newWidth = "ltr" === c.direction ? c.tblwidth + e : c.tblwidth - e, f.newWidth = g))
                            }
                        },
                        dragEnd: function(a) {
                            if (this.hDiv.style.cursor = "default", this.resizing) {
                                var b = this.resizing.idx,
                                    d = this.headers[b].newWidth || this.headers[b].width;
                                d = parseInt(d, 10), this.resizing = !1, $("#rs_m" + $.jgrid.jqID(c.id)).css("display", "none"), c.colModel[b].width = d, this.headers[b].width = d, this.headers[b].el.style.width = d + "px", this.cols[b].style.width = d + "px", this.footers.length > 0 && (this.footers[b].style.width = d + "px"), c.forceFit === !0 ? (d = this.headers[b + c.nv].newWidth || this.headers[b + c.nv].width, this.headers[b + c.nv].width = d, this.headers[b + c.nv].el.style.width = d + "px", this.cols[b + c.nv].style.width = d + "px", this.footers.length > 0 && (this.footers[b + c.nv].style.width = d + "px"), c.colModel[b + c.nv].width = d) : (c.tblwidth = this.newWidth || c.tblwidth, $("table:first", this.bDiv).css("width", c.tblwidth + "px"), $("table:first", this.hDiv).css("width", c.tblwidth + "px"), this.hDiv.scrollLeft = this.bDiv.scrollLeft, c.footerrow && ($("table:first", this.sDiv).css("width", c.tblwidth + "px"), this.sDiv.scrollLeft = this.bDiv.scrollLeft)), a && ($(e).triggerHandler("jqGridResizeStop", [d, b]), $.isFunction(c.resizeStop) && c.resizeStop.call(e, d, b))
                            }
                            this.curGbox = null, document.onselectstart = function() {
                                return !0
                            }
                        },
                        populateVisible: function() {
                            f.timer && clearTimeout(f.timer), f.timer = null;
                            var a = $(f.bDiv).height();
                            if (a) {
                                var b, d, e = $("table:first", f.bDiv);
                                if (e[0].rows.length) try {
                                    b = e[0].rows[1], d = b ? $(b).outerHeight() || f.prevRowHeight : f.prevRowHeight
                                } catch (g) {
                                    d = f.prevRowHeight
                                }
                                if (d) {
                                    f.prevRowHeight = d;
                                    var h, i, j, k = c.rowNum,
                                        l = f.scrollTop = f.bDiv.scrollTop,
                                        m = Math.round(e.position().top) - l,
                                        n = m + e.height(),
                                        o = d * k;
                                    if (a > n && 0 >= m && (void 0 === c.lastpage || (parseInt((n + l + o - 1) / o, 10) || 0) <= c.lastpage) && (i = parseInt((a - n + o - 1) / o, 10) || 1, n >= 0 || 2 > i || c.scroll === !0 ? (h = (Math.round((n + l) / o) || 0) + 1, m = -1) : m = 1), m > 0 && (h = (parseInt(l / o, 10) || 0) + 1, i = (parseInt((l + a) / o, 10) || 0) + 2 - h, j = !0), i) {
                                        if (c.lastpage && (h > c.lastpage || 1 === c.lastpage || h === c.page && h === c.lastpage)) return;
                                        f.hDiv.loading ? f.timer = setTimeout(f.populateVisible, c.scrollTimeout) : (c.page = h, j && (f.selectionPreserver(e[0]), f.emptyRows.call(e[0], !1, !1)), f.populate(i))
                                    }
                                }
                            }
                        },
                        scrollGrid: function(a) {
                            if (c.scroll) {
                                var b = f.bDiv.scrollTop;
                                void 0 === f.scrollTop && (f.scrollTop = 0), b !== f.scrollTop && (f.scrollTop = b, f.timer && clearTimeout(f.timer), f.timer = setTimeout(f.populateVisible, c.scrollTimeout))
                            }
                            f.hDiv.scrollLeft = f.bDiv.scrollLeft, c.footerrow && (f.sDiv.scrollLeft = f.bDiv.scrollLeft), c.frozenColumns && $(f.fbDiv).scrollTop(f.bDiv.scrollTop), a && a.stopPropagation()
                        },
                        selectionPreserver: function(a) {
                            var b = a.p,
                                c = b.selrow,
                                d = b.selarrrow ? $.makeArray(b.selarrrow) : null,
                                e = a.grid.bDiv.scrollLeft,
                                f = function() {
                                    var g;
                                    if (b.selrow = null, b.selarrrow = [], b.multiselect && d && d.length > 0)
                                        for (g = 0; g < d.length; g++) d[g] !== c && $(a).jqGrid("setSelection", d[g], !1, null);
                                    c && $(a).jqGrid("setSelection", c, !1, null), a.grid.bDiv.scrollLeft = e, $(a).unbind(".selectionPreserver", f)
                                };
                            $(a).bind("jqGridGridComplete.selectionPreserver", f)
                        }
                    };
                if ("TABLE" !== this.tagName.toUpperCase() || null == this.id) return void alert("Element is not a table or has no id!");
                if (void 0 !== document.documentMode && document.documentMode <= 5) return void alert("Grid can not be used in this ('quirks') mode!");
                var g, h, i, j = 0;
                for (h in $.jgrid.regional) $.jgrid.regional.hasOwnProperty(h) && (0 === j && (g = h), j++);
                if (1 === j && g !== c.regional && (c.regional = g), $(this).empty().attr("tabindex", "0"), this.p = c, this.p.useProp = !!$.fn.prop, 0 === this.p.colNames.length)
                    for (j = 0; j < this.p.colModel.length; j++) this.p.colNames[j] = this.p.colModel[j].label || this.p.colModel[j].name;
                if (this.p.colNames.length !== this.p.colModel.length) return void alert($.jgrid.getRegional(this, "errors.model"));
                var k, l = $.jgrid.getMethod("getStyleUI"),
                    m = e.p.styleUI + ".common",
                    n = l(m, "disabled", !0),
                    o = l(m, "highlight", !0),
                    p = l(m, "hover", !0),
                    q = l(m, "cornerall", !0),
                    r = l(m, "icon_base", !0),
                    s = $.jgrid.msie,
                    t = [],
                    u = [],
                    v = [],
                    w = $(this).closest("div:jqmData(role='page')");
                e.p.dataTheme || (e.p.dataTheme = "a", w.length && w.attr("data-theme") && (e.p.dataTheme = w.attr("data-theme"))), m = e.p.styleUI + ".base", k = $("<div " + l(m, "viewBox", !1, "ui-jqgrid-view") + " role='grid'></div>"), e.p.direction = $.trim(e.p.direction.toLowerCase()), e.p._ald = !1, -1 === $.inArray(e.p.direction, ["ltr", "rtl"]) && (e.p.direction = "ltr"), i = e.p.direction, $(k).insertBefore(this), $(this).appendTo(k);
                var x = $("<div " + l(m, "entrieBox", !1, "ui-jqgrid") + "></div>");
                $(x).attr({
                    id: "gbox_" + this.id,
                    dir: i
                }).insertBefore(k), $(k).attr("id", "gview_" + this.id).appendTo(x), $(this).attr({
                    role: "presentation",
                    "aria-multiselectable": !!this.p.multiselect,
                    "aria-labelledby": "gbox_" + this.id
                });
                var y, z = ["shiftKey", "altKey", "ctrlKey"],
                    A = function(a, b) {
                        return a = parseInt(a, 10), isNaN(a) ? b || 0 : a
                    },
                    B = function(a, b, c, d, g, h) {
                        var i, j, k = e.p.colModel[a],
                            l = k.align,
                            m = 'style="',
                            n = k.classes,
                            o = k.name,
                            p = [];
                        return l && (m += "text-align:" + l + ";"), k.hidden === !0 && (m += "display:none;"), 0 === b ? m += "width: " + f.headers[a].width + "px;" : ($.isFunction(k.cellattr) || "string" == typeof k.cellattr && null != $.jgrid.cellattr && $.isFunction($.jgrid.cellattr[k.cellattr])) && (i = $.isFunction(k.cellattr) ? k.cellattr : $.jgrid.cellattr[k.cellattr], j = i.call(e, g, c, d, k, h), j && "string" == typeof j && (j = j.replace(/style/i, "style").replace(/title/i, "title"), j.indexOf("title") > -1 && (k.title = !1), j.indexOf("class") > -1 && (n = void 0), p = j.replace(/\-style/g, "-sti").split(/style/), 2 === p.length ? (p[1] = $.trim(p[1].replace(/\-sti/g, "-style").replace("=", "")), (0 === p[1].indexOf("'") || 0 === p[1].indexOf('"')) && (p[1] = p[1].substring(1)), m += p[1].replace(/'/gi, '"')) : m += '"')), p.length || (p[0] = "", m += '"'), m += (void 0 !== n ? ' class="' + n + '"' : "") + (k.title && c ? ' title="' + $.jgrid.stripHtml(c) + '"' : ""), m += ' aria-describedby="' + e.p.id + "_" + o + '"', m + p[0]
                    },
                    C = function(a) {
                        return null == a || "" === a ? "&#160;" : e.p.autoencode ? $.jgrid.htmlEncode(a) : String(a)
                    },
                    D = function(a, b, c, d, f) {
                        var g, h = e.p.colModel[c];
                        if (void 0 !== h.formatter) {
                            a = "" !== String(e.p.idPrefix) ? $.jgrid.stripPref(e.p.idPrefix, a) : a;
                            var i = {
                                rowId: a,
                                colModel: h,
                                gid: e.p.id,
                                pos: c,
                                styleUI: e.p.styleUI
                            };
                            g = $.isFunction(h.formatter) ? h.formatter.call(e, b, i, d, f) : $.fmatter ? $.fn.fmatter.call(e, h.formatter, b, i, d, f) : C(b)
                        } else g = C(b);
                        return g
                    },
                    E = function(a, b, c, d, e, f) {
                        var g, h;
                        return g = D(a, b, c, e, "add"), h = B(c, d, g, e, a, f), '<td role="gridcell" ' + h + ">" + g + "</td>"
                    },
                    F = function(a, b, c, d, f) {
                        var g = '<input data-role="none" role="checkbox" type="checkbox" id="jqg_' + e.p.id + "_" + a + '" ' + f + ' name="jqg_' + e.p.id + "_" + a + '"' + (d ? 'checked="checked"' : "") + "/>",
                            h = B(b, c, "", null, a, !0);
                        return '<td role="gridcell" ' + h + ">" + g + "</td>"
                    },
                    G = function(a, b, c, d, e) {
                        var f = (parseInt(c, 10) - 1) * parseInt(d, 10) + 1 + b,
                            g = B(a, b, f, null, b, !0);
                        return '<td role="gridcell" ' + e + " " + g + ">" + f + "</td>"
                    },
                    H = function(a) {
                        var b, c, d = [],
                            f = 0;
                        for (c = 0; c < e.p.colModel.length; c++) b = e.p.colModel[c], "cb" !== b.name && "subgrid" !== b.name && "rn" !== b.name && (d[f] = "local" === a ? b.name : "xml" === a || "xmlstring" === a ? b.xmlmap || b.name : b.jsonmap || b.name, e.p.keyName !== !1 && b.key === !0 && (e.p.keyName = d[f]), f++);
                        return d
                    },
                    I = function(a) {
                        var b = e.p.remapColumns;
                        return b && b.length || (b = $.map(e.p.colModel, function(a, b) {
                            return b
                        })), a && (b = $.map(b, function(b) {
                            return a > b ? null : b - a
                        })), b
                    },
                    J = function(a, b) {
                        var c;
                        this.p.deepempty ? $(this.rows).slice(1).remove() : (c = this.rows.length > 0 ? this.rows[0] : null, $(this.firstChild).empty().append(c)), b === !0 && this.p.treeGrid && !this.p.loadonce && (this.p.data = [], this.p._index = {})
                    },
                    K = function() {
                        var a, b, c, d, f, g, h, i, j, k, l, m = e.p,
                            n = m.data,
                            o = n.length,
                            p = m.localReader,
                            q = m.colModel,
                            r = p.cell,
                            s = (m.multiselect === !0 ? 1 : 0) + (m.subGrid === !0 ? 1 : 0) + (m.rownumbers === !0 ? 1 : 0),
                            t = m.scroll ? $.jgrid.randId() : 1;
                        if ("local" === m.datatype && p.repeatitems === !0)
                            for (j = I(s), k = H("local"), d = m.keyIndex === !1 ? $.isFunction(p.id) ? p.id.call(e, n) : p.id : m.keyIndex, a = 0; o > a; a++) {
                                for (c = n[a], f = $.jgrid.getAccessor(c, d), void 0 === f && ("number" == typeof d && null != q[d + s] && (f = $.jgrid.getAccessor(c, q[d + s].name)), void 0 === f && (f = t + a, r && (g = $.jgrid.getAccessor(c, r) || c, f = null != g && void 0 !== g[d] ? g[d] : f, g = null))), i = {}, i[p.id] = f, r && (c = $.jgrid.getAccessor(c, r) || c), l = $.isArray(c) ? j : k, b = 0; b < l.length; b++) h = $.jgrid.getAccessor(c, l[b]), i[q[b + s].name] = h;
                                $.extend(!0, n[a], i)
                            }
                    },
                    L = function() {
                        var a, b, c, d = e.p.data.length;
                        for (a = e.p.keyName === !1 || e.p.loadonce === !0 ? e.p.localReader.id : e.p.keyName, e.p._index = [], b = 0; d > b; b++) c = $.jgrid.getAccessor(e.p.data[b], a), void 0 === c && (c = String(b + 1)), e.p._index[c] = b
                    },
                    M = function(a, b, c, d, f) {
                        var g, h = "-1",
                            i = "",
                            j = b ? "display:none;" : "",
                            k = $(e).triggerHandler("jqGridRowAttr", [d, f, a]);
                        if ("object" != typeof k && (k = $.isFunction(e.p.rowattr) ? e.p.rowattr.call(e, d, f, a) : "string" == typeof e.p.rowattr && null != $.jgrid.rowattr && $.isFunction($.jgrid.rowattr[e.p.rowattr]) ? $.jgrid.rowattr[e.p.rowattr].call(e, d, f, a) : {}), !$.isEmptyObject(k)) {
                            k.hasOwnProperty("id") && (a = k.id, delete k.id), k.hasOwnProperty("tabindex") && (h = k.tabindex, delete k.tabindex), k.hasOwnProperty("style") && (j += k.style, delete k.style), k.hasOwnProperty("class") && (c += " " + k["class"], delete k["class"]);
                            try {
                                delete k.role
                            } catch (l) {}
                            for (g in k) k.hasOwnProperty(g) && (i += " " + g + "=" + k[g])
                        }
                        return '<tr role="row" id="' + a + '" tabindex="' + h + '" class="' + c + '"' + ("" === j ? "" : ' style="' + j + '"') + i + ">"
                    },
                    N = function(a, b, c, d) {
                        var f = new Date,
                            g = "local" !== e.p.datatype && e.p.loadonce || "xmlstring" === e.p.datatype,
                            h = "_id_",
                            i = e.p.xmlReader,
                            j = "local" === e.p.datatype ? "local" : "xml";
                        if (g && (e.p.data = [], e.p._index = {}, e.p.localReader.id = h), e.p.reccount = 0, $.isXMLDoc(a)) {
                            -1 !== e.p.treeANode || e.p.scroll ? b = b > 1 ? b : 1 : (J.call(e, !1, !0), b = 1);
                            var k, n, o, p, q, r, s, t, u, v, w = $(e),
                                x = 0,
                                y = e.p.multiselect === !0 ? 1 : 0,
                                z = 0,
                                B = e.p.rownumbers === !0 ? 1 : 0,
                                C = [],
                                D = {},
                                K = [],
                                L = e.p.altRows === !0 ? e.p.altclass : "",
                                N = l(m, "rowBox", !0, "jqgrow ui-row-" + e.p.direction);
                            e.p.subGrid === !0 && (z = 1, p = $.jgrid.getMethod("addSubGridCell")), i.repeatitems || (C = H(j)), q = e.p.keyName === !1 ? $.isFunction(i.id) ? i.id.call(e, a) : i.id : e.p.keyName, r = -1 === String(q).indexOf("[") ? C.length ? function(a, b) {
                                return $(q, a).text() || b
                            } : function(a, b) {
                                return $(i.cell, a).eq(q).text() || b
                            } : function(a, b) {
                                return a.getAttribute(q.replace(/[\[\]]/g, "")) || b
                            }, e.p.userData = {}, e.p.page = A($.jgrid.getXmlData(a, i.page), e.p.page), e.p.lastpage = A($.jgrid.getXmlData(a, i.total), 1), e.p.records = A($.jgrid.getXmlData(a, i.records)), $.isFunction(i.userdata) ? e.p.userData = i.userdata.call(e, a) || {} : $.jgrid.getXmlData(a, i.userdata, !0).each(function() {
                                e.p.userData[this.getAttribute("name")] = $(this).text()
                            });
                            var O = $.jgrid.getXmlData(a, i.root, !0);
                            O = $.jgrid.getXmlData(O, i.row, !0), O || (O = []);
                            var P, Q = O.length,
                                R = 0,
                                S = [],
                                T = parseInt(e.p.rowNum, 10),
                                U = e.p.scroll ? $.jgrid.randId() : 1;
                            if (Q > 0 && e.p.page <= 0 && (e.p.page = 1), O && Q) {
                                d && (T *= d + 1);
                                var V, W = $.isFunction(e.p.afterInsertRow),
                                    X = !1,
                                    Y = $("#" + $.jgrid.jqID(e.p.id) + " tbody:first"),
                                    Z = B ? l(m, "rownumBox", !1, "jqgrid-rownum") : "",
                                    _ = y ? l(m, "multiBox", !1, "cbox") : "";
                                for (e.p.grouping && (X = e.p.groupingView.groupCollapse === !0, V = $.jgrid.getMethod("groupingPrepare")); Q > R;) {
                                    t = O[R], u = r(t, U + R), u = e.p.idPrefix + u, P = 0 === b ? 0 : b + 1, v = N + ((P + R) % 2 === 1 ? " " + L : "");
                                    var aa = K.length;
                                    if (K.push(""), B && K.push(G(0, R, e.p.page, e.p.rowNum, Z)), y && K.push(F(u, B, R, !1, _)), z && K.push(p.call(w, y + B, R + b)), i.repeatitems) {
                                        s || (s = I(y + z + B));
                                        var ba = $.jgrid.getXmlData(t, i.cell, !0);
                                        $.each(s, function(a) {
                                            var c = ba[this];
                                            return c ? (o = c.textContent || c.text, D[e.p.colModel[a + y + z + B].name] = o, void K.push(E(u, o, a + y + z + B, R + b, t, D))) : !1
                                        })
                                    } else
                                        for (k = 0; k < C.length; k++) o = $.jgrid.getXmlData(t, C[k]), D[e.p.colModel[k + y + z + B].name] = o, K.push(E(u, o, k + y + z + B, R + b, t, D));
                                    if (K[aa] = M(u, X, v, D, t), K.push("</tr>"), e.p.grouping && (S.push(K), e.p.groupingView._locgr || V.call(w, D, R), K = []), (g || e.p.treeGrid === !0 && !e.p._ald) && (D[h] = $.jgrid.stripPref(e.p.idPrefix, u), e.p.data.push(D), e.p._index[D[h]] = e.p.data.length - 1), e.p.gridview === !1 && (Y.append(K.join("")), w.triggerHandler("jqGridAfterInsertRow", [u, D, t]), W && e.p.afterInsertRow.call(e, u, D, t), K = []), D = {}, x++, R++, x === T) break
                                }
                            }
                            try{
                            if (e.p.gridview === !0 && (n = e.p.treeANode > -1 ? e.p.treeANode : 0, e.p.grouping ? g || (w.jqGrid("groupingRender", S, e.p.colModel.length, e.p.page, T), S = null) : e.p.treeGrid === !0 && n > 0 ? $(e.rows[n]).after(K.join("")) : (Y.append(K.join("")), e.grid.cols = e.rows[0].cells)), e.p.subGrid === !0) try {
                                w.jqGrid("addSubGrid", y + B)
                            } catch (ca) {}}
                            catch(ca){
                                
                            }
                            if (e.p.totaltime = new Date - f, x > 0 && 0 === e.p.records && (e.p.records = Q), K = null, e.p.treeGrid === !0) try {
                                w.jqGrid("setTreeNode", n + 1, x + n + 1)
                            } catch (da) {}
                            if (e.p.reccount = x, e.p.treeANode = -1, e.p.userDataOnFooter && w.jqGrid("footerData", "set", e.p.userData, !0), g && (e.p.records = Q, e.p.lastpage = Math.ceil(Q / T)), c || e.updatepager(!1, !0), g) {
                                for (; Q > x;) {
                                    if (t = O[x], u = r(t, x + U), u = e.p.idPrefix + u, i.repeatitems) {
                                        s || (s = I(y + z + B));
                                        var ea = $.jgrid.getXmlData(t, i.cell, !0);
                                        $.each(s, function(a) {
                                            var b = ea[this];
                                            return b ? (o = b.textContent || b.text, void(D[e.p.colModel[a + y + z + B].name] = o)) : !1
                                        })
                                    } else
                                        for (k = 0; k < C.length; k++) o = $.jgrid.getXmlData(t, C[k]), D[e.p.colModel[k + y + z + B].name] = o;
                                    D[h] = $.jgrid.stripPref(e.p.idPrefix, u), e.p.grouping && V.call(w, D, x), e.p.data.push(D), e.p._index[D[h]] = e.p.data.length - 1, D = {}, x++
                                }
                                e.p.grouping && (e.p.groupingView._locgr = !0, w.jqGrid("groupingRender", S, e.p.colModel.length, e.p.page, T), S = null)
                            }
                        }
                    },
                    O = function(a, b, c, d) {
                        var f = new Date;
                        if (a) {
                            -1 !== e.p.treeANode || e.p.scroll ? b = b > 1 ? b : 1 : (J.call(e, !1, !0), b = 1);
                            var g, h, i = "_id_",
                                j = "local" !== e.p.datatype && e.p.loadonce || "jsonstring" === e.p.datatype;
                            j && (e.p.data = [], e.p._index = {}, e.p.localReader.id = i), e.p.reccount = 0, "local" === e.p.datatype ? (g = e.p.localReader, h = "local") : (g = e.p.jsonReader, h = "json");
                            var k, n, p, q, r, s, t, u, v, w, x, y, z = $(e),
                                B = 0,
                                C = [],
                                D = e.p.multiselect ? 1 : 0,
                                K = e.p.subGrid === !0 ? 1 : 0,
                                L = e.p.rownumbers === !0 ? 1 : 0,
                                N = I(D + K + L),
                                O = H(h),
                                P = {},
                                Q = [],
                                R = e.p.altRows === !0 ? e.p.altclass : "",
                                S = l(m, "rowBox", !0, "jqgrow ui-row-" + e.p.direction);
                            e.p.page = A($.jgrid.getAccessor(a, g.page), e.p.page), e.p.lastpage = A($.jgrid.getAccessor(a, g.total), 1), e.p.records = A($.jgrid.getAccessor(a, g.records)), e.p.userData = $.jgrid.getAccessor(a, g.userdata) || {}, K && (r = $.jgrid.getMethod("addSubGridCell")), v = e.p.keyName === !1 ? $.isFunction(g.id) ? g.id.call(e, a) : g.id : e.p.keyName, u = $.jgrid.getAccessor(a, g.root), null == u && $.isArray(a) && (u = a), u || (u = []), t = u.length, n = 0, t > 0 && e.p.page <= 0 && (e.p.page = 1);
                            var T, U, V = parseInt(e.p.rowNum, 10),
                                W = e.p.scroll ? $.jgrid.randId() : 1,
                                X = !1;
                            d && (V *= d + 1), "local" !== e.p.datatype || e.p.deselectAfterSort || (X = !0);
                            var Y, Z = $.isFunction(e.p.afterInsertRow),
                                _ = [],
                                aa = !1,
                                ba = $("#" + $.jgrid.jqID(e.p.id) + " tbody:first"),
                                ca = L ? l(m, "rownumBox", !1, "jqgrid-rownum") : "",
                                da = D ? l(m, "multiBox", !1, "cbox") : "";
                            for (e.p.grouping && (aa = e.p.groupingView.groupCollapse === !0, Y = $.jgrid.getMethod("groupingPrepare")); t > n;) {
                                if (q = u[n], x = $.jgrid.getAccessor(q, v), void 0 === x && ("number" == typeof v && null != e.p.colModel[v + D + K + L] && (x = $.jgrid.getAccessor(q, e.p.colModel[v + D + K + L].name)), void 0 === x && (x = W + n, 0 === C.length && g.cell))) {
                                    var ea = $.jgrid.getAccessor(q, g.cell) || q;
                                    x = null != ea && void 0 !== ea[v] ? ea[v] : x, ea = null
                                }
                                x = e.p.idPrefix + x, T = 1 === b ? 0 : b, y = S + ((T + n) % 2 === 1 ? " " + R : ""), X && (U = e.p.multiselect ? -1 !== $.inArray(x, e.p.selarrrow) : x === e.p.selrow);
                                var fa = Q.length;
                                for (Q.push(""), L && Q.push(G(0, n, e.p.page, e.p.rowNum, ca)), D && Q.push(F(x, L, n, U, da)), K && Q.push(r.call(z, D + L, n + b)), s = O, g.repeatitems && (g.cell && (q = $.jgrid.getAccessor(q, g.cell) || q), $.isArray(q) && (s = N)), p = 0; p < s.length; p++) k = $.jgrid.getAccessor(q, s[p]), P[e.p.colModel[p + D + K + L].name] = k, Q.push(E(x, k, p + D + K + L, n + b, q, P));
                                if (y += U ? " " + o : "", Q[fa] = M(x, aa, y, P, q), Q.push("</tr>"), e.p.grouping && (_.push(Q), e.p.groupingView._locgr || Y.call(z, P, n), Q = []), (j || e.p.treeGrid === !0 && !e.p._ald) && (P[i] = $.jgrid.stripPref(e.p.idPrefix, x), e.p.data.push(P), e.p._index[P[i]] = e.p.data.length - 1), e.p.gridview === !1 && (ba.append(Q.join("")), z.triggerHandler("jqGridAfterInsertRow", [x, P, q]), Z && e.p.afterInsertRow.call(e, x, P, q), Q = []), P = {}, B++, n++, B === V) break
                            }
                            if (e.p.gridview === !0 && (w = e.p.treeANode > -1 ? e.p.treeANode : 0, e.p.grouping ? j || (z.jqGrid("groupingRender", _, e.p.colModel.length, e.p.page, V), _ = null) : e.p.treeGrid === !0 && w > 0 ? $(e.rows[w]).after(Q.join("")) : (ba.append(Q.join("")), e.grid.cols = e.rows[0].cells)), e.p.subGrid === !0) try {
                                z.jqGrid("addSubGrid", D + L)
                            } catch (ga) {}
                            if (e.p.totaltime = new Date - f, B > 0 && 0 === e.p.records && (e.p.records = t), Q = null, e.p.treeGrid === !0) try {
                                z.jqGrid("setTreeNode", w + 1, B + w + 1)
                            } catch (ha) {}
                            if (e.p.reccount = B, e.p.treeANode = -1, e.p.userDataOnFooter && z.jqGrid("footerData", "set", e.p.userData, !0), j && (e.p.records = t, e.p.lastpage = Math.ceil(t / V)), c || e.updatepager(!1, !0), j) {
                                for (; t > B && u[B];) {
                                    if (q = u[B], x = $.jgrid.getAccessor(q, v), void 0 === x && ("number" == typeof v && null != e.p.colModel[v + D + K + L] && (x = $.jgrid.getAccessor(q, e.p.colModel[v + D + K + L].name)), void 0 === x && (x = W + B, 0 === C.length && g.cell))) {
                                        var ia = $.jgrid.getAccessor(q, g.cell) || q;
                                        x = null != ia && void 0 !== ia[v] ? ia[v] : x, ia = null
                                    }
                                    if (q) {
                                        for (x = e.p.idPrefix + x, s = O, g.repeatitems && (g.cell && (q = $.jgrid.getAccessor(q, g.cell) || q), $.isArray(q) && (s = N)), p = 0; p < s.length; p++) P[e.p.colModel[p + D + K + L].name] = $.jgrid.getAccessor(q, s[p]);
                                        P[i] = $.jgrid.stripPref(e.p.idPrefix, x), e.p.grouping && Y.call(z, P, B), e.p.data.push(P), e.p._index[P[i]] = e.p.data.length - 1, P = {}
                                    }
                                    B++
                                }
                                e.p.grouping && (e.p.groupingView._locgr = !0, z.jqGrid("groupingRender", _, e.p.colModel.length, e.p.page, V), _ = null)
                            }
                        }
                    },
                    P = function() {
                        function a(b) {
                            var c, d, f, g, h, i, k = 0;
                            if (null != b.groups) {
                                for (d = b.groups.length && "OR" === b.groupOp.toString().toUpperCase(), d && q.orBegin(), c = 0; c < b.groups.length; c++) {
                                    k > 0 && d && q.or();
                                    try {
                                        a(b.groups[c])
                                    } catch (l) {
                                        alert(l)
                                    }
                                    k++
                                }
                                d && q.orEnd()
                            }
                            if (null != b.rules) try {
                                for (f = b.rules.length && "OR" === b.groupOp.toString().toUpperCase(), f && q.orBegin(), c = 0; c < b.rules.length; c++) h = b.rules[c], g = b.groupOp.toString().toUpperCase(), p[h.op] && h.field && (k > 0 && g && "OR" === g && (q = q.or()), i = j[h.field], "date" === i.stype && i.srcfmt && i.newfmt && i.srcfmt !== i.newfmt && (h.data = $.jgrid.parseDate.call(e, i.newfmt, h.data, i.srcfmt)), q = p[h.op](q, g)(h.field, h.data, j[h.field])), k++;
                                f && q.orEnd()
                            } catch (m) {
                                alert(m)
                            }
                        }
                        var b, c, d, f, g = e.p.multiSort ? [] : "",
                            h = [],
                            i = !1,
                            j = {},
                            k = [],
                            l = [];
                        if ($.isArray(e.p.data)) {
                            var m, n, o = e.p.grouping ? e.p.groupingView : !1;
                            if ($.each(e.p.colModel, function() {
                                    if (c = this.sorttype || "text", "date" === c || "datetime" === c ? (this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? (b = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat : $.jgrid.getRegional(e, "formatter.date.srcformat"), d = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat : $.jgrid.getRegional(e, "formatter.date.newformat")) : b = d = this.datefmt || "Y-m-d", j[this.name] = {
                                            stype: c,
                                            srcfmt: b,
                                            newfmt: d,
                                            sfunc: this.sortfunc || null
                                        }) : j[this.name] = {
                                            stype: c,
                                            srcfmt: "",
                                            newfmt: "",
                                            sfunc: this.sortfunc || null
                                        }, e.p.grouping)
                                        for (n = 0, m = o.groupField.length; m > n; n++)
                                            if (this.name === o.groupField[n]) {
                                                var a = this.name;
                                                this.index && (a = this.index), k[n] = j[a], l[n] = a
                                            }
                                    e.p.multiSort || i || this.index !== e.p.sortname && this.name !== e.p.sortname || (g = this.name, i = !0)
                                }), e.p.multiSort && (g = t, h = u), e.p.treeGrid && e.p._sort) return void $(e).jqGrid("SortTree", g, e.p.sortorder, j[g].stype || "text", j[g].srcfmt || "");
                            var p = {
                                    eq: function(a) {
                                        return a.equals
                                    },
                                    ne: function(a) {
                                        return a.notEquals
                                    },
                                    lt: function(a) {
                                        return a.less
                                    },
                                    le: function(a) {
                                        return a.lessOrEquals
                                    },
                                    gt: function(a) {
                                        return a.greater
                                    },
                                    ge: function(a) {
                                        return a.greaterOrEquals
                                    },
                                    cn: function(a) {
                                        return a.contains
                                    },
                                    nc: function(a, b) {
                                        return "OR" === b ? a.orNot().contains : a.andNot().contains
                                    },
                                    bw: function(a) {
                                        return a.startsWith
                                    },
                                    bn: function(a, b) {
                                        return "OR" === b ? a.orNot().startsWith : a.andNot().startsWith
                                    },
                                    en: function(a, b) {
                                        return "OR" === b ? a.orNot().endsWith : a.andNot().endsWith
                                    },
                                    ew: function(a) {
                                        return a.endsWith
                                    },
                                    ni: function(a, b) {
                                        return "OR" === b ? a.orNot().equals : a.andNot().equals
                                    },
                                    "in": function(a) {
                                        return a.equals
                                    },
                                    nu: function(a) {
                                        return a.isNull
                                    },
                                    nn: function(a, b) {
                                        return "OR" === b ? a.orNot().isNull : a.andNot().isNull
                                    }
                                },
                                q = $.jgrid.from.call(e, e.p.data);
                            if (e.p.ignoreCase && (q = q.ignoreCase()), e.p.search === !0) {
                                var r = e.p.postData.filters;
                                if (r) "string" == typeof r && (r = $.jgrid.parse(r)), a(r);
                                else try {
                                    f = j[e.p.postData.searchField], "date" === f.stype && f.srcfmt && f.newfmt && f.srcfmt !== f.newfmt && (e.p.postData.searchString = $.jgrid.parseDate.call(e, f.newfmt, e.p.postData.searchString, f.srcfmt)), q = p[e.p.postData.searchOper](q)(e.p.postData.searchField, e.p.postData.searchString, j[e.p.postData.searchField])
                                } catch (s) {}
                            } else e.p.treeGrid && "nested" === e.p.treeGridModel && q.orderBy(e.p.treeReader.left_field, "asc", "integer", "", null);
                            if (e.p.treeGrid && "adjacency" === e.p.treeGridModel && (m = 0, g = null), e.p.grouping)
                                for (n = 0; m > n; n++) q.orderBy(l[n], o.groupOrder[n], k[n].stype, k[n].srcfmt);
                            e.p.multiSort ? $.each(g, function(a) {
                                q.orderBy(this, h[a], j[this].stype, j[this].srcfmt, j[this].sfunc)
                            }) : g && e.p.sortorder && i && ("DESC" === e.p.sortorder.toUpperCase() ? q.orderBy(e.p.sortname, "d", j[g].stype, j[g].srcfmt, j[g].sfunc) : q.orderBy(e.p.sortname, "a", j[g].stype, j[g].srcfmt, j[g].sfunc));
                            var v = q.select(),
                                w = parseInt(e.p.rowNum, 10),
                                x = v.length,
                                y = parseInt(e.p.page, 10),
                                z = Math.ceil(x / w),
                                A = {};
                            if ((e.p.search || e.p.resetsearch) && e.p.grouping && e.p.groupingView._locgr) {
                                e.p.groupingView.groups = [];
                                var B, C, D, E = $.jgrid.getMethod("groupingPrepare");
                                if (e.p.footerrow && e.p.userDataOnFooter) {
                                    for (C in e.p.userData) e.p.userData.hasOwnProperty(C) && (e.p.userData[C] = 0);
                                    D = !0
                                }
                                for (B = 0; x > B; B++) {
                                    if (D)
                                        for (C in e.p.userData) e.p.userData.hasOwnProperty(C) && (e.p.userData[C] += parseFloat(v[B][C] || 0));
                                    E.call($(e), v[B], B, w)
                                }
                            }
                            return v = e.p.treeGrid && e.p.search ? $(e).jqGrid("searchTree", v) : v.slice((y - 1) * w, y * w), q = null, j = null, A[e.p.localReader.total] = z, A[e.p.localReader.page] = y, A[e.p.localReader.records] = x, A[e.p.localReader.root] = v, A[e.p.localReader.userdata] = e.p.userData, v = null, A
                        }
                    },
                    Q = function(a, b) {
                        var c, d, f, g, h, i, j, k = "",
                            l = e.p.pager ? $.jgrid.jqID(e.p.pager.substr(1)) : "",
                            m = l ? "_" + l : "",
                            o = e.p.toppager ? "_" + e.p.toppager.substr(1) : "";
                        if (f = parseInt(e.p.page, 10) - 1, 0 > f && (f = 0), f *= parseInt(e.p.rowNum, 10), h = f + e.p.reccount, k = e.p.pager || "", k += e.p.toppager ? k ? "," + e.p.toppager : e.p.toppager : "") {
                            if (j = $.jgrid.getRegional(e, "formatter.integer"), c = A(e.p.page), d = A(e.p.lastpage), $(".selbox", k)[this.p.useProp ? "prop" : "attr"]("disabled", !1), e.p.pginput === !0, e.p.viewrecords)
                                if (0 === e.p.reccount) $(".ui-paging-info", k).html($.jgrid.getRegional(e, "defaults.emptyrecords", e.p.emptyrecords));
                                else {
                                    g = f + 1, i = e.p.records, $.fmatter && (g = $.fmatter.util.NumberFormat(g, j), h = $.fmatter.util.NumberFormat(h, j), i = $.fmatter.util.NumberFormat(i, j));
                                    var q = $.jgrid.getRegional(e, "defaults.recordtext", e.p.recordtext);
                                    $(".ui-paging-info", k).html($.jgrid.template(q, g, h, i))
                                }
                            e.p.pgbuttons === !0 && (0 >= c && (c = d = 0), 1 === c || 0 === c ? ($("#first" + m + ", #prev" + m).addClass(n).removeClass(p), e.p.toppager && $("#first_t" + o + ", #prev_t" + o).addClass(n).removeClass(p)) : ($("#first" + m + ", #prev" + m).removeClass(n), e.p.toppager && $("#first_t" + o + ", #prev_t" + o).removeClass(n)), c === d || 0 === c ? ($("#next" + m + ", #last" + m).addClass(n).removeClass(p), e.p.toppager && $("#next_t" + o + ", #last_t" + o).addClass(n).removeClass(p)) : ($("#next" + m + ", #last" + m).removeClass(n), e.p.toppager && $("#next_t" + o + ", #last_t" + o).removeClass(n)))
                        }
                        a === !0 && e.p.rownumbers === !0 && $(">td.jqgrid-rownum", e.rows).each(function(a) {
                            $(this).html(f + 1 + a)
                        }), b && e.p.jqgdnd && $(e).jqGrid("gridDnD", "updateDnD"), $(e).triggerHandler("jqGridGridComplete"), $.isFunction(e.p.gridComplete) && e.p.gridComplete.call(e), $(e).triggerHandler("jqGridAfterGridComplete")
                    },
                    R = function() {
                        e.grid.hDiv.loading = !0, e.p.hiddengrid || $(e).jqGrid("progressBar", {
                            method: "show",
                            loadtype: e.p.loadui,
                            htmlcontent: $.jgrid.getRegional(e, "defaults.loadtext", e.p.loadtext)
                        })
                    },
                    S = function() {
                        e.grid.hDiv.loading = !1, $(e).jqGrid("progressBar", {
                            method: "hide",
                            loadtype: e.p.loadui
                        }), d && setTimeout(function() {
                            d.refresh()
                        }, 0)
                    },
                    T = function(a) {
                        if (!e.grid.hDiv.loading) {
                            var b, c, d = e.p.scroll && a === !1,
                                f = {},
                                g = e.p.prmNames;
                            e.p.page <= 0 && (e.p.page = Math.min(1, e.p.lastpage)), null !== g.search && (f[g.search] = e.p.search), null !== g.nd && (f[g.nd] = (new Date).getTime()), null !== g.rows && (f[g.rows] = e.p.rowNum), null !== g.page && (f[g.page] = e.p.page), null !== g.sort && (f[g.sort] = e.p.sortname), null !== g.order && (f[g.order] = e.p.sortorder), null !== e.p.rowTotal && null !== g.totalrows && (f[g.totalrows] = e.p.rowTotal);
                            var h = $.isFunction(e.p.loadComplete),
                                i = h ? e.p.loadComplete : null,
                                j = 0;
                            if (a = a || 1, a > 1 ? null !== g.npage ? (f[g.npage] = a, j = a - 1, a = 1) : i = function(b) {
                                    e.p.page++, e.grid.hDiv.loading = !1, h && e.p.loadComplete.call(e, b), T(a - 1)
                                } : null !== g.npage && delete e.p.postData[g.npage], e.p.grouping) {
                                $(e).jqGrid("groupingSetup");
                                var k, l = e.p.groupingView,
                                    m = "";
                                for (k = 0; k < l.groupField.length; k++) {
                                    var n = l.groupField[k];
                                    $.each(e.p.colModel, function(a, b) {
                                        b.name === n && b.index && (n = b.index)
                                    }), m += n + " " + l.groupOrder[k] + ", "
                                }
                                f[g.sort] = m + f[g.sort]
                            }
                            $.extend(e.p.postData, f);
                            var o = e.p.scroll ? e.rows.length - 1 : 1,
                                p = $(e).triggerHandler("jqGridBeforeRequest");
                            if (p === !1 || "stop" === p) return;
                            if ($.isFunction(e.p.datatype)) return void e.p.datatype.call(e, e.p.postData, "load_" + e.p.id, o, a, j);
                            if ($.isFunction(e.p.beforeRequest) && (p = e.p.beforeRequest.call(e), void 0 === p && (p = !0), p === !1)) return;
                            switch (b = e.p.datatype.toLowerCase()) {
                                case "json":
                                case "jsonp":
                                case "xml":
                                case "script":
                                    $.ajax($.extend({
                                        url: e.p.url,
                                        type: e.p.mtype,
                                        dataType: b,
                                        data: $.isFunction(e.p.serializeGridData) ? e.p.serializeGridData.call(e, e.p.postData) : e.p.postData,
                                        success: function(c, f, g) {
                                            return $.isFunction(e.p.beforeProcessing) && e.p.beforeProcessing.call(e, c, f, g) === !1 ? void S() : ("xml" === b ? N(c, o, a > 1, j) : O(c, o, a > 1, j), $(e).triggerHandler("jqGridLoadComplete", [c]), i && i.call(e, c), $(e).triggerHandler("jqGridAfterLoadComplete", [c]), d && e.grid.populateVisible(), (e.p.loadonce || e.p.treeGrid) && (e.p.datatype = "local"), c = null, void(1 === a && S()))
                                        },
                                        error: function(b, c, d) {
                                            $.isFunction(e.p.loadError) && e.p.loadError.call(e, b, c, d), 1 === a && S(), b = null
                                        },
                                        beforeSend: function(a, b) {
                                            var c = !0;
                                            return $.isFunction(e.p.loadBeforeSend) && (c = e.p.loadBeforeSend.call(e, a, b)), void 0 === c && (c = !0), c === !1 ? !1 : void R()
                                        }
                                    }, $.jgrid.ajaxOptions, e.p.ajaxGridOptions));
                                    break;
                                case "xmlstring":
                                    R(), c = "string" != typeof e.p.datastr ? e.p.datastr : $.parseXML(e.p.datastr), N(c), $(e).triggerHandler("jqGridLoadComplete", [c]), h && e.p.loadComplete.call(e, c), $(e).triggerHandler("jqGridAfterLoadComplete", [c]), e.p.datatype = "local", e.p.datastr = null, S();
                                    break;
                                case "jsonstring":
                                    R(), c = "string" == typeof e.p.datastr ? $.jgrid.parse(e.p.datastr) : e.p.datastr, O(c), $(e).triggerHandler("jqGridLoadComplete", [c]), h && e.p.loadComplete.call(e, c), $(e).triggerHandler("jqGridAfterLoadComplete", [c]), e.p.datatype = "local", e.p.datastr = null, S();
                                    break;
                                case "local":
                                case "clientside":
                                    R(), e.p.datatype = "local", e.p._ald = !0;
                                    var q = P();
                                    O(q, o, a > 1, j), $(e).triggerHandler("jqGridLoadComplete", [q]), i && i.call(e, q), $(e).triggerHandler("jqGridAfterLoadComplete", [q]), d && e.grid.populateVisible(), S(), e.p._ald = !1
                            }
                            e.p._sort = !1
                        }
                    },
                    U = function(a) {
                        $("#cb_" + $.jgrid.jqID(e.p.id), e.grid.hDiv)[e.p.useProp ? "prop" : "attr"]("checked", a);
                        var b = e.p.frozenColumns ? e.p.id + "_frozen" : "";
                        b && $("#cb_" + $.jgrid.jqID(e.p.id), e.grid.fhDiv)[e.p.useProp ? "prop" : "attr"]("checked", a)
                    },
                    V = function(a, b) {
                        var c, d, f, g, h, j, k, o = "<td class='ui-pg-button'></td>",
                            p = "",
                            q = "<table style='table-layout:auto;height:100%;' class='ui-pg-table ui-common-table'><tbody><tr>",
                            r = "",
                            s = function(a, b) {
                                var c;
                                return $.isFunction(e.p.onPaging) && (c = e.p.onPaging.call(e, a, b)), "stop" === c ? !1 : (e.p.selrow = null, e.p.multiselect && (e.p.selarrrow = [], U(!1)), e.p.savedRow = [], !0)
                            };
                        a = a.substr(1), b += "_" + a, c = "pg_" + a, d = a + "_left", f = a + "_center", g = a + "_right", $("#" + $.jgrid.jqID(a)).append("<div id='" + c + "' class='ui-pager-control' role='group' data-role='footer' data-theme='" + e.p.dataTheme + "'><table class='ui-pg-table ui-common-table' style='width:100%;table-layout:fixed;height:100%;'><tbody><tr><td id='" + d + "' align='left'></td><td id='" + f + "' align='center' style='white-space:pre;'></td><td id='" + g + "' align='right'></td></tr></tbody></table></div>").attr({
                            dir: "ltr",
                            "data-role": "footer"
                        });
                        var t = "";
                        if (e.p.rowList.length > 0) {
                            t = "<tr>", t += '<td><label for="select-choice-1"></label>' + $.jgrid.getRegional(e, "defaults.recordPage") + "</td>", t += "<td><select data-mini='true' name='select-choice-1' id='select-choice-1' " + l(m, "pgSelectBox", !1, "ui-pg-selbox") + ' role="listbox">';
                            var u;
                            for (k = 0; k < e.p.rowList.length; k++) u = e.p.rowList[k].toString().split(":"), 1 === u.length && (u[1] = u[0]), t += '<option role="option" value="' + u[0] + '"' + (A(e.p.rowNum, 0) === A(u[0], 0) ? ' selected="selected"' : "") + ">" + u[1] + "</option>";
                            t += "</select></td></tr>"
                        }
                        if ("rtl" === i && (q += r), e.p.pginput === !0 && (p = "<td dir='" + i + '\'style="text-align:center"><a ' + l(m, "icon_popup", !1, "pagersettings") + ' href="#" data-rel="popup" data-transition="pop" style="margin-top:0;margin-bottom:0;"></a></td>'), e.p.pgbuttons === !0) {
                            var v = ["first" + b, "prev" + b, "next" + b, "last" + b];
                            l(m, "pgButtonBox", !0, "ui-pg-button");
                            "rtl" === i && v.reverse(), q += "<td id='" + v[1] + "' style='text-align:center'><a href='#' " + l(m, "icon_prev") + " style='margin-top:0;margin-bottom:0;'></a></td>", q += "" !== p ? o + p + o : "", q += "<td id='" + v[2] + "' style='text-align:center'><a href='#' " + l(m, "icon_next") + " style='margin-top:0;margin-bottom:0'></a></td>"
                        } else "" !== p && (q += p);
                        "ltr" === i && (q += r), q += "</tr></tbody></table>", e.p.viewrecords === !0 && $("td#" + a + "_" + e.p.recordpos, "#" + c).append("<div dir='" + i + "' style='text-align:" + e.p.recordpos + "' class='ui-paging-info'></div>"), $("td#" + a + "_" + e.p.pagerpos, "#" + c).append(q), j = $("#gbox_" + $.jgrid.jqID(e.p.id)).css("font-size") || "11px", $("#gbox_" + $.jgrid.jqID(e.p.id)).append("<div id='testpg' " + l(m, "entrieBox", !1, "ui-jqgrid") + " style='font-size:" + j + ";visibility:hidden;' ></div>"), h = $(q).clone().appendTo("#testpg").width(), $("#testpg").remove(), h > 0 && ("" !== p && (h += 50), $("td#" + a + "_" + e.p.pagerpos, "#" + c).width(h)), e.p._nvtd = [], e.p._nvtd[0] = h ? Math.floor((e.p.width - h) / 2) : Math.floor(e.p.width / 3), e.p._nvtd[1] = 0, q = null, $(".ui-pg-selbox", "#" + c).bind("change", function() {
                            return s("records", this) ? (e.p.page = Math.round(e.p.rowNum * (e.p.page - 1) / this.value - .5) + 1, e.p.rowNum = this.value, e.p.pager && $(".ui-pg-selbox", e.p.pager).val(this.value), e.p.toppager && $(".ui-pg-selbox", e.p.toppager).val(this.value), T(), !1) : !1
                        }), e.p.pgbuttons === !0 && $("#prev" + $.jgrid.jqID(b) + ", #next" + $.jgrid.jqID(b)).click(function() {
                            if ($(this).hasClass(n)) return !1;
                            var a = A(e.p.page, 1),
                                c = A(e.p.lastpage, 1),
                                d = !1,
                                f = !0,
                                g = !0,
                                h = !0,
                                i = !0;
                            return 0 === c || 1 === c ? (f = !1, g = !1, h = !1, i = !1) : c > 1 && a >= 1 ? 1 === a ? (f = !1, g = !1) : a === c && (h = !1, i = !1) : c > 1 && 0 === a && (h = !1, i = !1, a = c - 1), s(this.id.split("_")[0], this) ? (this.id === "first" + b && f && (e.p.page = 1, d = !0), this.id === "prev" + b && g && (e.p.page = a - 1, d = !0), this.id === "next" + b && h && (e.p.page = a + 1, d = !0), this.id === "last" + b && i && (e.p.page = c, d = !0), d && T(), !1) : !1
                        }), e.p.pginput === !0 && ($("#" + a).before('<div data-role="popup"  data-position-to="#gbox_' + e.p.id + '" data-overlay-theme="a" data-theme="' + e.p.dataTheme + '" style="min-width:200px;" class="ui-corner-all" id="pgpop_' + a + '"><div data-role="header" data-theme="' + e.p.dataTheme + '" class="ui-corner-top"><h1>' + $.jgrid.getRegional(e, "defaults.pagerCaption") + '</h1></div><table style="width:100%"><tr><td style="width:28%"><label for="slider-1">' + ($.jgrid.getRegional(e, "defaults.pageText") || "") + '</label></td><td "width:72%"><input id="slider-1" name="slider-1" type="range" class="ui-pg-input" type="text" size="4" maxlength="7" value="0" role="textbox" style="width:29px;height:30px" min="1" max="5"/></td></tr>' + t + '</table><div style="text-align:right"><a href="#" data-role="button" data-inline="true" data-rel="back" data-mini="true" data-theme="' + e.p.dataTheme + '">Cancel</a><a class="setpage" href="#" data-role="button" data-inline="true" data-mini="true" data-transition="flow" data-theme="' + e.p.dataTheme + '">Update</a></div></div>'), $(".pagersettings", "#" + a).click(function() {
                            $("#slider-1").val(e.p.page).attr("max", e.p.lastpage).slider("refresh"), $("#select-choice-1").val(e.p.rowNum).selectmenu("refresh"), $("#pgpop_" + a).popup("open")
                        }), $(".setpage", "#pgpop_" + a).click(function() {
                            var b = parseInt($("#slider-1").val(), 10),
                                c = parseInt($("#select-choice-1").val(), 10);
                            return isNaN(c) && (c = e.p.rowNum), isNaN(b) && (b = 1), e.p.page = b > 0 ? b : e.p.page, e.p.page = b > e.p.lastpage ? e.p.lastpage : e.p.page, e.p.page = Math.round(e.p.rowNum * (e.p.page - 1) / c - .5) + 1, e.p.rowNum = c, s("user") ? (T(), $("#pgpop_" + a).popup("close"), !1) : !1
                        }), $("#" + c).on("keypress", "input.ui-pg-input", function(a) {
                            var b = a.charCode || a.keyCode || 0;
                            return 13 === b ? s("user", this) ? ($(this).val(A($(this).val(), 1)), e.p.page = $(this).val() > 0 ? $(this).val() : e.p.page, T(), !1) : !1 : this
                        }))
                    },
                    W = function(a, b) {
                        var c, d = e.p.colModel,
                            f = e.p.frozenColumns ? b : e.grid.headers[a].el,
                            g = "";
                        $(".ui-grid-ico-sort", f).addClass(n), $(f).attr("aria-selected", "false"), c = "local" === e.p.datatype ? d[a].name : d[a].index || d[a].name, d[a].lso ? "asc" === d[a].lso ? (d[a].lso += "-desc", g = "desc") : "desc" === d[a].lso ? (d[a].lso += "-asc", g = "asc") : ("asc-desc" === d[a].lso || "desc-asc" === d[a].lso) && (d[a].lso = "") : d[a].lso = g = d[a].firstsortorder || "asc", g ? ($("span.s-ico", f).show(), $(".ui-ico-" + g, f).removeClass(n), $(f).attr("aria-selected", "true")) : e.p.viewsortcols[0] || $("span.s-ico", f).hide();
                        var h = t.indexOf(c); - 1 === h ? (t.push(c), u.push(g)) : g ? u[h] = g : (u.splice(h, 1), t.splice(h, 1)), e.p.sortorder = "", e.p.sortname = "";
                        for (var i = 0, j = t.length; j > i; i++) i > 0 && (e.p.sortname += ", "), e.p.sortname += t[i], i !== j - 1 && (e.p.sortname += " " + u[i]);
                        e.p.sortorder = u[j - 1]
                    },
                    X = function(a, b, c, d, f) {
                        if (e.p.colModel[b].sortable && !(e.p.savedRow.length > 0)) {
                            if (c || (e.p.lastsort === b && "" !== e.p.sortname ? "asc" === e.p.sortorder ? e.p.sortorder = "desc" : "desc" === e.p.sortorder && (e.p.sortorder = "asc") : e.p.sortorder = e.p.colModel[b].firstsortorder || "asc", e.p.page = 1), e.p.multiSort) W(b, f);
                            else {
                                if (d) {
                                    if (e.p.lastsort === b && e.p.sortorder === d && !c) return;
                                    e.p.sortorder = d
                                }
                                var g, h = e.grid.headers[e.p.lastsort] ? e.grid.headers[e.p.lastsort].el : null,
                                    i = e.p.frozenColumns ? f : e.grid.headers[b].el,
                                    j = "single" === e.p.viewsortcols[1] ? !0 : !1;
                                g = $(h).find(".ui-grid-ico-sort"), g.addClass(n), j && $(g).css("display", "none"), $(h).attr("aria-selected", "false"), e.p.frozenColumns && (g = e.grid.fhDiv.find(".ui-grid-ico-sort"), g.addClass(n), j && g.css("display", "none"), e.grid.fhDiv.find("th").attr("aria-selected", "false")), g = $(i).find(".ui-ico-" + e.p.sortorder), g.removeClass(n), j && g.css("display", ""), $(i).attr("aria-selected", "true"), e.p.viewsortcols[0] || (e.p.lastsort !== b ? (e.p.frozenColumns && e.grid.fhDiv.find("span.s-ico").hide(), $("span.s-ico", h).hide(), $("span.s-ico", i).show()) : "" === e.p.sortname && $("span.s-ico", i).show()), a = a.substring(5 + e.p.id.length + 1), e.p.sortname = e.p.colModel[b].index || a
                            }
                            if ("stop" === $(e).triggerHandler("jqGridSortCol", [e.p.sortname, b, e.p.sortorder])) return void(e.p.lastsort = b);
                            if ($.isFunction(e.p.onSortCol) && "stop" === e.p.onSortCol.call(e, e.p.sortname, b, e.p.sortorder)) return void(e.p.lastsort = b);
                            if ("local" === e.p.datatype ? e.p.deselectAfterSort && $(e).jqGrid("resetSelection") : (e.p.selrow = null, e.p.multiselect && U(!1), e.p.selarrrow = [], e.p.savedRow = []), e.p.scroll) {
                                var k = e.grid.bDiv.scrollLeft;
                                J.call(e, !0, !1), e.grid.hDiv.scrollLeft = k
                            }
                            e.p.subGrid && "local" === e.p.datatype && $("td.sgexpanded", "#" + $.jgrid.jqID(e.p.id)).each(function() {
                                $(this).trigger("click")
                            }), e.p._sort = !0, T(), e.p.lastsort = b, e.p.sortname !== a && b && (e.p.lastsort = b)
                        }
                    },
                    Y = function() {
                        var a, b, c, d, g = 0,
                            h = $.jgrid.cell_width ? 0 : A(e.p.cellLayout, 0),
                            i = 0,
                            j = A(e.p.scrollOffset, 0),
                            k = !1,
                            l = 0;
                        $.each(e.p.colModel, function() {
                            if (void 0 === this.hidden && (this.hidden = !1), e.p.grouping && e.p.autowidth) {
                                var a = $.inArray(this.name, e.p.groupingView.groupField);
                                a >= 0 && e.p.groupingView.groupColumnShow.length > a && (this.hidden = !e.p.groupingView.groupColumnShow[a])
                            }
                            this.widthOrg = b = A(this.width, 0), this.hidden === !1 && (g += b + h, this.fixed ? l += b + h : i++)
                        }), isNaN(e.p.width) && (e.p.width = g + (e.p.shrinkToFit !== !1 || isNaN(e.p.height) ? 0 : j)), f.width = e.p.width, e.p.tblwidth = g, e.p.shrinkToFit === !1 && e.p.forceFit === !0 && (e.p.forceFit = !1), e.p.shrinkToFit === !0 && i > 0 && (c = f.width - h * i - l, isNaN(e.p.height) || (c -= j, k = !0), g = 0, $.each(e.p.colModel, function(d) {
                            this.hidden !== !1 || this.fixed || (b = Math.round(c * this.width / (e.p.tblwidth - h * i - l)), this.width = b, g += b, a = d)
                        }), d = 0, k ? f.width - l - (g + h * i) !== j && (d = f.width - l - (g + h * i) - j) : k || 1 === Math.abs(f.width - l - (g + h * i)) || (d = f.width - l - (g + h * i)), e.p.colModel[a].width += d, e.p.tblwidth = g + d + h * i + l, e.p.tblwidth > e.p.width && (e.p.colModel[a].width -= e.p.tblwidth - parseInt(e.p.width, 10), e.p.tblwidth = e.p.width))
                    },
                    Z = function(a) {
                        var b, c = a,
                            d = a;
                        for (b = a + 1; b < e.p.colModel.length; b++)
                            if (e.p.colModel[b].hidden !== !0) {
                                d = b;
                                break
                            }
                        return d - c
                    },
                    _ = function(a) {
                        var b = $(e.grid.headers[a].el),
                            c = [b.position().left + b.outerWidth()];
                        return "rtl" === e.p.direction && (c[0] = e.p.width - c[0]), c[0] -= e.grid.bDiv.scrollLeft, c.push($(e.grid.hDiv).position().top), c.push($(e.grid.bDiv).offset().top - $(e.grid.hDiv).offset().top + $(e.grid.bDiv).height()), c
                    },
                    aa = function(a) {
                        var b, c = e.grid.headers,
                            d = $.jgrid.getCellIndex(a);
                        for (b = 0; b < c.length; b++)
                            if (a === c[b].el) {
                                d = b;
                                break
                            }
                        return d
                    };
                for (this.p.id = this.id, -1 === $.inArray(e.p.multikey, z) && (e.p.multikey = !1), e.p.keyName = !1, j = 0; j < e.p.colModel.length; j++) y = "string" == typeof e.p.colModel[j].template ? null != $.jgrid.cmTemplate && "object" == typeof $.jgrid.cmTemplate[e.p.colModel[j].template] ? $.jgrid.cmTemplate[e.p.colModel[j].template] : {} : e.p.colModel[j].template, e.p.colModel[j] = $.extend(!0, {}, e.p.cmTemplate, y || {}, e.p.colModel[j]), e.p.keyName === !1 && e.p.colModel[j].key === !0 && (e.p.keyName = e.p.colModel[j].name);
                if (e.p.sortorder = e.p.sortorder.toLowerCase(), $.jgrid.cell_width = $.jgrid.cellWidth(), e.p.grouping === !0 && (e.p.scroll = !1, e.p.rownumbers = !1, e.p.treeGrid = !1, e.p.gridview = !0), this.p.treeGrid === !0) {
                    try {
                        $(this).jqGrid("setTreeGrid")
                    } catch (ba) {}
                    "local" !== e.p.datatype && (e.p.localReader = {
                        id: "_id_"
                    })
                }
                if (this.p.subGrid) try {
                    $(e).jqGrid("setSubGrid")
                } catch (ca) {}
                this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"), this.p.colModel.unshift({
                    name: "cb",
                    width: $.jgrid.cell_width ? e.p.multiselectWidth + e.p.cellLayout : e.p.multiselectWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0
                })), this.p.rownumbers && (this.p.colNames.unshift(""), this.p.colModel.unshift({
                    name: "rn",
                    width: e.p.rownumWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0
                })), e.p.xmlReader = $.extend(!0, {
                    root: "rows",
                    row: "row",
                    page: "rows>page",
                    total: "rows>total",
                    records: "rows>records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "[id]",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        row: "row",
                        repeatitems: !0,
                        cell: "cell"
                    }
                }, e.p.xmlReader), e.p.jsonReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        repeatitems: !0,
                        cell: "cell"
                    }
                }, e.p.jsonReader), e.p.localReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !1,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        repeatitems: !0,
                        cell: "cell"
                    }
                }, e.p.localReader), e.p.scroll && (e.p.pgbuttons = !1, e.p.pginput = !1, e.p.rowList = []), e.p.data.length && (K(), L());
                var da, ea, fa, ga, ha, ia, ja, ka, la = "<thead><tr class='ui-jqgrid-labels' role='row'>",
                    ma = "",
                    na = "",
                    oa = "";
                if (e.p.shrinkToFit === !0 && e.p.forceFit === !0)
                    for (j = e.p.colModel.length - 1; j >= 0; j--)
                        if (!e.p.colModel[j].hidden) {
                            e.p.colModel[j].resizable = !1;
                            break
                        }
                if ("horizontal" === e.p.viewsortcols[1] ? (na = " ui-i-asc", oa = " ui-i-desc") : "single" === e.p.viewsortcols[1] && (na = " ui-single-sort-asc", oa = " ui-single-sort-desc", ma = " style='display:none'", e.p.viewsortcols[0] = !1), da = s ? "class='ui-th-div-ie'" : "", ka = "<span class='s-ico' style='display:none'>", ka += "<a href='#' sort='asc'  class='ui-grid-ico-sort ui-ico-asc" + na + " ui-sort-" + i + " " + n + " " + r + " " + l(m, "icon_asc", !0) + "'" + ma + "></a>", ka += "<a href='#' sort='desc' class='ui-grid-ico-sort ui-ico-desc" + oa + " ui-sort-" + i + " " + n + " " + r + " " + l(m, "icon_desc", !0) + "'" + ma + "></a></span>", e.p.multiSort && e.p.sortname)
                    for (t = e.p.sortname.split(","), j = 0; j < t.length; j++) v = $.trim(t[j]).split(" "), t[j] = $.trim(v[0]), u[j] = v[1] ? $.trim(v[1]) : e.p.sortorder || "asc";
                for (j = 0; j < this.p.colNames.length; j++) {
                    var pa = e.p.headertitles ? ' title="' + $.jgrid.stripHtml(e.p.colNames[j]) + '"' : "";
                    la += "<th id='" + e.p.id + "_" + e.p.colModel[j].name + "' role='columnheader' " + l(m, "headerBox", !1, "ui-th-column ui-th-" + i) + " " + pa + ">", ea = e.p.colModel[j].index || e.p.colModel[j].name, la += "<div id='jqgh_" + e.p.id + "_" + e.p.colModel[j].name + "' " + da + ">" + e.p.colNames[j], e.p.colModel[j].width ? e.p.colModel[j].width = parseInt(e.p.colModel[j].width, 10) : e.p.colModel[j].width = 150, "boolean" != typeof e.p.colModel[j].title && (e.p.colModel[j].title = !0), e.p.colModel[j].lso = "", ea === e.p.sortname && (e.p.lastsort = j), e.p.multiSort && (v = $.inArray(ea, t), -1 !== v && (e.p.colModel[j].lso = u[v])), la += ka + "</div></th>"
                }
                if (la += "</tr></thead>", ka = null, $(this).append(la), $("thead tr:first th", this).hover(function() {
                        $(this).addClass(p)
                    }, function() {
                        $(this).removeClass(p)
                    }), this.p.multiselect) {
                    var qa, ra = [];
                    $("#cb_" + $.jgrid.jqID(e.p.id), this).bind("click", function() {
                        e.p.selarrrow = [];
                        var a = e.p.frozenColumns === !0 ? e.p.id + "_frozen" : "";
                        this.checked ? ($(e.rows).each(function(b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(n) || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id))[e.p.useProp ? "prop" : "attr"]("checked", !0), $(this).addClass(o).attr("aria-selected", "true"), e.p.selarrrow.push(this.id), e.p.selrow = this.id, a && ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id), e.grid.fbDiv)[e.p.useProp ? "prop" : "attr"]("checked", !0), $("#" + $.jgrid.jqID(this.id), e.grid.fbDiv).addClass(o))))
                        }), qa = !0, ra = []) : ($(e.rows).each(function(b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(n) || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id))[e.p.useProp ? "prop" : "attr"]("checked", !1), $(this).removeClass(o).attr("aria-selected", "false"), ra.push(this.id), a && ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id), e.grid.fbDiv)[e.p.useProp ? "prop" : "attr"]("checked", !1), $("#" + $.jgrid.jqID(this.id), e.grid.fbDiv).removeClass(o))))
                        }), e.p.selrow = null, qa = !1), $(e).triggerHandler("jqGridSelectAll", [qa ? e.p.selarrrow : ra, qa]), $.isFunction(e.p.onSelectAll) && e.p.onSelectAll.call(e, qa ? e.p.selarrrow : ra, qa)
                    })
                }
                if (e.p.autowidth === !0) {
                    var sa = $(x).parent().width();
                    e.p.width = sa > 0 ? sa : "nw"
                }
                Y(), $(x).css("width", f.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + e.p.id + "'>&#160;</div>"), e.p.scrollPopUp && $(x).append("<div " + l(m, "scrollBox", !1, "loading ui-scroll-popup") + " id='scroll_g" + e.p.id + "'></div>"), $(k).css("width", f.width + "px"), la = $("thead:first", e).get(0);
                var ta = "";
                e.p.footerrow && (ta += "<table role='presentation' style='width:" + e.p.tblwidth + "px' " + l(m, "footerTable", !1, "ui-jqgrid-ftable ui-common-table") + "><tbody><tr role='row' " + l(m, "footerBox", !1, "footrow footrow-" + i) + ">");
                var ua = $("tr:first", la),
                    va = "<tr class='jqgfirstrow' role='row'>";
                if (e.p.disableClick = !1, $("th", ua).each(function(a) {
                        fa = e.p.colModel[a].width, void 0 === e.p.colModel[a].resizable && (e.p.colModel[a].resizable = !0), e.p.colModel[a].resizable ? (ga = document.createElement("span"), $(ga).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + i).css("cursor", "col-resize"), $(this).addClass(e.p.resizeclass)) : ga = "", $(this).css("width", fa + "px").prepend(ga), ga = null;
                        var b = "";
                        e.p.colModel[a].hidden && ($(this).css("display", "none"),
                            b = "display:none;"), va += "<td role='gridcell' style='height:0px;width:" + fa + "px;" + b + "'></td>", f.headers[a] = {
                            width: fa,
                            el: this
                        }, ma = e.p.colModel[a].sortable, "boolean" != typeof ma && (e.p.colModel[a].sortable = !0, ma = !0);
                        var c = e.p.colModel[a].name;
                        "cb" !== c && "subgrid" !== c && "rn" !== c && e.p.viewsortcols[2] && $(">div", this).addClass("ui-jqgrid-sortable"), ma && (e.p.multiSort ? e.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), e.p.colModel[a].lso && $("div .ui-ico-" + e.p.colModel[a].lso, this).removeClass(n).css("display", "")) : e.p.colModel[a].lso && ($("div span.s-ico", this).show(), $("div .ui-ico-" + e.p.colModel[a].lso, this).removeClass(n).css("display", "")) : e.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), a === e.p.lastsort && $("div .ui-ico-" + e.p.sortorder, this).removeClass(n).css("display", "")) : a === e.p.lastsort && "" !== e.p.sortname && ($("div span.s-ico", this).show(), $("div .ui-ico-" + e.p.sortorder, this).removeClass(n).css("display", ""))), e.p.footerrow && (ta += "<td role='gridcell' " + B(a, 0, "", null, "", !1) + ">&#160;</td>")
                    }).mousedown(function(a) {
                        if (1 === $(a.target).closest("th>span.ui-jqgrid-resize").length) {
                            var b = aa(this);
                            return e.p.forceFit === !0 && (e.p.nv = Z(b)), f.dragStart(b, a, _(b)), !1
                        }
                    }).click(function(a) {
                        if (e.p.disableClick) return e.p.disableClick = !1, !1;
                        var b, c, d = "th>div.ui-jqgrid-sortable";
                        e.p.viewsortcols[2] || (d = "th>div>span>a.ui-grid-ico-sort");
                        var f = $(a.target).closest(d);
                        if (1 === f.length) {
                            var g;
                            if (e.p.frozenColumns) {
                                var h = $(this)[0].id.substring(e.p.id.length + 1);
                                $(e.p.colModel).each(function(a) {
                                    return this.name === h ? (g = a, !1) : void 0
                                })
                            } else g = aa(this);
                            return e.p.viewsortcols[2] || (b = !0, c = f.attr("sort")), null != g && X($("div", this)[0].id, g, b, c, this), !1
                        }
                    }), e.p.sortable && $.fn.sortable) try {
                    $(e).jqGrid("sortableColumns", ua)
                } catch (wa) {}
                e.p.footerrow && (ta += "</tr></tbody></table>"), va += "</tr>", ja = document.createElement("tbody"), this.appendChild(ja), $(this).addClass(l(m, "rowTable", !0, "ui-jqgrid-btable ui-common-table")).append(va), va = null;
                var xa = $("<table " + l(m, "headerTable", !1, "ui-jqgrid-htable ui-common-table") + " style='width:" + e.p.tblwidth + "px' role='presentation' aria-labelledby='gbox_" + this.id + "'></table>").append(la),
                    ya = e.p.caption && e.p.hiddengrid === !0 ? !0 : !1,
                    za = $("<div class='ui-jqgrid-hbox" + ("rtl" === i ? "-rtl" : "") + "'></div>");
                la = null, f.hDiv = document.createElement("div"), f.hDiv.style.width = f.width + "px", f.hDiv.className = l(m, "headerDiv", !0, "ui-jqgrid-hdiv"), $(f.hDiv).attr({
                    "data-theme": e.p.dataTheme,
                    "data-role": "header"
                }).append(za), $(za).append(xa), xa = null, ya && $(f.hDiv).hide(), e.p.pager && ("string" == typeof e.p.pager ? "#" !== e.p.pager.substr(0, 1) && (e.p.pager = "#" + e.p.pager) : e.p.pager = "#" + $(e.p.pager).attr("id"), $(e.p.pager).css({
                    width: f.width + "px"
                }).addClass(l(m, "pagerBox", !0, "ui-jqgrid-pager")).appendTo(x), ya && $(e.p.pager).hide(), V(e.p.pager, "")), e.p.cellEdit === !1 && e.p.hoverrows === !0 && $(e).bind("vmouseover", function(a) {
                    ia = $(a.target).closest("tr.jqgrow"), "ui-subgrid" !== $(ia).attr("class") && $(ia).addClass(p)
                }).bind("vmouseout", function(a) {
                    ia = $(a.target).closest("tr.jqgrow"), $(ia).removeClass(p)
                });
                var Aa, Ba, Ca;
                $(e).before(f.hDiv).click(function(a) {
                    if (ha = a.target, ia = $(ha, e.rows).closest("tr.jqgrow"), 0 === $(ia).length || ia[0].className.indexOf(n) > -1 || ($(ha, e).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== e.id) return this;
                    var b = $(ha).hasClass("cbox"),
                        c = $(e).triggerHandler("jqGridBeforeSelectRow", [ia[0].id, a]);
                    if (c = c === !1 || "stop" === c ? !1 : !0, $.isFunction(e.p.beforeSelectRow)) {
                        var d = e.p.beforeSelectRow.call(e, ia[0].id, a);
                        (d === !1 || "stop" === d) && (c = !1)
                    }
                    if ("A" !== ha.tagName && ("INPUT" !== ha.tagName && "TEXTAREA" !== ha.tagName && "OPTION" !== ha.tagName && "SELECT" !== ha.tagName || b)) {
                        if (Aa = ia[0].id, ha = $(ha).closest("tr.jqgrow>td"), ha.length > 0 && (Ba = $.jgrid.getCellIndex(ha), Ca = $(ha).closest("td,th").html(), $(e).triggerHandler("jqGridCellSelect", [Aa, Ba, Ca, a]), $.isFunction(e.p.onCellSelect) && e.p.onCellSelect.call(e, Aa, Ba, Ca, a)), e.p.cellEdit === !0)
                            if (e.p.multiselect && b && c) $(e).jqGrid("setSelection", Aa, !0, a);
                            else if (ha.length > 0) {
                            Aa = ia[0].rowIndex;
                            try {
                                $(e).jqGrid("editCell", Aa, Ba, !0)
                            } catch (f) {}
                        }
                        if (c)
                            if (e.p.multikey) a[e.p.multikey] ? $(e).jqGrid("setSelection", Aa, !0, a) : e.p.multiselect && b && (b = $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + Aa).is(":checked"), $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + Aa)[e.p.useProp ? "prop" : "attr"]("checked", !b));
                            else if (e.p.multiselect && e.p.multiboxonly)
                            if (b) $(e).jqGrid("setSelection", Aa, !0, a);
                            else {
                                var g = e.p.frozenColumns ? e.p.id + "_frozen" : "";
                                $(e.p.selarrrow).each(function(a, b) {
                                    var c = $(e).jqGrid("getGridRowById", b);
                                    c && $(c).removeClass(o), $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(b))[e.p.useProp ? "prop" : "attr"]("checked", !1), g && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(g)).removeClass(o), $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(g))[e.p.useProp ? "prop" : "attr"]("checked", !1))
                                }), e.p.selarrrow = [], $(e).jqGrid("setSelection", Aa, !0, a)
                            } else $(e).jqGrid("setSelection", Aa, !0, a)
                    }
                }).bind("reloadGrid", function(a, b) {
                    if (e.p.treeGrid === !0 && (e.p.datatype = e.p.treedatatype), b = b || {}, b.current && e.grid.selectionPreserver(e), "local" === e.p.datatype ? ($(e).jqGrid("resetSelection"), e.p.data.length && (K(), L())) : e.p.treeGrid || (e.p.selrow = null, e.p.multiselect && (e.p.selarrrow = [], U(!1)), e.p.savedRow = []), e.p.scroll && J.call(e, !0, !1), b.page) {
                        var c = b.page;
                        c > e.p.lastpage && (c = e.p.lastpage), 1 > c && (c = 1), e.p.page = c, e.grid.prevRowHeight ? e.grid.bDiv.scrollTop = (c - 1) * e.grid.prevRowHeight * e.p.rowNum : e.grid.bDiv.scrollTop = 0
                    }
                    return e.grid.prevRowHeight && e.p.scroll && void 0 === b.page ? (delete e.p.lastpage, e.grid.populateVisible()) : e.grid.populate(), e.p.inlineNav === !0 && $(e).jqGrid("showAddEditButtons"), !1
                }).dblclick(function(a) {
                    if (ha = a.target, ia = $(ha, e.rows).closest("tr.jqgrow"), 0 !== $(ia).length) {
                        Aa = ia[0].rowIndex, Ba = $.jgrid.getCellIndex(ha);
                        var b = $(e).triggerHandler("jqGridDblClickRow", [$(ia).attr("id"), Aa, Ba, a]);
                        return null != b ? b : $.isFunction(e.p.ondblClickRow) && (b = e.p.ondblClickRow.call(e, $(ia).attr("id"), Aa, Ba, a), null != b) ? b : void 0
                    }
                }).bind("contextmenu", function(a) {
                    if (ha = a.target, ia = $(ha, e.rows).closest("tr.jqgrow"), 0 !== $(ia).length) {
                        e.p.multiselect || $(e).jqGrid("setSelection", ia[0].id, !0, a), Aa = ia[0].rowIndex, Ba = $.jgrid.getCellIndex(ha);
                        var b = $(e).triggerHandler("jqGridRightClickRow", [$(ia).attr("id"), Aa, Ba, a]);
                        return null != b ? b : $.isFunction(e.p.onRightClickRow) && (b = e.p.onRightClickRow.call(e, $(ia).attr("id"), Aa, Ba, a), null != b) ? b : void 0
                    }
                }), f.bDiv = document.createElement("div"), s && "auto" === String(e.p.height).toLowerCase() && (e.p.height = "100%"), $(f.bDiv).attr({
                    "data-role": "content",
                    "data-theme": e.p.dataTheme,
                    id: "bdiv_" + e.p.id
                }).append($('<div style="overflow:auto;display:table;"></div>').append(e.p.scrollPaging || e.p.scroll ? '<div id="pullDown_' + e.p.id + '" class="pullDown"><span class="pullDownIcon"></span><span class="pullDownLabel">' + $.jgrid.getRegional(e, "defaults.scrollPulldown") + "</span></div>" : "").append(this).append(e.p.scrollPaging || e.p.scroll ? '<div id="pullUp_' + e.p.id + '" class=pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">' + $.jgrid.getRegional(e, "defaults.scrollPullup") + "</span></div>" : "")).addClass(l(m, "bodyDiv", !0, "ui-jqgrid-bdiv")).css({
                    height: e.p.height + (isNaN(e.p.height) ? "" : "px"),
                    width: f.width + "px"
                }), $("table:first", f.bDiv).css({
                    width: e.p.tblwidth + "px"
                }), $.support.tbody || 2 === $("tbody", this).length && $("tbody:gt(0)", this).remove(), e.p.multikey && ($.jgrid.msie ? $(f.bDiv).bind("selectstart", function() {
                    return !1
                }) : $(f.bDiv).bind("vmousedown", function() {
                    return !1
                })), ya && $(f.bDiv).hide();
                var Da = r + " " + l(m, "icon_caption_open", !0),
                    Ea = r + " " + l(m, "icon_caption_close", !0);
                f.cDiv = document.createElement("div");
                var Fa = e.p.hidegrid === !0 ? $("<div  class='ui-jqgrid-titlebar-close HeaderButton " + q + "' title='" + ($.jgrid.getRegional(e, "defaults.showhide", e.p.showhide) || "") + "' ></div>").hover(function() {
                    Fa.addClass(p)
                }, function() {
                    Fa.removeClass(p)
                }).append("<a class='ui-jqgrid-headlink " + Da + "'></a>").css("rtl" === i ? "left" : "right", "0px") : "";
                if ($(f.cDiv).append(Fa).append("<span class='ui-jqgrid-title'>" + e.p.caption + "</span>").attr("data-role", "header").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === i ? "-rtl" : "") + " " + l(m, "gridtitleBox", !0)), $(f.cDiv).insertBefore(f.hDiv), e.p.toolbar[0]) {
                    var Ga = l(m, "customtoolbarBox", !0, "ui-userdata");
                    f.uDiv = document.createElement("div"), "top" === e.p.toolbar[1] ? $(f.uDiv).insertBefore(f.hDiv) : "bottom" === e.p.toolbar[1] && $(f.uDiv).insertAfter(f.hDiv), "both" === e.p.toolbar[1] ? (f.ubDiv = document.createElement("div"), $(f.uDiv).addClass(Ga + " ui-userdata-top").attr("id", "t_" + this.id).insertBefore(f.hDiv), $(f.ubDiv).addClass(Ga + " ui-userdata-bottom").attr("id", "tb_" + this.id).insertAfter(f.hDiv), ya && $(f.ubDiv).hide()) : $(f.uDiv).width(f.width).addClass(Ga + " ui-userdata-top").attr("id", "t_" + this.id), ya && $(f.uDiv).hide()
                }
                if (e.p.toppager && (e.p.toppager = $.jgrid.jqID(e.p.id) + "_toppager", f.topDiv = $("<div data-role='header' data-theme='" + e.p.dataTheme + "' id='" + e.p.toppager + "'></div>")[0], e.p.toppager = "#" + e.p.toppager, $(f.topDiv).addClass(l(m, "toppagerBox", !0, "ui-jqgrid-toppager")).width(f.width).insertBefore(f.hDiv), V(e.p.toppager, "_t")), e.p.footerrow && (f.sDiv = $("<div class='ui-jqgrid-sdiv ui-content'  data-theme='" + e.p.dataTheme + "'></div>")[0], za = $("<div class='ui-jqgrid-hbox" + ("rtl" === i ? "-rtl" : "") + "'></div>"), $(f.sDiv).append(za).width(f.width).insertAfter(f.hDiv), $(za).append(ta), f.footers = $(".ui-jqgrid-ftable", f.sDiv)[0].rows[0].cells, e.p.rownumbers && (f.footers[0].className = l(m, "rownumBox", !0, "jqgrid-rownum")), ya && $(f.sDiv).hide()), za = null, e.p.caption) {
                    var Ha = e.p.datatype;
                    e.p.hidegrid === !0 && ($(".ui-jqgrid-titlebar-close", f.cDiv).click(function(a) {
                        var b, c = $.isFunction(e.p.onHeaderClick),
                            d = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-toppager, .ui-jqgrid-pager, .ui-jqgrid-sdiv",
                            g = this;
                        return e.p.toolbar[0] === !0 && ("both" === e.p.toolbar[1] && (d += ", #" + $(f.ubDiv).attr("id")), d += ", #" + $(f.uDiv).attr("id")), b = $(d, "#gview_" + $.jgrid.jqID(e.p.id)).length, "visible" === e.p.gridstate ? $(d, "#gbox_" + $.jgrid.jqID(e.p.id)).slideUp("fast", function() {
                            b--, 0 === b && ($("a", g).removeClass(Da).addClass(Ea), e.p.gridstate = "hidden", $(e).triggerHandler("jqGridHeaderClick", [e.p.gridstate, a]), c && (ya || e.p.onHeaderClick.call(e, e.p.gridstate, a)))
                        }) : "hidden" === e.p.gridstate && $(d, "#gbox_" + $.jgrid.jqID(e.p.id)).slideDown("fast", function() {
                            b--, 0 === b && ($("a", g).removeClass(Ea).addClass(Da), ya && (e.p.datatype = Ha, T(), ya = !1), e.p.gridstate = "visible", $(e).triggerHandler("jqGridHeaderClick", [e.p.gridstate, a]), c && (ya || e.p.onHeaderClick.call(e, e.p.gridstate, a)))
                        }), !1
                    }), ya && (e.p.datatype = "local", $(".ui-jqgrid-titlebar-close", f.cDiv).trigger("click")))
                } else $(f.cDiv).hide(), e.p.toppager || $(f.hDiv).addClass(l(e.p.styleUI + ".common", "cornertop", !0));
                $(f.hDiv).after(f.bDiv).mousemove(function(a) {
                    return f.resizing ? (f.dragMove(a), !1) : void 0
                }), $(".ui-jqgrid-labels", f.hDiv).bind("selectstart", function() {
                    return !1
                }), $(document).bind("mouseup.jqGrid" + e.p.id, function() {
                    return f.resizing ? (f.dragEnd(!0), !1) : !0
                }), e.formatCol = B, e.sortData = X, e.updatepager = Q, e.refreshIndex = L, e.setHeadCheckBox = U, e.constructTr = M, e.formatter = function(a, b, c, d, e) {
                    return D(a, b, c, d, e)
                }, $.extend(f, {
                    populate: T,
                    emptyRows: J,
                    beginReq: R,
                    endReq: S
                }), this.grid = f, e.addXmlData = function(a) {
                    N(a)
                }, e.addJSONData = function(a) {
                    O(a)
                }, this.grid.cols = this.rows[0].cells, $(e).triggerHandler("jqGridInitGrid"), $.isFunction(e.p.onInitGrid) && e.p.onInitGrid.call(e), T(), e.p.hiddengrid = !1, w.bind("pageshow", function() {
                    var a = {
                        onScrollMove: function() {
                            this.x <= 0 && (f.hDiv.scrollLeft = -this.x, e.p.footerrow && (f.sDiv.scrollLeft = -this.x))
                        }
                    };
                    if (e.p.scrollPaging || e.p.scroll) {
                        var b = $("#pullUp_" + $.jgrid.jqID(e.p.id))[0],
                            c = $("#pullDown_" + $.jgrid.jqID(e.p.id))[0],
                            g = b.offsetHeight,
                            h = c.offsetHeight;
                        a.bounce = !0, a.useTransition = !0, a.onRefresh = function() {
                            c.className.match("loading1") ? (c.className = "", c.querySelector(".pullDownLabel").innerHTML = $.jgrid.getRegional(e, "defaults.scrollPulldown")) : b.className.match("loading1") && (b.className = "", b.querySelector(".pullUpLabel").innerHTML = $.jgrid.getRegional(e, "defaults.scrollPullup"))
                        }, a.onScrollMove = function() {
                            this.x <= 0 && (f.hDiv.scrollLeft = -this.x, e.p.footerrow && (f.sDiv.scrollLeft = -this.x)), this.y > 5 && !c.className.match("gridflip") ? (c.className = "gridflip", c.querySelector(".pullDownLabel").innerHTML = $.jgrid.getRegional(e, "defaults.scrollRefresh"), this.minScrollY = 0) : this.y < 5 && c.className.match("gridflip") ? (c.className = "", c.querySelector(".pullDownLabel").innerHTML = $.jgrid.getRegional(e, "defaults.scrollPulldown"), this.minScrollY = -h) : this.y < this.maxScrollY - 5 && !b.className.match("gridflip") ? (b.className = "gridflip", b.querySelector(".pullUpLabel").innerHTML = $.jgrid.getRegional(e, "defaults.scrollRefresh"), this.maxScrollY = this.maxScrollY) : this.y > this.maxScrollY + 5 && b.className.match("gridflip") && (b.className = "", b.querySelector(".pullUpLabel").innerHTML = $.jgrid.getRegional(e, "defaults.scrollPullup"), this.maxScrollY = g)
                        }, a.onScrollEnd = function() {
                            if (c.className.match("gridflip")) c.className = "loading1", c.querySelector(".pullDownLabel").innerHTML = $.jgrid.getRegional(e, "defaults.loadtext", e.p.loadtext), e.p.page > 1 ? (e.p.page--, T()) : (c.className = "", c.querySelector(".pullDownLabel").innerHTML = $.jgrid.getRegional(e, "defaults.nomorerecs", e.p.nomorerecs)), setTimeout(function() {
                                d.scrollTo(0, -50, 100)
                            }, 100);
                            else if (b.className.match("gridflip")) {
                                b.className = "loading1", b.querySelector(".pullUpLabel").innerHTML = $.jgrid.getRegional(e, "defaults.loadtext", e.p.loadtext);
                                var a = this.y,
                                    f = !1;
                                e.p.lastpage >= e.p.page + 1 ? (e.p.page++, T()) : (b.className = "", b.querySelector(".pullUpLabel").innerHTML = $.jgrid.getRegional(e, "defaults.nomorerecs", e.p.nomorerecs), f = !0), e.p.scroll || f ? setTimeout(function() {
                                    d.scrollTo(0, a + 50, 100)
                                }, 100) : setTimeout(function() {
                                    d.scrollTo(0, -50, 100)
                                }, 100)
                            }
                        }
                    }
                    a = $.extend(!0, a, e.p.iScroll || {}), document.addEventListener("touchmove", function(a) {
                        a.preventDefault()
                    }, !1), setTimeout(function() {
                        e.p.prmNames.npage = 1, d = new iScroll("bdiv_" + e.p.id, a), (e.p.scrollPaging || e.p.scroll) && d.scrollTo(0, -50, 100)
                    }, 0)
                }), e.p.refreshContent && $("#" + $.jgrid.jqID(e.p.id)).bind("jqGridAfterGridComplete.Mobile", function() {
                    $(this).trigger("create")
                }), $(window).bind("orientationchange", function() {
                    setTimeout(function() {
                        var a = $(window).width(),
                            b = $("#gbox_" + $.jgrid.jqID(e.p.id)).parent().width(),
                            c = e.p.width;
                        c = a - b > 3 ? b : a, $("#" + $.jgrid.jqID(e.p.id)).jqGrid("setGridWidth", c), d.refresh()
                    }, 600)
                })
            }
        })
    }, $.jgrid.extend({
        getGridParam: function(a, b) {
            var c, d = this[0];
            if (d && d.grid) {
                if (void 0 === b && "string" != typeof b && (b = "jqGrid"), c = d.p, "jqGrid" !== b) try {
                    c = $(d).data(b)
                } catch (e) {
                    c = d.p
                }
                return a ? void 0 !== c[a] ? c[a] : null : c
            }
        },
        setGridParam: function(a, b) {
            return this.each(function() {
                if (null == b && (b = !1), this.grid && "object" == typeof a)
                    if (b === !0) {
                        var c = $.extend({}, this.p, a);
                        this.p = c
                    } else $.extend(!0, this.p, a)
            })
        },
        getGridRowById: function(a) {
            var b;
            return this.each(function() {
                try {
                    for (var c = this.rows.length; c--;)
                        if (a.toString() === this.rows[c].id) {
                            b = this.rows[c];
                            break
                        }
                } catch (d) {
                    b = $(this.grid.bDiv).find("#" + $.jgrid.jqID(a))
                }
            }), b
        },
        getDataIDs: function() {
            var a, b = [],
                c = 0,
                d = 0;
            return this.each(function() {
                if (a = this.rows.length, a && a > 0)
                    for (; a > c;) $(this.rows[c]).hasClass("jqgrow") && (b[d] = this.rows[c].id, d++), c++
            }), b
        },
        setSelection: function(a, b, c) {
            return this.each(function() {
                function d(a) {
                    var b = $(l.grid.bDiv)[0].clientHeight,
                        c = $(l.grid.bDiv)[0].scrollTop,
                        d = $(l.rows[a]).position().top,
                        e = l.rows[a].clientHeight;
                    d + e >= b + c ? $(l.grid.bDiv)[0].scrollTop = d - (b + c) + e + c : b + c > d && c > d && ($(l.grid.bDiv)[0].scrollTop = d)
                }
                var e, f, g, h, i, j, k, l = this,
                    m = $.jgrid.getMethod("getStyleUI"),
                    n = m(l.p.styleUI + ".common", "highlight", !0),
                    o = m(l.p.styleUI + ".common", "disabled", !0);
                void 0 !== a && (b = b === !1 ? !1 : !0, f = $(l).jqGrid("getGridRowById", a), !f || !f.className || f.className.indexOf(o) > -1 || (l.p.scrollrows === !0 && (g = $(l).jqGrid("getGridRowById", a).rowIndex, g >= 0 && d(g)), l.p.frozenColumns === !0 && (j = l.p.id + "_frozen"), l.p.multiselect ? (l.setHeadCheckBox(!1), l.p.selrow = f.id, h = $.inArray(l.p.selrow, l.p.selarrrow), -1 === h ? ("ui-subgrid" !== f.className && $(f).addClass(n).attr("aria-selected", "true"), e = !0, l.p.selarrrow.push(l.p.selrow)) : ("ui-subgrid" !== f.className && $(f).removeClass(n).attr("aria-selected", "false"), e = !1, l.p.selarrrow.splice(h, 1), i = l.p.selarrrow[0], l.p.selrow = void 0 === i ? null : i), $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(f.id))[l.p.useProp ? "prop" : "attr"]("checked", e), j && (-1 === h ? $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n) : $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).removeClass(n), $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j))[l.p.useProp ? "prop" : "attr"]("checked", e)), b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]), l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c))) : "ui-subgrid" !== f.className && (l.p.selrow !== f.id ? (k = $(l).jqGrid("getGridRowById", l.p.selrow), k && $(k).removeClass(n).attr({
                    "aria-selected": "false",
                    tabindex: "-1"
                }), $(f).addClass(n).attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }), j && ($("#" + $.jgrid.jqID(l.p.selrow), "#" + $.jgrid.jqID(j)).removeClass(n), $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n)), e = !0) : e = !1, l.p.selrow = f.id, b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]), l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c)))))
            })
        },
        resetSelection: function(a) {
            return this.each(function() {
                var b, c, d = this,
                    e = $.jgrid.getMethod("getStyleUI"),
                    f = e(d.p.styleUI + ".common", "highlight", !0),
                    g = e(d.p.styleUI + ".common", "hover", !0);
                if (d.p.frozenColumns === !0 && (c = d.p.id + "_frozen"), void 0 !== a) {
                    if (b = a === d.p.selrow ? d.p.selrow : a, $("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(b)).removeClass(f).attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f), d.p.multiselect) {
                        $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(d.p.id))[d.p.useProp ? "prop" : "attr"]("checked", !1), c && $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1), d.setHeadCheckBox(!1);
                        var h = $.inArray($.jgrid.jqID(b), d.p.selarrrow); - 1 !== h && d.p.selarrrow.splice(h, 1)
                    }
                    d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b), b = null
                } else d.p.multiselect ? ($(d.p.selarrrow).each(function(a, b) {
                    $($(d).jqGrid("getGridRowById", b)).removeClass(f).attr("aria-selected", "false"), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b))[d.p.useProp ? "prop" : "attr"]("checked", !1), c && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1)), d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b)
                }), d.setHeadCheckBox(!1), d.p.selarrrow = [], d.p.selrow = null) : d.p.selrow && ($("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(d.p.selrow)).removeClass(f).attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(d.p.selrow), "#" + $.jgrid.jqID(c)).removeClass(f), d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, d.p.selrow), d.p.selrow = null);
                d.p.cellEdit === !0 && parseInt(d.p.iCol, 10) >= 0 && parseInt(d.p.iRow, 10) >= 0 && ($("td:eq(" + d.p.iCol + ")", d.rows[d.p.iRow]).removeClass("edit-cell " + f), $(d.rows[d.p.iRow]).removeClass("selected-row " + g)), d.p.savedRow = []
            })
        },
        getRowData: function(a, b) {
            var c, d, e = {},
                f = !1,
                g = 0;
            return this.each(function() {
                var h, i, j = this;
                if (null == a) f = !0, c = [], d = j.rows.length;
                else {
                    if (i = $(j).jqGrid("getGridRowById", a), !i) return e;
                    d = 2
                }
                for (b && b === !0 && j.p.data.length > 0 || (b = !1); d > g;) f && (i = j.rows[g]), $(i).hasClass("jqgrow") && (b ? e = j.p.data[j.p._index[i.id]] : $('td[role="gridcell"]', i).each(function(a) {
                    if (h = j.p.colModel[a].name, "cb" !== h && "subgrid" !== h && "rn" !== h)
                        if (j.p.treeGrid === !0 && h === j.p.ExpandColumn) e[h] = $.jgrid.htmlDecode($("span:first", this).html());
                        else try {
                            e[h] = $.unformat.call(j, this, {
                                rowId: i.id,
                                colModel: j.p.colModel[a]
                            }, a)
                        } catch (b) {
                            e[h] = $.jgrid.htmlDecode($(this).html())
                        }
                }), f && (c.push(e), e = {})), g++
            }), c || e
        },
        delRowData: function(a) {
            var b, c, d, e = !1;
            return this.each(function() {
                var f = this;
                if (b = $(f).jqGrid("getGridRowById", a), !b) return !1;
                if (f.p.subGrid && (d = $(b).next(), d.hasClass("ui-subgrid") && d.remove()), $(b).remove(), f.p.records--, f.p.reccount--, f.updatepager(!0, !1), e = !0, f.p.multiselect && (c = $.inArray(a, f.p.selarrrow), -1 !== c && f.p.selarrrow.splice(c, 1)), f.p.multiselect && f.p.selarrrow.length > 0 ? f.p.selrow = f.p.selarrrow[f.p.selarrrow.length - 1] : f.p.selrow = null, "local" === f.p.datatype) {
                    var g = $.jgrid.stripPref(f.p.idPrefix, a),
                        h = f.p._index[g];
                    void 0 !== h && (f.p.data.splice(h, 1), f.refreshIndex())
                }
                if (f.p.altRows === !0 && e) {
                    var i = f.p.altclass;
                    $(f.rows).each(function(a) {
                        a % 2 === 1 ? $(this).addClass(i) : $(this).removeClass(i)
                    })
                }
            }), e
        },
        setRowData: function(a, b, c) {
            var d, e, f = !0;
            return this.each(function() {
                if (!this.grid) return !1;
                var g, h, i = this,
                    j = typeof c,
                    k = {};
                if (h = $(this).jqGrid("getGridRowById", a), !h) return !1;
                if (b) try {
                    if ($(this.p.colModel).each(function(c) {
                            d = this.name;
                            var f = $.jgrid.getAccessor(b, d);
                            void 0 !== f && (k[d] = this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? $.unformat.date.call(i, f, this) : f, g = i.formatter(a, k[d], c, b, "edit"), e = this.title ? {
                                title: $.jgrid.stripHtml(g)
                            } : {}, i.p.treeGrid === !0 && d === i.p.ExpandColumn ? $("td[role='gridcell']:eq(" + c + ") > span:first", h).html(g).attr(e) : $("td[role='gridcell']:eq(" + c + ")", h).html(g).attr(e))
                        }), "local" === i.p.datatype) {
                        var l, m = $.jgrid.stripPref(i.p.idPrefix, a),
                            n = i.p._index[m];
                        if (i.p.treeGrid)
                            for (l in i.p.treeReader) i.p.treeReader.hasOwnProperty(l) && delete k[i.p.treeReader[l]];
                        void 0 !== n && (i.p.data[n] = $.extend(!0, i.p.data[n], k)), k = null
                    }
                } catch (o) {
                    f = !1
                }
                f && ("string" === j ? $(h).addClass(c) : null !== c && "object" === j && $(h).css(c), $(i).triggerHandler("jqGridAfterGridComplete"))
            }), f
        },
        addRowData: function(a, b, c, d) {
            -1 == ["first", "last", "before", "after"].indexOf(c) && (c = "last");
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = !1,
                t = "",
                u = "",
                v = "";
            return b && ($.isArray(b) ? (m = !0, n = a) : (b = [b], m = !1), this.each(function() {
                var w = this,
                    x = b.length;
                i = w.p.rownumbers === !0 ? 1 : 0, g = w.p.multiselect === !0 ? 1 : 0, h = w.p.subGrid === !0 ? 1 : 0, m || (void 0 !== a ? a = String(a) : (a = $.jgrid.randId(), w.p.keyName !== !1 && (n = w.p.keyName, void 0 !== b[0][n] && (a = b[0][n])))), o = w.p.altclass;
                var y, z = 0,
                    A = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "rowBox", !0, "jqgrow ui-row-" + w.p.direction),
                    B = {},
                    C = $.isFunction(w.p.afterInsertRow) ? !0 : !1;
                for (i && (t = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "rownumBox", !1, "jqgrid-rownum")), g && (u = $(w).jqGrid("getStyleUI", w.p.styleUI + ".base", "multiBox", !1, "cbox")); x > z;) {
                    if (p = b[z], f = [], y = A, m) {
                        try {
                            a = p[n], void 0 === a && (a = $.jgrid.randId())
                        } catch (D) {
                            a = $.jgrid.randId()
                        }
                        y += w.p.altRows === !0 && (w.rows.length - 1) % 2 === 0 ? " " + o : ""
                    }
                    for (r = a, a = w.p.idPrefix + a, i && (v = w.formatCol(0, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" ' + t + " " + v + ">0</td>"), g && (l = '<input role="checkbox" type="checkbox" id="jqg_' + w.p.id + "_" + a + '" ' + u + "/>", v = w.formatCol(i, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" ' + v + ">" + l + "</td>"), h && (f[f.length] = $(w).jqGrid("addSubGridCell", g + i, 1)), k = g + h + i; k < w.p.colModel.length; k++) q = w.p.colModel[k], e = q.name, B[e] = p[e], l = w.formatter(a, $.jgrid.getAccessor(p, e), k, p), v = w.formatCol(k, 1, l, p, a, B), f[f.length] = '<td role="gridcell" ' + v + ">" + l + "</td>";
                    if (f.unshift(w.constructTr(a, !1, y, B, p)), f[f.length] = "</tr>", 0 === w.rows.length) $("table:first", w.grid.bDiv).append(f.join(""));
                    else switch (c) {
                        case "last":
                            $(w.rows[w.rows.length - 1]).after(f.join("")), j = w.rows.length - 1;
                            break;
                        case "first":
                            $(w.rows[0]).after(f.join("")), j = 1;
                            break;
                        case "after":
                            j = $(w).jqGrid("getGridRowById", d), j && ($(w.rows[j.rowIndex + 1]).hasClass("ui-subgrid") ? $(w.rows[j.rowIndex + 1]).after(f) : $(j).after(f.join("")), j = j.rowIndex + 1);
                            break;
                        case "before":
                            j = $(w).jqGrid("getGridRowById", d), j && ($(j).before(f.join("")), j = j.rowIndex - 1)
                    }
                    w.p.subGrid === !0 && $(w).jqGrid("addSubGrid", g + i, j), w.p.records++, w.p.reccount++, $(w).triggerHandler("jqGridAfterInsertRow", [a, p, p]), C && w.p.afterInsertRow.call(w, a, p, p), z++, "local" === w.p.datatype && (B[w.p.localReader.id] = r, w.p._index[r] = w.p.data.length, w.p.data.push(B), B = {})
                }
                w.p.altRows !== !0 || m || ("last" === c ? (w.rows.length - 1) % 2 === 0 && $(w.rows[w.rows.length - 1]).addClass(o) : $(w.rows).each(function(a) {
                    a % 2 === 0 ? $(this).addClass(o) : $(this).removeClass(o)
                })), w.updatepager(!0, !0), s = !0
            })), s
        },
        footerData: function(a, b, c) {
            function d(a) {
                var b;
                for (b in a)
                    if (a.hasOwnProperty(b)) return !1;
                return !0
            }
            var e, f, g = !1,
                h = {};
            return void 0 === a && (a = "get"), "boolean" != typeof c && (c = !0), a = a.toLowerCase(), this.each(function() {
                var i, j = this;
                return j.grid && j.p.footerrow ? "set" === a && d(b) ? !1 : (g = !0, void $(this.p.colModel).each(function(d) {
                    e = this.name, "set" === a ? void 0 !== b[e] && (i = c ? j.formatter("", b[e], d, b, "edit") : b[e], f = this.title ? {
                        title: $.jgrid.stripHtml(i)
                    } : {}, $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html(i).attr(f), g = !0) : "get" === a && (h[e] = $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html())
                })) : !1
            }), "get" === a ? h : g
        },
        showHideCol: function(a, b) {
            return this.each(function() {
                var c, d = this,
                    e = !1,
                    f = $.jgrid.cell_width ? 0 : d.p.cellLayout;
                if (d.grid) {
                    "string" == typeof a && (a = [a]), b = "none" !== b ? "" : "none";
                    var g = "" === b ? !0 : !1,
                        h = d.p.groupHeader && ("object" == typeof d.p.groupHeader || $.isFunction(d.p.groupHeader));
                    h && $(d).jqGrid("destroyGroupHeader", !1), $(this.p.colModel).each(function(h) {
                        if (-1 !== $.inArray(this.name, a) && this.hidden === g) {
                            if (d.p.frozenColumns === !0 && this.frozen === !0) return !0;
                            $("tr[role=row]", d.grid.hDiv).each(function() {
                                $(this.cells[h]).css("display", b)
                            }), $(d.rows).each(function() {
                                $(this).hasClass("jqgroup") || $(this.cells[h]).css("display", b)
                            }), d.p.footerrow && $("tr.footrow td:eq(" + h + ")", d.grid.sDiv).css("display", b), c = parseInt(this.width, 10), "none" === b ? d.p.tblwidth -= c + f : d.p.tblwidth += c + f, this.hidden = !g, e = !0, $(d).triggerHandler("jqGridShowHideCol", [g, this.name, h])
                        }
                    }), e === !0 && (d.p.shrinkToFit !== !0 || isNaN(d.p.height) || (d.p.tblwidth += parseInt(d.p.scrollOffset, 10)), $(d).jqGrid("setGridWidth", d.p.shrinkToFit === !0 ? d.p.tblwidth : d.p.width)), h && $(d).jqGrid("setGroupHeaders", d.p.groupHeader)
                }
            })
        },
        hideCol: function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "none")
            })
        },
        showCol: function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "")
            })
        },
        remapColumns: function(a, b, c) {
            function d(b) {
                var c;
                c = b.length ? $.makeArray(b) : $.extend({}, b), $.each(a, function(a) {
                    b[a] = c[this]
                })
            }

            function e(b, c) {
                $(">tr" + (c || ""), b).each(function() {
                    var b = this,
                        c = $.makeArray(b.cells);
                    $.each(a, function() {
                        var a = c[this];
                        a && b.appendChild(a)
                    })
                })
            }
            var f = this.get(0);
            d(f.p.colModel), d(f.p.colNames), d(f.grid.headers), e($("thead:first", f.grid.hDiv), c && ":not(.ui-jqgrid-labels)"), b && e($("#" + $.jgrid.jqID(f.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot"), f.p.footerrow && e($("tbody:first", f.grid.sDiv)), f.p.remapColumns && (f.p.remapColumns.length ? d(f.p.remapColumns) : f.p.remapColumns = $.makeArray(a)), f.p.lastsort = $.inArray(f.p.lastsort, a), f.p.treeGrid && (f.p.expColInd = $.inArray(f.p.expColInd, a)), $(f).triggerHandler("jqGridRemapColumns", [a, b, c])
        },
        setGridWidth: function(a, b) {
            return this.each(function() {
                if (this.grid) {
                    var c, d, e, f, g = this,
                        h = 0,
                        i = $.jgrid.cell_width ? 0 : g.p.cellLayout,
                        j = 0,
                        k = !1,
                        l = g.p.scrollOffset,
                        m = 0;
                    if ("boolean" != typeof b && (b = g.p.shrinkToFit), !isNaN(a)) {
                        if (a = parseInt(a, 10), g.grid.width = g.p.width = a, $("#gbox_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $("#gview_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $(g.grid.bDiv).css("width", a + "px"), $(g.grid.hDiv).css("width", a + "px"), g.p.pager && $(g.p.pager).css("width", a + "px"), g.p.toppager && $(g.p.toppager).css("width", a + "px"), g.p.toolbar[0] === !0 && ($(g.grid.uDiv).css("width", a + "px"), "both" === g.p.toolbar[1] && $(g.grid.ubDiv).css("width", a + "px")), g.p.footerrow && $(g.grid.sDiv).css("width", a + "px"), b === !1 && g.p.forceFit === !0 && (g.p.forceFit = !1), b === !0) {
                            if ($.each(g.p.colModel, function() {
                                    this.hidden === !1 && (c = this.widthOrg, h += c + i, this.fixed ? m += c + i : j++)
                                }), 0 === j) return;
                            g.p.tblwidth = h, e = a - i * j - m, isNaN(g.p.height) || ($(g.grid.bDiv)[0].clientHeight < $(g.grid.bDiv)[0].scrollHeight || 1 === g.rows.length) && (k = !0, e -= l), h = 0;
                            var n = g.grid.cols.length > 0;
                            if ($.each(g.p.colModel, function(a) {
                                    if (this.hidden === !1 && !this.fixed) {
                                        if (c = this.widthOrg, c = Math.round(e * c / (g.p.tblwidth - i * j - m)), 0 > c) return;
                                        this.width = c, h += c, g.grid.headers[a].width = c, g.grid.headers[a].el.style.width = c + "px", g.p.footerrow && (g.grid.footers[a].style.width = c + "px"), n && (g.grid.cols[a].style.width = c + "px"), d = a
                                    }
                                }), !d) return;
                            if (f = 0, k ? a - m - (h + i * j) !== l && (f = a - m - (h + i * j) - l) : 1 !== Math.abs(a - m - (h + i * j)) && (f = a - m - (h + i * j)), g.p.colModel[d].width += f, g.p.tblwidth = h + f + i * j + m, g.p.tblwidth > a) {
                                var o = g.p.tblwidth - parseInt(a, 10);
                                g.p.tblwidth = a, c = g.p.colModel[d].width = g.p.colModel[d].width - o
                            } else c = g.p.colModel[d].width;
                            g.grid.headers[d].width = c, g.grid.headers[d].el.style.width = c + "px", n && (g.grid.cols[d].style.width = c + "px"), g.p.footerrow && (g.grid.footers[d].style.width = c + "px")
                        }
                        g.p.tblwidth && ($("table:first", g.grid.bDiv).css("width", g.p.tblwidth + "px"), $("table:first", g.grid.hDiv).css("width", g.p.tblwidth + "px"), g.grid.hDiv.scrollLeft = g.grid.bDiv.scrollLeft, g.p.footerrow && $("table:first", g.grid.sDiv).css("width", g.p.tblwidth + "px"))
                    }
                }
            })
        },
        setGridHeight: function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    var c = $(b.grid.bDiv);
                    c.css({
                        height: a + (isNaN(a) ? "" : "px")
                    }), b.p.frozenColumns === !0 && $("#" + $.jgrid.jqID(b.p.id) + "_frozen").parent().height(c.height() - 16), b.p.height = a, b.p.scroll && b.grid.populateVisible()
                }
            })
        },
        setCaption: function(a) {
            return this.each(function() {
                var b = $(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "cornertop", !0);
                this.p.caption = a, $(".ui-jqgrid-title, .ui-jqgrid-title-rtl", this.grid.cDiv).html(a), $(this.grid.cDiv).show(), $(this.grid.hDiv).removeClass(b)
            })
        },
        setLabel: function(a, b, c, d) {
            return this.each(function() {
                var e = this,
                    f = -1;
                if (e.grid && void 0 !== a && ($(e.p.colModel).each(function(b) {
                        return this.name === a ? (f = b, !1) : void 0
                    }), f >= 0)) {
                    var g = $("tr.ui-jqgrid-labels th:eq(" + f + ")", e.grid.hDiv);
                    if (b) {
                        var h = $(".s-ico", g);
                        $("[id^=jqgh_]", g).empty().html(b).append(h), e.p.colNames[f] = b
                    }
                    c && ("string" == typeof c ? $(g).addClass(c) : $(g).css(c)), "object" == typeof d && $(g).attr(d)
                }
            })
        },
        setCell: function(a, b, c, d, e, f) {
            return this.each(function() {
                var g, h, i = this,
                    j = -1;
                if (i.grid && (isNaN(b) ? $(i.p.colModel).each(function(a) {
                        return this.name === b ? (j = a, !1) : void 0
                    }) : j = parseInt(b, 10), j >= 0)) {
                    var k = $(i).jqGrid("getGridRowById", a);
                    if (k) {
                        var l = $("td:eq(" + j + ")", k),
                            m = 0,
                            n = [];
                        if ("" !== c || f === !0) {
                            if (void 0 !== k.cells)
                                for (; m < k.cells.length;) n.push(k.cells[m].innerHTML), m++;
                            if (g = i.formatter(a, c, j, n, "edit"), h = i.p.colModel[j].title ? {
                                    title: $.jgrid.stripHtml(g)
                                } : {}, i.p.treeGrid && $(".tree-wrap", $(l)).length > 0 ? $("span", $(l)).html(g).attr(h) : $(l).html(g).attr(h), "local" === i.p.datatype) {
                                var o, p = i.p.colModel[j];
                                c = p.formatter && "string" == typeof p.formatter && "date" === p.formatter ? $.unformat.date.call(i, c, p) : c, o = i.p._index[$.jgrid.stripPref(i.p.idPrefix, a)], void 0 !== o && (i.p.data[o][p.name] = c)
                            }
                        }
                        "string" == typeof d ? $(l).addClass(d) : d && $(l).css(d), "object" == typeof e && $(l).attr(e)
                    }
                }
            })
        },
        getCell: function(a, b) {
            var c = !1;
            return this.each(function() {
                var d = this,
                    e = -1;
                if (d.grid && (isNaN(b) ? $(d.p.colModel).each(function(a) {
                        return this.name === b ? (e = a, !1) : void 0
                    }) : e = parseInt(b, 10), e >= 0)) {
                    var f = $(d).jqGrid("getGridRowById", a);
                    if (f) try {
                        c = $.unformat.call(d, $("td:eq(" + e + ")", f), {
                            rowId: f.id,
                            colModel: d.p.colModel[e]
                        }, e)
                    } catch (g) {
                        c = $.jgrid.htmlDecode($("td:eq(" + e + ")", f).html())
                    }
                }
            }), c
        },
        getCol: function(a, b, c) {
            var d, e, f, g, h = [],
                i = 0;
            return b = "boolean" != typeof b ? !1 : b, void 0 === c && (c = !1), this.each(function() {
                var j = this,
                    k = -1;
                if (j.grid && (isNaN(a) ? $(j.p.colModel).each(function(b) {
                        return this.name === a ? (k = b, !1) : void 0
                    }) : k = parseInt(a, 10), k >= 0)) {
                    var l = j.rows.length,
                        m = 0,
                        n = 0;
                    if (l && l > 0) {
                        for (; l > m;) {
                            if ($(j.rows[m]).hasClass("jqgrow")) {
                                try {
                                    d = $.unformat.call(j, $(j.rows[m].cells[k]), {
                                        rowId: j.rows[m].id,
                                        colModel: j.p.colModel[k]
                                    }, k)
                                } catch (o) {
                                    d = $.jgrid.htmlDecode(j.rows[m].cells[k].innerHTML)
                                }
                                c ? (g = parseFloat(d), isNaN(g) || (i += g, void 0 === f && (f = e = g), e = Math.min(e, g), f = Math.max(f, g), n++)) : b ? h.push({
                                    id: j.rows[m].id,
                                    value: d
                                }) : h.push(d)
                            }
                            m++
                        }
                        if (c) switch (c.toLowerCase()) {
                            case "sum":
                                h = i;
                                break;
                            case "avg":
                                h = i / n;
                                break;
                            case "count":
                                h = l - 1;
                                break;
                            case "min":
                                h = e;
                                break;
                            case "max":
                                h = f
                        }
                    }
                }
            }), h
        },
        clearGridData: function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    if ("boolean" != typeof a && (a = !1), b.p.deepempty) $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:gt(0)").remove();
                    else {
                        var c = $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:first")[0];
                        $("#" + $.jgrid.jqID(b.p.id) + " tbody:first").empty().append(c)
                    }
                    b.p.footerrow && a && $(".ui-jqgrid-ftable td", b.grid.sDiv).html("&#160;"), b.p.selrow = null, b.p.selarrrow = [], b.p.savedRow = [], b.p.records = 0, b.p.page = 1, b.p.lastpage = 0, b.p.reccount = 0, b.p.data = [], b.p._index = {}, b.updatepager(!0, !1)
                }
            })
        },
        getInd: function(a, b) {
            var c, d = !1;
            return this.each(function() {
                c = $(this).jqGrid("getGridRowById", a), c && (d = b === !0 ? c : c.rowIndex)
            }), d
        },
        bindKeys: function(a) {
            var b = $.extend({
                onEnter: null,
                onSpace: null,
                onLeftKey: null,
                onRightKey: null,
                scrollingRows: !0
            }, a || {});
            return this.each(function() {
                var a = this;
                $("body").is("[role]") || $("body").attr("role", "application"), a.p.scrollrows = b.scrollingRows, $(a).keydown(function(c) {
                    var d, e, f, g = $(a).find("tr[tabindex=0]")[0],
                        h = a.p.treeReader.expanded_field;
                    if (g)
                        if (f = a.p._index[$.jgrid.stripPref(a.p.idPrefix, g.id)], 37 === c.keyCode || 38 === c.keyCode || 39 === c.keyCode || 40 === c.keyCode) {
                            if (38 === c.keyCode) {
                                if (e = g.previousSibling, d = "", e)
                                    if ($(e).is(":hidden")) {
                                        for (; e;)
                                            if (e = e.previousSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                                d = e.id;
                                                break
                                            }
                                    } else d = e.id;
                                $(a).jqGrid("setSelection", d, !0, c), c.preventDefault()
                            }
                            if (40 === c.keyCode) {
                                if (e = g.nextSibling, d = "", e)
                                    if ($(e).is(":hidden")) {
                                        for (; e;)
                                            if (e = e.nextSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                                d = e.id;
                                                break
                                            }
                                    } else d = e.id;
                                $(a).jqGrid("setSelection", d, !0, c), c.preventDefault()
                            }
                            37 === c.keyCode && (a.p.treeGrid && a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyLeft", [a.p.selrow]), $.isFunction(b.onLeftKey) && b.onLeftKey.call(a, a.p.selrow)), 39 === c.keyCode && (a.p.treeGrid && !a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyRight", [a.p.selrow]), $.isFunction(b.onRightKey) && b.onRightKey.call(a, a.p.selrow))
                        } else 13 === c.keyCode ? ($(a).triggerHandler("jqGridKeyEnter", [a.p.selrow]), $.isFunction(b.onEnter) && b.onEnter.call(a, a.p.selrow)) : 32 === c.keyCode && ($(a).triggerHandler("jqGridKeySpace", [a.p.selrow]), $.isFunction(b.onSpace) && b.onSpace.call(a, a.p.selrow))
                })
            })
        },
        unbindKeys: function() {
            return this.each(function() {
                $(this).unbind("keydown")
            })
        },
        getLocalRow: function(a) {
            var b, c = !1;
            return this.each(function() {
                void 0 !== a && (b = this.p._index[$.jgrid.stripPref(this.p.idPrefix, a)], b >= 0 && (c = this.p.data[b]))
            }), c
        },
        progressBar: function(a) {
            return a = $.extend({
                htmlcontent: "",
                method: "hide",
                loadtype: "disable"
            }, a || {}), this.each(function() {
                switch (a.loadtype) {
                    case "disable":
                        break;
                    default:
                        try {
                            $.mobile.loading(a.method, {
                                html: a.htmlcontent
                            })
                        } catch (b) {}
                }
            })
        },
        getColProp: function(a) {
            var b = {},
                c = this[0];
            if (!c.grid) return !1;
            var d, e = c.p.colModel;
            for (d = 0; d < e.length; d++)
                if (e[d].name === a) {
                    b = e[d];
                    break
                }
            return b
        },
        setColProp: function(a, b) {
            return this.each(function() {
                if (this.grid && b) {
                    var c, d = this.p.colModel;
                    for (c = 0; c < d.length; c++)
                        if (d[c].name === a) {
                            $.extend(!0, this.p.colModel[c], b);
                            break
                        }
                }
            })
        },
        sortGrid: function(a, b, c) {
            return this.each(function() {
                var d, e = this,
                    f = -1,
                    g = !1;
                if (e.grid) {
                    for (a || (a = e.p.sortname), d = 0; d < e.p.colModel.length; d++)
                        if (e.p.colModel[d].index === a || e.p.colModel[d].name === a) {
                            f = d, e.p.frozenColumns === !0 && e.p.colModel[d].frozen === !0 && (g = e.grid.fhDiv.find("#" + e.p.id + "_" + a));
                            break
                        }
                    if (-1 !== f) {
                        var h = e.p.colModel[f].sortable;
                        g || (g = e.grid.headers[f].el), "boolean" != typeof h && (h = !0), "boolean" != typeof b && (b = !1), h && e.sortData("jqgh_" + e.p.id + "_" + a, f, b, c, g)
                    }
                }
            })
        },
        setGridState: function(a) {
            return this.each(function() {
                if (this.grid) {
                    var b = this,
                        c = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_open", !0),
                        d = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_close", !0);
                    "hidden" === a ? ($(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideUp("fast"), b.p.pager && $(b.p.pager).slideUp("fast"), b.p.toppager && $(b.p.toppager).slideUp("fast"), b.p.toolbar[0] === !0 && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideUp("fast"), $(b.grid.uDiv).slideUp("fast")), b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideUp("fast"), $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(c).addClass(d), b.p.gridstate = "hidden") : "visible" === a && ($(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideDown("fast"), b.p.pager && $(b.p.pager).slideDown("fast"), b.p.toppager && $(b.p.toppager).slideDown("fast"), b.p.toolbar[0] === !0 && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideDown("fast"), $(b.grid.uDiv).slideDown("fast")), b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideDown("fast"), $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(d).addClass(c), b.p.gridstate = "visible")
                }
            })
        },
        setFrozenColumns: function() {
            return this.each(function() {
                if (this.grid) {
                    var a = this,
                        b = a.p.colModel,
                        c = 0,
                        d = b.length,
                        e = -1,
                        f = !1,
                        g = $(a).jqGrid("getStyleUI", a.p.styleUI + ".base", "headerDiv", !0, "ui-jqgrid-hdiv"),
                        h = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0);
                    if (a.p.subGrid !== !0 && a.p.treeGrid !== !0 && a.p.cellEdit !== !0 && !a.p.sortable && !a.p.scroll) {
                        for (a.p.rownumbers && c++, a.p.multiselect && c++; d > c && b[c].frozen === !0;) f = !0, e = c, c++;
                        if (e >= 0 && f) {
                            var i = a.p.caption ? $(a.grid.cDiv).outerHeight() : 0,
                                j = $(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).height();
                            a.p.toppager && (i += $(a.grid.topDiv).outerHeight()), a.p.toolbar[0] === !0 && "bottom" !== a.p.toolbar[1] && (i += $(a.grid.uDiv).outerHeight()), a.grid.fhDiv = $('<div style="position:absolute;left:0px;top:' + i + "px;height:" + j + 'px;" class="frozen-div ' + g + '"></div>'), a.grid.fbDiv = $('<div style="position:absolute;left:0px;top:' + (parseInt(i, 10) + parseInt(j, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>'), $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fhDiv);
                            var k = $(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                            if (a.p.groupHeader) {
                                $("tr.jqg-first-row-header, tr.jqg-third-row-header", k).each(function() {
                                    $("th:gt(" + e + ")", this).remove()
                                });
                                var l, m, n = -1,
                                    o = -1;
                                $("tr.jqg-second-row-header th", k).each(function() {
                                    return l = parseInt($(this).attr("colspan"), 10), m = parseInt($(this).attr("rowspan"), 10), m && (n++, o++), l && (n += l, o++), n === e ? !1 : void 0
                                }), n !== e && (o = e), $("tr.jqg-second-row-header", k).each(function() {
                                    $("th:gt(" + o + ")", this).remove()
                                })
                            } else $("tr", k).each(function() {
                                $("th:gt(" + e + ")", this).remove()
                            });
                            if ($(k).width(1), $(a.grid.fhDiv).append(k).mousemove(function(b) {
                                    return a.grid.resizing ? (a.grid.dragMove(b), !1) : void 0
                                }), a.p.footerrow) {
                                var p = $(".ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(a.p.id)).height();
                                a.grid.fsDiv = $('<div style="position:absolute;left:0px;top:' + (parseInt(i, 10) + parseInt(j, 10) + parseInt(p, 10) + 1) + 'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>'), $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fsDiv);
                                var q = $(".ui-jqgrid-ftable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr", q).each(function() {
                                    $("td:gt(" + e + ")", this).remove()
                                }), $(q).width(1), $(a.grid.fsDiv).append(q)
                            }
                            $(a).bind("jqGridResizeStop.setFrozenColumns", function(b, c, d) {
                                var e = $(".ui-jqgrid-htable", a.grid.fhDiv);
                                $("th:eq(" + d + ")", e).width(c);
                                var f = $(".ui-jqgrid-btable", a.grid.fbDiv);
                                if ($("tr:first td:eq(" + d + ")", f).width(c), a.p.footerrow) {
                                    var g = $(".ui-jqgrid-ftable", a.grid.fsDiv);
                                    $("tr:first td:eq(" + d + ")", g).width(c)
                                }
                            }), $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fbDiv), $(a.grid.fbDiv).bind("mousewheel DOMMouseScroll", function(b) {
                                var c = $(a.grid.bDiv).scrollTop();
                                b.originalEvent.wheelDelta > 0 || b.originalEvent.detail < 0 ? $(a.grid.bDiv).scrollTop(c - 25) : $(a.grid.bDiv).scrollTop(c + 25), b.preventDefault()
                            }), a.p.hoverrows === !0 && $("#" + $.jgrid.jqID(a.p.id)).unbind("mouseover").unbind("mouseout"), $(a).bind("jqGridAfterGridComplete.setFrozenColumns", function() {
                                $("#" + $.jgrid.jqID(a.p.id) + "_frozen").remove(), $(a.grid.fbDiv).height($(a.grid.bDiv).height() - 16);
                                var b = $("#" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr[role=row]", b).each(function() {
                                    $("td[role=gridcell]:gt(" + e + ")", this).remove()
                                }), $(b).width(1).attr("id", a.p.id + "_frozen"), $(a.grid.fbDiv).append(b), a.p.hoverrows === !0 && ($("tr.jqgrow", b).hover(function() {
                                    $(this).addClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).addClass(h)
                                }, function() {
                                    $(this).removeClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).removeClass(h)
                                }), $("tr.jqgrow", "#" + $.jgrid.jqID(a.p.id)).hover(function() {
                                    $(this).addClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").addClass(h)
                                }, function() {
                                    $(this).removeClass(h), $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").removeClass(h)
                                })), b = null
                            }), a.grid.hDiv.loading || $(a).triggerHandler("jqGridAfterGridComplete"), a.p.frozenColumns = !0
                        }
                    }
                }
            })
        },
        destroyFrozenColumns: function() {
            return this.each(function() {
                if (this.grid && this.p.frozenColumns === !0) {
                    var a = this,
                        b = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0);
                    if ($(a.grid.fhDiv).remove(), $(a.grid.fbDiv).remove(), a.grid.fhDiv = null, a.grid.fbDiv = null, a.p.footerrow && ($(a.grid.fsDiv).remove(), a.grid.fsDiv = null), $(this).unbind(".setFrozenColumns"), a.p.hoverrows === !0) {
                        var c;
                        $("#" + $.jgrid.jqID(a.p.id)).bind("mouseover", function(a) {
                            c = $(a.target).closest("tr.jqgrow"), "ui-subgrid" !== $(c).attr("class") && $(c).addClass(b)
                        }).bind("mouseout", function(a) {
                            c = $(a.target).closest("tr.jqgrow"), $(c).removeClass(b)
                        })
                    }
                    this.p.frozenColumns = !1
                }
            })
        },
        resizeColumn: function(a, b) {
            return this.each(function() {
                var c, d, e, f = this.grid,
                    g = this.p,
                    h = g.colModel,
                    i = h.length;
                if ("string" == typeof a) {
                    for (c = 0; i > c; c++)
                        if (h[c].name === a) {
                            a = c;
                            break
                        }
                } else a = parseInt(a, 10);
                if (b = parseInt(b, 10), !("number" != typeof a || 0 > a || a > h.length - 1 || "number" != typeof b || b < g.minColWidth)) {
                    if (g.forceFit)
                        for (g.nv = 0, c = a + 1; i > c; c++)
                            if (h[c].hidden !== !0) {
                                g.nv = c - a;
                                break
                            }
                    if (f.resizing = {
                            idx: a
                        }, d = b - f.headers[a].width, g.forceFit) {
                        if (e = f.headers[a + g.nv].width - d, e < g.minColWidth) return;
                        f.headers[a + g.nv].newWidth = f.headers[a + g.nv].width - d
                    }
                    f.newWidth = g.tblwidth + d, f.headers[a].newWidth = b, f.dragEnd(!1)
                }
            })
        },
        getStyleUI: function(a, b, c, d) {
            try {
                var e = "",
                    f = a.split("."),
                    g = "";
                switch (c || (e = "class=", g = '"'), null == d && (d = ""), f.length) {
                    case 1:
                        e += g + d + " " + $.jgrid.styleUI[f[0]][b] + g;
                        break;
                    case 2:
                        e += g + d + " " + $.jgrid.styleUI[f[0]][f[1]][b] + g
                }
            } catch (h) {
                e = ""
            }
            return $.trim(e)
        }
    })
}(jQuery);
! function(a) {
    "use strict";
    a.extend(a.jgrid, {
        showModal: function(a) {
            a.w.show()
        },
        closeModal: function(a) {
            a.w.hide().attr("aria-hidden", "true"), a.o && a.o.remove()
        },
        hideModal: function(b, c) {
            c = a.extend({
                jqm: !0,
                gb: "",
                removemodal: !1,
                formprop: !1,
                form: ""
            }, c || {});
            var d = c.gb && "string" == typeof c.gb && "#gbox_" === c.gb.substr(0, 6) ? a("#" + c.gb.substr(6))[0] : !1;
            if (c.onClose) {
                var e = d ? c.onClose.call(d, b) : c.onClose(b);
                if ("boolean" == typeof e && !e) return
            }
            if (c.formprop && d && c.form) {
                var f = a(b)[0].style.height,
                    g = a(b)[0].style.width;
                f.indexOf("px") > -1 && (f = parseFloat(f)), g.indexOf("px") > -1 && (g = parseFloat(g));
                var h, i;
                "edit" === c.form ? (h = "#" + a.jgrid.jqID("FrmGrid_" + c.gb.substr(6)), i = "formProp") : "view" === c.form && (h = "#" + a.jgrid.jqID("ViewGrid_" + c.gb.substr(6)), i = "viewProp"), a(d).data(i, {
                    top: parseFloat(a(b).css("top")),
                    left: parseFloat(a(b).css("left")),
                    width: g,
                    height: f,
                    dataheight: a(h).height(),
                    datawidth: a(h).width()
                })
            }
            if (a.fn.jqm && c.jqm === !0) a(b).attr("aria-hidden", "true").jqmHide();
            else {
                if ("" !== c.gb) try {
                    a(".jqgrid-overlay:first", c.gb).hide()
                } catch (j) {}
                a(b).hide().attr("aria-hidden", "true")
            }
            c.removemodal && a(b).remove()
        },
        findPos: function(a) {
            var b = 0,
                c = 0;
            if (a.offsetParent)
                do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
            return [b, c]
        },
        createModal: function(b, c, d, e, f, g, h) {
            d = a.extend(!0, {}, a.jgrid.jqModal || {}, d);
            var i, j = this,
                i = "rtl" === a(d.gbox).attr("dir") ? !0 : !1,
                k = a.jgrid.styleUI[d.styleUI || "jQueryUI"].modal,
                l = a.jgrid.styleUI[d.styleUI || "jQueryUI"].common,
                m = document.createElement("div"),
                j = this;
            h = a.extend({}, h || {}), i = "rtl" === a(d.gbox).attr("dir") ? !0 : !1, m.className = "ui-jqdialog " + k.modal, m.id = b.themodal;
            var n = document.createElement("div");
            n.className = "ui-jqdialog-titlebar " + k.header, n.id = b.modalhead, a(n).append("<span class='ui-jqdialog-title'>" + d.caption + "</span>");
            var o = a("<a class='ui-jqdialog-titlebar-close " + l.cornerall + "'></a>").hover(function() {
                o.addClass(l.hover)
            }, function() {
                o.removeClass(l.hover)
            }).append("<span class='" + l.icon_base + " " + k.icon_close + "'></span>");
            a(n).append(o), i ? (m.dir = "rtl", a(".ui-jqdialog-title", n).css("float", "right"), a(".ui-jqdialog-titlebar-close", n).css("left", "0.3em")) : (m.dir = "ltr", a(".ui-jqdialog-title", n).css("float", "left"), a(".ui-jqdialog-titlebar-close", n).css("right", "0.3em"));
            var p = document.createElement("div");
            a(p).addClass("ui-jqdialog-content " + k.content).attr("id", b.modalcontent), a(p).append(c), m.appendChild(p), a(m).prepend(n), g === !0 ? a("body").append(m) : "string" == typeof g ? a(g).append(m) : a(m).insertBefore(e), a(m).css(h), void 0 === d.jqModal && (d.jqModal = !0);
            var q = {};
            if (a.fn.jqm && d.jqModal === !0) {
                if (0 === d.left && 0 === d.top && d.overlay) {
                    var r = [];
                    r = a.jgrid.findPos(f), d.left = r[0] + 4, d.top = r[1] + 4
                }
                q.top = d.top + "px", q.left = d.left
            } else(0 !== d.left || 0 !== d.top) && (q.left = d.left, q.top = d.top + "px");
            if (a("a.ui-jqdialog-titlebar-close", n).click(function() {
                    var c = a("#" + a.jgrid.jqID(b.themodal)).data("onClose") || d.onClose,
                        e = a("#" + a.jgrid.jqID(b.themodal)).data("gbox") || d.gbox;
                    return j.hideModal("#" + a.jgrid.jqID(b.themodal), {
                        gb: e,
                        jqm: d.jqModal,
                        onClose: c,
                        removemodal: d.removemodal || !1,
                        formprop: !d.recreateForm || !1,
                        form: d.form || ""
                    }), !1
                }), 0 !== d.width && d.width || (d.width = 300), 0 !== d.height && d.height || (d.height = 200), !d.zIndex) {
                var s = a(e).parents("*[role=dialog]").filter(":first").css("z-index");
                s ? d.zIndex = parseInt(s, 10) + 2 : d.zIndex = 950
            }
            var t = 0;
            if (i && q.left && !g && (t = a(d.gbox).width() - (isNaN(d.width) ? 0 : parseInt(d.width, 10)) - 8, q.left = parseInt(q.left, 10) + parseInt(t, 10)), q.left && (q.left += "px"), a(m).css(a.extend({
                    width: isNaN(d.width) ? "auto" : d.width + "px",
                    height: isNaN(d.height) ? "auto" : d.height + "px",
                    zIndex: d.zIndex,
                    overflow: "hidden"
                }, q)).attr({
                    tabIndex: "-1",
                    role: "dialog",
                    "aria-labelledby": b.modalhead,
                    "aria-hidden": "true"
                }), void 0 === d.drag && (d.drag = !0), void 0 === d.resize && (d.resize = !0), d.drag)
                if (a(n).css("cursor", "move"), a.fn.jqDrag) a(m).jqDrag(n);
                else try {
                    a(m).draggable({
                        handle: a("#" + a.jgrid.jqID(n.id))
                    })
                } catch (u) {}
                if (d.resize)
                    if (a.fn.jqResize) a(m).append("<div class='jqResize " + k.resizable + " " + l.icon_base + " " + k.icon_resizable + "'></div>"), a("#" + a.jgrid.jqID(b.themodal)).jqResize(".jqResize", b.scrollelm ? "#" + a.jgrid.jqID(b.scrollelm) : !1);
                    else try {
                        a(m).resizable({
                            handles: "se, sw",
                            alsoResize: b.scrollelm ? "#" + a.jgrid.jqID(b.scrollelm) : !1
                        })
                    } catch (v) {}
                    d.closeOnEscape === !0 && a(m).keydown(function(c) {
                if (27 === c.which) {
                    var e = a("#" + a.jgrid.jqID(b.themodal)).data("onClose") || d.onClose;
                    j.hideModal("#" + a.jgrid.jqID(b.themodal), {
                        gb: d.gbox,
                        jqm: d.jqModal,
                        onClose: e,
                        removemodal: d.removemodal || !1,
                        formprop: !d.recreateForm || !1,
                        form: d.form || ""
                    })
                }
            })
        },
        viewModal: function(b, c) {
            if (c = a.extend({
                    toTop: !0,
                    overlay: 10,
                    modal: !1,
                    overlayClass: "ui-widget-overlay",
                    onShow: a.jgrid.showModal,
                    onHide: a.jgrid.closeModal,
                    gbox: "",
                    jqm: !0,
                    jqM: !0
                }, c || {}), void 0 === c.focusField && (c.focusField = 0), "number" == typeof c.focusField && c.focusField >= 0 && (c.focusField = parseInt(c.focusField, 10)), "boolean" != typeof c.focusField || c.focusField ? c.focusField = 0 : c.focusField = !1, a.fn.jqm && c.jqm === !0) c.jqM ? a(b).attr("aria-hidden", "false").jqm(c).jqmShow() : a(b).attr("aria-hidden", "false").jqmShow();
            else if ("" !== c.gbox && (a(".jqgrid-overlay:first", c.gbox).show(), a(b).data("gbox", c.gbox)), a(b).show().attr("aria-hidden", "false"), c.focusField >= 0) try {
                a(":input:visible", b)[parseInt(c.focusField, 10)].focus()
            } catch (d) {}
        },
        info_dialog: function(b, c, d, e) {
            var f = {
                width: 290,
                height: "auto",
                dataheight: "auto",
                drag: !0,
                resize: !1,
                left: 250,
                top: 170,
                zIndex: 1e3,
                jqModal: !0,
                modal: !1,
                closeOnEscape: !0,
                align: "center",
                buttonalign: "center",
                buttons: []
            };
            a.extend(!0, f, a.jgrid.jqModal || {}, {
                caption: "<b>" + b + "</b>"
            }, e || {});
            var g = f.jqModal,
                h = this,
                i = a.jgrid.styleUI[f.styleUI || "jQueryUI"].modal,
                j = a.jgrid.styleUI[f.styleUI || "jQueryUI"].common;
            a.fn.jqm && !g && (g = !1);
            var k, l = "";
            if (f.buttons.length > 0)
                for (k = 0; k < f.buttons.length; k++) void 0 === f.buttons[k].id && (f.buttons[k].id = "info_button_" + k), l += "<a id='" + f.buttons[k].id + "' class='fm-button " + j.button + "'>" + f.buttons[k].text + "</a>";
            var m = isNaN(f.dataheight) ? f.dataheight : f.dataheight + "px",
                n = "text-align:" + f.align + ";",
                o = "<div id='info_id'>";
            o += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + m + ";" + n + "'>" + c + "</div>", o += d ? "<div class='" + i.header + "' style='text-align:" + f.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button " + j.button + "'>" + d + "</a>" + l + "</div>" : "" !== l ? "<div class='" + i.header + "' style='text-align:" + f.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + l + "</div>" : "", o += "</div>";
            try {
                "false" === a("#info_dialog").attr("aria-hidden") && a.jgrid.hideModal("#info_dialog", {
                    jqm: g
                }), a("#info_dialog").remove()
            } catch (p) {}
            a.jgrid.createModal({
                themodal: "info_dialog",
                modalhead: "info_head",
                modalcontent: "info_content",
                scrollelm: "infocnt"
            }, o, f, "", "", !0), l && a.each(f.buttons, function(b) {
                a("#" + a.jgrid.jqID(this.id), "#info_id").bind("click", function() {
                    return f.buttons[b].onClick.call(a("#info_dialog")), !1
                })
            }), a("#closedialog", "#info_id").click(function() {
                return h.hideModal("#info_dialog", {
                    jqm: g,
                    onClose: a("#info_dialog").data("onClose") || f.onClose,
                    gb: a("#info_dialog").data("gbox") || f.gbox
                }), !1
            }), a(".fm-button", "#info_dialog").hover(function() {
                a(this).addClass(j.hover)
            }, function() {
                a(this).removeClass(j.hover)
            }), a.isFunction(f.beforeOpen) && f.beforeOpen(), a.jgrid.viewModal("#info_dialog", {
                onHide: function(a) {
                    a.w.hide().remove(), a.o && a.o.remove()
                },
                modal: f.modal,
                jqm: g
            }), a.isFunction(f.afterOpen) && f.afterOpen();
            try {
                a("#info_dialog").focus()
            } catch (q) {}
        },
        bindEv: function(b, c) {
            var d = this;
            a.isFunction(c.dataInit) && c.dataInit.call(d, b, c), c.dataEvents && a.each(c.dataEvents, function() {
                void 0 !== this.data ? a(b).bind(this.type, this.data, this.fn) : a(b).bind(this.type, this.fn)
            })
        },
        createEl: function(b, c, d, e, f) {
            function g(b, c, d) {
                var e = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value", "oper"];
                void 0 !== d && a.isArray(d) && a.merge(e, d), a.each(c, function(c, d) {
                    -1 === a.inArray(c, e) && a(b).attr(c, d)
                }), c.hasOwnProperty("id") || a(b).attr("id", a.jgrid.randId())
            }
            var h = "",
                i = this;
            switch (b) {
                case "textarea":
                    h = document.createElement("textarea"), e ? c.cols || a(h).css({
                        width: "98%"
                    }) : c.cols || (c.cols = 20), c.rows || (c.rows = 2), ("&nbsp;" === d || "&#160;" === d || 1 === d.length && 160 === d.charCodeAt(0)) && (d = ""), h.value = d, g(h, c), a(h).attr({
                        role: "textbox",
                        multiline: "true"
                    });
                    break;
                case "checkbox":
                    if (h = document.createElement("input"), h.type = "checkbox", c.value) {
                        var j = c.value.split(":");
                        d === j[0] && (h.checked = !0, h.defaultChecked = !0), h.value = j[0], a(h).attr("offval", j[1])
                    } else {
                        var k = (d + "").toLowerCase();
                        k.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== k ? (h.checked = !0, h.defaultChecked = !0, h.value = d) : h.value = "on", a(h).attr("offval", "off")
                    }
                    g(h, c, ["value"]), a(h).attr("role", "checkbox");
                    break;
                case "select":
                    h = document.createElement("select"), h.setAttribute("role", "select");
                    var l, m = [];
                    if (c.multiple === !0 ? (l = !0, h.multiple = "multiple", a(h).attr("aria-multiselectable", "true")) : l = !1, null != c.dataUrl) {
                        var n = null,
                            o = c.postData || f.postData;
                        try {
                            n = c.rowId
                        } catch (p) {}
                        i.p && i.p.idPrefix && (n = a.jgrid.stripPref(i.p.idPrefix, n)), a.ajax(a.extend({
                            url: a.isFunction(c.dataUrl) ? c.dataUrl.call(i, n, d, String(c.name)) : c.dataUrl,
                            type: "GET",
                            dataType: "html",
                            data: a.isFunction(o) ? o.call(i, n, d, String(c.name)) : o,
                            context: {
                                elem: h,
                                options: c,
                                vl: d
                            },
                            success: function(b) {
                                var c, d, e = [],
                                    f = this.elem,
                                    d = this.vl,
                                    h = a.extend({}, this.options),
                                    j = h.multiple === !0,
                                    k = h.cacheUrlData === !0,
                                    l = "",
                                    m = a.isFunction(h.buildSelect) ? h.buildSelect.call(i, b) : b;
                                "string" == typeof m && (m = a(a.trim(m)).html()), m && (a(f).append(m), g(f, h, o ? ["postData"] : void 0), void 0 === h.size && (h.size = j ? 3 : 1), j ? (e = d.split(","), e = a.map(e, function(b) {
                                    return a.trim(b)
                                })) : e[0] = a.trim(d), setTimeout(function() {
                                    if (a("option", f).each(function(b) {
                                            c = a(this).text(), d = a(this).val() || c, k && (l += (0 !== b ? ";" : "") + d + ":" + c), 0 === b && f.multiple && (this.selected = !1), a(this).attr("role", "option"), (a.inArray(a.trim(c), e) > -1 || a.inArray(a.trim(d), e) > -1) && (this.selected = "selected")
                                        }), k)
                                        if ("edit" === h.oper) a(i).jqGrid("setColProp", h.name, {
                                            editoptions: {
                                                buildSelect: null,
                                                dataUrl: null,
                                                value: l
                                            }
                                        });
                                        else if ("search" === h.oper) a(i).jqGrid("setColProp", h.name, {
                                        searchoptions: {
                                            dataUrl: null,
                                            value: l
                                        }
                                    });
                                    else if ("filter" === h.oper && a("#fbox_" + i.p.id)[0].p) {
                                        var b, g = a("#fbox_" + i.p.id)[0].p.columns;
                                        a.each(g, function(a) {
                                            return b = this.index || this.name, h.name === b ? (this.searchoptions.dataUrl = null, this.searchoptions.value = l, !1) : void 0
                                        })
                                    }
                                    a(i).triggerHandler("jqGridAddEditAfterSelectUrlComplete", [f])
                                }, 0))
                            }
                        }, f || {}))
                    } else if (c.value) {
                        var q;
                        void 0 === c.size && (c.size = l ? 3 : 1), l && (m = d.split(","), m = a.map(m, function(b) {
                            return a.trim(b)
                        })), "function" == typeof c.value && (c.value = c.value());
                        var r, s, t, u = void 0 === c.separator ? ":" : c.separator,
                            v = void 0 === c.delimiter ? ";" : c.delimiter;
                        if ("string" == typeof c.value)
                            for (r = c.value.split(v), q = 0; q < r.length; q++) s = r[q].split(u), s.length > 2 && (s[1] = a.map(s, function(a, b) {
                                return b > 0 ? a : void 0
                            }).join(u)), t = document.createElement("option"), t.setAttribute("role", "option"), t.value = s[0], t.innerHTML = s[1], h.appendChild(t), l || a.trim(s[0]) !== a.trim(d) && a.trim(s[1]) !== a.trim(d) || (t.selected = "selected"), l && (a.inArray(a.trim(s[1]), m) > -1 || a.inArray(a.trim(s[0]), m) > -1) && (t.selected = "selected");
                        else if ("[object Array]" === Object.prototype.toString.call(c.value)) {
                            for (var w = c.value, q = 0; q < w.length; q++)
                                if (2 === w[q].length) {
                                    var x = w[q][0],
                                        y = w[q][1];
                                    t = document.createElement("option"), t.setAttribute("role", "option"), t.value = x, t.innerHTML = y, h.appendChild(t), l || a.trim(x) !== a.trim(d) && a.trim(y) !== a.trim(d) || (t.selected = "selected"), l && (a.inArray(a.trim(y), m) > -1 || a.inArray(a.trim(x), m) > -1) && (t.selected = "selected")
                                }
                        } else if ("object" == typeof c.value) {
                            var x, w = c.value;
                            for (x in w) w.hasOwnProperty(x) && (t = document.createElement("option"), t.setAttribute("role", "option"), t.value = x, t.innerHTML = w[x], h.appendChild(t), l || a.trim(x) !== a.trim(d) && a.trim(w[x]) !== a.trim(d) || (t.selected = "selected"), l && (a.inArray(a.trim(w[x]), m) > -1 || a.inArray(a.trim(x), m) > -1) && (t.selected = "selected"))
                        }
                        g(h, c, ["value"])
                    }
                    break;
                case "image":
                case "file":
                    h = document.createElement("input"), h.type = b, g(h, c);
                    break;
                case "custom":
                    h = document.createElement("span");
                    try {
                        if (!a.isFunction(c.custom_element)) throw "e1";
                        var z = c.custom_element.call(i, d, c);
                        if (!z) throw "e2";
                        z = a(z).addClass("customelement").attr({
                            id: c.id,
                            name: c.name
                        }), a(h).empty().append(z)
                    } catch (p) {
                        var A = a.jgrid.getRegional(i, "errors"),
                            B = a.jgrid.getRegional(i, "edit");
                        "e1" === p ? a.jgrid.info_dialog(A.errcap, "function 'custom_element' " + B.msg.nodefined, B.bClose, {
                            styleUI: i.p.styleUI
                        }) : "e2" === p ? a.jgrid.info_dialog(A.errcap, "function 'custom_element' " + B.msg.novalue, B.bClose, {
                            styleUI: i.p.styleUI
                        }) : a.jgrid.info_dialog(A.errcap, "string" == typeof p ? p : p.message, B.bClose, {
                            styleUI: i.p.styleUI
                        })
                    }
                    break;
                default:
                    var C;
                    C = "button" === b ? "button" : "textbox", h = document.createElement("input"), h.type = b, h.value = d, g(h, c), "button" !== b && (e ? c.size || a(h).css({
                        width: "96%"
                    }) : c.size || (c.size = 20)), a(h).attr("role", C)
            }
            return h
        },
        checkDate: function(a, b) {
            var c, d = function(a) {
                    return a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? 28 : 29
                },
                e = {};
            if (a = a.toLowerCase(), c = -1 !== a.indexOf("/") ? "/" : -1 !== a.indexOf("-") ? "-" : -1 !== a.indexOf(".") ? "." : "/", a = a.split(c), b = b.split(c), 3 !== b.length) return !1;
            var f, g, h = -1,
                i = -1,
                j = -1;
            for (g = 0; g < a.length; g++) {
                var k = isNaN(b[g]) ? 0 : parseInt(b[g], 10);
                e[a[g]] = k, f = a[g], -1 !== f.indexOf("y") && (h = g), -1 !== f.indexOf("m") && (j = g), -1 !== f.indexOf("d") && (i = g)
            }
            f = "y" === a[h] || "yyyy" === a[h] ? 4 : "yy" === a[h] ? 2 : -1;
            var l, m = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return -1 === h ? !1 : (l = e[a[h]].toString(), 2 === f && 1 === l.length && (f = 1), l.length !== f || 0 === e[a[h]] && "00" !== b[h] ? !1 : -1 === j ? !1 : (l = e[a[j]].toString(), l.length < 1 || e[a[j]] < 1 || e[a[j]] > 12 ? !1 : -1 === i ? !1 : (l = e[a[i]].toString(), l.length < 1 || e[a[i]] < 1 || e[a[i]] > 31 || 2 === e[a[j]] && e[a[i]] > d(e[a[h]]) || e[a[i]] > m[e[a[j]]] ? !1 : !0)))
        },
        isEmpty: function(a) {
            return a.match(/^\s+$/) || "" === a ? !0 : !1
        },
        checkTime: function(b) {
            var c, d = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/;
            if (!a.jgrid.isEmpty(b)) {
                if (c = b.match(d), !c) return !1;
                if (c[3]) {
                    if (c[1] < 1 || c[1] > 12) return !1
                } else if (c[1] > 23) return !1;
                if (c[2] > 59) return !1
            }
            return !0
        },
        checkValues: function(b, c, d, e) {
            var f, g, h, i, j, k, l = this,
                m = l.p.colModel,
                n = a.jgrid.getRegional(this, "edit.msg");
            if (void 0 === d)
                if ("string" == typeof c) {
                    for (g = 0, j = m.length; j > g; g++)
                        if (m[g].name === c) {
                            f = m[g].editrules, c = g, null != m[g].formoptions && (h = m[g].formoptions.label);
                            break
                        }
                } else c >= 0 && (f = m[c].editrules);
            else f = d, h = void 0 === e ? "_" : e;
            if (f) {
                if (h || (h = null != l.p.colNames ? l.p.colNames[c] : m[c].label), f.required === !0 && a.jgrid.isEmpty(b)) return [!1, h + ": " + n.required, ""];
                var o = f.required === !1 ? !1 : !0;
                if (f.number === !0 && (o !== !1 || !a.jgrid.isEmpty(b)) && isNaN(b)) return [!1, h + ": " + n.number, ""];
                if (void 0 !== f.minValue && !isNaN(f.minValue) && parseFloat(b) < parseFloat(f.minValue)) return [!1, h + ": " + n.minValue + " " + f.minValue, ""];
                if (void 0 !== f.maxValue && !isNaN(f.maxValue) && parseFloat(b) > parseFloat(f.maxValue)) return [!1, h + ": " + n.maxValue + " " + f.maxValue, ""];
                var p;
                if (f.email === !0 && !(o === !1 && a.jgrid.isEmpty(b) || (p = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, p.test(b)))) return [!1, h + ": " + n.email, ""];
                if (f.integer === !0 && (o !== !1 || !a.jgrid.isEmpty(b))) {
                    if (isNaN(b)) return [!1, h + ": " + n.integer, ""];
                    if (b % 1 !== 0 || -1 !== b.indexOf(".")) return [!1, h + ": " + n.integer, ""]
                }
                if (f.date === !0 && !(o === !1 && a.jgrid.isEmpty(b) || (m[c].formatoptions && m[c].formatoptions.newformat ? (i = m[c].formatoptions.newformat, k = a.jgrid.getRegional(l, "formatter.date.masks"), k && k.hasOwnProperty(i) && (i = k[i])) : i = m[c].datefmt || "Y-m-d", a.jgrid.checkDate(i, b)))) return [!1, h + ": " + n.date + " - " + i, ""];
                if (f.time === !0 && !(o === !1 && a.jgrid.isEmpty(b) || a.jgrid.checkTime(b))) return [!1, h + ": " + n.date + " - hh:mm (am/pm)", ""];
                if (f.url === !0 && !(o === !1 && a.jgrid.isEmpty(b) || (p = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i, p.test(b)))) return [!1, h + ": " + n.url, ""];
                if (f.custom === !0 && (o !== !1 || !a.jgrid.isEmpty(b))) {
                    if (a.isFunction(f.custom_func)) {
                        var q = f.custom_func.call(l, b, h, c);
                        return a.isArray(q) ? q : [!1, n.customarray, ""]
                    }
                    return [!1, n.customfcheck, ""]
                }
            }
            return [!0, "", ""]
        }
    })
}(jQuery);
! function(a) {
    "use strict";
    a.fn.jqFilter = function(b) {
        if ("string" == typeof b) {
            var c = a.fn.jqFilter[b];
            if (!c) throw "jqFilter - No such method: " + b;
            var d = a.makeArray(arguments).slice(1);
            return c.apply(this, d)
        }
        var e = a.extend(!0, {
            filter: null,
            columns: [],
            sortStrategy: null,
            onChange: null,
            afterRedraw: null,
            checkValues: null,
            error: !1,
            errmsg: "",
            errorcheck: !0,
            showQuery: !0,
            sopt: null,
            ops: [],
            operands: null,
            numopts: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
            stropts: ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
            strarr: ["text", "string", "blob"],
            groupOps: [{
                op: "AND",
                text: "AND"
            }, {
                op: "OR",
                text: "OR"
            }],
            groupButton: !0,
            ruleButtons: !0,
            direction: "ltr"
        }, a.jgrid.filter, b || {});
        return this.each(function() {
            if (!this.filter) {
                this.p = e, (null === this.p.filter || void 0 === this.p.filter) && (this.p.filter = {
                    groupOp: this.p.groupOps[0].op,
                    rules: [],
                    groups: []
                }), null != this.p.sortStrategy && a.isFunction(this.p.sortStrategy) && this.p.columns.sort(this.p.sortStrategy);
                var b, c, d = this.p.columns.length,
                    f = /msie/i.test(navigator.userAgent) && !window.opera;
                if (this.p.initFilter = a.extend(!0, {}, this.p.filter), d) {
                    for (b = 0; d > b; b++) c = this.p.columns[b], c.stype ? c.inputtype = c.stype : c.inputtype || (c.inputtype = "text"), c.sorttype ? c.searchtype = c.sorttype : c.searchtype || (c.searchtype = "string"), void 0 === c.hidden && (c.hidden = !1), c.label || (c.label = c.name), c.index && (c.name = c.index), c.hasOwnProperty("searchoptions") || (c.searchoptions = {}), c.hasOwnProperty("searchrules") || (c.searchrules = {});
                    var g = function() {
                            return a("#" + a.jgrid.jqID(e.id))[0] || null
                        },
                        h = g(),
                        i = a.jgrid.styleUI[h.p.styleUI || "jQueryUI"].filter,
                        j = a.jgrid.styleUI[h.p.styleUI || "jQueryUI"].common;
                    this.p.showQuery && a(this).append("<table class='queryresult " + i.table_widget + "' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
                    var k = function(b, c) {
                        var d = [!0, ""],
                            f = g();
                        if (a.isFunction(c.searchrules)) d = c.searchrules.call(f, b, c);
                        else if (a.jgrid && a.jgrid.checkValues) try {
                            d = a.jgrid.checkValues.call(f, b, -1, c.searchrules, c.label)
                        } catch (h) {}
                        d && d.length && d[0] === !1 && (e.error = !d[0], e.errmsg = d[1])
                    };
                    this.onchange = function() {
                        return this.p.error = !1, this.p.errmsg = "", a.isFunction(this.p.onChange) ? this.p.onChange.call(this, this.p) : !1
                    }, this.reDraw = function() {
                        a("table.group:first", this).remove();
                        var b = this.createTableForGroup(e.filter, null);
                        a(this).append(b), a.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p)
                    }, this.createTableForGroup = function(b, c) {
                        var d, f = this,
                            g = a("<table class='group " + i.table_widget + " ui-search-table' style='border:0px none;'><tbody></tbody></table>"),
                            h = "left";
                        "rtl" === this.p.direction && (h = "right", g.attr("dir", "rtl")), null === c && g.append("<tr class='error' style='display:none;'><th colspan='5' class='" + j.error + "' align='" + h + "'></th></tr>");
                        var k = a("<tr></tr>");
                        g.append(k);
                        var l = a("<th colspan='5' align='" + h + "'></th>");
                        if (k.append(l), this.p.ruleButtons === !0) {
                            var m = a("<select class='opsel " + i.srSelect + "'></select>");
                            l.append(m);
                            var n, o = "";
                            for (d = 0; d < e.groupOps.length; d++) n = b.groupOp === f.p.groupOps[d].op ? " selected='selected'" : "", o += "<option value='" + f.p.groupOps[d].op + "'" + n + ">" + f.p.groupOps[d].text + "</option>";
                            m.append(o).bind("change", function() {
                                b.groupOp = a(m).val(), f.onchange()
                            })
                        }
                        var p = "<span></span>";
                        if (this.p.groupButton && (p = a("<input type='button' value='+ {}' title='Add subgroup' class='add-group ui-mini" + j.button + "'/>"), p.bind("click", function() {
                                return void 0 === b.groups && (b.groups = []), b.groups.push({
                                    groupOp: e.groupOps[0].op,
                                    rules: [],
                                    groups: []
                                }), f.reDraw(), f.onchange(), !1
                            })), l.append(p), this.p.ruleButtons === !0) {
                            var q, r = a("<input type='button' value='+' title='Add rule' class='add-rule ui-add ui-mini" + j.button + "'/>");
                            r.bind("click", function() {
                                for (void 0 === b.rules && (b.rules = []), d = 0; d < f.p.columns.length; d++) {
                                    var c = void 0 === f.p.columns[d].search ? !0 : f.p.columns[d].search,
                                        e = f.p.columns[d].hidden === !0,
                                        g = f.p.columns[d].searchoptions.searchhidden === !0;
                                    if (g && c || c && !e) {
                                        q = f.p.columns[d];
                                        break
                                    }
                                }
                                var h;
                                return h = q.searchoptions.sopt ? q.searchoptions.sopt : f.p.sopt ? f.p.sopt : -1 !== a.inArray(q.searchtype, f.p.strarr) ? f.p.stropts : f.p.numopts, b.rules.push({
                                    field: q.name,
                                    op: h[0],
                                    data: ""
                                }), f.reDraw(), !1
                            }), l.append(r)
                        }
                        if (null !== c) {
                            var s = a("<input type='button' value='-' title='Delete group' class='delete-group ui-mini " + j.button + "'/>");
                            l.append(s), s.bind("click", function() {
                                for (d = 0; d < c.groups.length; d++)
                                    if (c.groups[d] === b) {
                                        c.groups.splice(d, 1);
                                        break
                                    }
                                return f.reDraw(), f.onchange(), !1
                            })
                        }
                        if (void 0 !== b.groups)
                            for (d = 0; d < b.groups.length; d++) {
                                var t = a("<tr></tr>");
                                g.append(t);
                                var u = a("<td class='first'></td>");
                                t.append(u);
                                var v = a("<td colspan='4'></td>");
                                v.append(this.createTableForGroup(b.groups[d], b)), t.append(v)
                            }
                        if (void 0 === b.groupOp && (b.groupOp = f.p.groupOps[0].op), void 0 !== b.rules)
                            for (d = 0; d < b.rules.length; d++) g.append(this.createTableRowForRule(b.rules[d], b));
                        return g
                    }, this.createTableRowForRule = function(b, c) {
                        var d, h, k, l, m, n = this,
                            o = g(),
                            p = a("<tr></tr>"),
                            q = "";
                        p.append("<td class='first'></td>");
                        var r = a("<td class='columns'></td>");
                        p.append(r);
                        var s, t = a("<select class='" + i.srSelect + "'></select>"),
                            u = [];
                        r.append(t), t.bind("change", function() {
                            for (b.field = a(t).val(), k = a(this).parents("tr:first"), a(".data", k).empty(), d = 0; d < n.p.columns.length; d++)
                                if (n.p.columns[d].name === b.field) {
                                    l = n.p.columns[d];
                                    break
                                }
                            if (l) {
                                l.searchoptions.id = a.jgrid.randId(), l.searchoptions.name = b.field, l.searchoptions.oper = "filter", f && "text" === l.inputtype && (l.searchoptions.size || (l.searchoptions.size = 10));
                                var c = a.jgrid.createEl.call(o, l.inputtype, l.searchoptions, "", !0, n.p.ajaxSelectOptions || {}, !0);
                                a(c).addClass("input-elm " + i.srInput), h = l.searchoptions.sopt ? l.searchoptions.sopt : n.p.sopt ? n.p.sopt : -1 !== a.inArray(l.searchtype, n.p.strarr) ? n.p.stropts : n.p.numopts;
                                var e = "",
                                    g = 0;
                                for (u = [], a.each(n.p.ops, function() {
                                        u.push(this.oper)
                                    }), d = 0; d < h.length; d++) s = a.inArray(h[d], u), -1 !== s && (0 === g && (b.op = n.p.ops[s].oper), e += "<option value='" + n.p.ops[s].oper + "'>" + n.p.ops[s].text + "</option>", g++);
                                if (a(".selectopts", k).empty().append(e), a(".selectopts", k)[0].selectedIndex = 0, a.jgrid.msie && a.jgrid.msiever() < 9) {
                                    var j = parseInt(a("select.selectopts", k)[0].offsetWidth, 10) + 1;
                                    a(".selectopts", k).width(j), a(".selectopts", k).css("width", "auto")
                                }
                                a(".data", k).append(c), a.jgrid.bindEv.call(o, c, l.searchoptions), a(".input-elm", k).bind("change", function(c) {
                                    var d = c.target;
                                    b.data = "SPAN" === d.nodeName.toUpperCase() && l.searchoptions && a.isFunction(l.searchoptions.custom_value) ? l.searchoptions.custom_value.call(o, a(d).children(".customelement:first"), "get") : d.value, n.onchange()
                                }), setTimeout(function() {
                                    b.data = a(c).val(), n.onchange()
                                }, 0)
                            }
                        });
                        var v = 0;
                        for (d = 0; d < n.p.columns.length; d++) {
                            var w = void 0 === n.p.columns[d].search ? !0 : n.p.columns[d].search,
                                x = n.p.columns[d].hidden === !0,
                                y = n.p.columns[d].searchoptions.searchhidden === !0;
                            (y && w || w && !x) && (m = "", b.field === n.p.columns[d].name && (m = " selected='selected'", v = d), q += "<option value='" + n.p.columns[d].name + "'" + m + ">" + n.p.columns[d].label + "</option>")
                        }
                        t.append(q);
                        var z = a("<td class='operators'></td>");
                        p.append(z), l = e.columns[v], l.searchoptions.id = a.jgrid.randId(), f && "text" === l.inputtype && (l.searchoptions.size || (l.searchoptions.size = 10)), l.searchoptions.name = b.field, l.searchoptions.oper = "filter";
                        var A = a.jgrid.createEl.call(o, l.inputtype, l.searchoptions, b.data, !0, n.p.ajaxSelectOptions || {}, !0);
                        ("nu" === b.op || "nn" === b.op) && (a(A).attr("readonly", "true"), a(A).attr("disabled", "true"));
                        var B = a("<select class='selectopts " + i.srSelect + "'></select>");
                        for (z.append(B), B.bind("change", function() {
                                b.op = a(B).val(), k = a(this).parents("tr:first");
                                var c = a(".input-elm", k)[0];
                                "nu" === b.op || "nn" === b.op ? (b.data = "", "SELECT" !== c.tagName.toUpperCase() && (c.value = ""), c.setAttribute("readonly", "true"), c.setAttribute("disabled", "true")) : ("SELECT" === c.tagName.toUpperCase() && (b.data = c.value), c.removeAttribute("readonly"), c.removeAttribute("disabled")), n.onchange()
                            }), h = l.searchoptions.sopt ? l.searchoptions.sopt : n.p.sopt ? n.p.sopt : -1 !== a.inArray(l.searchtype, n.p.strarr) ? n.p.stropts : n.p.numopts, q = "", a.each(n.p.ops, function() {
                                u.push(this.oper)
                            }), d = 0; d < h.length; d++) s = a.inArray(h[d], u), -1 !== s && (m = b.op === n.p.ops[s].oper ? " selected='selected'" : "", q += "<option value='" + n.p.ops[s].oper + "'" + m + ">" + n.p.ops[s].text + "</option>");
                        B.append(q);
                        var C = a("<td class='data'></td>");
                        p.append(C), C.append(A), a.jgrid.bindEv.call(o, A, l.searchoptions), a(A).addClass("input-elm " + i.srInput).bind("change", function() {
                            b.data = "custom" === l.inputtype ? l.searchoptions.custom_value.call(o, a(this).children(".customelement:first"), "get") : a(this).val(), n.onchange()
                        });
                        var D = a("<td></td>");
                        if (p.append(D), this.p.ruleButtons === !0) {
                            var E = a("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del ui-mini " + j.button + "'/>");
                            D.append(E), E.bind("click", function() {
                                for (d = 0; d < c.rules.length; d++)
                                    if (c.rules[d] === b) {
                                        c.rules.splice(d, 1);
                                        break
                                    }
                                return n.reDraw(), n.onchange(), !1
                            })
                        }
                        return p
                    }, this.getStringForGroup = function(a) {
                        var b, c = "(";
                        if (void 0 !== a.groups)
                            for (b = 0; b < a.groups.length; b++) {
                                c.length > 1 && (c += " " + a.groupOp + " ");
                                try {
                                    c += this.getStringForGroup(a.groups[b])
                                } catch (d) {
                                    alert(d)
                                }
                            }
                        if (void 0 !== a.rules) try {
                            for (b = 0; b < a.rules.length; b++) c.length > 1 && (c += " " + a.groupOp + " "), c += this.getStringForRule(a.rules[b])
                        } catch (e) {
                            alert(e)
                        }
                        return c += ")", "()" === c ? "" : c
                    }, this.getStringForRule = function(b) {
                        var c, d, f, g, h = "",
                            i = "",
                            j = ["int", "integer", "float", "number", "currency"];
                        for (c = 0; c < this.p.ops.length; c++)
                            if (this.p.ops[c].oper === b.op) {
                                h = this.p.operands.hasOwnProperty(b.op) ? this.p.operands[b.op] : "", i = this.p.ops[c].oper;
                                break
                            }
                        for (c = 0; c < this.p.columns.length; c++)
                            if (this.p.columns[c].name === b.field) {
                                d = this.p.columns[c];
                                break
                            }
                        return void 0 === d ? "" : (g = b.data, ("bw" === i || "bn" === i) && (g += "%"), ("ew" === i || "en" === i) && (g = "%" + g), ("cn" === i || "nc" === i) && (g = "%" + g + "%"), ("in" === i || "ni" === i) && (g = " (" + g + ")"), e.errorcheck && k(b.data, d), f = -1 !== a.inArray(d.searchtype, j) || "nn" === i || "nu" === i ? b.field + " " + h + " " + g : b.field + " " + h + ' "' + g + '"')
                    }, this.resetFilter = function() {
                        this.p.filter = a.extend(!0, {}, this.p.initFilter), this.reDraw(), this.onchange()
                    }, this.hideError = function() {
                        a("th." + j.error, this).html(""), a("tr.error", this).hide()
                    }, this.showError = function() {
                        a("th." + j.error, this).html(this.p.errmsg), a("tr.error", this).show()
                    }, this.toUserFriendlyString = function() {
                        return this.getStringForGroup(e.filter)
                    }, this.toString = function() {
                        function a(a) {
                            if (c.p.errorcheck) {
                                var b, d;
                                for (b = 0; b < c.p.columns.length; b++)
                                    if (c.p.columns[b].name === a.field) {
                                        d = c.p.columns[b];
                                        break
                                    }
                                d && k(a.data, d)
                            }
                            return a.op + "(item." + a.field + ",'" + a.data + "')"
                        }

                        function b(c) {
                            var d, e = "(";
                            if (void 0 !== c.groups)
                                for (d = 0; d < c.groups.length; d++) e.length > 1 && (e += "OR" === c.groupOp ? " || " : " && "), e += b(c.groups[d]);
                            if (void 0 !== c.rules)
                                for (d = 0; d < c.rules.length; d++) e.length > 1 && (e += "OR" === c.groupOp ? " || " : " && "), e += a(c.rules[d]);
                            return e += ")", "()" === e ? "" : e
                        }
                        var c = this;
                        return b(this.p.filter)
                    }, this.reDraw(), this.p.showQuery && this.onchange(), this.filter = !0
                }
            }
        })
    }, a.extend(a.fn.jqFilter, {
        toSQLString: function() {
            var a = "";
            return this.each(function() {
                a = this.toUserFriendlyString()
            }), a
        },
        filterData: function() {
            var a;
            return this.each(function() {
                a = this.p.filter
            }), a
        },
        getParameter: function(a) {
            return void 0 !== a && this.p.hasOwnProperty(a) ? this.p[a] : this.p
        },
        resetFilter: function() {
            return this.each(function() {
                this.resetFilter()
            })
        },
        addFilter: function(b) {
            "string" == typeof b && (b = a.jgrid.parse(b)), this.each(function() {
                this.p.filter = b, this.reDraw(), this.onchange()
            })
        }
    }), a.jgrid.extend({
        filterToolbar: function(b) {
            var c = a.jgrid.getRegional(this[0], "search");
            return b = a.extend({
                autosearch: !0,
                autosearchDelay: 500,
                searchOnEnter: !0,
                beforeSearch: null,
                afterSearch: null,
                beforeClear: null,
                afterClear: null,
                searchurl: "",
                stringResult: !1,
                groupOp: "AND",
                defaultSearch: "bw",
                searchOperators: !1,
                resetIcon: "x",
                operands: {
                    eq: "==",
                    ne: "!",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "^",
                    bn: "!^",
                    "in": "=",
                    ni: "!=",
                    ew: "|",
                    en: "!@",
                    cn: "~",
                    nc: "!~",
                    nu: "#",
                    nn: "!#"
                }
            }, c, b || {}), this.each(function() {
                var d = this;
                if (!d.p.filterToolbar) {
                    a(d).data("filterToolbar") || a(d).data("filterToolbar", b), d.p.force_regional && (b = a.extend(b, c));
                    var e, f = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].filter,
                        g = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].common,
                        h = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].base,
                        i = function() {
                            var c, e, f, g = {},
                                h = 0,
                                i = {};
                            a.each(d.p.colModel, function() {
                                var j = a("#gs_" + d.p.idPrefix + a.jgrid.jqID(this.name), this.frozen === !0 && d.p.frozenColumns === !0 ? d.grid.fhDiv : d.grid.hDiv);
                                if (e = this.index || this.name, f = b.searchOperators ? j.parent().prev().children("a").attr("soper") || b.defaultSearch : this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq" : b.defaultSearch, c = "custom" === this.stype && a.isFunction(this.searchoptions.custom_value) && j.length > 0 && "SPAN" === j[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(d, j.children(".customelement:first"), "get") : j.val(), c || "nu" === f || "nn" === f) g[e] = c, i[e] = f, h++;
                                else try {
                                    delete d.p.postData[e]
                                } catch (k) {}
                            });
                            var j = h > 0 ? !0 : !1;
                            if (b.stringResult === !0 || "local" === d.p.datatype || b.searchOperators === !0) {
                                var k = '{"groupOp":"' + b.groupOp + '","rules":[',
                                    l = 0;
                                a.each(g, function(a, b) {
                                    l > 0 && (k += ","), k += '{"field":"' + a + '",', k += '"op":"' + i[a] + '",', b += "", k += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}', l++
                                }), k += "]}", a.extend(d.p.postData, {
                                    filters: k
                                }), a.each(["searchField", "searchString", "searchOper"], function(a, b) {
                                    d.p.postData.hasOwnProperty(b) && delete d.p.postData[b]
                                })
                            } else a.extend(d.p.postData, g);
                            var m;
                            d.p.searchurl && (m = d.p.url, a(d).jqGrid("setGridParam", {
                                url: d.p.searchurl
                            }));
                            var n = "stop" === a(d).triggerHandler("jqGridToolbarBeforeSearch") ? !0 : !1;
                            !n && a.isFunction(b.beforeSearch) && (n = b.beforeSearch.call(d)), n || a(d).jqGrid("setGridParam", {
                                search: j
                            }).trigger("reloadGrid", [{
                                page: 1
                            }]), m && a(d).jqGrid("setGridParam", {
                                url: m
                            }), a(d).triggerHandler("jqGridToolbarAfterSearch"), a.isFunction(b.afterSearch) && b.afterSearch.call(d)
                        },
                        j = function(c) {
                            var e, f = {},
                                g = 0;
                            c = "boolean" != typeof c ? !0 : c, a.each(d.p.colModel, function() {
                                var b, c = a("#gs_" + d.p.idPrefix + a.jgrid.jqID(this.name), this.frozen === !0 && d.p.frozenColumns === !0 ? d.grid.fhDiv : d.grid.hDiv);
                                switch (this.searchoptions && void 0 !== this.searchoptions.defaultValue && (b = this.searchoptions.defaultValue), e = this.index || this.name, this.stype) {
                                    case "select":
                                        if (c.find("option").each(function(c) {
                                                return 0 === c && (this.selected = !0), a(this).val() === b ? (this.selected = !0, !1) : void 0
                                            }), void 0 !== b) f[e] = b, g++;
                                        else try {
                                            delete d.p.postData[e]
                                        } catch (h) {}
                                        break;
                                    case "text":
                                        if (c.val(b || ""), void 0 !== b) f[e] = b, g++;
                                        else try {
                                            delete d.p.postData[e]
                                        } catch (i) {}
                                        break;
                                    case "custom":
                                        a.isFunction(this.searchoptions.custom_value) && c.length > 0 && "SPAN" === c[0].nodeName.toUpperCase() && this.searchoptions.custom_value.call(d, c.children(".customelement:first"), "set", b || "")
                                }
                            });
                            var h = g > 0 ? !0 : !1;
                            if (d.p.resetsearch = !0, b.stringResult === !0 || "local" === d.p.datatype) {
                                var i = '{"groupOp":"' + b.groupOp + '","rules":[',
                                    j = 0;
                                a.each(f, function(a, b) {
                                    j > 0 && (i += ","), i += '{"field":"' + a + '",', i += '"op":"eq",', b += "", i += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}', j++
                                }), i += "]}", a.extend(d.p.postData, {
                                    filters: i
                                }), a.each(["searchField", "searchString", "searchOper"], function(a, b) {
                                    d.p.postData.hasOwnProperty(b) && delete d.p.postData[b]
                                })
                            } else a.extend(d.p.postData, f);
                            var k;
                            d.p.searchurl && (k = d.p.url, a(d).jqGrid("setGridParam", {
                                url: d.p.searchurl
                            }));
                            var l = "stop" === a(d).triggerHandler("jqGridToolbarBeforeClear") ? !0 : !1;
                            !l && a.isFunction(b.beforeClear) && (l = b.beforeClear.call(d)), l || c && a(d).jqGrid("setGridParam", {
                                search: h
                            }).trigger("reloadGrid", [{
                                page: 1
                            }]), k && a(d).jqGrid("setGridParam", {
                                url: k
                            }), a(d).triggerHandler("jqGridToolbarAfterClear"), a.isFunction(b.afterClear) && b.afterClear()
                        },
                        k = function() {
                            var b = a("tr.ui-search-toolbar", d.grid.hDiv),
                                c = d.p.frozenColumns === !0 ? a("tr.ui-search-toolbar", d.grid.fhDiv) : !1;
                            "none" === b.css("display") ? (b.show(), c && c.show()) : (b.hide(), c && c.hide())
                        },
                        l = function(c, e, h) {
                            a("#sopt_menu").remove(), e = parseInt(e, 10), h = parseInt(h, 10) + 18;
                            for (var j, k, l = '<ul id="sopt_menu" data-theme="' + d.p.dataTheme + '" class="ui-search-menu modal-content" data-role="listview" data-inset="true" style="left:' + e + "px;top:" + h + 'px;z-index:100000">', m = a(c).attr("soper"), n = [], o = 0, p = a(c).attr("colname"), q = d.p.colModel.length; q > o && d.p.colModel[o].name !== p;) o++;
                            var r = d.p.colModel[o],
                                s = a.extend({}, r.searchoptions);
                            for (s.sopt || (s.sopt = [], s.sopt[0] = "select" === r.stype ? "eq" : b.defaultSearch), a.each(b.odata, function() {
                                    n.push(this.oper)
                                }), o = 0; o < s.sopt.length; o++) k = a.inArray(s.sopt[o], n), -1 !== k && (j = m === (b.odata && b.odata[k].oper) ? g.highlight : "", l += '<li class="ui-menu-item ' + j + '" role="presentation"><a class="' + g.cornerall + ' g-menu-item" tabindex="0" role="menuitem" value="' + b.odata[k].oper + '" oper="' + b.operands[b.odata[k].oper] + '"><table class="ui-common-table"><tr><td width="25px">' + b.operands[b.odata[k].oper] + "</td><td>" + b.odata[k].text + "</td></tr></table></a></li>");
                            l += "</ul>", a("body").append(l), a("#sopt_menu").addClass("ui-menu " + f.menu_widget).listview(), a("#sopt_menu > li > a").click(function() {
                                var e = a(this).attr("value"),
                                    f = a(this).attr("oper");
                                if (a(d).triggerHandler("jqGridToolbarSelectOper", [e, f, c]), a("#sopt_menu").hide(), a(c).text(f).attr("soper", e), b.autosearch === !0) {
                                    var g = a(c).parent().next().children()[0];
                                    (a(g).val() || "nu" === e || "nn" === e) && i()
                                }
                            })
                        },
                        m = a("<tr class='ui-search-toolbar' role='row'></tr>");
                    a.each(d.p.colModel, function(c) {
                        var g, j, k, l, n, o, p, q = this,
                            r = "",
                            s = "=",
                            t = a("<th role='columnheader' class='" + h.headerBox + " ui-th-" + d.p.direction + "' id='gsh_" + d.p.id + "_" + q.name + "' ></th>"),
                            u = a("<div></div>"),
                            v = a("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper' headers=''></td><td class='ui-search-input' headers=''></td><td class='ui-search-clear' headers=''></td></tr></table>");
                        if (this.hidden === !0 && a(t).css("display", "none"), this.search = this.search === !1 ? !1 : !0, void 0 === this.stype && (this.stype = "text"), g = a.extend({}, this.searchoptions || {}, {
                                name: q.index || q.name,
                                id: "gs_" + d.p.idPrefix + q.name,
                                oper: "search"
                            }), this.search) {
                            if (b.searchOperators) {
                                for (j = g.sopt ? g.sopt[0] : "select" === q.stype ? "eq" : b.defaultSearch, k = 0; k < b.odata.length; k++)
                                    if (b.odata[k].oper === j) {
                                        s = b.operands[j] || "";
                                        break
                                    }
                                l = null != g.searchtitle ? g.searchtitle : b.operandTitle, r = "<a title='" + l + "' style='padding-right: 0.5em;' soper='" + j + "' class='soptclass ui-btn ui-corner-all ui-btn-inline ui-mini' colname='" + this.name + "'>" + s + "</a>"
                            }
                            switch (a("td:eq(0)", v).attr("colindex", c).append(r), void 0 === g.clearSearch && (g.clearSearch = !0), g.clearSearch ? (n = b.resetTitle || "Clear Search Value", a("td:eq(2)", v).append("<a title='" + n + "' class='clearsearchclass " + f.icon_clear + "'>" + b.resetIcon + "</a>")) : a("td:eq(2)", v).hide(), this.surl && (g.dataUrl = this.surl), o = "", g.defaultValue && (o = a.isFunction(g.defaultValue) ? g.defaultValue.call(d) : g.defaultValue), p = a.jgrid.createEl.call(d, this.stype, g, o, !1, a.extend({}, a.jgrid.ajaxOptions, d.p.ajaxSelectOptions || {})), a(p).css({
                                width: "100%"
                            }).addClass(f.srInput), a("td:eq(1)", v).append(p), a(u).append(v), this.stype) {
                                case "select":
                                    b.autosearch === !0 && (g.dataEvents = [{
                                        type: "change",
                                        fn: function() {
                                            return i(), !1
                                        }
                                    }]);
                                    break;
                                case "text":
                                    b.autosearch === !0 && (b.searchOnEnter ? g.dataEvents = [{
                                        type: "keypress",
                                        fn: function(a) {
                                            var b = a.charCode || a.keyCode || 0;
                                            return 13 === b ? (i(), !1) : this
                                        }
                                    }] : g.dataEvents = [{
                                        type: "keydown",
                                        fn: function(a) {
                                            var c = a.which;
                                            switch (c) {
                                                case 13:
                                                    return !1;
                                                case 9:
                                                case 16:
                                                case 37:
                                                case 38:
                                                case 39:
                                                case 40:
                                                case 27:
                                                    break;
                                                default:
                                                    e && clearTimeout(e), e = setTimeout(function() {
                                                        i()
                                                    }, b.autosearchDelay)
                                            }
                                        }
                                    }])
                            }
                            a.jgrid.bindEv.call(d, p, g)
                        }
                        a(t).append(u), a(m).append(t), b.searchOperators || a("td:eq(0)", v).hide()
                    }), a("table thead", d.grid.hDiv).append(m), b.searchOperators && (a(".soptclass", m).click(function(b) {
                        var c = a(this).offset(),
                            d = c.left,
                            e = c.top;
                        l(this, d, e), b.stopPropagation()
                    }), a("body").on("click", function(b) {
                        "soptclass" !== b.target.className && a("#sopt_menu").hide()
                    })), a(".clearsearchclass", m).click(function() {
                        var c = a(this).parents("tr:first"),
                            e = parseInt(a("td.ui-search-oper", c).attr("colindex"), 10),
                            f = a.extend({}, d.p.colModel[e].searchoptions || {}),
                            g = f.defaultValue ? f.defaultValue : "";
                        "select" === d.p.colModel[e].stype ? g ? a("td.ui-search-input select", c).val(g) : a("td.ui-search-input select", c)[0].selectedIndex = 0 : a("td.ui-search-input input", c).val(g), b.autosearch === !0 && i()
                    }), a(m).enhanceWithin(), this.p.filterToolbar = !0, this.triggerToolbar = i, this.clearToolbar = j, this.toggleToolbar = k
                }
            })
        },
        destroyFilterToolbar: function() {
            return this.each(function() {
                this.p.filterToolbar && (this.triggerToolbar = null, this.clearToolbar = null, this.toggleToolbar = null, this.p.filterToolbar = !1, a(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
            })
        },
        searchGrid: function(b) {
            var c = a.jgrid.getRegional(this[0], "search");
            return b = a.extend(!0, {
                recreateFilter: !1,
                drag: !0,
                sField: "searchField",
                sValue: "searchString",
                sOper: "searchOper",
                sFilter: "filters",
                loadDefaults: !0,
                beforeShowSearch: null,
                afterShowSearch: null,
                onInitializeSearch: null,
                afterRedraw: null,
                afterChange: null,
                sortStrategy: null,
                closeAfterSearch: !1,
                closeAfterReset: !1,
                closeOnEscape: !1,
                searchOnEnter: !1,
                multipleSearch: !1,
                multipleGroup: !1,
                top: 0,
                left: 0,
                jqModal: !0,
                modal: !1,
                resize: !0,
                width: 450,
                height: "auto",
                dataheight: "auto",
                showQuery: !1,
                errorcheck: !0,
                sopt: null,
                stringResult: void 0,
                onClose: null,
                onSearch: null,
                onReset: null,
                toTop: !0,
                overlay: 30,
                columns: [],
                tmplNames: null,
                tmplFilters: null,
                tmplLabel: " Template: ",
                showOnLoad: !1,
                layer: null,
                operands: {
                    eq: "=",
                    ne: "<>",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "LIKE",
                    bn: "NOT LIKE",
                    "in": "IN",
                    ni: "NOT IN",
                    ew: "LIKE",
                    en: "NOT LIKE",
                    cn: "LIKE",
                    nc: "NOT LIKE",
                    nu: "IS NULL",
                    nn: "ISNOT NULL"
                }
            }, c, b || {}), this.each(function() {
                function c(c) {
                    g = a(d).triggerHandler("jqGridFilterBeforeShow", [c]), void 0 === g && (g = !0), g && a.isFunction(b.beforeShowSearch) && (g = b.beforeShowSearch.call(d, c)), g && (a.jgrid.viewModal("#" + a.jgrid.jqID(i.themodal), {
                        gbox: "#gbox_" + a.jgrid.jqID(f),
                        jqm: b.jqModal,
                        modal: b.modal,
                        overlay: b.overlay,
                        toTop: b.toTop
                    }), a(d).triggerHandler("jqGridFilterAfterShow", [c]), a.isFunction(b.afterShowSearch) && b.afterShowSearch.call(d, c))
                }
                var d = this;
                if (d.grid) {
                    var e, f = "fbox_" + d.p.id,
                        g = !0,
                        h = !0,
                        i = {
                            themodal: "searchmod" + f,
                            modalhead: "searchhd" + f,
                            modalcontent: "searchcnt" + f,
                            scrollelm: f
                        },
                        j = d.p.postData[b.sFilter],
                        k = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].filter;
                    a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].common;
                    if (b.styleUI = d.p.styleUI, "string" == typeof j && (j = a.jgrid.parse(j)), b.recreateFilter === !0 && a("#" + a.jgrid.jqID(i.themodal)).remove(), void 0 !== a("#" + a.jgrid.jqID(i.themodal))[0]) c(a("#fbox_" + a.jgrid.jqID(d.p.id)));
                    else {
                        var l = a("<div><div id='" + f + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + a.jgrid.jqID(d.p.id)),
                            m = "left",
                            n = "";
                        "rtl" === d.p.direction && (m = "right", n = " style='text-align:left'", l.attr("dir", "rtl"));
                        var o, p, q = a.extend([], d.p.colModel),
                            r = "<a id='" + f + "_search' class='" + k.icon_search + "'>" + b.Find + "</a>",
                            s = "<a id='" + f + "_reset' class='" + k.icon_reset + "'>" + b.Reset + "</a>",
                            t = "",
                            u = "",
                            v = !1,
                            w = -1;
                        if (b.showQuery && (t = "<a id='" + f + "_query' class='" + k.icon_query + "'>Query</a>"), b.columns.length ? (q = b.columns, w = 0, o = q[0].index || q[0].name) : a.each(q, function(a, b) {
                                if (b.label || (b.label = d.p.colNames[a]), !v) {
                                    var c = void 0 === b.search ? !0 : b.search,
                                        e = b.hidden === !0,
                                        f = b.searchoptions && b.searchoptions.searchhidden === !0;
                                    (f && c || c && !e) && (v = !0, o = b.index || b.name, w = a)
                                }
                            }), !j && o || b.multipleSearch === !1) {
                            var x = "eq";
                            w >= 0 && q[w].searchoptions && q[w].searchoptions.sopt ? x = q[w].searchoptions.sopt[0] : b.sopt && b.sopt.length && (x = b.sopt[0]), j = {
                                groupOp: "AND",
                                rules: [{
                                    field: o,
                                    op: x,
                                    data: ""
                                }]
                            }
                        }
                        v = !1, b.tmplNames && b.tmplNames.length && (v = !0, u = b.tmplLabel, u += "<select class='ui-template'>", u += "<option value='default'>Default</option>", a.each(b.tmplNames, function(a, b) {
                            u += "<option value='" + a + "'>" + b + "</option>"
                        }), u += "</select>"), p = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + f + "_2'><tbody><tr><td class='EditButton' style='text-align:" + m + "'>" + s + u + "</td><td class='EditButton' " + n + ">" + t + r + "</td></tr></tbody></table>", f = a.jgrid.jqID(f);
                        var y = b.afterRedraw;
                        a.isFunction(y) || (y = function() {}), b.afterRedraw = function() {
                            y(), a("#" + i.themodal).enhanceWithin()
                        }, a("#" + f).jqFilter({
                            columns: q,
                            sortStrategy: b.sortStrategy,
                            filter: b.loadDefaults ? j : null,
                            showQuery: b.showQuery,
                            errorcheck: b.errorcheck,
                            sopt: b.sopt,
                            groupButton: b.multipleGroup,
                            ruleButtons: b.multipleSearch,
                            afterRedraw: b.afterRedraw,
                            ops: b.odata,
                            operands: b.operands,
                            ajaxSelectOptions: d.p.ajaxSelectOptions,
                            groupOps: b.groupOps,
                            onChange: function() {
                                this.p.showQuery && a(".query", this).html(this.toUserFriendlyString()), a.isFunction(b.afterChange) && b.afterChange.call(d, a("#" + f), b)
                            },
                            direction: d.p.direction,
                            id: d.p.id
                        }), l.append(p), v && b.tmplFilters && b.tmplFilters.length && a(".ui-template", l).bind("change", function() {
                            var c = a(this).val();
                            return "default" === c ? a("#" + f).jqFilter("addFilter", j) : a("#" + f).jqFilter("addFilter", b.tmplFilters[parseInt(c, 10)]), !1
                        }), b.multipleGroup === !0 && (b.multipleSearch = !0), a(d).triggerHandler("jqGridFilterInitialize", [a("#" + f)]), a.isFunction(b.onInitializeSearch) && b.onInitializeSearch.call(d, a("#" + f)), b.gbox = "#gbox_" + f;
                        var z = a('<div id="' + i.themodal + '" data-role="popup" data-mini="true"><a href="#" data-rel="back" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><div id="' + i.modalhead + '"  data-role="header"> <h1>' + b.caption + '</h1></div><div id="' + i.modalcontent + '"  data-role="content" class="ui-jqdialog-content ui-content"></div></div>');
                        a("#" + i.modalcontent, z).append(l), a.mobile.activePage.append(z).trigger("pagecreate"), (b.searchOnEnter || b.closeOnEscape) && a("#" + a.jgrid.jqID(i.themodal)).keydown(function(c) {
                            var d = a(c.target);
                            return !b.searchOnEnter || 13 !== c.which || d.hasClass("add-group") || d.hasClass("add-rule") || d.hasClass("delete-group") || d.hasClass("delete-rule") || d.hasClass("fm-button") && d.is("[id$=_query]") ? b.closeOnEscape && 27 === c.which ? (a("#" + a.jgrid.jqID(i.modalhead)).find(".ui-jqdialog-titlebar-close").click(), !1) : void 0 : (a("#" + f + "_search").click(), !1)
                        }), t && a("#" + f + "_query").bind("click", function() {
                            return a(".queryresult", l).toggle(), !1
                        }), void 0 === b.stringResult && (b.stringResult = b.multipleSearch), a("#" + f + "_search").bind("click", function() {
                            var c, g, j = {};
                            if (e = a("#" + f), e.find(".input-elm:focus").change(), g = e.jqFilter("filterData"), b.errorcheck && (e[0].hideError(), b.showQuery || e.jqFilter("toSQLString"), e[0].p.error)) return e[0].showError(), !1;
                            if (b.stringResult) {
                                try {
                                    c = JSON.stringify(g)
                                } catch (k) {}
                                "string" == typeof c && (j[b.sFilter] = c, a.each([b.sField, b.sValue, b.sOper], function() {
                                    j[this] = ""
                                }))
                            } else b.multipleSearch ? (j[b.sFilter] = g, a.each([b.sField, b.sValue, b.sOper], function() {
                                j[this] = ""
                            })) : (j[b.sField] = g.rules[0].field, j[b.sValue] = g.rules[0].data, j[b.sOper] = g.rules[0].op, j[b.sFilter] = "");
                            return d.p.search = !0, a.extend(d.p.postData, j), h = a(d).triggerHandler("jqGridFilterSearch"), void 0 === h && (h = !0), h && a.isFunction(b.onSearch) && (h = b.onSearch.call(d, d.p.filters)), h !== !1 && a(d).trigger("reloadGrid", [{
                                page: 1
                            }]), b.closeAfterSearch && a.jgrid.hideModal("#" + a.jgrid.jqID(i.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(d.p.id),
                                jqm: b.jqModal,
                                onClose: b.onClose
                            }), !1
                        }), a("#" + f + "_reset").bind("click", function() {
                            var c = {},
                                e = a("#" + f);
                            return d.p.search = !1, d.p.resetsearch = !0, b.multipleSearch === !1 ? c[b.sField] = c[b.sValue] = c[b.sOper] = "" : c[b.sFilter] = "", e[0].resetFilter(), v && a(".ui-template", l).val("default"), a.extend(d.p.postData, c), h = a(d).triggerHandler("jqGridFilterReset"), void 0 === h && (h = !0), h && a.isFunction(b.onReset) && (h = b.onReset.call(d)), h !== !1 && a(d).trigger("reloadGrid", [{
                                page: 1
                            }]), b.closeAfterReset && a.jgrid.hideModal("#" + a.jgrid.jqID(i.themodal), {
                                gb: "#gbox_" + a.jgrid.jqID(d.p.id),
                                jqm: b.jqModal,
                                onClose: b.onClose
                            }), a("#" + i.themodal).enhanceWithin(), !1
                        }), setTimeout(function() {
                            a("#" + i.themodal).popup(), a("#" + i.themodal).popup("open", {
                                positionTo: b.gbox
                            }), a("#" + i.themodal).enhanceWithin()
                        }, 100), a(document).on("popupafterclose", "#" + i.themodal, function() {
                            a(this).remove()
                        })
                    }
                }
            })
        }
    })
}(jQuery);
! function(a) {
    "use strict";
    var b = {};
    a.jgrid.extend({
        editGridRow: function(c, d) {
            var e = a.jgrid.getRegional(this[0], "edit"),
                f = this[0].p.styleUI,
                g = a.jgrid.styleUI[f].formedit,
                h = a.jgrid.styleUI[f].common;
            return d = a.extend(!0, {
                top: 0,
                left: 0,
                width: "500",
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: null,
                mtype: "POST",
                clearAfterAdd: !0,
                closeAfterEdit: !1,
                reloadAfterSubmit: !0,
                onInitializeForm: null,
                beforeInitData: null,
                beforeShowForm: null,
                afterShowForm: null,
                beforeSubmit: null,
                afterSubmit: null,
                onclickSubmit: null,
                afterComplete: null,
                onclickPgButtons: null,
                afterclickPgButtons: null,
                editData: {},
                recreateForm: !1,
                jqModal: !0,
                closeOnEscape: !1,
                addedrow: "first",
                topinfo: "",
                bottominfo: "",
                saveicon: [],
                closeicon: [],
                savekey: [!1, 13],
                navkeys: [!1, 38, 40],
                checkOnSubmit: !1,
                checkOnUpdate: !1,
                _savedData: {},
                processing: !1,
                onClose: null,
                ajaxEditOptions: {},
                serializeEditData: null,
                viewPagerButtons: !0,
                overlayClass: h.overlay,
                removemodal: !0,
                form: "edit",
                template: null
            }, e, d || {}), b[a(this)[0].p.id] = d, this.each(function() {
                function e() {
                    return a(z).find(".FormElement").each(function() {
                        var c = a(".customelement", this);
                        if (c.length) {
                            var d = c[0],
                                e = a(d).attr("name");
                            a.each(r.p.colModel, function() {
                                if (this.name === e && this.editoptions && a.isFunction(this.editoptions.custom_value)) {
                                    try {
                                        if (t[e] = this.editoptions.custom_value.call(r, a("#" + a.jgrid.jqID(e), z), "get"), void 0 === t[e]) throw "e1"
                                    } catch (c) {
                                        "e1" === c ? a.jgrid.info_dialog(F.errcap, "function 'custom_value' " + b[a(this)[0]].p.msg.novalue, b[a(this)[0]].p.bClose, {
                                            styleUI: b[a(this)[0]].p.styleUI
                                        }) : a.jgrid.info_dialog(F.errcap, c.message, b[a(this)[0]].p.bClose, {
                                            styleUI: b[a(this)[0]].p.styleUI
                                        })
                                    }
                                    return !0
                                }
                            })
                        } else {
                            switch (a(this).get(0).type) {
                                case "checkbox":
                                    if (a(this).is(":checked")) t[this.name] = a(this).val();
                                    else {
                                        var f = a(this).attr("offval");
                                        t[this.name] = f
                                    }
                                    break;
                                case "select-one":
                                    t[this.name] = a("option:selected", this).val();
                                    break;
                                case "select-multiple":
                                    t[this.name] = a(this).val(), t[this.name] ? t[this.name] = t[this.name].join(",") : t[this.name] = "";
                                    var g = [];
                                    a("option:selected", this).each(function(b, c) {
                                        g[b] = a(c).text()
                                    });
                                    break;
                                case "password":
                                case "text":
                                case "textarea":
                                case "button":
                                    t[this.name] = a(this).val()
                            }
                            r.p.autoencode && (t[this.name] = a.jgrid.htmlEncode(t[this.name]))
                        }
                    }), !0
                }

                function f(c, d, e, f) {
                    var h, i, j, k, l, m, n, o = 0,
                        p = [],
                        q = !1,
                        s = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>",
                        t = "";
                    for (n = 1; f >= n; n++) t += s;
                    if ("_empty" !== c && (q = a(d).jqGrid("getInd", c)), a(d.p.colModel).each(function(n) {
                            if (h = this.name, i = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, l = i ? "style='display:none'" : "", "cb" !== h && "subgrid" !== h && this.editable === !0 && "rn" !== h) {
                                if (q === !1) k = "";
                                else if (h === d.p.ExpandColumn && d.p.treeGrid === !0) k = a("td[role='gridcell']:eq(" + n + ")", d.rows[q]).text();
                                else {
                                    try {
                                        k = a.unformat.call(d, a("td[role='gridcell']:eq(" + n + ")", d.rows[q]), {
                                            rowId: c,
                                            colModel: this
                                        }, n)
                                    } catch (s) {
                                        k = this.edittype && "textarea" === this.edittype ? a("td[role='gridcell']:eq(" + n + ")", d.rows[q]).text() : a("td[role='gridcell']:eq(" + n + ")", d.rows[q]).html()
                                    }(!k || "&nbsp;" === k || "&#160;" === k || 1 === k.length && 160 === k.charCodeAt(0)) && (k = "")
                                }
                                var u = a.extend({}, this.editoptions || {}, {
                                        id: h,
                                        name: h,
                                        rowId: c,
                                        oper: "edit"
                                    }),
                                    v = a.extend({}, {
                                        elmprefix: "",
                                        elmsuffix: "",
                                        rowabove: !1,
                                        rowcontent: ""
                                    }, this.formoptions || {}),
                                    w = parseInt(v.rowpos, 10) || o + 1,
                                    y = parseInt(2 * (parseInt(v.colpos, 10) || 1), 10);
                                if ("_empty" === c && u.defaultValue && (k = a.isFunction(u.defaultValue) ? u.defaultValue.call(r) : u.defaultValue), this.edittype || (this.edittype = "text"), r.p.autoencode && (k = a.jgrid.htmlDecode(k)), m = a.jgrid.createEl.call(r, this.edittype, u, k, !1, a.extend({}, a.jgrid.ajaxOptions, d.p.ajaxSelectOptions || {})), "select" === this.edittype && (k = a(m).val(), "select-multiple" === a(m).get(0).type && (k = k.join(","))), "checkbox" === this.edittype && (k = a(m).is(":checked") ? a(m).val() : a(m).attr("offval")), (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[h] = k), a(m).addClass("FormElement"), a.inArray(this.edittype, ["text", "textarea", "password", "select"]) > -1 && a(m).addClass(g.inputClass), E) a(K).find("#" + h).replaceWith(m);
                                else {
                                    if (j = a(e).find("tr[rowpos=" + w + "]"), v.rowabove) {
                                        var z = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + v.rowcontent + "</td></tr>");
                                        a(e).append(z), z[0].rp = w
                                    }
                                    0 === j.length && (j = a("<tr " + l + " rowpos='" + w + "'></tr>").addClass("FormData").attr("id", "tr_" + h), a(j).append(t), a(e).append(j), j[0].rp = w), a("td:eq(" + (y - 2) + ")", j[0]).html("<label for='" + h + "'>" + (void 0 === v.label ? d.p.colNames[n] : v.label) + "</label>"), a("td:eq(" + (y - 1) + ")", j[0]).append(v.elmprefix).append(m).append(v.elmsuffix)
                                }
                                "custom" === this.edittype && a.isFunction(u.custom_value) && u.custom_value.call(r, a("#" + h, x), "set", k), a.jgrid.bindEv.call(r, m, u), p[o] = n, o++
                            }
                        }), o > 0) {
                        var u;
                        E ? (u = "<div class='FormData' style='display:none'><input class='FormElement' id='id_g' type='text' name='" + d.p.id + "_id' value='" + c + "'/>", a(K).append(u)) : (u = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + d.p.id + "_id' value='" + c + "'/></td></tr>"), u[0].rp = o + 999, a(e).append(u)), (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[d.p.id + "_id"] = c)
                    }
                    return p
                }

                function i(c, d, e) {
                    var f, g, h, i, j, k, l = 0;
                    (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData = {}, b[r.p.id]._savedData[d.p.id + "_id"] = c);
                    var m = d.p.colModel;
                    if ("_empty" === c) return a(m).each(function() {
                        f = this.name, i = a.extend({}, this.editoptions || {}), h = a("#" + a.jgrid.jqID(f), e), h && h.length && null !== h[0] && (j = "", "custom" === this.edittype && a.isFunction(i.custom_value) ? i.custom_value.call(r, a("#" + f, e), "set", j) : i.defaultValue ? (j = a.isFunction(i.defaultValue) ? i.defaultValue.call(r) : i.defaultValue, "checkbox" === h[0].type ? (k = j.toLowerCase(), k.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== k ? (h[0].checked = !0, h[0].defaultChecked = !0, h[0].value = j) : (h[0].checked = !1, h[0].defaultChecked = !1)) : h.val(j)) : "checkbox" === h[0].type ? (h[0].checked = !1, h[0].defaultChecked = !1, j = a(h).attr("offval")) : h[0].type && "select" === h[0].type.substr(0, 6) ? h[0].selectedIndex = 0 : h.val(j), (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[f] = j))
                    }), void a("#id_g", e).val(c);
                    var n = a(d).jqGrid("getInd", c, !0);
                    n && (a('td[role="gridcell"]', n).each(function(h) {
                        if (f = m[h].name, "cb" !== f && "subgrid" !== f && "rn" !== f && m[h].editable === !0) {
                            if (f === d.p.ExpandColumn && d.p.treeGrid === !0) g = a(this).text();
                            else try {
                                g = a.unformat.call(d, a(this), {
                                    rowId: c,
                                    colModel: m[h]
                                }, h)
                            } catch (i) {
                                g = "textarea" === m[h].edittype ? a(this).text() : a(this).html()
                            }
                            switch (r.p.autoencode && (g = a.jgrid.htmlDecode(g)), (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (b[r.p.id]._savedData[f] = g), f = a.jgrid.jqID(f), m[h].edittype) {
                                case "password":
                                case "text":
                                case "button":
                                case "image":
                                case "textarea":
                                    ("&nbsp;" === g || "&#160;" === g || 1 === g.length && 160 === g.charCodeAt(0)) && (g = ""), a("#" + f, e).val(g);
                                    break;
                                case "select":
                                    var j = g.split(",");
                                    j = a.map(j, function(b) {
                                        return a.trim(b)
                                    }), a("#" + f + " option", e).each(function() {
                                        m[h].editoptions.multiple || a.trim(g) !== a.trim(a(this).text()) && j[0] !== a.trim(a(this).text()) && j[0] !== a.trim(a(this).val()) ? m[h].editoptions.multiple && (a.inArray(a.trim(a(this).text()), j) > -1 || a.inArray(a.trim(a(this).val()), j) > -1) ? this.selected = !0 : this.selected = !1 : this.selected = !0
                                    }), (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (g = a("#" + f, e).val(), m[h].editoptions.multiple && (g = g.join(",")), b[r.p.id]._savedData[f] = g);
                                    break;
                                case "checkbox":
                                    if (g = String(g), m[h].editoptions && m[h].editoptions.value) {
                                        var k = m[h].editoptions.value.split(":");
                                        k[0] === g ? a("#" + f, e)[r.p.useProp ? "prop" : "attr"]({
                                            checked: !0,
                                            defaultChecked: !0
                                        }) : a("#" + f, e)[r.p.useProp ? "prop" : "attr"]({
                                            checked: !1,
                                            defaultChecked: !1
                                        })
                                    } else g = g.toLowerCase(), g.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== g ? (a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("checked", !0), a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("defaultChecked", !0)) : (a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("checked", !1), a("#" + f, e)[r.p.useProp ? "prop" : "attr"]("defaultChecked", !1));
                                    (b[r.p.id].checkOnSubmit === !0 || b[r.p.id].checkOnUpdate) && (g = a("#" + f, e).is(":checked") ? a("#" + f, e).val() : a("#" + f, e).attr("offval"));
                                    break;
                                case "custom":
                                    try {
                                        if (!m[h].editoptions || !a.isFunction(m[h].editoptions.custom_value)) throw "e1";
                                        m[h].editoptions.custom_value.call(r, a("#" + f, e), "set", g)
                                    } catch (n) {
                                        "e1" === n ? a.jgrid.info_dialog(F.errcap, "function 'custom_value' " + b[a(this)[0]].p.msg.nodefined, a.rp_ge[a(this)[0]].p.bClose, {
                                            styleUI: b[a(this)[0]].p.styleUI
                                        }) : a.jgrid.info_dialog(F.errcap, n.message, a.rp_ge[a(this)[0]].p.bClose, {
                                            styleUI: b[a(this)[0]].p.styleUI
                                        })
                                    }
                            }
                            l++
                        }
                    }), l > 0 && a("#id_g", z).val(c))
                }

                function j() {
                    a.each(r.p.colModel, function(a, b) {
                        b.editoptions && b.editoptions.NullIfEmpty === !0 && t.hasOwnProperty(b.name) && "" === t[b.name] && (t[b.name] = "null")
                    })
                }

                function k() {
                    var c, e, f, g, k, l, m, n = [!0, "", ""],
                        o = {},
                        p = r.p.prmNames,
                        q = a(r).triggerHandler("jqGridAddEditBeforeCheckValues", [a(x), v]);
                    q && "object" == typeof q && (t = q), a.isFunction(b[r.p.id].beforeCheckValues) && (q = b[r.p.id].beforeCheckValues.call(r, t, a(x), v), q && "object" == typeof q && (t = q));
                    for (g in t)
                        if (t.hasOwnProperty(g) && (n = a.jgrid.checkValues.call(r, t[g], g), n[0] === !1)) break;
                    if (j(), n[0] && (o = a(r).triggerHandler("jqGridAddEditClickSubmit", [b[r.p.id], t, v]), void 0 === o && a.isFunction(b[r.p.id].onclickSubmit) && (o = b[r.p.id].onclickSubmit.call(r, b[r.p.id], t, v) || {}), n = a(r).triggerHandler("jqGridAddEditBeforeSubmit", [t, a(x), v]), void 0 === n && (n = [!0, "", ""]), n[0] && a.isFunction(b[r.p.id].beforeSubmit) && (n = b[r.p.id].beforeSubmit.call(r, t, a(x), v))), n[0] && !b[r.p.id].processing) {
                        if (b[r.p.id].processing = !0, a("#sData", z + "_2").addClass(h.active), m = b[r.p.id].url || a(r).jqGrid("getGridParam", "editurl"), f = p.oper, e = "clientArray" === m ? r.p.keyName : p.id, t[f] = "_empty" === a.trim(t[r.p.id + "_id"]) ? p.addoper : p.editoper, t[f] !== p.addoper ? t[e] = t[r.p.id + "_id"] : void 0 === t[e] && (t[e] = t[r.p.id + "_id"]), delete t[r.p.id + "_id"], t = a.extend(t, b[r.p.id].editData, o), r.p.treeGrid === !0) {
                            if (t[f] === p.addoper) {
                                k = a(r).jqGrid("getGridParam", "selrow");
                                var s = "adjacency" === r.p.treeGridModel ? r.p.treeReader.parent_id_field : "parent_id";
                                t[s] = k
                            }
                            for (l in r.p.treeReader)
                                if (r.p.treeReader.hasOwnProperty(l)) {
                                    var u = r.p.treeReader[l];
                                    if (t.hasOwnProperty(u)) {
                                        if (t[f] === p.addoper && "parent_id_field" === l) continue;
                                        delete t[u]
                                    }
                                }
                        }
                        t[e] = a.jgrid.stripPref(r.p.idPrefix, t[e]);
                        var y = a.extend({
                            url: m,
                            type: b[r.p.id].mtype,
                            data: a.isFunction(b[r.p.id].serializeEditData) ? b[r.p.id].serializeEditData.call(r, t) : t,
                            complete: function(g, j) {
                                var l;
                                if (a("#sData", z + "_2").removeClass(h.active), t[e] = r.p.idPrefix + t[e], g.status >= 300 && 304 !== g.status ? (n[0] = !1, n[1] = a(r).triggerHandler("jqGridAddEditErrorTextFormat", [g, v]), a.isFunction(b[r.p.id].errorTextFormat) ? n[1] = b[r.p.id].errorTextFormat.call(r, g, v) : n[1] = j + " Status: '" + g.statusText + "'. Error code: " + g.status) : (n = a(r).triggerHandler("jqGridAddEditAfterSubmit", [g, t, v]), void 0 === n && (n = [!0, "", ""]), n[0] && a.isFunction(b[r.p.id].afterSubmit) && (n = b[r.p.id].afterSubmit.call(r, g, t, v))), n[0] === !1) a(".FormError", x).html(n[1]), a(".FormError", x).show();
                                else if (r.p.autoencode && a.each(t, function(b, c) {
                                        t[b] = a.jgrid.htmlDecode(c)
                                    }), t[f] === p.addoper ? (n[2] || (n[2] = a.jgrid.randId()), null == t[e] || "_empty" === t[e] ? t[e] = n[2] : n[2] = t[e], b[r.p.id].reloadAfterSubmit ? a(r).trigger("reloadGrid") : r.p.treeGrid === !0 ? a(r).jqGrid("addChildNode", n[2], k, t) : a(r).jqGrid("addRowData", n[2], t, d.addedrow), b[r.p.id].closeAfterAdd ? (r.p.treeGrid !== !0 && a(r).jqGrid("setSelection", n[2]), a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                        gb: "#gbox_" + a.jgrid.jqID(w),
                                        jqm: d.jqModal,
                                        onClose: b[r.p.id].onClose,
                                        removemodal: b[r.p.id].removemodal,
                                        formprop: !b[r.p.id].recreateForm,
                                        form: b[r.p.id].form
                                    })) : b[r.p.id].clearAfterAdd && i("_empty", r, x)) : (b[r.p.id].reloadAfterSubmit ? (a(r).trigger("reloadGrid"), b[r.p.id].closeAfterEdit || setTimeout(function() {
                                        a(r).jqGrid("setSelection", t[e])
                                    }, 1e3)) : r.p.treeGrid === !0 ? a(r).jqGrid("setTreeRow", t[e], t) : a(r).jqGrid("setRowData", t[e], t), b[r.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                        gb: "#gbox_" + a.jgrid.jqID(w),
                                        jqm: d.jqModal,
                                        onClose: b[r.p.id].onClose,
                                        removemodal: b[r.p.id].removemodal,
                                        formprop: !b[r.p.id].recreateForm,
                                        form: b[r.p.id].form
                                    })), a.isFunction(b[r.p.id].afterComplete) && (c = g, setTimeout(function() {
                                        a(r).triggerHandler("jqGridAddEditAfterComplete", [c, t, a(x), v]), b[r.p.id].afterComplete.call(r, c, t, a(x), v), c = null
                                    }, 500)), (b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) && (a(x).data("disabled", !1), "_empty" !== b[r.p.id]._savedData[r.p.id + "_id"]))
                                    for (l in b[r.p.id]._savedData) b[r.p.id]._savedData.hasOwnProperty(l) && t[l] && (b[r.p.id]._savedData[l] = t[l]);
                                b[r.p.id].processing = !1;
                                try {
                                    a(":input:visible", x)[0].focus()
                                } catch (m) {}
                            }
                        }, a.jgrid.ajaxOptions, b[r.p.id].ajaxEditOptions);
                        if (y.url || b[r.p.id].useDataProxy || (a.isFunction(r.p.dataProxy) ? b[r.p.id].useDataProxy = !0 : (n[0] = !1, n[1] += " " + F.nourl)), n[0])
                            if (b[r.p.id].useDataProxy) {
                                var B = r.p.dataProxy.call(r, y, "set_" + r.p.id);
                                void 0 === B && (B = [!0, ""]), B[0] === !1 ? (n[0] = !1, n[1] = B[1] || "Error deleting the selected row!") : (y.data.oper === p.addoper && b[r.p.id].closeAfterAdd && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: "#gbox_" + a.jgrid.jqID(w),
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }), y.data.oper === p.editoper && b[r.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: "#gbox_" + a.jgrid.jqID(w),
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }))
                            } else "clientArray" === y.url ? (b[r.p.id].reloadAfterSubmit = !1, t = y.data, y.complete({
                                status: 200,
                                statusText: ""
                            }, "")) : a.ajax(y)
                    }
                    n[0] === !1 && (a(".FormError", x).html(n[1]), a(".FormError", x).show())
                }

                function l(a, b) {
                    var c, d = !1;
                    for (c in a)
                        if (a.hasOwnProperty(c) && a[c] != b[c]) {
                            d = !0;
                            break
                        }
                    return d
                }

                function m() {
                    var c = !0;
                    return a(".FormError", x).hide(), b[r.p.id].checkOnUpdate && (t = {}, e(), u = l(t, b[r.p.id]._savedData), u && (a(x).data("disabled", !0), a(".confirm", "#" + A.themodal).show(), c = !1)), c
                }

                function n() {
                    var b;
                    if ("_empty" !== c && void 0 !== r.p.savedRow && r.p.savedRow.length > 0 && a.isFunction(a.fn.jqGrid.restoreRow))
                        for (b = 0; b < r.p.savedRow.length; b++)
                            if (r.p.savedRow[b].id === c) {
                                a(r).jqGrid("restoreRow", c);
                                break
                            }
                }

                function o(b, c) {
                    var d = c[1].length - 1;
                    0 === b ? a("#pData", s).addClass(h.disabled) : void 0 !== c[1][b - 1] && a("#" + a.jgrid.jqID(c[1][b - 1])).hasClass(h.disabled) ? a("#pData", s).addClass(h.disabled) : a("#pData", s).removeClass(h.disabled), b === d ? a("#nData", s).addClass(h.disabled) : void 0 !== c[1][b + 1] && a("#" + a.jgrid.jqID(c[1][b + 1])).hasClass(h.disabled) ? a("#nData", s).addClass(h.disabled) : a("#nData", s).removeClass(h.disabled)
                }

                function p() {
                    var b = a(r).jqGrid("getDataIDs"),
                        c = a("#id_g", z).val(),
                        d = a.inArray(c, b);
                    return [d, b]
                }

                function q(a) {
                    var b = "";
                    return "string" == typeof a && (b = a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(a, b) {
                        return '<span id="' + b + '" ></span>'
                    })), b
                }
                var r = this;
                if (r.grid && c) {
                    var s, t, u, v, w = r.p.id,
                        x = "FrmGrid_" + w,
                        y = "TblGrid_" + w,
                        z = "#" + a.jgrid.jqID(y),
                        A = {
                            themodal: "editmod" + w,
                            modalhead: "edithd" + w,
                            modalcontent: "editcnt" + w,
                            scrollelm: x
                        },
                        B = !0,
                        C = 1,
                        D = 0,
                        E = "string" == typeof b[r.p.id].template && b[r.p.id].template.length > 0,
                        F = a.jgrid.getRegional(this, "errors");
                    b[r.p.id].styleUI = r.p.styleUI || "jQueryUI", "new" === c ? (c = "_empty", v = "add", d.caption = b[r.p.id].addCaption) : (d.caption = b[r.p.id].editCaption, v = "edit"), d.recreateForm || a(r).data("formProp") && a.extend(b[a(this)[0].p.id], a(r).data("formProp"));
                    var G = !0;
                    d.checkOnUpdate && d.jqModal && !d.modal && (G = !1);
                    var H, I = isNaN(b[a(this)[0].p.id].dataheight) ? b[a(this)[0].p.id].dataheight : b[a(this)[0].p.id].dataheight + "px",
                        J = isNaN(b[a(this)[0].p.id].datawidth) ? b[a(this)[0].p.id].datawidth : b[a(this)[0].p.id].datawidth + "px",
                        K = a("<form name='FormPost' id='" + x + "' class='FormGrid' onSubmit='return false;' style='width:" + J + ";height:" + I + ";'></form>").data("disabled", !1);
                    if (E ? (H = q(b[a(this)[0].p.id].template), s = z) : (H = a("<table id='" + y + "' class='EditTable ui-common-table'><tbody></tbody></table>"), s = z + "_2"), x = "#" + a.jgrid.jqID(x), a(K).append("<div class='FormError " + h.error + "' style='display:none;'></div>"), a(K).append("<div class='tinfo topinfo'>" + b[r.p.id].topinfo + "</div>"), a(r.p.colModel).each(function() {
                            var a = this.formoptions;
                            C = Math.max(C, a ? a.colpos || 0 : 0), D = Math.max(D, a ? a.rowpos || 0 : 0)
                        }), a(K).append(H), B = a(r).triggerHandler("jqGridAddEditBeforeInitData", [K, v]), void 0 === B && (B = !0), B && a.isFunction(b[r.p.id].beforeInitData) && (B = b[r.p.id].beforeInitData.call(r, K, v)), B !== !1) {
                        n(), f(c, r, H, C);
                        var L = "rtl" === r.p.direction ? !0 : !1,
                            M = L ? "nData" : "pData",
                            N = L ? "pData" : "nData",
                            O = "<a href='#' id='" + M + "' class='" + g.icon_prev + "'></a>",
                            P = "<a href='#' id='" + N + "' class='" + g.icon_next + "'></a>",
                            Q = "<a href='#' id='sData' class='" + g.icon_save + "'>" + d.bSubmit + "</a>",
                            R = "<a href='#' id='cData' class='" + g.icon_cancel + "'>" + d.bCancel + "</a>",
                            S = "<table style='height:auto' class='EditTable ui-common-table' id='" + y + "_2'><tbody></tr><tr id='Act_Buttons'><td class='navButton'>" + (L ? P + O : O + P) + "</td><td class='EditButton'>" + Q + R + "</td></tr>";
                        if (S += "</tbody></table>", D > 0) {
                            var T = [];
                            a.each(a(H)[0].rows, function(a, b) {
                                T[a] = b
                            }), T.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }), a.each(T, function(b, c) {
                                a("tbody", H).append(c)
                            })
                        }
                        d.gbox = "#gbox_" + a.jgrid.jqID(w);
                        var U = !1;
                        d.closeOnEscape === !0 && (d.closeOnEscape = !1, U = !0);
                        var V;
                        E ? (a(K).find("#pData").replaceWith(O), a(K).find("#nData").replaceWith(P), a(K).find("#sData").replaceWith(Q), a(K).find("#cData").replaceWith(R), V = a("<div id=" + y + "></div>").append(K)) : V = a("<div></div>").append(K).append(S), a(K).append("<div class='binfo topinfo bottominfo'>" + b[r.p.id].bottominfo + "</div>"), V = a("<div></div>").append(K).append(S);
                        var W = a('<div id="' + A.themodal + '" data-role="popup" data-dismissable="false" data-overlay-theme="a" data-theme="' + r.p.dataTheme + '" style="width:' + J + '"><div id="' + A.modalhead + '"  data-role="header" class="popupheader" > <b>' + d.caption + '</b></div><div id="' + A.modalcontent + '"  data-role="content" class="ui-jqdialog-content"></div></div>');
                        if (a("#" + A.modalcontent, W).append(V), a.mobile.activePage.append(W).trigger("pagecreate"), L && (a("#pData, #nData", z + "_2").css("float", "right"), a(".EditButton", z + "_2").css("text-align", "left")), b[r.p.id].topinfo && a(".tinfo", x).show(), b[r.p.id].bottominfo && a(".binfo", x).show(), V = null, S = null, a("#" + a.jgrid.jqID(A.themodal)).keydown(function(c) {
                                var e = c.target;
                                if (a(x).data("disabled") === !0) return !1;
                                if (b[r.p.id].savekey[0] === !0 && c.which === b[r.p.id].savekey[1] && "TEXTAREA" !== e.tagName) return a("#sData", z + "_2").trigger("click"), !1;
                                if (27 === c.which) return m() ? (U && a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: d.gbox,
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }), !1) : !1;
                                if (b[r.p.id].navkeys[0] === !0) {
                                    if ("_empty" === a("#id_g", z).val()) return !0;
                                    if (c.which === b[r.p.id].navkeys[1]) return a("#pData", s).trigger("click"), !1;
                                    if (c.which === b[r.p.id].navkeys[2]) return a("#nData", s).trigger("click"), !1
                                }
                            }), d.checkOnUpdate && (a("a.ui-jqdialog-titlebar-close span", "#" + a.jgrid.jqID(A.themodal)).removeClass("jqmClose"), a("a.ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(A.themodal)).unbind("click").click(function() {
                                return m() ? (a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: "#gbox_" + a.jgrid.jqID(w),
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }), !1) : !1
                            })), b[r.p.id].checkOnSubmit || b[r.p.id].checkOnUpdate) {
                            Q = "<a href='#' id='sNew' data-role='button' data-inline='true' data-mini='true' style='z-index:1002'>" + d.bYes + "</a>", P = "<a href='#' id='nNew' data-role='button' data-inline='true' data-mini='true' style='z-index:1002'>" + d.bNo + "</a>", R = "<a href='#' id='cNew' data-role='button' data-inline='true' data-mini='true' style='z-index:1002'>" + d.bExit + "</a>";
                            var X = d.zIndex || 999;
                            X++, a("<div class='" + d.overlayClass + " jqgrid-overlay confirm' style='z-index:" + X + ";display:none;'>&#160;</div><div class='confirm ui-jqconfirm " + h.content + "' style='z-index:" + (X + 1) + "'>" + d.saveData + "<br/><br/>" + Q + P + R + "</div>").insertAfter(x), a("#sNew", "#" + a.jgrid.jqID(A.themodal)).click(function() {
                                return k(), a(x).data("disabled", !1), a(".confirm", "#" + a.jgrid.jqID(A.themodal)).hide(), !1
                            }), a("#nNew", "#" + a.jgrid.jqID(A.themodal)).click(function() {
                                return a(".confirm", "#" + a.jgrid.jqID(A.themodal)).hide(), a(x).data("disabled", !1), setTimeout(function() {
                                    a(":input:visible", x)[0].focus()
                                }, 0), !1
                            }), a("#cNew", "#" + a.jgrid.jqID(A.themodal)).click(function() {
                                return a(".confirm", "#" + a.jgrid.jqID(A.themodal)).hide(), a(x).data("disabled", !1), a.jgrid.hideModal("#" + a.jgrid.jqID(A.themodal), {
                                    gb: "#gbox_" + a.jgrid.jqID(w),
                                    jqm: d.jqModal,
                                    onClose: b[r.p.id].onClose,
                                    removemodal: b[r.p.id].removemodal,
                                    formprop: !b[r.p.id].recreateForm,
                                    form: b[r.p.id].form
                                }), !1
                            })
                        }
                        a(r).triggerHandler("jqGridAddEditInitializeForm", [a(x), v]), a.isFunction(b[r.p.id].onInitializeForm) && b[r.p.id].onInitializeForm.call(r, a(x), v), "_empty" !== c && b[r.p.id].viewPagerButtons ? a("#pData,#nData", s).show() : a("#pData,#nData", s).hide(), a(r).triggerHandler("jqGridAddEditBeforeShowForm", [a(x), v]), a.isFunction(b[r.p.id].beforeShowForm) && b[r.p.id].beforeShowForm.call(r, a(x), v), a("#" + a.jgrid.jqID(A.themodal)).data("onClose", b[r.p.id].onClose), a("#sData", s).click(function() {
                            return t = {}, a(".FormError", x).hide(), e(), "_empty" === t[r.p.id + "_id"] ? k() : d.checkOnSubmit === !0 ? (u = l(t, b[r.p.id]._savedData), u ? (a(x).data("disabled", !0), a(".confirm", "#" + a.jgrid.jqID(A.themodal)).show()) : k()) : k(), !1
                        }), a("#cData", s).click(function() {
                            return m() ? (a("#" + A.themodal).popup("close"), !1) : !1
                        }), a("#nData", s).click(function() {
                            if (!m()) return !1;
                            a(".FormError", x).hide();
                            var b = p();
                            if (b[0] = parseInt(b[0], 10), -1 !== b[0] && b[1][b[0] + 1]) {
                                a(r).triggerHandler("jqGridAddEditClickPgButtons", ["next", a(x), b[1][b[0]]]);
                                var c;
                                if (a.isFunction(d.onclickPgButtons) && (c = d.onclickPgButtons.call(r, "next", a(x), b[1][b[0]]), void 0 !== c && c === !1)) return !1;
                                if (a("#" + a.jgrid.jqID(b[1][b[0] + 1])).hasClass(h.disabled)) return !1;
                                i(b[1][b[0] + 1], r, x), a(r).jqGrid("setSelection", b[1][b[0] + 1]), a(r).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", a(x), b[1][b[0]]]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(r, "next", a(x), b[1][b[0] + 1]), o(b[0] + 1, b)
                            }
                            return !1
                        }), a("#pData", s).click(function() {
                            if (!m()) return !1;
                            a(".FormError", x).hide();
                            var b = p();
                            if (-1 !== b[0] && b[1][b[0] - 1]) {
                                a(r).triggerHandler("jqGridAddEditClickPgButtons", ["prev", a(x), b[1][b[0]]]);
                                var c;
                                if (a.isFunction(d.onclickPgButtons) && (c = d.onclickPgButtons.call(r, "prev", a(x), b[1][b[0]]), void 0 !== c && c === !1)) return !1;
                                if (a("#" + a.jgrid.jqID(b[1][b[0] - 1])).hasClass(h.disabled)) return !1;
                                i(b[1][b[0] - 1], r, x), a(r).jqGrid("setSelection", b[1][b[0] - 1]), a(r).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", a(x), b[1][b[0]]]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(r, "prev", a(x), b[1][b[0] - 1]), o(b[0] - 1, b)
                            }
                            return !1
                        }), setTimeout(function() {
                            a("#" + A.themodal).popup(), a("#" + A.themodal).popup("open", {
                                positionTo: d.gbox
                            }), a("#" + A.themodal).enhanceWithin()
                        }, 100), a(document).on("popupafterclose", "#" + A.themodal, function() {
                            a(this).remove()
                        }), a(r).triggerHandler("jqGridAddEditAfterShowForm", [a(x), v]), a.isFunction(b[r.p.id].afterShowForm) && b[r.p.id].afterShowForm.call(r, a(x), v);
                        var Y = p();
                        o(Y[0], Y)
                    }
                }
            })
        },
        viewGridRow: function(c, d) {
            var e = a.jgrid.getRegional(this[0], "view"),
                f = this[0].p.styleUI,
                g = a.jgrid.styleUI[f].formedit,
                h = a.jgrid.styleUI[f].common;
            return d = a.extend(!0, {
                top: 0,
                left: 0,
                width: 500,
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                jqModal: !0,
                closeOnEscape: !1,
                labelswidth: "30%",
                closeicon: [],
                navkeys: [!1, 38, 40],
                onClose: null,
                beforeShowForm: null,
                beforeInitData: null,
                viewPagerButtons: !0,
                recreateForm: !1,
                removemodal: !0,
                form: "view"
            }, e, d || {}), b[a(this)[0].p.id] = d, this.each(function() {
                function e() {
                    (b[l.p.id].closeOnEscape === !0 || b[l.p.id].navkeys[0] === !0) && setTimeout(function() {
                        a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(r.modalhead)).attr("tabindex", "-1").focus()
                    }, 0)
                }

                function f(b, c, e, f) {
                    var g, i, j, k, l, m, n, o, p, q = 0,
                        r = [],
                        s = !1,
                        t = "<td class='CaptionTD form-view-label " + h.content + "' width='" + d.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset " + h.content + "'>&#160;</td>",
                        u = "",
                        v = "<td class='CaptionTD form-view-label " + h.content + "'>&#160;</td><td class='DataTD form-view-data " + h.content + "'>&#160;</td>",
                        w = ["integer", "number", "currency"],
                        x = 0,
                        y = 0;
                    for (m = 1; f >= m; m++) u += 1 === m ? t : v;
                    if (a(c.p.colModel).each(function() {
                            i = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, i || "right" !== this.align || (this.formatter && -1 !== a.inArray(this.formatter, w) ? x = Math.max(x, parseInt(this.width, 10)) : y = Math.max(y, parseInt(this.width, 10)))
                        }), n = 0 !== x ? x : 0 !== y ? y : 0, s = a(c).jqGrid("getInd", b), a(c.p.colModel).each(function(b) {
                            if (g = this.name, o = !1, i = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, l = i ? "style='display:none'" : "", p = "boolean" != typeof this.viewable ? !0 : this.viewable, "cb" !== g && "subgrid" !== g && "rn" !== g && p) {
                                k = s === !1 ? "" : g === c.p.ExpandColumn && c.p.treeGrid === !0 ? a("td:eq(" + b + ")", c.rows[s]).text() : a("td:eq(" + b + ")", c.rows[s]).html(), o = "right" === this.align && 0 !== n ? !0 : !1;
                                var d = a.extend({}, {
                                        rowabove: !1,
                                        rowcontent: ""
                                    }, this.formoptions || {}),
                                    h = parseInt(d.rowpos, 10) || q + 1,
                                    m = parseInt(2 * (parseInt(d.colpos, 10) || 1), 10);
                                if (d.rowabove) {
                                    var t = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + d.rowcontent + "</td></tr>");
                                    a(e).append(t), t[0].rp = h
                                }
                                j = a(e).find("tr[rowpos=" + h + "]"), 0 === j.length && (j = a("<tr " + l + " rowpos='" + h + "'></tr>").addClass("FormData").attr("id", "trv_" + g), a(j).append(u), a(e).append(j), j[0].rp = h), a("td:eq(" + (m - 2) + ")", j[0]).html("<b>" + (void 0 === d.label ? c.p.colNames[b] : d.label) + "</b>"), a("td:eq(" + (m - 1) + ")", j[0]).append("<span>" + k + "</span>").attr("id", "v_" + g), o && a("td:eq(" + (m - 1) + ") span", j[0]).css({
                                    "text-align": "right",
                                    width: n + "px"
                                }), r[q] = b, q++
                            }
                        }), q > 0) {
                        var z = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + b + "'/></td></tr>");
                        z[0].rp = q + 99, a(e).append(z)
                    }
                    return r
                }

                function i(b, c) {
                    var d, e, f, g, h = 0;
                    g = a(c).jqGrid("getInd", b, !0), g && (a("td", g).each(function(b) {
                        d = c.p.colModel[b].name, e = c.p.colModel[b].editrules && c.p.colModel[b].editrules.edithidden === !0 ? !1 : c.p.colModel[b].hidden === !0 ? !0 : !1, "cb" !== d && "subgrid" !== d && "rn" !== d && (f = d === c.p.ExpandColumn && c.p.treeGrid === !0 ? a(this).text() : a(this).html(), d = a.jgrid.jqID("v_" + d), a("#" + d + " span", "#" + o).html(f), e && a("#" + d, "#" + o).parents("tr:first").hide(), h++)
                    }), h > 0 && a("#id_g", "#" + o).val(b))
                }

                function j(b, c) {
                    var d = c[1].length - 1;
                    0 === b ? a("#pData", "#" + o + "_2").addClass(h.disabled) : void 0 !== c[1][b - 1] && a("#" + a.jgrid.jqID(c[1][b - 1])).hasClass(h.disabled) ? a("#pData", o + "_2").addClass(h.disabled) : a("#pData", "#" + o + "_2").removeClass(h.disabled), b === d ? a("#nData", "#" + o + "_2").addClass(h.disabled) : void 0 !== c[1][b + 1] && a("#" + a.jgrid.jqID(c[1][b + 1])).hasClass(h.disabled) ? a("#nData", o + "_2").addClass(h.disabled) : a("#nData", "#" + o + "_2").removeClass(h.disabled)
                }

                function k() {
                    var b = a(l).jqGrid("getDataIDs"),
                        c = a("#id_g", "#" + o).val(),
                        d = a.inArray(c, b);
                    return [d, b]
                }
                var l = this;
                if (l.grid && c) {
                    var m = l.p.id,
                        n = "ViewGrid_" + a.jgrid.jqID(m),
                        o = "ViewTbl_" + a.jgrid.jqID(m),
                        p = "ViewGrid_" + m,
                        q = "ViewTbl_" + m,
                        r = {
                            themodal: "viewmod" + m,
                            modalhead: "viewhd" + m,
                            modalcontent: "viewcnt" + m,
                            scrollelm: n
                        },
                        s = a.isFunction(b[l.p.id].beforeInitData) ? b[l.p.id].beforeInitData : !1,
                        t = !0,
                        u = 1,
                        v = 0;
                    b[l.p.id].styleUI = l.p.styleUI || "jQueryUI", d.recreateForm || a(l).data("viewProp") && a.extend(b[a(this)[0].p.id], a(l).data("viewProp"));
                    var w = isNaN(b[a(this)[0].p.id].dataheight) ? b[a(this)[0].p.id].dataheight : b[a(this)[0].p.id].dataheight + "px",
                        x = isNaN(b[a(this)[0].p.id].datawidth) ? b[a(this)[0].p.id].datawidth : b[a(this)[0].p.id].datawidth + "px",
                        y = a("<form name='FormPost' id='" + p + "' class='FormGrid' style='width:" + x + ";height:" + w + ";'></form>"),
                        z = a("<table id='" + q + "' class='EditTable ViewTable'><tbody></tbody></table>");
                    if (a(l.p.colModel).each(function() {
                            var a = this.formoptions;
                            u = Math.max(u, a ? a.colpos || 0 : 0), v = Math.max(v, a ? a.rowpos || 0 : 0)
                        }), a(y).append(z), s && (t = s.call(l, y), void 0 === t && (t = !0)), t !== !1) {
                        f(c, l, z, u);
                        var A = "rtl" === l.p.direction ? !0 : !1,
                            B = A ? "nData" : "pData",
                            C = A ? "pData" : "nData",
                            D = "<a href='#' id='" + B + "' class='" + g.icon_prev + "'></a>",
                            E = "<a href='#' id='" + C + "' class='" + g.icon_next + "'></span></a>",
                            F = "<a id='cData' class ='" + g.icon_close + "'>" + d.bClose + "</a>";
                        if (v > 0) {
                            var G = [];
                            a.each(a(z)[0].rows, function(a, b) {
                                G[a] = b
                            }), G.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }), a.each(G, function(b, c) {
                                a("tbody", z).append(c)
                            })
                        }
                        d.gbox = "#gbox_" + a.jgrid.jqID(m);
                        var H = a("<div></div>").append(y).append("<table border='0' class='EditTable' id='" + o + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + d.labelswidth + "'>" + (A ? E + D : D + E) + "</td><td class='EditButton'>" + F + "</td></tr></tbody></table>"),
                            I = a('<div id="' + r.themodal + '" data-role="popup" data-overlay-theme="a" data-dismissible="false" style="width:' + d.width + 'px;" data-theme="' + l.p.dataTheme + '" ><div id="' + r.modalhead + '"  data-role="header" class="popupheader"> <b>' + d.caption + '</b></div><div id="' + r.modalcontent + '"  data-role="main" class="ui-content ui-jqdialog-content"></div></div>');
                        a("#" + r.modalcontent, I).append(H), a.mobile.activePage.append(I).trigger("pagecreate"), A && (a("#pData, #nData", "#" + o + "_2").css("float", "right"), a(".EditButton", "#" + o + "_2").css("text-align", "left")), d.viewPagerButtons || a("#pData, #nData", "#" + o + "_2").hide(), a("#" + r.themodal).keydown(function(c) {
                            if (27 === c.which) return b[l.p.id].closeOnEscape && a.jgrid.hideModal("#" + a.jgrid.jqID(r.themodal), {
                                gb: d.gbox,
                                jqm: d.jqModal,
                                onClose: d.onClose,
                                removemodal: b[l.p.id].removemodal,
                                formprop: !b[l.p.id].recreateForm,
                                form: b[l.p.id].form
                            }), !1;
                            if (d.navkeys[0] === !0) {
                                if (c.which === d.navkeys[1]) return a("#pData", "#" + o + "_2").trigger("click"), !1;
                                if (c.which === d.navkeys[2]) return a("#nData", "#" + o + "_2").trigger("click"), !1
                            }
                        }), a.isFunction(d.beforeShowForm) && d.beforeShowForm.call(l, a("#" + n)), a(".fm-button:not(." + h.disabled + ")", "#" + o + "_2").hover(function() {
                            a(this).addClass(h.hover)
                        }, function() {
                            a(this).removeClass(h.hover)
                        }), e(), a("#cData", "#" + o + "_2").click(function() {
                            return a("#" + r.themodal).popup("close"), !1
                        }), a("#nData", "#" + o + "_2").click(function() {
                            a("#FormError", "#" + o).hide();
                            var b = k();
                            return b[0] = parseInt(b[0], 10), -1 !== b[0] && b[1][b[0] + 1] && (a.isFunction(d.onclickPgButtons) && d.onclickPgButtons.call(l, "next", a("#" + n), b[1][b[0]]), i(b[1][b[0] + 1], l), a(l).jqGrid("setSelection", b[1][b[0] + 1]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(l, "next", a("#" + n), b[1][b[0] + 1]), j(b[0] + 1, b)), e(), !1
                        }), a("#pData", "#" + o + "_2").click(function() {
                            a("#FormError", "#" + o).hide();
                            var b = k();
                            return -1 !== b[0] && b[1][b[0] - 1] && (a.isFunction(d.onclickPgButtons) && d.onclickPgButtons.call(l, "prev", a("#" + n), b[1][b[0]]), i(b[1][b[0] - 1], l), a(l).jqGrid("setSelection", b[1][b[0] - 1]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(l, "prev", a("#" + n), b[1][b[0] - 1]), j(b[0] - 1, b)), e(), !1
                        }), setTimeout(function() {
                            a("#" + r.themodal).popup(), a("#" + r.themodal).enhanceWithin(), a("#" + r.themodal).popup("open", {
                                positionTo: d.gbox
                            })
                        }, 100), a(document).on("popupafterclose", "#" + r.themodal, function() {
                            a(this).remove()
                        });
                        var J = k();
                        j(J[0], J)
                    }
                }
            })
        },
        delGridRow: function(c, d) {
            var e = a.jgrid.getRegional(this[0], "del"),
                f = this[0].p.styleUI,
                g = (a.jgrid.styleUI[f].formedit, a.jgrid.styleUI[f].common);
            return d = a.extend(!0, {
                top: 0,
                left: 0,
                width: 240,
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: "",
                mtype: "POST",
                reloadAfterSubmit: !0,
                beforeShowForm: null,
                beforeInitData: null,
                afterShowForm: null,
                beforeSubmit: null,
                onclickSubmit: null,
                afterSubmit: null,
                jqModal: !0,
                closeOnEscape: !1,
                delData: {},
                delicon: [],
                cancelicon: [],
                onClose: null,
                ajaxDelOptions: {},
                processing: !1,
                serializeDelData: null,
                useDataProxy: !1
            }, e, d || {}), b[a(this)[0].p.id] = d, this.each(function() {
                var e = this;
                if (e.grid && c) {
                    var f, h, i, j, k = a.isFunction(b[e.p.id].beforeShowForm),
                        l = a.isFunction(b[e.p.id].afterShowForm),
                        m = a.isFunction(b[e.p.id].beforeInitData) ? b[e.p.id].beforeInitData : !1,
                        n = e.p.id,
                        o = {},
                        p = !0,
                        q = "DelTbl_" + a.jgrid.jqID(n),
                        r = "DelTbl_" + n,
                        s = {
                            themodal: "delmod" + n,
                            modalhead: "delhd" + n,
                            modalcontent: "delcnt" + n,
                            scrollelm: q
                        };
                    if (b[e.p.id].styleUI = e.p.styleUI || "jQueryUI", a.isArray(c) && (c = c.join()), void 0 !== a("#" + a.jgrid.jqID(s.themodal))[0]) {
                        if (m && (p = m.call(e, a("#" + q)), void 0 === p && (p = !0)), p === !1) return;
                        a("#DelData>td", "#" + q).text(c), a("#DelError", "#" + q).hide(), b[e.p.id].processing === !0 && (b[e.p.id].processing = !1,
                            a("#dData", "#" + q).removeClass(g.active)), k && b[e.p.id].beforeShowForm.call(e, a("#" + q)), a.jgrid.viewModal("#" + a.jgrid.jqID(s.themodal), {
                            gbox: "#gbox_" + a.jgrid.jqID(n),
                            jqm: b[e.p.id].jqModal,
                            jqM: !1,
                            overlay: b[e.p.id].overlay,
                            modal: b[e.p.id].modal
                        }), l && b[e.p.id].afterShowForm.call(e, a("#" + q))
                    } else {
                        var t = isNaN(b[e.p.id].dataheight) ? b[e.p.id].dataheight : b[e.p.id].dataheight + "px",
                            u = isNaN(d.datawidth) ? d.datawidth : d.datawidth + "px",
                            v = "<div id='" + r + "' class='formdata' style='width:" + u + ";overflow:auto;position:relative;height:" + t + ";'>";
                        v += "<table class='DelTable'><tbody>", v += "<tr id='DelError' style='display:none'><td class='" + g.error + "'></td></tr>", v += "<tr id='DelData' style='display:none'><td >" + c + "</td></tr>", v += '<tr><td class="delmsg" style="white-space:pre;">' + b[e.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>", v += "</tbody></table></div>";
                        var w = "<a href='#' id='dData' class ='ui-btn ui-btn-inline ui-mini ui-corner-all'>" + d.bSubmit + "</a>",
                            x = "<a href='#' id='eData' class ='ui-btn ui-btn-inline ui-mini ui-corner-all'>" + d.bCancel + "</a>";
                        v += "<table class='EditTable ui-common-table' id='" + q + "_2'><tbody><tr><td class='DelButton EditButton'>" + w + "&#160;" + x + "</td></tr></tbody></table>", d.gbox = "#gbox_" + a.jgrid.jqID(n);
                        var y = '<div id="' + s.themodal + '" data-role="popup" data-theme="' + e.p.dataTheme + '" data-dismissible="false" style="width:auto"><div id="' + s.modalhead + '"  data-role="header" style="text-align:center"> <h3>' + d.caption + '</h3></div><div id="' + s.modalcontent + '"  data-role="main" class="ui-content ui-jqdialog-content">' + v + "</div></div>";
                        if (a.mobile.activePage.append(y).trigger("pagecreate"), m && (p = m.call(e, a(v)), void 0 === p && (p = !0)), p === !1) return;
                        a("#dData", "#" + q + "_2").click(function() {
                            var c, k = [!0, ""],
                                l = a("#DelData>td", "#" + q).text();
                            if (o = {}, a.isFunction(b[e.p.id].onclickSubmit) && (o = b[e.p.id].onclickSubmit.call(e, b[e.p.id], l) || {}), a.isFunction(b[e.p.id].beforeSubmit) && (k = b[e.p.id].beforeSubmit.call(e, l)), k[0] && !b[e.p.id].processing) {
                                if (b[e.p.id].processing = !0, i = e.p.prmNames, f = a.extend({}, b[e.p.id].delData, o), j = i.oper, f[j] = i.deloper, h = i.id, l = String(l).split(","), !l.length) return !1;
                                for (c in l) l.hasOwnProperty(c) && (l[c] = a.jgrid.stripPref(e.p.idPrefix, l[c]));
                                f[h] = l.join(), a(this).addClass(g.active);
                                var m = a.extend({
                                    url: b[e.p.id].url || a(e).jqGrid("getGridParam", "editurl"),
                                    type: b[e.p.id].mtype,
                                    data: a.isFunction(b[e.p.id].serializeDelData) ? b[e.p.id].serializeDelData.call(e, f) : f,
                                    complete: function(c, h) {
                                        var i;
                                        if (a("#dData", "#" + q + "_2").removeClass(g.active), c.status >= 300 && 304 !== c.status ? (k[0] = !1, a.isFunction(b[e.p.id].errorTextFormat) ? k[1] = b[e.p.id].errorTextFormat.call(e, c) : k[1] = h + " Status: '" + c.statusText + "'. Error code: " + c.status) : a.isFunction(b[e.p.id].afterSubmit) && (k = b[e.p.id].afterSubmit.call(e, c, f)), k[0] === !1) a("#DelError>td", "#" + q).html(k[1]), a("#DelError", "#" + q).show();
                                        else {
                                            if (b[e.p.id].reloadAfterSubmit && "local" !== e.p.datatype) a(e).trigger("reloadGrid");
                                            else {
                                                if (e.p.treeGrid === !0) try {
                                                    a(e).jqGrid("delTreeNode", e.p.idPrefix + l[0])
                                                } catch (j) {} else
                                                    for (i = 0; i < l.length; i++) a(e).jqGrid("delRowData", e.p.idPrefix + l[i]);
                                                e.p.selrow = null, e.p.selarrrow = []
                                            }
                                            a.isFunction(b[e.p.id].afterComplete) && setTimeout(function() {
                                                b[e.p.id].afterComplete.call(e, c, l)
                                            }, 500)
                                        }
                                        b[e.p.id].processing = !1, k[0] && a.jgrid.hideModal("#" + a.jgrid.jqID(s.themodal), {
                                            gb: "#gbox_" + a.jgrid.jqID(n),
                                            jqm: d.jqModal,
                                            onClose: b[e.p.id].onClose
                                        })
                                    }
                                }, a.jgrid.ajaxOptions, b[e.p.id].ajaxDelOptions);
                                if (m.url || b[e.p.id].useDataProxy || (a.isFunction(e.p.dataProxy) ? b[e.p.id].useDataProxy = !0 : (k[0] = !1, k[1] += " " + a.jgrid.getRegional(e, "errors.nourl"))), k[0])
                                    if (b[e.p.id].useDataProxy) {
                                        var p = e.p.dataProxy.call(e, m, "del_" + e.p.id);
                                        void 0 === p && (p = [!0, ""]), p[0] === !1 ? (k[0] = !1, k[1] = p[1] || "Error deleting the selected row!") : a.jgrid.hideModal("#" + a.jgrid.jqID(s.themodal), {
                                            gb: "#gbox_" + a.jgrid.jqID(n),
                                            jqm: d.jqModal,
                                            onClose: b[e.p.id].onClose
                                        })
                                    } else "clientArray" === m.url ? (f = m.data, m.complete({
                                        status: 200,
                                        statusText: ""
                                    }, "")) : a.ajax(m)
                            }
                            return k[0] === !1 && (a("#DelError>td", "#" + q).html(k[1]), a("#DelError", "#" + q).show()), !1
                        }), a("#eData", "#" + q + "_2").click(function() {
                            return a("#" + s.themodal).popup("close"), !1
                        }), k && b[e.p.id].beforeShowForm.call(e, a("#" + q)), setTimeout(function() {
                            a("#" + s.themodal).popup(), a("#" + s.themodal).popup("open", {
                                positionTo: d.gbox
                            }), a("#" + s.themodal).enhanceWithin()
                        }, 100), a(document).on("popupafterclose", "#" + s.themodal, function() {
                            a(this).remove()
                        }), l && b[e.p.id].afterShowForm.call(e, a("#" + q))
                    }
                    b[e.p.id].closeOnEscape === !0 && setTimeout(function() {
                        a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(s.modalhead)).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        },
        navGrid: function(b, c, d, e, f, g, h) {
            var i = a.jgrid.getRegional(this[0], "nav"),
                j = this[0].p.styleUI,
                k = a.jgrid.styleUI[j].navigator,
                l = a.jgrid.styleUI[j].common;
            return c = a.extend({
                edit: !0,
                editicon: k.icon_edit_nav,
                add: !0,
                addicon: k.icon_add_nav,
                del: !0,
                delicon: k.icon_del_nav,
                search: !0,
                searchicon: k.icon_search_nav,
                refresh: !0,
                refreshicon: k.icon_refresh_nav,
                refreshstate: "firstpage",
                view: !1,
                viewicon: k.icon_view_nav,
                position: "left",
                closeOnEscape: !0,
                beforeRefresh: null,
                afterRefresh: null,
                cloneToTop: !1,
                alertwidth: 200,
                alertheight: "auto",
                alerttop: null,
                alertleft: null,
                alertzIndex: null
            }, i, c || {}), this.each(function() {
                if (!this.p.navGrid) {
                    var j, k = {
                            themodal: "alertmod_" + this.p.id,
                            modalhead: "alerthd_" + this.p.id,
                            modalcontent: "alertcnt_" + this.p.id
                        },
                        m = this;
                    if (m.grid && "string" == typeof b) {
                        a(m).data("navGrid") || a(m).data("navGrid", c), j = a(m).data("navGrid"), m.p.force_regional && (j = a.extend(j, i)), void 0 === a("#" + k.themodal)[0] && a("#gbox_" + m.p.id).after('<div data-theme="' + m.p.dataTheme + '" data-role="popup" id="' + k.themodal + '" data-overlay-theme="a" style="max-width:' + j.alertwidth + 'px;" class="ui-corner-all"><div data-role="header" class="ui-corner-top"><h1>' + j.alertcap + '</h1></div><div data-role="content" class="ui-corner-bottom ui-content" id="alid">' + j.alerttext + '</div><div style="text-align:center;"><a href="#" data-theme="' + m.p.dataTheme + '" data-role="button" data-inline="true" data-mini="true" data-rel="back" >OK</a></div></div>');
                        var n, o = 1;
                        for (j.cloneToTop && m.p.toppager && (o = 2), n = 0; o > n; n++) {
                            var p, q, r, s, t = a("<table class='ui-pg-table navtable ui-common-table' style='float:left;table-layout:auto;height:100%;'><tbody><tr></tr></tbody></table>");
                            "<td class='ui-pg-button " + l.disabled + "' style='width:4px;'><span class='ui-separator'></span></td>";
                            0 === n ? (q = b, r = m.p.id, q === m.p.toppager && (r += "_top", o = 1)) : (q = m.p.toppager, r = m.p.id + "_top"), "rtl" === m.p.direction && a(t).attr("dir", "rtl").css("float", "right"), s = "<div class='ui-pg-div'>", s += '<select class="ui-nav-select" name="select-nav" id="select-nav" data-mini="true" data-native-menu="false" data-inline="true" data-shadow="false" data-theme="' + m.p.dataTheme + '">', s += '<option value="choose-one" data-placeholder="true">' + (j.selectcaption || "Actions") + "</option>", p = a("<td class='ui-pg-button ui-corner-all'></td>"), j.add && (e = e || {}, s += '<option id="' + (e.id || "add_" + r) + '" value="add">' + j.addtitle + "</option>"), j.edit && (d = d || {}, s += '<option id="' + (d.id || "edit_" + r) + '" value="edit">' + j.edittitle + "</option>"), j.view && (h = h || {}, s += '<option id="' + (h.id || "view_" + r) + '" value="view">' + j.viewtitle + "</option>"), j.del && (f = f || {}, s += '<option id="' + (f.id || "del_" + r) + '" value="del">' + j.deltitle + "</option>"), j.search && (g = g || {}, s += '<option id="' + (g.id || "search_" + r) + '" value="search">' + j.searchtitle + "</option>"), j.refresh && (s += '<option id="refresh_' + r + '" value="refresh">' + j.refreshtitle + "</option>"), s += "</select></div>", a(p).append(s), a("tr", t).append(p), a(q + "_" + j.position, q).append(t), a("#select-nav").on("change", function(b) {
                                var c, i = a(this).find("option:selected");
                                if (!i.hasClass(l.disabled)) {
                                    var n = a(this).val();
                                    switch (n) {
                                        case "add":
                                            a.isFunction(j.addfunc) ? j.addfunc.call(m) : a(m).jqGrid("editGridRow", "new", e);
                                            break;
                                        case "edit":
                                            c = m.p.selrow, c ? a.isFunction(j.editfunc) ? j.editfunc.call(m, c) : a(m).jqGrid("editGridRow", c, d) : setTimeout(function() {
                                                a("#" + k.themodal).popup("open")
                                            }, 100);
                                            break;
                                        case "view":
                                            c = m.p.selrow, c ? a.isFunction(j.viewfunc) ? j.viewfunc.call(m, c) : a(m).jqGrid("viewGridRow", c, h) : setTimeout(function() {
                                                a("#" + k.themodal).popup("open")
                                            }, 100);
                                            break;
                                        case "del":
                                            var o;
                                            m.p.multiselect ? (o = m.p.selarrrow, 0 === o.length && (o = null)) : o = m.p.selrow, o ? a.isFunction(j.delfunc) ? j.delfunc.call(m, o) : a(m).jqGrid("delGridRow", o, f) : setTimeout(function() {
                                                a("#" + k.themodal).popup("open")
                                            }, 100);
                                            break;
                                        case "search":
                                            a.isFunction(j.searchfunc) ? j.searchfunc.call(m, g) : a(m).jqGrid("searchGrid", g);
                                            break;
                                        case "refresh":
                                            a.isFunction(j.beforeRefresh) && j.beforeRefresh.call(m), m.p.search = !1;
                                            try {
                                                var p = m.p.id;
                                                m.p.postData.filters = "", a("#fbox_" + a.jgrid.jqID(p)).jqFilter("resetFilter"), a.isFunction(m.clearToolbar) && m.clearToolbar.call(m, !1)
                                            } catch (q) {}
                                            a.isFunction(j.beforeRefresh) && j.beforeRefresh.call(m), m.p.search = !1, m.p.resetsearch = !0;
                                            try {
                                                if ("currentfilter" !== j.refreshstate) {
                                                    var p = m.p.id;
                                                    m.p.postData.filters = "";
                                                    try {
                                                        a("#fbox_" + a.jgrid.jqID(p)).jqFilter("resetFilter")
                                                    } catch (r) {}
                                                    a.isFunction(m.clearToolbar) && m.clearToolbar.call(m, !1)
                                                }
                                            } catch (q) {}
                                            switch (j.refreshstate) {
                                                case "firstpage":
                                                    a(m).trigger("reloadGrid", [{
                                                        page: 1
                                                    }]);
                                                    break;
                                                case "current":
                                                case "currentfilter":
                                                    a(m).trigger("reloadGrid", [{
                                                        current: !0
                                                    }])
                                            }
                                            a.isFunction(j.afterRefresh) && j.afterRefresh.call(m);
                                            break;
                                        default:
                                            try {
                                                j.hasOwnProperty(n) && j[n].call(m, b)
                                            } catch (s) {}
                                    }
                                    a(this).val("choose-one")
                                }
                            }), setTimeout(function() {
                                a("#select-nav-button").css({
                                    "margin-top": "-6px"
                                })
                            }, 100), t = null, m.p.navGrid = !0
                        }
                        m.p.storeNavOptions && (m.p.navOptions = j, m.p.editOptions = d, m.p.addOptions = e, m.p.delOptions = f, m.p.searchOptions = g, m.p.viewOptions = h)
                    }
                }
            })
        },
        navButtonAdd: function(b, c) {
            var d = this[0].p.styleUI,
                e = a.jgrid.styleUI[d].navigator;
            return c = a.extend({
                caption: "newButton",
                title: "",
                buttonicon: e.icon_newbutton_nav,
                onClickButton: null,
                position: "last",
                cursor: "pointer"
            }, c || {}), this.each(function() {
                if (this.grid) {
                    "string" == typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var d = a(".navtable", b)[0],
                        e = this;
                    if (d) {
                        if (c.id && void 0 !== a("#" + a.jgrid.jqID(c.id), d)[0]) return;
                        var f = a.jgrid.randId(),
                            g = a("<option value='" + f + "'>" + c.caption + "</option>");
                        c.id && a(g).attr("id", c.id), "first" === c.position ? 0 === d.rows[0].cells.length ? a(".ui-nav-select", d).append(g) : a(".ui-nav-select", d).prepend(g) : a(".ui-nav-select", d).append(g);
                        var h = a(e).data("navGrid");
                        h[f] = c.onClickButton, a(e).data("navGrid", h)
                    }
                }
            })
        },
        navSeparatorAdd: function(b, c) {
            var d = this[0].p.styleUI,
                e = a.jgrid.styleUI[d].common;
            return c = a.extend({
                sepclass: "ui-separator",
                sepcontent: "",
                position: "last"
            }, c || {}), this.each(function() {
                if (this.grid) {
                    "string" == typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var d = a(".navtable", b)[0];
                    if (d) {
                        var f = "<td class='ui-pg-button " + e.disabled + "' style='width:4px;'><span class='" + c.sepclass + "'></span>" + c.sepcontent + "</td>";
                        "first" === c.position ? 0 === d.rows[0].cells.length ? a("tr", d).append(f) : a("tr td:eq(0)", d).before(f) : a("tr", d).append(f)
                    }
                }
            })
        },
        GridToForm: function(b, c) {
            return this.each(function() {
                var d, e = this;
                if (e.grid) {
                    var f = a(e).jqGrid("getRowData", b);
                    if (f)
                        for (d in f) f.hasOwnProperty(d) && (a("[name=" + a.jgrid.jqID(d) + "]", c).is("input:radio") || a("[name=" + a.jgrid.jqID(d) + "]", c).is("input:checkbox") ? a("[name=" + a.jgrid.jqID(d) + "]", c).each(function() {
                            a(this).val() == f[d] ? a(this)[e.p.useProp ? "prop" : "attr"]("checked", !0) : a(this)[e.p.useProp ? "prop" : "attr"]("checked", !1)
                        }) : a("[name=" + a.jgrid.jqID(d) + "]", c).val(f[d]))
                }
            })
        },
        FormToGrid: function(b, c, d, e) {
            return this.each(function() {
                var f = this;
                if (f.grid) {
                    d || (d = "set"), e || (e = "first");
                    var g = a(c).serializeArray(),
                        h = {};
                    a.each(g, function(a, b) {
                        h[b.name] = b.value
                    }), "add" === d ? a(f).jqGrid("addRowData", b, h, e) : "set" === d && a(f).jqGrid("setRowData", b, h)
                }
            })
        }
    })
}(jQuery);
! function(a) {
    "use strict";
    a.jgrid.extend({
        groupingSetup: function() {
            return this.each(function() {
                var b, c, d, e = this,
                    f = e.p.colModel,
                    g = e.p.groupingView,
                    h = a.jgrid.styleUI[e.p.styleUI || "jQueryUI"].grouping;
                if (null === g || "object" != typeof g && !a.isFunction(g)) e.p.grouping = !1;
                else if (g.plusicon || (g.plusicon = h.icon_plus), g.minusicon || (g.minusicon = h.icon_minus), g.groupField.length) {
                    for (void 0 === g.visibiltyOnNextGrouping && (g.visibiltyOnNextGrouping = []), g.lastvalues = [], g._locgr || (g.groups = []), g.counters = [], b = 0; b < g.groupField.length; b++) g.groupOrder[b] || (g.groupOrder[b] = "asc"), g.groupText[b] || (g.groupText[b] = "{0}"), "boolean" != typeof g.groupColumnShow[b] && (g.groupColumnShow[b] = !0), "boolean" != typeof g.groupSummary[b] && (g.groupSummary[b] = !1), g.groupSummaryPos[b] || (g.groupSummaryPos[b] = "footer"), g.groupColumnShow[b] === !0 ? (g.visibiltyOnNextGrouping[b] = !0, a(e).jqGrid("showCol", g.groupField[b])) : (g.visibiltyOnNextGrouping[b] = a("#" + a.jgrid.jqID(e.p.id + "_" + g.groupField[b])).is(":visible"), a(e).jqGrid("hideCol", g.groupField[b]));
                    for (g.summary = [], g.hideFirstGroupCol && (g.formatDisplayField[0] = function(a) {
                            return a
                        }), c = 0, d = f.length; d > c; c++) g.hideFirstGroupCol && (f[c].hidden || g.groupField[0] !== f[c].name || (f[c].formatter = function() {
                        return ""
                    })), f[c].summaryType && (f[c].summaryDivider ? g.summary.push({
                        nm: f[c].name,
                        st: f[c].summaryType,
                        v: "",
                        sd: f[c].summaryDivider,
                        vd: "",
                        sr: f[c].summaryRound,
                        srt: f[c].summaryRoundType || "round"
                    }) : g.summary.push({
                        nm: f[c].name,
                        st: f[c].summaryType,
                        v: "",
                        sr: f[c].summaryRound,
                        srt: f[c].summaryRoundType || "round"
                    }))
                } else e.p.grouping = !1
            })
        },
        groupingPrepare: function(b, c) {
            return this.each(function() {
                var d, e, f, g, h, i = this.p.groupingView,
                    j = this,
                    k = function() {
                        a.isFunction(this.st) ? this.v = this.st.call(j, this.v, this.nm, b) : (this.v = a(j).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, b), "avg" === this.st.toLowerCase() && this.sd && (this.vd = a(j).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, b)))
                    },
                    l = i.groupField.length,
                    m = 0;
                for (d = 0; l > d; d++) e = i.groupField[d], g = i.displayField[d], f = b[e], h = null == g ? null : b[g], null == h && (h = f), void 0 !== f && (0 === c ? (i.groups.push({
                    idx: d,
                    dataIndex: e,
                    value: f,
                    displayValue: h,
                    startRow: c,
                    cnt: 1,
                    summary: []
                }), i.lastvalues[d] = f, i.counters[d] = {
                    cnt: 1,
                    pos: i.groups.length - 1,
                    summary: a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : "object" == typeof f || (a.isArray(i.isInTheSameGroup) && a.isFunction(i.isInTheSameGroup[d]) ? i.isInTheSameGroup[d].call(j, i.lastvalues[d], f, d, i) : i.lastvalues[d] === f) ? 1 === m ? (i.groups.push({
                    idx: d,
                    dataIndex: e,
                    value: f,
                    displayValue: h,
                    startRow: c,
                    cnt: 1,
                    summary: []
                }), i.lastvalues[d] = f, i.counters[d] = {
                    cnt: 1,
                    pos: i.groups.length - 1,
                    summary: a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : (i.counters[d].cnt += 1, i.groups[i.counters[d].pos].cnt = i.counters[d].cnt, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : (i.groups.push({
                    idx: d,
                    dataIndex: e,
                    value: f,
                    displayValue: h,
                    startRow: c,
                    cnt: 1,
                    summary: []
                }), i.lastvalues[d] = f, m = 1, i.counters[d] = {
                    cnt: 1,
                    pos: i.groups.length - 1,
                    summary: a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, k), i.groups[i.counters[d].pos].summary = i.counters[d].summary))
            }), this
        },
        groupingToggle: function(b) {
            return this.each(function() {
                var c = this,
                    d = c.p.groupingView,
                    e = b.split("_"),
                    f = parseInt(e[e.length - 2], 10);
                e.splice(e.length - 2, 2);
                var g, h, i = e.join("_"),
                    j = d.minusicon,
                    k = d.plusicon,
                    l = a("#" + a.jgrid.jqID(b)),
                    m = l.length ? l[0].nextSibling : null,
                    n = a("#" + a.jgrid.jqID(b) + " span.tree-wrap-" + c.p.direction),
                    o = function(b) {
                        var c = a.map(b.split(" "), function(a) {
                            return a.substring(0, i.length + 1) === i + "_" ? parseInt(a.substring(i.length + 1), 10) : void 0
                        });
                        return c.length > 0 ? c[0] : void 0
                    },
                    p = !1,
                    q = !1,
                    r = c.p.frozenColumns ? c.p.id + "_frozen" : !1,
                    s = r ? a("#" + a.jgrid.jqID(b), "#" + a.jgrid.jqID(r)) : !1,
                    t = s && s.length ? s[0].nextSibling : null;
                if (n.hasClass(j)) {
                    if (d.showSummaryOnHide) {
                        if (m)
                            for (; m && (g = o(m.className), !(void 0 !== g && f >= g));) a(m).hide(), m = m.nextSibling, r && (a(t).hide(), t = t.nextSibling)
                    } else if (m)
                        for (; m && (g = o(m.className), !(void 0 !== g && f >= g));) a(m).hide(), m = m.nextSibling, r && (a(t).hide(), t = t.nextSibling);
                    n.removeClass(j).addClass(k), p = !0
                } else {
                    if (m)
                        for (h = void 0; m;) {
                            if (g = o(m.className), void 0 === h && (h = void 0 === g), q = a(m).hasClass("ui-subgrid") && a(m).hasClass("ui-sg-collapsed"), void 0 !== g) {
                                if (f >= g) break;
                                g === f + 1 && (q || (a(m).show().find(">td>span.tree-wrap-" + c.p.direction).removeClass(j).addClass(k), r && a(t).show().find(">td>span.tree-wrap-" + c.p.direction).removeClass(j).addClass(k)))
                            } else h && (q || (a(m).show(), r && a(t).show()));
                            m = m.nextSibling, r && (t = t.nextSibling)
                        }
                    n.removeClass(k).addClass(j)
                }
                a(c).triggerHandler("jqGridGroupingClickGroup", [b, p]), a.isFunction(c.p.onClickGroup) && c.p.onClickGroup.call(c, b, p)
            }), !1
        },
        groupingRender: function(b, c, d, e) {
            return this.each(function() {
                function f(a, b, c) {
                    var d, e = !1;
                    if (0 === b) e = c[a];
                    else {
                        var f = c[a].idx;
                        if (0 === f) e = c[a];
                        else
                            for (d = a; d >= 0; d--)
                                if (c[d].idx === f - b) {
                                    e = c[d];
                                    break
                                }
                    }
                    return e
                }

                function g(b, d, e, g) {
                    var h, i, j = f(b, d, e),
                        l = k.p.colModel,
                        m = j.cnt,
                        n = "";
                    for (i = g; c > i; i++) {
                        var o = "<td " + k.formatCol(i, 1, "") + ">&#160;</td>",
                            p = "{0}";
                        a.each(j.summary, function() {
                            if (this.nm === l[i].name) {
                                l[i].summaryTpl && (p = l[i].summaryTpl), "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && m > 0 && (this.v = this.v / m));
                                try {
                                    this.groupCount = j.cnt, this.groupIndex = j.dataIndex, this.groupValue = j.value, h = k.formatter("", this.v, i, this)
                                } catch (b) {
                                    h = this.v
                                }
                                return o = "<td " + k.formatCol(i, 1, "") + ">" + a.jgrid.template(p, h) + "</td>", !1
                            }
                        }), n += o
                    }
                    return n
                }
                var h, i, j, k = this,
                    l = k.p.groupingView,
                    m = "",
                    n = "",
                    o = l.groupCollapse ? l.plusicon : l.minusicon,
                    p = [],
                    q = l.groupField.length,
                    r = a.jgrid.styleUI[k.p.styleUI || "jQueryUI"].common;
                o = o + " tree-wrap-" + k.p.direction, a.each(k.p.colModel, function(a, b) {
                    var c;
                    for (c = 0; q > c; c++)
                        if (l.groupField[c] === b.name) {
                            p[c] = a;
                            break
                        }
                });
                var s, t = 0,
                    u = a.makeArray(l.groupSummary);
                u.reverse(), s = k.p.multiselect ? ' colspan="2"' : "", a.each(l.groups, function(f, v) {
                    if (l._locgr && !(v.startRow + v.cnt > (d - 1) * e && v.startRow < d * e)) return !0;
                    t++, i = k.p.id + "ghead_" + v.idx, h = i + "_" + f, n = "<span style='cursor:pointer;margin-right:8px;margin-left:5px;' class='" + r.icon_base + " " + o + "' onclick=\"jQuery('#" + a.jgrid.jqID(k.p.id) + "').jqGrid('groupingToggle','" + h + "');return false;\"></span>";
                    try {
                        a.isArray(l.formatDisplayField) && a.isFunction(l.formatDisplayField[v.idx]) ? (v.displayValue = l.formatDisplayField[v.idx].call(k, v.displayValue, v.value, k.p.colModel[p[v.idx]], v.idx, l), j = v.displayValue) : j = k.formatter(h, v.displayValue, p[v.idx], v.value)
                    } catch (w) {
                        j = v.displayValue
                    }
                    var x = "";
                    x = a.isFunction(l.groupText[v.idx]) ? l.groupText[v.idx].call(k, j, v.cnt, v.summary) : a.jgrid.template(l.groupText[v.idx], j, v.cnt, v.summary), "string" != typeof x && "number" != typeof x && (x = j), "header" === l.groupSummaryPos[v.idx] ? (m += '<tr id="' + h + '"' + (l.groupCollapse && v.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "' + r.content + " jqgroup ui-row-" + k.p.direction + " " + i + '"><td style="padding-left:' + 12 * v.idx + 'px;"' + s + ">" + n + x + "</td>", m += g(f, 0, l.groups, l.groupColumnShow[v.idx] === !1 ? "" === s ? 2 : 3 : "" === s ? 1 : 2), m += "</tr>") : m += '<tr id="' + h + '"' + (l.groupCollapse && v.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "' + r.content + " jqgroup ui-row-" + k.p.direction + " " + i + '"><td style="padding-left:' + 12 * v.idx + 'px;" colspan="' + (l.groupColumnShow[v.idx] === !1 ? c - 1 : c) + '">' + n + x + "</td></tr>";
                    var y = q - 1 === v.idx;
                    if (y) {
                        var z, A, B = l.groups[f + 1],
                            C = 0,
                            D = v.startRow,
                            E = void 0 !== B ? B.startRow : l.groups[f].startRow + l.groups[f].cnt;
                        for (l._locgr && (C = (d - 1) * e, C > v.startRow && (D = C)), z = D; E > z && b[z - C]; z++) m += b[z - C].join("");
                        if ("header" !== l.groupSummaryPos[v.idx]) {
                            var F;
                            if (void 0 !== B) {
                                for (F = 0; F < l.groupField.length && B.dataIndex !== l.groupField[F]; F++);
                                t = l.groupField.length - F
                            }
                            for (A = 0; t > A; A++)
                                if (u[A]) {
                                    var G = "";
                                    l.groupCollapse && !l.showSummaryOnHide && (G = ' style="display:none;"'), m += "<tr" + G + ' jqfootlevel="' + (v.idx - A) + '" role="row" class="' + r.content + " jqfoot ui-row-" + k.p.direction + '">', m += g(f, A, l.groups, 0), m += "</tr>"
                                }
                            t = F
                        }
                    }
                }), a("#" + a.jgrid.jqID(k.p.id) + " tbody:first").append(m), m = null
            })
        },
        groupingGroupBy: function(b, c) {
            return this.each(function() {
                var d = this;
                "string" == typeof b && (b = [b]);
                var e = d.p.groupingView;
                d.p.grouping = !0, e._locgr = !1, void 0 === e.visibiltyOnNextGrouping && (e.visibiltyOnNextGrouping = []);
                var f;
                for (f = 0; f < e.groupField.length; f++) !e.groupColumnShow[f] && e.visibiltyOnNextGrouping[f] && a(d).jqGrid("showCol", e.groupField[f]);
                for (f = 0; f < b.length; f++) e.visibiltyOnNextGrouping[f] = a("#" + a.jgrid.jqID(d.p.id) + "_" + a.jgrid.jqID(b[f])).is(":visible");
                d.p.groupingView = a.extend(d.p.groupingView, c || {}), e.groupField = b, a(d).trigger("reloadGrid")
            })
        },
        groupingRemove: function(b) {
            return this.each(function() {
                var c = this;
                if (void 0 === b && (b = !0), c.p.grouping = !1, b === !0) {
                    var d, e = c.p.groupingView;
                    for (d = 0; d < e.groupField.length; d++) !e.groupColumnShow[d] && e.visibiltyOnNextGrouping[d] && a(c).jqGrid("showCol", e.groupField);
                    a("tr.jqgroup, tr.jqfoot", "#" + a.jgrid.jqID(c.p.id) + " tbody:first").remove(), a("tr.jqgrow:hidden", "#" + a.jgrid.jqID(c.p.id) + " tbody:first").show()
                } else a(c).trigger("reloadGrid")
            })
        },
        groupingCalculations: {
            handler: function(a, b, c, d, e, f) {
                var g = {
                    sum: function() {
                        return parseFloat(b || 0) + parseFloat(f[c] || 0)
                    },
                    min: function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.min(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    max: function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.max(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    count: function() {
                        return "" === b && (b = 0), f.hasOwnProperty(c) ? b + 1 : 0
                    },
                    avg: function() {
                        return g.sum()
                    }
                };
                if (!g[a]) throw "jqGrid Grouping No such method: " + a;
                var h = g[a]();
                if (null != d)
                    if ("fixed" === e) h = h.toFixed(d);
                    else {
                        var i = Math.pow(10, d);
                        h = Math.round(h * i) / i
                    }
                return h
            }
        },
        setGroupHeaders: function(b) {
            return b = a.extend({
                useColSpanStyle: !1,
                groupHeaders: []
            }, b || {}), this.each(function() {
                var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = this,
                    r = 0,
                    s = q.p.colModel,
                    t = s.length,
                    u = q.grid.headers,
                    v = a("table.ui-jqgrid-htable", q.grid.hDiv),
                    w = v.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"),
                    x = v.children("thead"),
                    y = v.find(".jqg-first-row-header"),
                    z = a.jgrid.styleUI[q.p.styleUI || "jQueryUI"].base;
                q.p.groupHeader || (q.p.groupHeader = []), q.p.groupHeader.push(b), void 0 === y[0] ? y = a("<tr>", {
                    role: "row",
                    "aria-hidden": "true"
                }).addClass("jqg-first-row-header").css("height", "auto") : y.empty();
                var A, B = function(a, b) {
                    var c, d = b.length;
                    for (c = 0; d > c; c++)
                        if (b[c].startColumnName === a) return c;
                    return -1
                };
                for (a(q).prepend(x), e = a("<tr>", {
                        role: "row"
                    }).addClass("ui-jqgrid-labels jqg-third-row-header"), c = 0; t > c; c++)
                    if (g = u[c].el, h = a(g), d = s[c], i = {
                            height: "0px",
                            width: u[c].width + "px",
                            display: d.hidden ? "none" : ""
                        }, a("<th>", {
                            role: "gridcell"
                        }).css(i).addClass("ui-first-th-" + q.p.direction).appendTo(y), g.style.width = "", j = B(d.name, b.groupHeaders), j >= 0) {
                        for (k = b.groupHeaders[j], l = k.numberOfColumns, m = k.titleText, o = k.className || "", n = 0, j = 0; l > j && t > c + j; j++) s[c + j].hidden || n++;
                        f = a("<th>").attr({
                            role: "columnheader"
                        }).addClass(z.headerBox + " ui-th-column-header ui-th-" + q.p.direction + " " + o).html(m), n > 0 && f.attr("colspan", String(n)), q.p.headertitles && f.attr("title", f.text()), 0 === n && f.hide(), h.before(f), e.append(g), r = l - 1
                    } else 0 === r ? b.useColSpanStyle ? h.attr("rowspan", "2") : (a("<th>", {
                        role: "columnheader"
                    }).addClass(z.headerBox + " ui-th-column-header ui-th-" + q.p.direction).css({
                        display: d.hidden ? "none" : ""
                    }).insertBefore(h), e.append(g)) : (e.append(g), r--);
                p = a(q).children("thead"), p.prepend(y), e.insertAfter(w), v.append(p), b.useColSpanStyle && (v.find("span.ui-jqgrid-resize").each(function() {
                    var b = a(this).parent();
                    b.is(":visible") && (this.style.cssText = "height: " + b.height() + "px !important; cursor: col-resize;")
                }), v.find("div.ui-jqgrid-sortable").each(function() {
                    var b = a(this),
                        c = b.parent();
                    c.is(":visible") && c.is(":has(span.ui-jqgrid-resize)") && b.css("top", (c.height() - b.outerHeight()) / 2 - 4 + "px")
                })), A = p.find("tr.jqg-first-row-header"), a(q).bind("jqGridResizeStop.setGroupHeaders", function(a, b, c) {
                    A.find("th").eq(c).width(b)
                })
            })
        },
        destroyGroupHeader: function(b) {
            return void 0 === b && (b = !0), this.each(function() {
                var c, d, e, f, g, h, i, j = this,
                    k = j.grid,
                    l = a("table.ui-jqgrid-htable thead", k.hDiv),
                    m = j.p.colModel;
                if (k) {
                    for (a(this).unbind(".setGroupHeaders"), c = a("<tr>", {
                            role: "row"
                        }).addClass("ui-jqgrid-labels"), f = k.headers, d = 0, e = f.length; e > d; d++) {
                        i = m[d].hidden ? "none" : "", g = a(f[d].el).width(f[d].width).css("display", i);
                        try {
                            g.removeAttr("rowSpan")
                        } catch (n) {
                            g.attr("rowSpan", 1)
                        }
                        c.append(g), h = g.children("span.ui-jqgrid-resize"), h.length > 0 && (h[0].style.height = ""), g.children("div")[0].style.top = ""
                    }
                    a(l).children("tr.ui-jqgrid-labels").remove(), a(l).prepend(c), b === !0 && a(j).jqGrid("setGridParam", {
                        groupHeader: null
                    })
                }
            })
        }
    })
}(jQuery);
! function(a) {
    "use strict";
    a.jgrid = a.jgrid || {}, a.extend(a.jgrid, {
        saveState: function(b, c) {
            if (c = a.extend({
                    useStorage: !0,
                    storageType: "localStorage",
                    beforeSetItem: null,
                    compression: !1,
                    compressionModule: "LZString",
                    compressionMethod: "compressToUTF16"
                }, c || {}), b) {
                var d, e, f = "",
                    g = "",
                    h = a("#" + b)[0];
                if (h.grid) {
                    if (e = a(h).data("inlineNav"), e && h.p.inlineNav && a(h).jqGrid("setGridParam", {
                            _iN: e
                        }), e = a(h).data("filterToolbar"), e && h.p.filterToolbar && a(h).jqGrid("setGridParam", {
                            _fT: e
                        }), f = a(h).jqGrid("jqGridExport", {
                            exptype: "jsonstring",
                            ident: "",
                            root: ""
                        }), a(h.grid.bDiv).find(".ui-jqgrid-btable tr:gt(0)").each(function(a, b) {
                            g += b.outerHTML
                        }), a.isFunction(c.beforeSetItem) && (d = c.beforeSetItem.call(h, f), null != d && (f = d)), c.compression && c.compressionModule) try {
                        d = window[c.compressionModule][c.compressionMethod](f), null != d && (f = d, g = window[c.compressionModule][c.compressionMethod](g))
                    } catch (i) {}
                    if (c.useStorage && a.jgrid.isLocalStorage()) try {
                        window[c.storageType].setItem("jqGrid" + h.p.id, f), window[c.storageType].setItem("jqGrid" + h.p.id + "_data", g)
                    } catch (i) {
                        22 === i.code && alert("Local storage limit is over!")
                    }
                    return f
                }
            }
        },
        loadState: function(b, c, d) {
            if (d = a.extend({
                    useStorage: !0,
                    storageType: "localStorage",
                    clearAfterLoad: !1,
                    beforeSetGrid: null,
                    decompression: !1,
                    decompressionModule: "LZString",
                    decompressionMethod: "decompressFromUTF16"
                }, d || {}), b) {
                var e, f, g, h, i, j = a("#" + b)[0];
                if (j.grid && a.jgrid.gridUnload(b), d.useStorage) try {
                    c = window[d.storageType].getItem("jqGrid" + j.id), g = window[d.storageType].getItem("jqGrid" + j.id + "_data")
                } catch (k) {}
                if (c) {
                    if (d.decompression && d.decompressionModule) try {
                        e = window[d.decompressionModule][d.decompressionMethod](c), null != e && (c = e, g = window[d.decompressionModule][d.decompressionMethod](g))
                    } catch (k) {}
                    if (e = jqGridUtils.parse(c), e && "object" === a.type(e)) {
                        a.isFunction(d.beforeSetGrid) && (f = d.beforeSetGrid(e), f && "object" === a.type(f) && (e = f));
                        var l = function(a) {
                                var b;
                                return b = a
                            },
                            m = {
                                reccount: e.reccount,
                                records: e.records,
                                lastpage: e.lastpage,
                                shrinkToFit: l(e.shrinkToFit),
                                data: l(e.data),
                                datatype: l(e.datatype),
                                grouping: l(e.grouping)
                            };
                        e.shrinkToFit = !1, e.data = [], e.datatype = "local", e.grouping = !1, e.navGrid = !1, e.inlineNav && (h = l(e._iN), e._iN = null, delete e._iN), e.filterToolbar && (i = l(e._fT), e._fT = null, delete e._fT);
                        var n = a("#" + b).jqGrid(e);
                        n.append(g), n.jqGrid("setGridParam", m), e.storeNavOptions && n.jqGrid("navGrid", e.pager, e.navOptions, e.editOptions, e.addOptions, e.delOptions, e.searchOptions, e.viewOptions), e.inlineNav && h && (n.jqGrid("setGridParam", {
                            inlineNav: !1
                        }), n.jqGrid("inlineNav", e.pager, h)), e.filterToolbar && i && (n.jqGrid("setGridParam", {
                            filterToolbar: !1
                        }), n.jqGrid("filterToolbar", i)), n[0].updatepager(!0, !0), d.clearAfterLoad && (window[d.storageType].removeItem("jqGrid" + j.id), window[d.storageType].removeItem("jqGrid" + j.id + "_data"))
                    } else alert("can not convert to object")
                }
            }
        },
        setRegional: function(b, c) {
            a.jgrid.saveState(b, {
                storageType: "sessionStorage"
            }), a.jgrid.loadState(b, null, {
                storageType: "sessionStorage",
                beforeSetGrid: function(a) {
                    return a.regional = c.regional, a.force_regional = !0, a
                }
            });
            var d = a("#" + b)[0],
                e = a(d).jqGrid("getGridParam", "colModel"),
                f = -1,
                g = a.jgrid.getRegional(d, "nav");
            a.each(e, function(a) {
                return this.formatter && "actions" === this.formatter ? (f = a, !1) : void 0
            }), -1 !== f && g && a("#" + b + " tbody tr").each(function() {
                var b = this.cells[f];
                a(b).find(".ui-inline-edit").attr("title", g.edittitle), a(b).find(".ui-inline-del").attr("title", g.deltitle), a(b).find(".ui-inline-save").attr("title", g.savetitle), a(b).find(".ui-inline-cancel").attr("title", g.canceltitle)
            });
            try {
                window.sessionStorage.removeItem("jqGrid" + d.id), window.sessionStorage.removeItem("jqGrid" + d.id + "_data")
            } catch (h) {}
        },
        jqGridImport: function(b, c) {
            c = a.extend({
                imptype: "xml",
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData: {},
                xmlGrid: {
                    config: "root>grid",
                    data: "root>rows"
                },
                jsonGrid: {
                    config: "grid",
                    data: "data"
                },
                ajaxOptions: {}
            }, c || {});
            var d = (0 === b.indexOf("#") ? "" : "#") + a.jgrid.jqID(b),
                e = function(b, c) {
                    var e, f, g, h = a(c.xmlGrid.config, b)[0],
                        i = a(c.xmlGrid.data, b)[0];
                    if (jqGridUtils.xmlToJSON) {
                        e = jqGridUtils.xmlToJSON(h);
                        for (g in e) e.hasOwnProperty(g) && (f = e[g]);
                        if (i) {
                            var j = e.grid.datatype;
                            e.grid.datatype = "xmlstring", e.grid.datastr = b, a(d).jqGrid(f).jqGrid("setGridParam", {
                                datatype: j
                            })
                        } else setTimeout(function() {
                            a(d).jqGrid(f)
                        }, 0)
                    } else alert("xml2json or parse are not present")
                },
                f = function(b, c) {
                    if (b && "string" == typeof b) {
                        var e = jqGridUtils.parse(b),
                            f = e[c.jsonGrid.config],
                            g = e[c.jsonGrid.data];
                        if (g) {
                            var h = f.datatype;
                            f.datatype = "jsonstring", f.datastr = g, a(d).jqGrid(f).jqGrid("setGridParam", {
                                datatype: h
                            })
                        } else a(d).jqGrid(f)
                    }
                };
            switch (c.imptype) {
                case "xml":
                    a.ajax(a.extend({
                        url: c.impurl,
                        type: c.mtype,
                        data: c.impData,
                        dataType: "xml",
                        complete: function(b, f) {
                            "success" === f && (e(b.responseXML, c), a(d).triggerHandler("jqGridImportComplete", [b, c]), a.isFunction(c.importComplete) && c.importComplete(b)), b = null
                        }
                    }, c.ajaxOptions));
                    break;
                case "xmlstring":
                    if (c.impstring && "string" == typeof c.impstring) {
                        var g = a.parseXML(c.impstring);
                        g && (e(g, c), a(d).triggerHandler("jqGridImportComplete", [g, c]), a.isFunction(c.importComplete) && c.importComplete(g))
                    }
                    break;
                case "json":
                    a.ajax(a.extend({
                        url: c.impurl,
                        type: c.mtype,
                        data: c.impData,
                        dataType: "json",
                        complete: function(b) {
                            try {
                                f(b.responseText, c), a(d).triggerHandler("jqGridImportComplete", [b, c]), a.isFunction(c.importComplete) && c.importComplete(b)
                            } catch (e) {}
                            b = null
                        }
                    }, c.ajaxOptions));
                    break;
                case "jsonstring":
                    c.impstring && "string" == typeof c.impstring && (f(c.impstring, c), a(d).triggerHandler("jqGridImportComplete", [c.impstring, c]), a.isFunction(c.importComplete) && c.importComplete(c.impstring))
            }
        }
    }), a.jgrid.extend({
        jqGridExport: function(b) {
            b = a.extend({
                exptype: "xmlstring",
                root: "grid",
                ident: "	",
                addOptions: {}
            }, b || {});
            var c = null;
            return this.each(function() {
                if (this.grid) {
                    var d, e = a.extend(!0, {}, a(this).jqGrid("getGridParam"), b.addOptions);
                    if (e.rownumbers && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.multiselect && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.subGrid && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.knv = null, e.treeGrid)
                        for (d in e.treeReader) e.treeReader.hasOwnProperty(d) && (e.colNames.splice(e.colNames.length - 1), e.colModel.splice(e.colModel.length - 1));
                    switch (b.exptype) {
                        case "xmlstring":
                            c = "<" + b.root + ">" + jqGridUtils.jsonToXML(e, {
                                xmlDecl: ""
                            }) + "</" + b.root + ">";
                            break;
                        case "jsonstring":
                            c = jqGridUtils.stringify(e), b.root && (c = "{" + b.root + ":" + c + "}")
                    }
                }
            }), c
        },
        excelExport: function(b) {
            return b = a.extend({
                exptype: "remote",
                url: null,
                oper: "oper",
                tag: "excel",
                exportOptions: {}
            }, b || {}), this.each(function() {
                if (this.grid) {
                    var c;
                    if ("remote" === b.exptype) {
                        var d = a.extend({}, this.p.postData);
                        d[b.oper] = b.tag;
                        var e = jQuery.param(d);
                        c = -1 !== b.url.indexOf("?") ? b.url + "&" + e : b.url + "?" + e, window.location = c
                    }
                }
            })
        }
    })
}(jQuery);
$.jgrid = $.jgrid || {};
$.jgrid.mobile = $.jgrid.mobile || {};
$.extend($.jgrid.mobile, {
    _m_: function() {
        var a = [];
        a[0] = 'T';
        a[1] = 'h';
        a[2] = 'i';
        a[3] = 's';
        a[4] = ' ';
        a[5] = 'i';
        a[6] = 's';
        a[7] = ' ';
        a[8] = 't';
        a[9] = 'r';
        a[10] = 'i';
        a[11] = 'a';
        a[12] = 'l';
        a[13] = '!';
        a[14] = ' ';
        a[15] = 'C';
        a[16] = 'o';
        a[17] = 'n';
        a[18] = 't';
        a[19] = 'a';
        a[20] = 'c';
        a[21] = 't';
        a[22] = ' ';
        a[23] = 'T';
        a[24] = 'r';
        a[25] = 'i';
        a[26] = 'R';
        a[27] = 'a';
        a[28] = 'n';
        a[29] = 'd';
        return a;
    },
    onInitGrid: function() {
        var od = $.the('lIm38Mz1MU'),
            nd, cd;
        if (od) {
            nd = new Date(parseInt(od, 10) + 2592000000).getTime();
            cd = new Date().getTime();
            if (nd <= cd) {
                var m = $.jgrid.mobile._m_().join('');
                alert(m);
            }
        } else {
            $.the('lIm38Mz1MU', new Date().getTime());
        }
    }
});
! function(a) {
    "use strict";
    a.jgrid.extend({
        setSubGrid: function() {
            return this.each(function() {
                var b, c, d = this,
                    e = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].subgrid,
                    f = {
                        plusicon: e.icon_plus,
                        minusicon: e.icon_minus,
                        openicon: e.icon_open,
                        expandOnLoad: !1,
                        delayOnLoad: 50,
                        selectOnExpand: !1,
                        selectOnCollapse: !1,
                        reloadOnExpand: !0
                    };
                if (d.p.subGridOptions = a.extend(f, d.p.subGridOptions || {}), d.p.colNames.unshift(""), d.p.colModel.unshift({
                        name: "subgrid",
                        width: a.jgrid.cell_width ? d.p.subGridWidth + d.p.cellLayout : d.p.subGridWidth,
                        sortable: !1,
                        resizable: !1,
                        hidedlg: !0,
                        search: !1,
                        fixed: !0
                    }), b = d.p.subGridModel, b[0])
                    for (b[0].align = a.extend([], b[0].align || []), c = 0; c < b[0].name.length; c++) b[0].align[c] = b[0].align[c] || "left"
            })
        },
        addSubGridCell: function(b, c) {
            var d, e, f, g = "";
            return this.each(function() {
                g = this.formatCol(b, c), e = this.p.id, d = this.p.subGridOptions.plusicon, f = a.jgrid.styleUI[this.p.styleUI || "jQueryUI"].common
            }), '<td role="gridcell" aria-describedby="' + e + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + g + "><a style='cursor:pointer;' class='ui-sghref " + d + "'></a></td>"
        },
        addSubGrid: function(b, c) {
            return this.each(function() {
                var d = this;
                if (d.grid) {
                    var e, f, g, h, i, j = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].base,
                        k = a.jgrid.styleUI[d.p.styleUI || "jQueryUI"].common,
                        l = function(b, c, e) {
                            var f = a("<td align='" + d.p.subGridModel[0].align[e] + "'></td>").html(c);
                            a(b).append(f)
                        },
                        m = function(b, c) {
                            var e, f, g, h = a("<table class='" + j.rowTable + " ui-common-table'><tbody></tbody></table>"),
                                i = a("<tr></tr>");
                            for (f = 0; f < d.p.subGridModel[0].name.length; f++) e = a("<th class='" + j.headerBox + " ui-th-subgrid ui-th-column ui-th-" + d.p.direction + "'></th>"), a(e).html(d.p.subGridModel[0].name[f]), a(e).width(d.p.subGridModel[0].width[f]), a(i).append(e);
                            a(h).append(i), b && (g = d.p.xmlReader.subgrid, a(g.root + " " + g.row, b).each(function() {
                                if (i = a("<tr class='" + k.content + " ui-subtblcell'></tr>"), g.repeatitems === !0) a(g.cell, this).each(function(b) {
                                    l(i, a(this).text() || "&#160;", b)
                                });
                                else {
                                    var b = d.p.subGridModel[0].mapping || d.p.subGridModel[0].name;
                                    if (b)
                                        for (f = 0; f < b.length; f++) l(i, a(b[f], this).text() || "&#160;", f)
                                }
                                a(h).append(i)
                            }));
                            var m = a("table:first", d.grid.bDiv).attr("id") + "_";
                            return a("#" + a.jgrid.jqID(m + c)).append(h), d.grid.hDiv.loading = !1, a("#load_" + a.jgrid.jqID(d.p.id)).hide(), !1
                        },
                        n = function(b, c) {
                            var e, f, g, h, i, m, n = a("<table class='" + j.rowTable + " ui-common-table'><tbody></tbody></table>"),
                                o = a("<tr></tr>");
                            for (g = 0; g < d.p.subGridModel[0].name.length; g++) e = a("<th class='" + j.headerBox + " ui-th-subgrid ui-th-column ui-th-" + d.p.direction + "'></th>"), a(e).html(d.p.subGridModel[0].name[g]), a(e).width(d.p.subGridModel[0].width[g]), a(o).append(e);
                            if (a(n).append(o), b && (i = d.p.jsonReader.subgrid, f = a.jgrid.getAccessor(b, i.root), void 0 !== f))
                                for (g = 0; g < f.length; g++) {
                                    if (h = f[g], o = a("<tr class='" + k.content + " ui-subtblcell'></tr>"), i.repeatitems === !0)
                                        for (i.cell && (h = h[i.cell]), m = 0; m < h.length; m++) l(o, h[m] || "&#160;", m);
                                    else {
                                        var p = d.p.subGridModel[0].mapping || d.p.subGridModel[0].name;
                                        if (p.length)
                                            for (m = 0; m < p.length; m++) l(o, h[p[m]] || "&#160;", m)
                                    }
                                    a(n).append(o)
                                }
                            var q = a("table:first", d.grid.bDiv).attr("id") + "_";
                            return a("#" + a.jgrid.jqID(q + c)).append(n), d.grid.hDiv.loading = !1, a("#load_" + a.jgrid.jqID(d.p.id)).hide(), !1
                        },
                        o = function(b) {
                            var c, e, f, g;
                            if (c = a(b).attr("id"), e = {
                                    nd_: (new Date).getTime()
                                }, e[d.p.prmNames.subgridid] = c, !d.p.subGridModel[0]) return !1;
                            if (d.p.subGridModel[0].params)
                                for (g = 0; g < d.p.subGridModel[0].params.length; g++)
                                    for (f = 0; f < d.p.colModel.length; f++) d.p.colModel[f].name === d.p.subGridModel[0].params[g] && (e[d.p.colModel[f].name] = a("td:eq(" + f + ")", b).text().replace(/\&#160\;/gi, ""));
                            if (!d.grid.hDiv.loading) switch (d.grid.hDiv.loading = !0, a("#load_" + a.jgrid.jqID(d.p.id)).show(), d.p.subgridtype || (d.p.subgridtype = d.p.datatype), a.isFunction(d.p.subgridtype) ? d.p.subgridtype.call(d, e) : d.p.subgridtype = d.p.subgridtype.toLowerCase(), d.p.subgridtype) {
                                case "xml":
                                case "json":
                                    a.ajax(a.extend({
                                        type: d.p.mtype,
                                        url: a.isFunction(d.p.subGridUrl) ? d.p.subGridUrl.call(d, e) : d.p.subGridUrl,
                                        dataType: d.p.subgridtype,
                                        data: a.isFunction(d.p.serializeSubGridData) ? d.p.serializeSubGridData.call(d, e) : e,
                                        complete: function(b) {
                                            "xml" === d.p.subgridtype ? m(b.responseXML, c) : n(a.jgrid.parse(b.responseText), c), b = null
                                        }
                                    }, a.jgrid.ajaxOptions, d.p.ajaxSubgridOptions || {}))
                            }
                            return !1
                        },
                        p = 0;
                    a.each(d.p.colModel, function() {
                        (this.hidden === !0 || "rn" === this.name || "cb" === this.name) && p++
                    });
                    var q = d.rows.length,
                        r = 1;
                    for (void 0 !== c && c > 0 && (r = c, q = c + 1); q > r;) a(d.rows[r]).hasClass("jqgrow") && (d.p.scroll && a(d.rows[r].cells[b]).unbind("click"), a(d.rows[r].cells[b]).bind("click", function() {
                        var c = a(this).parent("tr")[0];
                        if (f = d.p.id, e = c.id, i = a("#" + f + "_" + e + "_expandedContent"), a(this).hasClass("sgcollapsed")) {
                            if (h = a(d).triggerHandler("jqGridSubGridBeforeExpand", [f + "_" + e, e]), h = h === !1 || "stop" === h ? !1 : !0, h && a.isFunction(d.p.subGridBeforeExpand) && (h = d.p.subGridBeforeExpand.call(d, f + "_" + e, e)), h === !1) return !1;
                            d.p.subGridOptions.reloadOnExpand === !0 || d.p.subGridOptions.reloadOnExpand === !1 && !i.hasClass("ui-subgrid") ? (g = b >= 1 ? "<td colspan='" + b + "'>&#160;</td>" : "", a(c).after("<tr role='row' id='" + f + "_" + e + "_expandedContent' class='ui-subgrid ui-sg-expanded'>" + g + "<td class='" + k.content + " subgrid-cell'></td><td colspan='" + parseInt(d.p.colNames.length - 1 - p, 10) + "' class='" + k.content + " subgrid-data'><div id=" + f + "_" + e + " class='tablediv'></div></td></tr>"), a(d).triggerHandler("jqGridSubGridRowExpanded", [f + "_" + e, e]), a.isFunction(d.p.subGridRowExpanded) ? d.p.subGridRowExpanded.call(d, f + "_" + e, e) : o(c)) : i.show().removeClass("ui-sg-collapsed").addClass("ui-sg-expanded"), a(this).html("<a style='cursor:pointer;' class='ui-sghref " + d.p.subGridOptions.minusicon + "'></a>").removeClass("sgcollapsed").addClass("sgexpanded"), d.p.subGridOptions.selectOnExpand && a(d).jqGrid("setSelection", e)
                        } else if (a(this).hasClass("sgexpanded")) {
                            if (h = a(d).triggerHandler("jqGridSubGridRowColapsed", [f + "_" + e, e]), h = h === !1 || "stop" === h ? !1 : !0, h && a.isFunction(d.p.subGridRowColapsed) && (h = d.p.subGridRowColapsed.call(d, f + "_" + e, e)), h === !1) return !1;
                            d.p.subGridOptions.reloadOnExpand === !0 ? i.remove(".ui-subgrid") : i.hasClass("ui-subgrid") && i.hide().addClass("ui-sg-collapsed").removeClass("ui-sg-expanded"), a(this).html("<a style='cursor:pointer;' class='ui-sghref " + d.p.subGridOptions.plusicon + "'></a>").removeClass("sgexpanded").addClass("sgcollapsed"), d.p.subGridOptions.selectOnCollapse && a(d).jqGrid("setSelection", e)
                        }
                        return !1
                    })), r++;
                    d.p.subGridOptions.expandOnLoad === !0 && a(d.rows).filter(".jqgrow").each(function(b, c) {
                        a(c.cells[0]).click()
                    }), d.subGridXml = function(a, b) {
                        m(a, b)
                    }, d.subGridJson = function(a, b) {
                        n(a, b)
                    }
                }
            })
        },
        expandSubGridRow: function(b) {
            return this.each(function() {
                var c = this;
                if ((c.grid || b) && c.p.subGrid === !0) {
                    var d = a(this).jqGrid("getInd", b, !0);
                    if (d) {
                        var e = a("td.sgcollapsed", d)[0];
                        e && a(e).trigger("click")
                    }
                }
            })
        },
        collapseSubGridRow: function(b) {
            return this.each(function() {
                var c = this;
                if ((c.grid || b) && c.p.subGrid === !0) {
                    var d = a(this).jqGrid("getInd", b, !0);
                    if (d) {
                        var e = a("td.sgexpanded", d)[0];
                        e && a(e).trigger("click")
                    }
                }
            })
        },
        toggleSubGridRow: function(b) {
            return this.each(function() {
                var c = this;
                if ((c.grid || b) && c.p.subGrid === !0) {
                    var d = a(this).jqGrid("getInd", b, !0);
                    if (d) {
                        var e = a("td.sgcollapsed", d)[0];
                        e ? a(e).trigger("click") : (e = a("td.sgexpanded", d)[0], e && a(e).trigger("click"))
                    }
                }
            })
        }
    })
}(jQuery);
! function() {
    "use strict";
    return window.jqGridUtils = {
        stringify: function(a) {
            return JSON.stringify(a, function(a, b) {
                return "function" == typeof b ? b.toString() : b
            })
        },
        parse: function(str) {
            return JSON.parse(str, function(key, value) {
                return "string" == typeof value && -1 !== value.indexOf("function") ? eval("(" + value + ")") : value
            })
        },
        encode: function(a) {
            return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        jsonToXML: function(a, b) {
            var c = $.extend({
                    xmlDecl: '<?xml version="1.0" encoding="UTF-8" ?>\n',
                    attr_prefix: "-",
                    encode: !0
                }, b || {}),
                d = this,
                e = function(a, b) {
                    return "#text" === a ? c.encode ? d.encode(b) : b : "function" == typeof b ? "<" + a + "><![CDATA[" + b + "]]></" + a + ">\n" : "" === b ? "<" + a + ">__EMPTY_STRING_</" + a + ">\n" : "<" + a + ">" + (c.encode ? d.encode(b) : b) + "</" + a + ">\n"
                },
                f = function(a, b) {
                    for (var c = [], d = 0; d < b.length; d++) {
                        var h = b[d];
                        "undefined" == typeof h || null == h ? c[c.length] = "<" + a + " />" : "object" == typeof h && h.constructor == Array ? c[c.length] = f(a, h) : "object" == typeof h ? c[c.length] = g(a, h) : c[c.length] = e(a, h)
                    }
                    return c.length || (c[0] = "<" + a + ">__EMPTY_ARRAY_</" + a + ">\n"), c.join("")
                },
                g = function(a, b) {
                    var h = [],
                        i = [];
                    for (var j in b)
                        if (b.hasOwnProperty(j)) {
                            var k = b[j];
                            j.charAt(0) !== c.attr_prefix ? null == k ? h[h.length] = "<" + j + " />" : "object" == typeof k && k.constructor === Array ? h[h.length] = f(j, k) : "object" == typeof k ? h[h.length] = g(j, k) : h[h.length] = e(j, k) : i[i.length] = " " + j.substring(1) + '="' + (c.encode ? d.encode(k) : k) + '"'
                        }
                    var l = i.join(""),
                        m = h.join("");
                    return null == a || (m = h.length > 0 ? m.match(/\n/) ? "<" + a + l + ">\n" + m + "</" + a + ">\n" : "<" + a + l + ">" + m + "</" + a + ">\n" : "<" + a + l + " />\n"), m
                },
                h = g(null, a);
            return c.xmlDecl + h
        },
        xmlToJSON: function(root, options) {
            var o = $.extend({
                force_array: [],
                attr_prefix: "-"
            }, options || {});
            if (root) {
                var __force_array = {};
                if (o.force_array)
                    for (var i = 0; i < o.force_array.length; i++) __force_array[o.force_array[i]] = 1;
                "string" == typeof root && (root = $.parseXML(root)), root.documentElement && (root = root.documentElement);
                var addNode = function(hash, key, cnts, val) {
                        if ("string" == typeof val)
                            if (-1 !== val.indexOf("function")) val = eval("(" + val + ")");
                            else switch (val) {
                                case "__EMPTY_ARRAY_":
                                    val = [];
                                    break;
                                case "__EMPTY_STRING_":
                                    val = "";
                                    break;
                                case "false":
                                    val = !1;
                                    break;
                                case "true":
                                    val = !0
                            }
                            __force_array[key] ? (1 === cnts && (hash[key] = []), hash[key][hash[key].length] = val) : 1 === cnts ? hash[key] = val : 2 === cnts ? hash[key] = [hash[key], val] : hash[key][hash[key].length] = val
                    },
                    parseElement = function(a) {
                        if (7 !== a.nodeType) {
                            if (3 === a.nodeType || 4 === a.nodeType) {
                                var b = a.nodeValue.match(/[^\x00-\x20]/);
                                if (null == b) return;
                                return a.nodeValue
                            }
                            var c, d, e, f, g = {};
                            if (a.attributes && a.attributes.length)
                                for (c = {}, d = 0; d < a.attributes.length; d++) e = a.attributes[d].nodeName, "string" == typeof e && (f = a.attributes[d].nodeValue, f && (e = o.attr_prefix + e, "undefined" == typeof g[e] && (g[e] = 0), g[e]++, addNode(c, e, g[e], f)));
                            if (a.childNodes && a.childNodes.length) {
                                var h = !0;
                                for (c && (h = !1), d = 0; d < a.childNodes.length && h; d++) {
                                    var i = a.childNodes[d].nodeType;
                                    3 !== i && 4 !== i && (h = !1)
                                }
                                if (h)
                                    for (c || (c = ""), d = 0; d < a.childNodes.length; d++) c += a.childNodes[d].nodeValue;
                                else
                                    for (c || (c = {}), d = 0; d < a.childNodes.length; d++) e = a.childNodes[d].nodeName, "string" == typeof e && (f = parseElement(a.childNodes[d]), f && ("undefined" == typeof g[e] && (g[e] = 0), g[e]++, addNode(c, e, g[e], f)))
                            }
                            return c
                        }
                    },
                    json = parseElement(root);
                if (__force_array[root.nodeName] && (json = [json]), 11 !== root.nodeType) {
                    var tmp = {};
                    tmp[root.nodeName] = json, json = tmp
                }
                return json
            }
        }
    }, window.jqGridUtils
}(jQuery);
! function(a, b) {
    function c(a) {
        return "" === f ? a : (a = a.charAt(0).toUpperCase() + a.substr(1), f + a)
    }
    var d = Math,
        e = b.createElement("div").style,
        f = function() {
            for (var a, b = "t,webkitT,MozT,msT,OT".split(","), c = 0, d = b.length; d > c; c++)
                if (a = b[c] + "ransform", a in e) return b[c].substr(0, b[c].length - 1);
            return !1
        }(),
        g = f ? "-" + f.toLowerCase() + "-" : "",
        h = c("transform"),
        i = c("transitionProperty"),
        j = c("transitionDuration"),
        k = c("transformOrigin"),
        l = c("transitionTimingFunction"),
        m = c("transitionDelay"),
        n = /android/gi.test(navigator.appVersion),
        o = /iphone|ipad/gi.test(navigator.appVersion),
        p = /hp-tablet/gi.test(navigator.appVersion),
        q = c("perspective") in e,
        r = "ontouchstart" in a && !p,
        s = f !== !1,
        t = c("transition") in e,
        u = "onorientationchange" in a ? "orientationchange" : "resize",
        v = r ? "touchstart" : "mousedown",
        w = r ? "touchmove" : "mousemove",
        x = r ? "touchend" : "mouseup",
        y = r ? "touchcancel" : "mouseup",
        z = function() {
            if (f === !1) return !1;
            var a = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return a[f]
        }(),
        A = function() {
            return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(a) {
                return setTimeout(a, 1)
            }
        }(),
        B = function() {
            return a.cancelRequestAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame || a.mozCancelRequestAnimationFrame || a.oCancelRequestAnimationFrame || a.msCancelRequestAnimationFrame || clearTimeout
        }(),
        C = q ? " translateZ(0)" : "",
        D = function(c, d) {
            var e, f = this;
            f.wrapper = "object" == typeof c ? c : b.getElementById(c), f.wrapper.style.overflow = "hidden", f.scroller = f.wrapper.children[0], f.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: n,
                hideScrollbar: o,
                fadeScrollbar: o && q,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function(a) {
                    a.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (e in d) f.options[e] = d[e];
            f.x = f.options.x, f.y = f.options.y, f.options.useTransform = s && f.options.useTransform, f.options.hScrollbar = f.options.hScroll && f.options.hScrollbar, f.options.vScrollbar = f.options.vScroll && f.options.vScrollbar, f.options.zoom = f.options.useTransform && f.options.zoom, f.options.useTransition = t && f.options.useTransition, f.options.zoom && n && (C = ""), f.scroller.style[i] = f.options.useTransform ? g + "transform" : "top left", f.scroller.style[j] = "0", f.scroller.style[k] = "0 0", f.options.useTransition && (f.scroller.style[l] = "cubic-bezier(0.33,0.66,0.66,1)"), f.options.useTransform ? f.scroller.style[h] = "translate(" + f.x + "px," + f.y + "px)" + C : f.scroller.style.cssText += ";position:absolute;top:" + f.y + "px;left:" + f.x + "px", f.options.useTransition && (f.options.fixedScrollbar = !0), f.refresh(), f._bind(u, a), f._bind(v), r || "none" != f.options.wheelAction && (f._bind("DOMMouseScroll"), f._bind("mousewheel")), f.options.checkDOMChanges && (f.checkDOMTime = setInterval(function() {
                f._checkDOMChanges()
            }, 500))
        };
    D.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function(a) {
            var b = this;
            switch (a.type) {
                case v:
                    if (!r && 0 !== a.button) return;
                    b._start(a);
                    break;
                case w:
                    b._move(a);
                    break;
                case x:
                case y:
                    b._end(a);
                    break;
                case u:
                    b._resize();
                    break;
                case "DOMMouseScroll":
                case "mousewheel":
                    b._wheel(a);
                    break;
                case z:
                    b._transitionEnd(a)
            }
        },
        _checkDOMChanges: function() {
            this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale || this.refresh()
        },
        _scrollbar: function(a) {
            var c, e = this;
            return e[a + "Scrollbar"] ? (e[a + "ScrollbarWrapper"] || (c = b.createElement("div"), e.options.scrollbarClass ? c.className = e.options.scrollbarClass + a.toUpperCase() : c.style.cssText = "position:absolute;z-index:100;" + ("h" == a ? "height:7px;bottom:1px;left:2px;right:" + (e.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (e.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), c.style.cssText += ";pointer-events:none;" + g + "transition-property:opacity;" + g + "transition-duration:" + (e.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (e.options.hideScrollbar ? "0" : "1"), e.wrapper.appendChild(c), e[a + "ScrollbarWrapper"] = c, c = b.createElement("div"), e.options.scrollbarClass || (c.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + g + "background-clip:padding-box;" + g + "box-sizing:border-box;" + ("h" == a ? "height:100%" : "width:100%") + ";" + g + "border-radius:3px;border-radius:3px"), c.style.cssText += ";pointer-events:none;" + g + "transition-property:" + g + "transform;" + g + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + g + "transition-duration:0;" + g + "transform: translate(0,0)" + C, e.options.useTransition && (c.style.cssText += ";" + g + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), e[a + "ScrollbarWrapper"].appendChild(c), e[a + "ScrollbarIndicator"] = c), "h" == a ? (e.hScrollbarSize = e.hScrollbarWrapper.clientWidth, e.hScrollbarIndicatorSize = d.max(d.round(e.hScrollbarSize * e.hScrollbarSize / e.scrollerW), 8), e.hScrollbarIndicator.style.width = e.hScrollbarIndicatorSize + "px", e.hScrollbarMaxScroll = e.hScrollbarSize - e.hScrollbarIndicatorSize, e.hScrollbarProp = e.hScrollbarMaxScroll / e.maxScrollX) : (e.vScrollbarSize = e.vScrollbarWrapper.clientHeight, e.vScrollbarIndicatorSize = d.max(d.round(e.vScrollbarSize * e.vScrollbarSize / e.scrollerH), 8), e.vScrollbarIndicator.style.height = e.vScrollbarIndicatorSize + "px", e.vScrollbarMaxScroll = e.vScrollbarSize - e.vScrollbarIndicatorSize, e.vScrollbarProp = e.vScrollbarMaxScroll / e.maxScrollY), void e._scrollbarPos(a, !0)) : void(e[a + "ScrollbarWrapper"] && (s && (e[a + "ScrollbarIndicator"].style[h] = ""), e[a + "ScrollbarWrapper"].parentNode.removeChild(e[a + "ScrollbarWrapper"]), e[a + "ScrollbarWrapper"] = null, e[a + "ScrollbarIndicator"] = null))
        },
        _resize: function() {
            var a = this;
            setTimeout(function() {
                a.refresh()
            }, n ? 200 : 0)
        },
        _pos: function(a, b) {
            this.zoomed || (a = this.hScroll ? a : 0, b = this.vScroll ? b : 0, this.options.useTransform ? this.scroller.style[h] = "translate(" + a + "px," + b + "px) scale(" + this.scale + ")" + C : (a = d.round(a), b = d.round(b), this.scroller.style.left = a + "px", this.scroller.style.top = b + "px"), this.x = a, this.y = b, this._scrollbarPos("h"), this._scrollbarPos("v"))
        },
        _scrollbarPos: function(a, b) {
            var c, e = this,
                f = "h" == a ? e.x : e.y;
            e[a + "Scrollbar"] && (f = e[a + "ScrollbarProp"] * f, 0 > f ? (e.options.fixedScrollbar || (c = e[a + "ScrollbarIndicatorSize"] + d.round(3 * f), 8 > c && (c = 8), e[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px"), f = 0) : f > e[a + "ScrollbarMaxScroll"] && (e.options.fixedScrollbar ? f = e[a + "ScrollbarMaxScroll"] : (c = e[a + "ScrollbarIndicatorSize"] - d.round(3 * (f - e[a + "ScrollbarMaxScroll"])), 8 > c && (c = 8), e[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px", f = e[a + "ScrollbarMaxScroll"] + (e[a + "ScrollbarIndicatorSize"] - c))), e[a + "ScrollbarWrapper"].style[m] = "0", e[a + "ScrollbarWrapper"].style.opacity = b && e.options.hideScrollbar ? "0" : "1", e[a + "ScrollbarIndicator"].style[h] = "translate(" + ("h" == a ? f + "px,0)" : "0," + f + "px)") + C)
        },
        _start: function(b) {
            var c, e, f, g, i, j = this,
                k = r ? b.touches[0] : b;
            j.enabled && (j.options.onBeforeScrollStart && j.options.onBeforeScrollStart.call(j, b), (j.options.useTransition || j.options.zoom) && j._transitionTime(0), j.moved = !1, j.animating = !1, j.zoomed = !1, j.distX = 0, j.distY = 0, j.absDistX = 0, j.absDistY = 0, j.dirX = 0, j.dirY = 0, j.options.zoom && r && b.touches.length > 1 && (g = d.abs(b.touches[0].pageX - b.touches[1].pageX), i = d.abs(b.touches[0].pageY - b.touches[1].pageY), j.touchesDistStart = d.sqrt(g * g + i * i), j.originX = d.abs(b.touches[0].pageX + b.touches[1].pageX - 2 * j.wrapperOffsetLeft) / 2 - j.x, j.originY = d.abs(b.touches[0].pageY + b.touches[1].pageY - 2 * j.wrapperOffsetTop) / 2 - j.y, j.options.onZoomStart && j.options.onZoomStart.call(j, b)), j.options.momentum && (j.options.useTransform ? (c = getComputedStyle(j.scroller, null)[h].replace(/[^0-9\-.,]/g, "").split(","), e = +(c[12] || c[4]), f = +(c[13] || c[5])) : (e = +getComputedStyle(j.scroller, null).left.replace(/[^0-9-]/g, ""), f = +getComputedStyle(j.scroller, null).top.replace(/[^0-9-]/g, "")), (e != j.x || f != j.y) && (j.options.useTransition ? j._unbind(z) : B(j.aniTime), j.steps = [], j._pos(e, f), j.options.onScrollEnd && j.options.onScrollEnd.call(j))), j.absStartX = j.x, j.absStartY = j.y, j.startX = j.x, j.startY = j.y, j.pointX = k.pageX, j.pointY = k.pageY, j.startTime = b.timeStamp || Date.now(), j.options.onScrollStart && j.options.onScrollStart.call(j, b), j._bind(w, a), j._bind(x, a), j._bind(y, a))
        },
        _move: function(a) {
            var b, c, e, f = this,
                g = r ? a.touches[0] : a,
                i = g.pageX - f.pointX,
                j = g.pageY - f.pointY,
                k = f.x + i,
                l = f.y + j,
                m = a.timeStamp || Date.now();
            return f.options.onBeforeScrollMove && f.options.onBeforeScrollMove.call(f, a), f.options.zoom && r && a.touches.length > 1 ? (b = d.abs(a.touches[0].pageX - a.touches[1].pageX), c = d.abs(a.touches[0].pageY - a.touches[1].pageY), f.touchesDist = d.sqrt(b * b + c * c), f.zoomed = !0, e = 1 / f.touchesDistStart * f.touchesDist * this.scale, e < f.options.zoomMin ? e = .5 * f.options.zoomMin * Math.pow(2, e / f.options.zoomMin) : e > f.options.zoomMax && (e = 2 * f.options.zoomMax * Math.pow(.5, f.options.zoomMax / e)), f.lastScale = e / this.scale, k = this.originX - this.originX * f.lastScale + this.x, l = this.originY - this.originY * f.lastScale + this.y, this.scroller.style[h] = "translate(" + k + "px," + l + "px) scale(" + e + ")" + C, void(f.options.onZoom && f.options.onZoom.call(f, a))) : (f.pointX = g.pageX, f.pointY = g.pageY, (k > 0 || k < f.maxScrollX) && (k = f.options.bounce ? f.x + i / 2 : k >= 0 || f.maxScrollX >= 0 ? 0 : f.maxScrollX), (l > f.minScrollY || l < f.maxScrollY) && (l = f.options.bounce ? f.y + j / 2 : l >= f.minScrollY || f.maxScrollY >= 0 ? f.minScrollY : f.maxScrollY), f.distX += i, f.distY += j, f.absDistX = d.abs(f.distX), f.absDistY = d.abs(f.distY), void(f.absDistX < 6 && f.absDistY < 6 || (f.options.lockDirection && (f.absDistX > f.absDistY + 5 ? (l = f.y, j = 0) : f.absDistY > f.absDistX + 5 && (k = f.x, i = 0)), f.moved = !0, f._pos(k, l), f.dirX = i > 0 ? -1 : 0 > i ? 1 : 0, f.dirY = j > 0 ? -1 : 0 > j ? 1 : 0, m - f.startTime > 300 && (f.startTime = m, f.startX = f.x, f.startY = f.y), f.options.onScrollMove && f.options.onScrollMove.call(f, a))))
        },
        _end: function(c) {
            if (!r || 0 === c.touches.length) {
                var e, f, g, i, k, l, m, n = this,
                    o = r ? c.changedTouches[0] : c,
                    p = {
                        dist: 0,
                        time: 0
                    },
                    q = {
                        dist: 0,
                        time: 0
                    },
                    s = (c.timeStamp || Date.now()) - n.startTime,
                    t = n.x,
                    u = n.y;
                if (n._unbind(w, a), n._unbind(x, a), n._unbind(y, a), n.options.onBeforeScrollEnd && n.options.onBeforeScrollEnd.call(n, c), n.zoomed) return m = n.scale * n.lastScale, m = Math.max(n.options.zoomMin, m), m = Math.min(n.options.zoomMax, m), n.lastScale = m / n.scale, n.scale = m, n.x = n.originX - n.originX * n.lastScale + n.x, n.y = n.originY - n.originY * n.lastScale + n.y, n.scroller.style[j] = "200ms", n.scroller.style[h] = "translate(" + n.x + "px," + n.y + "px) scale(" + n.scale + ")" + C, n.zoomed = !1, n.refresh(), void(n.options.onZoomEnd && n.options.onZoomEnd.call(n, c));
                if (!n.moved) return r && (n.doubleTapTimer && n.options.zoom ? (clearTimeout(n.doubleTapTimer), n.doubleTapTimer = null, n.options.onZoomStart && n.options.onZoomStart.call(n, c), n.zoom(n.pointX, n.pointY, 1 == n.scale ? n.options.doubleTapZoom : 1), n.options.onZoomEnd && setTimeout(function() {
                    n.options.onZoomEnd.call(n, c)
                }, 200)) : this.options.handleClick && (n.doubleTapTimer = setTimeout(function() {
                    for (n.doubleTapTimer = null, e = o.target; 1 != e.nodeType;) e = e.parentNode;
                    "SELECT" != e.tagName && "INPUT" != e.tagName && "TEXTAREA" != e.tagName && (f = b.createEvent("MouseEvents"), f.initMouseEvent("click", !0, !0, c.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, 0, null), f._fake = !0, e.dispatchEvent(f))
                }, n.options.zoom ? 250 : 0))), n._resetPos(400), void(n.options.onTouchEnd && n.options.onTouchEnd.call(n, c));
                if (300 > s && n.options.momentum && (p = t ? n._momentum(t - n.startX, s, -n.x, n.scrollerW - n.wrapperW + n.x, n.options.bounce ? n.wrapperW : 0) : p, q = u ? n._momentum(u - n.startY, s, -n.y, n.maxScrollY < 0 ? n.scrollerH - n.wrapperH + n.y - n.minScrollY : 0, n.options.bounce ? n.wrapperH : 0) : q, t = n.x + p.dist, u = n.y + q.dist, (n.x > 0 && t > 0 || n.x < n.maxScrollX && t < n.maxScrollX) && (p = {
                        dist: 0,
                        time: 0
                    }), (n.y > n.minScrollY && u > n.minScrollY || n.y < n.maxScrollY && u < n.maxScrollY) && (q = {
                        dist: 0,
                        time: 0
                    })), p.dist || q.dist) return k = d.max(d.max(p.time, q.time), 10), n.options.snap && (g = t - n.absStartX, i = u - n.absStartY, d.abs(g) < n.options.snapThreshold && d.abs(i) < n.options.snapThreshold ? n.scrollTo(n.absStartX, n.absStartY, 200) : (l = n._snap(t, u), t = l.x, u = l.y, k = d.max(l.time, k))), n.scrollTo(d.round(t), d.round(u), k), void(n.options.onTouchEnd && n.options.onTouchEnd.call(n, c));
                if (n.options.snap) return g = t - n.absStartX, i = u - n.absStartY, d.abs(g) < n.options.snapThreshold && d.abs(i) < n.options.snapThreshold ? n.scrollTo(n.absStartX, n.absStartY, 200) : (l = n._snap(n.x, n.y), (l.x != n.x || l.y != n.y) && n.scrollTo(l.x, l.y, l.time)), void(n.options.onTouchEnd && n.options.onTouchEnd.call(n, c));
                n._resetPos(200), n.options.onTouchEnd && n.options.onTouchEnd.call(n, c)
            }
        },
        _resetPos: function(a) {
            var b = this,
                c = b.x >= 0 ? 0 : b.x < b.maxScrollX ? b.maxScrollX : b.x,
                d = b.y >= b.minScrollY || b.maxScrollY > 0 ? b.minScrollY : b.y < b.maxScrollY ? b.maxScrollY : b.y;
            return c == b.x && d == b.y ? (b.moved && (b.moved = !1, b.options.onScrollEnd && b.options.onScrollEnd.call(b)), b.hScrollbar && b.options.hideScrollbar && ("webkit" == f && (b.hScrollbarWrapper.style[m] = "300ms"), b.hScrollbarWrapper.style.opacity = "0"), void(b.vScrollbar && b.options.hideScrollbar && ("webkit" == f && (b.vScrollbarWrapper.style[m] = "300ms"), b.vScrollbarWrapper.style.opacity = "0"))) : void b.scrollTo(c, d, a || 0)
        },
        _wheel: function(a) {
            var b, c, d, e, f, g = this;
            if ("wheelDeltaX" in a) b = a.wheelDeltaX / 12, c = a.wheelDeltaY / 12;
            else if ("wheelDelta" in a) b = c = a.wheelDelta / 12;
            else {
                if (!("detail" in a)) return;
                b = c = 3 * -a.detail
            }
            return "zoom" == g.options.wheelAction ? (f = g.scale * Math.pow(2, 1 / 3 * (c ? c / Math.abs(c) : 0)), f < g.options.zoomMin && (f = g.options.zoomMin), f > g.options.zoomMax && (f = g.options.zoomMax), void(f != g.scale && (!g.wheelZoomCount && g.options.onZoomStart && g.options.onZoomStart.call(g, a), g.wheelZoomCount++, g.zoom(a.pageX, a.pageY, f, 400), setTimeout(function() {
                g.wheelZoomCount--, !g.wheelZoomCount && g.options.onZoomEnd && g.options.onZoomEnd.call(g, a)
            }, 400)))) : (d = g.x + b, e = g.y + c, d > 0 ? d = 0 : d < g.maxScrollX && (d = g.maxScrollX), e > g.minScrollY ? e = g.minScrollY : e < g.maxScrollY && (e = g.maxScrollY), void(g.maxScrollY < 0 && g.scrollTo(d, e, 0)))
        },
        _transitionEnd: function(a) {
            var b = this;
            a.target == b.scroller && (b._unbind(z), b._startAni())
        },
        _startAni: function() {
            var a, b, c, e = this,
                f = e.x,
                g = e.y,
                h = Date.now();
            if (!e.animating) {
                if (!e.steps.length) return void e._resetPos(400);
                if (a = e.steps.shift(), a.x == f && a.y == g && (a.time = 0), e.animating = !0, e.moved = !0, e.options.useTransition) return e._transitionTime(a.time), e._pos(a.x, a.y), e.animating = !1, void(a.time ? e._bind(z) : e._resetPos(0));
                c = function() {
                    var i, j, k = Date.now();
                    return k >= h + a.time ? (e._pos(a.x, a.y), e.animating = !1, e.options.onAnimationEnd && e.options.onAnimationEnd.call(e), void e._startAni()) : (k = (k - h) / a.time - 1, b = d.sqrt(1 - k * k), i = (a.x - f) * b + f, j = (a.y - g) * b + g, e._pos(i, j), void(e.animating && (e.aniTime = A(c))))
                }, c()
            }
        },
        _transitionTime: function(a) {
            a += "ms", this.scroller.style[j] = a, this.hScrollbar && (this.hScrollbarIndicator.style[j] = a), this.vScrollbar && (this.vScrollbarIndicator.style[j] = a)
        },
        _momentum: function(a, b, c, e, f) {
            var g = 6e-4,
                h = d.abs(a) / b,
                i = h * h / (2 * g),
                j = 0,
                k = 0;
            return a > 0 && i > c ? (k = f / (6 / (i / h * g)), c += k, h = h * c / i, i = c) : 0 > a && i > e && (k = f / (6 / (i / h * g)), e += k, h = h * e / i, i = e), i *= 0 > a ? -1 : 1, j = h / g, {
                dist: i,
                time: d.round(j)
            }
        },
        _offset: function(a) {
            for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
            return a != this.wrapper && (b *= this.scale, c *= this.scale), {
                left: b,
                top: c
            }
        },
        _snap: function(a, b) {
            var c, e, f, g, h, i, j = this;
            for (f = j.pagesX.length - 1, c = 0, e = j.pagesX.length; e > c; c++)
                if (a >= j.pagesX[c]) {
                    f = c;
                    break
                }
            for (f == j.currPageX && f > 0 && j.dirX < 0 && f--, a = j.pagesX[f], h = d.abs(a - j.pagesX[j.currPageX]), h = h ? d.abs(j.x - a) / h * 500 : 0, j.currPageX = f, f = j.pagesY.length - 1, c = 0; f > c; c++)
                if (b >= j.pagesY[c]) {
                    f = c;
                    break
                }
            return f == j.currPageY && f > 0 && j.dirY < 0 && f--, b = j.pagesY[f], i = d.abs(b - j.pagesY[j.currPageY]), i = i ? d.abs(j.y - b) / i * 500 : 0, j.currPageY = f, g = d.round(d.max(h, i)) || 200, {
                x: a,
                y: b,
                time: g
            }
        },
        _bind: function(a, b, c) {
            (b || this.scroller).addEventListener(a, this, !!c)
        },
        _unbind: function(a, b, c) {
            (b || this.scroller).removeEventListener(a, this, !!c)
        },
        destroy: function() {
            var b = this;
            b.scroller.style[h] = "", b.hScrollbar = !1, b.vScrollbar = !1, b._scrollbar("h"), b._scrollbar("v"), b._unbind(u, a), b._unbind(v), b._unbind(w, a), b._unbind(x, a), b._unbind(y, a), b.options.hasTouch || (b._unbind("DOMMouseScroll"), b._unbind("mousewheel")), b.options.useTransition && b._unbind(z), b.options.checkDOMChanges && clearInterval(b.checkDOMTime), b.options.onDestroy && b.options.onDestroy.call(b)
        },
        refresh: function() {
            var a, b, c, e, f = this,
                g = 0,
                h = 0;
            if (f.scale < f.options.zoomMin && (f.scale = f.options.zoomMin), f.wrapperW = f.wrapper.clientWidth || 1, f.wrapperH = f.wrapper.clientHeight || 1, f.minScrollY = -f.options.topOffset || 0, f.scrollerW = d.round(f.scroller.offsetWidth * f.scale), f.scrollerH = d.round((f.scroller.offsetHeight + f.minScrollY) * f.scale), f.maxScrollX = f.wrapperW - f.scrollerW, f.maxScrollY = f.wrapperH - f.scrollerH + f.minScrollY, f.dirX = 0, f.dirY = 0, f.options.onRefresh && f.options.onRefresh.call(f), f.hScroll = f.options.hScroll && f.maxScrollX < 0, f.vScroll = f.options.vScroll && (!f.options.bounceLock && !f.hScroll || f.scrollerH > f.wrapperH), f.hScrollbar = f.hScroll && f.options.hScrollbar, f.vScrollbar = f.vScroll && f.options.vScrollbar && f.scrollerH > f.wrapperH, a = f._offset(f.wrapper), f.wrapperOffsetLeft = -a.left, f.wrapperOffsetTop = -a.top, "string" == typeof f.options.snap)
                for (f.pagesX = [], f.pagesY = [], e = f.scroller.querySelectorAll(f.options.snap), b = 0, c = e.length; c > b; b++) g = f._offset(e[b]), g.left += f.wrapperOffsetLeft, g.top += f.wrapperOffsetTop, f.pagesX[b] = g.left < f.maxScrollX ? f.maxScrollX : g.left * f.scale, f.pagesY[b] = g.top < f.maxScrollY ? f.maxScrollY : g.top * f.scale;
            else if (f.options.snap) {
                for (f.pagesX = []; g >= f.maxScrollX;) f.pagesX[h] = g, g -= f.wrapperW, h++;
                for (f.maxScrollX % f.wrapperW && (f.pagesX[f.pagesX.length] = f.maxScrollX - f.pagesX[f.pagesX.length - 1] + f.pagesX[f.pagesX.length - 1]), g = 0, h = 0, f.pagesY = []; g >= f.maxScrollY;) f.pagesY[h] = g, g -= f.wrapperH, h++;
                f.maxScrollY % f.wrapperH && (f.pagesY[f.pagesY.length] = f.maxScrollY - f.pagesY[f.pagesY.length - 1] + f.pagesY[f.pagesY.length - 1])
            }
            f._scrollbar("h"), f._scrollbar("v"), f.zoomed || (f.scroller.style[j] = "0", f._resetPos(400))
        },
        scrollTo: function(a, b, c, d) {
            var e, f, g = this,
                h = a;
            for (g.stop(), h.length || (h = [{
                    x: a,
                    y: b,
                    time: c,
                    relative: d
                }]), e = 0, f = h.length; f > e; e++) h[e].relative && (h[e].x = g.x - h[e].x, h[e].y = g.y - h[e].y), g.steps.push({
                x: h[e].x,
                y: h[e].y,
                time: h[e].time || 0
            });
            g._startAni()
        },
        scrollToElement: function(a, b) {
            var c, e = this;
            a = a.nodeType ? a : e.scroller.querySelector(a), a && (c = e._offset(a), c.left += e.wrapperOffsetLeft, c.top += e.wrapperOffsetTop, c.left = c.left > 0 ? 0 : c.left < e.maxScrollX ? e.maxScrollX : c.left, c.top = c.top > e.minScrollY ? e.minScrollY : c.top < e.maxScrollY ? e.maxScrollY : c.top, b = void 0 === b ? d.max(2 * d.abs(c.left), 2 * d.abs(c.top)) : b, e.scrollTo(c.left, c.top, b))
        },
        scrollToPage: function(a, b, c) {
            var d, e, f = this;
            c = void 0 === c ? 400 : c, f.options.onScrollStart && f.options.onScrollStart.call(f), f.options.snap ? (a = "next" == a ? f.currPageX + 1 : "prev" == a ? f.currPageX - 1 : a, b = "next" == b ? f.currPageY + 1 : "prev" == b ? f.currPageY - 1 : b, a = 0 > a ? 0 : a > f.pagesX.length - 1 ? f.pagesX.length - 1 : a, b = 0 > b ? 0 : b > f.pagesY.length - 1 ? f.pagesY.length - 1 : b, f.currPageX = a, f.currPageY = b, d = f.pagesX[a], e = f.pagesY[b]) : (d = -f.wrapperW * a, e = -f.wrapperH * b, d < f.maxScrollX && (d = f.maxScrollX), e < f.maxScrollY && (e = f.maxScrollY)), f.scrollTo(d, e, c)
        },
        disable: function() {
            this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(w, a), this._unbind(x, a), this._unbind(y, a)
        },
        enable: function() {
            this.enabled = !0
        },
        stop: function() {
            this.options.useTransition ? this._unbind(z) : B(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1
        },
        zoom: function(a, b, c, d) {
            var e = this,
                f = c / e.scale;
            e.options.useTransform && (e.zoomed = !0, d = void 0 === d ? 200 : d, a = a - e.wrapperOffsetLeft - e.x, b = b - e.wrapperOffsetTop - e.y, e.x = a - a * f + e.x, e.y = b - b * f + e.y, e.scale = c, e.refresh(), e.x = e.x > 0 ? 0 : e.x < e.maxScrollX ? e.maxScrollX : e.x, e.y = e.y > e.minScrollY ? e.minScrollY : e.y < e.maxScrollY ? e.maxScrollY : e.y, e.scroller.style[j] = d + "ms", e.scroller.style[h] = "translate(" + e.x + "px," + e.y + "px) scale(" + c + ")" + C, e.zoomed = !1)
        },
        isReady: function() {
            return !this.moved && !this.zoomed && !this.animating
        }
    }, e = null, "undefined" != typeof exports ? exports.iScroll = D : a.iScroll = D
}(window, document);
jQuery.the = function(e, b, a) {
    if (1 < arguments.length && (null === b || "object" !== typeof b)) {
        a = jQuery.extend({}, a);
        null === b && (a.expires = -1);
        if ("number" === typeof a.expires) {
            var d = a.expires,
                c = a.expires = new Date;
            c.setDate(c.getDate() + d)
        }
        return document.cookie = [encodeURIComponent(e), "=", a.raw ? "" + b : encodeURIComponent("" + b), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
    }
    a = b || {};
    c = a.raw ? function(a) {
        return a
    } : decodeURIComponent;
    return (d = RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? c(d[1]) : null
};
! function(a) {
    "use strict";
    a.fmatter = {}, a.extend(a.fmatter, {
        isBoolean: function(a) {
            return "boolean" == typeof a
        },
        isObject: function(b) {
            return b && ("object" == typeof b || a.isFunction(b)) || !1
        },
        isString: function(a) {
            return "string" == typeof a
        },
        isNumber: function(a) {
            return "number" == typeof a && isFinite(a)
        },
        isValue: function(a) {
            return this.isObject(a) || this.isString(a) || this.isNumber(a) || this.isBoolean(a)
        },
        isEmpty: function(b) {
            return !this.isString(b) && this.isValue(b) ? !1 : this.isValue(b) ? (b = a.trim(b).replace(/\&nbsp\;/gi, "").replace(/\&#160\;/gi, ""), "" === b) : !0
        }
    }), a.fn.fmatter = function(b, c, d, e, f) {
        var g = c;
        d = a.extend({}, a.jgrid.getRegional(this, "formatter"), d);
        try {
            g = a.fn.fmatter[b].call(this, c, d, e, f)
        } catch (h) {}
        return g
    }, a.fmatter.util = {
        NumberFormat: function(b, c) {
            if (a.fmatter.isNumber(b) || (b *= 1), a.fmatter.isNumber(b)) {
                try {
                    var d, e = 0 > b,
                        f = String(b),
                        g = c.decimalSeparator || ".";
                    if (a.fmatter.isNumber(c.decimalPlaces)) {
                        var h = c.decimalPlaces,
                            i = Math.pow(10, h);
                        if (f = String(Math.round(b * i) / i), d = f.lastIndexOf("."), h > 0)
                            for (0 > d ? (f += g, d = f.length - 1) : "." !== g && (f = f.replace(".", g)); f.length - 1 - d < h;) f += "0"
                    }
                    if (c.thousandsSeparator) {
                        var j = c.thousandsSeparator;
                        d = f.lastIndexOf(g), d = d > -1 ? d : f.length;
                        var k, l = f.substring(d),
                            m = -1;
                        for (k = d; k > 0; k--) m++, m % 3 === 0 && k !== d && (!e || k > 1) && (l = j + l), l = f.charAt(k - 1) + l;
                        f = l
                    }
                    return f = c.prefix ? c.prefix + f : f, f = c.suffix ? f + c.suffix : f
                } catch (err) {}
            }
            return b
        }
    }, a.fn.fmatter.defaultFormat = function(b, c) {
        return a.fmatter.isValue(b) && "" !== b ? b : c.defaultValue || "&#160;"
    }, a.fn.fmatter.email = function(b, c) {
        return a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : '<a href="mailto:' + b + '">' + b + "</a>"
    }, a.fn.fmatter.checkbox = function(b, c) {
        var d, e = a.extend({}, c.checkbox);
        void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (e = a.extend({}, e, c.colModel.formatoptions)), d = e.disabled === !0 ? 'disabled="disabled"' : "", (a.fmatter.isEmpty(b) || void 0 === b) && (b = a.fn.fmatter.defaultFormat(b, e)), b = String(b), b = (b + "").toLowerCase();
        var f = b.search(/(false|f|0|no|n|off|undefined)/i) < 0 ? " checked='checked' " : "",
            g = "jqgridcheck" + Math.floor(11 * Math.random());
        return '<input data-role="none"  id="' + g + '" type="checkbox" ' + f + ' value="' + b + '" offval="no" ' + d + "/>"
    }, a.fn.fmatter.link = function(b, c) {
        var d = {
                target: c.target
            },
            e = "";
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), d.target && (e = "target=" + d.target), a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : "<a " + e + ' href="' + b + '">' + b + "</a>"
    }, a.fn.fmatter.showlink = function(b, c) {
        var d, e = {
                baseLinkUrl: c.baseLinkUrl,
                showAction: c.showAction,
                addParam: c.addParam || "",
                target: c.target,
                idName: c.idName
            },
            f = "";
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (e = a.extend({}, e, c.colModel.formatoptions)), e.target && (f = "target=" + e.target), d = e.baseLinkUrl + e.showAction + "?" + e.idName + "=" + c.rowId + e.addParam, a.fmatter.isString(b) || a.fmatter.isNumber(b) ? "<a " + f + ' href="' + d + '">' + b + "</a>" : a.fn.fmatter.defaultFormat(b, c)
    }, a.fn.fmatter.integer = function(b, c) {
        var d = a.extend({}, c.integer);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), a.fmatter.isEmpty(b) ? d.defaultValue : a.fmatter.util.NumberFormat(b, d)
    }, a.fn.fmatter.number = function(b, c) {
        var d = a.extend({}, c.number);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), a.fmatter.isEmpty(b) ? d.defaultValue : a.fmatter.util.NumberFormat(b, d)
    }, a.fn.fmatter.currency = function(b, c) {
        var d = a.extend({}, c.currency);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), a.fmatter.isEmpty(b) ? d.defaultValue : a.fmatter.util.NumberFormat(b, d)
    }, a.fn.fmatter.date = function(b, c, d, e) {
        var f = a.extend({}, c.date);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (f = a.extend({}, f, c.colModel.formatoptions)), f.reformatAfterEdit || "edit" !== e ? a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : a.jgrid.parseDate.call(this, f.srcformat, b, f.newformat, f) : a.fn.fmatter.defaultFormat(b, c)
    }, a.fn.fmatter.select = function(b, c) {
        b = String(b);
        var d, e, f = !1,
            g = [];
        if (void 0 !== c.colModel.formatoptions ? (f = c.colModel.formatoptions.value, d = void 0 === c.colModel.formatoptions.separator ? ":" : c.colModel.formatoptions.separator, e = void 0 === c.colModel.formatoptions.delimiter ? ";" : c.colModel.formatoptions.delimiter) : void 0 !== c.colModel.editoptions && (f = c.colModel.editoptions.value, d = void 0 === c.colModel.editoptions.separator ? ":" : c.colModel.editoptions.separator, e = void 0 === c.colModel.editoptions.delimiter ? ";" : c.colModel.editoptions.delimiter), f) {
            var h, i = (null != c.colModel.editoptions && c.colModel.editoptions.multiple === !0) == !0 ? !0 : !1,
                j = [];
            if (i && (j = b.split(","), j = a.map(j, function(b) {
                    return a.trim(b)
                })), a.fmatter.isString(f)) {
                var k, l = f.split(e),
                    m = 0;
                for (k = 0; k < l.length; k++)
                    if (h = l[k].split(d), h.length > 2 && (h[1] = a.map(h, function(a, b) {
                            return b > 0 ? a : void 0
                        }).join(d)), i) a.inArray(h[0], j) > -1 && (g[m] = h[1], m++);
                    else if (a.trim(h[0]) === a.trim(b)) {
                    g[0] = h[1];
                    break
                }
            } else a.fmatter.isObject(f) && (i ? g = a.map(j, function(a) {
                return f[a]
            }) : g[0] = f[b] || "")
        }
        return b = g.join(", "), "" === b ? a.fn.fmatter.defaultFormat(b, c) : b
    }, a.fn.fmatter.rowactions = function(b) {
        var c = a(this).closest("tr.jqgrow"),
            d = c.attr("id"),
            e = a(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1"),
            f = a("#" + e),
            g = f[0],
            h = g.p,
            i = h.colModel[a.jgrid.getCellIndex(this)],
            j = i.frozen ? a("tr#" + d + " td:eq(" + a.jgrid.getCellIndex(this) + ") > div", f) : a(this).parent(),
            k = {
                extraparam: {}
            },
            l = function(b, c) {
                a.isFunction(k.afterSave) && k.afterSave.call(g, b, c), j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide()
            },
            m = function(b) {
                a.isFunction(k.afterRestore) && k.afterRestore.call(g, b), j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide()
            };
        void 0 !== i.formatoptions && (k = a.extend(k, i.formatoptions)), void 0 !== h.editOptions && (k.editOptions = h.editOptions), void 0 !== h.delOptions && (k.delOptions = h.delOptions), c.hasClass("jqgrid-new-row") && (k.extraparam[h.prmNames.oper] = h.prmNames.addoper);
        var n = {
            keys: k.keys,
            oneditfunc: k.onEdit,
            successfunc: k.onSuccess,
            url: k.url,
            extraparam: k.extraparam,
            aftersavefunc: l,
            errorfunc: k.onError,
            afterrestorefunc: m,
            restoreAfterError: k.restoreAfterError,
            mtype: k.mtype
        };
        switch (b) {
            case "edit":
                f.jqGrid("editRow", d, n), j.find("div.ui-inline-edit,div.ui-inline-del").hide(), j.find("div.ui-inline-save,div.ui-inline-cancel").show(), f.triggerHandler("jqGridAfterGridComplete");
                break;
            case "save":
                f.jqGrid("saveRow", d, n) && (j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide(), f.triggerHandler("jqGridAfterGridComplete"));
                break;
            case "cancel":
                f.jqGrid("restoreRow", d, m), j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide(), f.triggerHandler("jqGridAfterGridComplete");
                break;
            case "del":
                f.jqGrid("delGridRow", d, k.delOptions);
                break;
            case "formedit":
                f.jqGrid("setSelection", d), f.jqGrid("editGridRow", d, k.editOptions)
        }
    }, a.fn.fmatter.actions = function(b, c) {
        var d, e = {
                keys: !1,
                editbutton: !0,
                delbutton: !0,
                editformbutton: !1
            },
            f = c.rowId,
            g = "",
            h = a.jgrid.getRegional(this, "nav"),
            i = a.jgrid.styleUI[c.styleUI || "jQueryUI"].fmatter,
            j = a.jgrid.styleUI[c.styleUI || "jQueryUI"].common;
        if (void 0 !== c.colModel.formatoptions && (e = a.extend(e, c.colModel.formatoptions)), void 0 === f || a.fmatter.isEmpty(f)) return "";
        var k = "onmouseover=jQuery(this).addClass('" + j.hover + "'); onmouseout=jQuery(this).removeClass('" + j.hover + "');  ";
        return e.editformbutton ? (d = "id='jEditButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); " + k, g += "<div title='" + h.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + d + "><span class='" + j.icon_base + " " + i.icon_edit + "'></span></div>") : e.editbutton && (d = "id='jEditButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); " + k, g += "<div title='" + h.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + d + "><span class='" + j.icon_base + " " + i.icon_edit + "'></span></div>"), e.delbutton && (d = "id='jDeleteButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); " + k, g += "<div title='" + h.deltitle + "' style='float:left;' class='ui-pg-div ui-inline-del' " + d + "><span class='" + j.icon_base + " " + i.icon_del + "'></span></div>"), d = "id='jSaveButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); " + k, g += "<div title='" + h.savetitle + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " + d + "><span class='" + j.icon_base + " " + i.icon_save + "'></span></div>", d = "id='jCancelButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); " + k, g += "<div title='" + h.canceltitle + "' style='float:left;display:none;' class='ui-pg-div ui-inline-cancel' " + d + "><span class='" + j.icon_base + " " + i.icon_cancel + "'></span></div>", "<div style='margin-left:8px;'>" + g + "</div>"
    }, a.unformat = function(b, c, d, e) {
        var f, g, h = c.colModel.formatter,
            i = c.colModel.formatoptions || {},
            j = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
            k = c.colModel.unformat || a.fn.fmatter[h] && a.fn.fmatter[h].unformat;
        if (void 0 !== k && a.isFunction(k)) f = k.call(this, a(b).text(), c, b);
        else if (void 0 !== h && a.fmatter.isString(h)) {
            var l, m = a.jgrid.getRegional(this, "formatter") || {};
            switch (h) {
                case "integer":
                    i = a.extend({}, m.integer, i), g = i.thousandsSeparator.replace(j, "\\$1"), l = new RegExp(g, "g"), f = a(b).text().replace(l, "");
                    break;
                case "number":
                    i = a.extend({}, m.number, i), g = i.thousandsSeparator.replace(j, "\\$1"), l = new RegExp(g, "g"), f = a(b).text().replace(l, "").replace(i.decimalSeparator, ".");
                    break;
                case "currency":
                    i = a.extend({}, m.currency, i), g = i.thousandsSeparator.replace(j, "\\$1"), l = new RegExp(g, "g"), f = a(b).text(), i.prefix && i.prefix.length && (f = f.substr(i.prefix.length)), i.suffix && i.suffix.length && (f = f.substr(0, f.length - i.suffix.length)), f = f.replace(l, "").replace(i.decimalSeparator, ".");
                    break;
                case "checkbox":
                    var n = c.colModel.editoptions ? c.colModel.editoptions.value.split(":") : ["Yes", "No"];
                    f = a("input", b).is(":checked") ? n[0] : n[1];
                    break;
                case "select":
                    f = a.unformat.select(b, c, d, e);
                    break;
                case "actions":
                    return "";
                default:
                    f = a(b).text()
            }
        }
        return void 0 !== f ? f : e === !0 ? a(b).text() : a.jgrid.htmlDecode(a(b).html())
    }, a.unformat.select = function(b, c, d, e) {
        var f = [],
            g = a(b).text();
        if (e === !0) return g;
        var h = a.extend({}, void 0 !== c.colModel.formatoptions ? c.colModel.formatoptions : c.colModel.editoptions),
            i = void 0 === h.separator ? ":" : h.separator,
            j = void 0 === h.delimiter ? ";" : h.delimiter;
        if (h.value) {
            var k, l = h.value,
                m = h.multiple === !0 ? !0 : !1,
                n = [];
            if (m && (n = g.split(","), n = a.map(n, function(b) {
                    return a.trim(b)
                })), a.fmatter.isString(l)) {
                var o, p = l.split(j),
                    q = 0;
                for (o = 0; o < p.length; o++)
                    if (k = p[o].split(i), k.length > 2 && (k[1] = a.map(k, function(a, b) {
                            return b > 0 ? a : void 0
                        }).join(i)), m) a.inArray(a.trim(k[1]), n) > -1 && (f[q] = k[0], q++);
                    else if (a.trim(k[1]) === a.trim(g)) {
                    f[0] = k[0];
                    break
                }
            } else(a.fmatter.isObject(l) || a.isArray(l)) && (m || (n[0] = g), f = a.map(n, function(b) {
                var c;
                return a.each(l, function(a, d) {
                    return d === b ? (c = a, !1) : void 0
                }), void 0 !== c ? c : void 0
            }));
            return f.join(", ")
        }
        return g || ""
    }, a.unformat.date = function(b, c) {
        var d = a.jgrid.getRegional(this, "formatter.date") || {};
        return void 0 !== c.formatoptions && (d = a.extend({}, d, c.formatoptions)), a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : a.jgrid.parseDate.call(this, d.newformat, b, d.srcformat, d)
    }
}(jQuery);
