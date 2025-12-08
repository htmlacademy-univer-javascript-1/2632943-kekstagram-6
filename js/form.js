const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

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

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement === hashtagsInput || document.activeElement === descriptionInput) {
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
}

uploadInput.addEventListener('change', openUploadOverlay);
