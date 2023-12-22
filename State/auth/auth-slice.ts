import {createSlice} from "@reduxjs/toolkit"

export interface Auth{
    auth: {
        username: string;
        address: string;
    }
}
const initialState = {
    auth:{
        username: "",
        address: ""
    }
}
const authReducer = createSlice({
    name: "reducer",
    initialState,
    reducers:{
        getAuthData: (state: Auth, action) => {
            state.auth = action.payload
        },
    },
})
export const {getAuthData} = authReducer.actions
export default authReducer.reducer 