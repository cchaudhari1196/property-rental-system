import React from 'react'
import '../register.css'
import { Link } from 'react-router-dom'
import 'react-dropdown/style.css'
import { Form, Table } from 'react-bootstrap'

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cname: '',
      to:[]
    }
  }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_BASE_URL + '/category')
      .then((resp) => resp.json())
      .then((data) => this.setState({ to: data }))
  }

  handleChange = (a) => {
    this.setState({ cname: a.target.value })
    console.log(this.state.cname)
  }
  submitForm = async (e) => {
    e.preventDefault()
    const reqData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        c_name: this.state.cname,
      }),
    }
    await fetch(process.env.REACT_APP_BASE_URL + '/category', reqData)
      .then((resp) => resp.json())
      .then((data) => this.setState({ st: data, success: true }))
    window.location.href = '/addcategory'
  }
  render() {
    return (
      <div style={{display:"flex",justifyContent: "space-evenly"}} >
        <div className="register_container mt-4">
          <form>
            <Form.Group className="mb-2">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="cname"
                value={this.state.cname}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Link to="/viewproducts">
              {' '}
              <button
                className="innerbutton mt-3"
                type="submit"
                value="Submit"
                onClick={this.submitForm}
              >
                Add Category
              </button>
            </Link>
            <br />
          </form>
        </div>

        <div>
            {this.state.to.length != 0 ? (
            <div className="vhome">
                <div className="vhome_container">
                <div className="vhome_row">
                    <Table striped bordered hover style={{ textAlign: 'center' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#6e1230', color: 'white' }}>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.to.map((o) => {
                        return (
                            <tr>
                            <td>{o.c_id}</td>
                            <td>{o.c_name}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                    </Table>
                </div>
                <div className="">
                    Total Number Of Category:
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
      </div>
    )
  }
}
