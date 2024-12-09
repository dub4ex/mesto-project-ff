// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardInfo, deleteEvent) {                              //Функция создания карточки (Принимает в себя элемент массива и функцию удаления карточки)
  const cardTemplate = document.querySelector('#card-template').content;  //Наодим темплейт карточки и берем из него фрагмент документа и присваиваем переменную
  const card = cardTemplate.querySelector('.card').cloneNode(true);       //Присваиваем li(карточке) переменную и клонируем её
  const cardTitle = card.querySelector('.card__title');                   //Переменная для заголовка внутри карточки
  const cardImage = card.querySelector('.card__image');                   //Переменная для изображения внутри карточки
  const deleteButton = card.querySelector('.card__delete-button');        //Переменная для кнопки удаления внутри карточки
  cardTitle.textContent = cardInfo.name;                                  //Добавляем текст в заголвок из элемента массива со значением name
  cardImage.alt = cardInfo.name;                                          //Добавляем альт в изображение из элемента массива со значением name
  cardImage.src = cardInfo.link;                                          //Добавляем ссылку на изображение из элемента массива со значением link
  deleteButton.addEventListener('click', deleteEvent);                    //Добавляем на кнопку удаления слушатель
  return card;                                                            //Возвращаем карточку со всеми нужными элементами
}
const cardList = document.querySelector('.places__list');                 //Находим список куда будем вставлять карточки
initialCards.forEach(function(cardInfo){                                  //Для каждого элемента массива выполняем функцию
  const card = createCard(cardInfo, function() {                          //Создаём карточку, добавляя ей инфу из массива и функцию удаления
    card.remove();                                                        //Удаление карточки
  });
  cardList.append(card);                                                  //Добавление карточки на страницу
});