import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isHashtagValid = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  if (hashtags.length > 5) {
    return false;
  }
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }
  return hashtags.every((tag) => hashtagRegex.test(tag));
};

const getHashtagErrorMessage = (value) => {
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Один и тот же хэш-тег не может быть использован дважды';
  }
  if (!hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag))) {
    return 'Введён невалидный хэш-тег';
  }
  return '';
};

pristine.addValidator(hashtagsInput, isHashtagValid, getHashtagErrorMessage);

const isDescriptionValid = (value) => value.length <= 140;

pristine.addValidator(descriptionInput, isDescriptionValid, 'Длина комментария не может составлять больше 140 символов');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showMessage = (templateId) => {
  const template = document.querySelector(templateId).content.querySelector('section');
  const messageElement = template.cloneNode(true);
  body.append(messageElement);

  const onMessageKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onMessageClick = (evt) => {
    if (evt.target.closest('.success__inner') && !evt.target.closest('.success__button')) {
      return;
    }
    if (evt.target.closest('.error__inner') && !evt.target.closest('.error__button')) {
      return;
    }
    closeMessage();
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onMessageKeydown);
    document.removeEventListener('click', onMessageClick);
  }

  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onMessageClick);
};

const showSuccessMessage = () => showMessage('#success');
const showErrorMessage = () => showMessage('#error');

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadOverlay();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement === hashtagsInput || document.activeElement === descriptionInput) {
      return;
    }
    // If error message is shown, don't close the form
    if (document.querySelector('.error')) {
      return;
    }
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', closeUploadOverlay);
  uploadForm.addEventListener('submit', onFormSubmit);
}

function closeUploadOverlay() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', closeUploadOverlay);
  uploadForm.removeEventListener('submit', onFormSubmit);
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  photoPreview.src = 'img/upload-default-image.jpg';
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
}

const onUploadInputChange = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    photoPreview.src = url;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${url})`;
    });
  }
  openUploadOverlay();
};

uploadInput.addEventListener('change', onUploadInputChange);
