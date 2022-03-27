/*
 * @Author       : axios.js
 * @Date         : 2022-03-02 20:45:36
 * @LastEditTime : 2022-03-04 19:21:23
 * @FilePath     : /Jest-Vue/moduls/__mocks__/users.js
 * @developer    : yangfan36
 */
// axios.js

export default {
  all(){
    return new Promise(function(resolve){
        resolve({
          "data":{
            "data":{
              "name":"test",
              "age":"1811"
            }
          }
        })
      })
  }
}