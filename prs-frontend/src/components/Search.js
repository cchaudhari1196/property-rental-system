import React, { useState, useEffect } from 'react'
import '../Home.css'
import Photo2 from '../Photo2.jpg'
import Property from './Property.js'
import Loader from './Loader'
import Footer from './Footer';
import { useLocation } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios';
const Search = (props) => {
  const [sr, setsr] = useState([])
  const [searcherror, setsearcherror] = useState("")
  const [loading, setloading] = useState(false)
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    console.log("As")
    setloading(true)
    const reqData = {
      method: 'GET',
    }
    fetch(
      process.env.REACT_APP_BASE_URL +
      '/property/search/' +
      state,
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length != 0) {
          console.log(JSON.stringify(data))
          setsr(data)
          setloading(false)
          setsearcherror("")
        } else {
          setsearcherror('Result not found :(')
          setloading(false)
          setsr([])
        }
      })
  }, [state])
  const onClickInterested = async (id) => {
    if (JSON.parse(localStorage.getItem('data1')) !== null) {
      await axios.post(process.env.REACT_APP_BASE_URL + '/property/show_interest?user_id=' + JSON.parse(localStorage.getItem('data1'))?.id + '&property_id=' + id)
        .then((resp) => {
          resp.json()
          let temp = [...this.state.to]
          temp.filter(i => i.id === id)[0].intrestedUser = [...temp.filter(i => i.id === id)[0].intrestedUser, { id: Number(JSON.parse(localStorage.getItem('data1'))?.id) }]
          console.log(temp)
          this.setState({ to: temp })
        })
        .then((data) => {

        })
        .catch((error) => {
        })
    } else {
      window.location.href = '/login'
    }

  }
  const onClickNotInterested = async (id) => {
    await axios.post(process.env.REACT_APP_BASE_URL + '/property/remove_interest?user_id=' + JSON.parse(localStorage.getItem('data1'))?.id + '&property_id=' + id)
      .then((resp) => {
        let temp = [...this.state.to]
        temp.filter(i => i.id === id)[0].intrestedUser = temp.filter(i => i.id === id)[0].intrestedUser.filter(j => j.id !== JSON.parse(localStorage.getItem('data1'))?.id)
        this.setState({ to: temp })
        resp.json()
      })
      .then((data) => {

      })
      .catch((error) => {
      })
  }
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="home">
        <Container className="mt-3">
          <Row className="g-4 mt-2">
            {sr.map((o) => {
              return (
                <div className="" key={o.p_id}>
                  <Property
                    id={o.id}
                    title={o.name}
                    rent={o.rent}
                    deposite={o.deposite}
                    image={Photo2}
                    description={o.description}
                    intrestedUser={o.intrestedUser}
                    imageUrl={o.imageUrl}
                    address={o.address}
                    area={o.area}
                    available={o.available}
                    categories={o.categories}
                    city={o.city}
                    deposite={o.deposite}
                    owner={o.owner}
                    onClickInterested={(id) => onClickInterested(id)}
                    onClickNotInterested={(id) => onClickNotInterested(id)}
                  />
                </div>
              )
            })}
            <p> {searcherror} </p>
          </Row>
        </Container>


      </div>
      {sr.length > 0 &&
        <Footer />}
    </div>
  )
}

export default Search
