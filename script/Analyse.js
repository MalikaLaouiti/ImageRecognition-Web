const endpoint = process.env.ENDPOINT;
const apiKey = process.env.API_KEY;

const apiVersion = '2024-02-01'; // API version
const features = ['tags', 'description'];

// Function to convert image file to base64 string
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function analyzeImage(imageFile, tagToFind) {
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
        const base64Image = await imageToBase64(imageFile);

        const fullUrl = `${endpoint}/vision/v3.2/analyze?${new URLSearchParams({
            visualFeatures: features.join(','),
            'api-version': apiVersion
        }).toString()}`;

        const requestBody = { url: `data:image/jpeg;base64,${base64Image}` };
        console.log('Request URL:', fullUrl);
        console.log('Request Body:', JSON.stringify(requestBody, null, 2));

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey
            },
            body: JSON.stringify(requestBody)
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

    analyseButton.addEventListener('click', async () => {
        alert('Button clicked');
        alert(selectedImage);
        const tagToFind = elementInput.value;
        
        if (!selectedImage || !selectedImage.files || selectedImage.files.length === 0) {
            console.error('No image file selected.');
            alert('Please select an image file.');
            return;
        }

        const imageFile = selectedImage.files[0];
        await analyzeImage(imageFile, tagToFind);
    });
});
