import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  getImagesByQuery,
} from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = e.target.elements.search.value.trim();

  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'No images found',
      });
      return;
    }

    createGallery(data.hits);

    iziToast.success({
      message: `Hooray! We found ${totalHits} images.`,
    });

    checkLoadMore();
    smoothScroll();
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    checkLoadMore();
    smoothScroll();
  } catch (err) {
    iziToast.error({
      message: 'Failed to load more',
    });
  } finally {
    hideLoader();
  }
}

function checkLoadMore() {
  const loaded = page * 15;

  if (loaded >= totalHits) {
    hideLoadMoreButton();

    iziToast.info({
      message:
        "We're sorry, but you've reached the end of search results.",
    });

    return;
  }

  showLoadMoreButton();
}

function smoothScroll() {
  const card = document.querySelector('.gallery a');
  if (!card) return;

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}