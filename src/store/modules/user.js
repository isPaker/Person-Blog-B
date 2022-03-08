import { loginApi, getInfoApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    users: null,  //用户信息
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USER: (state, payload) => {
    state.users = payload;
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject)=>{
      loginApi(userInfo).then((res)=>{
        const {data} = res;
        if(data){
          // data有数据
          commit("SET_USER", data);
          resolve();
        }else{
          reject(res)
        }
      }).catch(err => {
        reject(err);
      })
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfoApi().then(res => {

        if(typeof res === "string") {
          res = JSON.parse(res);
          if(res.code === 401){
            reject(res.msg)
          }
        }else{
          //有token，将用户信息放入仓库
          commit("SET_USER", res.data);
          resolve();
        }
      })
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

