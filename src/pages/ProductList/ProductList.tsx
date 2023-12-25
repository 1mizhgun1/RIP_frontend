import { FC, useState, useEffect } from 'react';

import axios from "axios";
import { getDefaultResponse } from '../../assets/MockObjects.ts';

import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import Filter from '../../components/Filter/Filter.tsx';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx';
import Loader from '../../components/Loader/Loader.tsx';

import { Col, Container, Row } from 'react-bootstrap';
import "./ProductList.css";


export interface Product {
    pk: number,
    title: string,
    file_extension: 'jpg' | 'png',
    price: number,
    cnt: number,
    status: 'A' | 'N',
    type: 'frames' | 'sunglasses' | 'lenses',
    param_sex?: string,
    param_material?: string,
    param_type?: string,
    param_color?: string,
    param_form?: string,
    param_time?: string,
    param_brand: string,
    last_modified: string,
    image: string
}

interface Response {
    orderID: number,
    products: Product[]
}

const ProductListPage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)

    const [ response, setResponse ] = useState<Response> ({
        orderID: -1,
        products: [],
    })

    const [ searchValue, setSearchValue ] = useState<string> ("")
    const [ minPriceValue, setMinPriceValue ] = useState<number | undefined> ()
    const [ maxPriceValue, setMaxPriceValue ] = useState<number | undefined> ()

    const getFilteredProducts = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8080/products/`, {
                method: "GET",
                params: {
                    title: searchValue,
                    price_min: (Number.isNaN(minPriceValue) ? undefined : minPriceValue),
                    price_max: (Number.isNaN(maxPriceValue) ? undefined : maxPriceValue)
                },
                signal: AbortSignal.timeout(1000)
            })
            setResponse(data)
        } catch (error) {
            setResponse(getDefaultResponse(3, searchValue, minPriceValue, maxPriceValue))
        }
    }

    useEffect(() => {
        getFilteredProducts().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    return (
        <> {loading ? <Loader /> :
        <Container>
            <Row>
                <Breadcrumbs pages={[]} />
            </Row>
            <Row style={{ display: "flex" }}>
                <Col style={{ width: "22%", margin: "30px" }}>
                    <Filter
                        search={searchValue}
                        setSearch={setSearchValue}
                        minPrice={minPriceValue}
                        setMinPrice={setMinPriceValue}
                        maxPrice={maxPriceValue}
                        setMaxPrice={setMaxPriceValue}
                        send={getFilteredProducts}
                    />
                </Col>
                <Col style={{ marginBottom: "30px", marginLeft: "10px" }}>
                    <div id="box">
                        {response.products.map((product) => (
                            <ProductCard key={product.pk.toString()}
                                pk={product.pk}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                cnt={product.cnt}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
        }</>
    )
}

export default ProductListPage;