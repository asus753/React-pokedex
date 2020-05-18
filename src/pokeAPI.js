const BASE_URL = 'https://pokeapi.co/api/v2/'

const getResource = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('API Error');
  }
  return response.json();
}

const pokeAPI = {
  search : (searchParam) => {return getResource(`${BASE_URL}${searchParam}`)}
}

export default pokeAPI