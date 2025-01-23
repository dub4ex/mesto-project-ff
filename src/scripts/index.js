import '../pages/index.css'; /* Нужно для работы css */
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';

const popupList = document.querySelectorAll('.popup');
const closeButtonList = document.querySelectorAll('.popup__close');
const cardList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const imageContainer = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const addPopup= document.querySelector('.popup_type_new-card');
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const popupImage = imageContainer.querySelector('.popup__image');
const popupCaption = imageContainer.querySelector('.popup__caption');
const editNameInput = editForm.querySelector('.popup__input_type_name');
const editJobInput = editForm.querySelector('.popup__input_type_description');

editNameInput.value = profileTitle.textContent;
editJobInput.value = profileDesc.textContent;

initialCards.forEach(function(cardInfo){
  const card = createCard(cardInfo, deleteCard, likeCard, imageModal);
  cardList.append(card);
});

popupList.forEach(element => {
  element.classList.add('popup_is-animated');
  element.addEventListener('click', function(e) {
    if (e.target === element) {
      closeModal(element);
    }
  });
});

closeButtonList.forEach(element => {
  element.addEventListener('click', () => closeModal(element.closest('.popup')));
});

editButton.addEventListener('click', () => openEditModal(editPopup));
editForm.addEventListener('submit', editFormSubmitHandler);
addButton.addEventListener('click', () => openAddModal(addPopup));
addForm.addEventListener('submit', addFormSubmitHandler);

function openEditModal(modal) {
  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDesc.textContent;
  openModal(modal);
}

function editFormSubmitHandler(e) {
  e.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDesc.textContent = editJobInput.value;
  closeModal(editPopup);
}

function addFormSubmitHandler(e) {
  e.preventDefault();
  const nameInput = e.target.elements['place-name'].value;
  const linkInput = e.target.elements.link.value;
  const cardInfo = {};
  cardInfo.name = nameInput;
  cardInfo.link = linkInput;
  const card = createCard(cardInfo, deleteCard, likeCard, imageModal);
  cardList.prepend(card);
  e.target.reset();
  closeModal(addPopup);
}

function imageModal(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;
  openModal(imageContainer);
}

function openAddModal(modal) {
  openModal(modal);
}