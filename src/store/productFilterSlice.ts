import { createSlice } from "@reduxjs/toolkit"


interface Filter {
    cache: [],
    searchValue: string,
    minPriceValue: number | undefined,
    maxPriceValue: number | undefined
}

const initialState: Filter = {
    cache: [],
    searchValue: "",
    minPriceValue: undefined,
    maxPriceValue: undefined
}

const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState: initialState,
    reducers: {
        updateCache(state, action) {
            state.cache = action.payload
            console.log(action.payload)
        },
        updateSearchValue(state, action) {
            state.searchValue = action.payload
        },
        updateMinPriceValue(state, action) {
            state.minPriceValue = action.payload
        },
        updateMaxPriceValue(state, action) {
            state.maxPriceValue = action.payload
        },
    }
})

export const { updateCache, updateSearchValue, updateMinPriceValue, updateMaxPriceValue } = productFilterSlice.actions

export default productFilterSlice.reducer