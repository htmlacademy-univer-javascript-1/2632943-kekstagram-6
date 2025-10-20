const DESCRIPTIONS = [
  'Прекрасный закат над горным озером',
  'Утренняя прогулка по лесу',
  'Город в лучах вечернего солнца',
  'Тихий пляж без туристов',
  'Водопад среди дикой природы',
  'Старинный замок в тумане',
  'Весенний парк с цветущими деревьями',
  'Ночное небо, усыпанное звёздами',
  'Осенняя аллея в парке',
  'Полет над горами на параплане'
];

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр',
  'Мария',
  'Иван',
  'Елена',
  'Дмитрий',
  'Ольга',
  'Николай',
  'Татьяна',
  'Сергей',
  'Виктория'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

let commentIdCounter = 1;

function generateComments() {
  const comments = [];
  const count = getRandomInt(0, 30);
  for (let i = 0; i < count; i++) {
    const sentencesCount = getRandomInt(1, 2);
    const message = Array.from({ length: sentencesCount }, () => getRandomArrayElement(COMMENTS_MESSAGES))
      .join(' ');
    comments.push({
      id: commentIdCounter++,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message,
      name: getRandomArrayElement(NAMES)
    });
  }
  return comments;
}

function createPhotoDescription(index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: generateComments()
  };
}

function generatePhotos() {
  return Array.from({ length: 25 }, (_, i) => createPhotoDescription(i + 1));
}

const photos = generatePhotos();

// eslint-disable-next-line no-console
console.log(photos);
