import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { useContext } from 'react'
import './cart-icon.styles.scss'
import { CartContext } from '../../contexts/cart.context'


const CartIcon = () => {

    const {showing, setShowing, totalItems} = useContext(CartContext)

    const toggle = () => {
        setShowing(!showing)
    }

    return (
        <div  onClick={toggle} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{totalItems}</span>
        </div>
    )
}

export default CartIcon