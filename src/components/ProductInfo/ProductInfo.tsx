import { FC } from 'react'
import './ProductInfo.css'

export interface Param {
    key: string,
    value: string
}

interface Props {
    pk: Number,
    title: string,
    price: Number,
    cnt: Number,
    parameters: Param[],
    image: string
}

// "data:image/jpeg;base64,"+
const ProductInfo: FC<Props> = ({pk, title, price, cnt, parameters, image}) => (
    <div className="product">
        <div className="product-info" key={pk.toString()}>
            <h4 className="product-title">{title}</h4>
            <div className="product-image-wrap">
                <img src={image} alt="картинка" className="product-image" />
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
            {cnt != 0 ? <button className="product-to-cart-green" type="button">В корзину</button> : <span className="product-to-cart-grey">В корзину</span>}
        </div>
    </div>
)

export default ProductInfo