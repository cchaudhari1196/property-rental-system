import React, { useState, useEffect } from "react";
import '../Home.css';
import { Container, Row } from 'react-bootstrap';
import Loader from './Loader';
import Footer from './Footer.js';
import Product from './Product.js';
import Photo2 from '../Photo2.jpg';
import { useParams } from 'react-router-dom'

function CategoriesWiseProduct(props) {
    const [loading, setLoading] = useState(false)
    const [searcherror, setSearcherror] = useState('')
    const [sr, setSr] = useState([])
    const { category } = useParams()
    useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_BASE_URL + "/product?categoryId=" + category)
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
    return (
        loading ? <Loader /> :
            <div>
                <div className='home'>
                    <Container className='mt-3'>
                        <Row xs={2} md={4} className="g-4 mt-2">
                            {
                                sr.map(
                                    (o) => {

                                        return (
                                            <div className=''>
                                                <Product
                                                    id={o.p_id}
                                                    title={o.pname}
                                                    price={o.pprice}
                                                    image={Photo2}
                                                    describe={o.pdesc}
                                                    rating={o.prating}
                                                    categories={o.categories}
                                                    authors={o.authors}
                                                    p_qty={o.pqty}
                                                    imageUrl={o.imageUrl}
                                                    language={o.language}
                                                    noOfPages={o.noOfPages}
                                                    publisher={o.publisher}
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
export default CategoriesWiseProduct;