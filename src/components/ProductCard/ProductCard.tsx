import { FC } from 'react';
import { Card } from 'react-bootstrap';

import './ProductCard.css';
import ImageWrapper from '../ImageWrapper/ImageWrapper';
import { Link } from 'react-router-dom';


export interface ProductCardData {
    pk: number,
    title: string,
    price: number,
    image: string,
    cnt: number
}

const ProductCard: FC<ProductCardData> = ({ pk, title, price, image, cnt }) => (
    <Card className="card">
        <div className="cardImageWrap"><Link to={"/products/" + pk.toString()}><ImageWrapper className="cardImage" src={image} based="/default.jpg" /></Link></div>
        <div className="cardTitleWrap"><Link to={"/products/" + pk.toString()}><Card.Title className="cardTitle">{title}</Card.Title></Link></div>
        <Card.Text className="cardPrice">{price.toString()+" ₽"}</Card.Text>
        {cnt != 0 ? <h4 className="cardStatusGreen">в наличии</h4> : <h4 className="cardStatusRed">раскупили</h4>}
    </Card>
)

export default ProductCard