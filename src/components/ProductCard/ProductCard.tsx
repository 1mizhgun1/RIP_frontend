import { FC } from 'react'
import { Card } from 'react-bootstrap'
import './ProductCard.css'

interface Props {
    pk: Number,
    title: string,
    price: Number,
    image: string,
    cnt: Number
}

// "data:image/jpeg;base64,"+
const ProductCard: FC<Props> = ({ pk, title, price, image, cnt }) => (
    <Card className="card">
        <div className="cardImageWrap"><a href={"products/" + pk.toString()}><Card.Img className="cardImage" src={image} height={100} width={100} /></a></div>
        <div className="cardTitleWrap"><a href={"products/" + pk.toString()}><Card.Title className="cardTitle">{title}</Card.Title></a></div>
        <Card.Text className="cardPrice">{price.toString()+" ₽"}</Card.Text>
        {cnt != 0 ? <h4 className="cardStatusGreen">в наличии</h4> : <h4 className="cardStatusRed">раскупили</h4>}
    </Card>
)

export default ProductCard