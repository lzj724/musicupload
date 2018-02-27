import * as types from './mutation-type'

export default {
    [types.GET_USERNAME](state,str){
        state.username = str
    }
}