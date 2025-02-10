import '../pages/index.css'; /* Нужно для работы css */
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import { Promise } from 'core-js';
import {apiGetUser, apiGetCards, apiEditUser, apiAddCard, apiEditAvatar} from './api.js';

const popupList = document.querySelectorAll('.popup');
const closeButtonList = document.querySelectorAll('.popup__close');
const cardList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const imageContainer = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const addPopup= document.querySelector('.popup_type_new-card');
const editAvatarPopup = document.querySelector('.popup_type_new-avatar');
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const editAvatarForm = document.forms['new-avatar'];
const popupImage = imageContainer.querySelector('.popup__image');
const popupCaption = imageContainer.querySelector('.popup__caption');
const editNameInput = editForm.querySelector('.popup__input_type_name');
const editJobInput = editForm.querySelector('.popup__input_type_description');
const editAvatarInput = editAvatarForm.querySelector('.popup__input_type_new-avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

editNameInput.value = profileTitle.textContent;
editJobInput.value = profileDesc.textContent;

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
profileImage.addEventListener('click', () => openEditAvatar(editAvatarPopup))
editAvatarForm.addEventListener('submit', editAvatarSubmitHandler);

function openEditModal(modal) {
  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDesc.textContent;
  openModal(modal);
  clearValidation(editForm, validationConfig);
}

function editFormSubmitHandler(e) {
  e.preventDefault();
  renderLoading(true, e);

  profileTitle.textContent = editNameInput.value;
  profileDesc.textContent = editJobInput.value;

  apiEditUser(editNameInput, editJobInput)
  .then(() => {
    closeModal(editPopup);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, e);
  });
}

function addFormSubmitHandler(e) {
  e.preventDefault();
  renderLoading(true, e);
  
  const nameInput = e.target.elements['place-name'].value;
  const linkInput = e.target.elements.link.value;

  apiAddCard(nameInput, linkInput)
  .then((cardInfo) => {
    const card = createCard(cardInfo, deleteCard, likeCard, imageModal, cardInfo.owner);
    cardList.prepend(card);
    e.target.reset();
    clearValidation(addForm, validationConfig);
    closeModal(addPopup);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, e);
  });
}

function renderLoading(isLoading, form) {
  const button = form.target.elements[form.target.elements.length - 1];
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

function editAvatarSubmitHandler(e) {
  e.preventDefault();
  renderLoading(true, e);
  profileImage.style.backgroundImage = `url('${editAvatarInput.value}')`;
  apiEditAvatar(editAvatarInput.value)
  .then(() => {
    closeModal(editAvatarPopup);
    clearValidation(editAvatarForm, validationConfig);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, e);
  }); 
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

function openEditAvatar(modal) {
  openModal(modal);
}

enableValidation(validationConfig);

Promise.all([apiGetUser(), apiGetCards()])
  .then((data) => {
    profileTitle.textContent = data[0].name;
    profileDesc.textContent = data[0].about;
    profileImage.style.backgroundImage = `url('${data[0].avatar}')`;
    data[1].forEach(function(cardInfo){
      const card = createCard(cardInfo, deleteCard, likeCard, imageModal, data[0]);
      cardList.append(card);
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
})

//console.log('click');