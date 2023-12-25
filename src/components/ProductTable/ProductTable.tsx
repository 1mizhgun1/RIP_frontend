import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import "./ProductTable.css"
import ImageWrapper from '../ImageWrapper/ImageWrapper'


interface ProductTableItem {
    pk: number,
    title: string,
    price: number,
    cnt: number,
    status: 'A' | 'N',
    image: string
}

interface Props {
    products: ProductTableItem[]
    deleteProduct: (id: number) => Promise<any>
}

const ProductTable: FC<Props> = ({ products, deleteProduct }) => {
    const navigate = useNavigate()

    const getTextStatus = (product: ProductTableItem) => {
        return (product.status == 'A' ? 'активен' : 'удалён')
    }

    const getStatusColor = (status: 'A' | 'N') => {
        if (status == 'A') {
            return "rgb(165, 255, 145)"
        } else {
            return "rgb(237, 104, 137)"
        }
    }

    return (
        <Container id="product-table" style={{ marginTop: "30px", marginBottom: "50px", width: "95%", marginLeft: "1%" }}>
            <Row className="product-table-header" style={{ display: "flex", padding: "15px" }}>
                <Col className="product-table-head" style={{ width: "20%" }}><h2>Название</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Цена</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Кол-во</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Статус</h2></Col>
                <Col className="product-table-head" style={{ width: "28%" }}><h2>Картинка</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Действия</h2></Col>
            </Row>
            {products.map((product, index) => (
                <Row className="product-table-row" key={index} style={{ display: "flex", padding: "15px", backgroundColor: `${getStatusColor(product.status)}`, borderTop: "2px groove black" }}>
                    <Col className="product-table-col" style={{ width: "20%" }}><h2>{product.title}</h2></Col> 
                    <Col className="product-table-col" style={{ width: "13%" }}><h2>{product.price} ₽</h2></Col>
                    <Col className="product-table-col" style={{ width: "13%" }}><h2>{product.cnt} шт.</h2></Col>
                    <Col className="product-table-col" style={{ width: "13%", display: "flex", flexDirection: "column" }}>
                        <h2>{getTextStatus(product)}</h2>
                        {product.status == 'N' ?
                        <button className="activate-product-button" onClick={() => deleteProduct(product.pk)}>Вернуть</button> :
                        <button className="delete-product-button" onClick={() => deleteProduct(product.pk)}>Удалить</button>}
                    </Col>
                    <Col className="product-table-col" style={{ width: "28%" }}><div><ImageWrapper className="product-table-image" src={product.image} based="/default.jpg" /></div></Col>
                    <Col className="product-table-col" style={{ width: "13%", display: "flex", flexDirection: "column" }}>
                        <a href={`/products/${product.pk}`}><h2>посмотреть</h2></a>
                        <button className="update-product-button" onClick={() => navigate(`/products/${product.pk}/update`)}>Изменить</button>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default ProductTable;