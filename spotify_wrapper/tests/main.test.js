import {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists,
} from '../src/main';

// global.fetch = require('node-fetch');
global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  resolve({});
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
});
