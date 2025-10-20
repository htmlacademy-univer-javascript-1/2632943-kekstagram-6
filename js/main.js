const names = ['Артём', 'Мария', 'Иван', 'Анна', 'Дмитрий', 'Елена', 'Сергей', 'Ольга'];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат.',
  'Лица у людей на фотке перекошены!'
];

const descriptions = [
  'Красивый закат', 'Горный пейзаж', 'Улочки города',
  'Кофе и книга', 'Прогулка в парке', 'Ночной город',
  'Цветущий сад', 'Путешествие', 'Встреча с друзьями',
  'Мой питомец', 'Уютный вечер', 'Летние краски'
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

let commentIdCounter = 1;

function createComment() {
  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
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
    url: `photos/${  id  }.jpg`,
    description: getRandomElement(descriptions),
    likes: getRandomNumber(15, 200),
    comments: comments
  };
}

function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
}

const photoArray = generatePhotos();

// eslint-disable-next-line no-console
console.log(photoArray);
