import {profileTitle, editNameInput, editJobInput, profileDesc, popupImage, popupCaption, imageContainer, popup, addPopup, editPopup, cardList} from './index.js';
import {createCard, deleteCard, likeCard} from './card.js';

function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
}

function addingCloseListeners(modal){
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => buttonCloseHandler(modal));
  modal.addEventListener('click', (e) => outsideModalHandler(e, modal));
  document.addEventListener('keydown', escapeHandler);
}

function buttonCloseHandler(modal) {
  closeModal(modal);
}

function outsideModalHandler(e, modal) {
  if (e.target === modal) {
    closeModal(modal);
  }
}

function escapeHandler(e) {
  if (e.key === "Escape") {
    const openPopup = Array.from(popup).find(el => el.classList.contains('popup_is-opened'));
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}



//Edit



function editModal(modal) {
  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDesc.textContent;
  openModal(modal);
  addingCloseListeners(modal);
}

function editFormSubmitHandler(e) {
  e.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDesc.textContent = editJobInput.value;
  closeModal(editPopup);
}



//Add



function addModal(modal) {
  openModal(modal);
  addingCloseListeners(modal);
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



//Image



function imageModal(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;
  openModal(imageContainer);
  addingCloseListeners(imageContainer);
}


export{imageModal, editFormSubmitHandler, addFormSubmitHandler, editModal, addModal};