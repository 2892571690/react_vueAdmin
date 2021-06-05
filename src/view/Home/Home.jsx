import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Myuser from '../../utils/user';
import storeUtil from '../../utils/store';
import { USER, CURRENTMENU, FACURRENTMENU,ICONFONTURL } from '../../utils/content';
import { reqMenus } from '../../api/api';

import { Layout, Button, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, createFromIconfontCN } from '@ant-design/icons';

import loginImg from './login.png';
import './Home.less';

import Users from './Users/Users';
import Index from './Index/Index';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const IconFont = createFromIconfontCN({
	scriptUrl: ICONFONTURL
});

export default class Home extends Component {
	state = {
		collapsed: false,
		menusList: [], //左侧菜单列表
		menusIconList: {
			'125': 'icon-user',
			'103': 'icon-zhangshangcaifuyemianshoujiban345',
			'101': 'icon-shangpin',
			'102': 'icon-dingdan',
			'145': 'icon-shuju'
		},
		openKeys: [], //当前打开的侧边栏
	};
	UNSAFE_componentWillMount() {
		// 判断当前的路由路径是不是在index上，如果在把侧边栏打开的数据清除，让他关闭
		if (this.props.history.location.pathname === '/home/index' || this.props.history.location.pathname === '/') {
			storeUtil.cleStore(FACURRENTMENU);
			storeUtil.cleStore(CURRENTMENU);
			this.setState({
				openKeys: []
			});
		} else {
			// 当页面刷新的时候，从缓存中取出之前点击的侧边栏出局，打开其他侧边栏，关起之前的侧边栏
			this.setState({
				openKeys: [
					typeof storeUtil.getStore(FACURRENTMENU) == 'string' ? storeUtil.getStore(FACURRENTMENU) : ''
				]
			});
		}
	}
	componentDidMount() {
		this.getMenusList();
	}
	render() {
		const { menusList, collapsed, menusIconList, openKeys } = this.state;
		// 判断有没有用户信息
		const { user } = Myuser;
		if (!user || !user.id) {
			return <Redirect to="/login" />;
		}
		// 获取当前点击的子侧边栏
		let currentMenu = storeUtil.getStore(CURRENTMENU).id ? storeUtil.getStore(CURRENTMENU) : '';
		// 获取当前点击的父侧边栏
		let faCurrentMenu = typeof storeUtil.getStore(FACURRENTMENU) == 'string' ? storeUtil.getStore(FACURRENTMENU) : '';
		return (
			<Layout style={{ height: '100%' }}>
				<Header className="header_wrap" style={{ height: '80px' }}>
					<div className="title_wrap">
						<img src={loginImg} alt="" />
						<div className="title">泽辰后台管理系统</div>
					</div>
					<Button onClick={this.outUser} type="primary" className="out_wrap">
						退出
					</Button>
				</Header>
				<Layout>
					<Sider trigger={null} collapsible collapsed={collapsed}>
						<Button
							type="primary"
							onClick={this.toggleCollapsed}
							style={{ width: '100%', background: '#0c0c0c', borderColor: '#0c0c0c' }}
						>
							{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
						</Button>
						<Menu
							selectedKeys={[currentMenu.path]}
							defaultOpenKeys={[ faCurrentMenu ]}
							onOpenChange={this.onOpenChange}
							mode="inline"
							theme="dark"
							openKeys={openKeys}
						>
							{menusList.map((item, index) => {
								return (
									<SubMenu
										key={item.path}
										icon={<IconFont type={menusIconList[item.id]} />}
										title={item.authName}
									>
										{item.children.map((itemc) => {
											return (
												<Menu.Item key={itemc.path} onClick={this.menuClick(itemc)}>
													{itemc.authName}
												</Menu.Item>
											);
										})}
									</SubMenu>
								);
							})}
						</Menu>
					</Sider>
					<Content>
						<Switch>
							<Route path="/home/index" component={Index} />
							<Route path="/home/users" component={Users} />
							<Redirect to="/home/index" />
						</Switch>
					</Content>
				</Layout>
			</Layout>
		);
	}

	// 退出登录
	outUser = () => {
		storeUtil.clearAll();
		this.props.history.replace('/login');
	};

	// 点击收缩菜单栏
	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	// 请求菜单栏的数据
	getMenusList = async () => {
		const res = await reqMenus({});
		console.log(res);
		this.setState({ menusList: res });
	};

	//点击子菜单栏，储存
	menuClick = (itemc) => {
		const { menusList } = this.state;
		return () => {
			console.log(itemc);
			storeUtil.setStore(CURRENTMENU, itemc);
			let faMenu = '';
			console.log(menusList);
			menusList.map((item) => {
				item.children.find((itemx) => {
					const chItem = itemx.path === itemc.path ? itemx : '';
					const faItem = itemx.path === chItem.path ? item : '';
					if (faItem) {
						faMenu = faItem.path;
					}
				});
			});
			storeUtil.setStore(FACURRENTMENU, faMenu);
			this.props.history.push(`/home/${itemc.path}`);
		};
	};

	// 点击菜单，收起其他展开的所有菜单
	onOpenChange = (keys) => {
		const { openKeys, menusList } = this.state;
		const rootSubmenuKeys = menusList.map((item) => item.path);
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys: keys });
		} else {
			this.setState({ openKeys: latestOpenKey ? [ latestOpenKey ] : [] });
		}
		console.log(openKeys);
	};
}
