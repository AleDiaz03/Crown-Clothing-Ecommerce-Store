import {CheckoutItemContainer, ImageContainer, Image, Name, Quantity, Price, Arrow, Value, RemoveButton} from './checkout-item.styles.jsx'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({item}) => {

    const { name, imageUrl, price, quantity } = item
    const { deleteItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)


    const handledeleteItem = () => deleteItemFromCart(item)
    const handleRemoveItem = () => removeItemFromCart(item)
    const handleAddItem = () => addItemToCart(item)

    return (
    <CheckoutItemContainer>
        <ImageContainer>
            <Image src={imageUrl} alt={`${name}`}/>
        </ImageContainer>
        <Name>{name}</Name>
        <Quantity>
            <Arrow onClick={handleRemoveItem}>
                &#10094;
            </Arrow>
            <Value>{quantity}</Value>
            <Arrow onClick={handleAddItem}>
                &#10095;
            </Arrow>
        </Quantity>
        <Price>{price}</Price>
        <RemoveButton onClick={handledeleteItem}>
            &#10005;
        </RemoveButton>
    </CheckoutItemContainer>
    )
}

export default CheckoutItem