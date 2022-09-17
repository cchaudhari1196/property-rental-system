import React, { useState, useEffect } from 'react'
import '../Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import PersonIcon from '@mui/icons-material/Person';
import { Link, NavLink } from 'react-router-dom'
import { useStateValue } from './Stateprovider'
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Container,
  NavDropdown
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Header() {
  const history = useNavigate()
  const [{ basket }] = useStateValue()
  const [text, setText] = useState('')
  const [allCategories, setAllCategories] = useState([])
  let textInput = React.createRef()
  localStorage.setItem('text', text)
  //console.log(JSON.parse(localStorage.getItem('data1')));
  let sign = JSON.parse(localStorage.getItem('data1'))
  let signOut = () => {
    if (sign != null) {
      localStorage.removeItem('data1')
      window.location.href = '/login'
    }
  }
  const makeSearchReq = (e) => {
    e.preventDefault()
    localStorage.setItem('searchText', textInput.current.value)
    // history('/search')
    history('/search', { state: textInput.current.value })

    // localStorage.removeItem('text')
  }
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/category")
      .then(resp => resp.json())
      .then(data => {
        console.log(JSON.stringify(data));
        setAllCategories(data)
      });
  }, [])
  return (
   
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/" className="navbar_brand">
          <Navbar.Brand> &nbsp;</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{
              maxHeight: '100px',
              alignItems: 'center',
              color: '#6e1230',
            }}
            navbarScroll
          >
            <NavLink
              to={'/'}
              className={
                window.location.pathname === '/'
                  ? 'headerLink headerLinkActive'
                  : 'headerLink'
              }
            >
              Home
            </NavLink>

            <NavDropdown title="Categories" id="basic-nav-dropdown" >
              {allCategories.map(c => (
                <NavDropdown.Item href={`/products/${c.c_id}`} key={c.c_id}>{c.c_name}</NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavLink
              to={'/about-us'}
              className={
                window.location.pathname === '/about-us'
                  ? 'headerLink headerLinkActive'
                  : 'headerLink'
              }
            >
              About Us
            </NavLink>
          </Nav>
          {/* <Form className="d-flex" onSubmit={() => (setText(textInput.current.value))}> */}
          <Form className="d-flex" onSubmit={(e) => makeSearchReq(e)}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={textInput}
            />
            <button className="searchBtn">Search</button>
          </Form>
          <Nav.Link>
            <Link to={!sign && '/login'} className="headerLink">
              <div className="header_option">
                <span className="header_optionLineOne">
                  Hello {!sign ? 'User' : sign.u_fname}
                </span>
                <span className="header_optionLineTwo" onClick={signOut}>
                  {sign ? 'Sign Out' : 'Sign In'}
                </span>
              </div>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={'/order'} className="headerLink">
              <div className="header_option">
                <span className="header_optionLineOne">Returns</span>
                <span className="header_optionLineTwo">& Order</span>
              </div>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/profile">
              <PersonIcon
                fontSize="large"
                style={{ color: '#6e1230' }}
              />
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/wallet">
              {/* <p className='header_category'>Wallet</p> */}
              <AccountBalanceWalletIcon
                fontSize="large"
                style={{ color: '#6e1230' }}
              />
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/checkout" className="headerLink">
              <div className="header_optionBasket">
                <ShoppingCartIcon
                  fontSize="large"
                  style={{ color: '#6e1230' }}
                />
                <span
                  className="header_optionLineTwo header_basketCount"
                  style={{ color: '#6e1230' }}
                >
                  {basket?.length}
                </span>
              </div>
            </Link>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
