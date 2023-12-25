import { createSlice } from "@reduxjs/toolkit"

interface Filter {
    searchValue: string,
    minPriceValue: number | undefined,
    maxPriceValue: number | undefined
}

const initialState: Filter = {
    searchValue: "",
    minPriceValue: undefined,
    maxPriceValue: undefined
}

const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState: initialState,
    reducers: {
        updateSearchValue(state, action) {
            state.searchValue = action.payload
        },
        updateMinPriceValue(state, action) {
            state.minPriceValue = action.payload
        },
        updateMaxPriceValue(state, action) {
            state.maxPriceValue = action.payload
        },
        cleanValues(state) {
            state.searchValue = ""
            state.minPriceValue = undefined
            state.maxPriceValue = undefined
        }
    }
})

export const { updateSearchValue, updateMinPriceValue, updateMaxPriceValue, cleanValues } = productFilterSlice.actions
export default productFilterSlice.reducer