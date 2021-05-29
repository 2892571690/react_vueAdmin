/**
 * index.js
 * api地址管理
 * 第四位参数：当前的请求是否需要loading
 */
import request from './request';

// 登录
export const reqLogin = (data) => request('/login', data, 'POST');

// 获取左侧菜单栏
export const reqMenus = (data) => request('/menus', data, 'GET');
