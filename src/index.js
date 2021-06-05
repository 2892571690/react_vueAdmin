import react from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App';

import storeUtil from './utils/store';
import Myuser from './utils/user';
import { USER } from './utils/content';

const user = storeUtil.getStore(USER);
console.log(user);
Myuser.user = user;

ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<App />
	</ConfigProvider>,
	document.getElementById('root')
);
