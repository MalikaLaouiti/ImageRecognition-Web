document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    const analyseButton = document.getElementById('analyseButton');
    const elementInput = document.getElementById('elementInput');
    const foundLabel = document.getElementById('foundLabel');
    const notFoundLabel = document.getElementById('notFoundLabel');
    const resultInput = document.getElementById('resultInput');


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
        if (files.length > 0 && (files[0].type === 'image/png' || files[0].type === 'image/jpeg')) {
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
        alert('Image');
        removeInfoText();
        previewImage(event);
    });

    analyseButton.addEventListener('click', () => {
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




async function analyzeImage(imageUrl, tagToFind) {

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

});

function removeInfoText() {
    const infoText = dropzone.querySelector('h3');
    if (infoText) {
        infoText.remove();
    }
}

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