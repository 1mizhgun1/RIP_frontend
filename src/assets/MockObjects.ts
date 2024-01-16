import image_1 from '../assets/1.jpg';
import image_2 from '../assets/2.jpg';
import image_3 from '../assets/3.jpg';


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
    order: number,
    products: Product[]
}

const defaultProduct_1 = (): Product => {
    return {
        pk: 1,
        title: `Оправа для очков`,
        file_extension: 'jpg',
        price: 9000,
        cnt: 5,
        status: 'A',
        type: 'frames',
        param_sex: "мужская",
        param_material: "пластик",
        param_type: "ободковая",
        param_color: "зелёный",
        param_form: "круглые",
        param_brand: "top market",
        last_modified: "today",
        image: image_1
    }
}

const defaultProduct_2 = (): Product => {
    return {
        pk: 2,
        title: `Солнцезащитные очки`,
        file_extension: 'jpg',
        price: 4500,
        cnt: 3,
        status: 'A',
        type: 'sunglasses',
        param_sex: "детские",
        param_material: "пластик",
        param_type: "ободковая",
        param_color: "зелёный",
        param_form: "круглые",
        param_brand: "top market",
        last_modified: "today",
        image: image_2,
    }
}

const defaultProduct_3 = (): Product => {
    return {
        pk: 3,
        title: `Контактные линзы`,
        file_extension: 'jpg',
        price: 1800,
        cnt: 14,
        status: 'A',
        type: 'lenses',
        param_time: "3 месяца",
        param_brand: "top market",
        last_modified: "today",
        image: image_3,
    }
}

const getDefaultProductList = (searchValue: string, minPriceValue: number | undefined, maxPriceValue: number | undefined): Product[] => {
    let result = [defaultProduct_1(), defaultProduct_2(), defaultProduct_3()]
    result = result.filter((product) => {
        return (!minPriceValue || product.price >= minPriceValue) && (!maxPriceValue || product.price <= maxPriceValue) && (searchValue == '' || product.title.toLowerCase().includes(searchValue.toLowerCase()))
    })
    return result
}

export const getDefaultProduct = (id: number) => {
    if (id == 1) {
        return defaultProduct_1()
    } else if (id == 2) {
        return defaultProduct_2()
    } else {
        return defaultProduct_3()
    }
}

export const getDefaultResponse = (searchValue: string, minPriceValue: number | undefined, maxPriceValue: number | undefined): Response => {
    return {
        order: -1,
        products: getDefaultProductList(searchValue, minPriceValue, maxPriceValue)
    }
}