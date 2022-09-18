import React from 'react'
import '../OwnerHome.css';
import { Button, Modal, Row, Table } from 'react-bootstrap';
import Loader from './Loader';
import { Rating } from 'react-simple-star-rating'
export default class OwnerHome extends React.Component {
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
        const url = process.env.REACT_APP_BASE_URL + "/property/by_owner?id=" + sign.id;
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
                                            <th>Property ID</th>
                                            <th>Property Title</th>
                                            <th>Property Description</th>
                                            <th>Deposite</th>
                                            <th>Rent</th>
                                            <th>No Of Balconies</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>Categories</th>
                                            <th>Intrested User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.to.map(
                                                (o) => {
                                                    return (
                                                        <tr key={o.id}>
                                                            <td>{o.id}</td>
                                                            <td>{o.name}</td>
                                                            <td>{o.description.substring(0,100)}... <a style={{color:"blue", cursor:"pointer"}} onClick={(e)=>this.handleShowMoreLink(o.pdesc)}>Show More</a></td>
                                                            <td>₹ {o.price}</td>
                                                            <td>{o.rent}</td>
                                                            <td>{o.noOfBalconies}</td>
                                                            <td>{o.address}</td>
                                                            <td>{o?.city}</td>
                                                            <td>
                                                                {o?.categories.map(cat => (
                                                                    <div key={cat.id}>{cat.name}</div>
                                                                ))}
                                                            </td>
                                                            <td>
                                                                {o?.intrestedUser.map(intrestedUsers => (
                                                                    <div key={intrestedUsers.id}>{intrestedUsers.name} - {intrestedUsers.phone}</div>
                                                                ))}
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