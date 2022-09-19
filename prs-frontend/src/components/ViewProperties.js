import React from 'react'
import '../compheader.css'
import { Button, Modal, Row, Table } from 'react-bootstrap'

export default class ViewProperties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      to: [],
      isQuickPreview: false,
      desc:""
    }
  }
  componentDidMount = () => {
    fetch(process.env.REACT_APP_BASE_URL + '/property')
      .then((resp) => resp.json())
      .then((data) => this.setState({ to: data }))
  }

  handleShowMoreLink = (desc) => {
    this.setState({isQuickPreview:true,desc:desc})
  }
  render() {
    const to1 = this.state.to.length
    return (
      <div>
         <Modal size="lg" show={this.state.isQuickPreview} onHide={() => this.setState({isQuickPreview:false})}>
            <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
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
        {to1 != 0 ? (
          <div className="vhome">
            <div className="vhome_container">
              <div className="vhome_row">
                <Table striped bordered hover style={{ textAlign: 'center' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#6474E5', color: 'white' }}>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Owner Name</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Rent</th>
                      <th>Deposite</th>
                      <th>Area</th>
                      <th>City</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.to.map((o) => {
                      return (
                        <tr key={o.id}>
                          <td>{o.id}</td>
                          <td>
                            <img src={o.imageUrl} style={{ height: '110px' }} />
                          </td>
                          <td>{o.owner?.name}</td>
                          <td>{o.name}</td>
                          <td>{o.description.substring(0,100)}... <a style={{color:"blue", cursor:"pointer"}} onClick={(e)=>this.handleShowMoreLink(o.description)}>Show More</a></td>
                          <td>₹{o.rent}</td>
                          <td>₹{o.deposite}</td>
                          <td>{o.area} sqft</td>
                          <td>{o.city}</td>
                          <td>{o.available ? "Available" : "Not Available"}</td>
                          
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="">
                Total Number Of Products:
                <br />
                {this.state.to.length}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'black' }}>
            <h2>No Data</h2>
          </div>
        )}
      </div>
    )
  }
}
