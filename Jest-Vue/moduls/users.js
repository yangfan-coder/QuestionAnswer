/*
 * @Author       : 原始登录 【不用真实的请求接口、等待接口的返回、本地的mock数据就可以进行验证、前提是跟服务器约定好】
 * @Date         : 2022-03-02 19:34:12
 * @LastEditTime : 2022-03-04 14:57:07
 * @FilePath     : /examples3/moduls/users.js
 * @developer    : yangfan36
 */

// 参考链接：< https://jestjs.io/zh-Hans/docs/manual-mocks#mocking-user-modules >
import axios from 'axios';

class Users {
  static all() {
    // return axios.get('http://127.0.0.1:3000/user').then(resp => resp.data);
    return axios.get('http://127.0.0.1:3000/user').then(resp => {
      return resp
    });
  }
}

export default Users;