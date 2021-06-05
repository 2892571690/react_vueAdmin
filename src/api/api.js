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

// 获取用户列表数据
export const reqUserList = (data) => request('/users', data, 'GET');

// 修改用户状态
export const reqUserStatus = (data) => request(`/users/${data.uId}/state/${data.type}`, data, 'PUT');

// 获取用户列表数据
export const reqAddUser = (data) => request('/users', data, 'POST');