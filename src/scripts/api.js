import {checkResponse} from './utils/checkResponse.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0',
    'Content-Type': 'application/json'
  }
}

function request(endpoint, options = {}) {
  const url = `${config.baseUrl}${endpoint}`;
  return fetch(url, options).then(checkResponse)
}

function apiGetUser() {
  return request('/users/me', {
    method: 'GET',
    headers: config.headers
  });
}

function apiGetCards() {
  return request('/cards', {
    method: 'GET',
    headers: config.headers
  })
}

function apiEditUser(name, job) {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name.value}`,
      about: `${job.value}`
    })
  })
}

function apiAddCard(cardName, cardLink) {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  })
}

function apiEditAvatar(link) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${link}`
    })
  })
}

function apiRemoveCard(cardInfo) {
  return request(`/cards/${cardInfo['_id']}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

function apiLikeCard(cardInfo) {
  return request(`/cards/likes/${cardInfo['_id']}`, {
    method: 'PUT',
    headers: config.headers
  })
}

function apiDislikeCard(cardInfo) {
  return request (`/cards/likes/${cardInfo['_id']}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export {apiGetUser, 
        apiGetCards, 
        apiEditUser, 
        apiAddCard, 
        apiEditAvatar, 
        apiRemoveCard, 
        apiLikeCard, 
        apiDislikeCard};