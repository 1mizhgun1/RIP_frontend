import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import "./OrderTable.css"


interface Order {
    pk: number,
    send: string,
    status: string,
    username: string,
    payment: string
}

interface Props {
    orders: Order[],
    is_moderator: boolean,
    processStatusUpdate: (pk: number, new_status: 'A' | 'W') => Promise<any>
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

const OrderTable: FC<Props> = ({ orders, is_moderator, processStatusUpdate }) => {
    return (
        <Container id="order-table" style={{ marginTop: "20px", marginBottom: "50px", width: "90%", position: "relative", left: "5%" }}>
            <Row className="order-table-header" style={{ display: "flex", padding: "15px" }}>
                <Col className="order-table-head" style={{ width: "12%" }}><h2>Номер</h2></Col>
                <Col className="order-table-head" style={{ width: "20%" }}><h2>Пользователь</h2></Col>
                <Col className="order-table-head" style={{ width: "24%" }}><h2>Дата и время отправки</h2></Col>
                <Col className="order-table-head" style={{ width: "12%" }}><h2>Статус</h2></Col>
                <Col className="order-table-head" style={{ width: "12%" }}><h2>Оплата</h2></Col>
                <Col className="order-table-head" style={{ width: "20%" }}><h2>Действия</h2></Col>
            </Row>
            {orders.map((order, index) => (
                <Row className="order-table-row" key={index} style={{ display: "flex", padding: "15px", backgroundColor: `${getStatusColor(order.status)}`, borderTop: "2px groove black" }}>
                    <Col className="order-table-col" style={{ width: "12%" }}><h2>{order.pk}</h2></Col>
                    <Col className="order-table-col" style={{ width: "20%" }}><h2>{order.username}</h2></Col> 
                    <Col className="order-table-col" style={{ width: "24%" }}><h2>{order.send}</h2></Col>
                    <Col className="order-table-col" style={{ width: "12%" }}><h2>{order.status}</h2></Col>
                    <Col className="order-table-col" style={{ width: "12%" }}><h2>{order.payment}</h2></Col>
                    <Col className="order-table-col" style={{ width: "20%", display: "flex", flexDirection: "column" }}>
                        <a href={`/orders/${order.pk}`}><h2>посмотреть</h2></a>
                        {is_moderator && order.status == 'отправлен' && 
                        <div style={{ display: "flex" }}>
                            <button className="accept-button" onClick={() => processStatusUpdate(order.pk, 'A')}>Принять</button>
                            <button className="reject-button" onClick={() => processStatusUpdate(order.pk, 'W')}>Отклонить</button>
                        </div>}
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default OrderTable;