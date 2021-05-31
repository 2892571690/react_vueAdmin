import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

import storeUtil from '../../../utils/store';
import { CURRENTMENU, FACURRENTMENU } from '../../../utils/content';

export default class Users extends Component {
	render() {
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item onClick={this.ItemClick} style={{cursor:'pointer'}}>首页</Breadcrumb.Item>
					<Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户列表</Breadcrumb.Item>
				</Breadcrumb>,
			</div>
		);
	}
    
    // 点击面包屑的首页
    ItemClick=(e)=>{
        storeUtil.cleStore(FACURRENTMENU);
		storeUtil.cleStore(CURRENTMENU);
        this.props.history.push('/home/index')
    }
}
