import { getRandomNumber, getRandomElement } from './util.js';
import { names, messages, descriptions } from './data.js';

let commentIdCounter = 1;

function createComment() {
  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomElement(messages),
    name: getRandomElement(names)
  };
}

function createPhoto(id) {
  const commentsCount = getRandomNumber(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomElement(descriptions),
    likes: getRandomNumber(15, 200),
    comments: comments
  };
}

export function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
}
