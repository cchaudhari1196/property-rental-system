import React from 'react'
import '../VendorHome.css';
import { Button, Modal, Row, Table } from 'react-bootstrap';
import Loader from './Loader';
import { Rating } from 'react-simple-star-rating'
export default class VendorHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to: [],
            loading: false,
            isQuickPreview: false,
            desc:""
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        let sign = JSON.parse(localStorage.getItem('data1'));
        const url = process.env.REACT_APP_BASE_URL + "/product/viewbyvid?v_id=" + sign.v_id;
        fetch(url)
            .then(resp => resp.json())
            .then(data => this.setState({ to: data, loading: false }));
    }
  
    handleShowMoreLink = (desc) => {
        this.setState({isQuickPreview:true,desc:desc})
    }

    render() {
        return (
            this.state.loading ? <Loader /> :
                <div className='vhome'>
                    <Modal size="lg" show={this.state.isQuickPreview} onHide={() => this.setState({isQuickPreview:false})}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <div className="mt-1">{this.state.desc}</div>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({isQuickPreview:false})}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {this.state.to.length !== 0 ?
                        <div className='vhome_container'>
                            <div className='vhome_row'>

                                <Table striped bordered hover style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#6e1230", color: "white" }}>
                                            <th>Product ID</th>
                                            <th>Product Title</th>
                                            <th>Product Description</th>
                                            <th>Product Price</th>
                                            <th>Product Quantity</th>
                                            <th>No of page</th>
                                            <th>Language</th>
                                            <th>Publisher</th>
                                            <th>Categories</th>
                                            <th>Authors</th>
                                            <th>Product Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.to.map(
                                                (o) => {
                                                    return (
                                                        <tr key={o.p_id}>
                                                            <td>{o.p_id}</td>
                                                            <td>{o.pname}</td>
                                                            <td>{o.pdesc.substring(0,100)}... <a style={{color:"blue", cursor:"pointer"}} onClick={(e)=>this.handleShowMoreLink(o.pdesc)}>Show More</a></td>
                                                            <td>₹ {o.pprice}</td>
                                                            <td>{o.pqty}</td>
                                                            <td>{o.noOfPages}</td>
                                                            <td>{o.language?.language}</td>
                                                            <td>{o?.publisher?.p_name}</td>
                                                            <td>
                                                                {o?.categories.map(cat => (
                                                                    <div key={cat.id}>{cat.c_name}</div>
                                                                ))}
                                                            </td>
                                                            <td>
                                                                {o?.authors.map(author => (
                                                                    <div key={author.id}>{author.a_name}</div>
                                                                ))}
                                                            </td>
                                                            <td>
                                                                <Rating
                                                                    ratingValue={o.prating}
                                                                    allowHalfIcon={true}
                                                                    allowHover={false}
                                                                    readonly={true}
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div className=''><b>Total Number Of Products:<br />{this.state.to.length}</b></div>
                        </div>
                        : < div style={{ textAlign: "center", color: "black" }}><h2>No Data</h2></div>
                    }
                </div>
        )
    }
}