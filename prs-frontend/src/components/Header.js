import React, { useState, useEffect } from 'react'
import '../Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import PersonIcon from '@mui/icons-material/Person';
import { Link, NavLink } from 'react-router-dom'
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
import Logo from '../assets/img/Logo.png';

function Header() {
  const history = useNavigate()
  const [text, setText] = useState('')
  const [allCategories, setAllCategories] = useState([])
  let textInput = React.createRef()
  localStorage.setItem('text', text)
  //console.log(JSON.parse(localStorage.getItem('data1')));
  let sign = JSON.parse(localStorage.getItem('data1'))
  let signOut = () => {
    if (sign != null) {
      localStorage.removeItem('data1')
      window.location.href = '/'
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
    fetch(process.env.REACT_APP_BASE_URL + "/property/cities")
      .then(resp => resp.json())
      .then(data => {
        console.log(JSON.stringify(data));
        setAllCategories(data)
      });
  }, [])
  return (

    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/" style={{textDecoration:"none"}}>
          <Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
            <img
              alt=""
              src={Logo}
              width="80"
              height="60"
              className="d-inline-block align-top"
            />{' '}
            <span style={{color:"#6474E5", marginLeft:"4px"}}>RentalWorld</span></Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{
              maxHeight: '100px',
              alignItems: 'center',
              color: '#6474E5',
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

            <NavDropdown title="Cities" id="basic-nav-dropdown" >
              {allCategories.map((c, index) => (
                <NavDropdown.Item href={`/property/${c}`} key={index}>
                  {c}
                </NavDropdown.Item>
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
                  Hello {!sign ? 'User' : sign.fname}
                </span>
                <span className="header_optionLineTwo" onClick={signOut}>
                  {sign ? 'Sign Out' : 'Sign In'}
                </span>
              </div>
            </Link>
          </Nav.Link>
          <Nav.Link>
            {JSON.parse(localStorage.getItem('data1')) !== null &&
              < Link to="/profile">
                <PersonIcon
                  fontSize="large"
                  style={{ color: '#6474E5' }}
                />
              </Link>
            }
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default Header
