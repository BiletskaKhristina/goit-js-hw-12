import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

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
const gallery = document.querySelector('.gallery');

const PER_PAGE = 15;

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

    if (!data.hits.length) {
      iziToast.error({ message: 'No images found' });
      return;
    }

    createGallery(data.hits);

    iziToast.success({
      message: `Hooray! We found ${totalHits} images.`,
    });

    checkLoadMore();
  } catch (error) {
    iziToast.error({ message: 'Something went wrong' });
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

    const firstItem = document.querySelector('.gallery-item');
    if (firstItem) {
      const height = firstItem.getBoundingClientRect().height;

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    checkLoadMore();
  } catch (error) {
    iziToast.error({ message: 'Failed to load more' });
  } finally {
    hideLoader();
  }
}

function checkLoadMore() {
  if (page * PER_PAGE >= totalHits) {
    hideLoadMoreButton();

    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });

    return;
  }

  showLoadMoreButton();
}