import defaultImage from '../assets/default.jpg';


interface Product {
    pk: number,
    title: string,
    file_extension: 'jpg' | 'png',
    price: number,
    cnt: number,
    status: 'A' | 'N',
    type: 'frames' | 'sunglasses' | 'lenses',
    param_sex?: string,
    param_material?: string,
    param_type?: string,
    param_color?: string,
    param_form?: string,
    param_time?: string,
    param_brand: string,
    last_modified: string,
    image: string
}

interface Response {
    orderID: number,
    products: Product[]
}

const defaultProduct = (id: number): Product => {
    return {
        pk: id,
        title: `Базовые очки ${id}`,
        file_extension: 'jpg',
        price: id * 1000,
        cnt: id,
        status: 'A',
        type: 'frames',
        param_sex: "мужские",
        param_material: "пластик",
        param_type: "ободковая",
        param_color: "зелёный",
        param_form: "круглые",
        param_brand: "top market",
        last_modified: "today",
        image: defaultImage
    }
}

const getDefaultProductList = (count: number, searchValue: string, minPriceValue: number | undefined, maxPriceValue: number | undefined): Product[] => {
    let result = []
    for (let i = 1; i <= count; ++i) {
        result.push(defaultProduct(i))
    }
    result = result.filter((product) => {
        return (!minPriceValue || product.price >= minPriceValue) && (!maxPriceValue || product.price <= maxPriceValue) && (searchValue == '' || product.title.toLowerCase().includes(searchValue.toLowerCase()))
    })
    return result
}

export const getDefaultResponse = (count: number, searchValue: string, minPriceValue: number | undefined, maxPriceValue: number | undefined): Response => {
    return {
        orderID: -1,
        products: getDefaultProductList(count, searchValue, minPriceValue, maxPriceValue)
    }
}