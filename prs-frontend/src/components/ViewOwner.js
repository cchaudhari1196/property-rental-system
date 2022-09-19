import React from 'react'
import '../compheader.css';
import { Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

export default class Viewowner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to: []
        }
    }
    componentDidMount = () => {
        fetch(process.env.REACT_APP_BASE_URL + "/owner")
            .then(resp => resp.json())
            .then(data => this.setState({ to: data }));

    }
    onChangeAproveStatus = async (e, o) => {
        e.preventDefault()
        let allOwners = [...this.state.to]
        allOwners.filter(v => v.id === o.id).map(async (v) => {

            console.log(v.status)

            await fetch(process.env.REACT_APP_BASE_URL + '/owner/approve/' + o.id + "/" + !v.status, {
                method: 'PATCH', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    v.status = !v.status
                    this.setState({ to: allOwners })
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
    }
    render() {
        const to1 = this.state.to.length;
        return (
            <div>
                {to1 != 0 ?
                    <div className='vhome'>
                        <div className='vhome_container'>
                            <div className='mt-3'>
                                <Table striped bordered hover style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#6474E5", color: "white" }}>
                                            <th>Owner ID</th>
                                            <th>Owner FirstName</th>
                                            <th>Owner ContactNumber</th>
                                            <th>Owner Email</th>
                                            <th>Owner Address</th>
                                            <th>Owner Approve</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.to.map((o) => {
                                            return (
                                                <tr>
                                                    <td>{o.id}</td>
                                                    <td>{o.name}</td>
                                                    <td>{o.phone}</td>
                                                    <td>{o.email}</td>
                                                    <td>{o.address}</td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch5"
                                                            checked={(o.status === "true" || o.status === true) ? true : false}
                                                            onChange={(e) => this.onChangeAproveStatus(e, o)}
                                                            className="mt-2"
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                            <div className='vhome_row'>Total Number Of Owners:<br />{this.state.to.length}</div>
                        </div>
                    </div>
                    : < div style={{ textAlign: "center", color: "black" }}><h2>No Data</h2></div>
                }
            </div>
        )
    }
}