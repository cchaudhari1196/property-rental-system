import React from 'react'
import '../adminheader.css'
import { Link, NavLink } from 'react-router-dom'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { Navbar, Nav, Container } from 'react-bootstrap'

function AdminHeader() {
  console.log(JSON.parse(localStorage.getItem('data1')))
  let sign = JSON.parse(localStorage.getItem('data1'))
  let signOut = () => {
    if (sign != null) {
      localStorage.removeItem('data1')
      window.location.href = '/adminlogin'
    }
  }
  console.log(sign)
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/viewproperties" className="navbar_brand">
          <Navbar.Brand> &nbsp;</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink
              to={'/viewproperties'}
              className={
                window.location.pathname === '/viewproperties'
                  ? 'headerLink headerLinkActive'
                  : 'headerLink'
              }
            >
              Properties
            </NavLink>
            <NavLink
              to={'/viewcustomer'}
              className={
                window.location.pathname === '/viewcustomer'
                  ? 'headerLink headerLinkActive'
                  : 'headerLink'
              }
            >
              Customers
            </NavLink>
            <NavLink
              to={'/viewowners'}
              className={
                window.location.pathname === '/viewowners'
                  ? 'headerLink headerLinkActive'
                  : 'headerLink'
              }
            >
              Owners
            </NavLink>
          </Nav>
          <Nav.Link>
            <Link to={!sign && '/adminlogin'} className="headerLink">
              <div className="aheader_option">
                <span className="aheader_optionLineOne">
                  Hello {!sign ? 'Admin' : sign.id}
                </span>
                <span className="aheader_optionLineTwo" onClick={signOut}>
                  {sign ? 'Sign Out' : 'Sign In'}
                </span>
              </div>
            </Link>
          </Nav.Link>
          <Nav.Link style={{ color: '#6474E5' }}>
            <Link to={'/viewproducts'} className="headerLink">
              Admin
            </Link>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // </div>
  )
}
export default AdminHeader
