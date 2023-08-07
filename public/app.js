let imageArray = [];
const thumbnailContainer = document.getElementById('thumbnail-container');
const modal = document.getElementById('imageModal');
const imgElement = document.getElementById('current-image');

let currentIndex = 0;

function showImage(index) {
    if (index >= 0 && index < imageArray.length) {
        const imgElement = document.getElementById('current-image');
        imgElement.src = '/image/' + imageArray[index];
        currentIndex = index;
        modal.style.display = "block";
    }
}

// Fetch the list of image filenames from the server
fetch('/images')
    .then(response => response.json())
    .then(data => {
        imageArray = data;

        // Create and append thumbnails
        imageArray.forEach((image, index) => {
            const thumbnail = new Image();
            thumbnail.src = '/image/' + image;
            thumbnail.classList.add('thumbnail-image');

            // Attach the click event to this thumbnail
            thumbnail.addEventListener('click', () => {
                showImage(index);
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    })
    .catch(error => {
        console.error('Error fetching image list:', error);
    });


document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        } else if (event.key === 'ArrowRight') {
            // Show next image
            showImage(currentIndex + 1);
        } else if (event.key === 'ArrowLeft') {
            // Show previous image
            showImage(currentIndex - 1);
        }
    }
});
