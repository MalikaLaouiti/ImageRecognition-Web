/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateimage_analysis"]("main",{

/***/ "./script/ImageAi.js":
/*!***************************!*\
  !*** ./script/ImageAi.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("document.addEventListener('DOMContentLoaded', function () {\n  var dropzone = document.getElementById('dropzone');\n  var imageInput = document.getElementById('imageInput');\n  var selectedImage = document.getElementById('selectedImage');\n  var elementInput = document.getElementById('element');\n  dropzone.addEventListener('dragover', function (e) {\n    e.preventDefault();\n    dropzone.classList.add('drag-over');\n  });\n  dropzone.addEventListener('dragleave', function () {\n    dropzone.classList.remove('drag-over');\n  });\n  dropzone.addEventListener('drop', function (e) {\n    e.preventDefault();\n    dropzone.classList.remove('drag-over');\n    removeInfoText();\n    var files = e.dataTransfer.files;\n    if (files.length > 0 && (files[0].type === 'image/png' || files[0].type === 'image/jpeg')) {\n      var reader = new FileReader();\n      reader.onload = function (event) {\n        selectedImage.src = event.target.result;\n        selectedImage.style.width = \"100%\";\n        removeInfoText(); // Ensure removal after setting src\n      };\n      reader.readAsDataURL(files[0]);\n    }\n  });\n  imageInput.addEventListener('change', function (event) {\n    removeInfoText();\n    previewImage(event);\n  });\n  analyseButton.addEventListener('click', function () {\n    alert('Button clicked');\n    var tagToFind = elementInput.value;\n    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_azure-rest_ai-vision-image-analysis_dist-esm_src_index_js\"), __webpack_require__.e(\"script_Analyse_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../../../../../script/Analyse.js */ \"./script/Analyse.js\")).then(function (module) {\n      // The `analyzeImage` function should be exported from scriptToExecute.js\n      if (typeof module.analyzeImage === 'function') {\n        module.analyzeImage(selectedImage.src, tagToFind);\n      } else {\n        console.error('Function analyzeImage is not defined in the module.');\n      }\n    })[\"catch\"](function (error) {\n      console.error('Error loading the module:', error);\n    });\n  });\n});\nfunction removeInfoText() {\n  var infoText = dropzone.querySelector('h3');\n  if (infoText) {\n    infoText.remove();\n  }\n}\nfunction previewImage(event) {\n  var reader = new FileReader();\n  reader.onload = function () {\n    var output = document.getElementById('selectedImage');\n    output.style.width = \"100%\";\n    output.src = reader.result;\n    removeInfoText(); // Ensure removal after setting src\n  };\n  reader.readAsDataURL(event.target.files[0]);\n}\nfunction resetImage() {\n  var output = document.getElementById('selectedImage');\n  output.src = 'image.png';\n  output.style.width = \"20%\";\n  document.getElementById('imageInput').value = \"\";\n  var dropzone = document.getElementById('dropzone');\n  dropzone.classList.remove('drag-over');\n  if (!dropzone.querySelector('h3')) {\n    var infoText = document.createElement('h3');\n    infoText.textContent = 'drag & drop your PNG or JPEG files here';\n    dropzone.appendChild(infoText);\n  }\n}\n\n//# sourceURL=webpack://image-analysis/./script/ImageAi.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bf8bc2cf275b986b68e7")
/******/ })();
/******/ 
/******/ }
);