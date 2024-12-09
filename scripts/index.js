// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardInfo, deleteEvent) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  cardTitle.textContent = cardInfo.name;
  cardImage.alt = cardInfo.name;
  cardImage.src = cardInfo.link;
  deleteButton.addEventListener('click', () => deleteEvent(card));
  return card;
}

const cardList = document.querySelector('.places__list');

function deleteCard(card){
  card.remove();
}

initialCards.forEach(function(cardInfo){
  const card = createCard(cardInfo, deleteCard);
  cardList.append(card);
});