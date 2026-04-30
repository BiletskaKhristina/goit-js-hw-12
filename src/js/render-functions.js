import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(img => `
      <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img
            class="gallery-image"
            src="${img.webformatURL}"
            alt="${img.tags}"
          />
        </a>

        <div class="info">
          <p class="info-item"><b>Likes:</b> ${img.likes}</p>
          <p class="info-item"><b>Views:</b> ${img.views}</p>
          <p class="info-item"><b>Comments:</b> ${img.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${img.downloads}</p>
        </div>
      </li>
    `)
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}