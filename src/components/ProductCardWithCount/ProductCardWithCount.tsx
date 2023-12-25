import { FC, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSsid } from '../../hooks/useSsid';

import axios from 'axios';

import './ProductCardWithCount.css';


export interface ProductCardData {
    pk: number,
    title: string,
    price: number,
    image: string,
    cnt: number,
    product_cnt: number,
    can_change_cnt: boolean
}

const ProductCardWithCount: FC<ProductCardData> = ({ pk, title, price, image, cnt, product_cnt, can_change_cnt }) => {
    const [ count, setCount ] = useState<number> (product_cnt)

    const { session_id } = useSsid()

    const changeCount = async (new_count: number) => {
        try {
            await axios(`http://127.0.0.1:8080/links/`, {
                method: "PUT",
                headers: {
                    'authorization': session_id
                },
                data: {
                    'product_cnt': new_count,
                    'product': pk
                }
            })
        } catch (error) {
            console.log("Что-то пошло не так")
        }
    }

    const handleMinus = async () => {
        if (count > 1) {
            await changeCount(count - 1)
            setCount(_count => _count - 1)
        }
    }

    const handlePlus = async () => {
        if (count < cnt) {
            await changeCount(count + 1)
            setCount(_count => _count + 1)
        }
    }

    return (
        <Card className="card">
            <div className="cardImageWrap"><a href={"/products/" + pk.toString()}><Card.Img className="cardImage" src={image} height={100} width={100} /></a></div>
            <div className="cardTitleWrap"><a href={"/products/" + pk.toString()}><Card.Title className="cardTitle">{title}</Card.Title></a></div>
            <Card.Text className="cardPrice">{price.toString()+" ₽"}</Card.Text>
            {can_change_cnt ?
            <div style={{ position: "relative", top: "-30px" }}>
                <h4 className="cardStatusGreen" style={{ position: "relative", top: "0px" }}>вы добавили:</h4>
                <button style={{ position: "relative", left: "-20px", width: "40px", height: "30px", backgroundColor: "rgb(237, 104, 137)", fontSize: "18px" }} onClick={handleMinus}>-</button>
                <span style={{ color: "rgb(24, 125, 188)", fontSize: "18px" }}>{`${count} шт.`}</span>
                <button style={{ position: "relative", left: "20px", width: "40px", height: "30px", backgroundColor: "rgb(165, 255, 145)", fontSize: "18px" }} onClick={handlePlus}>+</button>
            </div> :
            <div style={{ position: "relative", top: "-30px" }}>
                <h4 className="cardStatusGreen" style={{ position: "relative", top: "0px" }}>вы приобрели:</h4>
                <span style={{ color: "rgb(24, 125, 188)", fontSize: "18px" }}>{`${count} шт.`}</span>
            </div>}
        </Card>
    )
}

export default ProductCardWithCount