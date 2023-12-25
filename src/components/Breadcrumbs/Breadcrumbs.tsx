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
            <a href={`/`} style={{ textDecoration: "None" }}>🏠</a>
            {pages && pages.map((page) => (
                <a href={ page.link } style={{ textDecoration: "None" }}>{ " --> " + page.title }</a>
            ))}
        </Row>
    </Container>
)

export default Breadcrumbs