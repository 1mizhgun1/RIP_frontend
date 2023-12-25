import { FC, useState, useEffect } from 'react';
import { useSsid } from "../../hooks/useSsid.ts";
import { useAuth } from '../../hooks/useAuth.ts';

import axios from "axios";
import { getDefaultResponse } from '../../assets/MockObjects.ts';

import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import Filter from '../../components/Filter/Filter.tsx';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import CartButton from '../../components/CartButton/CartButton.tsx';

import { Col, Container, Row } from 'react-bootstrap';
import "./ProductListPage.css";

import { useDispatch, useStore } from 'react-redux';
import { updateMaxPriceValue, updateMinPriceValue, updateSearchValue } from '../../store/productFilterSlice.ts';
import { useNavigate } from 'react-router-dom';


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

    //@ts-ignore
    const [ searchValue, setSearchValue ] = useState<string> (useStore().getState().productFilter.searchValue)
    //@ts-ignore
    const [ minPriceValue, setMinPriceValue ] = useState<number | undefined> (useStore().getState().productFilter.minPriceValue)
    //@ts-ignore
    const [ maxPriceValue, setMaxPriceValue ] = useState<number | undefined> (useStore().getState().productFilter.maxPriceValue)

    const { session_id } = useSsid()
    const { is_authenticated, is_moderator } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    is_moderator && navigate('/')

    const getFilteredProducts = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8080/products/?status=A`, {
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
            dispatch(updateSearchValue(searchValue))
            dispatch(updateMinPriceValue(minPriceValue))
            dispatch(updateMaxPriceValue(maxPriceValue))
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
    }, [dispatch])

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
                <Col style={{ width: "22%", marginTop: "30px", marginLeft: "30px" }}>
                    <Filter
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        minPriceValue={minPriceValue}
                        setMinPriceValue={setMinPriceValue}
                        maxPriceValue={maxPriceValue}
                        setMaxPriceValue={setMaxPriceValue}
                        send={getFilteredProducts}
                    />
                </Col>
                <Col style={{ marginBottom: "30px", marginLeft: "10px", marginTop: (is_authenticated ? "0px" : "36px") }}>
                    <div id="box">
                        {response.products.map((product: Product, index) => (
                            is_authenticated ?
                            <div key={index}>
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
                            <ProductCard key={index}
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