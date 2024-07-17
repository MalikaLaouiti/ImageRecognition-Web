
const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env['VISION_ENDPOINT'];
const key = process.env['VISION_KEY'];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = [
  'Caption',
  'Read'
];

const imageUrl = 'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png';


document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');

    function removeInfoText() {
        const infoText = dropzone.querySelector('h3');
        if (infoText) {
            infoText.remove();
        }
    }

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        removeInfoText();
        const files = e.dataTransfer.files;
        if (files.length > 0 && (files[0].type === 'image/png' )) {
            const reader = new FileReader();
            reader.onload = function (event) {
                selectedImage.src = event.target.result;
                selectedImage.style.width="100%";
                removeInfoText(); // Ensure removal after setting src
            }
            reader.readAsDataURL(files[0]);
        }
    });

    imageInput.addEventListener('change', (event) => {
        removeInfoText();
        previewImage(event);
    });
});

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('selectedImage');
        output.style.width = "100%";
        output.src = reader.result;
        removeInfoText(); // Ensure removal after setting src
    }
    reader.readAsDataURL(event.target.files[0]);
}

function resetImage() {
    const output = document.getElementById('selectedImage');
    output.src = 'image.png';
    output.style.width = "20%";
    document.getElementById('imageInput').value = "";

    const dropzone = document.getElementById('dropzone');
    dropzone.classList.remove('drag-over');

    if (!dropzone.querySelector('h3')) {
        const infoText = document.createElement('h3');
        infoText.textContent = 'drag & drop your PNG or JPEG files here';
        dropzone.appendChild(infoText);
    }
}

async function analyzeImageFromUrl() {
  const result = await client.path('/imageanalysis:analyze').post({
    body: {
        url: imageUrl
    },
    queryParameters: {
        features: features
    },
    contentType: 'application/json'
  });

  const iaResult = result.body;

  let output = '';

  if (iaResult.captionResult) {
    output += `Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})\n`;
  }
  if (iaResult.readResult) {
    iaResult.readResult.blocks.forEach(block => {
      output += `Text Block: ${JSON.stringify(block)}\n`;
    });
  }

  document.getElementById('output').textContent = output;
}

document.getElementById('submit-button').addEventListener('click', analyzeImageFromUrl);
