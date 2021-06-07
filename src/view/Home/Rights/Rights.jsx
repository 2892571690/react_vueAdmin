import React, { Component } from 'react';

import { Breadcrumb, Card, Table,Tag } from 'antd';

import storeUtil from '../../../utils/store';
import { CURRENTMENU, FACURRENTMENU } from '../../../utils/content';
import { reqRightsList } from '../../../api/api';
export default class Rights extends Component {
	state = {
		data: [], //数据
		total: 0 //总数
	};
	componentDidMount() {
		this.getRightsList();
	}
	render() {
		const { data, total } = this.state;
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
				title: '权限名称',
				dataIndex: 'authName',
				align: 'center'
			},
			{
				title: '路径',
				dataIndex: 'path',
				align: 'center'
			},
			{
				title: '权限等级',
				// dataIndex: 'level',
				align: 'center',
                render: (text, item, index) => {
					return item.level === '0' ? <Tag color="green">0级</Tag> : item.level === '1' ? <Tag color="orange">1级</Tag> : <Tag color="magenta">2级</Tag>
				}
			}
		];
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item onClick={this.ItemClick} style={{ cursor: 'pointer' }}>
						首页
					</Breadcrumb.Item>
					<Breadcrumb.Item>权限管理</Breadcrumb.Item>
					<Breadcrumb.Item>权限列表</Breadcrumb.Item>
				</Breadcrumb>
				<Card style={{ marginTop: '20px' }}>
					<Table
						columns={columns}
						dataSource={data}
						bordered
						rowKey={(data) => data.id}
						pagination={{
							defaultPageSize: 10, //默认的每页条数
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
			</div>
		);
	}

	// 点击面包屑的首页
	ItemClick = (e) => {
		storeUtil.cleStore(FACURRENTMENU);
		storeUtil.cleStore(CURRENTMENU);
		this.props.history.push('/home/index');
	};

	// 获取数据
	getRightsList = async () => {
		const res = await reqRightsList('list', {});
		console.log(res);
        this.setState({
            data:res
        })
	};
}
