import { ImageAnalysisClient } from '@azure-rest/ai-vision-image-analysis';
import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';

// Load the .env file if it exists
// require("dotenv").config();

const dropzone = document.getElementById('dropzone');
const imageInput = document.getElementById('imageInput');
const selectedImage = document.getElementById('selectedImage');
const analyseButton = document.getElementById('analyseButton');
const elementInput = document.getElementById('elementInput');
const foundLabel = document.getElementById('foundLabel');
const notFoundLabel = document.getElementById('notFoundLabel');
const resultInput = document.getElementById('resultInput');

const endpoint =  "https://imagerecognition-webprosoft.cognitiveservices.azure.com/";
    
    const key =  "624e99b60d484ea091768b9fe9a1e983";

    const credential = new AzureKeyCredential(key);
    const client = createClient(endpoint, credential);

    const features = [
    'Caption',
    'Read',
    'Tags'
    ];

async function analyzeImage(imageUrl, tagToFind) {
    alert("gvug");
    
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

document.addEventListener('DOMContentLoaded', () => {
    analyseButton.addEventListener('click', () => {
        alert('Button clicked');
        const tagToFind = elementInput.value;
        analyzeImage(selectedImage.src, tagToFind);
    });
});

