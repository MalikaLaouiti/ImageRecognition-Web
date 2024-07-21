import axios from 'axios';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

document.addEventListener('DOMContentLoaded', () => {
    require('dotenv').config();

    const endpoint = process.env['VISION_ENDPOINT'];
    const key = process.env['VISION_KEY'];

    const client = new Azure.CognitiveServices.ComputerVision.ComputerVisionClient(
        new Azure.CognitiveServices.ComputerVision.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint
    );

    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    const analysebutton = document.getElementById('analysebutton');
    const elementInput = document.getElementById('element');
    const foundLabel = document.getElementById('found');
    const notFoundLabel = document.getElementById('Not-found');
    const resultInput = document.getElementById('result');
    const dropzone = document.getElementById('dropzone');

    // Event listener for Browse button
    document.getElementById('browse-button').addEventListener('click', () => {
        imageInput.click();
    });

    // Event listener for Reset button
    document.getElementById('reset-button').addEventListener('click', () => {
        resetImage();
    });

    analysebutton.addEventListener('click', () => {
        const tagToFind = elementInput.value;
        analyzeImage(selectedImage.src, tagToFind)
            .then(tagFound => {
                if (tagFound) {
                    foundLabel.style.display = 'block';
                    foundLabel.style.background="green";
                    notFoundLabel.style.display = 'none';
                    resultInput.value = `The tag "${tagToFind}" was found in the image.`;
                } else {
                    foundLabel.style.display = 'none';
                    notFoundLabel.style.display = 'block';
                    notFoundLabel.style.background="red";
                    resultInput.value = `The tag "${tagToFind}" was not found in the image.`;
                }
            })
            .catch(error => {
                foundLabel.style.display = 'none';
                notFoundLabel.style.display = 'none';
                resultInput.value = `Error analyzing image: ${error.message}`;
            });
    });
 
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
        removeInfoText(); // Assuming this function removes any informational text or messages
    
        const files = e.dataTransfer.files;
    
        if (files.length > 0) {
            const file = files[0];
            const fileType = file.type;
    
            if (fileType === 'image/png') {
                const reader = new FileReader();
                reader.onload = function (event) {
                    selectedImage.src = event.target.result;
                    selectedImage.style.width = "100%";
                    removeInfoText(); // Ensure removal after setting src
                }
                reader.readAsDataURL(file);
            } else {
                alert('Please drop a PNG image file.');
                if (!dropzone.querySelector('h3')) {
                    const infoText = document.createElement('h3');
                    infoText.textContent = 'glissez et déposez vos fichiers PNG ici';
                    dropzone.appendChild(infoText);
                }
            }
        }
    });
    
    imageInput.addEventListener('change', (event) => {
        removeInfoText();
        previewImage(event);
    });
});

    // Function to remove informational text from dropzone
    function removeInfoText() {
        const infoText = dropzone.querySelector('h3');
        if (infoText) {
            infoText.remove();
            previewImage(event);
        }
    }

    // Function to preview selected image
    function previewImage(event) {
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

    // Function to analyze image using Azure Cognitive Services
    async function analyzeImage(filePath, tagToFind) {
        const apiVersion = '3.2'; // Update to the latest version

        const url = `${endpoint}/vision/v${apiVersion}/analyze`;

        const params = {
            visualFeatures: 'Tags',
            details: '',
            language: 'fr'
        };

        const headers = {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
        };

        const body = {
            url: filePath
        };

        try {
            const response = await axios.post(url, body, { params, headers });
            const tags = response.data.tags;
            return tags.some(tag => tag.name.toLowerCase() === tagToFind.toLowerCase());
        } catch (error) {
            throw new Error(`Erreur lors de l'analyse de l'image: ${error.message}`);
        }
    }
