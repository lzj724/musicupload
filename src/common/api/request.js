import Vue from 'vue'
import axios from 'axios'
import {
    login,
    register,
    userinfo,
    check,
    upload,
} from './requestBase'
import qs from 'qs'
var get = { 'Content-type': 'application/x-www-form-urlencoded' }
var postdata = { "Content-Type": "mutipart/form-data" }
export default {
    login(user, token) {
        return axios.post(login, qs.stringify(user), {
            headers: {
                'Content-type': get['Content-type'],
                Authorization: "Bearer " + token
            },
        })
    },
    register(user) {
        return axios.post(register, qs.stringify(user), {
            headers: get
        })
    },
    upload(formdata, token) {
        return axios.post(upload, formdata, {
            headers: {
                'Content-type': postdata['Content-type'],
                Authorization: "Bearer " + token
            },
        })
    },
    userinfo(username, token) {
        return axios.post(userinfo, qs.stringify({
            user: username
        }), {
                headers: {
                    'Content-type': get['Content-type'],
                    Authorization: "Bearer " + token
                },
            })
    },
    check(token) {
        return axios.post(check, {}, {
            headers: {
                'Content-type': get['Content-type'],
                Authorization: "Bearer " + token
            }
        })
    },
}