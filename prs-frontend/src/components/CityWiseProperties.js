import React, { useState, useEffect } from "react";
import '../Home.css';
import { Container, Row } from 'react-bootstrap';
import Loader from './Loader';
import Footer from './Footer.js';
import Property from './Property.js';
import Photo2 from '../Photo2.jpg';
import { useParams } from 'react-router-dom'
import axios from 'axios';

function CityWiseProperties(props) {
    const [loading, setLoading] = useState(false)
    const [searcherror, setSearcherror] = useState('')
    const [sr, setSr] = useState([])
    const { city } = useParams()
    useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_BASE_URL + "/property?city=" + city)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if (data.length != 0) {
                    console.log(JSON.stringify(data));
                    setLoading(false)
                    setSr(data)
                }
                else {
                    setLoading(false)
                    setSearcherror("Result not found :(")
                }
            });
    }, [])
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
    return (
        loading ? <Loader /> :
            <div>
                <div className='home'>
                    <Container className='mt-3'>
                        <Row className="g-4 mt-2">
                            {
                                sr.map(
                                    (o) => {

                                        return (
                                            <div className=''>
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
                                        );
                                    }
                                )
                            }
                            <p> {searcherror} </p>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
    )
}
export default CityWiseProperties;