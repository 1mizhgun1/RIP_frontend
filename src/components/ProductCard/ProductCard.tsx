import { FC } from 'react';
import { Card } from 'react-bootstrap';

import './ProductCard.css';
import ImageWrapper from '../ImageWrapper/ImageWrapper';


export interface ProductCardData {
    pk: number,
    title: string,
    price: number,
    image: string,
    cnt: number
}

const ProductCard: FC<ProductCardData> = ({ pk, title, price, image, cnt }) => (
    <Card className="card">
        <div className="cardImageWrap"><a href={"/products/" + pk.toString()}><ImageWrapper className="cardImage" src={image} based="/default.jpg" /></a></div>
        <div className="cardTitleWrap"><a href={"/products/" + pk.toString()}><Card.Title className="cardTitle">{title}</Card.Title></a></div>
        <Card.Text className="cardPrice">{price.toString()+" ₽"}</Card.Text>
        {cnt != 0 ? <h4 className="cardStatusGreen">в наличии</h4> : <h4 className="cardStatusRed">раскупили</h4>}
    </Card>
)

export default ProductCard