//Импортирую только апи, потом поменять путь к файлу

import {apiRemoveCard, apiLikeCard, apiDislikeCard} from './api.js';

function createCard(cardInfo, deleteEvent, likeEvent, openEvent, userInfo) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeDisplay = card.querySelector('.card__like-display');

  likeDisplay.textContent = cardInfo.likes.length;
  cardInfo.likes.forEach(function(obj){
    if(obj['_id'] === userInfo['_id']){
      likeButton.classList.add('card__like-button_is-active');
    }
  });
  cardTitle.textContent = cardInfo.name;
  cardImage.alt = cardInfo.name;
  cardImage.src = cardInfo.link;
  if(userInfo['_id'] !== cardInfo.owner['_id']) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', () => deleteEvent(card, cardInfo));
  likeButton.addEventListener('click', (e) => likeEvent(e, cardInfo, likeDisplay));
  cardImage.addEventListener('click', () => openEvent(cardImage, cardTitle));

  return card;
}

function deleteCard(card, cardInfo){
  apiRemoveCard(cardInfo)
  .then(() => {
    card.remove();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
}

function likeCard(like, cardInfo, likeDisplay){
  like.target.classList.toggle('card__like-button_is-active');
  if (like.target.classList.contains('card__like-button_is-active')) {
    apiLikeCard(cardInfo)
    .then((data) => {
      likeDisplay.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  } else {
    apiDislikeCard(cardInfo)
    .then((data) =>{
      likeDisplay.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }
}

export {createCard, deleteCard, likeCard};