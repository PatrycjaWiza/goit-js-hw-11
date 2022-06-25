// library & imports
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/fetchImages';
import { renderImages, imageResults } from './js/renderImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// consts
const form = document.querySelector('#search-form');
const loadMore = document.querySelector('.load-more');
let page = 1;
let name = '';

form.addEventListener('submit', searchEvent);
// loadMore.addEventListener('click', loadMoreEvent);

function clear() {
  const imageResults = document.querySelector('.gallery');
  imageResults.innerHTML = '';
}

// handleEvent
function searchEvent(e) {
  e.preventDefault();
  clear();
  name = document.querySelector('input').value.trim();
  if (name === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  fetchImages(name, page)
    .then(({ data }) => {
      renderImages(data.hits);
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
      }).refresh();
      //dodaj alert o znalezionych hitach Notify.success('Sol lucet omnibus');
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => form.reset());
}
function loadMoreEvent() {}
