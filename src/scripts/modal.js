function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeHandler);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
}

function escapeHandler(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector('.popup_is-opened');
    closeModal(openPopup);
  }
}

export{openModal, closeModal};