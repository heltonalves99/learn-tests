import { searchAlbums } from '../src/main';

global.fetch = require('node-fetch');


const albums = searchAlbums('emicida');
albums.then((result) => {
  console.log(result);
});
