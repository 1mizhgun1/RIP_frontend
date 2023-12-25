import { FC, useEffect, useState} from 'react'

import { useAuth } from '../../hooks/useAuth';

import { EmptyLoader } from '../../components/Loader/Loader.tsx';
import HeadTitle from '../HeadTitle/HeadTitle.tsx';

import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"


const Navbar: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { is_authenticated, username, auth } = useAuth()

    const getData = async () => {
        await auth()
    }

    useEffect(() => {
        getData().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, []);

    return (
        <> {loading ? <EmptyLoader /> :
        <Row id="header">
            <HeadTitle />
            <Container id="navbar" style={{ paddingLeft: "30px", width: "200%" }}>
                <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
                    {!is_authenticated &&
                        <Col style={{ width: "70%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/">Смотреть товары</a>
                        </Col>
                    }
                    {!is_authenticated &&
                        <Col style={{ width: "15%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/register">Регистрация</a>
                        </Col>
                    }
                    {!is_authenticated &&
                        <Col style={{ width: "15%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/login">Вход</a>
                        </Col>
                    }   

                    {is_authenticated &&
                        <Col style={{ width: "65%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/">Смотреть товары</a>
                        </Col>
                    }
                    {is_authenticated &&
                        <Col style={{ width: "20%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/orders">Мои заказы</a>
                        </Col>
                    }
                    {is_authenticated && 
                        <Col style={{ width: "15%", marginLeft: "30px" }}>
                            <a className="navbar-button" href="/profile" style={{ color: "rgb(255, 69, 106)" }}>{username}</a>
                        </Col>
                    }      
                </Row>
            </Container>
        </Row>
        }</>
    )
}

export default Navbar