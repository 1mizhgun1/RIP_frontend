import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import "./OrderTable.css"


interface Order {
    pk: number,
    send: string,
    status: string
}

interface Props {
    orders: Order[]
}

const getStatusColor = (status: string) => {
    if (status == 'принят') {
        return "rgb(165, 255, 145)"
    } else if (status == 'отклонён') {
        return "rgb(237, 104, 137)"
    } else if (status == 'отправлен') {
        return "rgb(250, 246, 136)"
    } else {
        return "white"
    }
}

const OrderTable: FC<Props> = ({ orders }) => {
    return (
        <Container id="order-table" style={{ marginTop: "20px", marginBottom: "50px", width: "86%", position: "relative", left: "7%" }}>
            <Row className="order-table-header" style={{ display: "flex", padding: "15px" }}>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Номер</h2></Col>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Дата и время отправки</h2></Col>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Статус</h2></Col>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Ссылка</h2></Col>
            </Row>
            {orders.map((order) => (
                <Row className="order-table-row" key={order.pk} style={{ display: "flex", padding: "15px", backgroundColor: `${getStatusColor(order.status)}`, borderTop: "2px groove black" }}>
                    <Col className="order-table-col" style={{ width: "25%" }}><h2>{order.pk}</h2></Col> 
                    <Col className="order-table-col" style={{ width: "25%" }}><h2>{order.send}</h2></Col>
                    <Col className="order-table-col" style={{ width: "25%" }}><h2>{order.status}</h2></Col>
                    <Col className="order-table-col" style={{ width: "25%" }}><a href={`/orders/${order.pk}`}><h2>посмотреть</h2></a></Col>
                </Row>
            ))}
        </Container>
    )
}

export default OrderTable;