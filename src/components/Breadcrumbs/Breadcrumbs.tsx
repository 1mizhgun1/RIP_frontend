import { FC } from 'react'
import './Breadcrumbs.css';
import { Container, Row } from 'react-bootstrap';

interface BreadcrumbsProps {
    link: string,
    title: string
}

const Breadcrumbs: FC<{ pages: BreadcrumbsProps[] }> = ({ pages }) =>  (
    <Container id="breadcrumbs">
        <Row>
            <a href='/' style={{ textDecoration: "None", color: "rgb(24, 125, 188)" }}>🏠 главная</a>
            {pages && pages.map((page, index) => (
                <a href={ page.link } key={index} style={{ textDecoration: "None", color: "rgb(24, 125, 188)" }}>{ ` >>> ${page.title}` }</a>
            ))}
        </Row>
    </Container>
)

export default Breadcrumbs