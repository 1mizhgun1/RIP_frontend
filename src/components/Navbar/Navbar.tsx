import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';

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
            <Col style={{ width: "60%" }}></Col>
            <Col style={{ width: "12%" }}>
                <Link className="navbar-button" to="/">Товары</Link>
            </Col>
            <Col style={{ width: "18%" }}>
                <Link className="navbar-button" to="/register">Регистрация</Link>
            </Col>
            <Col style={{ width: "10%" }}>
                <Link className="navbar-button" to="/login">Вход</Link>
            </Col>
        </Row>
    )

    const getUserNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
            <Col style={{ width: "56%" }}></Col>
            <Col style={{ width: "12%" }}>
                <Link className="navbar-button" to="/">Товары</Link>
            </Col>
            <Col style={{ width: "12%" }}>
                <Link className="navbar-button" to="/orders">Заказы</Link>
            </Col>
            <Col style={{ width: "20%" }}>
                <Link className="navbar-button" to="#" onClick={ handleLogout }>{`${username}: выход`}</Link>
            </Col>
        </Row>
    )

    const getModerNavbar = () => (
        <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
            <Col style={{ width: "33%" }}></Col>
            <Col style={{ width: "12%" }}>
                <Link className="navbar-button" to="/">Товары</Link>
            </Col>
            <Col style={{ width: "23%" }}>
                <Link className="navbar-button" to="/product-table">Редактирование</Link>
            </Col>
            <Col style={{ width: "12%" }}>
                <Link className="navbar-button" to="/orders">Заказы</Link>
            </Col>
            <Col style={{ width: "20%" }}>
                <Link className="navbar-button" to="#" onClick={ handleLogout }>{`${username}: выход`}</Link>
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