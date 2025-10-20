const NAMES = [
  'Артём', 'Мария', 'Иван', 'Анна', 'Дмитрий',
  'Елена', 'Сергей', 'Ольга', 'Алексей', 'Наталья',
  'Павел', 'Юлия', 'Михаил', 'Екатерина', 'Андрей'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Прекрасный закат на море',
  'Горный пейзаж в утреннем тумане',
  'Улочки старого города',
  'Кофе и книга в уютном кафе',
  'Прогулка по осеннему парку',
  'Архитектура современного мегаполиса',
  'Цветущий сад весной',
  'Ночной город с высоты птичьего полёта',
  'Путешествие по неизведанным тропам',
  'Моменты счастливой жизни',
  'Удивительные формы природы',
  'Искусство в повседневности',
  'Вкусные блюда домашней кухни',
  'Спортивные достижения и тренировки',
  'Творческие проекты и хобби',
  'Встреча с друзьями',
  'Пушистые питомцы и их проделки',
  'Уютные вечера дома',
  'Приключения в новых местах',
  'Красота в мелочах',
  'Вдохновляющие пейзажи',
  'Моменты тишины и спокойствия',
  'Яркие краски лета',
  'Зимняя сказка за окном',
  'Магия золотой осени'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = (index) => {
  const photoId = index + 1;
  const commentsCount = getRandomInteger(0, 30);

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTIONS[index],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: commentsCount}, createComment)
  };
};

const generatePhotos = () => Array.from({length: 25}, (_, index) => createPhoto(index));

export { generatePhotos, getRandomInteger, getRandomArrayElement };
