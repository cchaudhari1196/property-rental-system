import React from 'react'
import '../compheader.css';
import { Table } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
export default class ViewOutofStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to: []
        }
    }
    componentDidMount = () => {
        let sign = JSON.parse(localStorage.getItem('data1'));
        console.log(sign.vid);
        fetch(process.env.REACT_APP_BASE_URL + "/product/viewoutofstock?v_id=" + sign.v_id)
            .then(resp => resp.json())
            .then(data => this.setState({ to: data }));

    }
    render() {
        const to1 = this.state.to.length;
        return (
            <div>
                {to1 != 0 ?
                    <div className='vhome'>
                        <div className='vhome_container'>
                            <div className='vhome_row'>
                                {/* <table>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Title</th>
                        <th>Product Describe</th>
                        <th>Product Size</th>
                        <th>Product Brand</th>
                        <th>Product Price</th>
                        <th>Product Rating</th>
                        <th>Product Quantity</th>
                    </tr>
                    {
                        this.state.to.map(
                            (o) => {
                                return(
                                    <tr>
                                        <td>{o.pid}</td>
                                        <td>{o.pname}</td>
                                        <td>{o.pdesc}</td>
                                        <td>{o.psize}</td>
                                        <td>{o.pbrand}</td>
                                        <td>{o.pprice}</td>
                                        <td>{o.prating}</td>
                                        <td>{o.pqty}</td>
                                    </tr>
                                );
                            }
                        )    
                    }
                    </table> */}
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
                                                            <td>{o.pdesc}</td>
                                                            <td>₹ {o.pprice}</td>
                                                            <td>{o.pqty}</td>
                                                            <td>{o.noOfPages}</td>
                                                            <td>{o.language}</td>
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
                    </div>
                    : < div style={{ textAlign: "center", color: "black" }}><h2>No Data</h2></div>
                }
            </div>
        )
    }
}