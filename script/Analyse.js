const endpoint = process.env.AZURE_ENDPOINT;
const apiKey = process.env.AZURE_KEY;

const apiVersion = '2024-02-01'; // API version
const features = ['tags', 'description'];

// Function to convert image file to base64 string
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            // Extract base64 data from data URL
            const base64Data = reader.result.split(',')[1];
            resolve(base64Data);
        };

        reader.onerror = (error) => {
            reject(new Error(`Failed to convert image to base64: ${error.message}`));
        };

        // Ensure the file is read as a data URL
        reader.readAsDataURL(file);
    });
}
async function analyzeImage(input, tagToFind) {
    const foundLabel = document.getElementById('foundLabel');
    const notFoundLabel = document.getElementById('notFoundLabel');
    const resultInput = document.getElementById('result');

    if (!foundLabel || !notFoundLabel || !resultInput) {
        console.error('Required elements not found in the DOM.');
        return;
    }
    
    alert("Analyzing image...");
    console.log('Analyzing image with tag:', tagToFind);
    
    try {
        let response;
        const formData = new FormData();
        foundLabel.style.background = "#5ea0b7";
        notFoundLabel.style.background = "#5ea0b7";
        resultInput.value = ``;
        
        if (input instanceof File) {
            // Append the file to the form data
            formData.append('file', input);
        } else if (typeof input === 'string' && input.startsWith('http')) {
            // Append URL as a query parameter for the API
            // You may need to use a different endpoint or method for URL-based images
            throw new Error('URL-based image analysis is not supported with this method.');
        } else {
            throw new Error('Invalid input type. Must be a File object.');
        }

        const fullUrl = `${endpoint}/vision/v3.2/analyze?${new URLSearchParams({
            visualFeatures: features.join(','),
            'api-version': apiVersion
        }).toString()}`;

        console.log('Request URL:', fullUrl);

        response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey
            },
            body: formData
        });

        console.log('Response Status:', response.status);
        console.log('Response Headers:', JSON.stringify(response.headers, null, 2));

        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText}\nDetails: ${errorDetail}`);
        }

        const iaResult = await response.json();
        console.log('Response Body:', JSON.stringify(iaResult, null, 2));

        if (iaResult.tags) {
            alert('changed');
            const tagFound = iaResult.tags.some(tag => tag.name === tagToFind);
           
            if (tagFound) {
                foundLabel.style.background = "green";
                resultInput.value = `The tag "${tagToFind}" was found `;
            } else {
                notFoundLabel.style.background = "red";
                resultInput.value = `The tag "${tagToFind}" was not found `;
            }
        } else {
            console.log('No tag results found.');
            foundLabel.style.display = 'none';
            notFoundLabel.style.display = 'none';
            resultInput.value = 'No tag results found ';
        }
    } catch (error) {
        console.error('Error analyzing image:', error);
        foundLabel.style.display = 'none';
        notFoundLabel.style.display = 'none';
        resultInput.value = `Error analyzing image: ${error.message}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    const analyseButton = document.getElementById('analyseButton');
    const elementInput = document.getElementById('element');
    const foundLabel = document.getElementById('foundLabel');
    const notFoundLabel = document.getElementById('notFoundLabel');
    const resultInput = document.getElementById('result');

    if (!analyseButton) {
        console.error('Element with ID "analyseButton" not found.');
        return;
    }

    if (!elementInput) {
        console.error('Element with ID "element" not found.');
        return;
    }

    // Convert image to File
    async function imageToFile(imgElement) {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Set canvas size to image size
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;
        // Draw image on canvas
        ctx.drawImage(imgElement, 0, 0);
        // Convert canvas to Blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        // Create File object from Blob
        const file = new File([blob], 'selected-image.png', { type: 'image/png' });
        return file;
    }

    // Handle analyze button click
    analyseButton.addEventListener('click', async () => {
        alert('Button clicked');
        
        if (selectedImage.src) {
            try {
                const imageFile = await imageToFile(selectedImage);
                // Update imageInput with the new file
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(imageFile);
                imageInput.files = dataTransfer.files;

                // Proceed with analysis
                console.log('imageFile', imageFile);
                await analyzeImage(imageFile, elementInput.value);
            } catch (error) {
                console.error('Error converting image to file:', error);
            }
        } else {
            console.error('No image in selectedImage.');
            alert('Please select an image first.');
        }
    });
});
