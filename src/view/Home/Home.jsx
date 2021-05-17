import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import Myuser from '../../utils/user'
import storeUtil from '../../utils/store'
import {USER} from '../../utils/content'

export default class Home extends Component {
    render() {
        const {user} = Myuser
        if(!user || !user.id){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <div onClick={this.outUser}>退出</div>
            </div>
        )
    }

    // 退出登录
    outUser=()=>{
        storeUtil.cleStore(USER)
        this.props.history.replace('/login');
    }
}
