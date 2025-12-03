import { getRandomNumber } from './util.js';
import { NAMES, MESSAGES, DESCRIPTIONS } from './data.js';

function getComment(id){
  return {
    id: id,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
    name:  NAMES[getRandomNumber(0, NAMES.length - 1)],
  };
}

function getComments(){
  const comments = [];
  for (let i = 1; i <= getRandomNumber(0, 30); i++){
    comments.push(getComment(i));
  }
  return comments;
}

function createPhoto(id){
  return {
    id: id,
    url: `photos/${id}.jpg`,
    desccription: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: getComments()
  };
}

export function createPhotos(){
  const photos = [];
  for (let i = 1; i <= 25; i++){
    photos.push(createPhoto(i));
  }
  return photos;
}

