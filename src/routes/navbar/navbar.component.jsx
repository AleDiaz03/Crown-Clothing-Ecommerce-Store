import './navbar.styles.scss'
import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx'


const NavBar = () => {
    const {currentUser} = useContext(UserContext)
    const {showing} = useContext(CartContext)

    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                    <CrownLogo  className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP 
                    </Link>
                    {
                        currentUser ? (
                            <span onClick={signOutUser} className='nav-link'>SIGN OUT</span>
                        ) : (
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />

                </div>
                {
                    showing ? <CartDropdown /> : null
                }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavBar

/* <Fragment> is used when we want to return sibling html elements from
a component. We know we can't do this so instead of wrapping everything
into a div or some similar html element, we can use <fragment> which
is given to us by react. Fragment is just a 'not render anything" element
*/

/* <Link behaves like an ancher tag (<a>) but inside a BrowserRouter */