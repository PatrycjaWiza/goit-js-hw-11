export { smoothScroll };

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery');
  //.firstElementChild.getBoundingClientRect();
  console.log(cardHeight);
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
