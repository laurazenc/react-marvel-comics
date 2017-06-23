import axios from 'axios';
import md5  from 'md5';

const config = {
  API_PUBLIC: 'c56855e0d5c0edc9a144d1ea95b9314c',
  API_PRIVATE: 'b3cac96ce6184f19d6d4681145f79f096bd7227f',
  BASE_URL: `${window.location.protocol || 'http'}//gateway.marvel.com:80`
};
const URI = '/v1/public/characters';
const timeStamp = Date.now();
const queryParams = {
  ts: timeStamp,
  apikey: config.API_PUBLIC,
  hash: md5(timeStamp + config.API_PRIVATE + config.API_PUBLIC)
};

export const getCharacters = () => {
  const url = `${config.BASE_URL}${URI}`;
  return axios
          .get(url, { params: queryParams })
          .then((response) => Promise.resolve(response.data))
          .catch((error) => Promise.reject(error));
};


export const getCharacterInfo = (characterId = null) => {
  if (characterId) {
    const url = `${config.BASE_URL}${URI}/${characterId}`;

    return axios
            .get(url, { params: queryParams })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
  }
  return Promise.reject({message: 'characterId is not defined'});
};
