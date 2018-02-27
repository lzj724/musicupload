import * as types from './mutation-type'
export default {
    getUsername({commit},str){
        commit(types.GET_USERNAME,str)
    }
}