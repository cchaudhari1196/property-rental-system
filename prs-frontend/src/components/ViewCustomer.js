import React from 'react'
import '../compheader.css';
import { Table } from 'react-bootstrap';

export default class ViewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to: []
        }
    }
    componentDidMount = () => {
        fetch(process.env.REACT_APP_BASE_URL + "/user/getalluser")
            .then(resp => resp.json())
            .then(data => this.setState({ to: data }));

    }
    render() {
        const to1 = this.state.to.length;
        return (
            <div>{to1 != 0 ?
                <div className='vhome'>
                    <div className='vhome_container'>
                        <div className=''>
                            <Table striped bordered hover  style={{textAlign: 'center'}}>
                                <thead>
                                    <tr style={{ backgroundColor: "#6474E5", color: "white" }}>
                                        <th>Customer ID</th>
                                        <th>Customer FirstName</th>
                                        <th>Customer LastName</th>
                                        <th>Customer Email</th>
                                        <th>Customer Address</th>
                                        <th>Customer ContactNumber</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.to.map(
                                            (o) => {
                                                return (
                                                    <tr>
                                                        <td>{o.id}</td>
                                                        <td>{o.fname}</td>
                                                        <td>{o.lname}</td>
                                                        <td>{o.email}</td>
                                                        <td>{o.address}</td>
                                                        <td>{o.phone}</td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className='vhome_row'>Total Number Of Customer:<br />{this.state.to.length}</div>
                    </div>
                </div>
                : <div style={{ textAlign: "center", color: "black" }}><h2>No Data</h2></div>
            }
            </div>
        )
    }
}