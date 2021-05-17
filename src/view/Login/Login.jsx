import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from '../../api/api';
import Myuser from '../../utils/user';
import storeUtil from '../../utils/store';
import { USER } from '../../utils/content';

import './Login.less';
import login_img from './login.png';

export default class Login extends Component {
	formRef = React.createRef();

	render() {
		const storeUser = storeUtil.getStore(USER)
		console.log(storeUser)
		if(storeUser.id){
			return <Redirect to='/'/>
		}

		return (
			<div className="login_container">
				<div className="login_form">
					<div className="login_images">
						<img src={login_img} alt="login_img" />
					</div>
					<Form name="normal_login" className="login-form" ref={this.formRef} onFinish={this.onFinish}>
						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: '请输入用户名!'
								}
							]}
						>
							<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: '请输入密码!'
								}
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
							/>
						</Form.Item>
						<Form.Item>
							<Button
								style={{ marginRight: '20px' }}
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								登录
							</Button>
							<Button htmlType="button" onClick={this.onReset}>
								重置
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}

	// 登录
	onFinish = async (value) => {
		const res = await reqLogin({ ...value });
		Myuser.user = res;
		storeUtil.setStore(USER, res);
		this.props.history.replace('/');
	};
	// 重置
	onReset = () => {
		this.formRef.current.resetFields();
	};
}
