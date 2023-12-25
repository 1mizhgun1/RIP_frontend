import { useDispatch, useSelector } from 'react-redux';
import { updateCache, updateSearchValue, updateMinPriceValue, updateMaxPriceValue } from "../store//productFilterSlice";


export function useProductFilter() {
    //@ts-ignore
    const cache = useSelector(state => state.productFilter.cache)
    //@ts-ignore
    const searchValue = useSelector(state => state.productFilter.searchValue)
    //@ts-ignore
    const minPriceValue = useSelector(state => state.productFilter.minPriceValue)
    //@ts-ignore
    const maxPriceValue = useSelector(state => state.productFilter.maxPriceValue)

    const dispatch = useDispatch()

    const setCache = (value: any) => {
        dispatch(updateCache(value))
    }

    const setSearchValue = (value: any) => {
        dispatch(updateSearchValue(value))
    }

    const setMinPriceValue = (value: any) => {
        dispatch(updateMinPriceValue(value))
    }

    const setMaxPriceValue = (value: any) => {
        dispatch(updateMaxPriceValue(value))
    }

    return {
        cache,
        searchValue,
        minPriceValue,
        maxPriceValue,
        setCache,
        setSearchValue,
        setMinPriceValue,
        setMaxPriceValue
    }
}