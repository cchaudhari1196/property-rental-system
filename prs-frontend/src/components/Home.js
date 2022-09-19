import React from 'react'
import '../Home.css'
import Photo2 from '../Photo2.jpg'
import Property from './Property.js'
import { Container, Row } from 'react-bootstrap'
import Loader from './Loader'
import Footer from './Footer.js'
import axios from 'axios';
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      to: [],
      loading: false,
      isError: false
    }
  }
  componentDidMount = () => {
    this.setState({ loading: true })
    fetch(process.env.REACT_APP_BASE_URL + '/property')
      .then((resp) => resp.json())
      .then((data) => this.setState({ to: data, loading: false })).catch(e => {
        this.setState({ isError: true, loading: false })
      })
  }
  onClickInterested = async (id) => {
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
    }else{
      window.location.href = '/login'
    }

  }
  onClickNotInterested = async (id) => {
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
  render() {
    console.log(this.state.to)
    return this.state.loading ? (
      <Loader />
    ) : this.state.isError ? <h1>Something went wrong :(<br></br>Check your internet connection</h1> : (
      <div>
        <div className="home">
          <Container className="mt-3">
            <Row className="g-4 mt-2">
              {this.state.to.map((o) => {
                return (
                  <div className="" key={o.id}>
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
                      onClickInterested={(id) => this.onClickInterested(id)}
                      onClickNotInterested={(id) => this.onClickNotInterested(id)}
                    />
                  </div>
                )
              })}
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    )
  }
}
