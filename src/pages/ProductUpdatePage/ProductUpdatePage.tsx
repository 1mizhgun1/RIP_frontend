import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Product } from "../ProductListPage/ProductListPage";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSsid } from "../../hooks/useSsid";
import { useAuth } from "../../hooks/useAuth";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Loader from '../../components/Loader/Loader.tsx';
import "./ProductUpdatePage.css"

export interface ProductFormData {
    title: string,
    price: number,
    cnt: number,
    type: 'frames' | 'sunglasses' | 'lenses',
    param_sex?: string,
    param_material?: string,
    param_type?: string,
    param_color?: string,
    param_form?: string,
    param_time?: string,
    param_brand: string,
    image?: string
}

const toFormData = (product: Product) => {
    return {
        title: product.title,
        price: product.price,
        cnt: product.cnt,
        type: product.type,
        param_sex: product.param_sex,
        param_material: product.param_material,
        param_type: product.param_type,
        param_color: product.param_color,
        param_form: product.param_form,
        param_time: product.param_time,
        param_brand: product.param_brand,
        image: ""
    }
}

const emptyProduct: Product = {
    pk: -1,
    title: "",
    file_extension: 'jpg',
    price: 0,
    status: 'A',
    cnt: 0,
    type: 'frames',
    param_sex: "",
    param_material: "",
    param_type: "",
    param_color: "",
    param_form: "",
    param_time: "",
    param_brand: "",
    last_modified: "",
    image: ""
}

const ProductUpdatePage: FC = () => {
    const { id } = useParams()
    const [ loading, setLoading ] = useState<boolean> (true)
    const navigate = useNavigate()
    const { session_id } = useSsid()
    const { is_moderator } = useAuth()
    const pageTitle = (id ? 'изменение товара' : 'добавление товара')
    const [ values, setValues ] = useState<ProductFormData> (toFormData(emptyProduct))
    const [ image, setImage ] = useState<File | undefined> ()
    const [ uploadedImage, setUploadedImage ] = useState<string | undefined> ()

    !is_moderator && navigate('/products')

    const getProduct = async () => {
        const response = await axios(`http://127.0.0.1:8080/products/${id}/`, { method: "GET" })
        setValues(toFormData(response.data))
        setUploadedImage(response.data.image)
    }

    useEffect(() => {
        id ?
        getProduct().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
        :
        setLoading(false)
    }, [])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            setImage(file ? file : undefined)
            setUploadedImage(URL.createObjectURL(file))
            setValues((prevValues) => ({
                ...prevValues,
                ['file_extension']: file.name.split('.').pop()
            }));
        }
    };

    const sendData = async () => {
        id ?
        await axios(`http://127.0.0.1:8080/products/${id}/`, {
            method: 'PUT',
            data: values,
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': session_id
            }
        })
        :
        await axios(`http://127.0.0.1:8080/products/`, {
            method: 'POST',
            data: values,
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': session_id
            }
        })
    }

    const sendForm = async () => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                values.image = btoa(reader.result as string)
                sendData()
            }
            reader.readAsBinaryString(image)
        } else {
            sendData()
        }
        navigate('/products')
        console.log(values)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendForm();
    };

    return (
        <> {loading ? <Loader /> :
        <Container>
            <Row>
                <Breadcrumbs pages={[ { link: window.location.pathname, title: pageTitle } ]} />
            </Row>
            <h1 className="cart-main-text" style={{ marginLeft: "30px" }}>{pageTitle}</h1>
            <form onSubmit={handleSubmit}>
                <Container id="product-form">
                    <Row style={{ display: "flex" }}>
                        <Col id="product-form-main" style={{ width: "36%" }}>
                            <Row>
                                <h2>Основные данные</h2>
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="title">Название</label></div>
                                <textarea
                                    id="title"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="price">Цена</label></div>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="cnt">Количество на складе</label></div>
                                <input
                                    type="number"
                                    id="cnt"
                                    name="cnt"
                                    value={values.cnt}
                                    onChange={handleChange}
                                    required
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="type">Тип товара</label></div>
                                <select
                                    id="type"
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                >
                                    <option value="frames">оправа для очков</option>
                                    <option value="sunglasses">солнцезащитные очки</option>
                                    <option value="lenses">контактные линзы</option>
                                </select>
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="param_brand">Бренд</label></div>
                                <input
                                    type="text"
                                    id="param_brand"
                                    name="param_brand"
                                    value={values.param_brand}
                                    onChange={handleChange}
                                    required
                                />
                            </Row>
                        </Col>
                        <Col id="product-form-params" style={{ width: "36%" }}>
                            <Row>
                                <h2>{'Характеристики (необязательно)'}</h2>
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="param_sex">Пол</label></div>
                                <input
                                    type="text"
                                    id="param_sex"
                                    name="param_sex"
                                    value={values.param_sex}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="param_material">Материал оправы</label></div>
                                <input
                                    type="text"
                                    id="param_material"
                                    name="param_material"
                                    value={values.param_material}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="param_type">Тип оправы</label></div>
                                <input
                                    type="text"
                                    id="param_type"
                                    name="param_type"
                                    value={values.param_type}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="param_color">Цвет оправы</label></div>
                                <input
                                    type="text"
                                    id="param_color"
                                    name="param_color"
                                    value={values.param_color}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="param_form">Форма</label></div>
                                <input
                                    type="text"
                                    id="param_form"
                                    name="param_form"
                                    value={values.param_form}
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <div className="left-column"><label htmlFor="param_time">Время без замены</label></div>
                                <input
                                    type="text"
                                    id="param_time"
                                    name="param_time"
                                    value={values.param_time}
                                    onChange={handleChange}
                                />
                            </Row>
                        </Col>
                        <Col id="product-form-image" style={{ width: "28%" }}>
                            <Row>
                                <h2>Изображение</h2>
                            </Row>
                            <Row style={{ flexDirection: "column" }}>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange}
                                    style={{ gap: "10px" }}
                                />
                                <div style={{ width: "80%" }}>
                                    <img src={uploadedImage} alt="" style={{ width: "100%", border: "1px solid grey", borderRadius: "10px", marginTop: "30px" }} />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <button id="product-form-submit-button" type="submit">Сохранить</button>
                    </Row>
                </Container>  
            </form>
        </Container>
        }</>
    )
}

export default ProductUpdatePage