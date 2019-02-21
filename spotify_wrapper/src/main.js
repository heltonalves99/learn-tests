import { token, baseUrl } from '../config';

export const search = (query, type) => fetch(`${baseUrl}search?q=${query}&type=${type}`, {
  header: { 'Authorization': `Bearer ${token}` },
})
  .then(resp => resp.json());

export const searchArtists = query => search(query, 'artist');

export const searchAlbums = query => search(query, 'album');

export const searchTracks = query => search(query, 'track');

export const searchPlaylists = query => search(query, 'playlist');
