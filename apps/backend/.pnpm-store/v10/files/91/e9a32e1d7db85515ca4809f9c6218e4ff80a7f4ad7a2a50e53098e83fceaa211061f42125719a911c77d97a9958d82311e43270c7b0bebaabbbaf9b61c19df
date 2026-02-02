import po from "uglify-js";
var wi = typeof global == "object" && global && global.Object === Object && global, mo = typeof self == "object" && self && self.Object === Object && self, Se = wi || mo || Function("return this")(), ue = Se.Symbol, Ui = Object.prototype, go = Ui.hasOwnProperty, Eo = Ui.toString, ut = ue ? ue.toStringTag : void 0;
function To(t) {
  var e = go.call(t, ut), n = t[ut];
  try {
    t[ut] = void 0;
    var r = !0;
  } catch {
  }
  var i = Eo.call(t);
  return r && (e ? t[ut] = n : delete t[ut]), i;
}
var yo = Object.prototype, Ao = yo.toString;
function _o(t) {
  return Ao.call(t);
}
var vo = "[object Null]", Ro = "[object Undefined]", kr = ue ? ue.toStringTag : void 0;
function Be(t) {
  return t == null ? t === void 0 ? Ro : vo : kr && kr in Object(t) ? To(t) : _o(t);
}
function Ee(t) {
  return t != null && typeof t == "object";
}
var Oo = "[object Symbol]";
function en(t) {
  return typeof t == "symbol" || Ee(t) && Be(t) == Oo;
}
function tn(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var x = Array.isArray, br = ue ? ue.prototype : void 0, xr = br ? br.toString : void 0;
function Di(t) {
  if (typeof t == "string")
    return t;
  if (x(t))
    return tn(t, Di) + "";
  if (en(t))
    return xr ? xr.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
var So = /\s/;
function Io(t) {
  for (var e = t.length; e-- && So.test(t.charAt(e)); )
    ;
  return e;
}
var No = /^\s+/;
function Lo(t) {
  return t && t.slice(0, Io(t) + 1).replace(No, "");
}
function le(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Mr = NaN, Co = /^[-+]0x[0-9a-f]+$/i, ko = /^0b[01]+$/i, bo = /^0o[0-7]+$/i, xo = parseInt;
function Mo(t) {
  if (typeof t == "number")
    return t;
  if (en(t))
    return Mr;
  if (le(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = le(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Lo(t);
  var n = ko.test(t);
  return n || bo.test(t) ? xo(t.slice(2), n ? 2 : 8) : Co.test(t) ? Mr : +t;
}
var Pr = 1 / 0, Po = 17976931348623157e292;
function wo(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = Mo(t), t === Pr || t === -Pr) {
    var e = t < 0 ? -1 : 1;
    return e * Po;
  }
  return t === t ? t : 0;
}
function nn(t) {
  var e = wo(t), n = e % 1;
  return e === e ? n ? e - n : e : 0;
}
function tt(t) {
  return t;
}
var Uo = "[object AsyncFunction]", Do = "[object Function]", $o = "[object GeneratorFunction]", Fo = "[object Proxy]";
function Ue(t) {
  if (!le(t))
    return !1;
  var e = Be(t);
  return e == Do || e == $o || e == Uo || e == Fo;
}
var yn = Se["__core-js_shared__"], wr = function() {
  var t = /[^.]+$/.exec(yn && yn.keys && yn.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function jo(t) {
  return !!wr && wr in t;
}
var Go = Function.prototype, Bo = Go.toString;
function Xe(t) {
  if (t != null) {
    try {
      return Bo.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Vo = /[\\^$.*+?()[\]{}|]/g, Ko = /^\[object .+?Constructor\]$/, Ho = Function.prototype, Wo = Object.prototype, zo = Ho.toString, Yo = Wo.hasOwnProperty, Xo = RegExp(
  "^" + zo.call(Yo).replace(Vo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function qo(t) {
  if (!le(t) || jo(t))
    return !1;
  var e = Ue(t) ? Xo : Ko;
  return e.test(Xe(t));
}
function Zo(t, e) {
  return t?.[e];
}
function qe(t, e) {
  var n = Zo(t, e);
  return qo(n) ? n : void 0;
}
var bn = qe(Se, "WeakMap"), Ur = Object.create, Qo = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!le(e))
      return {};
    if (Ur)
      return Ur(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
}();
function Jo(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function V() {
}
function ea(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var ta = 800, na = 16, ra = Date.now;
function ia(t) {
  var e = 0, n = 0;
  return function() {
    var r = ra(), i = na - (r - n);
    if (n = r, i > 0) {
      if (++e >= ta)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function sa(t) {
  return function() {
    return t;
  };
}
var Vt = function() {
  try {
    var t = qe(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), oa = Vt ? function(t, e) {
  return Vt(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: sa(e),
    writable: !0
  });
} : tt, aa = ia(oa);
function $i(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
function Fi(t, e, n, r) {
  for (var i = t.length, s = n + -1; ++s < i; )
    if (e(t[s], s, t))
      return s;
  return -1;
}
function ca(t) {
  return t !== t;
}
function ua(t, e, n) {
  for (var r = n - 1, i = t.length; ++r < i; )
    if (t[r] === e)
      return r;
  return -1;
}
function Qn(t, e, n) {
  return e === e ? ua(t, e, n) : Fi(t, ca, n);
}
function ji(t, e) {
  var n = t == null ? 0 : t.length;
  return !!n && Qn(t, e, 0) > -1;
}
var la = 9007199254740991, ha = /^(?:0|[1-9]\d*)$/;
function rn(t, e) {
  var n = typeof t;
  return e = e ?? la, !!e && (n == "number" || n != "symbol" && ha.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Jn(t, e, n) {
  e == "__proto__" && Vt ? Vt(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
function _t(t, e) {
  return t === e || t !== t && e !== e;
}
var fa = Object.prototype, da = fa.hasOwnProperty;
function sn(t, e, n) {
  var r = t[e];
  (!(da.call(t, e) && _t(r, n)) || n === void 0 && !(e in t)) && Jn(t, e, n);
}
function er(t, e, n, r) {
  var i = !n;
  n || (n = {});
  for (var s = -1, o = e.length; ++s < o; ) {
    var a = e[s], c = void 0;
    c === void 0 && (c = t[a]), i ? Jn(n, a, c) : sn(n, a, c);
  }
  return n;
}
var Dr = Math.max;
function pa(t, e, n) {
  return e = Dr(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, s = Dr(r.length - e, 0), o = Array(s); ++i < s; )
      o[i] = r[e + i];
    i = -1;
    for (var a = Array(e + 1); ++i < e; )
      a[i] = r[i];
    return a[e] = n(o), Jo(t, this, a);
  };
}
function tr(t, e) {
  return aa(pa(t, e, tt), t + "");
}
var ma = 9007199254740991;
function nr(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ma;
}
function Ie(t) {
  return t != null && nr(t.length) && !Ue(t);
}
function Gi(t, e, n) {
  if (!le(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? Ie(n) && rn(e, n.length) : r == "string" && e in n) ? _t(n[e], t) : !1;
}
function ga(t) {
  return tr(function(e, n) {
    var r = -1, i = n.length, s = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
    for (s = t.length > 3 && typeof s == "function" ? (i--, s) : void 0, o && Gi(n[0], n[1], o) && (s = i < 3 ? void 0 : s, i = 1), e = Object(e); ++r < i; ) {
      var a = n[r];
      a && t(e, a, r, s);
    }
    return e;
  });
}
var Ea = Object.prototype;
function vt(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || Ea;
  return t === n;
}
function Ta(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var ya = "[object Arguments]";
function $r(t) {
  return Ee(t) && Be(t) == ya;
}
var Bi = Object.prototype, Aa = Bi.hasOwnProperty, _a = Bi.propertyIsEnumerable, on = $r(/* @__PURE__ */ function() {
  return arguments;
}()) ? $r : function(t) {
  return Ee(t) && Aa.call(t, "callee") && !_a.call(t, "callee");
};
function va() {
  return !1;
}
var Vi = typeof exports == "object" && exports && !exports.nodeType && exports, Fr = Vi && typeof module == "object" && module && !module.nodeType && module, Ra = Fr && Fr.exports === Vi, jr = Ra ? Se.Buffer : void 0, Oa = jr ? jr.isBuffer : void 0, Et = Oa || va, Sa = "[object Arguments]", Ia = "[object Array]", Na = "[object Boolean]", La = "[object Date]", Ca = "[object Error]", ka = "[object Function]", ba = "[object Map]", xa = "[object Number]", Ma = "[object Object]", Pa = "[object RegExp]", wa = "[object Set]", Ua = "[object String]", Da = "[object WeakMap]", $a = "[object ArrayBuffer]", Fa = "[object DataView]", ja = "[object Float32Array]", Ga = "[object Float64Array]", Ba = "[object Int8Array]", Va = "[object Int16Array]", Ka = "[object Int32Array]", Ha = "[object Uint8Array]", Wa = "[object Uint8ClampedArray]", za = "[object Uint16Array]", Ya = "[object Uint32Array]", $ = {};
$[ja] = $[Ga] = $[Ba] = $[Va] = $[Ka] = $[Ha] = $[Wa] = $[za] = $[Ya] = !0;
$[Sa] = $[Ia] = $[$a] = $[Na] = $[Fa] = $[La] = $[Ca] = $[ka] = $[ba] = $[xa] = $[Ma] = $[Pa] = $[wa] = $[Ua] = $[Da] = !1;
function Xa(t) {
  return Ee(t) && nr(t.length) && !!$[Be(t)];
}
function an(t) {
  return function(e) {
    return t(e);
  };
}
var Ki = typeof exports == "object" && exports && !exports.nodeType && exports, mt = Ki && typeof module == "object" && module && !module.nodeType && module, qa = mt && mt.exports === Ki, An = qa && wi.process, je = function() {
  try {
    var t = mt && mt.require && mt.require("util").types;
    return t || An && An.binding && An.binding("util");
  } catch {
  }
}(), Gr = je && je.isTypedArray, rr = Gr ? an(Gr) : Xa, Za = Object.prototype, Qa = Za.hasOwnProperty;
function Hi(t, e) {
  var n = x(t), r = !n && on(t), i = !n && !r && Et(t), s = !n && !r && !i && rr(t), o = n || r || i || s, a = o ? Ta(t.length, String) : [], c = a.length;
  for (var u in t)
    (e || Qa.call(t, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    rn(u, c))) && a.push(u);
  return a;
}
function Wi(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Ja = Wi(Object.keys, Object), ec = Object.prototype, tc = ec.hasOwnProperty;
function zi(t) {
  if (!vt(t))
    return Ja(t);
  var e = [];
  for (var n in Object(t))
    tc.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function he(t) {
  return Ie(t) ? Hi(t) : zi(t);
}
var nc = Object.prototype, rc = nc.hasOwnProperty, ne = ga(function(t, e) {
  if (vt(e) || Ie(e)) {
    er(e, he(e), t);
    return;
  }
  for (var n in e)
    rc.call(e, n) && sn(t, n, e[n]);
});
function ic(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var sc = Object.prototype, oc = sc.hasOwnProperty;
function ac(t) {
  if (!le(t))
    return ic(t);
  var e = vt(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !oc.call(t, r)) || n.push(r);
  return n;
}
function Yi(t) {
  return Ie(t) ? Hi(t, !0) : ac(t);
}
var cc = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, uc = /^\w*$/;
function ir(t, e) {
  if (x(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || en(t) ? !0 : uc.test(t) || !cc.test(t) || e != null && t in Object(e);
}
var Tt = qe(Object, "create");
function lc() {
  this.__data__ = Tt ? Tt(null) : {}, this.size = 0;
}
function hc(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var fc = "__lodash_hash_undefined__", dc = Object.prototype, pc = dc.hasOwnProperty;
function mc(t) {
  var e = this.__data__;
  if (Tt) {
    var n = e[t];
    return n === fc ? void 0 : n;
  }
  return pc.call(e, t) ? e[t] : void 0;
}
var gc = Object.prototype, Ec = gc.hasOwnProperty;
function Tc(t) {
  var e = this.__data__;
  return Tt ? e[t] !== void 0 : Ec.call(e, t);
}
var yc = "__lodash_hash_undefined__";
function Ac(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = Tt && e === void 0 ? yc : e, this;
}
function We(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
We.prototype.clear = lc;
We.prototype.delete = hc;
We.prototype.get = mc;
We.prototype.has = Tc;
We.prototype.set = Ac;
function _c() {
  this.__data__ = [], this.size = 0;
}
function cn(t, e) {
  for (var n = t.length; n--; )
    if (_t(t[n][0], e))
      return n;
  return -1;
}
var vc = Array.prototype, Rc = vc.splice;
function Oc(t) {
  var e = this.__data__, n = cn(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : Rc.call(e, n, 1), --this.size, !0;
}
function Sc(t) {
  var e = this.__data__, n = cn(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function Ic(t) {
  return cn(this.__data__, t) > -1;
}
function Nc(t, e) {
  var n = this.__data__, r = cn(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function De(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
De.prototype.clear = _c;
De.prototype.delete = Oc;
De.prototype.get = Sc;
De.prototype.has = Ic;
De.prototype.set = Nc;
var yt = qe(Se, "Map");
function Lc() {
  this.size = 0, this.__data__ = {
    hash: new We(),
    map: new (yt || De)(),
    string: new We()
  };
}
function Cc(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function un(t, e) {
  var n = t.__data__;
  return Cc(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function kc(t) {
  var e = un(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function bc(t) {
  return un(this, t).get(t);
}
function xc(t) {
  return un(this, t).has(t);
}
function Mc(t, e) {
  var n = un(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function $e(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
$e.prototype.clear = Lc;
$e.prototype.delete = kc;
$e.prototype.get = bc;
$e.prototype.has = xc;
$e.prototype.set = Mc;
var Pc = "Expected a function";
function sr(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Pc);
  var n = function() {
    var r = arguments, i = e ? e.apply(this, r) : r[0], s = n.cache;
    if (s.has(i))
      return s.get(i);
    var o = t.apply(this, r);
    return n.cache = s.set(i, o) || s, o;
  };
  return n.cache = new (sr.Cache || $e)(), n;
}
sr.Cache = $e;
var wc = 500;
function Uc(t) {
  var e = sr(t, function(r) {
    return n.size === wc && n.clear(), r;
  }), n = e.cache;
  return e;
}
var Dc = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, $c = /\\(\\)?/g, Fc = Uc(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Dc, function(n, r, i, s) {
    e.push(i ? s.replace($c, "$1") : r || n);
  }), e;
});
function jc(t) {
  return t == null ? "" : Di(t);
}
function ln(t, e) {
  return x(t) ? t : ir(t, e) ? [t] : Fc(jc(t));
}
function Rt(t) {
  if (typeof t == "string" || en(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function or(t, e) {
  e = ln(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[Rt(e[n++])];
  return n && n == r ? t : void 0;
}
function Gc(t, e, n) {
  var r = t == null ? void 0 : or(t, e);
  return r === void 0 ? n : r;
}
function ar(t, e) {
  for (var n = -1, r = e.length, i = t.length; ++n < r; )
    t[i + n] = e[n];
  return t;
}
var Br = ue ? ue.isConcatSpreadable : void 0;
function Bc(t) {
  return x(t) || on(t) || !!(Br && t && t[Br]);
}
function cr(t, e, n, r, i) {
  var s = -1, o = t.length;
  for (n || (n = Bc), i || (i = []); ++s < o; ) {
    var a = t[s];
    n(a) ? ar(i, a) : r || (i[i.length] = a);
  }
  return i;
}
function me(t) {
  var e = t == null ? 0 : t.length;
  return e ? cr(t) : [];
}
var Xi = Wi(Object.getPrototypeOf, Object);
function qi(t, e, n) {
  var r = -1, i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e), n = n > i ? i : n, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var s = Array(i); ++r < i; )
    s[r] = t[r + e];
  return s;
}
function Vc(t, e, n, r) {
  var i = -1, s = t == null ? 0 : t.length;
  for (r && s && (n = t[++i]); ++i < s; )
    n = e(n, t[i], i, t);
  return n;
}
function Kc() {
  this.__data__ = new De(), this.size = 0;
}
function Hc(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
function Wc(t) {
  return this.__data__.get(t);
}
function zc(t) {
  return this.__data__.has(t);
}
var Yc = 200;
function Xc(t, e) {
  var n = this.__data__;
  if (n instanceof De) {
    var r = n.__data__;
    if (!yt || r.length < Yc - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new $e(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
function Oe(t) {
  var e = this.__data__ = new De(t);
  this.size = e.size;
}
Oe.prototype.clear = Kc;
Oe.prototype.delete = Hc;
Oe.prototype.get = Wc;
Oe.prototype.has = zc;
Oe.prototype.set = Xc;
function qc(t, e) {
  return t && er(e, he(e), t);
}
var Zi = typeof exports == "object" && exports && !exports.nodeType && exports, Vr = Zi && typeof module == "object" && module && !module.nodeType && module, Zc = Vr && Vr.exports === Zi, Kr = Zc ? Se.Buffer : void 0, Hr = Kr ? Kr.allocUnsafe : void 0;
function Qc(t, e) {
  var n = t.length, r = Hr ? Hr(n) : new t.constructor(n);
  return t.copy(r), r;
}
function ur(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = 0, s = []; ++n < r; ) {
    var o = t[n];
    e(o, n, t) && (s[i++] = o);
  }
  return s;
}
function Qi() {
  return [];
}
var Jc = Object.prototype, eu = Jc.propertyIsEnumerable, Wr = Object.getOwnPropertySymbols, lr = Wr ? function(t) {
  return t == null ? [] : (t = Object(t), ur(Wr(t), function(e) {
    return eu.call(t, e);
  }));
} : Qi;
function tu(t, e) {
  return er(t, lr(t), e);
}
var nu = Object.getOwnPropertySymbols, ru = nu ? function(t) {
  for (var e = []; t; )
    ar(e, lr(t)), t = Xi(t);
  return e;
} : Qi;
function Ji(t, e, n) {
  var r = e(t);
  return x(t) ? r : ar(r, n(t));
}
function xn(t) {
  return Ji(t, he, lr);
}
function iu(t) {
  return Ji(t, Yi, ru);
}
var Mn = qe(Se, "DataView"), Pn = qe(Se, "Promise"), et = qe(Se, "Set"), zr = "[object Map]", su = "[object Object]", Yr = "[object Promise]", Xr = "[object Set]", qr = "[object WeakMap]", Zr = "[object DataView]", ou = Xe(Mn), au = Xe(yt), cu = Xe(Pn), uu = Xe(et), lu = Xe(bn), ae = Be;
(Mn && ae(new Mn(new ArrayBuffer(1))) != Zr || yt && ae(new yt()) != zr || Pn && ae(Pn.resolve()) != Yr || et && ae(new et()) != Xr || bn && ae(new bn()) != qr) && (ae = function(t) {
  var e = Be(t), n = e == su ? t.constructor : void 0, r = n ? Xe(n) : "";
  if (r)
    switch (r) {
      case ou:
        return Zr;
      case au:
        return zr;
      case cu:
        return Yr;
      case uu:
        return Xr;
      case lu:
        return qr;
    }
  return e;
});
var hu = Object.prototype, fu = hu.hasOwnProperty;
function du(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && fu.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var Kt = Se.Uint8Array;
function pu(t) {
  var e = new t.constructor(t.byteLength);
  return new Kt(e).set(new Kt(t)), e;
}
function mu(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var gu = /\w*$/;
function Eu(t) {
  var e = new t.constructor(t.source, gu.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Qr = ue ? ue.prototype : void 0, Jr = Qr ? Qr.valueOf : void 0;
function Tu(t) {
  return Jr ? Object(Jr.call(t)) : {};
}
function yu(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var Au = "[object Boolean]", _u = "[object Date]", vu = "[object Map]", Ru = "[object Number]", Ou = "[object RegExp]", Su = "[object Set]", Iu = "[object String]", Nu = "[object Symbol]", Lu = "[object ArrayBuffer]", Cu = "[object DataView]", ku = "[object Float32Array]", bu = "[object Float64Array]", xu = "[object Int8Array]", Mu = "[object Int16Array]", Pu = "[object Int32Array]", wu = "[object Uint8Array]", Uu = "[object Uint8ClampedArray]", Du = "[object Uint16Array]", $u = "[object Uint32Array]";
function Fu(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case Lu:
      return pu(t);
    case Au:
    case _u:
      return new r(+t);
    case Cu:
      return mu(t);
    case ku:
    case bu:
    case xu:
    case Mu:
    case Pu:
    case wu:
    case Uu:
    case Du:
    case $u:
      return yu(t);
    case vu:
      return new r();
    case Ru:
    case Iu:
      return new r(t);
    case Ou:
      return Eu(t);
    case Su:
      return new r();
    case Nu:
      return Tu(t);
  }
}
function ju(t) {
  return typeof t.constructor == "function" && !vt(t) ? Qo(Xi(t)) : {};
}
var Gu = "[object Map]";
function Bu(t) {
  return Ee(t) && ae(t) == Gu;
}
var ei = je && je.isMap, Vu = ei ? an(ei) : Bu, Ku = "[object Set]";
function Hu(t) {
  return Ee(t) && ae(t) == Ku;
}
var ti = je && je.isSet, Wu = ti ? an(ti) : Hu, es = "[object Arguments]", zu = "[object Array]", Yu = "[object Boolean]", Xu = "[object Date]", qu = "[object Error]", ts = "[object Function]", Zu = "[object GeneratorFunction]", Qu = "[object Map]", Ju = "[object Number]", ns = "[object Object]", el = "[object RegExp]", tl = "[object Set]", nl = "[object String]", rl = "[object Symbol]", il = "[object WeakMap]", sl = "[object ArrayBuffer]", ol = "[object DataView]", al = "[object Float32Array]", cl = "[object Float64Array]", ul = "[object Int8Array]", ll = "[object Int16Array]", hl = "[object Int32Array]", fl = "[object Uint8Array]", dl = "[object Uint8ClampedArray]", pl = "[object Uint16Array]", ml = "[object Uint32Array]", U = {};
U[es] = U[zu] = U[sl] = U[ol] = U[Yu] = U[Xu] = U[al] = U[cl] = U[ul] = U[ll] = U[hl] = U[Qu] = U[Ju] = U[ns] = U[el] = U[tl] = U[nl] = U[rl] = U[fl] = U[dl] = U[pl] = U[ml] = !0;
U[qu] = U[ts] = U[il] = !1;
function Ut(t, e, n, r, i, s) {
  var o;
  if (o !== void 0)
    return o;
  if (!le(t))
    return t;
  var a = x(t);
  if (a)
    return o = du(t), ea(t, o);
  var c = ae(t), u = c == ts || c == Zu;
  if (Et(t))
    return Qc(t);
  if (c == ns || c == es || u && !i)
    return o = u ? {} : ju(t), tu(t, qc(o, t));
  if (!U[c])
    return i ? t : {};
  o = Fu(t, c), s || (s = new Oe());
  var l = s.get(t);
  if (l)
    return l;
  s.set(t, o), Wu(t) ? t.forEach(function(_) {
    o.add(Ut(_, e, n, _, t, s));
  }) : Vu(t) && t.forEach(function(_, E) {
    o.set(E, Ut(_, e, n, E, t, s));
  });
  var h = xn, f = a ? void 0 : h(t);
  return $i(f || t, function(_, E) {
    f && (E = _, _ = t[E]), sn(o, E, Ut(_, e, n, E, t, s));
  }), o;
}
var gl = 4;
function z(t) {
  return Ut(t, gl);
}
function Ot(t) {
  for (var e = -1, n = t == null ? 0 : t.length, r = 0, i = []; ++e < n; ) {
    var s = t[e];
    s && (i[r++] = s);
  }
  return i;
}
var El = "__lodash_hash_undefined__";
function Tl(t) {
  return this.__data__.set(t, El), this;
}
function yl(t) {
  return this.__data__.has(t);
}
function nt(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new $e(); ++e < n; )
    this.add(t[e]);
}
nt.prototype.add = nt.prototype.push = Tl;
nt.prototype.has = yl;
function rs(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
function hr(t, e) {
  return t.has(e);
}
var Al = 1, _l = 2;
function is(t, e, n, r, i, s) {
  var o = n & Al, a = t.length, c = e.length;
  if (a != c && !(o && c > a))
    return !1;
  var u = s.get(t), l = s.get(e);
  if (u && l)
    return u == e && l == t;
  var h = -1, f = !0, _ = n & _l ? new nt() : void 0;
  for (s.set(t, e), s.set(e, t); ++h < a; ) {
    var E = t[h], y = e[h];
    if (r)
      var R = o ? r(y, E, h, e, t, s) : r(E, y, h, t, e, s);
    if (R !== void 0) {
      if (R)
        continue;
      f = !1;
      break;
    }
    if (_) {
      if (!rs(e, function(g, T) {
        if (!hr(_, T) && (E === g || i(E, g, n, r, s)))
          return _.push(T);
      })) {
        f = !1;
        break;
      }
    } else if (!(E === y || i(E, y, n, r, s))) {
      f = !1;
      break;
    }
  }
  return s.delete(t), s.delete(e), f;
}
function vl(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r, i) {
    n[++e] = [i, r];
  }), n;
}
function fr(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r) {
    n[++e] = r;
  }), n;
}
var Rl = 1, Ol = 2, Sl = "[object Boolean]", Il = "[object Date]", Nl = "[object Error]", Ll = "[object Map]", Cl = "[object Number]", kl = "[object RegExp]", bl = "[object Set]", xl = "[object String]", Ml = "[object Symbol]", Pl = "[object ArrayBuffer]", wl = "[object DataView]", ni = ue ? ue.prototype : void 0, _n = ni ? ni.valueOf : void 0;
function Ul(t, e, n, r, i, s, o) {
  switch (n) {
    case wl:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Pl:
      return !(t.byteLength != e.byteLength || !s(new Kt(t), new Kt(e)));
    case Sl:
    case Il:
    case Cl:
      return _t(+t, +e);
    case Nl:
      return t.name == e.name && t.message == e.message;
    case kl:
    case xl:
      return t == e + "";
    case Ll:
      var a = vl;
    case bl:
      var c = r & Rl;
      if (a || (a = fr), t.size != e.size && !c)
        return !1;
      var u = o.get(t);
      if (u)
        return u == e;
      r |= Ol, o.set(t, e);
      var l = is(a(t), a(e), r, i, s, o);
      return o.delete(t), l;
    case Ml:
      if (_n)
        return _n.call(t) == _n.call(e);
  }
  return !1;
}
var Dl = 1, $l = Object.prototype, Fl = $l.hasOwnProperty;
function jl(t, e, n, r, i, s) {
  var o = n & Dl, a = xn(t), c = a.length, u = xn(e), l = u.length;
  if (c != l && !o)
    return !1;
  for (var h = c; h--; ) {
    var f = a[h];
    if (!(o ? f in e : Fl.call(e, f)))
      return !1;
  }
  var _ = s.get(t), E = s.get(e);
  if (_ && E)
    return _ == e && E == t;
  var y = !0;
  s.set(t, e), s.set(e, t);
  for (var R = o; ++h < c; ) {
    f = a[h];
    var g = t[f], T = e[f];
    if (r)
      var p = o ? r(T, g, f, e, t, s) : r(g, T, f, t, e, s);
    if (!(p === void 0 ? g === T || i(g, T, n, r, s) : p)) {
      y = !1;
      break;
    }
    R || (R = f == "constructor");
  }
  if (y && !R) {
    var A = t.constructor, I = e.constructor;
    A != I && "constructor" in t && "constructor" in e && !(typeof A == "function" && A instanceof A && typeof I == "function" && I instanceof I) && (y = !1);
  }
  return s.delete(t), s.delete(e), y;
}
var Gl = 1, ri = "[object Arguments]", ii = "[object Array]", kt = "[object Object]", Bl = Object.prototype, si = Bl.hasOwnProperty;
function Vl(t, e, n, r, i, s) {
  var o = x(t), a = x(e), c = o ? ii : ae(t), u = a ? ii : ae(e);
  c = c == ri ? kt : c, u = u == ri ? kt : u;
  var l = c == kt, h = u == kt, f = c == u;
  if (f && Et(t)) {
    if (!Et(e))
      return !1;
    o = !0, l = !1;
  }
  if (f && !l)
    return s || (s = new Oe()), o || rr(t) ? is(t, e, n, r, i, s) : Ul(t, e, c, n, r, i, s);
  if (!(n & Gl)) {
    var _ = l && si.call(t, "__wrapped__"), E = h && si.call(e, "__wrapped__");
    if (_ || E) {
      var y = _ ? t.value() : t, R = E ? e.value() : e;
      return s || (s = new Oe()), i(y, R, n, r, s);
    }
  }
  return f ? (s || (s = new Oe()), jl(t, e, n, r, i, s)) : !1;
}
function dr(t, e, n, r, i) {
  return t === e ? !0 : t == null || e == null || !Ee(t) && !Ee(e) ? t !== t && e !== e : Vl(t, e, n, r, dr, i);
}
var Kl = 1, Hl = 2;
function Wl(t, e, n, r) {
  var i = n.length, s = i;
  if (t == null)
    return !s;
  for (t = Object(t); i--; ) {
    var o = n[i];
    if (o[2] ? o[1] !== t[o[0]] : !(o[0] in t))
      return !1;
  }
  for (; ++i < s; ) {
    o = n[i];
    var a = o[0], c = t[a], u = o[1];
    if (o[2]) {
      if (c === void 0 && !(a in t))
        return !1;
    } else {
      var l = new Oe(), h;
      if (!(h === void 0 ? dr(u, c, Kl | Hl, r, l) : h))
        return !1;
    }
  }
  return !0;
}
function ss(t) {
  return t === t && !le(t);
}
function zl(t) {
  for (var e = he(t), n = e.length; n--; ) {
    var r = e[n], i = t[r];
    e[n] = [r, i, ss(i)];
  }
  return e;
}
function os(t, e) {
  return function(n) {
    return n == null ? !1 : n[t] === e && (e !== void 0 || t in Object(n));
  };
}
function Yl(t) {
  var e = zl(t);
  return e.length == 1 && e[0][2] ? os(e[0][0], e[0][1]) : function(n) {
    return n === t || Wl(n, t, e);
  };
}
function Xl(t, e) {
  return t != null && e in Object(t);
}
function as(t, e, n) {
  e = ln(e, t);
  for (var r = -1, i = e.length, s = !1; ++r < i; ) {
    var o = Rt(e[r]);
    if (!(s = t != null && n(t, o)))
      break;
    t = t[o];
  }
  return s || ++r != i ? s : (i = t == null ? 0 : t.length, !!i && nr(i) && rn(o, i) && (x(t) || on(t)));
}
function ql(t, e) {
  return t != null && as(t, e, Xl);
}
var Zl = 1, Ql = 2;
function Jl(t, e) {
  return ir(t) && ss(e) ? os(Rt(t), e) : function(n) {
    var r = Gc(n, t);
    return r === void 0 && r === e ? ql(n, t) : dr(e, r, Zl | Ql);
  };
}
function eh(t) {
  return function(e) {
    return e?.[t];
  };
}
function th(t) {
  return function(e) {
    return or(e, t);
  };
}
function nh(t) {
  return ir(t) ? eh(Rt(t)) : th(t);
}
function Ne(t) {
  return typeof t == "function" ? t : t == null ? tt : typeof t == "object" ? x(t) ? Jl(t[0], t[1]) : Yl(t) : nh(t);
}
function rh(t, e, n, r) {
  for (var i = -1, s = t == null ? 0 : t.length; ++i < s; ) {
    var o = t[i];
    e(r, o, n(o), t);
  }
  return r;
}
function ih(t) {
  return function(e, n, r) {
    for (var i = -1, s = Object(e), o = r(e), a = o.length; a--; ) {
      var c = o[++i];
      if (n(s[c], c, s) === !1)
        break;
    }
    return e;
  };
}
var sh = ih();
function oh(t, e) {
  return t && sh(t, e, he);
}
function ah(t, e) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!Ie(n))
      return t(n, r);
    for (var i = n.length, s = -1, o = Object(n); ++s < i && r(o[s], s, o) !== !1; )
      ;
    return n;
  };
}
var Ze = ah(oh);
function ch(t, e, n, r) {
  return Ze(t, function(i, s, o) {
    e(r, i, n(i), o);
  }), r;
}
function uh(t, e) {
  return function(n, r) {
    var i = x(n) ? rh : ch, s = {};
    return i(n, t, Ne(r), s);
  };
}
var cs = Object.prototype, lh = cs.hasOwnProperty, pr = tr(function(t, e) {
  t = Object(t);
  var n = -1, r = e.length, i = r > 2 ? e[2] : void 0;
  for (i && Gi(e[0], e[1], i) && (r = 1); ++n < r; )
    for (var s = e[n], o = Yi(s), a = -1, c = o.length; ++a < c; ) {
      var u = o[a], l = t[u];
      (l === void 0 || _t(l, cs[u]) && !lh.call(t, u)) && (t[u] = s[u]);
    }
  return t;
});
function oi(t) {
  return Ee(t) && Ie(t);
}
var hh = 200;
function fh(t, e, n, r) {
  var i = -1, s = ji, o = !0, a = t.length, c = [], u = e.length;
  if (!a)
    return c;
  e.length >= hh && (s = hr, o = !1, e = new nt(e));
  e:
    for (; ++i < a; ) {
      var l = t[i], h = l;
      if (l = l !== 0 ? l : 0, o && h === h) {
        for (var f = u; f--; )
          if (e[f] === h)
            continue e;
        c.push(l);
      } else s(e, h, r) || c.push(l);
    }
  return c;
}
var hn = tr(function(t, e) {
  return oi(t) ? fh(t, cr(e, 1, oi, !0)) : [];
});
function rt(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
function W(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : nn(e), qi(t, e < 0 ? 0 : e, r)) : [];
}
function At(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : nn(e), e = r - e, qi(t, 0, e < 0 ? 0 : e)) : [];
}
function dh(t) {
  return typeof t == "function" ? t : tt;
}
function N(t, e) {
  var n = x(t) ? $i : Ze;
  return n(t, dh(e));
}
function ph(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (!e(t[n], n, t))
      return !1;
  return !0;
}
function mh(t, e) {
  var n = !0;
  return Ze(t, function(r, i, s) {
    return n = !!e(r, i, s), n;
  }), n;
}
function ge(t, e, n) {
  var r = x(t) ? ph : mh;
  return r(t, Ne(e));
}
function us(t, e) {
  var n = [];
  return Ze(t, function(r, i, s) {
    e(r, i, s) && n.push(r);
  }), n;
}
function fe(t, e) {
  var n = x(t) ? ur : us;
  return n(t, Ne(e));
}
function gh(t) {
  return function(e, n, r) {
    var i = Object(e);
    if (!Ie(e)) {
      var s = Ne(n);
      e = he(e), n = function(a) {
        return s(i[a], a, i);
      };
    }
    var o = t(e, n, r);
    return o > -1 ? i[s ? e[o] : o] : void 0;
  };
}
var Eh = Math.max;
function Th(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = n == null ? 0 : nn(n);
  return i < 0 && (i = Eh(r + i, 0)), Fi(t, Ne(e), i);
}
var it = gh(Th);
function Te(t) {
  return t && t.length ? t[0] : void 0;
}
function yh(t, e) {
  var n = -1, r = Ie(t) ? Array(t.length) : [];
  return Ze(t, function(i, s, o) {
    r[++n] = e(i, s, o);
  }), r;
}
function v(t, e) {
  var n = x(t) ? tn : yh;
  return n(t, Ne(e));
}
function ce(t, e) {
  return cr(v(t, e));
}
var Ah = Object.prototype, _h = Ah.hasOwnProperty, vh = uh(function(t, e, n) {
  _h.call(t, n) ? t[n].push(e) : Jn(t, n, [e]);
}), Rh = Object.prototype, Oh = Rh.hasOwnProperty;
function Sh(t, e) {
  return t != null && Oh.call(t, e);
}
function S(t, e) {
  return t != null && as(t, e, Sh);
}
var Ih = "[object String]";
function J(t) {
  return typeof t == "string" || !x(t) && Ee(t) && Be(t) == Ih;
}
function Nh(t, e) {
  return tn(e, function(n) {
    return t[n];
  });
}
function K(t) {
  return t == null ? [] : Nh(t, he(t));
}
var Lh = Math.max;
function Z(t, e, n, r) {
  t = Ie(t) ? t : K(t), n = n ? nn(n) : 0;
  var i = t.length;
  return n < 0 && (n = Lh(i + n, 0)), J(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && Qn(t, e, n) > -1;
}
function ai(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = 0;
  return Qn(t, e, i);
}
var Ch = "[object Map]", kh = "[object Set]", bh = Object.prototype, xh = bh.hasOwnProperty;
function D(t) {
  if (t == null)
    return !0;
  if (Ie(t) && (x(t) || typeof t == "string" || typeof t.splice == "function" || Et(t) || rr(t) || on(t)))
    return !t.length;
  var e = ae(t);
  if (e == Ch || e == kh)
    return !t.size;
  if (vt(t))
    return !zi(t).length;
  for (var n in t)
    if (xh.call(t, n))
      return !1;
  return !0;
}
var Mh = "[object RegExp]";
function Ph(t) {
  return Ee(t) && Be(t) == Mh;
}
var ci = je && je.isRegExp, Me = ci ? an(ci) : Ph;
function Pe(t) {
  return t === void 0;
}
var wh = "Expected a function";
function Uh(t) {
  if (typeof t != "function")
    throw new TypeError(wh);
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return !t.call(this);
      case 1:
        return !t.call(this, e[0]);
      case 2:
        return !t.call(this, e[0], e[1]);
      case 3:
        return !t.call(this, e[0], e[1], e[2]);
    }
    return !t.apply(this, e);
  };
}
function Dh(t, e, n, r) {
  if (!le(t))
    return t;
  e = ln(e, t);
  for (var i = -1, s = e.length, o = s - 1, a = t; a != null && ++i < s; ) {
    var c = Rt(e[i]), u = n;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return t;
    if (i != o) {
      var l = a[c];
      u = void 0, u === void 0 && (u = le(l) ? l : rn(e[i + 1]) ? [] : {});
    }
    sn(a, c, u), a = a[c];
  }
  return t;
}
function $h(t, e, n) {
  for (var r = -1, i = e.length, s = {}; ++r < i; ) {
    var o = e[r], a = or(t, o);
    n(a, o) && Dh(s, ln(o, t), a);
  }
  return s;
}
function ye(t, e) {
  if (t == null)
    return {};
  var n = tn(iu(t), function(r) {
    return [r];
  });
  return e = Ne(e), $h(t, n, function(r, i) {
    return e(r, i[0]);
  });
}
function Fh(t, e, n, r, i) {
  return i(t, function(s, o, a) {
    n = r ? (r = !1, s) : e(n, s, o, a);
  }), n;
}
function re(t, e, n) {
  var r = x(t) ? Vc : Fh, i = arguments.length < 3;
  return r(t, Ne(e), n, i, Ze);
}
function fn(t, e) {
  var n = x(t) ? ur : us;
  return n(t, Uh(Ne(e)));
}
function jh(t, e) {
  var n;
  return Ze(t, function(r, i, s) {
    return n = e(r, i, s), !n;
  }), !!n;
}
function ls(t, e, n) {
  var r = x(t) ? rs : jh;
  return r(t, Ne(e));
}
var Gh = 1 / 0, Bh = et && 1 / fr(new et([, -0]))[1] == Gh ? function(t) {
  return new et(t);
} : V, Vh = 200;
function Kh(t, e, n) {
  var r = -1, i = ji, s = t.length, o = !0, a = [], c = a;
  if (s >= Vh) {
    var u = Bh(t);
    if (u)
      return fr(u);
    o = !1, i = hr, c = new nt();
  } else
    c = a;
  e:
    for (; ++r < s; ) {
      var l = t[r], h = l;
      if (l = l !== 0 ? l : 0, o && h === h) {
        for (var f = c.length; f--; )
          if (c[f] === h)
            continue e;
        a.push(l);
      } else i(c, h, n) || (c !== a && c.push(h), a.push(l));
    }
  return a;
}
function mr(t) {
  return t && t.length ? Kh(t) : [];
}
function wn(t) {
  console && console.error && console.error(`Error: ${t}`);
}
function hs(t) {
  console && console.warn && console.warn(`Warning: ${t}`);
}
function fs(t) {
  const e = (/* @__PURE__ */ new Date()).getTime(), n = t();
  return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: n };
}
function ds(t) {
  function e() {
  }
  e.prototype = t;
  const n = new e();
  function r() {
    return typeof n.bar;
  }
  return r(), r(), t;
}
function Hh(t) {
  return Wh(t) ? t.LABEL : t.name;
}
function Wh(t) {
  return J(t.LABEL) && t.LABEL !== "";
}
class Le {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    this._definition = e;
  }
  accept(e) {
    e.visit(this), N(this.definition, (n) => {
      n.accept(e);
    });
  }
}
class ie extends Le {
  constructor(e) {
    super([]), this.idx = 1, ne(this, ye(e, (n) => n !== void 0));
  }
  set definition(e) {
  }
  get definition() {
    return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
  }
  accept(e) {
    e.visit(this);
  }
}
class st extends Le {
  constructor(e) {
    super(e.definition), this.orgText = "", ne(this, ye(e, (n) => n !== void 0));
  }
}
class ee extends Le {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = !1, ne(this, ye(e, (n) => n !== void 0));
  }
}
class Q extends Le {
  constructor(e) {
    super(e.definition), this.idx = 1, ne(this, ye(e, (n) => n !== void 0));
  }
}
class Ce extends Le {
  constructor(e) {
    super(e.definition), this.idx = 1, ne(this, ye(e, (n) => n !== void 0));
  }
}
class ke extends Le {
  constructor(e) {
    super(e.definition), this.idx = 1, ne(this, ye(e, (n) => n !== void 0));
  }
}
class H extends Le {
  constructor(e) {
    super(e.definition), this.idx = 1, ne(this, ye(e, (n) => n !== void 0));
  }
}
class Ae extends Le {
  constructor(e) {
    super(e.definition), this.idx = 1, ne(this, ye(e, (n) => n !== void 0));
  }
}
class _e extends Le {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = !1, this.hasPredicates = !1, ne(this, ye(e, (n) => n !== void 0));
  }
}
class F {
  constructor(e) {
    this.idx = 1, ne(this, ye(e, (n) => n !== void 0));
  }
  accept(e) {
    e.visit(this);
  }
}
function zh(t) {
  return v(t, Dt);
}
function Dt(t) {
  function e(n) {
    return v(n, Dt);
  }
  if (t instanceof ie) {
    const n = {
      type: "NonTerminal",
      name: t.nonTerminalName,
      idx: t.idx
    };
    return J(t.label) && (n.label = t.label), n;
  } else {
    if (t instanceof ee)
      return {
        type: "Alternative",
        definition: e(t.definition)
      };
    if (t instanceof Q)
      return {
        type: "Option",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof Ce)
      return {
        type: "RepetitionMandatory",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof ke)
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: t.idx,
        separator: Dt(new F({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof Ae)
      return {
        type: "RepetitionWithSeparator",
        idx: t.idx,
        separator: Dt(new F({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof H)
      return {
        type: "Repetition",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof _e)
      return {
        type: "Alternation",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof F) {
      const n = {
        type: "Terminal",
        name: t.terminalType.name,
        label: Hh(t.terminalType),
        idx: t.idx
      };
      J(t.label) && (n.terminalLabel = t.label);
      const r = t.terminalType.PATTERN;
      return t.terminalType.PATTERN && (n.pattern = Me(r) ? r.source : r), n;
    } else {
      if (t instanceof st)
        return {
          type: "Rule",
          name: t.name,
          orgText: t.orgText,
          definition: e(t.definition)
        };
      throw Error("non exhaustive match");
    }
  }
}
class ot {
  visit(e) {
    const n = e;
    switch (n.constructor) {
      case ie:
        return this.visitNonTerminal(n);
      case ee:
        return this.visitAlternative(n);
      case Q:
        return this.visitOption(n);
      case Ce:
        return this.visitRepetitionMandatory(n);
      case ke:
        return this.visitRepetitionMandatoryWithSeparator(n);
      case Ae:
        return this.visitRepetitionWithSeparator(n);
      case H:
        return this.visitRepetition(n);
      case _e:
        return this.visitAlternation(n);
      case F:
        return this.visitTerminal(n);
      case st:
        return this.visitRule(n);
      /* c8 ignore next 2 */
      default:
        throw Error("non exhaustive match");
    }
  }
  /* c8 ignore next */
  visitNonTerminal(e) {
  }
  /* c8 ignore next */
  visitAlternative(e) {
  }
  /* c8 ignore next */
  visitOption(e) {
  }
  /* c8 ignore next */
  visitRepetition(e) {
  }
  /* c8 ignore next */
  visitRepetitionMandatory(e) {
  }
  /* c8 ignore next 3 */
  visitRepetitionMandatoryWithSeparator(e) {
  }
  /* c8 ignore next */
  visitRepetitionWithSeparator(e) {
  }
  /* c8 ignore next */
  visitAlternation(e) {
  }
  /* c8 ignore next */
  visitTerminal(e) {
  }
  /* c8 ignore next */
  visitRule(e) {
  }
}
function Yh(t) {
  return t instanceof ee || t instanceof Q || t instanceof H || t instanceof Ce || t instanceof ke || t instanceof Ae || t instanceof F || t instanceof st;
}
function Ht(t, e = []) {
  return t instanceof Q || t instanceof H || t instanceof Ae ? !0 : t instanceof _e ? ls(t.definition, (n) => Ht(n, e)) : t instanceof ie && Z(e, t) ? !1 : t instanceof Le ? (t instanceof ie && e.push(t), ge(t.definition, (n) => Ht(n, e))) : !1;
}
function Xh(t) {
  return t instanceof _e;
}
function Re(t) {
  if (t instanceof ie)
    return "SUBRULE";
  if (t instanceof Q)
    return "OPTION";
  if (t instanceof _e)
    return "OR";
  if (t instanceof Ce)
    return "AT_LEAST_ONE";
  if (t instanceof ke)
    return "AT_LEAST_ONE_SEP";
  if (t instanceof Ae)
    return "MANY_SEP";
  if (t instanceof H)
    return "MANY";
  if (t instanceof F)
    return "CONSUME";
  throw Error("non exhaustive match");
}
class dn {
  walk(e, n = []) {
    N(e.definition, (r, i) => {
      const s = W(e.definition, i + 1);
      if (r instanceof ie)
        this.walkProdRef(r, s, n);
      else if (r instanceof F)
        this.walkTerminal(r, s, n);
      else if (r instanceof ee)
        this.walkFlat(r, s, n);
      else if (r instanceof Q)
        this.walkOption(r, s, n);
      else if (r instanceof Ce)
        this.walkAtLeastOne(r, s, n);
      else if (r instanceof ke)
        this.walkAtLeastOneSep(r, s, n);
      else if (r instanceof Ae)
        this.walkManySep(r, s, n);
      else if (r instanceof H)
        this.walkMany(r, s, n);
      else if (r instanceof _e)
        this.walkOr(r, s, n);
      else
        throw Error("non exhaustive match");
    });
  }
  walkTerminal(e, n, r) {
  }
  walkProdRef(e, n, r) {
  }
  walkFlat(e, n, r) {
    const i = n.concat(r);
    this.walk(e, i);
  }
  walkOption(e, n, r) {
    const i = n.concat(r);
    this.walk(e, i);
  }
  walkAtLeastOne(e, n, r) {
    const i = [
      new Q({ definition: e.definition })
    ].concat(n, r);
    this.walk(e, i);
  }
  walkAtLeastOneSep(e, n, r) {
    const i = ui(e, n, r);
    this.walk(e, i);
  }
  walkMany(e, n, r) {
    const i = [
      new Q({ definition: e.definition })
    ].concat(n, r);
    this.walk(e, i);
  }
  walkManySep(e, n, r) {
    const i = ui(e, n, r);
    this.walk(e, i);
  }
  walkOr(e, n, r) {
    const i = n.concat(r);
    N(e.definition, (s) => {
      const o = new ee({ definition: [s] });
      this.walk(o, i);
    });
  }
}
function ui(t, e, n) {
  return [
    new Q({
      definition: [
        new F({ terminalType: t.separator })
      ].concat(t.definition)
    })
  ].concat(e, n);
}
function St(t) {
  if (t instanceof ie)
    return St(t.referencedRule);
  if (t instanceof F)
    return Qh(t);
  if (Yh(t))
    return qh(t);
  if (Xh(t))
    return Zh(t);
  throw Error("non exhaustive match");
}
function qh(t) {
  let e = [];
  const n = t.definition;
  let r = 0, i = n.length > r, s, o = !0;
  for (; i && o; )
    s = n[r], o = Ht(s), e = e.concat(St(s)), r = r + 1, i = n.length > r;
  return mr(e);
}
function Zh(t) {
  const e = v(t.definition, (n) => St(n));
  return mr(me(e));
}
function Qh(t) {
  return [t.terminalType];
}
const ps = "_~IN~_";
class Jh extends dn {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, n, r) {
  }
  walkProdRef(e, n, r) {
    const i = tf(e.referencedRule, e.idx) + this.topProd.name, s = n.concat(r), o = new ee({ definition: s }), a = St(o);
    this.follows[i] = a;
  }
}
function ef(t) {
  const e = {};
  return N(t, (n) => {
    const r = new Jh(n).startWalking();
    ne(e, r);
  }), e;
}
function tf(t, e) {
  return t.name + e + ps;
}
function L(t) {
  return t.charCodeAt(0);
}
function vn(t, e) {
  Array.isArray(t) ? t.forEach(function(n) {
    e.push(n);
  }) : e.push(t);
}
function lt(t, e) {
  if (t[e] === !0)
    throw "duplicate flag " + e;
  t[e], t[e] = !0;
}
function Je(t) {
  if (t === void 0)
    throw Error("Internal Error - Should never get here!");
  return !0;
}
function nf() {
  throw Error("Internal Error - Should never get here!");
}
function li(t) {
  return t.type === "Character";
}
const Wt = [];
for (let t = L("0"); t <= L("9"); t++)
  Wt.push(t);
const zt = [L("_")].concat(Wt);
for (let t = L("a"); t <= L("z"); t++)
  zt.push(t);
for (let t = L("A"); t <= L("Z"); t++)
  zt.push(t);
const hi = [
  L(" "),
  L("\f"),
  L(`
`),
  L("\r"),
  L("	"),
  L("\v"),
  L("	"),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L(" "),
  L("\u2028"),
  L("\u2029"),
  L(" "),
  L(" "),
  L("　"),
  L("\uFEFF")
], rf = /[0-9a-fA-F]/, bt = /[0-9]/, sf = /[1-9]/;
class of {
  constructor() {
    this.idx = 0, this.input = "", this.groupIdx = 0;
  }
  saveState() {
    return {
      idx: this.idx,
      input: this.input,
      groupIdx: this.groupIdx
    };
  }
  restoreState(e) {
    this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
  }
  pattern(e) {
    this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
    const n = this.disjunction();
    this.consumeChar("/");
    const r = {
      type: "Flags",
      loc: { begin: this.idx, end: e.length },
      global: !1,
      ignoreCase: !1,
      multiLine: !1,
      unicode: !1,
      sticky: !1
    };
    for (; this.isRegExpFlag(); )
      switch (this.popChar()) {
        case "g":
          lt(r, "global");
          break;
        case "i":
          lt(r, "ignoreCase");
          break;
        case "m":
          lt(r, "multiLine");
          break;
        case "u":
          lt(r, "unicode");
          break;
        case "y":
          lt(r, "sticky");
          break;
      }
    if (this.idx !== this.input.length)
      throw Error("Redundant input: " + this.input.substring(this.idx));
    return {
      type: "Pattern",
      flags: r,
      value: n,
      loc: this.loc(0)
    };
  }
  disjunction() {
    const e = [], n = this.idx;
    for (e.push(this.alternative()); this.peekChar() === "|"; )
      this.consumeChar("|"), e.push(this.alternative());
    return { type: "Disjunction", value: e, loc: this.loc(n) };
  }
  alternative() {
    const e = [], n = this.idx;
    for (; this.isTerm(); )
      e.push(this.term());
    return { type: "Alternative", value: e, loc: this.loc(n) };
  }
  term() {
    return this.isAssertion() ? this.assertion() : this.atom();
  }
  assertion() {
    const e = this.idx;
    switch (this.popChar()) {
      case "^":
        return {
          type: "StartAnchor",
          loc: this.loc(e)
        };
      case "$":
        return { type: "EndAnchor", loc: this.loc(e) };
      // '\b' or '\B'
      case "\\":
        switch (this.popChar()) {
          case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(e)
            };
          case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(e)
            };
        }
        throw Error("Invalid Assertion Escape");
      // '(?=' or '(?!'
      case "(":
        this.consumeChar("?");
        let n;
        switch (this.popChar()) {
          case "=":
            n = "Lookahead";
            break;
          case "!":
            n = "NegativeLookahead";
            break;
        }
        Je(n);
        const r = this.disjunction();
        return this.consumeChar(")"), {
          type: n,
          value: r,
          loc: this.loc(e)
        };
    }
    return nf();
  }
  quantifier(e = !1) {
    let n;
    const r = this.idx;
    switch (this.popChar()) {
      case "*":
        n = {
          atLeast: 0,
          atMost: 1 / 0
        };
        break;
      case "+":
        n = {
          atLeast: 1,
          atMost: 1 / 0
        };
        break;
      case "?":
        n = {
          atLeast: 0,
          atMost: 1
        };
        break;
      case "{":
        const i = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            n = {
              atLeast: i,
              atMost: i
            };
            break;
          case ",":
            let s;
            this.isDigit() ? (s = this.integerIncludingZero(), n = {
              atLeast: i,
              atMost: s
            }) : n = {
              atLeast: i,
              atMost: 1 / 0
            }, this.consumeChar("}");
            break;
        }
        if (e === !0 && n === void 0)
          return;
        Je(n);
        break;
    }
    if (!(e === !0 && n === void 0) && Je(n))
      return this.peekChar(0) === "?" ? (this.consumeChar("?"), n.greedy = !1) : n.greedy = !0, n.type = "Quantifier", n.loc = this.loc(r), n;
  }
  atom() {
    let e;
    const n = this.idx;
    switch (this.peekChar()) {
      case ".":
        e = this.dotAll();
        break;
      case "\\":
        e = this.atomEscape();
        break;
      case "[":
        e = this.characterClass();
        break;
      case "(":
        e = this.group();
        break;
    }
    if (e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), Je(e))
      return e.loc = this.loc(n), this.isQuantifier() && (e.quantifier = this.quantifier()), e;
  }
  dotAll() {
    return this.consumeChar("."), {
      type: "Set",
      complement: !0,
      value: [L(`
`), L("\r"), L("\u2028"), L("\u2029")]
    };
  }
  atomEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    return { type: "GroupBackReference", value: this.positiveInteger() };
  }
  characterClassEscape() {
    let e, n = !1;
    switch (this.popChar()) {
      case "d":
        e = Wt;
        break;
      case "D":
        e = Wt, n = !0;
        break;
      case "s":
        e = hi;
        break;
      case "S":
        e = hi, n = !0;
        break;
      case "w":
        e = zt;
        break;
      case "W":
        e = zt, n = !0;
        break;
    }
    if (Je(e))
      return { type: "Set", value: e, complement: n };
  }
  controlEscapeAtom() {
    let e;
    switch (this.popChar()) {
      case "f":
        e = L("\f");
        break;
      case "n":
        e = L(`
`);
        break;
      case "r":
        e = L("\r");
        break;
      case "t":
        e = L("	");
        break;
      case "v":
        e = L("\v");
        break;
    }
    if (Je(e))
      return { type: "Character", value: e };
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    const e = this.popChar();
    if (/[a-zA-Z]/.test(e) === !1)
      throw Error("Invalid ");
    return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 };
  }
  nulCharacterAtom() {
    return this.consumeChar("0"), { type: "Character", value: L("\0") };
  }
  hexEscapeSequenceAtom() {
    return this.consumeChar("x"), this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    return this.consumeChar("u"), this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    const e = this.popChar();
    return { type: "Character", value: L(e) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
      // istanbul ignore next
      case "\\":
      // istanbul ignore next
      case "]":
        throw Error("TBD");
      default:
        const e = this.popChar();
        return { type: "Character", value: L(e) };
    }
  }
  characterClass() {
    const e = [];
    let n = !1;
    for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), n = !0); this.isClassAtom(); ) {
      const r = this.classAtom();
      if (r.type, li(r) && this.isRangeDash()) {
        this.consumeChar("-");
        const i = this.classAtom();
        if (i.type, li(i)) {
          if (i.value < r.value)
            throw Error("Range out of order in character class");
          e.push({ from: r.value, to: i.value });
        } else
          vn(r.value, e), e.push(L("-")), vn(i.value, e);
      } else
        vn(r.value, e);
    }
    return this.consumeChar("]"), { type: "Set", complement: n, value: e };
  }
  classAtom() {
    switch (this.peekChar()) {
      // istanbul ignore next
      case "]":
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      // Matches a backspace.
      // (Not to be confused with \b word boundary outside characterClass)
      case "b":
        return this.consumeChar("b"), { type: "Character", value: L("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let e = !0;
    switch (this.consumeChar("("), this.peekChar(0)) {
      case "?":
        this.consumeChar("?"), this.consumeChar(":"), e = !1;
        break;
      default:
        this.groupIdx++;
        break;
    }
    const n = this.disjunction();
    this.consumeChar(")");
    const r = {
      type: "Group",
      capturing: e,
      value: n
    };
    return e && (r.idx = this.groupIdx), r;
  }
  positiveInteger() {
    let e = this.popChar();
    if (sf.test(e) === !1)
      throw Error("Expecting a positive integer");
    for (; bt.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (bt.test(e) === !1)
      throw Error("Expecting an integer");
    for (; bt.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  patternCharacter() {
    const e = this.popChar();
    switch (e) {
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
      // istanbul ignore next
      case "^":
      // istanbul ignore next
      case "$":
      // istanbul ignore next
      case "\\":
      // istanbul ignore next
      case ".":
      // istanbul ignore next
      case "*":
      // istanbul ignore next
      case "+":
      // istanbul ignore next
      case "?":
      // istanbul ignore next
      case "(":
      // istanbul ignore next
      case ")":
      // istanbul ignore next
      case "[":
      // istanbul ignore next
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: L(e) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return !0;
      default:
        return !1;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return bt.test(this.peekChar(0));
  }
  isClassAtom(e = 0) {
    switch (this.peekChar(e)) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter())
      return !0;
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      // atomEscape
      case "[":
      // characterClass
      // TODO: isAtom must be called before isAssertion - disambiguate
      case "(":
        return !0;
      default:
        return !1;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return !0;
      // '\b' or '\B'
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return !0;
          default:
            return !1;
        }
      // '(?=' or '(?!'
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
      default:
        return !1;
    }
  }
  isQuantifier() {
    const e = this.saveState();
    try {
      return this.quantifier(!0) !== void 0;
    } catch {
      return !1;
    } finally {
      this.restoreState(e);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  parseHexDigits(e) {
    let n = "";
    for (let r = 0; r < e; r++) {
      const i = this.popChar();
      if (rf.test(i) === !1)
        throw Error("Expecting a HexDecimal digits");
      n += i;
    }
    return { type: "Character", value: parseInt(n, 16) };
  }
  peekChar(e = 0) {
    return this.input[this.idx + e];
  }
  popChar() {
    const e = this.peekChar(0);
    return this.consumeChar(void 0), e;
  }
  consumeChar(e) {
    if (e !== void 0 && this.input[this.idx] !== e)
      throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    if (this.idx >= this.input.length)
      throw Error("Unexpected end of input");
    this.idx++;
  }
  loc(e) {
    return { begin: e, end: this.idx };
  }
}
class gr {
  visitChildren(e) {
    for (const n in e) {
      const r = e[n];
      e.hasOwnProperty(n) && (r.type !== void 0 ? this.visit(r) : Array.isArray(r) && r.forEach((i) => {
        this.visit(i);
      }, this));
    }
  }
  visit(e) {
    switch (e.type) {
      case "Pattern":
        this.visitPattern(e);
        break;
      case "Flags":
        this.visitFlags(e);
        break;
      case "Disjunction":
        this.visitDisjunction(e);
        break;
      case "Alternative":
        this.visitAlternative(e);
        break;
      case "StartAnchor":
        this.visitStartAnchor(e);
        break;
      case "EndAnchor":
        this.visitEndAnchor(e);
        break;
      case "WordBoundary":
        this.visitWordBoundary(e);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(e);
        break;
      case "Lookahead":
        this.visitLookahead(e);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(e);
        break;
      case "Character":
        this.visitCharacter(e);
        break;
      case "Set":
        this.visitSet(e);
        break;
      case "Group":
        this.visitGroup(e);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(e);
        break;
      case "Quantifier":
        this.visitQuantifier(e);
        break;
    }
    this.visitChildren(e);
  }
  visitPattern(e) {
  }
  visitFlags(e) {
  }
  visitDisjunction(e) {
  }
  visitAlternative(e) {
  }
  // Assertion
  visitStartAnchor(e) {
  }
  visitEndAnchor(e) {
  }
  visitWordBoundary(e) {
  }
  visitNonWordBoundary(e) {
  }
  visitLookahead(e) {
  }
  visitNegativeLookahead(e) {
  }
  // atoms
  visitCharacter(e) {
  }
  visitSet(e) {
  }
  visitGroup(e) {
  }
  visitGroupBackReference(e) {
  }
  visitQuantifier(e) {
  }
}
let $t = {};
const af = new of();
function pn(t) {
  const e = t.toString();
  if ($t.hasOwnProperty(e))
    return $t[e];
  {
    const n = af.pattern(e);
    return $t[e] = n, n;
  }
}
function cf() {
  $t = {};
}
const ms = "Complement Sets are not supported for first char optimization", Yt = `Unable to use "first char" lexer optimizations:
`;
function uf(t, e = !1) {
  try {
    const n = pn(t);
    return Un(n.value, {}, n.flags.ignoreCase);
  } catch (n) {
    if (n.message === ms)
      e && hs(`${Yt}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let r = "";
      e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), wn(`${Yt}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
    }
  }
  return [];
}
function Un(t, e, n) {
  switch (t.type) {
    case "Disjunction":
      for (let i = 0; i < t.value.length; i++)
        Un(t.value[i], e, n);
      break;
    case "Alternative":
      const r = t.value;
      for (let i = 0; i < r.length; i++) {
        const s = r[i];
        switch (s.type) {
          case "EndAnchor":
          // A group back reference cannot affect potential starting char.
          // because if a back reference is the first production than automatically
          // the group being referenced has had to come BEFORE so its codes have already been added
          case "GroupBackReference":
          // assertions do not affect potential starting codes
          case "Lookahead":
          case "NegativeLookahead":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const o = s;
        switch (o.type) {
          case "Character":
            xt(o.value, e, n);
            break;
          case "Set":
            if (o.complement === !0)
              throw Error(ms);
            N(o.value, (c) => {
              if (typeof c == "number")
                xt(c, e, n);
              else {
                const u = c;
                if (n === !0)
                  for (let l = u.from; l <= u.to; l++)
                    xt(l, e, n);
                else {
                  for (let l = u.from; l <= u.to && l < dt; l++)
                    xt(l, e, n);
                  if (u.to >= dt) {
                    const l = u.from >= dt ? u.from : dt, h = u.to, f = Ge(l), _ = Ge(h);
                    for (let E = f; E <= _; E++)
                      e[E] = E;
                  }
                }
              }
            });
            break;
          case "Group":
            Un(o.value, e, n);
            break;
          /* istanbul ignore next */
          default:
            throw Error("Non Exhaustive Match");
        }
        const a = o.quantifier !== void 0 && o.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          o.type === "Group" && Dn(o) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
          o.type !== "Group" && a === !1
        )
          break;
      }
      break;
    /* istanbul ignore next */
    default:
      throw Error("non exhaustive match!");
  }
  return K(e);
}
function xt(t, e, n) {
  const r = Ge(t);
  e[r] = r, n === !0 && lf(t, e);
}
function lf(t, e) {
  const n = String.fromCharCode(t), r = n.toUpperCase();
  if (r !== n) {
    const i = Ge(r.charCodeAt(0));
    e[i] = i;
  } else {
    const i = n.toLowerCase();
    if (i !== n) {
      const s = Ge(i.charCodeAt(0));
      e[s] = s;
    }
  }
}
function fi(t, e) {
  return it(t.value, (n) => {
    if (typeof n == "number")
      return Z(e, n);
    {
      const r = n;
      return it(e, (i) => r.from <= i && i <= r.to) !== void 0;
    }
  });
}
function Dn(t) {
  const e = t.quantifier;
  return e && e.atLeast === 0 ? !0 : t.value ? x(t.value) ? ge(t.value, Dn) : Dn(t.value) : !1;
}
class hf extends gr {
  constructor(e) {
    super(), this.targetCharCodes = e, this.found = !1;
  }
  visitChildren(e) {
    if (this.found !== !0) {
      switch (e.type) {
        case "Lookahead":
          this.visitLookahead(e);
          return;
        case "NegativeLookahead":
          this.visitNegativeLookahead(e);
          return;
      }
      super.visitChildren(e);
    }
  }
  visitCharacter(e) {
    Z(this.targetCharCodes, e.value) && (this.found = !0);
  }
  visitSet(e) {
    e.complement ? fi(e, this.targetCharCodes) === void 0 && (this.found = !0) : fi(e, this.targetCharCodes) !== void 0 && (this.found = !0);
  }
}
function Er(t, e) {
  if (e instanceof RegExp) {
    const n = pn(e), r = new hf(t);
    return r.visit(n), r.found;
  } else
    return it(e, (n) => Z(t, n.charCodeAt(0))) !== void 0;
}
const ze = "PATTERN", ft = "defaultMode", Mt = "modes";
let gs = typeof new RegExp("(?:)").sticky == "boolean";
function ff(t, e) {
  e = pr(e, {
    useSticky: gs,
    debug: !1,
    safeMode: !1,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: (T, p) => p()
  });
  const n = e.tracer;
  n("initCharCodeToOptimizedIndexMap", () => {
    wf();
  });
  let r;
  n("Reject Lexer.NA", () => {
    r = fn(t, (T) => T[ze] === X.NA);
  });
  let i = !1, s;
  n("Transform Patterns", () => {
    i = !1, s = v(r, (T) => {
      const p = T[ze];
      if (Me(p)) {
        const A = p.source;
        return A.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        A !== "^" && A !== "$" && A !== "." && !p.ignoreCase ? A : A.length === 2 && A[0] === "\\" && // not a meta character
        !Z([
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ], A[1]) ? A[1] : e.useSticky ? pi(p) : di(p);
      } else {
        if (Ue(p))
          return i = !0, { exec: p };
        if (typeof p == "object")
          return i = !0, p;
        if (typeof p == "string") {
          if (p.length === 1)
            return p;
          {
            const A = p.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), I = new RegExp(A);
            return e.useSticky ? pi(I) : di(I);
          }
        } else
          throw Error("non exhaustive match");
      }
    });
  });
  let o, a, c, u, l;
  n("misc mapping", () => {
    o = v(r, (T) => T.tokenTypeIdx), a = v(r, (T) => {
      const p = T.GROUP;
      if (p !== X.SKIPPED) {
        if (J(p))
          return p;
        if (Pe(p))
          return !1;
        throw Error("non exhaustive match");
      }
    }), c = v(r, (T) => {
      const p = T.LONGER_ALT;
      if (p)
        return x(p) ? v(p, (A) => ai(r, A)) : [ai(r, p)];
    }), u = v(r, (T) => T.PUSH_MODE), l = v(r, (T) => S(T, "POP_MODE"));
  });
  let h;
  n("Line Terminator Handling", () => {
    const T = ys(e.lineTerminatorCharacters);
    h = v(r, (p) => !1), e.positionTracking !== "onlyOffset" && (h = v(r, (p) => S(p, "LINE_BREAKS") ? !!p.LINE_BREAKS : Ts(p, T) === !1 && Er(T, p.PATTERN)));
  });
  let f, _, E, y;
  n("Misc Mapping #2", () => {
    f = v(r, Es), _ = v(s, xf), E = re(r, (T, p) => {
      const A = p.GROUP;
      return J(A) && A !== X.SKIPPED && (T[A] = []), T;
    }, {}), y = v(s, (T, p) => ({
      pattern: s[p],
      longerAlt: c[p],
      canLineTerminator: h[p],
      isCustom: f[p],
      short: _[p],
      group: a[p],
      push: u[p],
      pop: l[p],
      tokenTypeIdx: o[p],
      tokenType: r[p]
    }));
  });
  let R = !0, g = [];
  return e.safeMode || n("First Char Optimization", () => {
    g = re(r, (T, p, A) => {
      if (typeof p.PATTERN == "string") {
        const I = p.PATTERN.charCodeAt(0), C = Ge(I);
        Rn(T, C, y[A]);
      } else if (x(p.START_CHARS_HINT)) {
        let I;
        N(p.START_CHARS_HINT, (C) => {
          const w = typeof C == "string" ? C.charCodeAt(0) : C, m = Ge(w);
          I !== m && (I = m, Rn(T, m, y[A]));
        });
      } else if (Me(p.PATTERN))
        if (p.PATTERN.unicode)
          R = !1, e.ensureOptimizations && wn(`${Yt}	Unable to analyze < ${p.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const I = uf(p.PATTERN, e.ensureOptimizations);
          D(I) && (R = !1), N(I, (C) => {
            Rn(T, C, y[A]);
          });
        }
      else
        e.ensureOptimizations && wn(`${Yt}	TokenType: <${p.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), R = !1;
      return T;
    }, []);
  }), {
    emptyGroups: E,
    patternIdxToConfig: y,
    charCodeToPatternIdxToConfig: g,
    hasCustom: i,
    canBeOptimized: R
  };
}
function df(t, e) {
  let n = [];
  const r = mf(t);
  n = n.concat(r.errors);
  const i = gf(r.valid), s = i.valid;
  return n = n.concat(i.errors), n = n.concat(pf(s)), n = n.concat(Of(s)), n = n.concat(Sf(s, e)), n = n.concat(If(s)), n;
}
function pf(t) {
  let e = [];
  const n = fe(t, (r) => Me(r[ze]));
  return e = e.concat(Tf(n)), e = e.concat(_f(n)), e = e.concat(vf(n)), e = e.concat(Rf(n)), e = e.concat(yf(n)), e;
}
function mf(t) {
  const e = fe(t, (i) => !S(i, ze)), n = v(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property",
    type: G.MISSING_PATTERN,
    tokenTypes: [i]
  })), r = hn(t, e);
  return { errors: n, valid: r };
}
function gf(t) {
  const e = fe(t, (i) => {
    const s = i[ze];
    return !Me(s) && !Ue(s) && !S(s, "exec") && !J(s);
  }), n = v(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: G.INVALID_PATTERN,
    tokenTypes: [i]
  })), r = hn(t, e);
  return { errors: n, valid: r };
}
const Ef = /[^\\][$]/;
function Tf(t) {
  class e extends gr {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitEndAnchor(i) {
      this.found = !0;
    }
  }
  const n = fe(t, (r) => {
    const i = r.PATTERN;
    try {
      const s = pn(i), o = new e();
      return o.visit(s), o.found;
    } catch {
      return Ef.test(i.source);
    }
  });
  return v(n, (r) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + r.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: G.EOI_ANCHOR_FOUND,
    tokenTypes: [r]
  }));
}
function yf(t) {
  const e = fe(t, (n) => n.PATTERN.test(""));
  return v(e, (n) => ({
    message: "Token Type: ->" + n.name + "<- static 'PATTERN' must not match an empty string",
    type: G.EMPTY_MATCH_PATTERN,
    tokenTypes: [n]
  }));
}
const Af = /[^\\[][\^]|^\^/;
function _f(t) {
  class e extends gr {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitStartAnchor(i) {
      this.found = !0;
    }
  }
  const n = fe(t, (r) => {
    const i = r.PATTERN;
    try {
      const s = pn(i), o = new e();
      return o.visit(s), o.found;
    } catch {
      return Af.test(i.source);
    }
  });
  return v(n, (r) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + r.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: G.SOI_ANCHOR_FOUND,
    tokenTypes: [r]
  }));
}
function vf(t) {
  const e = fe(t, (n) => {
    const r = n[ze];
    return r instanceof RegExp && (r.multiline || r.global);
  });
  return v(e, (n) => ({
    message: "Token Type: ->" + n.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: G.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [n]
  }));
}
function Rf(t) {
  const e = [];
  let n = v(t, (i) => re(t, (s, o) => (i.PATTERN.source === o.PATTERN.source && !Z(e, o) && o.PATTERN !== X.NA && (e.push(o), s.push(o)), s), []));
  n = Ot(n);
  const r = fe(n, (i) => i.length > 1);
  return v(r, (i) => {
    const s = v(i, (o) => o.name);
    return {
      message: `The same RegExp pattern ->${Te(i).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,
      type: G.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: i
    };
  });
}
function Of(t) {
  const e = fe(t, (n) => {
    if (!S(n, "GROUP"))
      return !1;
    const r = n.GROUP;
    return r !== X.SKIPPED && r !== X.NA && !J(r);
  });
  return v(e, (n) => ({
    message: "Token Type: ->" + n.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: G.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [n]
  }));
}
function Sf(t, e) {
  const n = fe(t, (r) => r.PUSH_MODE !== void 0 && !Z(e, r.PUSH_MODE));
  return v(n, (r) => ({
    message: `Token Type: ->${r.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${r.PUSH_MODE}<-which does not exist`,
    type: G.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [r]
  }));
}
function If(t) {
  const e = [], n = re(t, (r, i, s) => {
    const o = i.PATTERN;
    return o === X.NA || (J(o) ? r.push({ str: o, idx: s, tokenType: i }) : Me(o) && Lf(o) && r.push({ str: o.source, idx: s, tokenType: i })), r;
  }, []);
  return N(t, (r, i) => {
    N(n, ({ str: s, idx: o, tokenType: a }) => {
      if (i < o && Nf(s, r.PATTERN)) {
        const c = `Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${r.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({
          message: c,
          type: G.UNREACHABLE_PATTERN,
          tokenTypes: [r, a]
        });
      }
    });
  }), e;
}
function Nf(t, e) {
  if (Me(e)) {
    const n = e.exec(t);
    return n !== null && n.index === 0;
  } else {
    if (Ue(e))
      return e(t, 0, [], {});
    if (S(e, "exec"))
      return e.exec(t, 0, [], {});
    if (typeof e == "string")
      return e === t;
    throw Error("non exhaustive match");
  }
}
function Lf(t) {
  return it([
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ], (e) => t.source.indexOf(e) !== -1) === void 0;
}
function di(t) {
  const e = t.ignoreCase ? "i" : "";
  return new RegExp(`^(?:${t.source})`, e);
}
function pi(t) {
  const e = t.ignoreCase ? "iy" : "y";
  return new RegExp(`${t.source}`, e);
}
function Cf(t, e, n) {
  const r = [];
  return S(t, ft) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + ft + `> property in its definition
`,
    type: G.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), S(t, Mt) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Mt + `> property in its definition
`,
    type: G.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), S(t, Mt) && S(t, ft) && !S(t.modes, t.defaultMode) && r.push({
    message: `A MultiMode Lexer cannot be initialized with a ${ft}: <${t.defaultMode}>which does not exist
`,
    type: G.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), S(t, Mt) && N(t.modes, (i, s) => {
    N(i, (o, a) => {
      if (Pe(o))
        r.push({
          message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${s}> at index: <${a}>
`,
          type: G.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
        });
      else if (S(o, "LONGER_ALT")) {
        const c = x(o.LONGER_ALT) ? o.LONGER_ALT : [o.LONGER_ALT];
        N(c, (u) => {
          !Pe(u) && !Z(i, u) && r.push({
            message: `A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${o.name}> outside of mode <${s}>
`,
            type: G.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
          });
        });
      }
    });
  }), r;
}
function kf(t, e, n) {
  const r = [];
  let i = !1;
  const s = Ot(me(K(t.modes))), o = fn(s, (c) => c[ze] === X.NA), a = ys(n);
  return e && N(o, (c) => {
    const u = Ts(c, a);
    if (u !== !1) {
      const l = {
        message: Pf(c, u),
        type: u.issue,
        tokenType: c
      };
      r.push(l);
    } else
      S(c, "LINE_BREAKS") ? c.LINE_BREAKS === !0 && (i = !0) : Er(a, c.PATTERN) && (i = !0);
  }), e && !i && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: G.NO_LINE_BREAKS_FLAGS
  }), r;
}
function bf(t) {
  const e = {}, n = he(t);
  return N(n, (r) => {
    const i = t[r];
    if (x(i))
      e[r] = [];
    else
      throw Error("non exhaustive match");
  }), e;
}
function Es(t) {
  const e = t.PATTERN;
  if (Me(e))
    return !1;
  if (Ue(e) || S(e, "exec"))
    return !0;
  if (J(e))
    return !1;
  throw Error("non exhaustive match");
}
function xf(t) {
  return J(t) && t.length === 1 ? t.charCodeAt(0) : !1;
}
const Mf = {
  // implements /\n|\r\n?/g.test
  test: function(t) {
    const e = t.length;
    for (let n = this.lastIndex; n < e; n++) {
      const r = t.charCodeAt(n);
      if (r === 10)
        return this.lastIndex = n + 1, !0;
      if (r === 13)
        return t.charCodeAt(n + 1) === 10 ? this.lastIndex = n + 2 : this.lastIndex = n + 1, !0;
    }
    return !1;
  },
  lastIndex: 0
};
function Ts(t, e) {
  if (S(t, "LINE_BREAKS"))
    return !1;
  if (Me(t.PATTERN)) {
    try {
      Er(e, t.PATTERN);
    } catch (n) {
      return {
        issue: G.IDENTIFY_TERMINATOR,
        errMsg: n.message
      };
    }
    return !1;
  } else {
    if (J(t.PATTERN))
      return !1;
    if (Es(t))
      return { issue: G.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function Pf(t, e) {
  if (e.issue === G.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (e.issue === G.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error("non exhaustive match");
}
function ys(t) {
  return v(t, (e) => J(e) ? e.charCodeAt(0) : e);
}
function Rn(t, e, n) {
  t[e] === void 0 ? t[e] = [n] : t[e].push(n);
}
const dt = 256;
let Ft = [];
function Ge(t) {
  return t < dt ? t : Ft[t];
}
function wf() {
  if (D(Ft)) {
    Ft = new Array(65536);
    for (let t = 0; t < 65536; t++)
      Ft[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
function It(t, e) {
  const n = t.tokenTypeIdx;
  return n === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[n] === !0;
}
function Xt(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
let mi = 1;
const As = {};
function Nt(t) {
  const e = Uf(t);
  Df(e), Ff(e), $f(e), N(e, (n) => {
    n.isParent = n.categoryMatches.length > 0;
  });
}
function Uf(t) {
  let e = z(t), n = t, r = !0;
  for (; r; ) {
    n = Ot(me(v(n, (s) => s.CATEGORIES)));
    const i = hn(n, e);
    e = e.concat(i), D(i) ? r = !1 : n = i;
  }
  return e;
}
function Df(t) {
  N(t, (e) => {
    vs(e) || (As[mi] = e, e.tokenTypeIdx = mi++), gi(e) && !x(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), gi(e) || (e.CATEGORIES = []), jf(e) || (e.categoryMatches = []), Gf(e) || (e.categoryMatchesMap = {});
  });
}
function $f(t) {
  N(t, (e) => {
    e.categoryMatches = [], N(e.categoryMatchesMap, (n, r) => {
      e.categoryMatches.push(As[r].tokenTypeIdx);
    });
  });
}
function Ff(t) {
  N(t, (e) => {
    _s([], e);
  });
}
function _s(t, e) {
  N(t, (n) => {
    e.categoryMatchesMap[n.tokenTypeIdx] = !0;
  }), N(e.CATEGORIES, (n) => {
    const r = t.concat(e);
    Z(r, n) || _s(r, n);
  });
}
function vs(t) {
  return S(t, "tokenTypeIdx");
}
function gi(t) {
  return S(t, "CATEGORIES");
}
function jf(t) {
  return S(t, "categoryMatches");
}
function Gf(t) {
  return S(t, "categoryMatchesMap");
}
function Bf(t) {
  return S(t, "tokenTypeIdx");
}
const Vf = {
  buildUnableToPopLexerModeMessage(t) {
    return `Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(t, e, n, r, i) {
    return `unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${n} characters.`;
  }
};
var G;
(function(t) {
  t[t.MISSING_PATTERN = 0] = "MISSING_PATTERN", t[t.INVALID_PATTERN = 1] = "INVALID_PATTERN", t[t.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", t[t.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", t[t.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", t[t.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", t[t.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", t[t.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", t[t.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", t[t.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", t[t.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", t[t.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", t[t.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(G || (G = {}));
const pt = {
  deferDefinitionErrorsHandling: !1,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: !1,
  safeMode: !1,
  errorMessageProvider: Vf,
  traceInitPerf: !1,
  skipValidations: !1,
  recoveryEnabled: !0
};
Object.freeze(pt);
class X {
  constructor(e, n = pt) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = (i, s) => {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        const o = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${o}--> <${i}>`);
        const { time: a, value: c } = fs(s), u = a > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && u(`${o}<-- <${i}> time: ${a}ms`), this.traceInitIndent--, c;
      } else
        return s();
    }, typeof n == "boolean")
      throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = ne({}, pt, n);
    const r = this.config.traceInitPerf;
    r === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let i, s = !0;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === pt.lineTerminatorsPattern)
          this.config.lineTerminatorsPattern = Mf;
        else if (this.config.lineTerminatorCharacters === pt.lineTerminatorCharacters)
          throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (n.safeMode && n.ensureOptimizations)
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), x(e) ? i = {
          modes: { defaultMode: z(e) },
          defaultMode: ft
        } : (s = !1, i = z(e));
      }), this.config.skipValidations === !1 && (this.TRACE_INIT("performRuntimeChecks", () => {
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Cf(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(kf(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, N(i.modes, (a, c) => {
        i.modes[c] = fn(a, (u) => Pe(u));
      });
      const o = he(i.modes);
      if (N(i.modes, (a, c) => {
        this.TRACE_INIT(`Mode: <${c}> processing`, () => {
          if (this.modes.push(c), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(df(a, o));
          }), D(this.lexerDefinitionErrors)) {
            Nt(a);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = ff(a, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: n.positionTracking,
                ensureOptimizations: n.ensureOptimizations,
                safeMode: n.safeMode,
                tracer: this.TRACE_INIT
              });
            }), this.patternIdxToConfig[c] = u.patternIdxToConfig, this.charCodeToPatternIdxToConfig[c] = u.charCodeToPatternIdxToConfig, this.emptyGroups = ne({}, this.emptyGroups, u.emptyGroups), this.hasCustom = u.hasCustom || this.hasCustom, this.canModeBeOptimized[c] = u.canBeOptimized;
          }
        });
      }), this.defaultMode = i.defaultMode, !D(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        const a = v(this.lexerDefinitionErrors, (c) => c.message).join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + a);
      }
      N(this.lexerDefinitionWarning, (a) => {
        hs(a.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (gs ? (this.chopInput = tt, this.match = this.matchWithTest) : (this.updateLastIndex = V, this.match = this.matchWithExec), s && (this.handleModes = V), this.trackStartLines === !1 && (this.computeNewColumn = tt), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = V), /full/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createOffsetOnlyToken;
        else
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        const a = re(this.canModeBeOptimized, (c, u, l) => (u === !1 && c.push(l), c), []);
        if (n.ensureOptimizations && !D(a))
          throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        cf();
      }), this.TRACE_INIT("toFastProperties", () => {
        ds(this);
      });
    });
  }
  tokenize(e, n = this.defaultMode) {
    if (!D(this.lexerDefinitionErrors)) {
      const r = v(this.lexerDefinitionErrors, (i) => i.message).join(`-----------------------
`);
      throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + r);
    }
    return this.tokenizeInternal(e, n);
  }
  // There is quite a bit of duplication between this and "tokenizeInternalLazy"
  // This is intentional due to performance considerations.
  // this method also used quite a bit of `!` none null assertions because it is too optimized
  // for `tsc` to always understand it is "safe"
  tokenizeInternal(e, n) {
    let r, i, s, o, a, c, u, l, h, f, _, E, y, R, g;
    const T = e, p = T.length;
    let A = 0, I = 0;
    const C = this.hasCustom ? 0 : Math.floor(e.length / 10), w = new Array(C), m = [];
    let d = this.trackStartLines ? 1 : void 0, O = this.trackStartLines ? 1 : void 0;
    const k = bf(this.emptyGroups), M = this.trackStartLines, B = this.config.lineTerminatorsPattern;
    let ve = 0, de = [], at = [];
    const Ct = [], Or = [];
    Object.freeze(Or);
    let ct;
    function Sr() {
      return de;
    }
    function Ir(Y) {
      const se = Ge(Y), Qe = at[se];
      return Qe === void 0 ? Or : Qe;
    }
    const fo = (Y) => {
      if (Ct.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
      // So no error should occur.
      Y.tokenType.PUSH_MODE === void 0) {
        const se = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(Y);
        m.push({
          offset: Y.startOffset,
          line: Y.startLine,
          column: Y.startColumn,
          length: Y.image.length,
          message: se
        });
      } else {
        Ct.pop();
        const se = rt(Ct);
        de = this.patternIdxToConfig[se], at = this.charCodeToPatternIdxToConfig[se], ve = de.length;
        const Qe = this.canModeBeOptimized[se] && this.config.safeMode === !1;
        at && Qe ? ct = Ir : ct = Sr;
      }
    };
    function Nr(Y) {
      Ct.push(Y), at = this.charCodeToPatternIdxToConfig[Y], de = this.patternIdxToConfig[Y], ve = de.length, ve = de.length;
      const se = this.canModeBeOptimized[Y] && this.config.safeMode === !1;
      at && se ? ct = Ir : ct = Sr;
    }
    Nr.call(this, n);
    let pe;
    const Lr = this.config.recoveryEnabled;
    for (; A < p; ) {
      c = null;
      const Y = T.charCodeAt(A), se = ct(Y), Qe = se.length;
      for (r = 0; r < Qe; r++) {
        pe = se[r];
        const te = pe.pattern;
        u = null;
        const be = pe.short;
        if (be !== !1 ? Y === be && (c = te) : pe.isCustom === !0 ? (g = te.exec(T, A, w, k), g !== null ? (c = g[0], g.payload !== void 0 && (u = g.payload)) : c = null) : (this.updateLastIndex(te, A), c = this.match(te, e, A)), c !== null) {
          if (a = pe.longerAlt, a !== void 0) {
            const Fe = a.length;
            for (s = 0; s < Fe; s++) {
              const xe = de[a[s]], Ke = xe.pattern;
              if (l = null, xe.isCustom === !0 ? (g = Ke.exec(T, A, w, k), g !== null ? (o = g[0], g.payload !== void 0 && (l = g.payload)) : o = null) : (this.updateLastIndex(Ke, A), o = this.match(Ke, e, A)), o && o.length > c.length) {
                c = o, u = l, pe = xe;
                break;
              }
            }
          }
          break;
        }
      }
      if (c !== null) {
        if (h = c.length, f = pe.group, f !== void 0 && (_ = pe.tokenTypeIdx, E = this.createTokenInstance(c, A, _, pe.tokenType, d, O, h), this.handlePayload(E, u), f === !1 ? I = this.addToken(w, I, E) : k[f].push(E)), e = this.chopInput(e, h), A = A + h, O = this.computeNewColumn(O, h), M === !0 && pe.canLineTerminator === !0) {
          let te = 0, be, Fe;
          B.lastIndex = 0;
          do
            be = B.test(c), be === !0 && (Fe = B.lastIndex - 1, te++);
          while (be === !0);
          te !== 0 && (d = d + te, O = h - Fe, this.updateTokenEndLineColumnLocation(E, f, Fe, te, d, O, h));
        }
        this.handleModes(pe, fo, Nr, E);
      } else {
        const te = A, be = d, Fe = O;
        let xe = Lr === !1;
        for (; xe === !1 && A < p; )
          for (e = this.chopInput(e, 1), A++, i = 0; i < ve; i++) {
            const Ke = de[i], Tn = Ke.pattern, Cr = Ke.short;
            if (Cr !== !1 ? T.charCodeAt(A) === Cr && (xe = !0) : Ke.isCustom === !0 ? xe = Tn.exec(T, A, w, k) !== null : (this.updateLastIndex(Tn, A), xe = Tn.exec(e) !== null), xe === !0)
              break;
          }
        if (y = A - te, O = this.computeNewColumn(O, y), R = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(T, te, y, be, Fe), m.push({
          offset: te,
          line: be,
          column: Fe,
          length: y,
          message: R
        }), Lr === !1)
          break;
      }
    }
    return this.hasCustom || (w.length = I), {
      tokens: w,
      groups: k,
      errors: m
    };
  }
  handleModes(e, n, r, i) {
    if (e.pop === !0) {
      const s = e.push;
      n(i), s !== void 0 && r.call(this, s);
    } else e.push !== void 0 && r.call(this, e.push);
  }
  chopInput(e, n) {
    return e.substring(n);
  }
  updateLastIndex(e, n) {
    e.lastIndex = n;
  }
  // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
  updateTokenEndLineColumnLocation(e, n, r, i, s, o, a) {
    let c, u;
    n !== void 0 && (c = r === a - 1, u = c ? -1 : 0, i === 1 && c === !0 || (e.endLine = s + u, e.endColumn = o - 1 + -u));
  }
  computeNewColumn(e, n) {
    return e + n;
  }
  createOffsetOnlyToken(e, n, r, i) {
    return {
      image: e,
      startOffset: n,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createStartOnlyToken(e, n, r, i, s, o) {
    return {
      image: e,
      startOffset: n,
      startLine: s,
      startColumn: o,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createFullToken(e, n, r, i, s, o, a) {
    return {
      image: e,
      startOffset: n,
      endOffset: n + a - 1,
      startLine: s,
      endLine: s,
      startColumn: o,
      endColumn: o + a - 1,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  addTokenUsingPush(e, n, r) {
    return e.push(r), n;
  }
  addTokenUsingMemberAccess(e, n, r) {
    return e[n] = r, n++, n;
  }
  handlePayloadNoCustom(e, n) {
  }
  handlePayloadWithCustom(e, n) {
    n !== null && (e.payload = n);
  }
  matchWithTest(e, n, r) {
    return e.test(n) === !0 ? n.substring(r, e.lastIndex) : null;
  }
  matchWithExec(e, n) {
    const r = e.exec(n);
    return r !== null ? r[0] : null;
  }
}
X.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
X.NA = /NOT_APPLICABLE/;
function gt(t) {
  return Rs(t) ? t.LABEL : t.name;
}
function Rs(t) {
  return J(t.LABEL) && t.LABEL !== "";
}
const Kf = "parent", Ei = "categories", Ti = "label", yi = "group", Ai = "push_mode", _i = "pop_mode", vi = "longer_alt", Ri = "line_breaks", Oi = "start_chars_hint";
function P(t) {
  return Hf(t);
}
function Hf(t) {
  const e = t.pattern, n = {};
  if (n.name = t.name, Pe(e) || (n.PATTERN = e), S(t, Kf))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return S(t, Ei) && (n.CATEGORIES = t[Ei]), Nt([n]), S(t, Ti) && (n.LABEL = t[Ti]), S(t, yi) && (n.GROUP = t[yi]), S(t, _i) && (n.POP_MODE = t[_i]), S(t, Ai) && (n.PUSH_MODE = t[Ai]), S(t, vi) && (n.LONGER_ALT = t[vi]), S(t, Ri) && (n.LINE_BREAKS = t[Ri]), S(t, Oi) && (n.START_CHARS_HINT = t[Oi]), n;
}
const Ye = P({ name: "EOF", pattern: X.NA });
Nt([Ye]);
function Tr(t, e, n, r, i, s, o, a) {
  return {
    image: e,
    startOffset: n,
    endOffset: r,
    startLine: i,
    endLine: s,
    startColumn: o,
    endColumn: a,
    tokenTypeIdx: t.tokenTypeIdx,
    tokenType: t
  };
}
function Wf(t, e) {
  return It(t, e);
}
const Os = {
  buildMismatchTokenMessage({ expected: t, actual: e, previous: n, ruleName: r }) {
    return `Expecting ${Rs(t) ? `--> ${gt(t)} <--` : `token of type --> ${t.name} <--`} but found --> '${e.image}' <--`;
  },
  buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: e }) {
    return "Redundant input, expecting EOF but found: " + t.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt: t, actual: e, previous: n, customUserDescription: r, ruleName: i }) {
    const s = "Expecting: ", o = `
but found: '` + Te(e).image + "'";
    if (r)
      return s + r + o;
    {
      const a = re(t, (l, h) => l.concat(h), []), c = v(a, (l) => `[${v(l, (h) => gt(h)).join(", ")}]`), u = `one of these possible Token sequences:
${v(c, (l, h) => `  ${h + 1}. ${l}`).join(`
`)}`;
      return s + u + o;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: t, actual: e, customUserDescription: n, ruleName: r }) {
    const i = "Expecting: ", s = `
but found: '` + Te(e).image + "'";
    if (n)
      return i + n + s;
    {
      const o = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${v(t, (a) => `[${v(a, (c) => gt(c)).join(",")}]`).join(" ,")}>`;
      return i + o + s;
    }
  }
};
Object.freeze(Os);
const zf = {
  buildRuleNotFoundError(t, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
  }
}, He = {
  buildDuplicateFoundError(t, e) {
    function n(l) {
      return l instanceof F ? l.terminalType.name : l instanceof ie ? l.nonTerminalName : "";
    }
    const r = t.name, i = Te(e), s = i.idx, o = Re(i), a = n(i), c = s > 0;
    let u = `->${o}${c ? s : ""}<- ${a ? `with argument: ->${a}<-` : ""}
                  appears more than once (${e.length} times) in the top level rule: ->${r}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    return u = u.replace(/[ \t]+/g, " "), u = u.replace(/\s\s+/g, `
`), u;
  },
  buildNamespaceConflictError(t) {
    return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
  },
  buildAlternationPrefixAmbiguityError(t) {
    const e = v(t.prefixPath, (r) => gt(r)).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx;
    return `Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  },
  buildAlternationAmbiguityError(t) {
    const e = v(t.prefixPath, (i) => gt(i)).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx;
    let r = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
    return r = r + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
  },
  buildEmptyRepetitionError(t) {
    let e = Re(t.repetition);
    return t.repetition.idx !== 0 && (e += t.repetition.idx), `The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildTokenNameError(t) {
    return "deprecated";
  },
  buildEmptyAlternationError(t) {
    return `Ambiguous empty alternative: <${t.emptyChoiceIdx + 1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
  },
  buildTooManyAlternativesError(t) {
    return `An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length + 1} alternatives.`;
  },
  buildLeftRecursionError(t) {
    const e = t.topLevelRule.name, n = v(t.leftRecursionPath, (i) => i.name), r = `${e} --> ${n.concat([e]).join(" --> ")}`;
    return `Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${r}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildInvalidRuleNameError(t) {
    return "deprecated";
  },
  buildDuplicateRuleNameError(t) {
    let e;
    return t.topLevelRule instanceof st ? e = t.topLevelRule.name : e = t.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`;
  }
};
function Yf(t, e) {
  const n = new Xf(t, e);
  return n.resolveRefs(), n.errors;
}
class Xf extends ot {
  constructor(e, n) {
    super(), this.nameToTopRule = e, this.errMsgProvider = n, this.errors = [];
  }
  resolveRefs() {
    N(K(this.nameToTopRule), (e) => {
      this.currTopLevel = e, e.accept(this);
    });
  }
  visitNonTerminal(e) {
    const n = this.nameToTopRule[e.nonTerminalName];
    if (n)
      e.referencedRule = n;
    else {
      const r = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
      this.errors.push({
        message: r,
        type: q.UNRESOLVED_SUBRULE_REF,
        ruleName: this.currTopLevel.name,
        unresolvedRefName: e.nonTerminalName
      });
    }
  }
}
class qf extends dn {
  constructor(e, n) {
    super(), this.topProd = e, this.path = n, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = !1, this.isAtEndOfPath = !1;
  }
  startWalking() {
    if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name)
      throw Error("The path does not start with the walker's top Rule!");
    return this.ruleStack = z(this.path.ruleStack).reverse(), this.occurrenceStack = z(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
  }
  walk(e, n = []) {
    this.found || super.walk(e, n);
  }
  walkProdRef(e, n, r) {
    if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
      const i = n.concat(r);
      this.updateExpectedNext(), this.walk(e.referencedRule, i);
    }
  }
  updateExpectedNext() {
    D(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
  }
}
class Zf extends qf {
  constructor(e, n) {
    super(e, n), this.path = n, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(e, n, r) {
    if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
      const i = n.concat(r), s = new ee({ definition: i });
      this.possibleTokTypes = St(s), this.found = !0;
    }
  }
}
class mn extends dn {
  constructor(e, n) {
    super(), this.topRule = e, this.occurrence = n, this.result = {
      token: void 0,
      occurrence: void 0,
      isEndOfRule: void 0
    };
  }
  startWalking() {
    return this.walk(this.topRule), this.result;
  }
}
class Qf extends mn {
  walkMany(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Te(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof F && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkMany(e, n, r);
  }
}
class Si extends mn {
  walkManySep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Te(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof F && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkManySep(e, n, r);
  }
}
class Jf extends mn {
  walkAtLeastOne(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Te(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof F && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOne(e, n, r);
  }
}
class Ii extends mn {
  walkAtLeastOneSep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Te(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof F && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOneSep(e, n, r);
  }
}
function $n(t, e, n = []) {
  n = z(n);
  let r = [], i = 0;
  function s(a) {
    return a.concat(W(t, i + 1));
  }
  function o(a) {
    const c = $n(s(a), e, n);
    return r.concat(c);
  }
  for (; n.length < e && i < t.length; ) {
    const a = t[i];
    if (a instanceof ee || a instanceof ie)
      return o(a.definition);
    if (a instanceof Q)
      r = o(a.definition);
    else if (a instanceof Ce) {
      const c = a.definition.concat([
        new H({
          definition: a.definition
        })
      ]);
      return o(c);
    } else if (a instanceof ke) {
      const c = [
        new ee({ definition: a.definition }),
        new H({
          definition: [new F({ terminalType: a.separator })].concat(a.definition)
        })
      ];
      return o(c);
    } else if (a instanceof Ae) {
      const c = a.definition.concat([
        new H({
          definition: [new F({ terminalType: a.separator })].concat(a.definition)
        })
      ]);
      r = o(c);
    } else if (a instanceof H) {
      const c = a.definition.concat([
        new H({
          definition: a.definition
        })
      ]);
      r = o(c);
    } else {
      if (a instanceof _e)
        return N(a.definition, (c) => {
          D(c.definition) === !1 && (r = o(c.definition));
        }), r;
      if (a instanceof F)
        n.push(a.terminalType);
      else
        throw Error("non exhaustive match");
    }
    i++;
  }
  return r.push({
    partialPath: n,
    suffixDef: W(t, i)
  }), r;
}
function Ss(t, e, n, r) {
  const i = "EXIT_NONE_TERMINAL", s = [i], o = "EXIT_ALTERNATIVE";
  let a = !1;
  const c = e.length, u = c - r - 1, l = [], h = [];
  for (h.push({
    idx: -1,
    def: t,
    ruleStack: [],
    occurrenceStack: []
  }); !D(h); ) {
    const f = h.pop();
    if (f === o) {
      a && rt(h).idx <= u && h.pop();
      continue;
    }
    const _ = f.def, E = f.idx, y = f.ruleStack, R = f.occurrenceStack;
    if (D(_))
      continue;
    const g = _[0];
    if (g === i) {
      const T = {
        idx: E,
        def: W(_),
        ruleStack: At(y),
        occurrenceStack: At(R)
      };
      h.push(T);
    } else if (g instanceof F)
      if (E < c - 1) {
        const T = E + 1, p = e[T];
        if (n(p, g.terminalType)) {
          const A = {
            idx: T,
            def: W(_),
            ruleStack: y,
            occurrenceStack: R
          };
          h.push(A);
        }
      } else if (E === c - 1)
        l.push({
          nextTokenType: g.terminalType,
          nextTokenOccurrence: g.idx,
          ruleStack: y,
          occurrenceStack: R
        }), a = !0;
      else
        throw Error("non exhaustive match");
    else if (g instanceof ie) {
      const T = z(y);
      T.push(g.nonTerminalName);
      const p = z(R);
      p.push(g.idx);
      const A = {
        idx: E,
        def: g.definition.concat(s, W(_)),
        ruleStack: T,
        occurrenceStack: p
      };
      h.push(A);
    } else if (g instanceof Q) {
      const T = {
        idx: E,
        def: W(_),
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(T), h.push(o);
      const p = {
        idx: E,
        def: g.definition.concat(W(_)),
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(p);
    } else if (g instanceof Ce) {
      const T = new H({
        definition: g.definition,
        idx: g.idx
      }), p = g.definition.concat([T], W(_)), A = {
        idx: E,
        def: p,
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(A);
    } else if (g instanceof ke) {
      const T = new F({
        terminalType: g.separator
      }), p = new H({
        definition: [T].concat(g.definition),
        idx: g.idx
      }), A = g.definition.concat([p], W(_)), I = {
        idx: E,
        def: A,
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(I);
    } else if (g instanceof Ae) {
      const T = {
        idx: E,
        def: W(_),
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(T), h.push(o);
      const p = new F({
        terminalType: g.separator
      }), A = new H({
        definition: [p].concat(g.definition),
        idx: g.idx
      }), I = g.definition.concat([A], W(_)), C = {
        idx: E,
        def: I,
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(C);
    } else if (g instanceof H) {
      const T = {
        idx: E,
        def: W(_),
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(T), h.push(o);
      const p = new H({
        definition: g.definition,
        idx: g.idx
      }), A = g.definition.concat([p], W(_)), I = {
        idx: E,
        def: A,
        ruleStack: y,
        occurrenceStack: R
      };
      h.push(I);
    } else if (g instanceof _e)
      for (let T = g.definition.length - 1; T >= 0; T--) {
        const p = g.definition[T], A = {
          idx: E,
          def: p.definition.concat(W(_)),
          ruleStack: y,
          occurrenceStack: R
        };
        h.push(A), h.push(o);
      }
    else if (g instanceof ee)
      h.push({
        idx: E,
        def: g.definition.concat(W(_)),
        ruleStack: y,
        occurrenceStack: R
      });
    else if (g instanceof st)
      h.push(ed(g, E, y, R));
    else
      throw Error("non exhaustive match");
  }
  return l;
}
function ed(t, e, n, r) {
  const i = z(n);
  i.push(t.name);
  const s = z(r);
  return s.push(1), {
    idx: e,
    def: t.definition,
    ruleStack: i,
    occurrenceStack: s
  };
}
var j;
(function(t) {
  t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION";
})(j || (j = {}));
function Is(t) {
  if (t instanceof Q || t === "Option")
    return j.OPTION;
  if (t instanceof H || t === "Repetition")
    return j.REPETITION;
  if (t instanceof Ce || t === "RepetitionMandatory")
    return j.REPETITION_MANDATORY;
  if (t instanceof ke || t === "RepetitionMandatoryWithSeparator")
    return j.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof Ae || t === "RepetitionWithSeparator")
    return j.REPETITION_WITH_SEPARATOR;
  if (t instanceof _e || t === "Alternation")
    return j.ALTERNATION;
  throw Error("non exhaustive match");
}
function td(t, e, n, r, i, s) {
  const o = yr(t, e, n), a = Cs(o) ? Xt : It;
  return s(o, r, a, i);
}
function nd(t, e, n, r, i, s) {
  const o = Ar(t, e, i, n), a = Cs(o) ? Xt : It;
  return s(o[0], a, r);
}
function rd(t, e, n, r) {
  const i = t.length, s = ge(t, (o) => ge(o, (a) => a.length === 1));
  if (e)
    return function(o) {
      const a = v(o, (c) => c.GATE);
      for (let c = 0; c < i; c++) {
        const u = t[c], l = u.length, h = a[c];
        if (!(h !== void 0 && h.call(this) === !1))
          e: for (let f = 0; f < l; f++) {
            const _ = u[f], E = _.length;
            for (let y = 0; y < E; y++) {
              const R = this.LA(y + 1);
              if (n(R, _[y]) === !1)
                continue e;
            }
            return c;
          }
      }
    };
  if (s && !r) {
    const o = v(t, (c) => me(c)), a = re(o, (c, u, l) => (N(u, (h) => {
      S(c, h.tokenTypeIdx) || (c[h.tokenTypeIdx] = l), N(h.categoryMatches, (f) => {
        S(c, f) || (c[f] = l);
      });
    }), c), {});
    return function() {
      const c = this.LA(1);
      return a[c.tokenTypeIdx];
    };
  } else
    return function() {
      for (let o = 0; o < i; o++) {
        const a = t[o], c = a.length;
        e: for (let u = 0; u < c; u++) {
          const l = a[u], h = l.length;
          for (let f = 0; f < h; f++) {
            const _ = this.LA(f + 1);
            if (n(_, l[f]) === !1)
              continue e;
          }
          return o;
        }
      }
    };
}
function id(t, e, n) {
  const r = ge(t, (s) => s.length === 1), i = t.length;
  if (r && !n) {
    const s = me(t);
    if (s.length === 1 && D(s[0].categoryMatches)) {
      const o = s[0].tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === o;
      };
    } else {
      const o = re(s, (a, c, u) => (a[c.tokenTypeIdx] = !0, N(c.categoryMatches, (l) => {
        a[l] = !0;
      }), a), []);
      return function() {
        const a = this.LA(1);
        return o[a.tokenTypeIdx] === !0;
      };
    }
  } else
    return function() {
      e: for (let s = 0; s < i; s++) {
        const o = t[s], a = o.length;
        for (let c = 0; c < a; c++) {
          const u = this.LA(c + 1);
          if (e(u, o[c]) === !1)
            continue e;
        }
        return !0;
      }
      return !1;
    };
}
class sd extends dn {
  constructor(e, n, r) {
    super(), this.topProd = e, this.targetOccurrence = n, this.targetProdType = r;
  }
  startWalking() {
    return this.walk(this.topProd), this.restDef;
  }
  checkIsTarget(e, n, r, i) {
    return e.idx === this.targetOccurrence && this.targetProdType === n ? (this.restDef = r.concat(i), !0) : !1;
  }
  walkOption(e, n, r) {
    this.checkIsTarget(e, j.OPTION, n, r) || super.walkOption(e, n, r);
  }
  walkAtLeastOne(e, n, r) {
    this.checkIsTarget(e, j.REPETITION_MANDATORY, n, r) || super.walkOption(e, n, r);
  }
  walkAtLeastOneSep(e, n, r) {
    this.checkIsTarget(e, j.REPETITION_MANDATORY_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
  }
  walkMany(e, n, r) {
    this.checkIsTarget(e, j.REPETITION, n, r) || super.walkOption(e, n, r);
  }
  walkManySep(e, n, r) {
    this.checkIsTarget(e, j.REPETITION_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
  }
}
class Ns extends ot {
  constructor(e, n, r) {
    super(), this.targetOccurrence = e, this.targetProdType = n, this.targetRef = r, this.result = [];
  }
  checkIsTarget(e, n) {
    e.idx === this.targetOccurrence && this.targetProdType === n && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
  }
  visitOption(e) {
    this.checkIsTarget(e, j.OPTION);
  }
  visitRepetition(e) {
    this.checkIsTarget(e, j.REPETITION);
  }
  visitRepetitionMandatory(e) {
    this.checkIsTarget(e, j.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.checkIsTarget(e, j.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(e) {
    this.checkIsTarget(e, j.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(e) {
    this.checkIsTarget(e, j.ALTERNATION);
  }
}
function Ni(t) {
  const e = new Array(t);
  for (let n = 0; n < t; n++)
    e[n] = [];
  return e;
}
function On(t) {
  let e = [""];
  for (let n = 0; n < t.length; n++) {
    const r = t[n], i = [];
    for (let s = 0; s < e.length; s++) {
      const o = e[s];
      i.push(o + "_" + r.tokenTypeIdx);
      for (let a = 0; a < r.categoryMatches.length; a++) {
        const c = "_" + r.categoryMatches[a];
        i.push(o + c);
      }
    }
    e = i;
  }
  return e;
}
function od(t, e, n) {
  for (let r = 0; r < t.length; r++) {
    if (r === n)
      continue;
    const i = t[r];
    for (let s = 0; s < e.length; s++) {
      const o = e[s];
      if (i[o] === !0)
        return !1;
    }
  }
  return !0;
}
function Ls(t, e) {
  const n = v(t, (o) => $n([o], 1)), r = Ni(n.length), i = v(n, (o) => {
    const a = {};
    return N(o, (c) => {
      const u = On(c.partialPath);
      N(u, (l) => {
        a[l] = !0;
      });
    }), a;
  });
  let s = n;
  for (let o = 1; o <= e; o++) {
    const a = s;
    s = Ni(a.length);
    for (let c = 0; c < a.length; c++) {
      const u = a[c];
      for (let l = 0; l < u.length; l++) {
        const h = u[l].partialPath, f = u[l].suffixDef, _ = On(h);
        if (od(i, _, c) || D(f) || h.length === e) {
          const E = r[c];
          if (Fn(E, h) === !1) {
            E.push(h);
            for (let y = 0; y < _.length; y++) {
              const R = _[y];
              i[c][R] = !0;
            }
          }
        } else {
          const E = $n(f, o + 1, h);
          s[c] = s[c].concat(E), N(E, (y) => {
            const R = On(y.partialPath);
            N(R, (g) => {
              i[c][g] = !0;
            });
          });
        }
      }
    }
  }
  return r;
}
function yr(t, e, n, r) {
  const i = new Ns(t, j.ALTERNATION, r);
  return e.accept(i), Ls(i.result, n);
}
function Ar(t, e, n, r) {
  const i = new Ns(t, n);
  e.accept(i);
  const s = i.result, o = new sd(e, t, n).startWalking(), a = new ee({ definition: s }), c = new ee({ definition: o });
  return Ls([a, c], r);
}
function Fn(t, e) {
  e: for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (r.length === e.length) {
      for (let i = 0; i < r.length; i++) {
        const s = e[i], o = r[i];
        if (!(s === o || o.categoryMatchesMap[s.tokenTypeIdx] !== void 0))
          continue e;
      }
      return !0;
    }
  }
  return !1;
}
function ad(t, e) {
  return t.length < e.length && ge(t, (n, r) => {
    const i = e[r];
    return n === i || i.categoryMatchesMap[n.tokenTypeIdx];
  });
}
function Cs(t) {
  return ge(t, (e) => ge(e, (n) => ge(n, (r) => D(r.categoryMatches))));
}
function cd(t) {
  const e = t.lookaheadStrategy.validate({
    rules: t.rules,
    tokenTypes: t.tokenTypes,
    grammarName: t.grammarName
  });
  return v(e, (n) => Object.assign({ type: q.CUSTOM_LOOKAHEAD_VALIDATION }, n));
}
function ud(t, e, n, r) {
  const i = ce(t, (c) => ld(c, n)), s = vd(t, e, n), o = ce(t, (c) => Td(c, n)), a = ce(t, (c) => dd(c, t, r, n));
  return i.concat(s, o, a);
}
function ld(t, e) {
  const n = new fd();
  t.accept(n);
  const r = n.allProductions, i = vh(r, hd), s = ye(i, (o) => o.length > 1);
  return v(K(s), (o) => {
    const a = Te(o), c = e.buildDuplicateFoundError(t, o), u = Re(a), l = {
      message: c,
      type: q.DUPLICATE_PRODUCTIONS,
      ruleName: t.name,
      dslName: u,
      occurrence: a.idx
    }, h = ks(a);
    return h && (l.parameter = h), l;
  });
}
function hd(t) {
  return `${Re(t)}_#_${t.idx}_#_${ks(t)}`;
}
function ks(t) {
  return t instanceof F ? t.terminalType.name : t instanceof ie ? t.nonTerminalName : "";
}
class fd extends ot {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitNonTerminal(e) {
    this.allProductions.push(e);
  }
  visitOption(e) {
    this.allProductions.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
  visitAlternation(e) {
    this.allProductions.push(e);
  }
  visitTerminal(e) {
    this.allProductions.push(e);
  }
}
function dd(t, e, n, r) {
  const i = [];
  if (re(e, (s, o) => o.name === t.name ? s + 1 : s, 0) > 1) {
    const s = r.buildDuplicateRuleNameError({
      topLevelRule: t,
      grammarName: n
    });
    i.push({
      message: s,
      type: q.DUPLICATE_RULE_NAME,
      ruleName: t.name
    });
  }
  return i;
}
function pd(t, e, n) {
  const r = [];
  let i;
  return Z(e, t) || (i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `, r.push({
    message: i,
    type: q.INVALID_RULE_OVERRIDE,
    ruleName: t
  })), r;
}
function bs(t, e, n, r = []) {
  const i = [], s = jt(e.definition);
  if (D(s))
    return [];
  {
    const o = t.name;
    Z(s, t) && i.push({
      message: n.buildLeftRecursionError({
        topLevelRule: t,
        leftRecursionPath: r
      }),
      type: q.LEFT_RECURSION,
      ruleName: o
    });
    const a = hn(s, r.concat([t])), c = ce(a, (u) => {
      const l = z(r);
      return l.push(u), bs(t, u, n, l);
    });
    return i.concat(c);
  }
}
function jt(t) {
  let e = [];
  if (D(t))
    return e;
  const n = Te(t);
  if (n instanceof ie)
    e.push(n.referencedRule);
  else if (n instanceof ee || n instanceof Q || n instanceof Ce || n instanceof ke || n instanceof Ae || n instanceof H)
    e = e.concat(jt(n.definition));
  else if (n instanceof _e)
    e = me(v(n.definition, (s) => jt(s.definition)));
  else if (!(n instanceof F)) throw Error("non exhaustive match");
  const r = Ht(n), i = t.length > 1;
  if (r && i) {
    const s = W(t);
    return e.concat(jt(s));
  } else
    return e;
}
class _r extends ot {
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
}
function md(t, e) {
  const n = new _r();
  t.accept(n);
  const r = n.alternations;
  return ce(r, (i) => {
    const s = At(i.definition);
    return ce(s, (o, a) => {
      const c = Ss([o], [], It, 1);
      return D(c) ? [
        {
          message: e.buildEmptyAlternationError({
            topLevelRule: t,
            alternation: i,
            emptyChoiceIdx: a
          }),
          type: q.NONE_LAST_EMPTY_ALT,
          ruleName: t.name,
          occurrence: i.idx,
          alternative: a + 1
        }
      ] : [];
    });
  });
}
function gd(t, e, n) {
  const r = new _r();
  t.accept(r);
  let i = r.alternations;
  return i = fn(i, (s) => s.ignoreAmbiguities === !0), ce(i, (s) => {
    const o = s.idx, a = s.maxLookahead || e, c = yr(o, t, a, s), u = Ad(c, s, t, n), l = _d(c, s, t, n);
    return u.concat(l);
  });
}
class Ed extends ot {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
}
function Td(t, e) {
  const n = new _r();
  t.accept(n);
  const r = n.alternations;
  return ce(r, (i) => i.definition.length > 255 ? [
    {
      message: e.buildTooManyAlternativesError({
        topLevelRule: t,
        alternation: i
      }),
      type: q.TOO_MANY_ALTS,
      ruleName: t.name,
      occurrence: i.idx
    }
  ] : []);
}
function yd(t, e, n) {
  const r = [];
  return N(t, (i) => {
    const s = new Ed();
    i.accept(s);
    const o = s.allProductions;
    N(o, (a) => {
      const c = Is(a), u = a.maxLookahead || e, l = a.idx, h = Ar(l, i, c, u)[0];
      if (D(me(h))) {
        const f = n.buildEmptyRepetitionError({
          topLevelRule: i,
          repetition: a
        });
        r.push({
          message: f,
          type: q.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: i.name
        });
      }
    });
  }), r;
}
function Ad(t, e, n, r) {
  const i = [], s = re(t, (o, a, c) => (e.definition[c].ignoreAmbiguities === !0 || N(a, (u) => {
    const l = [c];
    N(t, (h, f) => {
      c !== f && Fn(h, u) && // ignore (skip) ambiguities with this "other" alternative
      e.definition[f].ignoreAmbiguities !== !0 && l.push(f);
    }), l.length > 1 && !Fn(i, u) && (i.push(u), o.push({
      alts: l,
      path: u
    }));
  }), o), []);
  return v(s, (o) => {
    const a = v(o.alts, (c) => c + 1);
    return {
      message: r.buildAlternationAmbiguityError({
        topLevelRule: n,
        alternation: e,
        ambiguityIndices: a,
        prefixPath: o.path
      }),
      type: q.AMBIGUOUS_ALTS,
      ruleName: n.name,
      occurrence: e.idx,
      alternatives: o.alts
    };
  });
}
function _d(t, e, n, r) {
  const i = re(t, (s, o, a) => {
    const c = v(o, (u) => ({ idx: a, path: u }));
    return s.concat(c);
  }, []);
  return Ot(ce(i, (s) => {
    if (e.definition[s.idx].ignoreAmbiguities === !0)
      return [];
    const o = s.idx, a = s.path, c = fe(i, (u) => (
      // ignore (skip) ambiguities with this "other" alternative
      e.definition[u.idx].ignoreAmbiguities !== !0 && u.idx < o && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      ad(u.path, a)
    ));
    return v(c, (u) => {
      const l = [u.idx + 1, o + 1], h = e.idx === 0 ? "" : e.idx;
      return {
        message: r.buildAlternationPrefixAmbiguityError({
          topLevelRule: n,
          alternation: e,
          ambiguityIndices: l,
          prefixPath: u.path
        }),
        type: q.AMBIGUOUS_PREFIX_ALTS,
        ruleName: n.name,
        occurrence: h,
        alternatives: l
      };
    });
  }));
}
function vd(t, e, n) {
  const r = [], i = v(e, (s) => s.name);
  return N(t, (s) => {
    const o = s.name;
    if (Z(i, o)) {
      const a = n.buildNamespaceConflictError(s);
      r.push({
        message: a,
        type: q.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: o
      });
    }
  }), r;
}
function Rd(t) {
  const e = pr(t, {
    errMsgProvider: zf
  }), n = {};
  return N(t.rules, (r) => {
    n[r.name] = r;
  }), Yf(n, e.errMsgProvider);
}
function Od(t) {
  return t = pr(t, {
    errMsgProvider: He
  }), ud(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName);
}
const xs = "MismatchedTokenException", Ms = "NoViableAltException", Ps = "EarlyExitException", ws = "NotAllInputParsedException", Us = [
  xs,
  Ms,
  Ps,
  ws
];
Object.freeze(Us);
function qt(t) {
  return Z(Us, t.name);
}
class gn extends Error {
  constructor(e, n) {
    super(e), this.token = n, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
class Ds extends gn {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = xs;
  }
}
class Sd extends gn {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Ms;
  }
}
class Id extends gn {
  constructor(e, n) {
    super(e, n), this.name = ws;
  }
}
class Nd extends gn {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Ps;
  }
}
const Sn = {}, $s = "InRuleRecoveryException";
class Ld extends Error {
  constructor(e) {
    super(e), this.name = $s;
  }
}
class Cd {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = S(e, "recoveryEnabled") ? e.recoveryEnabled : we.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = kd);
  }
  getTokenToInsert(e) {
    const n = Tr(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
    return n.isInsertedInRecovery = !0, n;
  }
  canTokenTypeBeInsertedInRecovery(e) {
    return !0;
  }
  canTokenTypeBeDeletedInRecovery(e) {
    return !0;
  }
  tryInRepetitionRecovery(e, n, r, i) {
    const s = this.findReSyncTokenType(), o = this.exportLexerState(), a = [];
    let c = !1;
    const u = this.LA(1);
    let l = this.LA(1);
    const h = () => {
      const f = this.LA(0), _ = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: i,
        actual: u,
        previous: f,
        ruleName: this.getCurrRuleFullName()
      }), E = new Ds(_, u, this.LA(0));
      E.resyncedTokens = At(a), this.SAVE_ERROR(E);
    };
    for (; !c; )
      if (this.tokenMatcher(l, i)) {
        h();
        return;
      } else if (r.call(this)) {
        h(), e.apply(this, n);
        return;
      } else this.tokenMatcher(l, s) ? c = !0 : (l = this.SKIP_TOKEN(), this.addToResyncTokens(l, a));
    this.importLexerState(o);
  }
  shouldInRepetitionRecoveryBeTried(e, n, r) {
    return !(r === !1 || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, n)));
  }
  // Error Recovery functionality
  getFollowsForInRuleRecovery(e, n) {
    const r = this.getCurrentGrammarPath(e, n);
    return this.getNextPossibleTokenTypes(r);
  }
  tryInRuleRecovery(e, n) {
    if (this.canRecoverWithSingleTokenInsertion(e, n))
      return this.getTokenToInsert(e);
    if (this.canRecoverWithSingleTokenDeletion(e)) {
      const r = this.SKIP_TOKEN();
      return this.consumeToken(), r;
    }
    throw new Ld("sad sad panda");
  }
  canPerformInRuleRecovery(e, n) {
    return this.canRecoverWithSingleTokenInsertion(e, n) || this.canRecoverWithSingleTokenDeletion(e);
  }
  canRecoverWithSingleTokenInsertion(e, n) {
    if (!this.canTokenTypeBeInsertedInRecovery(e) || D(n))
      return !1;
    const r = this.LA(1);
    return it(n, (i) => this.tokenMatcher(r, i)) !== void 0;
  }
  canRecoverWithSingleTokenDeletion(e) {
    return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : !1;
  }
  isInCurrentRuleReSyncSet(e) {
    const n = this.getCurrFollowKey(), r = this.getFollowSetFromFollowKey(n);
    return Z(r, e);
  }
  findReSyncTokenType() {
    const e = this.flattenFollowSet();
    let n = this.LA(1), r = 2;
    for (; ; ) {
      const i = it(e, (s) => Wf(n, s));
      if (i !== void 0)
        return i;
      n = this.LA(r), r++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1)
      return Sn;
    const e = this.getLastExplicitRuleShortName(), n = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(e),
      idxInCallingRule: n,
      inRule: this.shortRuleNameToFullName(r)
    };
  }
  buildFullFollowKeyStack() {
    const e = this.RULE_STACK, n = this.RULE_OCCURRENCE_STACK;
    return v(e, (r, i) => i === 0 ? Sn : {
      ruleName: this.shortRuleNameToFullName(r),
      idxInCallingRule: n[i],
      inRule: this.shortRuleNameToFullName(e[i - 1])
    });
  }
  flattenFollowSet() {
    const e = v(this.buildFullFollowKeyStack(), (n) => this.getFollowSetFromFollowKey(n));
    return me(e);
  }
  getFollowSetFromFollowKey(e) {
    if (e === Sn)
      return [Ye];
    const n = e.ruleName + e.idxInCallingRule + ps + e.inRule;
    return this.resyncFollows[n];
  }
  // It does not make any sense to include a virtual EOF token in the list of resynced tokens
  // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
  addToResyncTokens(e, n) {
    return this.tokenMatcher(e, Ye) || n.push(e), n;
  }
  reSyncTo(e) {
    const n = [];
    let r = this.LA(1);
    for (; this.tokenMatcher(r, e) === !1; )
      r = this.SKIP_TOKEN(), this.addToResyncTokens(r, n);
    return At(n);
  }
  attemptInRepetitionRecovery(e, n, r, i, s, o, a) {
  }
  getCurrentGrammarPath(e, n) {
    const r = this.getHumanReadableRuleStack(), i = z(this.RULE_OCCURRENCE_STACK);
    return {
      ruleStack: r,
      occurrenceStack: i,
      lastTok: e,
      lastTokOccurrence: n
    };
  }
  getHumanReadableRuleStack() {
    return v(this.RULE_STACK, (e) => this.shortRuleNameToFullName(e));
  }
}
function kd(t, e, n, r, i, s, o) {
  const a = this.getKeyForAutomaticLookahead(r, i);
  let c = this.firstAfterRepMap[a];
  if (c === void 0) {
    const f = this.getCurrRuleFullName(), _ = this.getGAstProductions()[f];
    c = new s(_, i).startWalking(), this.firstAfterRepMap[a] = c;
  }
  let u = c.token, l = c.occurrence;
  const h = c.isEndOfRule;
  this.RULE_STACK.length === 1 && h && u === void 0 && (u = Ye, l = 1), !(u === void 0 || l === void 0) && this.shouldInRepetitionRecoveryBeTried(u, l, o) && this.tryInRepetitionRecovery(t, e, n, u);
}
const bd = 4, Ve = 8, Fs = 1 << Ve, js = 2 << Ve, jn = 3 << Ve, Gn = 4 << Ve, Bn = 5 << Ve, Gt = 6 << Ve;
function In(t, e, n) {
  return n | e | t;
}
class xd {
  constructor(e) {
    var n;
    this.maxLookahead = (n = e?.maxLookahead) !== null && n !== void 0 ? n : we.maxLookahead;
  }
  validate(e) {
    const n = this.validateNoLeftRecursion(e.rules);
    if (D(n)) {
      const r = this.validateEmptyOrAlternatives(e.rules), i = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), s = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
      return [
        ...n,
        ...r,
        ...i,
        ...s
      ];
    }
    return n;
  }
  validateNoLeftRecursion(e) {
    return ce(e, (n) => bs(n, n, He));
  }
  validateEmptyOrAlternatives(e) {
    return ce(e, (n) => md(n, He));
  }
  validateAmbiguousAlternationAlternatives(e, n) {
    return ce(e, (r) => gd(r, n, He));
  }
  validateSomeNonEmptyLookaheadPath(e, n) {
    return yd(e, n, He);
  }
  buildLookaheadForAlternation(e) {
    return td(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, rd);
  }
  buildLookaheadForOptional(e) {
    return nd(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, Is(e.prodType), id);
  }
}
class Md {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = S(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : we.dynamicTokensEnabled, this.maxLookahead = S(e, "maxLookahead") ? e.maxLookahead : we.maxLookahead, this.lookaheadStrategy = S(e, "lookaheadStrategy") ? e.lookaheadStrategy : new xd({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    N(e, (n) => {
      this.TRACE_INIT(`${n.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: i, option: s, repetitionMandatory: o, repetitionMandatoryWithSeparator: a, repetitionWithSeparator: c } = wd(n);
        N(r, (u) => {
          const l = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${Re(u)}${l}`, () => {
            const h = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: n,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            }), f = In(this.fullRuleNameToShort[n.name], Fs, u.idx);
            this.setLaFuncCache(f, h);
          });
        }), N(i, (u) => {
          this.computeLookaheadFunc(n, u.idx, jn, "Repetition", u.maxLookahead, Re(u));
        }), N(s, (u) => {
          this.computeLookaheadFunc(n, u.idx, js, "Option", u.maxLookahead, Re(u));
        }), N(o, (u) => {
          this.computeLookaheadFunc(n, u.idx, Gn, "RepetitionMandatory", u.maxLookahead, Re(u));
        }), N(a, (u) => {
          this.computeLookaheadFunc(n, u.idx, Gt, "RepetitionMandatoryWithSeparator", u.maxLookahead, Re(u));
        }), N(c, (u) => {
          this.computeLookaheadFunc(n, u.idx, Bn, "RepetitionWithSeparator", u.maxLookahead, Re(u));
        });
      });
    });
  }
  computeLookaheadFunc(e, n, r, i, s, o) {
    this.TRACE_INIT(`${o}${n === 0 ? "" : n}`, () => {
      const a = this.lookaheadStrategy.buildLookaheadForOptional({
        prodOccurrence: n,
        rule: e,
        maxLookahead: s || this.maxLookahead,
        dynamicTokensEnabled: this.dynamicTokensEnabled,
        prodType: i
      }), c = In(this.fullRuleNameToShort[e.name], r, n);
      this.setLaFuncCache(c, a);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(e, n) {
    const r = this.getLastExplicitRuleShortName();
    return In(r, e, n);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  /* istanbul ignore next */
  setLaFuncCache(e, n) {
    this.lookAheadFuncsCache.set(e, n);
  }
}
class Pd extends ot {
  constructor() {
    super(...arguments), this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  reset() {
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  visitOption(e) {
    this.dslMethods.option.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.dslMethods.repetitionWithSeparator.push(e);
  }
  visitRepetitionMandatory(e) {
    this.dslMethods.repetitionMandatory.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(e);
  }
  visitRepetition(e) {
    this.dslMethods.repetition.push(e);
  }
  visitAlternation(e) {
    this.dslMethods.alternation.push(e);
  }
}
const Pt = new Pd();
function wd(t) {
  Pt.reset(), t.accept(Pt);
  const e = Pt.dslMethods;
  return Pt.reset(), e;
}
function Li(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
}
function Ci(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine);
}
function Ud(t, e, n) {
  t.children[n] === void 0 ? t.children[n] = [e] : t.children[n].push(e);
}
function Dd(t, e, n) {
  t.children[e] === void 0 ? t.children[e] = [n] : t.children[e].push(n);
}
const $d = "name";
function Gs(t, e) {
  Object.defineProperty(t, $d, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e
  });
}
function Fd(t, e) {
  const n = he(t), r = n.length;
  for (let i = 0; i < r; i++) {
    const s = n[i], o = t[s], a = o.length;
    for (let c = 0; c < a; c++) {
      const u = o[c];
      u.tokenTypeIdx === void 0 && this[u.name](u.children, e);
    }
  }
}
function jd(t, e) {
  const n = function() {
  };
  Gs(n, t + "BaseSemantics");
  const r = {
    visit: function(i, s) {
      if (x(i) && (i = i[0]), !Pe(i))
        return this[i.name](i.children, s);
    },
    validateVisitor: function() {
      const i = Bd(this, e);
      if (!D(i)) {
        const s = v(i, (o) => o.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${s.join(`

`).replace(/\n/g, `
	`)}`);
      }
    }
  };
  return n.prototype = r, n.prototype.constructor = n, n._RULE_NAMES = e, n;
}
function Gd(t, e, n) {
  const r = function() {
  };
  Gs(r, t + "BaseSemanticsWithDefaults");
  const i = Object.create(n.prototype);
  return N(e, (s) => {
    i[s] = Fd;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var Vn;
(function(t) {
  t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Vn || (Vn = {}));
function Bd(t, e) {
  return Vd(t, e);
}
function Vd(t, e) {
  const n = fe(e, (i) => Ue(t[i]) === !1), r = v(n, (i) => ({
    msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,
    type: Vn.MISSING_METHOD,
    methodName: i
  }));
  return Ot(r);
}
class Kd {
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = S(e, "nodeLocationTracking") ? e.nodeLocationTracking : we.nodeLocationTracking, !this.outputCst)
      this.cstInvocationStateUpdate = V, this.cstFinallyStateUpdate = V, this.cstPostTerminal = V, this.cstPostNonTerminal = V, this.cstPostRule = V;
    else if (/full/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = Ci, this.setNodeLocationFromNode = Ci, this.cstPostRule = V, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = V, this.setNodeLocationFromNode = V, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = Li, this.setNodeLocationFromNode = Li, this.cstPostRule = V, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = V, this.setNodeLocationFromNode = V, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking))
      this.setNodeLocationFromToken = V, this.setNodeLocationFromNode = V, this.cstPostRule = V, this.setInitialNodeLocation = V;
    else
      throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
  }
  setInitialNodeLocationOnlyOffsetRecovery(e) {
    e.location = {
      startOffset: NaN,
      endOffset: NaN
    };
  }
  setInitialNodeLocationOnlyOffsetRegular(e) {
    e.location = {
      // without error recovery the starting Location of a new CstNode is guaranteed
      // To be the next Token's startOffset (for valid inputs).
      // For invalid inputs there won't be any CSTOutput so this potential
      // inaccuracy does not matter
      startOffset: this.LA(1).startOffset,
      endOffset: NaN
    };
  }
  setInitialNodeLocationFullRecovery(e) {
    e.location = {
      startOffset: NaN,
      startLine: NaN,
      startColumn: NaN,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
  
       * @param cstNode
       */
  setInitialNodeLocationFullRegular(e) {
    const n = this.LA(1);
    e.location = {
      startOffset: n.startOffset,
      startLine: n.startLine,
      startColumn: n.startColumn,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  cstInvocationStateUpdate(e) {
    const n = {
      name: e,
      children: /* @__PURE__ */ Object.create(null)
    };
    this.setInitialNodeLocation(n), this.CST_STACK.push(n);
  }
  cstFinallyStateUpdate() {
    this.CST_STACK.pop();
  }
  cstPostRuleFull(e) {
    const n = this.LA(0), r = e.location;
    r.startOffset <= n.startOffset ? (r.endOffset = n.endOffset, r.endLine = n.endLine, r.endColumn = n.endColumn) : (r.startOffset = NaN, r.startLine = NaN, r.startColumn = NaN);
  }
  cstPostRuleOnlyOffset(e) {
    const n = this.LA(0), r = e.location;
    r.startOffset <= n.startOffset ? r.endOffset = n.endOffset : r.startOffset = NaN;
  }
  cstPostTerminal(e, n) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    Ud(r, n, e), this.setNodeLocationFromToken(r.location, n);
  }
  cstPostNonTerminal(e, n) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    Dd(r, n, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (Pe(this.baseCstVisitorConstructor)) {
      const e = jd(this.className, he(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (Pe(this.baseCstVisitorWithDefaultsConstructor)) {
      const e = Gd(this.className, he(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      return this.baseCstVisitorWithDefaultsConstructor = e, e;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }
  getLastExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 1];
  }
  getPreviousExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 2];
  }
  getLastExplicitRuleOccurrenceIndex() {
    const e = this.RULE_OCCURRENCE_STACK;
    return e[e.length - 1];
  }
}
class Hd {
  initLexerAdapter() {
    this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
  }
  set input(e) {
    if (this.selfAnalysisDone !== !0)
      throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
    this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
  }
  get input() {
    return this.tokVector;
  }
  // skips a token and returns the next token
  SKIP_TOKEN() {
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : Qt;
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  LA(e) {
    const n = this.currIdx + e;
    return n < 0 || this.tokVectorLength <= n ? Qt : this.tokVector[n];
  }
  consumeToken() {
    this.currIdx++;
  }
  exportLexerState() {
    return this.currIdx;
  }
  importLexerState(e) {
    this.currIdx = e;
  }
  resetLexerState() {
    this.currIdx = -1;
  }
  moveToTerminatedState() {
    this.currIdx = this.tokVector.length - 1;
  }
  getLexerPosition() {
    return this.exportLexerState();
  }
}
class Wd {
  ACTION(e) {
    return e.call(this);
  }
  consume(e, n, r) {
    return this.consumeInternal(n, e, r);
  }
  subrule(e, n, r) {
    return this.subruleInternal(n, e, r);
  }
  option(e, n) {
    return this.optionInternal(n, e);
  }
  or(e, n) {
    return this.orInternal(n, e);
  }
  many(e, n) {
    return this.manyInternal(e, n);
  }
  atLeastOne(e, n) {
    return this.atLeastOneInternal(e, n);
  }
  CONSUME(e, n) {
    return this.consumeInternal(e, 0, n);
  }
  CONSUME1(e, n) {
    return this.consumeInternal(e, 1, n);
  }
  CONSUME2(e, n) {
    return this.consumeInternal(e, 2, n);
  }
  CONSUME3(e, n) {
    return this.consumeInternal(e, 3, n);
  }
  CONSUME4(e, n) {
    return this.consumeInternal(e, 4, n);
  }
  CONSUME5(e, n) {
    return this.consumeInternal(e, 5, n);
  }
  CONSUME6(e, n) {
    return this.consumeInternal(e, 6, n);
  }
  CONSUME7(e, n) {
    return this.consumeInternal(e, 7, n);
  }
  CONSUME8(e, n) {
    return this.consumeInternal(e, 8, n);
  }
  CONSUME9(e, n) {
    return this.consumeInternal(e, 9, n);
  }
  SUBRULE(e, n) {
    return this.subruleInternal(e, 0, n);
  }
  SUBRULE1(e, n) {
    return this.subruleInternal(e, 1, n);
  }
  SUBRULE2(e, n) {
    return this.subruleInternal(e, 2, n);
  }
  SUBRULE3(e, n) {
    return this.subruleInternal(e, 3, n);
  }
  SUBRULE4(e, n) {
    return this.subruleInternal(e, 4, n);
  }
  SUBRULE5(e, n) {
    return this.subruleInternal(e, 5, n);
  }
  SUBRULE6(e, n) {
    return this.subruleInternal(e, 6, n);
  }
  SUBRULE7(e, n) {
    return this.subruleInternal(e, 7, n);
  }
  SUBRULE8(e, n) {
    return this.subruleInternal(e, 8, n);
  }
  SUBRULE9(e, n) {
    return this.subruleInternal(e, 9, n);
  }
  OPTION(e) {
    return this.optionInternal(e, 0);
  }
  OPTION1(e) {
    return this.optionInternal(e, 1);
  }
  OPTION2(e) {
    return this.optionInternal(e, 2);
  }
  OPTION3(e) {
    return this.optionInternal(e, 3);
  }
  OPTION4(e) {
    return this.optionInternal(e, 4);
  }
  OPTION5(e) {
    return this.optionInternal(e, 5);
  }
  OPTION6(e) {
    return this.optionInternal(e, 6);
  }
  OPTION7(e) {
    return this.optionInternal(e, 7);
  }
  OPTION8(e) {
    return this.optionInternal(e, 8);
  }
  OPTION9(e) {
    return this.optionInternal(e, 9);
  }
  OR(e) {
    return this.orInternal(e, 0);
  }
  OR1(e) {
    return this.orInternal(e, 1);
  }
  OR2(e) {
    return this.orInternal(e, 2);
  }
  OR3(e) {
    return this.orInternal(e, 3);
  }
  OR4(e) {
    return this.orInternal(e, 4);
  }
  OR5(e) {
    return this.orInternal(e, 5);
  }
  OR6(e) {
    return this.orInternal(e, 6);
  }
  OR7(e) {
    return this.orInternal(e, 7);
  }
  OR8(e) {
    return this.orInternal(e, 8);
  }
  OR9(e) {
    return this.orInternal(e, 9);
  }
  MANY(e) {
    this.manyInternal(0, e);
  }
  MANY1(e) {
    this.manyInternal(1, e);
  }
  MANY2(e) {
    this.manyInternal(2, e);
  }
  MANY3(e) {
    this.manyInternal(3, e);
  }
  MANY4(e) {
    this.manyInternal(4, e);
  }
  MANY5(e) {
    this.manyInternal(5, e);
  }
  MANY6(e) {
    this.manyInternal(6, e);
  }
  MANY7(e) {
    this.manyInternal(7, e);
  }
  MANY8(e) {
    this.manyInternal(8, e);
  }
  MANY9(e) {
    this.manyInternal(9, e);
  }
  MANY_SEP(e) {
    this.manySepFirstInternal(0, e);
  }
  MANY_SEP1(e) {
    this.manySepFirstInternal(1, e);
  }
  MANY_SEP2(e) {
    this.manySepFirstInternal(2, e);
  }
  MANY_SEP3(e) {
    this.manySepFirstInternal(3, e);
  }
  MANY_SEP4(e) {
    this.manySepFirstInternal(4, e);
  }
  MANY_SEP5(e) {
    this.manySepFirstInternal(5, e);
  }
  MANY_SEP6(e) {
    this.manySepFirstInternal(6, e);
  }
  MANY_SEP7(e) {
    this.manySepFirstInternal(7, e);
  }
  MANY_SEP8(e) {
    this.manySepFirstInternal(8, e);
  }
  MANY_SEP9(e) {
    this.manySepFirstInternal(9, e);
  }
  AT_LEAST_ONE(e) {
    this.atLeastOneInternal(0, e);
  }
  AT_LEAST_ONE1(e) {
    return this.atLeastOneInternal(1, e);
  }
  AT_LEAST_ONE2(e) {
    this.atLeastOneInternal(2, e);
  }
  AT_LEAST_ONE3(e) {
    this.atLeastOneInternal(3, e);
  }
  AT_LEAST_ONE4(e) {
    this.atLeastOneInternal(4, e);
  }
  AT_LEAST_ONE5(e) {
    this.atLeastOneInternal(5, e);
  }
  AT_LEAST_ONE6(e) {
    this.atLeastOneInternal(6, e);
  }
  AT_LEAST_ONE7(e) {
    this.atLeastOneInternal(7, e);
  }
  AT_LEAST_ONE8(e) {
    this.atLeastOneInternal(8, e);
  }
  AT_LEAST_ONE9(e) {
    this.atLeastOneInternal(9, e);
  }
  AT_LEAST_ONE_SEP(e) {
    this.atLeastOneSepFirstInternal(0, e);
  }
  AT_LEAST_ONE_SEP1(e) {
    this.atLeastOneSepFirstInternal(1, e);
  }
  AT_LEAST_ONE_SEP2(e) {
    this.atLeastOneSepFirstInternal(2, e);
  }
  AT_LEAST_ONE_SEP3(e) {
    this.atLeastOneSepFirstInternal(3, e);
  }
  AT_LEAST_ONE_SEP4(e) {
    this.atLeastOneSepFirstInternal(4, e);
  }
  AT_LEAST_ONE_SEP5(e) {
    this.atLeastOneSepFirstInternal(5, e);
  }
  AT_LEAST_ONE_SEP6(e) {
    this.atLeastOneSepFirstInternal(6, e);
  }
  AT_LEAST_ONE_SEP7(e) {
    this.atLeastOneSepFirstInternal(7, e);
  }
  AT_LEAST_ONE_SEP8(e) {
    this.atLeastOneSepFirstInternal(8, e);
  }
  AT_LEAST_ONE_SEP9(e) {
    this.atLeastOneSepFirstInternal(9, e);
  }
  RULE(e, n, r = Jt) {
    if (Z(this.definedRulesNames, e)) {
      const s = {
        message: He.buildDuplicateRuleNameError({
          topLevelRule: e,
          grammarName: this.className
        }),
        type: q.DUPLICATE_RULE_NAME,
        ruleName: e
      };
      this.definitionErrors.push(s);
    }
    this.definedRulesNames.push(e);
    const i = this.defineRule(e, n, r);
    return this[e] = i, i;
  }
  OVERRIDE_RULE(e, n, r = Jt) {
    const i = pd(e, this.definedRulesNames, this.className);
    this.definitionErrors = this.definitionErrors.concat(i);
    const s = this.defineRule(e, n, r);
    return this[e] = s, s;
  }
  BACKTRACK(e, n) {
    return function() {
      this.isBackTrackingStack.push(1);
      const r = this.saveRecogState();
      try {
        return e.apply(this, n), !0;
      } catch (i) {
        if (qt(i))
          return !1;
        throw i;
      } finally {
        this.reloadRecogState(r), this.isBackTrackingStack.pop();
      }
    };
  }
  // GAST export APIs
  getGAstProductions() {
    return this.gastProductionsCache;
  }
  getSerializedGastProductions() {
    return zh(K(this.gastProductionsCache));
  }
}
class zd {
  initRecognizerEngine(e, n) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = Xt, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, S(n, "serializedGrammar"))
      throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
    if (x(e)) {
      if (D(e))
        throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
      if (typeof e[0].startOffset == "number")
        throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
    }
    if (x(e))
      this.tokensMap = re(e, (s, o) => (s[o.name] = o, s), {});
    else if (S(e, "modes") && ge(me(K(e.modes)), Bf)) {
      const s = me(K(e.modes)), o = mr(s);
      this.tokensMap = re(o, (a, c) => (a[c.name] = c, a), {});
    } else if (le(e))
      this.tokensMap = z(e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = Ye;
    const r = S(e, "modes") ? me(K(e.modes)) : K(e), i = ge(r, (s) => D(s.categoryMatches));
    this.tokenMatcher = i ? Xt : It, Nt(K(this.tokensMap));
  }
  defineRule(e, n, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const i = S(r, "resyncEnabled") ? r.resyncEnabled : Jt.resyncEnabled, s = S(r, "recoveryValueFunc") ? r.recoveryValueFunc : Jt.recoveryValueFunc, o = this.ruleShortNameIdx << bd + Ve;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[o] = e, this.fullRuleNameToShort[e] = o;
    let a;
    return this.outputCst === !0 ? a = function(...c) {
      try {
        this.ruleInvocationStateUpdate(o, e, this.subruleIdx), n.apply(this, c);
        const u = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(u), u;
      } catch (u) {
        return this.invokeRuleCatch(u, i, s);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    } : a = function(...c) {
      try {
        return this.ruleInvocationStateUpdate(o, e, this.subruleIdx), n.apply(this, c);
      } catch (u) {
        return this.invokeRuleCatch(u, i, s);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, Object.assign(a, { ruleName: e, originalGrammarAction: n });
  }
  invokeRuleCatch(e, n, r) {
    const i = this.RULE_STACK.length === 1, s = n && !this.isBackTracking() && this.recoveryEnabled;
    if (qt(e)) {
      const o = e;
      if (s) {
        const a = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(a))
          if (o.resyncedTokens = this.reSyncTo(a), this.outputCst) {
            const c = this.CST_STACK[this.CST_STACK.length - 1];
            return c.recoveredNode = !0, c;
          } else
            return r(e);
        else {
          if (this.outputCst) {
            const c = this.CST_STACK[this.CST_STACK.length - 1];
            c.recoveredNode = !0, o.partialCstResult = c;
          }
          throw o;
        }
      } else {
        if (i)
          return this.moveToTerminatedState(), r(e);
        throw o;
      }
    } else
      throw e;
  }
  // Implementation of parsing DSL
  optionInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(js, n);
    return this.optionInternalLogic(e, n, r);
  }
  optionInternalLogic(e, n, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof e != "function") {
      s = e.DEF;
      const o = e.GATE;
      if (o !== void 0) {
        const a = i;
        i = () => o.call(this) && a.call(this);
      }
    } else
      s = e;
    if (i.call(this) === !0)
      return s.call(this);
  }
  atLeastOneInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Gn, e);
    return this.atLeastOneInternalLogic(e, n, r);
  }
  atLeastOneInternalLogic(e, n, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof n != "function") {
      s = n.DEF;
      const o = n.GATE;
      if (o !== void 0) {
        const a = i;
        i = () => o.call(this) && a.call(this);
      }
    } else
      s = n;
    if (i.call(this) === !0) {
      let o = this.doSingleRepetition(s);
      for (; i.call(this) === !0 && o === !0; )
        o = this.doSingleRepetition(s);
    } else
      throw this.raiseEarlyExitException(e, j.REPETITION_MANDATORY, n.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, n], i, Gn, e, Jf);
  }
  atLeastOneSepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Gt, e);
    this.atLeastOneSepFirstInternalLogic(e, n, r);
  }
  atLeastOneSepFirstInternalLogic(e, n, r) {
    const i = n.DEF, s = n.SEP;
    if (this.getLaFuncFromCache(r).call(this) === !0) {
      i.call(this);
      const o = () => this.tokenMatcher(this.LA(1), s);
      for (; this.tokenMatcher(this.LA(1), s) === !0; )
        this.CONSUME(s), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        s,
        o,
        i,
        Ii
      ], o, Gt, e, Ii);
    } else
      throw this.raiseEarlyExitException(e, j.REPETITION_MANDATORY_WITH_SEPARATOR, n.ERR_MSG);
  }
  manyInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(jn, e);
    return this.manyInternalLogic(e, n, r);
  }
  manyInternalLogic(e, n, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof n != "function") {
      s = n.DEF;
      const a = n.GATE;
      if (a !== void 0) {
        const c = i;
        i = () => a.call(this) && c.call(this);
      }
    } else
      s = n;
    let o = !0;
    for (; i.call(this) === !0 && o === !0; )
      o = this.doSingleRepetition(s);
    this.attemptInRepetitionRecovery(
      this.manyInternal,
      [e, n],
      i,
      jn,
      e,
      Qf,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      o
    );
  }
  manySepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Bn, e);
    this.manySepFirstInternalLogic(e, n, r);
  }
  manySepFirstInternalLogic(e, n, r) {
    const i = n.DEF, s = n.SEP;
    if (this.getLaFuncFromCache(r).call(this) === !0) {
      i.call(this);
      const o = () => this.tokenMatcher(this.LA(1), s);
      for (; this.tokenMatcher(this.LA(1), s) === !0; )
        this.CONSUME(s), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        s,
        o,
        i,
        Si
      ], o, Bn, e, Si);
    }
  }
  repetitionSepSecondInternal(e, n, r, i, s) {
    for (; r(); )
      this.CONSUME(n), i.call(this);
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
      e,
      n,
      r,
      i,
      s
    ], r, Gt, e, s);
  }
  doSingleRepetition(e) {
    const n = this.getLexerPosition();
    return e.call(this), this.getLexerPosition() > n;
  }
  orInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Fs, n), i = x(e) ? e : e.DEF, s = this.getLaFuncFromCache(r).call(this, i);
    if (s !== void 0)
      return i[s].ALT.call(this);
    this.raiseNoAltException(n, e.ERR_MSG);
  }
  ruleFinallyStateUpdate() {
    if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === !1) {
      const e = this.LA(1), n = this.errorMessageProvider.buildNotAllInputParsedMessage({
        firstRedundant: e,
        ruleName: this.getCurrRuleFullName()
      });
      this.SAVE_ERROR(new Id(n, e));
    }
  }
  subruleInternal(e, n, r) {
    let i;
    try {
      const s = r !== void 0 ? r.ARGS : void 0;
      return this.subruleIdx = n, i = e.apply(this, s), this.cstPostNonTerminal(i, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), i;
    } catch (s) {
      throw this.subruleInternalError(s, r, e.ruleName);
    }
  }
  subruleInternalError(e, n, r) {
    throw qt(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : r), delete e.partialCstResult), e;
  }
  consumeInternal(e, n, r) {
    let i;
    try {
      const s = this.LA(1);
      this.tokenMatcher(s, e) === !0 ? (this.consumeToken(), i = s) : this.consumeInternalError(e, s, r);
    } catch (s) {
      i = this.consumeInternalRecovery(e, n, s);
    }
    return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, i), i;
  }
  consumeInternalError(e, n, r) {
    let i;
    const s = this.LA(0);
    throw r !== void 0 && r.ERR_MSG ? i = r.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({
      expected: e,
      actual: n,
      previous: s,
      ruleName: this.getCurrRuleFullName()
    }), this.SAVE_ERROR(new Ds(i, n, s));
  }
  consumeInternalRecovery(e, n, r) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const i = this.getFollowsForInRuleRecovery(e, n);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (s) {
        throw s.name === $s ? r : s;
      }
    } else
      throw r;
  }
  saveRecogState() {
    const e = this.errors, n = z(this.RULE_STACK);
    return {
      errors: e,
      lexerState: this.exportLexerState(),
      RULE_STACK: n,
      CST_STACK: this.CST_STACK
    };
  }
  reloadRecogState(e) {
    this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
  }
  ruleInvocationStateUpdate(e, n, r) {
    this.RULE_OCCURRENCE_STACK.push(r), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(n);
  }
  isBackTracking() {
    return this.isBackTrackingStack.length !== 0;
  }
  getCurrRuleFullName() {
    const e = this.getLastExplicitRuleShortName();
    return this.shortRuleNameToFull[e];
  }
  shortRuleNameToFullName(e) {
    return this.shortRuleNameToFull[e];
  }
  isAtEndOfInput() {
    return this.tokenMatcher(this.LA(1), Ye);
  }
  reset() {
    this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
  }
}
class Yd {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = S(e, "errorMessageProvider") ? e.errorMessageProvider : we.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (qt(e))
      return e.context = {
        ruleStack: this.getHumanReadableRuleStack(),
        ruleOccurrenceStack: z(this.RULE_OCCURRENCE_STACK)
      }, this._errors.push(e), e;
    throw Error("Trying to save an Error which is not a RecognitionException");
  }
  get errors() {
    return z(this._errors);
  }
  set errors(e) {
    this._errors = e;
  }
  // TODO: consider caching the error message computed information
  raiseEarlyExitException(e, n, r) {
    const i = this.getCurrRuleFullName(), s = this.getGAstProductions()[i], o = Ar(e, s, n, this.maxLookahead)[0], a = [];
    for (let u = 1; u <= this.maxLookahead; u++)
      a.push(this.LA(u));
    const c = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: o,
      actual: a,
      previous: this.LA(0),
      customUserDescription: r,
      ruleName: i
    });
    throw this.SAVE_ERROR(new Nd(c, this.LA(1), this.LA(0)));
  }
  // TODO: consider caching the error message computed information
  raiseNoAltException(e, n) {
    const r = this.getCurrRuleFullName(), i = this.getGAstProductions()[r], s = yr(e, i, this.maxLookahead), o = [];
    for (let u = 1; u <= this.maxLookahead; u++)
      o.push(this.LA(u));
    const a = this.LA(0), c = this.errorMessageProvider.buildNoViableAltMessage({
      expectedPathsPerAlt: s,
      actual: o,
      previous: a,
      customUserDescription: n,
      ruleName: this.getCurrRuleFullName()
    });
    throw this.SAVE_ERROR(new Sd(c, this.LA(1), a));
  }
}
class Xd {
  initContentAssist() {
  }
  computeContentAssist(e, n) {
    const r = this.gastProductionsCache[e];
    if (Pe(r))
      throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return Ss([r], n, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const n = Te(e.ruleStack), r = this.getGAstProductions()[n];
    return new Zf(r, e).startWalking();
  }
}
const En = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(En);
const ki = !0, bi = Math.pow(2, Ve) - 1, Bs = P({ name: "RECORDING_PHASE_TOKEN", pattern: X.NA });
Nt([Bs]);
const Vs = Tr(
  Bs,
  `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
  // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
);
Object.freeze(Vs);
const qd = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
};
class Zd {
  initGastRecorder(e) {
    this.recordingProdStack = [], this.RECORDING_PHASE = !1;
  }
  enableRecording() {
    this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", () => {
      for (let e = 0; e < 10; e++) {
        const n = e > 0 ? e : "";
        this[`CONSUME${n}`] = function(r, i) {
          return this.consumeInternalRecord(r, e, i);
        }, this[`SUBRULE${n}`] = function(r, i) {
          return this.subruleInternalRecord(r, e, i);
        }, this[`OPTION${n}`] = function(r) {
          return this.optionInternalRecord(r, e);
        }, this[`OR${n}`] = function(r) {
          return this.orInternalRecord(r, e);
        }, this[`MANY${n}`] = function(r) {
          this.manyInternalRecord(e, r);
        }, this[`MANY_SEP${n}`] = function(r) {
          this.manySepFirstInternalRecord(e, r);
        }, this[`AT_LEAST_ONE${n}`] = function(r) {
          this.atLeastOneInternalRecord(e, r);
        }, this[`AT_LEAST_ONE_SEP${n}`] = function(r) {
          this.atLeastOneSepFirstInternalRecord(e, r);
        };
      }
      this.consume = function(e, n, r) {
        return this.consumeInternalRecord(n, e, r);
      }, this.subrule = function(e, n, r) {
        return this.subruleInternalRecord(n, e, r);
      }, this.option = function(e, n) {
        return this.optionInternalRecord(n, e);
      }, this.or = function(e, n) {
        return this.orInternalRecord(n, e);
      }, this.many = function(e, n) {
        this.manyInternalRecord(e, n);
      }, this.atLeastOne = function(e, n) {
        this.atLeastOneInternalRecord(e, n);
      }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
    });
  }
  disableRecording() {
    this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", () => {
      const e = this;
      for (let n = 0; n < 10; n++) {
        const r = n > 0 ? n : "";
        delete e[`CONSUME${r}`], delete e[`SUBRULE${r}`], delete e[`OPTION${r}`], delete e[`OR${r}`], delete e[`MANY${r}`], delete e[`MANY_SEP${r}`], delete e[`AT_LEAST_ONE${r}`], delete e[`AT_LEAST_ONE_SEP${r}`];
      }
      delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
    });
  }
  //   Parser methods are called inside an ACTION?
  //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
  // @ts-expect-error -- noop place holder
  ACTION_RECORD(e) {
  }
  // Executing backtracking logic will break our recording logic assumptions
  BACKTRACK_RECORD(e, n) {
    return () => !0;
  }
  // LA is part of the official API and may be used for custom lookahead logic
  // by end users who may forget to wrap it in ACTION or inside a GATE
  LA_RECORD(e) {
    return Qt;
  }
  topLevelRuleRecord(e, n) {
    try {
      const r = new st({ definition: [], name: e });
      return r.name = e, this.recordingProdStack.push(r), n.call(this), this.recordingProdStack.pop(), r;
    } catch (r) {
      if (r.KNOWN_RECORDER_ERROR !== !0)
        try {
          r.message = r.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
        } catch {
          throw r;
        }
      throw r;
    }
  }
  // Implementation of parsing DSL
  optionInternalRecord(e, n) {
    return ht.call(this, Q, e, n);
  }
  atLeastOneInternalRecord(e, n) {
    ht.call(this, Ce, n, e);
  }
  atLeastOneSepFirstInternalRecord(e, n) {
    ht.call(this, ke, n, e, ki);
  }
  manyInternalRecord(e, n) {
    ht.call(this, H, n, e);
  }
  manySepFirstInternalRecord(e, n) {
    ht.call(this, Ae, n, e, ki);
  }
  orInternalRecord(e, n) {
    return Qd.call(this, e, n);
  }
  subruleInternalRecord(e, n, r) {
    if (Zt(n), !e || S(e, "ruleName") === !1) {
      const a = new Error(`<SUBRULE${xi(n)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw a.KNOWN_RECORDER_ERROR = !0, a;
    }
    const i = rt(this.recordingProdStack), s = e.ruleName, o = new ie({
      idx: n,
      nonTerminalName: s,
      label: r?.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    return i.definition.push(o), this.outputCst ? qd : En;
  }
  consumeInternalRecord(e, n, r) {
    if (Zt(n), !vs(e)) {
      const o = new Error(`<CONSUME${xi(n)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw o.KNOWN_RECORDER_ERROR = !0, o;
    }
    const i = rt(this.recordingProdStack), s = new F({
      idx: n,
      terminalType: e,
      label: r?.LABEL
    });
    return i.definition.push(s), Vs;
  }
}
function ht(t, e, n, r = !1) {
  Zt(n);
  const i = rt(this.recordingProdStack), s = Ue(e) ? e : e.DEF, o = new t({ definition: [], idx: n });
  return r && (o.separator = e.SEP), S(e, "MAX_LOOKAHEAD") && (o.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(o), s.call(this), i.definition.push(o), this.recordingProdStack.pop(), En;
}
function Qd(t, e) {
  Zt(e);
  const n = rt(this.recordingProdStack), r = x(t) === !1, i = r === !1 ? t : t.DEF, s = new _e({
    definition: [],
    idx: e,
    ignoreAmbiguities: r && t.IGNORE_AMBIGUITIES === !0
  });
  S(t, "MAX_LOOKAHEAD") && (s.maxLookahead = t.MAX_LOOKAHEAD);
  const o = ls(i, (a) => Ue(a.GATE));
  return s.hasPredicates = o, n.definition.push(s), N(i, (a) => {
    const c = new ee({ definition: [] });
    s.definition.push(c), S(a, "IGNORE_AMBIGUITIES") ? c.ignoreAmbiguities = a.IGNORE_AMBIGUITIES : S(a, "GATE") && (c.ignoreAmbiguities = !0), this.recordingProdStack.push(c), a.ALT.call(this), this.recordingProdStack.pop();
  }), En;
}
function xi(t) {
  return t === 0 ? "" : `${t}`;
}
function Zt(t) {
  if (t < 0 || t > bi) {
    const e = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${bi + 1}`
    );
    throw e.KNOWN_RECORDER_ERROR = !0, e;
  }
}
class Jd {
  initPerformanceTracer(e) {
    if (S(e, "traceInitPerf")) {
      const n = e.traceInitPerf, r = typeof n == "number";
      this.traceInitMaxIdent = r ? n : 1 / 0, this.traceInitPerf = r ? n > 0 : n;
    } else
      this.traceInitMaxIdent = 0, this.traceInitPerf = we.traceInitPerf;
    this.traceInitIndent = -1;
  }
  TRACE_INIT(e, n) {
    if (this.traceInitPerf === !0) {
      this.traceInitIndent++;
      const r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(`${r}--> <${e}>`);
      const { time: i, value: s } = fs(n), o = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && o(`${r}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, s;
    } else
      return n();
  }
}
function ep(t, e) {
  e.forEach((n) => {
    const r = n.prototype;
    Object.getOwnPropertyNames(r).forEach((i) => {
      if (i === "constructor")
        return;
      const s = Object.getOwnPropertyDescriptor(r, i);
      s && (s.get || s.set) ? Object.defineProperty(t.prototype, i, s) : t.prototype[i] = n.prototype[i];
    });
  });
}
const Qt = Tr(Ye, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(Qt);
const we = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 3,
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: Os,
  nodeLocationTracking: "none",
  traceInitPerf: !1,
  skipValidations: !1
}), Jt = Object.freeze({
  recoveryValueFunc: () => {
  },
  resyncEnabled: !0
});
var q;
(function(t) {
  t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", t[t.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(q || (q = {}));
class Lt {
  /**
   *  @deprecated use the **instance** method with the same name instead
   */
  static performSelfAnalysis(e) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }
  performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let e;
      this.selfAnalysisDone = !0;
      const n = this.className;
      this.TRACE_INIT("toFastProps", () => {
        ds(this);
      }), this.TRACE_INIT("Grammar Recording", () => {
        try {
          this.enableRecording(), N(this.definedRulesNames, (i) => {
            const s = this[i].originalGrammarAction;
            let o;
            this.TRACE_INIT(`${i} Rule`, () => {
              o = this.topLevelRuleRecord(i, s);
            }), this.gastProductionsCache[i] = o;
          });
        } finally {
          this.disableRecording();
        }
      });
      let r = [];
      if (this.TRACE_INIT("Grammar Resolving", () => {
        r = Rd({
          rules: K(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(r);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (D(r) && this.skipValidations === !1) {
          const i = Od({
            rules: K(this.gastProductionsCache),
            tokenTypes: K(this.tokensMap),
            errMsgProvider: He,
            grammarName: n
          }), s = cd({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: K(this.gastProductionsCache),
            tokenTypes: K(this.tokensMap),
            grammarName: n
          });
          this.definitionErrors = this.definitionErrors.concat(i, s);
        }
      }), D(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const i = ef(K(this.gastProductionsCache));
        this.resyncFollows = i;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var i, s;
        (s = (i = this.lookaheadStrategy).initialize) === null || s === void 0 || s.call(i, {
          rules: K(this.gastProductionsCache)
        }), this.preComputeLookaheadFunctions(K(this.gastProductionsCache));
      })), !Lt.DEFER_DEFINITION_ERRORS_HANDLING && !D(this.definitionErrors))
        throw e = v(this.definitionErrors, (i) => i.message), new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`);
    });
  }
  constructor(e, n) {
    this.definitionErrors = [], this.selfAnalysisDone = !1;
    const r = this;
    if (r.initErrorHandler(n), r.initLexerAdapter(), r.initLooksAhead(n), r.initRecognizerEngine(e, n), r.initRecoverable(n), r.initTreeBuilder(n), r.initContentAssist(), r.initGastRecorder(n), r.initPerformanceTracer(n), S(n, "ignoredIssues"))
      throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
    this.skipValidations = S(n, "skipValidations") ? n.skipValidations : we.skipValidations;
  }
}
Lt.DEFER_DEFINITION_ERRORS_HANDLING = !1;
ep(Lt, [
  Cd,
  Md,
  Kd,
  Hd,
  zd,
  Wd,
  Yd,
  Xd,
  Zd,
  Jd
]);
class tp extends Lt {
  constructor(e, n = we) {
    const r = z(n);
    r.outputCst = !0, super(e, r);
  }
}
const Ks = P({
  name: "HTML_COMMENT",
  pattern: /<!--[\s\S]*?-->/,
  line_breaks: !0
}), Hs = P({
  name: "HTML_CONDITIONAL_COMMENT",
  pattern: /<!\[[\s\S]*?\]>/,
  line_breaks: !0
}), np = P({
  name: "XML",
  pattern: /<\?xml(?:.|\s)*?\?>/
}), Ws = P({
  name: "CDATA",
  pattern: /<!\[CDATA\[[\s\S]*?]]>/
}), zs = P({
  name: "DTD",
  pattern: /<!.*?>/
}), Ys = P({
  name: "SCRIPTLET",
  pattern: /<%(.*?)%>|<\?(.*?)\?>/
}), rp = P({
  name: "SEA_WS",
  pattern: /[ \t]+/,
  group: X.SKIPPED
}), Xs = P({
  name: "LINE_BREAK",
  pattern: /\r?\n/
}), qs = P({
  name: "SCRIPT_OPEN",
  pattern: /<script\b[^>]*>/,
  push_mode: "SCRIPT"
}), Zs = P({
  name: "STYLE_OPEN",
  pattern: /<style\b[^>]*>/,
  push_mode: "STYLE"
}), Kn = P({
  name: "TAG_OPEN",
  pattern: /</,
  push_mode: "TAG"
}), Qs = P({
  name: "HTML_TEXT",
  pattern: /[^<@]+/,
  line_breaks: !0
}), Hn = P({
  name: "TAG_CLOSE",
  pattern: />/,
  pop_mode: !0
}), Js = P({
  name: "TAG_SLASH_CLOSE",
  pattern: /\/>/,
  pop_mode: !0
}), eo = P({
  name: "TAG_SLASH",
  pattern: /\//
}), to = P({
  name: "TAG_EQUALS",
  pattern: /=/,
  push_mode: "ATTVALUE"
}), Bt = P({
  name: "TAG_NAME",
  pattern: /[:@a-zA-Z\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:\.\-@\u00B7\u0300-\u036F\u203F-\u2040.0-9a-zA-Z]*/
}), ip = P({
  name: "TAG_WHITESPACE",
  pattern: /[ \t\r\n]+/,
  group: X.SKIPPED
}), no = P({
  name: "SCRIPT_BODY",
  pattern: /[\s\S]*?<\/script>/,
  pop_mode: !0
}), ro = P({
  name: "STYLE_BODY",
  pattern: /[\s\S]*?<\/style>/,
  pop_mode: !0
}), io = P({
  name: "ATTVALUE_VALUE",
  pattern: / *("[^<"]*"|'[^<']*'|[-_./+,?=:#;0-9a-zA-Z]+ ?|#[0-9a-fA-F]+|[0-9]+%?)/,
  pop_mode: !0
}), Wn = P({
  name: "EDGE_COMMENT",
  pattern: /{{--[\s\S]*?--}}/,
  line_breaks: !0
}), zn = P({
  name: "EDGE_MUSTACHE",
  pattern: /{{[\s\S]*?}}\s*/
}), Yn = P({
  name: "EDGE_SAFE_MUSTACHE",
  pattern: /{{{[\s\S]*?}}}\s*/
}), so = P({
  name: "EDGE_ESCAPED_MUSTACHE",
  pattern: /@{{[\s\S]*?}}\s*/
}), oo = P({
  name: "EDGE_TAG",
  pattern: /@(?:!?\w+(?:\.\w+)*)\s*(?:\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\))?~?/
}), ao = P({
  name: "EDGE_TAG_PROP",
  pattern: /@(if|elseif|else|each|flashMessage)\([^)]*\)\s*([\s\S]*?)@end/
}), Xn = {
  defaultMode: "default",
  modes: {
    default: [
      Ks,
      Hs,
      np,
      Ws,
      zs,
      Ys,
      Xs,
      rp,
      qs,
      Zs,
      Kn,
      Wn,
      so,
      Yn,
      zn,
      oo,
      Qs
    ],
    TAG: [
      Hn,
      Js,
      eo,
      to,
      Wn,
      Yn,
      zn,
      ao,
      Bt,
      ip
    ],
    SCRIPT: [no],
    STYLE: [ro],
    ATTVALUE: [io]
  }
}, sp = () => {
  const t = [];
  for (const e in Xn.modes)
    t.push(...Xn.modes[e]);
  return t;
}, op = new X(Xn);
class co extends tp {
  constructor() {
    super(sp());
    const e = this;
    e.RULE("document", () => {
      e.MANY(() => {
        e.SUBRULE(e.content);
      });
    }), e.RULE("content", () => {
      e.OR([
        { ALT: () => e.CONSUME(Qs) },
        { ALT: () => e.CONSUME(Xs) },
        { ALT: () => e.SUBRULE(e.element) },
        { ALT: () => e.SUBRULE(e.scriptlet) },
        { ALT: () => e.SUBRULE(e.htmlComment) },
        { ALT: () => e.SUBRULE(e.htmlConditionalComment) },
        { ALT: () => e.SUBRULE(e.cdata) },
        { ALT: () => e.SUBRULE(e.dtd) },
        { ALT: () => e.SUBRULE(e.scriptElement) },
        { ALT: () => e.SUBRULE(e.styleElement) },
        { ALT: () => e.SUBRULE(e.edgeComment) },
        { ALT: () => e.SUBRULE(e.edgeSafeMustache) },
        { ALT: () => e.SUBRULE(e.edgeMustache) },
        { ALT: () => e.SUBRULE(e.edgeEscapedMustache) },
        { ALT: () => e.SUBRULE(e.edgeTag) }
      ]);
    }), e.RULE("element", () => {
      e.OR([
        {
          ALT: () => e.SUBRULE(e.openingTag)
        },
        {
          ALT: () => e.SUBRULE(e.closingTag)
        }
      ]);
    }), e.RULE("openingTag", () => {
      e.CONSUME(Kn), e.CONSUME(Bt), e.MANY(() => {
        e.OR([
          { ALT: () => e.SUBRULE(e.edgeTagProp) },
          { ALT: () => e.SUBRULE(e.attribute) },
          { ALT: () => e.SUBRULE(e.edgeSafeMustache) },
          { ALT: () => e.SUBRULE(e.edgeMustache) },
          { ALT: () => e.SUBRULE(e.edgeComment) }
        ]);
      }), e.OR1([
        { ALT: () => e.CONSUME1(Js) },
        { ALT: () => e.CONSUME1(Hn) }
      ]);
    }), e.RULE("attribute", () => {
      e.CONSUME(Bt), e.OPTION(() => {
        e.CONSUME(to), e.CONSUME(io);
      });
    }), e.RULE("closingTag", () => {
      e.CONSUME(Kn), e.CONSUME(eo), e.CONSUME(Bt), e.CONSUME(Hn);
    }), e.RULE("scriptlet", () => {
      e.CONSUME(Ys);
    }), e.RULE("htmlComment", () => {
      e.CONSUME(Ks);
    }), e.RULE("htmlConditionalComment", () => {
      e.CONSUME(Hs);
    }), e.RULE("cdata", () => {
      e.CONSUME(Ws);
    }), e.RULE("dtd", () => {
      e.CONSUME(zs);
    }), e.RULE("scriptElement", () => {
      e.CONSUME(qs), e.CONSUME(no);
    }), e.RULE("styleElement", () => {
      e.CONSUME(Zs), e.CONSUME(ro);
    }), e.RULE("edgeComment", () => {
      e.CONSUME(Wn);
    }), e.RULE("edgeMustache", () => {
      e.CONSUME(zn);
    }), e.RULE("edgeSafeMustache", () => {
      e.CONSUME(Yn);
    }), e.RULE("edgeEscapedMustache", () => {
      e.CONSUME(so);
    }), e.RULE("edgeTag", () => {
      e.CONSUME(oo);
    }), e.RULE("edgeTagProp", () => {
      e.CONSUME(ao);
    }), this.performSelfAnalysis();
  }
}
const ap = new co(), cp = ap.getBaseCstVisitorConstructor();
class up extends cp {
  #t = /* @__PURE__ */ new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
    // Below are for SVGs
    "animateMotion",
    "animateTransform",
    "animate",
    "circle",
    "ellipse",
    "feGaussianBlur",
    "feDropShadow",
    "feOffset",
    "feBlend",
    "feColorMatrix",
    "feComposite",
    "feDisplacementMap",
    "feFlood",
    "feImage",
    "feMergeNode",
    "feMorphology",
    "fePointLight",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "image",
    "line",
    "mpath",
    "path",
    "polygon",
    "polyline",
    "rect",
    "set",
    "stop",
    "use",
    "view"
  ]);
  constructor() {
    super(), this.validateVisitor();
  }
  #e(e) {
    return this.#t.has(e);
  }
  document(e) {
    const n = e.content[0].startOffset, r = e.content[e.content.length - 1].endOffset;
    return {
      type: "document",
      children: e.content.map((i) => this.visit(i)),
      start: n,
      end: r
    };
  }
  content(e) {
    if (e.HTML_TEXT)
      return {
        type: "htmlText",
        value: e.HTML_TEXT[0].image,
        start: e.HTML_TEXT[0].startOffset,
        end: e.HTML_TEXT[0].endOffset
      };
    if (e.LINE_BREAK)
      return {
        type: "linebreak",
        value: e.LINE_BREAK[0].image,
        start: e.LINE_BREAK[0].startOffset,
        end: e.LINE_BREAK[0].endOffset
      };
    const n = e.element || e.scriptlet || e.htmlComment || e.htmlConditionalComment || e.cdata || e.dtd || e.scriptElement || e.styleElement || e.edgeComment || e.edgeMustache || e.edgeSafeMustache || e.edgeEscapedMustache || e.edgeTag || e.htmlText;
    return this.visit(n);
  }
  element(e) {
    return e.openingTag ? this.visit(e.openingTag) : e.selfClosingTag ? this.visit(e.selfClosingTag) : this.visit(e.closingTag);
  }
  openingTag(e) {
    const n = e.TAG_NAME[0].image, r = e.edgeSafeMustache ? e.edgeSafeMustache.map((l) => this.visit(l)) : [], i = e.edgeMustache ? e.edgeMustache.map((l) => this.visit(l)) : [], s = e.edgeTagProp ? e.edgeTagProp.map((l) => this.visit(l)) : [], o = e.attribute ? e.attribute.map((l) => this.visit(l)) : [], a = e.edgeComment ? e.edgeComment.map((l) => this.visit(l)) : [], c = e.TAG_NAME[0].startOffset, u = e.TAG_NAME[0].endOffset;
    return this.#e(n) || e.TAG_SLASH_CLOSE ? {
      type: "voidTag",
      tagName: n,
      edgeSafeMustaches: r,
      edgeMustaches: i,
      edgeTagProps: s,
      attributes: o,
      comments: a,
      start: c,
      end: u
    } : {
      type: "openingTag",
      tagName: n,
      edgeSafeMustaches: r,
      edgeMustaches: i,
      edgeTagProps: s,
      attributes: o,
      comments: a,
      start: c,
      end: u
    };
  }
  attribute(e) {
    const n = e.TAG_NAME[0].image, r = e.ATTVALUE_VALUE?.[0]?.image?.trim(), i = e.TAG_NAME[0].startOffset, s = e.ATTVALUE_VALUE ? e.ATTVALUE_VALUE[0].endOffset : e.TAG_NAME[0].endOffset;
    return { type: "attribute", attributeName: n, attributeValue: r, start: i, end: s };
  }
  closingTag(e) {
    const n = e.TAG_NAME[0].image, r = e.TAG_OPEN[0].startOffset, i = e.TAG_CLOSE[0].endOffset;
    return this.#e(n) ? {
      type: "doNotPrint"
    } : { type: "closingTag", tagName: n, start: r, end: i };
  }
  scriptlet(e) {
    const n = e.SCRIPTLET[0].image, r = e.SCRIPTLET[0].startOffset, i = e.SCRIPTLET[0].endOffset;
    return { type: "scriptlet", value: n, start: r, end: i };
  }
  htmlComment(e) {
    const n = e.HTML_COMMENT[0].image, r = e.HTML_COMMENT[0].startOffset, i = e.HTML_COMMENT[0].endOffset;
    return { type: "htmlComment", value: n, start: r, end: i };
  }
  htmlConditionalComment(e) {
    const n = e.HTML_CONDITIONAL_COMMENT[0].image, r = e.HTML_CONDITIONAL_COMMENT[0].startOffset, i = e.HTML_CONDITIONAL_COMMENT[0].endOffset;
    return { type: "htmlConditionalComment", value: n, start: r, end: i };
  }
  cdata(e) {
    const n = e.CDATA[0].image, r = e.CDATA[0].startOffset, i = e.CDATA[0].endOffset;
    return { type: "cdata", value: n, start: r, end: i };
  }
  dtd(e) {
    const n = e.DTD[0].image, r = e.DTD[0].startOffset, i = e.DTD[0].endOffset;
    return { type: "dtd", value: n, start: r, end: i };
  }
  scriptElement(e) {
    const n = e.SCRIPT_OPEN[0].image + e.SCRIPT_BODY[0].image, r = e.SCRIPT_OPEN[0].startOffset, i = e.SCRIPT_BODY[0].endOffset;
    return { type: "scriptElement", value: n, start: r, end: i };
  }
  styleElement(e) {
    const n = e.STYLE_OPEN[0].image + e.STYLE_BODY[0].image, r = e.STYLE_OPEN[0].startOffset, i = e.STYLE_BODY[0].endOffset;
    return { type: "styleElement", value: n, start: r, end: i };
  }
  edgeComment(e) {
    const n = e.EDGE_COMMENT[0].image, r = e.EDGE_COMMENT[0].startOffset, i = e.EDGE_COMMENT[0].endOffset;
    return { type: "edgeComment", value: n, start: r, end: i };
  }
  edgeMustache(e) {
    const n = e.EDGE_MUSTACHE[0].image, r = e.EDGE_MUSTACHE[0].startOffset, i = e.EDGE_MUSTACHE[0].endOffset;
    return { type: "edgeMustache", value: n, start: r, end: i };
  }
  edgeSafeMustache(e) {
    const n = e.EDGE_SAFE_MUSTACHE[0].image, r = e.EDGE_SAFE_MUSTACHE[0].startOffset, i = e.EDGE_SAFE_MUSTACHE[0].endOffset;
    return { type: "edgeSafeMustache", value: n, start: r, end: i };
  }
  edgeEscapedMustache(e) {
    const n = e.EDGE_ESCAPED_MUSTACHE[0].image, r = e.EDGE_ESCAPED_MUSTACHE[0].startOffset, i = e.EDGE_ESCAPED_MUSTACHE[0].endOffset;
    return { type: "edgeEscapedMustache", value: n, start: r, end: i };
  }
  edgeTag(e) {
    const n = e.EDGE_TAG[0].image, r = e.EDGE_TAG[0].startOffset, i = e.EDGE_TAG[0].endOffset;
    return { type: "edgeTag", value: n, start: r, end: i };
  }
  edgeTagProp(e) {
    const n = e.EDGE_TAG_PROP[0].image, r = e.EDGE_TAG_PROP[0].startOffset, i = e.EDGE_TAG_PROP[0].endOffset;
    return { type: "edgeTagProp", value: n, start: r, end: i };
  }
}
const wt = new co(), lp = new up();
function vr(t) {
  const e = op.tokenize(t);
  wt.input = e.tokens;
  const n = wt.document();
  if (wt.errors.length > 0)
    throw new Error(
      `Parsing Errors Detected: ${JSON.stringify(wt.errors)}`
    );
  return lp.visit(n);
}
class hp extends Error {
  reason;
  filename;
  line;
  column;
  source;
  constructor(e, n, r, i, s) {
    super(`${e}:${r}:${i}: ${n}`), this.reason = n, this.filename = e, this.line = r, this.column = i, this.source = s;
  }
}
class fp {
  start;
  end;
  source;
  constructor(e, n, r) {
    this.start = e, this.end = n, this.source = r;
  }
}
var b;
(function(t) {
  t.stylesheet = "stylesheet", t.rule = "rule", t.declaration = "declaration", t.comment = "comment", t.container = "container", t.charset = "charset", t.document = "document", t.customMedia = "custom-media", t.fontFace = "font-face", t.host = "host", t.import = "import", t.keyframes = "keyframes", t.keyframe = "keyframe", t.layer = "layer", t.media = "media", t.namespace = "namespace", t.page = "page", t.startingStyle = "starting-style", t.supports = "supports";
})(b || (b = {}));
const Mi = (t, e, n) => {
  let r = n, i = 1e4;
  do {
    const s = e.map((c) => t.indexOf(c, r));
    s.push(t.indexOf("\\", r));
    const o = s.filter((c) => c !== -1);
    if (o.length === 0) return -1;
    const a = Math.min(...o);
    if (t[a] !== "\\") return a;
    r = a + 2, i--;
  } while (i > 0);
  throw new Error("Too many escaping");
}, qn = (t, e, n) => {
  let r = n, i = 1e4;
  do {
    const s = e.map((c) => t.indexOf(c, r));
    s.push(t.indexOf("(", r)), s.push(t.indexOf('"', r)), s.push(t.indexOf("'", r)), s.push(t.indexOf("\\", r));
    const o = s.filter((c) => c !== -1);
    if (o.length === 0) return -1;
    const a = Math.min(...o);
    switch (t[a]) {
      case "\\":
        r = a + 2;
        break;
      case "(":
        {
          const c = qn(t, [")"], a + 1);
          if (c === -1) return -1;
          r = c + 1;
        }
        break;
      case '"':
        {
          const c = Mi(t, ['"'], a + 1);
          if (c === -1) return -1;
          r = c + 1;
        }
        break;
      case "'":
        {
          const c = Mi(t, ["'"], a + 1);
          if (c === -1) return -1;
          r = c + 1;
        }
        break;
      default:
        return a;
    }
    i--;
  } while (i > 0);
  throw new Error("Too many escaping");
}, Nn = /\/\*[^]*?(?:\*\/|$)/g;
function oe(t) {
  return t ? t.trim() : "";
}
function Zn(t, e) {
  const n = t && typeof t.type == "string", r = n ? t : e;
  for (const i in t) {
    const s = t[i];
    Array.isArray(s) ? s.forEach((o) => {
      Zn(o, r);
    }) : s && typeof s == "object" && Zn(s, r);
  }
  return n && Object.defineProperty(t, "parent", { configurable: !0, writable: !0, enumerable: !1, value: e || null }), t;
}
class dp {
  level = 0;
  indentation = "  ";
  compress = !1;
  constructor(e) {
    typeof e?.indent == "string" && (this.indentation = e?.indent), e?.compress && (this.compress = !0);
  }
  emit(e, n) {
    return e;
  }
  indent(e) {
    return this.level = this.level || 1, e ? (this.level += e, "") : Array(this.level).join(this.indentation);
  }
  visit(e) {
    switch (e.type) {
      case b.stylesheet:
        return this.stylesheet(e);
      case b.rule:
        return this.rule(e);
      case b.declaration:
        return this.declaration(e);
      case b.comment:
        return this.comment(e);
      case b.container:
        return this.container(e);
      case b.charset:
        return this.charset(e);
      case b.document:
        return this.document(e);
      case b.customMedia:
        return this.customMedia(e);
      case b.fontFace:
        return this.fontFace(e);
      case b.host:
        return this.host(e);
      case b.import:
        return this.import(e);
      case b.keyframes:
        return this.keyframes(e);
      case b.keyframe:
        return this.keyframe(e);
      case b.layer:
        return this.layer(e);
      case b.media:
        return this.media(e);
      case b.namespace:
        return this.namespace(e);
      case b.page:
        return this.page(e);
      case b.startingStyle:
        return this.startingStyle(e);
      case b.supports:
        return this.supports(e);
    }
  }
  mapVisit(e, n) {
    let r = "";
    n = n || "";
    for (let i = 0, s = e.length; i < s; i++) r += this.visit(e[i]), n && i < s - 1 && (r += this.emit(n));
    return r;
  }
  compile(e) {
    return this.compress ? e.stylesheet.rules.map(this.visit, this).join("") : this.stylesheet(e);
  }
  stylesheet(e) {
    return this.mapVisit(e.stylesheet.rules, `

`);
  }
  comment(e) {
    return this.compress ? this.emit("", e.position) : this.emit(`${this.indent()}/*${e.comment}*/`, e.position);
  }
  container(e) {
    return this.compress ? this.emit(`@container ${e.container}`, e.position) + this.emit("{") + this.mapVisit(e.rules) + this.emit("}") : this.emit(`${this.indent()}@container ${e.container}`, e.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(e.rules, `

`) + this.emit(`
${this.indent(-1)}${this.indent()}}`);
  }
  layer(e) {
    return this.compress ? this.emit(`@layer ${e.layer}`, e.position) + (e.rules ? this.emit("{") + this.mapVisit(e.rules) + this.emit("}") : ";") : this.emit(`${this.indent()}@layer ${e.layer}`, e.position) + (e.rules ? this.emit(` {
${this.indent(1)}`) + this.mapVisit(e.rules, `

`) + this.emit(`
${this.indent(-1)}${this.indent()}}`) : ";");
  }
  import(e) {
    return this.emit(`@import ${e.import};`, e.position);
  }
  media(e) {
    return this.compress ? this.emit(`@media ${e.media}`, e.position) + this.emit("{") + this.mapVisit(e.rules) + this.emit("}") : this.emit(`${this.indent()}@media ${e.media}`, e.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(e.rules, `

`) + this.emit(`
${this.indent(-1)}${this.indent()}}`);
  }
  document(e) {
    const n = `@${e.vendor || ""}document ${e.document}`;
    return this.compress ? this.emit(n, e.position) + this.emit("{") + this.mapVisit(e.rules) + this.emit("}") : this.emit(n, e.position) + this.emit(`  {
${this.indent(1)}`) + this.mapVisit(e.rules, `

`) + this.emit(`${this.indent(-1)}
}`);
  }
  charset(e) {
    return this.emit(`@charset ${e.charset};`, e.position);
  }
  namespace(e) {
    return this.emit(`@namespace ${e.namespace};`, e.position);
  }
  startingStyle(e) {
    return this.compress ? this.emit("@starting-style", e.position) + this.emit("{") + this.mapVisit(e.rules) + this.emit("}") : this.emit(`${this.indent()}@starting-style`, e.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(e.rules, `

`) + this.emit(`
${this.indent(-1)}${this.indent()}}`);
  }
  supports(e) {
    return this.compress ? this.emit(`@supports ${e.supports}`, e.position) + this.emit("{") + this.mapVisit(e.rules) + this.emit("}") : this.emit(`${this.indent()}@supports ${e.supports}`, e.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(e.rules, `

`) + this.emit(`
${this.indent(-1)}${this.indent()}}`);
  }
  keyframes(e) {
    return this.compress ? this.emit(`@${e.vendor || ""}keyframes ${e.name}`, e.position) + this.emit("{") + this.mapVisit(e.keyframes) + this.emit("}") : this.emit(`@${e.vendor || ""}keyframes ${e.name}`, e.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(e.keyframes, `
`) + this.emit(`${this.indent(-1)}}`);
  }
  keyframe(e) {
    const n = e.declarations;
    return this.compress ? this.emit(e.values.join(","), e.position) + this.emit("{") + this.mapVisit(n) + this.emit("}") : this.emit(this.indent()) + this.emit(e.values.join(", "), e.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(n, `
`) + this.emit(`${this.indent(-1)}
${this.indent()}}
`);
  }
  page(e) {
    if (this.compress) {
      const r = e.selectors.length ? e.selectors.join(", ") : "";
      return this.emit(`@page ${r}`, e.position) + this.emit("{") + this.mapVisit(e.declarations) + this.emit("}");
    }
    const n = e.selectors.length ? `${e.selectors.join(", ")} ` : "";
    return this.emit(`@page ${n}`, e.position) + this.emit(`{
`) + this.emit(this.indent(1)) + this.mapVisit(e.declarations, `
`) + this.emit(this.indent(-1)) + this.emit(`
}`);
  }
  fontFace(e) {
    return this.compress ? this.emit("@font-face", e.position) + this.emit("{") + this.mapVisit(e.declarations) + this.emit("}") : this.emit("@font-face ", e.position) + this.emit(`{
`) + this.emit(this.indent(1)) + this.mapVisit(e.declarations, `
`) + this.emit(this.indent(-1)) + this.emit(`
}`);
  }
  host(e) {
    return this.compress ? this.emit("@host", e.position) + this.emit("{") + this.mapVisit(e.rules) + this.emit("}") : this.emit("@host", e.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(e.rules, `

`) + this.emit(`${this.indent(-1)}
}`);
  }
  customMedia(e) {
    return this.emit(`@custom-media ${e.name} ${e.media};`, e.position);
  }
  rule(e) {
    const n = e.declarations;
    if (!n.length) return "";
    if (this.compress) return this.emit(e.selectors.join(","), e.position) + this.emit("{") + this.mapVisit(n) + this.emit("}");
    const r = this.indent();
    return this.emit(e.selectors.map((i) => r + i).join(`,
`), e.position) + this.emit(` {
`) + this.emit(this.indent(1)) + this.mapVisit(n, `
`) + this.emit(this.indent(-1)) + this.emit(`
${this.indent()}}`);
  }
  declaration(e) {
    return this.compress ? this.emit(`${e.property}:${e.value}`, e.position) + this.emit(";") : e.property === "grid-template-areas" ? this.emit(this.indent()) + this.emit(e.property + ": " + e.value.split(`
`).join(`
`.padEnd(22) + this.indent()), e.position) + this.emit(";") : this.emit(this.indent()) + this.emit(`${e.property}: ${e.value}`, e.position) + this.emit(";");
  }
}
const pp = (t, e) => {
  e = e || {};
  let n = 1, r = 1;
  function i() {
    const m = { line: n, column: r };
    return (d) => (d.position = new fp(m, { line: n, column: r }, e?.source || ""), h(), d);
  }
  const s = [];
  function o(m) {
    const d = new hp(e?.source || "", m, n, r, t);
    if (!e?.silent) throw d;
    s.push(d);
  }
  function a() {
    const m = /^{\s*/.exec(t);
    return !!m && (l(m), !0);
  }
  function c() {
    const m = /^}/.exec(t);
    return !!m && (l(m), !0);
  }
  function u() {
    let m;
    const d = [];
    for (h(), f(d); t.length && t.charAt(0) !== "}" && (m = C() || w(), m); ) d.push(m), f(d);
    return d;
  }
  function l(m) {
    const d = m[0];
    return function(O) {
      const k = O.match(/\n/g);
      k && (n += k.length);
      const M = O.lastIndexOf(`
`);
      r = ~M ? O.length - M : r + O.length;
    }(d), t = t.slice(d.length), m;
  }
  function h() {
    const m = /^\s*/.exec(t);
    m && l(m);
  }
  function f(m) {
    m = m || [];
    let d = _();
    for (; d; ) m.push(d), d = _();
    return m;
  }
  function _() {
    const m = i();
    if (t.charAt(0) !== "/" || t.charAt(1) !== "*") return;
    const d = /^\/\*[^]*?\*\//.exec(t);
    return d ? (l(d), m({ type: b.comment, comment: d[0].slice(2, -2) })) : o("End of comment missing");
  }
  function E() {
    const m = /^([^{]+)/.exec(t);
    if (m)
      return l(m), ((d, O) => {
        const k = [];
        let M = 0;
        for (; M < d.length; ) {
          const B = qn(d, O, M);
          if (B === -1) return k.push(d.substring(M)), k;
          k.push(d.substring(M, B)), M = B + 1;
        }
        return k;
      })(oe(m[0]).replace(Nn, ""), [","]).map((d) => oe(d));
  }
  function y() {
    const m = i(), d = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/.exec(t);
    if (!d) return;
    l(d);
    const O = oe(d[0]), k = /^:\s*/.exec(t);
    if (!k) return o("property missing ':'");
    l(k);
    let M = "";
    const B = qn(t, [";", "}"]);
    B !== -1 && (M = t.substring(0, B), l([M]), M = oe(M).replace(Nn, ""));
    const ve = m({ type: b.declaration, property: O.replace(Nn, ""), value: M }), de = /^[;\s]*/.exec(t);
    return de && l(de), ve;
  }
  function R() {
    const m = [];
    if (!a()) return o("missing '{'");
    f(m);
    let d = y();
    for (; d; ) m.push(d), f(m), d = y();
    return c() ? m : o("missing '}'");
  }
  function g() {
    const m = [], d = i();
    let O = /^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/.exec(t);
    for (; O; ) {
      const k = l(O);
      m.push(k[1]);
      const M = /^,\s*/.exec(t);
      M && l(M), O = /^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/.exec(t);
    }
    if (m.length) return d({ type: b.keyframe, values: m, declarations: R() || [] });
  }
  const T = I("import"), p = I("charset"), A = I("namespace");
  function I(m) {
    const d = new RegExp("^@" + m + `\\s*((?::?[^;'"]|"(?:\\\\"|[^"])*?"|'(?:\\\\'|[^'])*?')+)(?:;|$)`);
    return () => {
      const O = i(), k = d.exec(t);
      if (!k) return;
      const M = l(k), B = { type: m };
      return B[m] = M[1].trim(), O(B);
    };
  }
  function C() {
    if (t[0] === "@") return function() {
      const m = i(), d = /^@([-\w]+)?keyframes\s*/.exec(t);
      if (!d) return;
      const O = l(d)[1], k = /^([-\w]+)\s*/.exec(t);
      if (!k) return o("@keyframes missing name");
      const M = l(k)[1];
      if (!a()) return o("@keyframes missing '{'");
      let B = f(), ve = g();
      for (; ve; ) B.push(ve), B = B.concat(f()), ve = g();
      return c() ? m({ type: b.keyframes, name: M, vendor: O, keyframes: B }) : o("@keyframes missing '}'");
    }() || function() {
      const m = i(), d = /^@media *([^{]+)/.exec(t);
      if (!d) return;
      const O = oe(l(d)[1]);
      if (!a()) return o("@media missing '{'");
      const k = f().concat(u());
      return c() ? m({ type: b.media, media: O, rules: k }) : o("@media missing '}'");
    }() || function() {
      const m = i(), d = /^@custom-media\s+(--\S+)\s+([^{;\s][^{;]*);/.exec(t);
      if (!d) return;
      const O = l(d);
      return m({ type: b.customMedia, name: oe(O[1]), media: oe(O[2]) });
    }() || function() {
      const m = i(), d = /^@supports *([^{]+)/.exec(t);
      if (!d) return;
      const O = oe(l(d)[1]);
      if (!a()) return o("@supports missing '{'");
      const k = f().concat(u());
      return c() ? m({ type: b.supports, supports: O, rules: k }) : o("@supports missing '}'");
    }() || T() || p() || A() || function() {
      const m = i(), d = /^@([-\w]+)?document *([^{]+)/.exec(t);
      if (!d) return;
      const O = l(d), k = oe(O[1]), M = oe(O[2]);
      if (!a()) return o("@document missing '{'");
      const B = f().concat(u());
      return c() ? m({ type: b.document, document: M, vendor: k, rules: B }) : o("@document missing '}'");
    }() || function() {
      const m = i(), d = /^@page */.exec(t);
      if (!d) return;
      l(d);
      const O = E() || [];
      if (!a()) return o("@page missing '{'");
      let k = f(), M = y();
      for (; M; ) k.push(M), k = k.concat(f()), M = y();
      return c() ? m({ type: b.page, selectors: O, declarations: k }) : o("@page missing '}'");
    }() || function() {
      const m = i(), d = /^@host\s*/.exec(t);
      if (!d) return;
      if (l(d), !a()) return o("@host missing '{'");
      const O = f().concat(u());
      return c() ? m({ type: b.host, rules: O }) : o("@host missing '}'");
    }() || function() {
      const m = i(), d = /^@font-face\s*/.exec(t);
      if (!d) return;
      if (l(d), !a()) return o("@font-face missing '{'");
      let O = f(), k = y();
      for (; k; ) O.push(k), O = O.concat(f()), k = y();
      return c() ? m({ type: b.fontFace, declarations: O }) : o("@font-face missing '}'");
    }() || function() {
      const m = i(), d = /^@container *([^{]+)/.exec(t);
      if (!d) return;
      const O = oe(l(d)[1]);
      if (!a()) return o("@container missing '{'");
      const k = f().concat(u());
      return c() ? m({ type: b.container, container: O, rules: k }) : o("@container missing '}'");
    }() || function() {
      const m = i(), d = /^@starting-style\s*/.exec(t);
      if (!d) return;
      if (l(d), !a()) return o("@starting-style missing '{'");
      const O = f().concat(u());
      return c() ? m({ type: b.startingStyle, rules: O }) : o("@starting-style missing '}'");
    }() || function() {
      const m = i(), d = /^@layer *([^{;@]+)/.exec(t);
      if (!d) return;
      const O = oe(l(d)[1]);
      if (!a()) {
        const M = /^[;\s]*/.exec(t);
        return M && l(M), m({ type: b.layer, layer: O });
      }
      const k = f().concat(u());
      return c() ? m({ type: b.layer, layer: O, rules: k }) : o("@layer missing '}'");
    }();
  }
  function w() {
    const m = i(), d = E();
    return d ? (f(), m({ type: b.rule, selectors: d, declarations: R() || [] })) : o("selector missing");
  }
  return Zn(function() {
    const m = u();
    return { type: b.stylesheet, stylesheet: { source: e?.source, rules: m, parsingErrors: s } };
  }());
}, mp = (t, e) => new dp(e || {}).compile(t);
var Pi = { parse: pp, stringify: mp };
const gp = 2;
let Ln = 0;
const uo = [
  "assign",
  "!component",
  "debugger",
  "eval",
  "include",
  "includeIf",
  "inject",
  "stack",
  "svg",
  "let",
  "newError",
  "vite",
  "inertia",
  "dd",
  "dump",
  "markdown"
];
function lo(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ep(t) {
  return t.type !== "linebreak" ? (Ln = 0, !0) : (Ln++, Ln <= gp);
}
function Tp(t) {
  return t.replace(/{{--(?![\s\n\r\t])/g, "{{-- ").replace(new RegExp("(?<![\\s\\n\\r\\t])--}}", "g"), " --}}");
}
function Cn(t) {
  const e = /{{{[^{}]*}}}/g, n = "__TRIPLE_CURLY__", r = [];
  return t = t.replace(e, (i) => {
    const s = `${n}${r.length}`;
    return r.push(i), s;
  }), t = t.replace(/{{\s*/g, "{{ ").replace(/\s*}}/g, " }}"), r.forEach((i, s) => {
    t = t.replace(`${n}${s}`, i);
  }), t;
}
function kn(t) {
  return t.replace(/{{{\s*/g, "{{{ ").replace(/\s*}}}/g, " }}}");
}
function yp(t, e, n, r, i, s) {
  const o = /<style\b[^>]*>([\s\S]*?)<\/style>/gi, a = /{{.*?}}/g, c = /{{{.*?}}}/g, u = /@(?!media|keyframes|supports|font-face|viewport|counter-style|page|document|font-feature-values)(?:!?\w+(?:\.\w+)*)\s*(?:\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\))?[\s\S]*?@end/g, l = (i.customSingleLineEdgeTags ?? []).map((E) => E.startsWith("@") ? E.slice(1) : E), h = [...uo, ...l], f = new RegExp(
    `@(${h.map(lo).join("|")})\\s*(?:\\((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*\\))?`,
    "g"
  );
  return t.value.replace(o, (E, y) => {
    let R = [], g = 0;
    y = y.replace(
      c,
      (I) => {
        const C = `__SAFE_MUSTACHE_TAG_${g++}__;`;
        return R.push(I), C;
      }
    ), y = y.replace(
      a,
      (I) => {
        const C = `__MUSTACHE_TAG_${g++}__;`;
        return R.push(I), C;
      }
    ), y = y.replace(
      u,
      (I) => {
        const C = `/*__EDGE_TAG_BLOCK_${g++}__*/`;
        return R.push(I), C;
      }
    ), y = y.replace(
      f,
      (I) => {
        const C = `/*__SINGLE_EDGE_TAG_${g++}__*/`;
        return R.push(I), C;
      }
    );
    const T = Pi.parse(y), p = Pi.stringify(T, { indent: r });
    return `${e}<style>
${p.split(`
`).map((I) => `${n}${I}`).join(`
`)}
${e}</style>`.replace(/\/\*__EDGE_TAG_BLOCK_\d+__\*\//g, (I) => {
      const C = R[parseInt(I.match(/\d+/)[0], 10)], w = new vr(C);
      return new Rr(
        {
          ...i
        },
        s + 2
      ).handlePrint(w).trim();
    }).replace(/__MUSTACHE_TAG_\d+__;/g, (I) => R[parseInt(I.match(/\d+/)[0], 10)]).replace(/__SAFE_MUSTACHE_TAG_\d+__;/g, (I) => R[parseInt(I.match(/\d+/)[0], 10)]).replace(/\/\*__SINGLE_EDGE_TAG_\d+__\*\//g, (I) => R[parseInt(I.match(/\d+/)[0], 10)]);
  });
}
function Ap(t, e, n, r, i, s) {
  const o = /<script\b([^>]*)>([\s\S]*?)<\/script>/i, a = /{{.*?}}/g, c = /{{{.*?}}}/g, u = /@(!?\w+(?:\.\w+)*)\s*(?:\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\))?[\s\S]*?@end/g, l = (i.customSingleLineEdgeTags ?? []).map((C) => C.startsWith("@") ? C.slice(1) : C), h = [...uo, ...l], f = new RegExp(
    `@(${h.map(lo).join("|")})\\s*(?:\\((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*\\))?`,
    "g"
  ), _ = t.value.match(o);
  if (!_)
    throw new Error("Invalid <script> tag format");
  const [E, y, R] = _;
  let g = [], T = 0, p = R.replace(c, (C) => {
    const w = `__SAFE_MUSTACHE_TAG_${T++}__`;
    return g.push(C), w;
  }).replace(a, (C) => {
    const w = `__MUSTACHE_TAG_${T++}__`;
    return g.push(C), w;
  }).replace(u, (C) => {
    const w = `/*__EDGE_TAG_BLOCK_${T++}__*/`;
    return g.push(C), w;
  }).replace(f, (C) => {
    const w = `/*__SINGLE_EDGE_TAG_${T++}__*/`;
    return g.push(C), w;
  });
  const A = po.minify(
    {
      "file1.js": p
    },
    {
      compress: !1,
      keep_fnames: !0,
      mangle: !1,
      output: {
        beautify: !0,
        comments: "all",
        indent_level: e
      }
    }
  );
  if (A.error)
    throw new Error(JSON.stringify(A.error));
  const I = A.code.replace(/\/\*__EDGE_TAG_BLOCK_\d+__\*\//g, (C) => {
    const w = parseInt(C.match(/\d+/)[0], 10), m = g[w], d = new vr(m);
    return new Rr(
      {
        ...i
      },
      0
    ).handlePrint(d);
  }).replace(/\/\*__SINGLE_EDGE_TAG_\d+__\*\//g, (C) => {
    const w = parseInt(C.match(/\d+/)[0], 10);
    return g[w];
  }).replace(/__SAFE_MUSTACHE_TAG_\d+__/g, (C) => {
    const w = parseInt(C.match(/\d+/)[0], 10);
    return g[w];
  }).replace(/__MUSTACHE_TAG_\d+__/g, (C) => {
    const w = parseInt(C.match(/\d+/)[0], 10);
    return g[w];
  });
  return `${n}<script${y}>
${I.split(`
`).map(
    (C) => C.trim().length === 0 ? "" : `${r}${C}`
  ).join(`
`)}
${n}<\/script>`;
}
function ho(t) {
  const e = t.match(/^\s*/);
  return e ? e[0].length : 0;
}
function _p(t, e, n) {
  return `${e}${t.value.split(`
`).map((r, i) => {
    if (i === 0)
      return `${r.trim()}`;
    if (i === t.value.split(`
`).length - 1)
      return `${e}${r.trim()}`;
    const s = ho(r);
    return `${" ".repeat(Math.max(e.length, s))}${r.trim()}`;
  }).join(`
`).replace(/[^\S\r\n]+$/g, "")}${n ? `
` : ""}`;
}
class Rr {
  options;
  level;
  skipLevelOverride;
  useTabs;
  printWidth;
  tabWidth;
  singleAttributePerLine;
  inlineTags = /* @__PURE__ */ new Set([
    "a",
    "abbr",
    "acronym",
    "b",
    "bdi",
    "bdo",
    "big",
    "br",
    "button",
    "cite",
    "code",
    "data",
    "dfn",
    "em",
    "i",
    "img",
    "input",
    "kbd",
    "label",
    "mark",
    "meter",
    "q",
    "ruby",
    "rp",
    "rt",
    "s",
    "samp",
    "select",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "textarea",
    "time",
    "u",
    "var",
    "wbr",
    "feFuncR",
    "feFuncG",
    "feFuncB",
    "feFuncA"
  ]);
  constructor(e, n = void 0) {
    this.options = e, this.level = n ?? 0, this.skipLevelOverride = !!n, this.useTabs = e.useTabs ?? !1, this.printWidth = e.printWidth ?? 80, this.tabWidth = e.tabWidth ?? 4, this.singleAttributePerLine = e.singleAttributePerLine ?? !1;
  }
  isInlineTag(e) {
    return this.inlineTags.has(e);
  }
  getIndent(e, n = "none") {
    const r = e !== void 0 ? Math.max(e, 0) : this.level;
    return this.adjustIndentLevel(n), `${this.useTabs ? "	" : " ".repeat(this.tabWidth * r)}`;
  }
  adjustIndentLevel(e) {
    e === "increase" ? this.level++ : e === "decrease" && this.level--;
  }
  formatMultilineValue(e, n, r = !0) {
    return e.split(`
`).map((i, s, o) => {
      if (s === 0)
        return `${r ? n : ""}${i.trim()}`;
      if (s === o.length - 1) return `${n}${i.trim()}`;
      const a = ho(i);
      return `${" ".repeat(Math.max(n.length, a))}${i.trim()}`;
    }).join(`
`);
  }
  formatAttributes(e, n = "") {
    return e.map(
      (r) => r.attributeValue ? `${n}${r.attributeName}=${kn(Cn(r.attributeValue)).trim()}` : `${n}${r.attributeName.trim()}`
    ).join(n ? `
` : " ");
  }
  formatEdgeSafeMustacheProps(e, n = "") {
    return e.map(
      (r) => `${n}${kn(r.value).trim()}`
    ).join(n ? `
` : " ");
  }
  formatEdgeMustacheProps(e, n = "") {
    return e.map((r) => `${n}${Cn(r.value).trim()}`).join(n ? `
` : " ");
  }
  formatEdgeTagProps(e, n = "") {
    return e.map((r) => `${n}${r.value.trim()}`).join(n ? `
` : " ");
  }
  formatComments(e, n = "") {
    return e.map((r) => `${n}${r.value}`).join(n ? `
` : " ");
  }
  printDocumentNode(e) {
    return this.skipLevelOverride || (this.level = 0), e.children.filter(Ep).map(
      (n, r, i) => this.handlePrint(n, i[r - 1], i[r + 1])
    ).join("");
  }
  printDTDNode(e) {
    return `${this.getIndent()}${e.value}`;
  }
  printStandardNode(e) {
    const n = e.type === "scriptlet";
    return this.formatMultilineValue(
      e.value,
      n ? "" : this.getIndent()
    );
  }
  printScriptElementNode(e) {
    return Ap(
      e,
      this.tabWidth,
      this.getIndent(),
      this.getIndent(this.level + 1),
      this.options,
      this.level
    );
  }
  printStyleElementNode(e) {
    return yp(
      e,
      this.getIndent(),
      this.getIndent(this.level + 1),
      this.getIndent(1),
      this.options,
      this.level
    );
  }
  printEdgeComment(e) {
    return this.formatMultilineValue(
      Tp(e.value.trim()),
      this.getIndent()
    );
  }
  printEdgeMustacheNode(e, n, r) {
    const i = !(n?.type === "htmlText" || n?.type === "edgeMustache" || n?.type === "edgeEscapedMustache" || n?.type === "edgeSafeMustache" || (n?.type === "openingTag" || n?.type === "voidTag" || n?.type === "closingTag") && this.isInlineTag(n.tagName)), s = !(r?.type === "htmlText" || r?.type === "edgeMustache" || r?.type === "edgeEscapedMustache" || r?.type === "edgeSafeMustache" || (r?.type === "openingTag" || r?.type === "voidTag" || r?.type === "closingTag") && this.isInlineTag(r.tagName));
    let o = `${i ? this.getIndent() : ""}`;
    const a = e.type === "edgeSafeMustache" ? kn(e.value) : Cn(e.value);
    return o += s ? a.replace(/[\r\n]+/g, "").trimEnd() + `
` : a, o;
  }
  printOpeningNode(e, n, r) {
    let i = this.formatAttributes(e.attributes), s = this.formatEdgeTagProps(e.edgeTagProps), o = this.formatEdgeSafeMustacheProps(
      e.edgeSafeMustaches
    ), a = this.formatEdgeMustacheProps(e.edgeMustaches), c = this.formatComments(e.comments);
    const u = `${i} ${o} ${a} ${s} ${c}`.length, l = this.getIndent(this.level + 1), h = this.getIndent(
      void 0,
      e.type === "openingTag" ? "increase" : "none"
    ), f = this.getIndent(
      e.type === "openingTag" ? this.level - 1 : this.level
    ), _ = !this.isInlineTag(e.tagName) && r?.type !== "linebreak", E = !((n?.type === "htmlText" || n?.type === "edgeMustache" || n?.type === "edgeEscapedMustache" || n?.type === "edgeSafeMustache") && this.isInlineTag(e.tagName));
    if (u > this.printWidth || this.singleAttributePerLine) {
      const R = e.type == "voidTag" ? "/>" : ">";
      i = this.formatAttributes(e.attributes, l), s = this.formatEdgeTagProps(e.edgeTagProps, l), o = this.formatEdgeSafeMustacheProps(
        e.edgeSafeMustaches,
        l
      ), a = this.formatEdgeMustacheProps(
        e.edgeMustaches,
        l
      ), c = this.formatComments(e.comments, l);
      const g = u - 2 > 0 ? `
${f}` : "";
      return `${E ? h : ""}<${e.tagName}${i ? `
${i}` : ""}${a ? `
${a}` : ""}${o ? `
${o}` : ""}${s ? `
${this.formatMultilineValue(s, l)}` : ""}${c ? `
${this.formatMultilineValue(c, l)}` : ""}${g}${R}${_ ? `
` : ""}`;
    }
    const y = e.type == "voidTag" ? " />" : ">";
    return `${E ? h : ""}<${e.tagName}${i ? ` ${i}` : ""}${a ? ` ${a}` : ""}${o ? ` ${o}` : ""}${s ? ` ${this.formatMultilineValue(s, "")}` : ""}${c ? ` ${this.formatMultilineValue(c, "")}` : ""}${y}${_ ? `
` : ""}`;
  }
  printClosingNode(e, n, r) {
    const i = !this.isInlineTag(e.tagName) || n?.type === "linebreak" || n?.type === "edgeTag", s = n?.type !== "linebreak" && n?.type === "closingTag" && this.isInlineTag(n.tagName) && !this.isInlineTag(e.tagName), o = !this.isInlineTag(e.tagName) && r?.type !== "linebreak" && !((r?.type === "openingTag" || r?.type === "voidTag" || r?.type === "closingTag") && this.isInlineTag(r.tagName));
    return `${s ? `
` : ""}${i ? this.getIndent(this.level - 1, "decrease") : this.getIndent(0, "decrease")}</${e.tagName}>${o ? `
` : ""}`;
  }
  printEdgeTagNode(e, n) {
    let r = "none", i = this.level;
    e.value.includes("@end") ? (r = "decrease", i--) : e.value.includes("@else") ? i-- : e.value.includes("@!") || e.value.includes("@let") || e.value.includes("@svg") || e.value.includes("@assign") || e.value.includes("@inject") || e.value.includes("@eval") || e.value.includes("@debugger") || e.value.includes("@newError") || e.value.includes("@vite") || e.value.includes("@inertia") || e.value.includes("@stack") || e.value.includes("@dd") || e.value.includes("@dump") || e.value.includes("@markdown") || (this.options.customSingleLineEdgeTags || []).includes(
      e.value
    ) || e.value.match(/^@include\(.*/)?.length || e.value.match(/^@includeIf\(.*/)?.length || !e.value.includes("(") ? r = "none" : r = "increase";
    const s = n?.type !== "linebreak" && !e.value.includes(`
`);
    return _p(
      e,
      this.getIndent(i, r),
      s
    );
  }
  printHtmlTextNode(e, n, r) {
    const i = !(n?.type === "scriptlet" || n?.type === "edgeMustache" || n?.type === "edgeSafeMustache" || n?.type === "edgeEscapedMustache" || (n?.type === "openingTag" || n?.type === "voidTag" || n?.type === "closingTag") && this.isInlineTag(n.tagName)), s = !(r?.type === "edgeMustache" || r?.type === "edgeSafeMustache" || r?.type === "edgeEscapedMustache" || r?.type === "htmlText" || (r?.type === "openingTag" || r?.type === "voidTag" || r?.type === "closingTag") && this.isInlineTag(r.tagName) || r?.type === "scriptlet"), o = i ? this.getIndent() + e.value : e.value;
    return s ? `${o.trimEnd()}
` : o;
  }
  printLineBreak(e) {
    return e.value;
  }
  handlePrint(e, n = void 0, r = void 0) {
    switch (e.type) {
      case "document":
        return this.printDocumentNode(e);
      case "dtd":
        return this.printDTDNode(e);
      case "htmlComment":
      case "htmlConditionalComment":
      case "cdata":
      case "scriptlet":
        return this.printStandardNode(e);
      case "scriptElement":
        return this.printScriptElementNode(e);
      case "styleElement":
        return this.printStyleElementNode(e);
      case "edgeComment":
        return this.printEdgeComment(e);
      case "edgeMustache":
      case "edgeEscapedMustache":
      case "edgeSafeMustache":
        return this.printEdgeMustacheNode(e, n, r);
      case "openingTag":
      case "voidTag":
        return this.printOpeningNode(e, n, r);
      case "closingTag":
        return this.printClosingNode(e, n, r);
      case "edgeTag":
        return this.printEdgeTagNode(e, r);
      case "htmlText":
        return this.printHtmlTextNode(e, n, r);
      case "linebreak":
        return this.printLineBreak(e);
      default:
        return "";
    }
  }
}
function vp(t, e) {
  const n = t.getNode();
  return new Rr(e).handlePrint(n);
}
const Op = [
  {
    name: "EdgeJS",
    parsers: ["edgejs"],
    extensions: [".edge"],
    tmScope: "text.html.edge",
    aceMode: "html",
    linguistLanguageId: 460509620,
    vscodeLanguageIds: ["edge"]
  }
], Sp = {
  edgejs: {
    parse(t) {
      return vr(t);
    },
    astFormat: "edgejs",
    locStart(t) {
      return t.start;
    },
    locEnd(t) {
      return t.end;
    }
  }
}, Ip = {
  edgejs: {
    print: vp
  }
}, Np = {
  useTabs: !1,
  tabWidth: 4,
  printWidth: 80,
  singleAttributePerLine: !1,
  customSingleLineEdgeTags: []
}, Lp = {};
export {
  Np as defaultOptions,
  Op as languages,
  Lp as options,
  Sp as parsers,
  Ip as printers
};
