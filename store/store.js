import { configureStore } from '@reduxjs/toolkit'
import account from '../counter/counterSlice'

export default configureStore({
    reducer: {
        counter: account
    }
})