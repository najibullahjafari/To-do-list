import './style.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus as a,
  faTrashAlt as b,
  faArrowAltCircleRight as c,
  faEdit as d,
  faSave as e,
  faCheck as f,
  faTrash as g,
  faSort as h,
} from '@fortawesome/free-solid-svg-icons';
import updateStatus from './modules/statusUpdates';
import Functions from './modules/functions';

library.add(
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
);
dom.watch();
