// library & imports
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/fetchImages';
import { renderImages, imageResults } from './js/renderImages';
import { smoothScroll } from './js/smoothScroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// consts
const form = document.querySelector('#search-form');
const loadMore = document.querySelector('.load-more');
let page = 1;
let name = '';
let lightbox;

form.addEventListener('submit', searchEvent);
loadMore.addEventListener('click', loadMoreEvent);

function clear() {
  const imageResults = document.querySelector('.gallery');
  imageResults.innerHTML = '';
}

// handleEvent
function searchEvent(e) {
  e.preventDefault();
  clear();
  page = 1;
  name = document.querySelector('input').value.trim();

  if (name === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMore.classList.add('is-hidden');

    return;
  }

  fetchImages(name, page)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMore.classList.add('is-hidden');
      } else {
        renderImages(data.hits);
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
        }).refresh();
        if (data.totalHits > 40) {
          loadMore.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => form.reset());
}

//loadMore images
function loadMoreEvent() {
  page += 1;
  fetchImages(name, page)
    .then(({ data }) => {
      renderImages(data.hits);
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
      }).refresh();
      smoothScroll();
      const totalPages = data.totalHits / 40;
      if (page > totalPages) {
        loadMore.classList.add('is-hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}
