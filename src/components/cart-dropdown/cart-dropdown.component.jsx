import { useContext } from 'react'
import {CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart.context'
import { useNavigate } from 'react-router-dom'


const CartDropdown = () => {

    const {cartItems, setShowing, showing} = useContext(CartContext)

    const navigate = useNavigate()
    const goToCheckoutHandler = () => {
        setShowing(!showing)
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
             <CartItems>
                {
                    cartItems.length ? cartItems.map((cartItem) => {
                        return (
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        )
                    }) : ( <EmptyMessage>Empty Cart</EmptyMessage>)
                }
             </CartItems>
             <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer> 
    )
}

export default CartDropdown