const axios = require('axios');

export { fetchImages };

const baseUrl = 'https://pixabay.com';

async function fetchImages(name, page) {
  const params = new URLSearchParams({
    key: '28252958-31fd02edbaf0cd1c2b2739817',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: page,
  });
  const response = await axios.get(`${baseUrl}/api/?${params}`);
  return response;
}
