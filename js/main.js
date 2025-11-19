const { get } = require("browser-sync");

const names = [
  'Александр',
  'Мария',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Елена',
  'Иван',
  'Ольга',
  'Михаил',
  'Наталья'
];

const descriptions = [
  'Красивый закат',
  'Лесная тропа',
  'Город ночью',
  'Море волны',
  'Цветок крупно',
  'Улица города',
  'Портрет девушки',
  'Чашка кофе',
  'Кот на',
  'Зимний лес'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComment(id){
  return {
    id: id,
    avatar: 'img/avatar-{{getRandomNumber(1,6)}}.svg',
    message: messages[getRandomNumber(0, messages.length - 1)],
    name:  names[getRandomNumber(0, names.length - 1)],
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
    url: 'photos/{{id}}.jpg',
    desccription: descriptions[getRandomNumber(0, descriptions.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: getComments()
  };
}


function createPhotos(){
  const photos = [];
  for (let i = 1; i <= 25; i++){
    photos.push(createPhoto(i));
  }
  return photos;
}
// eslint-disable-next-line no-console
console.log(createPhotos());
