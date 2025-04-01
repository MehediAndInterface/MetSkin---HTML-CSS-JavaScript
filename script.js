// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Upload Section Functionality
    const uploadForm = document.getElementById('uploadForm');
    const mediaUpload = document.getElementById('mediaUpload');
    const uploadPreview = document.getElementById('uploadPreview');

    if (uploadForm && mediaUpload && uploadPreview) {
        mediaUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const mediaType = file.type.startsWith('image/') ? 'img' : 'video';
                    uploadPreview.innerHTML = mediaType === 'img'
                        ? `<img src="${e.target.result}" alt="Uploaded Preview">`
                        : `<video src="${e.target.result}" controls width="320">`;
                };
                reader.readAsDataURL(file);
            } else {
                uploadPreview.innerHTML = '<p>No file selected.</p>';
            }
        });

        uploadForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(uploadForm);

            try {
                // Placeholder: Replace with your actual API endpoint for analysis
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const analysisResult = await response.json();
                    // Process the analysis result and update the recommendations section
                    updateRecommendations(analysisResult);
                } else {
                    console.error('Upload failed:', response.status);
                    alert('Upload failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during upload:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Recommendation Section Update Function
    function updateRecommendations(analysisResult) {
        const recommendationResults = document.getElementById('recommendationResults');
        if (recommendationResults) {
            // Placeholder: Replace with actual result processing logic
            recommendationResults.innerHTML = '<p>Based on your skin analysis, we recommend:</p>';
            const ul = document.createElement('ul');
            if(analysisResult && analysisResult.recommendations){
                analysisResult.recommendations.forEach(recommendation => {
                    const li = document.createElement('li');
                    li.textContent = recommendation;
                    ul.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = "No Recommendations yet.";
                ul.appendChild(li);
            }
            recommendationResults.appendChild(ul);
        }
    }

    // Example function to fetch and populate product data
    async function fetchProducts() {
        try {
            // Placeholder: Replace with your API endpoint for products
            const response = await fetch('/api/products');
            if (response.ok) {
                const products = await response.json();
                populateProducts(products);
            } else {
                console.error('Failed to fetch products:', response.status);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function populateProducts(products) {
        const productList = document.getElementById('productList');
        if (productList) {
            productList.innerHTML = ''; // Clear existing products
            products.forEach(product => {
                const article = document.createElement('article');
                article.classList.add('product');
                article.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <button>View Details</button>
                `;
                productList.appendChild(article);
            });
        }
    }

    // Example function to fetch doctors
    async function fetchDoctors(){
        try {
            const response = await fetch('/api/doctors');
            if (response.ok){
                const doctors = await response.json();
                populateDoctors(doctors);
            } else {
                console.error("Failed to fetch doctors:", response.status);
            }

        } catch (error){
            console.error('Error fetching doctors:', error);
        }
    }

    function populateDoctors(doctors){
        const doctorDirectory = document.getElementById('doctorDirectory');
        if (doctorDirectory){
            doctorDirectory.innerHTML = '';
            doctors.forEach(doctor => {
                const article = document.createElement('article');
                article.classList.add('doctor');
                article.innerHTML = `
                    <h3>${doctor.name}</h3>
                    <p>Specialty: ${doctor.specialty}</p>
                    <button>Book Appointment</button>
                `;
                doctorDirectory.appendChild(article);
            });
        }
    }

    // Call functions to populate data on page load
    fetchProducts();
    fetchDoctors();
});