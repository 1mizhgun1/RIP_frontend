import { FC, useState, useEffect } from 'react';
import { useSsid } from "../../hooks/useSsid.ts";
import { useAuth } from '../../hooks/useAuth.ts';
import { useProductFilter } from '../../hooks/useProductFilter.ts';

import axios from "axios";
import { getDefaultResponse } from '../../assets/MockObjects.ts';

import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import Filter from '../../components/Filter/Filter.tsx';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx';
import Loader from '../../components/Loader/Loader.tsx';

import { Col, Container, Row } from 'react-bootstrap';
import "./ProductListPage.css";
import CartButton from '../../components/CartButton/CartButton.tsx';


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
    order: number,
    products: Product[]
}

const ProductListPage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)

    const [ response, setResponse ] = useState<Response> ({
        order: -1,
        products: [],
    })

    const { cache, searchValue, minPriceValue, maxPriceValue, setCache } = useProductFilter()
    // const [ searchValue, setSearchValue ] = useState<string> (search)
    // const [ minPriceValue, setMinPriceValue ] = useState<number | undefined> (minPrice)
    // const [ maxPriceValue, setMaxPriceValue ] = useState<number | undefined> (maxPrice)

    const { session_id } = useSsid()
    const { is_authenticated } = useAuth()

    const getFilteredProducts = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8080/products/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: searchValue,
                    price_min: (Number.isNaN(minPriceValue) ? undefined : minPriceValue),
                    price_max: (Number.isNaN(maxPriceValue) ? undefined : maxPriceValue)
                },
                signal: AbortSignal.timeout(1000)
            })
            setResponse(data)
            setCache(data.products)
            // setSearchValue(searchValue)
            // setMinPriceValue(minPriceValue)
            // setMaxPriceValue(maxPriceValue)
            // setProductFilter({
            //     searchValue: searchValue,
            //     minPriceValue: minPriceValue,
            //     maxPriceValue: maxPriceValue
            // })
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

    const addToCart = async (product_id: number) => {
        await axios(`http://localhost:8080/products/${product_id}/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })
        await getFilteredProducts()
    }

    return (
        <> {loading ? <Loader /> :
        <Container>
            {is_authenticated && <CartButton cartID={ response.order } />}
            <Row style={is_authenticated ? { position: 'relative', top: '-25px' } : {}}>
                <Breadcrumbs pages={[]} />
            </Row>
            <Row style={is_authenticated ? { display: 'flex', position: 'relative', top: '-25px' } : {display: 'flex'}}>
                <Col style={{ width: "22%", margin: "30px" }}>
                    <Filter
                        send={getFilteredProducts}
                    />
                </Col>
                <Col style={{ marginBottom: "30px", marginLeft: "10px" }}>
                    <div id="box">
                        {cache.map((product: Product) => (
                            is_authenticated ?
                            <div>
                                {product.cnt > 0 ? <button className="main-add-button" onClick={() => {addToCart(product.pk)}}>Добавить в корзину</button> :
                                <button className="main-add-button-grey">Добавить в корзину</button>}
                                <ProductCard key={product.pk.toString()}
                                    pk={product.pk}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                    cnt={product.cnt}
                                />
                            </div> :
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