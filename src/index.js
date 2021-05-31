import react from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import storeUtil from './utils/store';
import Myuser from './utils/user';
import { USER } from './utils/content';

const user = storeUtil.getStore(USER);
console.log(user);
Myuser.user = user;

ReactDOM.render(<App />, document.getElementById('root'));
