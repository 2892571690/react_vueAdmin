/*
    进行localStorage数据储存模块
*/
import store from 'store';
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // 储存localStorage
    setStore(name, value) {
        store.set(name, value)
    },
    // 获取localStorage
    getStore(name) {
        return store.get(name) || {}
    },
    // 删除
    cleStore(name) {
        store.remove(name)
    }
}