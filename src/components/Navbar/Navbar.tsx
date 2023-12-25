import { FC } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import HeadTitle from '../HeadTitle/HeadTitle.tsx';

import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"


const Navbar: FC = () => {
    const { is_authenticated, username, is_moderator, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/products")
    }

    const getGuestNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
            <Col style={{ width: "75%", marginLeft: "30px" }}>
                <a className="navbar-button" href="/">Товары</a>
            </Col>
            <Col style={{ width: "15%", marginLeft: "30px" }}>
                <a className="navbar-button" href="/register">Регистрация</a>
            </Col>
            <Col style={{ width: "10%", marginLeft: "30px" }}>
                <a className="navbar-button" href="/login">Вход</a>
            </Col>
        </Row>
    )

    const getUserNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
            <Col style={{ width: "60%", marginLeft: "30px" }}>
                <a className="navbar-button" href="/">Товары</a>
            </Col>
            <Col style={{ width: "10%", marginLeft: "30px" }}>
                <a className="navbar-button" href="/orders">Заказы</a>
            </Col>
            <Col style={{ width: "20%", marginLeft: "30px" }}>
                <a className="navbar-button" href="#" onClick={ handleLogout }>{`${username}: выход`}</a>
            </Col>
        </Row>
    )

    const getModerNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
            <Col style={{ width: "60%", marginLeft: "30px" }}>
                <a className="navbar-button" href="/">Товары</a>
            </Col>
            <Col style={{ width: "10%", marginLeft: "30px" }}>
                <a className="navbar-button" href="/orders">Заказы</a>
            </Col>
            <Col style={{ width: "20%", marginLeft: "30px" }}>
                <a className="navbar-button" href="#" onClick={ handleLogout }>{`${username}: выход`}</a>
            </Col>
        </Row>
    )

    const getNavbar = () => {
        if (!is_authenticated) {
            return getGuestNavbar()
        } else if (!is_moderator) {
            return getUserNavbar()
        } else {
            return getModerNavbar()
        }
    }

    return (
        <Row id="header">
            <HeadTitle />
            <Container id="navbar" style={{ paddingLeft: "30px", width: "200%" }}>
                {getNavbar()}
            </Container>
        </Row>
    )
}

export default Navbar