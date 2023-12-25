import { FC, Dispatch } from "react";

import { Container, Row, Col } from "react-bootstrap";
import "./Filter.css";


interface FilterData {
    search: string,
    setSearch: Dispatch<string>,
    minPrice: number | undefined,
    setMinPrice: Dispatch<number>,
    maxPrice: number | undefined,
    setMaxPrice: Dispatch<number>,
    send: (prevCount: any) => any,
}

const Filter: FC<FilterData> = ({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice, send }) => {
    return (
        <Container id="filter">
            <Row><h3 className="filter-title">Фильтр</h3></Row>
            <Row><h3 className="filter-subtitle">Подбор по параметрам</h3></Row>
            <form action="" method="get" id="filter-form">   
                <Container style={{ transform: "translateY(-30%)", paddingLeft: "20px", borderBottom: "solid 1px #9e9b9b" }}>
                    <Row><h4 className="filter-text">Розничная цена</h4></Row>
                    <Row style={{ display: "flex" }}>
                        <Col><h4 className="filter-text up">от</h4></Col>
                        <Col>
                            <input className="filter-input" style={{ width: "80%" }}
                                type="number"
                                placeholder="мин. цена"
                                name="price_min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                            />
                        </Col>
                        <Col><h4 className="filter-text up">до</h4></Col>
                        <Col>
                            <input className="filter-input" style={{ width: "80%" }}
                                type="number"
                                placeholder="макс. цена"
                                name="price_max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container style={{ transform: "translateY(-40%)", paddingBottom: "20px", paddingLeft: "20px", borderBottom: "solid 1px #9e9b9b" }}>
                    <Row><h4 className="filter-text">Наименование</h4></Row>
                    <Row style={{ display: "flex", transform: "translateY(-20%)" }}>
                        <input className="filter-input"
                            type="text"
                            autoComplete="off"
                            size={30}
                            placeholder="Название"
                            name="title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Row>
                </Container>
                <Row><input className="filter-submit" type="button" value="применить" onClick={send}/></Row>
            </form>
        </Container>
    )
}

export default Filter;