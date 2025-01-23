import '../pages/index.css'; /* Нужно для работы css */
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {imageModal, editFormSubmitHandler, addFormSubmitHandler, editModal, addModal} from './modal.js';

const cardList = document.querySelector('.places__list');
const popup = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const editForm = document.forms['edit-profile'];
const addButton = document.querySelector('.profile__add-button');
const addPopup= document.querySelector('.popup_type_new-card');
const addForm = document.forms['new-place'];
const imageContainer = document.querySelector('.popup_type_image');
const popupImage = imageContainer.querySelector('.popup__image');
const popupCaption = imageContainer.querySelector('.popup__caption');
const editNameInput = editForm.querySelector('.popup__input_type_name');
const editJobInput = editForm.querySelector('.popup__input_type_description');

editNameInput.value = profileTitle.textContent;
editJobInput.value = profileDesc.textContent;

popup.forEach(element => {
  element.classList.add('popup_is-animated');
});

initialCards.forEach(function(cardInfo){
  const card = createCard(cardInfo, deleteCard, likeCard, imageModal);
  cardList.append(card);
});

editButton.addEventListener('click', () => editModal(editPopup));
editForm.addEventListener('submit', editFormSubmitHandler);
addButton.addEventListener('click', () => addModal(addPopup));
addForm.addEventListener('submit', addFormSubmitHandler);


export{profileTitle, editForm, editNameInput, editJobInput, profileDesc, popupImage, popupCaption, imageContainer, popup, addPopup, editPopup, cardList};