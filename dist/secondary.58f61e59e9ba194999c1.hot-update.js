/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateimage_analysis"]("secondary",{

/***/ "./script/Analyse.js":
/*!***************************!*\
  !*** ./script/Analyse.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/buffer/index.js\")[\"Buffer\"];\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\nvar endpoint = \"MISSING_ENV_VAR\".ENDPOINT;\nvar apiKey = \"MISSING_ENV_VAR\".API_KEY;\nvar apiVersion = '2024-02-01'; // API version\n\nvar features = ['tags', 'description'];\nfunction imageToBase64(imagePath) {\n  try {\n    var image = fs.readFileSync(imagePath);\n    return Buffer.from(image).toString('base64');\n  } catch (error) {\n    console.error('Error reading image file:', error);\n    return null;\n  }\n}\nfunction analyzeImage(_x, _x2) {\n  return _analyzeImage.apply(this, arguments);\n}\nfunction _analyzeImage() {\n  _analyzeImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(imageUrl, tagToFind) {\n    var foundLabel, notFoundLabel, resultInput, fullUrl, requestBody, response, contentType, responseBody, _responseBody, errorDetail, iaResult, tagFound;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          foundLabel = document.getElementById('foundLabel');\n          notFoundLabel = document.getElementById('notFoundLabel');\n          resultInput = document.getElementById('result');\n          alert(\"Analyzing image...\");\n          console.log('Analyzing image:', imageUrl, 'with tag:', tagToFind);\n          imgurl = imageToBase64(imageUrl);\n          if (!(!foundLabel || !notFoundLabel || !resultInput)) {\n            _context.next = 9;\n            break;\n          }\n          console.error('Required elements not found in the DOM.');\n          return _context.abrupt(\"return\");\n        case 9:\n          _context.prev = 9;\n          fullUrl = \"\".concat(endpoint, \"/vision/v3.2/analyze?\").concat(new URLSearchParams({\n            visualFeatures: features.join(','),\n            'api-version': apiVersion\n          }).toString());\n          requestBody = {\n            url: imgurl\n          };\n          console.log('Request URL:', fullUrl);\n          console.log('Request Body:', JSON.stringify(requestBody, null, 2));\n          _context.next = 16;\n          return fetch(fullUrl, {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json',\n              'Ocp-Apim-Subscription-Key': key\n            },\n            body: JSON.stringify(requestBody)\n          });\n        case 16:\n          response = _context.sent;\n          contentType = response.headers.get(\"content-type\");\n          console.log('Response Status:', response.status);\n          console.log('Response Headers:', JSON.stringify(response.headers, null, 2));\n          if (!(contentType && contentType.includes(\"application/json\"))) {\n            _context.next = 27;\n            break;\n          }\n          _context.next = 23;\n          return response.json();\n        case 23:\n          responseBody = _context.sent;\n          console.log('Response Body:', JSON.stringify(responseBody, null, 2));\n          _context.next = 31;\n          break;\n        case 27:\n          _context.next = 29;\n          return response.text();\n        case 29:\n          _responseBody = _context.sent;\n          console.log('Response Body:', _responseBody);\n        case 31:\n          if (response.ok) {\n            _context.next = 36;\n            break;\n          }\n          _context.next = 34;\n          return response.text();\n        case 34:\n          errorDetail = _context.sent;\n          throw new Error(\"Error \".concat(response.status, \": \").concat(response.statusText, \"\\nDetails: \").concat(errorDetail));\n        case 36:\n          _context.next = 38;\n          return response.json();\n        case 38:\n          iaResult = _context.sent;\n          console.log(iaResult);\n          if (iaResult.tags) {\n            tagFound = iaResult.tags.some(function (tag) {\n              return tag.name === tagToFind;\n            });\n            if (tagFound) {\n              foundLabel.style.display = 'block';\n              foundLabel.style.background = \"green\";\n              notFoundLabel.style.display = 'none';\n              resultInput.value = \"The tag \\\"\".concat(tagToFind, \"\\\" was found in the image.\");\n            } else {\n              foundLabel.style.display = 'none';\n              notFoundLabel.style.display = 'block';\n              notFoundLabel.style.background = \"red\";\n              resultInput.value = \"The tag \\\"\".concat(tagToFind, \"\\\" was not found in the image.\");\n            }\n          } else {\n            console.log('No tag results found.');\n            foundLabel.style.display = 'none';\n            notFoundLabel.style.display = 'none';\n            resultInput.value = 'No tag results found in the image.';\n          }\n          _context.next = 49;\n          break;\n        case 43:\n          _context.prev = 43;\n          _context.t0 = _context[\"catch\"](9);\n          console.error('Error analyzing image:', _context.t0);\n          foundLabel.style.display = 'none';\n          notFoundLabel.style.display = 'none';\n          resultInput.value = \"Error analyzing image: \".concat(_context.t0.message);\n        case 49:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[9, 43]]);\n  }));\n  return _analyzeImage.apply(this, arguments);\n}\ndocument.addEventListener('DOMContentLoaded', function () {\n  var selectedImage = document.getElementById('selectedImage');\n  var analyseButton = document.getElementById('analyseButton');\n  var elementInput = document.getElementById('element');\n  if (!analyseButton) {\n    console.error('Element with ID \"analyseButton\" not found.');\n    return;\n  }\n  if (!elementInput) {\n    console.error('Element with ID \"element\" not found.');\n    return;\n  }\n  analyseButton.addEventListener('click', function () {\n    alert('Button clicked');\n    var tagToFind = elementInput.value;\n    analyzeImage(selectedImage.src, tagToFind);\n  });\n});\n\n//# sourceURL=webpack://image-analysis/./script/Analyse.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7135d39953f40522b6df")
/******/ })();
/******/ 
/******/ }
);