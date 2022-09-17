import React from 'react'
import '../register.css'
import { Link } from 'react-router-dom'
import 'react-dropdown/style.css'
import { Form, Table } from 'react-bootstrap'

export default class AddLangauage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lname: '',
      to:[]
    }
  }
  
  componentDidMount = () => {
    fetch(process.env.REACT_APP_BASE_URL + '/register/languages')
      .then((resp) => resp.json())
      .then((data) => this.setState({ to: data }))
  }

  handleChange = (a) => {
    this.setState({ lname: a.target.value })
  }

  submitForm = async (e) => {
    e.preventDefault()
    const reqData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: this.state.lname,
      }),
    }
    await fetch(process.env.REACT_APP_BASE_URL + '/register/language', reqData)
      .then((resp) => resp.json())
      .then((data) => this.setState({ st: data, success: true }))
    window.location.href = '/addlanguage'
  }
  render() {
    return (
      <div style={{display:"flex",justifyContent: "space-evenly"}}>
        <div className="register_container mt-4">
          <form>
            <Form.Group className="mb-2">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={this.state.lname}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Link to="/addlanguage">
              {' '}
              <button
                className="innerbutton mt-3"
                type="submit"
                value="Submit"
                onClick={this.submitForm}
              >
                Add Language
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
                        <th>Language ID</th>
                        <th>Language Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.to.map((o) => {
                        return (
                          <tr>
                            <td>{o.language_id}</td>
                            <td>{o.language}</td>
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
