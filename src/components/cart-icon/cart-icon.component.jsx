import { useContext } from 'react'
import {CartIconContainer, ShoppingIconContainer, ItemCount} from './cart-icon.styles.jsx'
import { CartContext } from '../../contexts/cart.context'


const CartIcon = () => {

    const {showing, setShowing, totalItems} = useContext(CartContext)

    const toggle = () => {
        setShowing(!showing)
    }

    return (
        <CartIconContainer onClick={toggle}>
            <ShoppingIconContainer />
            <ItemCount className='item-count'>{totalItems}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon