import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    cartID: number
}

const CartButton: FC<Props> = ({ cartID }) => {
    return (
        <div style={{ position: 'relative', top: '-81px', left: '350px', width: 'max-content' }}>{
            cartID != -1 ?
            <Link className="cart-button" to={`/orders/${cartID}`}>Корзина</Link> :
            <a href="#" id="disabled-cart" className="disabled">Корзина</a>
        }</div>
    )
}

export default CartButton