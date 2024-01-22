import { FC } from 'react'
import './HeadTitle.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const HeadTitle: FC = () => (
    <Container id="head">
        <Row id="head-title-row"><Link to='/' id="head-title">SuperView</Link></Row>
        <Row id="head-subtitle-row"><Link to='/' id="head-subtitle">Интернет-магазин оптики</Link></Row>
    </Container>
)

export default HeadTitle