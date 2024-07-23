document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    const elementInput = document.getElementById('element');

  

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
        removeInfoText();
        previewImage(event);
    });

    
    analyseButton.addEventListener('click', () => {
        alert('Button clicked');
        const tagToFind = elementInput.value;
        
        import('/script/Analyse.js')
            .then(module => {
                // The `analyzeImage` function should be exported from scriptToExecute.js
                if (typeof module.analyzeImage === 'function') {
                    module.analyzeImage(selectedImage.src, tagToFind);
                } else {
                    console.error('Function analyzeImage is not defined in the module.');
                }
            })
            .catch(error => {
                console.error('Error loading the module:', error);
            });

    
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
