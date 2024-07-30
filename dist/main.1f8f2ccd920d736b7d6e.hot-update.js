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
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function () {\n  var dropzone = document.getElementById('dropzone');\n  var imageInput = document.getElementById('imageInput');\n  var selectedImage = document.getElementById('selectedImage');\n  var elementInput = document.getElementById('element');\n  function removeInfoText() {\n    var infoText = dropzone.querySelector('h3');\n    if (infoText) {\n      infoText.remove();\n    }\n  }\n  function previewImage(event) {\n    var reader = new FileReader();\n    reader.onload = function () {\n      var output = document.getElementById('selectedImage');\n      output.style.width = \"100%\";\n      output.src = reader.result;\n      removeInfoText(); // Ensure removal after setting src\n    };\n    reader.readAsDataURL(event.target.files[0]);\n  }\n  function resetImage() {\n    var output = document.getElementById('selectedImage');\n    output.src = 'image.png';\n    output.style.width = \"20%\";\n    document.getElementById('imageInput').value = \"\";\n    var dropzone = document.getElementById('dropzone');\n    dropzone.classList.remove('drag-over');\n    foundLabel.style.background = \"#5ea0b7\";\n    foundLabel.style.color = \"#223A59\";\n    notFoundLabel.style.background = \"#5ea0b7\";\n    notFoundLabel.style.color = \"#223A59\";\n    if (!dropzone.querySelector('h3')) {\n      var infoText = document.createElement('h3');\n      infoText.textContent = 'drag & drop your PNG or JPEG files here';\n      dropzone.appendChild(infoText);\n    }\n  }\n\n  // Event listener for Browse button\n  document.getElementById('browse-button').addEventListener('click', function () {\n    imageInput.click();\n  });\n\n  // Event listener for Reset button\n  document.getElementById('reset-button').addEventListener('click', function () {\n    resetImage();\n  });\n\n  // Event listener for dropzone\n  dropzone.addEventListener('dragover', function (e) {\n    e.preventDefault();\n    dropzone.classList.add('drag-over');\n  });\n  dropzone.addEventListener('dragleave', function () {\n    dropzone.classList.remove('drag-over');\n  });\n  dropzone.addEventListener('drop', function (e) {\n    e.preventDefault();\n    dropzone.classList.remove('drag-over');\n    removeInfoText();\n    var files = e.dataTransfer.files;\n    if (files.length > 0 && files[0].type === 'image/png') {\n      var reader = new FileReader();\n      reader.onload = function (event) {\n        selectedImage.src = event.target.result;\n        selectedImage.style.width = \"100%\";\n        removeInfoText(); // Ensure removal after setting src\n      };\n      reader.readAsDataURL(files[0]);\n    }\n  });\n  imageInput.addEventListener('change', function (event) {\n    removeInfoText();\n    previewImage(event);\n  });\n});\n\n//# sourceURL=webpack://image-analysis/./script/ImageAi.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c3bc7aa4c755215c1a99")
/******/ })();
/******/ 
/******/ }
);