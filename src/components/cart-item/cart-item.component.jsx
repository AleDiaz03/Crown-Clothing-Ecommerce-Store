import { CartItemContainer, ImgHolder, ItemDetails, Name } from "./cart-item.styles" 

const CartItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem
    return (
        <CartItemContainer>
            <ImgHolder src={imageUrl}  alt={name}/>
            <ItemDetails>
                <Name>{name}</Name>
                <span className='quantity'>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem