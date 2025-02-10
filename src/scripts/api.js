function apiGetUser() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me', {
    method: 'GET',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

function apiGetCards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/cards', {
    method: 'GET',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0'
      }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

function apiEditUser(name, job) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name.value}`,
      about: `${job.value}`
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
}

function apiAddCard(cardName, cardLink) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/cards', {
    method: 'POST',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
}

function apiEditAvatar(link) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${link}`
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
}

function apiRemoveCard(cardInfo) {
  return  fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/${cardInfo['_id']}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
}

function apiLikeCard(cardInfo) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/likes/${cardInfo['_id']}`, {
    method: 'PUT',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
} 

function apiDislikeCard(cardInfo) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/likes/${cardInfo['_id']}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ab94c243-44eb-4a90-99f0-d64cd30780d0'
    }
  }) 
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
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