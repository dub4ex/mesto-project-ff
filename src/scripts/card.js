function createCard(cardInfo, deleteEvent, likeEvent, openEvent) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  
  cardTitle.textContent = cardInfo.name;
  cardImage.alt = cardInfo.name;
  cardImage.src = cardInfo.link;
  
  deleteButton.addEventListener('click', () => deleteEvent(card));
  likeButton.addEventListener('click', likeEvent);
  cardImage.addEventListener('click', () => openEvent(cardImage, cardTitle));

  return card;
}

function deleteCard(card){
  card.remove();
}

function likeCard(like){
  like.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};