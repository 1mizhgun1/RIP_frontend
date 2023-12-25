import { Dispatch, FC } from "react";

import { Container, Row, Col } from "react-bootstrap";
import "./Filter.css";
// import { useProductFilter } from "../../hooks/useProductFilter";


interface FilterData {
    searchValue: string,
    setSearchValue: Dispatch<string>,
    minPriceValue: number | undefined,
    setMinPriceValue: Dispatch<number>,
    maxPriceValue: number | undefined,
    setMaxPriceValue: Dispatch<number>,
    send: () => any,
}

const Filter: FC<FilterData> = ({ searchValue, minPriceValue, maxPriceValue, setSearchValue, setMinPriceValue, setMaxPriceValue, send }) => {
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
                                value={minPriceValue}
                                onChange={(e) => setMinPriceValue(parseInt(e.target.value))}
                            />
                        </Col>
                        <Col><h4 className="filter-text up">до</h4></Col>
                        <Col>
                            <input className="filter-input" style={{ width: "80%" }}
                                type="number"
                                placeholder="макс. цена"
                                name="price_max"
                                value={maxPriceValue}
                                onChange={(e) => setMaxPriceValue(parseInt(e.target.value))}
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
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </Row>
                </Container>
                <Row><input className="filter-submit" type="button" value="применить" onClick={send}/></Row>
            </form>
        </Container>
    )
}

export default Filter;