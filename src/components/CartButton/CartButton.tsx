import { FC } from 'react'

interface Props {
    cartID: number
}

const CartButton: FC<Props> = ({ cartID }) => {
    return (
        <div style={{ position: 'relative', top: '-81px', left: '350px', width: 'max-content' }}>{
            cartID != -1 ?
            <a className="cart-button" href={`/orders/${cartID}`}>Корзина</a> :
            <a href="#" id="disabled-cart" className="disabled">Корзина</a>
        }</div>
    )
}

export default CartButton