import React, { useState } from 'react'
import '../Property.css'
import { Row, Card, Col, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiBed } from 'react-icons/bi';
import { RiParkingLine } from 'react-icons/ri';
import { MdFamilyRestroom } from 'react-icons/md';
import { FaTape } from 'react-icons/fa';
import { VscSymbolStructure } from 'react-icons/vsc';
import { MdContactPhone } from 'react-icons/md';
import { HiOutlineHeart, HiOutlineHome } from 'react-icons/hi';
import { MdPriceCheck, MdLocationCity } from 'react-icons/md';
import { GiPriceTag } from 'react-icons/gi';
import axios from 'axios';

function Property({
  id,
  title,
  rent,
  image,
  description,
  imageUrl,
  address,
  area,
  available,
  categories,
  city,
  deposite,
  owner,
  intrestedUser,
  onClickInterested,
  onClickNotInterested
}) {
  const [isQuickPreview, setIsQuickPreview] = useState(false)
  //let x=10;
  return (
    <Col>
      <Card
        style={{
          padding: '20px',
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        }}
      >
        <Row>
          <Col md={3}>
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
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <div className="detailsDiv">
                <Row>
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <BiBed size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">FURNISHING</div>
                        <div>{categories?.filter(i => i.categoryType === "FurnishedType")[0]?.name}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <MdFamilyRestroom size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">TENENT PREFERRED</div>
                        <div>{categories?.filter(i => i.categoryType === "TenentType")[0]?.name}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <HiOutlineHome size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">PROPERTY TYPE</div>
                        <div>{categories?.filter(i => i.categoryType === "propertyType")[0]?.name}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <RiParkingLine size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">PARKING</div>
                        <div>{categories?.filter(i => i.categoryType === "ParkingType")[0]?.name}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <FaTape size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">AREA</div>
                        <div>{area} sqft</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <VscSymbolStructure size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">PROPERTY STRUCTURE</div>
                        <div>{categories?.filter(i => i.categoryType === "propertyStructureType")[0]?.name}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <MdPriceCheck size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">RENT</div>
                        <div>₹{rent}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <GiPriceTag size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">DEPOSITE</div>
                        <div>₹{deposite}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row className="rowDetail">
                      <Col md={2}>
                        <MdLocationCity size={24} />
                      </Col>
                      <Col>
                        <div className="typeText">CITY</div>
                        <div>{city}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div className="mt-2">
                <Card.Text className="mb-2" style={{ marginBottom: '0px' }}>
                  <div>
                    {address}
                  </div>
                </Card.Text>
              </div>
              <div className="mt-2">
                <Card.Text className="mb-2" style={{ marginBottom: '0px' }}>
                  <div>
                    {description}
                  </div>
                </Card.Text>
              </div>
            </Card.Body>
          </Col>
          <Col md={2}>
            {JSON.parse(localStorage.getItem('data1')) !== null ?
              <div>
                <div className="mb-4" style={{ fontWeight: 'bold' }}>
                  <span style={{ marginRight: '5px' }}><MdContactPhone size={26} /></span>
                  OWNER DETAILS</div>
                <div className="mt-2">
                  {owner.name}<br></br>
                  {owner.email}<br></br>
                  {owner.address}<br></br>
                  {owner.phone}<br></br>
                </div>
              </div>
              :
              <div>
                <Link to="/login"> <Button variant="outline-primary">GET OWNER DETAILS</Button></Link>
              </div>
            }

            {JSON.parse(localStorage.getItem('data1')) !== null ?
              <div className="mt-5">
                {intrestedUser.filter(i => i.id === JSON.parse(localStorage.getItem('data1'))?.id)[0] !== undefined ?
                  <Button className="primary" onClick={() => onClickNotInterested(id)}>I'M NOT INTERESTED</Button>
                  :
                  <Button className="primary" onClick={() => onClickInterested(id)}>
                    <span style={{ marginRight: "2px" }}><HiOutlineHeart /></span>
                    I'M INTERESTED</Button>

                }
              </div>
              : <div className="mt-5">
                <Button className="primary" onClick={() => onClickInterested(id)}>I'M INTERESTED</Button>
              </div>
            }

          </Col>
        </Row >
      </Card >

    </Col >
  )
}

export default Property
