import { FC, useEffect, useState } from "react";
import { useSsid } from "../../hooks/useSsid";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { updateMaxPriceValue, updateMinPriceValue, updateSearchValue } from "../../store/productFilterSlice";
import { getDefaultResponse } from "../../assets/MockObjects";
import { useDispatch, useStore } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductTable from "../../components/ProductTable/ProductTable";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter/Filter";

interface Product {
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

const ProductTablePage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { session_id } = useSsid()
    const { is_moderator } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ response, setResponse ] = useState<Response> ()

    //@ts-ignore
    const [ searchValue, setSearchValue ] = useState<string> (useStore().getState().productFilter.searchValue)
    //@ts-ignore
    const [ minPriceValue, setMinPriceValue ] = useState<number | undefined> (useStore().getState().productFilter.minPriceValue)
    //@ts-ignore
    const [ maxPriceValue, setMaxPriceValue ] = useState<number | undefined> (useStore().getState().productFilter.maxPriceValue)

    !is_moderator && navigate('/')

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
            dispatch(updateSearchValue(searchValue))
            dispatch(updateMinPriceValue(minPriceValue))
            dispatch(updateMaxPriceValue(maxPriceValue))
        } catch (error) {
            setResponse(getDefaultResponse(3, searchValue, minPriceValue, maxPriceValue))
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            await axios(`http://localhost:8080/products/${id}/`, {
                method: "DELETE",
                headers: {
                    'authorization': session_id
                }
            })
            navigate('/')
        } catch (error) {
            console.log(error)
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

    const getTransformedData = () => {
        let result: any = []
        response?.products.map((product) => {
            result.push({
                pk: product.pk,
                title: product.title,
                price: product.price,
                cnt: product.cnt,
                status: product.status,
                image: product.image
            })
        })
        return result
    }

    return (
        <> {loading ? <Loader /> :
        <Container>
            <Row>
                <Breadcrumbs pages={[]} />
            </Row>
            <Row style={{ display: "flex" }}>
                <Col style={{ width: "22%", marginLeft: "30px", marginTop: "30px", display: "flex", flexDirection: "column" }}>
                    <Filter
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        minPriceValue={minPriceValue}
                        setMinPriceValue={setMinPriceValue}
                        maxPriceValue={maxPriceValue}
                        setMaxPriceValue={setMaxPriceValue}
                        send={getFilteredProducts}
                    />
                    <button className="create-product-button" onClick={() => navigate(`/products/create`)}>Создать товар</button>
                </Col>
                <ProductTable
                    products={getTransformedData()}
                    deleteProduct={deleteProduct}
                />
            </Row>
        </Container>
        }</>
    )
}

export default ProductTablePage;