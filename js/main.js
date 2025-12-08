import { generatePhotos } from './photo-generator.js';
import { renderThumbnails } from './thumbnail.js';

const pictures = generatePhotos();
renderThumbnails(pictures);

