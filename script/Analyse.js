require('dotenv').config();
import fetch from 'node-fetch';
import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';

const endpoint = process.env.AZURE_ENDPOINT; // Ensure this is correct and has no extra slashes
const key = process.env.AZURE_KEY;
const apiVersion = '2024-02-01'; // API version

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ['tags', 'description'];

async function analyzeImage(imageUrl, tagToFind) {
    const foundLabel = document.getElementById('foundLabel');
    const notFoundLabel = document.getElementById('notFoundLabel');
    const resultInput = document.getElementById('result');
    alert("Analyzing image...");
    console.log('Analyzing image:', imageUrl, 'with tag:', tagToFind);

    if (!foundLabel || !notFoundLabel || !resultInput) {
        console.error('Required elements not found in the DOM.');
        return;
    }

    try {
        const fullUrl = `${endpoint}/vision/v3.2/analyze`;
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': key // Ensure this key is correct
            },
            body: JSON.stringify({ url: imageUrl }),
            query: new URLSearchParams({
                visualFeatures: features.join(','),
                'api-version': apiVersion
            }).toString()
        });

        if (!response.ok) {
            const errorDetail = await response.text(); // Get response text to help with debugging
            throw new Error(`Error ${response.status}: ${response.statusText}\nDetails: ${errorDetail}`);
        }

        const iaResult = await response.json();
        console.log(iaResult);

        if (iaResult.tags) {
            const tagFound = iaResult.tags.some(tag => tag.name === tagToFind);

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
    const selectedImage = document.getElementById('selectedImage');
    const analyseButton = document.getElementById('analyseButton');
    const elementInput = document.getElementById('element');

    if (!analyseButton) {
        console.error('Element with ID "analyseButton" not found.');
        return;
    }
    
    if (!elementInput) {
        console.error('Element with ID "element" not found.');
        return;
    }

    analyseButton.addEventListener('click', () => {
        alert('Button clicked');
        const tagToFind = elementInput.value;
        analyzeImage(selectedImage.src, tagToFind);
    });
});
