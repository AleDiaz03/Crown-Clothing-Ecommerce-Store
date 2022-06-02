import './navbar.styles.scss'
import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrownLogo} from '../../assets/crown.svg'

const NavBar = () => {
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
                    <Link className='nav-link' to='/sign-in'>
                        SIGN IN
                    </Link>
                </div>
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