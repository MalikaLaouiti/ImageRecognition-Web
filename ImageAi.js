const { AzureKeyCredential } = require('@azure/core-auth');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
require('dotenv').config();

const endpoint = process.env['VISION_ENDPOINT'];
const key = process.env['VISION_KEY'];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = [
  'Caption',
  'Read',
  'Tags'
];


document.addEventListener('DOMContentLoaded', () => {

    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    const analysebutton = document.getElementById('analysebutton');
    const elementInput = document.getElementById('element');
    const foundLabel = document.getElementById('found');
    const notFoundLabel = document.getElementById('Not-found');
    const resultInput = document.getElementById('result');
    const dropzone = document.querySelector('.dropzone');

    // Event listener for Browse button
    document.getElementById('browse-button').addEventListener('click', () => {
        imageInput.click();
    });

    // Event listener for Reset button
    document.getElementById('reset-button').addEventListener('click', () => {
        resetImage();
    });

    

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

        const files = e.dataTransfer.files;
        if (files.length > 0 && (files[0].type === 'image/png')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                selectedImage.src = event.target.result;
            }
            reader.readAsDataURL(files[0]);
        }
    });
    
    imageInput.addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
            removeInfoText();
            previewImage(event);
        } else {
            alert('No files selected or event.target.files is undefined.');
        }
    });


    analysebutton.addEventListener('click', () => {
        alert('Button clicked');
        const tagToFind = elementInput.value;
        analyzeImage(selectedImage.src, tagToFind)
            .then(tagFound => {
                if (tagFound) {
                    foundLabel.style.display = 'block';
                    foundLabel.style.background = "green";
                    notFoundLabel.style.display = 'none';
                    resultInput.value = `The tag "${tagToFind}" was found in the image.`;
                } else {
                    foundLabel.style.display = 'none';
                    notFoundLabel.style.display = 'block';
                    notFoundLabel.style.background = "red";
                    resultInput.value = `The tag "${tagToFind}" was not found in the image.`;
                }
            })
            .catch(error => {
                foundLabel.style.display = 'none';
                notFoundLabel.style.display = 'none';
                resultInput.value = `Error analyzing image: ${error.message}`;
            });
    });
});

// Function to remove informational text from dropzone
function removeInfoText() {
    const infoText = dropzone.querySelector('h3');
    if (infoText) {
        infoText.remove();
    }
}

// Function to preview selected image
function previewImage(event) {
    if (!event || !event.target || !event.target.files) {
        console.error('Event or event.target is undefined.');
        return;
    }
    const file = event.target.files[0];
    
    // Check if the file is a PNG image
    if (!file.type.startsWith('image/png')) {
        alert('Please select a PNG image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('selectedImage');
        output.style.width = "100%";
        output.src = reader.result;
        removeInfoText(); // Ensure removal after setting src
    }
    reader.readAsDataURL(file);
}
    

// Function to reset image selection
function resetImage() {
    const output = document.getElementById('selectedImage');
    output.src = 'image.png';
    output.style.width = "20%";
    document.getElementById('imageInput').value = "";

    const dropzone = document.getElementById('dropzone');
    dropzone.classList.remove('drag-over');

    if (!dropzone.querySelector('h3')) {
        const infoText = document.createElement('h3');
        infoText.textContent = 'glissez et déposez vos fichiers PNG ici';
        dropzone.appendChild(infoText);
    }
}


async function analyzeImage(imageUrl, tagToFind) {
    alert('button');
    const endpoint = process.env['VISION_ENDPOINT'];
    const key = process.env['VISION_KEY'];

    const credential = new AzureKeyCredential(key);
    const client = createClient(endpoint, credential);

const features = [
  'Caption',
  'Read',
  'Tags'
];
    try {
        const result = await client.path('/imageanalysis:analyze').post({
            body: { url: imageUrl },
            queryParameters: { features: ['Tags'] },
            contentType: 'application/json'
        });

        const iaResult = result.body;

        if (iaResult.tagResult) {
            const tagFound = iaResult.tagResult.tags.some(tag => tag.name === tagToFind);
            
            if (tagFound) {
                foundLabel.style.display = 'block';
                foundLabel.style.background = "green";
                notFoundLabel.style.display = 'none';
                resultInput.value = `The tag "${tagToFind}" was found in the image.`;
            } else {
                foundLabel.style.display = 'none';
                notFoundLabel.style.display = 'block';
                notFoundLabel.style.background = "red";
                resultInput.value = `The tag "${tagToFind}" was not found in the image.`;
            }
        } else {
            console.log('No tag results found.');
            foundLabel.style.display = 'none';
            notFoundLabel.style.display = 'none';
            resultInput.value = 'No tag results found in the image.';
        }
    } catch (error) {
        console.error('Error analyzing image:', error);
        foundLabel.style.display = 'none';
        notFoundLabel.style.display = 'none';
        resultInput.value = `Error analyzing image: ${error.message}`;
    }
}

