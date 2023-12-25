import { FC, useEffect, useState } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSsid } from '../../hooks/useSsid';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from '../../components/OrderTable/OrderTable';
import Loader from '../../components/Loader/Loader.tsx';

import axios from 'axios';
import { useDispatch, useStore } from "react-redux";
import OrderFilter from "../../components/OrderFilter/OrderFilter.tsx";
import { updateA, updateEndDate, updateP, updateStartDate, updateUsername, updateW } from "../../store/orderFilterSlice.ts";
import parseISO from 'date-fns/parseISO'


interface Response {
    pk: number,
    created: string,
    send: string | undefined,
    closed: string | undefined,
    status: "I" | "P" | "D" | "A" | "W",
    username: string,
    modername: string,
    payment: string
}

const OrderListPage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { session_id } = useSsid()
    const { is_authenticated, is_moderator } = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ response, setResponse ] = useState<Response[]> ()

    //@ts-ignore
    const [ P, setP ] = useState<boolean> (useStore().getState().orderFilter.P)
    //@ts-ignore
    const [ A, setA ] = useState<boolean> (useStore().getState().orderFilter.A)
    //@ts-ignore
    const [ W, setW ] = useState<boolean> (useStore().getState().orderFilter.W)
    //@ts-ignore
    const store_startDate = useStore().getState().orderFilter.startDate
    const [ startDate, setStartDate ] = useState<Date | undefined> (store_startDate ? parseISO(store_startDate) : undefined)
    //@ts-ignore
    const store_endDate = useStore().getState().orderFilter.endDate
    const [ endDate, setEndDate ] = useState<Date | undefined> (store_endDate ? parseISO(store_endDate) : undefined)
    //@ts-ignore
    const [ username, setUsername ] = useState<string> (useStore().getState().orderFilter.username)

    const getFilterStatusParams = () => {
        let result = ''
        if (P) {
            result += 'P'
        }
        if (A) {
            result += 'A'
        }
        if (W) {
            result += 'W'
        }
        return result
    }

    const filterByUsername = (orders: Response[], username: string) => {
        console.log('фильтрую по', username)
        if (username == "") {
            return orders
        }
        return orders.filter((order) => {
            return order.username.toLowerCase().includes(username.toLowerCase())
        })
    }

    const getOrders = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8080/orders/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    'status': getFilterStatusParams(),
                    'start_date': startDate,
                    'end_date': endDate,
                }
            })
            dispatch(updateP(P))
            dispatch(updateA(A))
            dispatch(updateW(W))
            dispatch(updateStartDate(startDate))
            dispatch(updateEndDate(endDate))
            dispatch(updateUsername(username))
            setResponse(filterByUsername(data, username))
        } catch {
            console.log("Что-то пошло не так")
        }
    }

    useQuery('orders', getOrders, { refetchInterval: 2000 });

    const processStatusUpdate = async (id: number, new_status: 'A' | 'W') => {
        try {
            await axios(`http://127.0.0.1:8080/orders/${id}/`, {
                method: "PUT",
                headers: {
                    'authorization': session_id
                },
                data: {
                    'status': new_status
                }
            })
        } catch {
            console.log("Что-то пошло не так")
        }
    }

    useEffect(() => {
        getOrders().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    !is_authenticated && !loading && navigate('/')

    const getTextStatus = (status: string) => {
        if (status === 'P') {
            return 'отправлен'
        } else if (status === 'A') {
            return 'принят'
        } else if (status == 'W') {
            return 'отклонён'
        }
        return ''
    }

    const getTextPayment = (payment: string) => {
        if (payment === 'A') {
            return 'успешно'
        } else if (payment == 'W') {
            return 'неуспешно'
        }
        return 'ожидайте...'
    }

    const getTransformedData = () => {
        let result: any = []
        response?.map((order: Response) => {
            if (order.status != 'I') {
                result.push({
                    pk: order.pk,
                    send: `${order.send?.slice(0, 10)} ${order.send?.slice(11, 19)}`,
                    status: getTextStatus(order.status),
                    username: order.username,
                    payment: getTextPayment(order.payment)
                })
            }
        })
        return result
    }

    return (
        <> {loading ? <Loader /> :
        <Container>
            <Row>
                <Breadcrumbs pages={[ { link: `/orders`, title: (is_moderator ? 'необработанные заказы' : 'мои заказы') } ]} />
            </Row>
            <Row style={{ display: "flex" }}>
                <Col style={{ width: "35%" }}>
                    <h1 className="cart-main-text" style={{ marginTop: "30px", marginLeft: "30px" }}>{is_moderator ? 'Необработанные заказы' : 'Список ваших заказов'}: </h1>
                </Col>
                <Col style={{ width: "25%" }}></Col>
                <Col style={{ width: "40%" }}>
                    <OrderFilter
                        P={P}
                        setP={setP}
                        A={A}
                        setA={setA}
                        W={W}
                        setW={setW}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        username={username}
                        setUsername={setUsername}
                        is_moderator={is_moderator}
                    />
                </Col>
            </Row>
            <Row>
                {response?.length ?
                <OrderTable orders={getTransformedData()} is_moderator={is_moderator} processStatusUpdate={processStatusUpdate} /> :
                <h1 className="cart-help-text">Пусто</h1>}
            </Row>
        </Container>
        }</>
    )
}

export default OrderListPage