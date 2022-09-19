import React from 'react'
import '../OwnerHome.css';
import { Button, Modal, Row, Table, Form } from 'react-bootstrap';
import Loader from './Loader';
import { Rating } from 'react-simple-star-rating'
export default class OwnerHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to: [],
            loading: false,
            isQuickPreview: false,
            desc: ""
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
        this.setState({ isQuickPreview: true, desc: desc })
    }
    onChangeAvailable = async (e, o) => {
        e.preventDefault()
        let allProperties = [...this.state.to]
        allProperties.filter(v => v.id === o.id).map(async (v) => {

            console.log(v.available)

            await fetch(process.env.REACT_APP_BASE_URL + '/property/change_availability/' + o.id, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    // response.json()
                    v.available = !v.available
                    this.setState({ to: allProperties })
                })
                .then(data => {

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
    }
    render() {
        return (
            this.state.loading ? <Loader /> :
                <div className='vhome'>
                    <Modal size="lg" show={this.state.isQuickPreview} onHide={() => this.setState({ isQuickPreview: false })}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <div className="mt-1">{this.state.desc}</div>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ isQuickPreview: false })}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {this.state.to.length !== 0 ?
                        <div className='vhome_container'>
                            <div className='vhome_row'>

                                <Table striped bordered hover style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#6474E5", color: "white" }}>
                                            <th>Id</th>
                                            <th>Property Title</th>
                                            <th>Property Description</th>
                                            <th>Deposite</th>
                                            <th>Rent</th>
                                            <th>No of Balconies</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>Categories</th>
                                            <th>Intrested User</th>
                                            <th>Availability</th>
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
                                                            <td>{o.description.substring(0, 100)}... <a style={{ color: "blue", cursor: "pointer" }} onClick={(e) => this.handleShowMoreLink(o.description)}>Show More</a></td>
                                                            <td>₹{o.price}</td>
                                                            <td>₹{o.rent}</td>
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
                                                            <td>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch5"
                                                                    checked={(o.available === "true" || o.available === true) ? true : false}
                                                                    onChange={(e) => this.onChangeAvailable(e, o)}
                                                                    className="mt-2"
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
                            <div className=''><b>Total Number Of Properties:<br />{this.state.to.length}</b></div>
                        </div>
                        : < div style={{ textAlign: "center", color: "black" }}><h2>No Data</h2></div>
                    }
                </div>
        )
    }
}