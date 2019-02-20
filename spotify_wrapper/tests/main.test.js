import {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists,
} from '../src/main';

// global.fetch = require('node-fetch');
global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  resolve({ body: 'json' });
}));

describe('Smoke Tests', () => {
  test('should exist the search method', () => {
    expect(search).toBeDefined();
  });

  test('should exist the searchArtists method', () => {
    expect(searchArtists).toBeDefined();
  });

  test('should exist the searchAlbums method', () => {
    expect(searchAlbums).toBeDefined();
  });

  test('should exist the searchTracks method', () => {
    expect(searchTracks).toBeDefined();
  });

  test('should exist the searchPlaylists method', () => {
    expect(searchPlaylists).toBeDefined();
  });
});

describe('Generic Search', () => {
  test('should call fetch function', () => {
    search();

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should call fetch with specific url', () => {
    search('emicida', 'artist');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=emicida&type=artist');

    search('rammstein', 'album');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=rammstein&type=album');
  });

  test('should call fetch with multipli types', () => {
    search('emicida', ['artist', 'album']);

    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=emicida&type=artist,album');
  });

  test('should return a json object from fetch', () => {
    const album = search('rammstein', 'album');

    expect(album).resolves.toBe({ body: 'json' });
  });
});

describe('SearchArtists', () => {
  test('should call fetch', () => {
    searchArtists('emicida');

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
  });

  test('should call fetch with specific url', () => {
    searchArtists('emicida');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=emicida&type=artist');

    searchArtists('o-rappa');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=o-rappa&type=artist');
  });
});

describe('searchAlbums', () => {
  test('should call fetch', () => {
    searchAlbums('emicida');

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
  });

  test('should call fetch with specific url', () => {
    searchAlbums('emicida');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=emicida&type=album');

    searchAlbums('o-rappa');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=o-rappa&type=album');
  });
});

describe('searchTracks', () => {
  test('should call fetch', () => {
    searchTracks('emicida');

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
  });

  test('should call fetch with specific url', () => {
    searchTracks('emicida');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=emicida&type=track');

    searchTracks('o-rappa');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=o-rappa&type=track');
  });
});

describe('searchPlaylists', () => {
  test('should call fetch', () => {
    searchPlaylists('emicida');

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
  });

  test('should call fetch with specific url', () => {
    searchPlaylists('emicida');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=emicida&type=playlist');

    searchPlaylists('o-rappa');
    expect(global.fetch).toBeCalledWith('https://api.spotify.com/v1/search?q=o-rappa&type=playlist');
  });
});
