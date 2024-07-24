
import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';

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
    const foundLabel = document.getElementById('found');
    const notFoundLabel = document.getElementById('Not-found');
    const resultInput = document.getElementById('result');
    alert("gvug");
    console.log('Analyzing image:', imageUrl, 'with tag:', tagToFind);
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
    const selectedImage = document.getElementById('selectedImage');
    const analyseButton = document.getElementById('analyseButton');
    const elementInput = document.getElementById('element');

    // Vérifiez si les éléments sont correctement sélectionnés
    if (!analyseButton) {
        console.error('L\'élément avec ID "analyseButton" n\'a pas été trouvé.');
        return;
    }
    
    if (!elementInput) {
        console.error('L\'élément avec ID "elementInput" n\'a pas été trouvé.');
        return;
    }


    analyseButton.addEventListener('click', () => {
        alert('Button clicked');
        const tagToFind = elementInput.value;
        analyzeImage(selectedImage.src, tagToFind);
    });
});


