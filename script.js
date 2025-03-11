const accessKey = '08TaUJ1f3mY5kpw4hjuCcZi-r-YtbY0WSTRCD_FlV_o'; 
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imagesContainer = document.getElementById('images-container');
const showMoreButton = document.getElementById('show-more-button');

let query = '';
let page = 1;

const fetchImages = async () => {
  if (!query) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) imagesContainer.innerHTML = ''; // Clear previous images
    data.results.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description || 'Image';
      imagesContainer.appendChild(imgElement);
    });

    if (data.results.length > 0) {
      showMoreButton.style.display = 'block';
    } else {
      showMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

searchButton.addEventListener('click', () => {
  query = searchInput.value.trim();
  page = 1;
  fetchImages();
});

showMoreButton.addEventListener('click', () => {
  page++;
  fetchImages();
});