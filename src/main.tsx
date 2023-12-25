import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HeadTitle from './components/HeadTitle/HeadTitle'
import Navbar from './components/Navbar/Navbar'
// import MainPage from './pages/MainPage/MainPage';
import ProductListPage from './pages/ProductList/ProductList'
import ProductPage from './pages/Product/Product'

import "./main.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const router = createBrowserRouter([
    {
        path: `/`,
        element: <ProductListPage />
    },
    {
        path: `/products/:id/`,
        element: <ProductPage />
    }
])
  
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Container>
        <Row id="header">
            <HeadTitle />
            <Navbar />
        </Row>
        <Row>
            <RouterProvider router={router} />
        </Row>
    </Container>
)