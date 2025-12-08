const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35">' +
    '<p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = comments[i];
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  }

  socialCommentsElement.innerHTML = '';
  socialCommentsElement.append(fragment);
  socialCommentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCommentsLoaderClick = () => renderComments();

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', hideBigPicture);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  socialCommentCountElement.classList.remove('hidden');

  bigPictureImgElement.src = data.url;
  likesCountElement.textContent = data.likes;
  commentsCountElement.textContent = data.comments.length;
  socialCaptionElement.textContent = data.description;

  comments = data.comments;
  if (comments.length > 0) {
    commentsShown = 0;
    renderComments();
  } else {
    socialCommentsElement.innerHTML = '';
    commentsLoaderElement.classList.add('hidden');
    socialCommentCountElement.innerHTML = '0 из <span class="comments-count">0</span> комментариев';
  }

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
  closeButtonElement.addEventListener('click', hideBigPicture);
};

export { showBigPicture };
