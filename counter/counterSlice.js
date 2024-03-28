import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        account: {}
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = { ...action.payload }
            // console.log(state.account)
        },
    }
})

// Action creators are generated for each case reducer function
export const { setAccount } = counterSlice.actions

export default counterSlice.reducer