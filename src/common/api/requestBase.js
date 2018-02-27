import {root_url} from './url'

var config = {
    login:'/login',
    register:'/regist',
    userinfo:'/userInfo',
    check:'/check',
    upload:'/upload'
}

export const login    = root_url.concat(config.login)
export const register = root_url.concat(config.register)
export const userinfo = root_url.concat(config.userinfo)
export const check    = root_url.concat(config.check)
export const upload   = root_url.concat(config.upload)