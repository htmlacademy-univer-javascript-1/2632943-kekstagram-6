import { renderThumbnails } from './thumbnail.js';
import { getData } from './api.js';
import { initFilter } from './filter.js';
import { showAlert } from './util.js';
import './form.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilter(pictures, renderThumbnails);
  })
  .catch((err) => {
    showAlert(err.message);
  });

