const searchParams = 'fields=name,capital,population,flags,languages';
export const fetchCountries = (name) => {
    return fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }
  );
};
