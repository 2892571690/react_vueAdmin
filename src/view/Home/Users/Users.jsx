import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Card, Input, Button, Table, Switch, Modal, Form } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import storeUtil from '../../../utils/store';
import { CURRENTMENU, FACURRENTMENU, ICONFONTURL } from '../../../utils/content';

import { reqUserList, reqUserStatus,reqAddUser } from '../../../api/api';

import './Users.less';

const IconFont = createFromIconfontCN({
	scriptUrl: ICONFONTURL
});
const emailRules = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
const mobileRules = /^[1][3,4,5,7,8,9][0-9]{9}$/;
export default class Users extends Component {
	form = React.createRef();

	state = {
		data: [], //用户列表数据
		total: 0, //总数量
		pagenum: 1, //当前页数
		pagesize: 5, //当前页数显示多少个
		userValue: '', //搜索的内容
		isModalVisible: false
	};

	componentDidMount() {
		this.getUserList();
	}

	render() {
		const { data, total, isModalVisible } = this.state;
		const columns = [
			{
				title: '#',
				width: 50,
				align: 'center',
				render: (text, item, index) => {
					return index + 1;
				}
			},
			{
				title: '姓名',
				dataIndex: 'username',
				align: 'center'
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				align: 'center'
			},
			{
				title: '电话',
				dataIndex: 'mobile',
				align: 'center'
			},
			{
				title: '角色',
				dataIndex: 'role_name',
				align: 'center'
			},
			{
				title: '状态',
				align: 'center',
				render: (text, item, index) => {
					return <Switch checked={item.mg_state} onChange={this.onChangeSwitch(item)} />;
				}
			},
			{
				title: '操作',
				align: 'center',
				width: 250,
				render: (text, item, index) => {
					return (
						<div>
							<Button style={{ width: '50px' }} type="primary" icon={<IconFont type="icon-bi" />} />
							<Button
								style={{
									width: '50px',
									margin: '0 10px',
									background: '#ce2929',
									borderColor: '#ce2929'
								}}
								type="primary"
								icon={<IconFont type="icon-shanchu1" />}
							/>
							<Button
								style={{ width: '50px', background: '#f17d3a', borderColor: '#f17d3a' }}
								type="primary"
								icon={<IconFont type="icon-shezhi" />}
							/>
						</div>
					);
				}
			}
		];
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item onClick={this.ItemClick} style={{ cursor: 'pointer' }}>
						首页
					</Breadcrumb.Item>
					<Breadcrumb.Item>用户管理</Breadcrumb.Item>
					<Breadcrumb.Item>用户列表</Breadcrumb.Item>
				</Breadcrumb>
				<Card style={{ marginTop: '20px' }}>
					<div className="card_input_header">
						<Input.Group compact>
							<Input.Search
								allowClear
								style={{ width: '90%' }}
								placeholder="请输入需要查询的内容"
								onSearch={this.userValueSearch}
							/>
						</Input.Group>
						<Button
							type="primary"
							onClick={() => {
								this.setState({ isModalVisible: true });
							}}
						>
							添加
						</Button>
					</div>
					<Table
						columns={columns}
						dataSource={data}
						bordered
						rowKey={(data) => data.id}
						pagination={{
							defaultPageSize: 5, //默认的每页条数
							showQuickJumper: true, //是否可以快速跳转至某页
							showSizeChanger: true, //是否展示 pageSize 切换器
							total: total, //数据总数
							onChange: this.clickPageNum, //页码或 pageSize 改变的回调
							onShowSizeChange: this.clickPageSize, //pageSize 变化的回调
							showTotal: (total) => <div style={{ margin: '0 20px 0 0' }}>总数: {total}</div>, //	用于显示数据总量和当前数据顺序
							pageSizeOptions: [ 5, 10, 15 ] //指定每页可以显示多少条
						}}
					/>
				</Card>
				<Modal
					title="添加用户"
					destroyOnClose
					visible={isModalVisible}
					onOk={this.handleOk}
					onCancel={() => {
						this.setState({ isModalVisible: false });
					}}
				>
					<Form ref={this.form} name="basic" labelCol={{ span: 4 }}>
						<Form.Item label="用户名" name="username" rules={[ { required: true, message: '用户名不能为空!' } ]}>
							<Input placeholder="请输入用户名" />
						</Form.Item>
						<Form.Item label="密码" name="password" rules={[ { required: true, message: '密码不能为空!' } ]}>
							<Input placeholder="请输入密码" />
						</Form.Item>
						<Form.Item
							label="邮箱"
							name="email"
							rules={[
								{ required: true, message: '密码不能为空!' },
								{
									validator: (rule, value, callback) => {
										if (!value || emailRules.test(value)) {
											callback();
										} else {
											callback('请输入正确的邮箱');
										}
									}
								}
							]}
						>
							<Input placeholder="请输入邮箱" />
						</Form.Item>
						<Form.Item
							label="手机"
							name="mobile"
							rules={[
								{ required: true, message: '手机号不能为空!' },
								{
									validator: (rule, value, callback) => {
										if (!value || mobileRules.test(value)) {
											callback();
										} else {
											callback('请输入正确的手机号');
										}
									}
								}
							]}
						>
							<Input placeholder="请输入手机" />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}

	// 点击面包屑的首页
	ItemClick = (e) => {
		storeUtil.cleStore(FACURRENTMENU);
		storeUtil.cleStore(CURRENTMENU);
		this.props.history.push('/home/index');
	};

	// 获取用户列表数据
	getUserList = async () => {
		const res = await reqUserList({
			query: this.state.userValue,
			pagenum: this.state.pagenum,
			pagesize: this.state.pagesize
		});
		console.log(res);
		this.setState({
			data: res.users,
			total: res.total
		});
	};

	// 更新状态栏
	onChangeSwitch = (item) => {
		return async () => {
			const res = await reqUserStatus({
				uId: item.id,
				type: !item.mg_state
			});
			let newData = this.state.data.map((item) => {
				if (item.id === res.id) {
					item.mg_state = res.mg_state;
				}
				return item;
			});
			this.setState({
				data: newData
			});
		};
	};

	// 当前页数变化
	clickPageNum = (page) => {
		console.log(page);
		this.setState(
			{
				pagenum: page
			},
			() => {
				this.getUserList();
			}
		);
	};

	// 修改当前页面显示的数量
	clickPageSize = (current, size) => {
		this.setState(
			{
				pagesize: size
			},
			() => {
				this.getUserList();
			}
		);
	};

	// 点击搜索
	userValueSearch = (value) => {
		console.log(value);
		this.setState(
			{
				userValue: value
			},
			() => {
				this.getUserList();
			}
		);
	};

	// 弹出框点击确定
	handleOk = () => {
		this.form.current.validateFields().then(async (value) => {
			console.log(value);
			const res = await reqAddUser({
				username:value.username,
				password:value.password,
				email:value.email,
				mobile:value.mobile,
			})
			console.log(res)
			this.setState({
				data:[...this.state.data,{...res,role_name:'超级管理员'}],
				isModalVisible:false,
			})
			
		});
	};
}
