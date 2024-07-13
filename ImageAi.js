function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('selectedImage');
        output.src = reader.result;
        output.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

function resetImage() {
    const output = document.getElementById('selectedImage');
    output.src = '#';
    output.style.display = 'none';
    document.getElementById('imageInput').value = "";
}
