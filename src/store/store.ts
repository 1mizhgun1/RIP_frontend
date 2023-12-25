import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productFilterReducer from "./productFilterSlice"

export default configureStore({
    reducer: {
        productFilter: productFilterReducer,
        user: authReducer,
    }
})