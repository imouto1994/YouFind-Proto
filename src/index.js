import 'babel-polyfill';
import { render } from 'react-dom';

import routes from './routes';

const rootElement = document.getElementById('app');

render(routes, rootElement);
