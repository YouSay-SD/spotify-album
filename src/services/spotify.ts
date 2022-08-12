import {
  SEARCH_ARTIST_ENDPOINT,
  GET_SAVED_ALBUMS_ENDPOINT,
  GET_ALBUMS_ENDPOINT,
  SAVE_ALBUM_ENDPOINT,
  DELETE_ALBUM_ENDPOINT,
} from '../constants/index'

const getIdArtist = async (title, token) => {
  const encodeTitle = encodeURIComponent(title)
  const endpoint = `${SEARCH_ARTIST_ENDPOINT}?q=${encodeTitle}&type=artist&limit=4&offset=0`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

const getAlbumsByArtist = async (title, token, offset = 0) => {
  const { artists: listArtists } = await getIdArtist(title, token)
  const idArtist = listArtists.items ? listArtists.items[0].id : null
  const endpoint = `${GET_ALBUMS_ENDPOINT.replace(
    '{id}',
    idArtist
  )}?limit=4&offset=${offset}`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

const getSavedAlbums = async (token) => {
  const endpoint = `${GET_SAVED_ALBUMS_ENDPOINT}`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

const saveAlbum = async (idAlbum, token) => {
  const encodeIdAlbum = encodeURIComponent(idAlbum)
  const endpoint = `${SAVE_ALBUM_ENDPOINT}?ids=${encodeIdAlbum}`
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response?.status
}

const deleteAlbum = async (idAlbum, token) => {
  const encodeAlbum = encodeURIComponent(idAlbum)
  const endpoint = `${DELETE_ALBUM_ENDPOINT}?ids=${encodeAlbum}`
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response?.status
}

export {
  getIdArtist,
  getAlbumsByArtist,
  getSavedAlbums,
  saveAlbum,
  deleteAlbum,
}
