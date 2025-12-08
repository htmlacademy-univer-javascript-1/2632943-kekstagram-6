import { generatePhotos } from './photo-generator.js';
import { renderThumbnails } from './thumbnail.js';
import './form.js';

const pictures = generatePhotos();
renderThumbnails(pictures);

