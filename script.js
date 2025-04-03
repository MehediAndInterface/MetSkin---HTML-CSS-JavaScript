const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('mediaUpload');
const previewArea = document.getElementById('uploadPreview');
const progressBar = document.getElementById('uploadProgress');
const errorMessage = document.getElementById('uploadError');
const uploadButton = document.getElementById('uploadButton');
const recommendations = document.getElementById('recommendations');

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        showPreview(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        showPreview(e.target.files[0]);
    }
});

function showPreview(file) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewArea.innerHTML = `<img src="${e.target.result}">`;
        };
        reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
        previewArea.innerHTML = `<video src="${URL.createObjectURL(file)}" controls>`;
    }
}

// const uploadButton = document.getElementById('uploadButton');
// const recommendations = document.getElementById('recommendations');

uploadButton.addEventListener('click', () => {
    if (recommendations.style.display === 'none') {
        recommendations.style.display = 'block'; // Show recommendations
    } else {
        recommendations.style.display = 'none'; // Hide recommendations
    }
});