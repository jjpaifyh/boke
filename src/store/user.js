export const user= {
    state:()=>({
        user:{}
    }),
    getters: {
    },
    mutations: {
        userloig(state, user) {
            state.user = user
        },
    },
    actions: {
        // userloig({state,data}){
        //     state.commit('userloig',data)
        // }
    }
}
//  user