import { FC } from 'react'
import { useAuth } from "../../hooks/useAuth";
import { useSsid } from '../../hooks/useSsid';
import axios from "axios";

import './ProductInfo.css'
import ImageWrapper from '../ImageWrapper/ImageWrapper';


export interface Param {
    key: string,
    value: string
}

interface Props {
    pk: number,
    title: string,
    price: number,
    cnt: number,
    parameters: Param[],
    image: string
}

const ProductInfo: FC<Props> = ({pk, title, price, cnt, parameters, image }) => {
    const { session_id } = useSsid()
    const { is_authenticated, is_moderator } = useAuth()

    const addToCart = async (product_id: number) => {
        await axios(`http://localhost:8080/products/${product_id}/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })
    }

    return (
        <div className="product">
            <div className="product-info" key={pk.toString()}>
                <h4 className="product-title">{title}</h4>
                <div className="product-image-wrap">
                    <ImageWrapper className="product-image" src={image} based="/default.jpg" />
                </div>
                <input type="radio" name="radio" id="product-params" defaultChecked />
                <input type="radio" name="radio" id="product-reviews" />
                <div className="product-bar">
                    <label htmlFor="product-params" className="product-params-text">Характеристики</label>
                    <label htmlFor="product-reviews" className="product-reviews-text">Отзывы о товаре</label>
                </div>
                <table className="product-params">
                    {parameters && parameters.map((param) => (
                        param.value && <tr className="product-param">
                        <td className="property-key">
                            <h4 className="property-key-text">{param.key}</h4>
                            <h4 className="property-key-dots"></h4>
                        </td>
                        <td className="property-value">{param.value}</td>
                    </tr>
                    ))}
                </table>
                <div className="product-reviews">
                    Здесь будут отзывы
                </div>
            </div>
            <div className="product-price-card">
                {cnt != 0 ? <h4 className="product-status-green">в наличии</h4> : <h4 className="product-status-red">раскупили</h4>}
                <div className="product-price-block">
                    <h4 className="product-price-text">Цена:</h4>
                    <h4 className="product-price">{price.toString()+" ₽"}</h4>
                </div>
                {!is_moderator && cnt != 0 && is_authenticated ? <button className="product-to-cart-green" type="button" onClick={ () => addToCart(pk) }>В корзину</button> : <button className="product-to-cart-grey" type="button">В корзину</button>}
                {!is_authenticated  && <h5 className="help-text">Авторизуйтесь, чтобы использовать корзину</h5>}
            </div>
        </div>
    )
}

export default ProductInfo