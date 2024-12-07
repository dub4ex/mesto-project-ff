// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу







const cardList = document.querySelector('.places__list');                   //Вызываем из html ul с пока пустым списком карточек
const cardTemplate = document.querySelector('#card-template').content;      //Вызываем из html темплейт карточки
initialCards.forEach(function (item) {                                      /*Заполнение карточек информацией и вывод на страницу аппендом*/
  const cardElement = cardTemplate.cloneNode(true);                         //Клонируем темплейт
  cardElement.querySelector('.card__title').textContent = item.name;        //Каждой карточке даём название
  cardElement.querySelector('.card__image').alt = item.name;                //Каждой карточке указываем альт
  cardElement.querySelector('.card__image').src = item.link;                //Каждой карточке даём ссылку на картинку
  cardList.append(cardElement);                                             //Выводим карточку на страницу
});
cardList.addEventListener('click', function(event) {                        /*Ставим слушатель на клик в списке карточек */
  const deleteButton = event.target.closest('.card__delete-button');        //Находим кнопку на странице
  if (!deleteButton) {                                                      /* Если клик не по кнопке то ничего не происходит, убирает ошибку Cannot read properties of null (reading 'parentElement') */
    return;
  }
  deleteButton.parentElement.remove();                                      /* Клик по кнопке- убираем родительский элемент */
});