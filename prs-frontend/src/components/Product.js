import React, { useState } from 'react'
import '../Product.css'
import { useStateValue } from './Stateprovider'
import { Row, Card, Col, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

function Product({
  id,
  title,
  describe,
  price,
  image,
  rating,
  categories,
  authors,
  p_qty,
  imageUrl,
  language,
  noOfPages,
  publisher,
}) {
  const [{ basket }, dispatch] = useStateValue()
  const [isQuickPreview, setIsQuickPreview] = useState(false)
  console.log('this is basket', basket)
  //let x=10;

  const addToBasket = () => {
    //dispatch item in data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        pid: id,
        pname: title,
        pdesc: describe,
        pimage: image,
        pprice: price,
        prating: rating,
        p_qty: p_qty,
        categories: categories,
        authors: authors,
        quantity: 1,
        imageUrl: imageUrl,
      },
    })
  }
  const checkProductInCart = () => {
    console.log(basket)
    let c = basket.filter((b) => b.pid === id)
    if (c.length > 0) {
      return true
    } else {
      return false
    }
  }
  return (
    <Col>
      <Modal size="lg" show={isQuickPreview} onHide={() => setIsQuickPreview(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <div>
                <img  style={{ width: '100%' }} src={imageUrl} alt="productImage" />
              </div>
              <div className="mt-2">
                {checkProductInCart() ? (
                  <Link to="/checkout">
                    <button className="addToCartBtn"> Go to cart</button>
                  </Link>
                ) : (
                  <button
                    onClick={addToBasket}
                    className="addToCartBtn"
                    style={{ padding: '6px' }}
                  >
                    + Add to Basket
                  </button>
                )}
              </div>
            </Col>
            <Col md={8}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                ₹{price}
              </div>
              <div style={{ fontStyle: 'italic' }} className="mt-1">
                {title}
              </div>
              <div style={{ color: 'grey' }} className="mt-1">
                By:
                {authors.map((a) => (
                  <span key={a?.id}> {a?.a_name}(Author) | </span>
                ))}
                Publisher : <span>{publisher?.p_name}</span>
              </div>
              <div className="mt-1">{describe}</div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsQuickPreview(false)}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={()=>setIsQuickPreview(false)}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
      <Card
        style={{
          padding: '20px',
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        }}
      >
        <div className="productImageDiv">
          <Card.Img
            variant="top"
            src={imageUrl ? imageUrl : image}
            style={{
              borderRadius: '4px',
              boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
              objectFit: 'contain',
              height: '100%',
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{ marginBottom: '0px' }}>
            <button
              className="mb-1"
              style={{
                border: '1px solid #6e1230',
                backgroundColor: 'transparent',
                color: '#6e1230',
                fontSize: '14px',
              }}
              onClick={() => setIsQuickPreview(true)}
            >
              QUICK PREVIEW
            </button>
          </Card.Text>
          <Card.Text style={{ marginBottom: '0px' }}>
            {authors.map((a) => (
              <div>{a.a_name}</div>
            ))}
          </Card.Text>
          <Card.Text>
            {/* <small>Rs </small> */}
            <strong>₹{price}</strong>
          </Card.Text>
          <Card.Text style={{ marginBottom: '0px' }}>
            Available Stocks :<strong>{p_qty}</strong>
          </Card.Text>
          <Card.Text className="product_rating">
            {/* {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))} */}
            <Rating
              ratingValue={rating}
              allowHalfIcon={true}
              allowHover={false}
              readonly={true}
            />
          </Card.Text>
          {checkProductInCart() ? (
            <Link to="/checkout">
              <button className="addToCartBtn"> Go to cart</button>
            </Link>
          ) : (
            <button onClick={addToBasket} className="addToCartBtn">
              + Add to Basket
            </button>
          )}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Product
