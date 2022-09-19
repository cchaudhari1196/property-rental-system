import React from 'react'
import '../register.css'
import { Link } from 'react-router-dom'
import 'react-dropdown/style.css'
import { Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select'
import Loader from './Loader'
import ModalForAddProperty from './ModalForAddProperty'
export default class AddProperty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cid: '',
      title: '',
      describe: '',
      rent: '',
      deposite: '',
      address: '',
      balconies: '',
      city: '',
      area: '',
      cat: [],
      selectedOption: '',
      selectedOption1: '',
      p_image: null,
      isShowAddPropertyTypeModal: false,
      isShowAddPropertyStructureTypeModal: false,
      isShowAddFurnishedTypeModal: false,
      isShowAddTenentTypeModal: false,
      isShowAddParkingTypeModal: false,
      isLoading: false,
      newPropertyType: '',
      newPropertyStructureType: '',
      newFurnishedType: '',
      newTenentType: '',
      newParkingType: '',
      valueFromModal: '',
      error: {
        titleerr: '',
        describeerr: '',
        ratingerr: '',
        depositeerr: '',
        renterr: '',
        addresserr: '',
        cityerr: '',
        areaerr: '',
        balconieserr: '',
      },
      allPropertyTypes: [],
      allFurnishedTypes: [],
      allTenentTypes: [],
      allParkingTypes: [],
      allPropertyStructureTypes: [],
      selectedPropertyType: [],
      selectedPropertyStructureType: [],
      selectedFurnishedType: [],
      selectedParkingType: [],
      selectedTenentType: [],
    }
    this.handleOption = this.handleOption.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
  }

  handleChange = (a) => {
    const input = a.target
    const nm = input.name
    let val
    let error = this.state.error
    if (nm === 'title') {
      val = input.value
      if (val.length < 5) {
        error.titleerr = 'Too short Title'
      } else {
        error.titleerr = ''
      }
    } else {
      if (nm === 'describe') {
        val = input.value
        if (val.length < 10 && val.length > 100) {
          error.describeerr =
            'Description should be in between 10 to 100 Characters'
        } else {
          error.describeerr = ''
        }
      } else {
        if (nm === 'deposite') {
          val = input.value
          if (val.length < 1) {
            error.depositeerr = 'Invalid deposite'
          } else {
            error.depositeerr = ''
          }
        } else {
          if (nm === 'rent') {
            val = input.value
            if (val.length < 1) {
              error.renterr = 'Invalid Rent'
            } else {
              error.renterr = ''
            }
          }
          else {
            if (nm === 'address') {
              val = input.value
              if (val.length < 1) {
                error.addresserr = 'Invalid address'
              } else {
                error.addresserr = ''
              }
            }
            else {
              if (nm === 'city') {
                val = input.value
                if (val.length < 1) {
                  error.cityerr = 'Invalid city'
                } else {
                  error.cityerr = ''
                }
              }
              else {
                if (nm === 'area') {
                  val = input.value
                  if (val.length < 1) {
                    error.areaerr = 'Invalid area'
                  } else {
                    error.areaerr = ''
                  }
                }
                else {
                  if (nm === 'balconies') {
                    val = input.value
                    if (val.length < 1) {
                      error.balconieserr = 'Invalid area'
                    } else {
                      error.balconieserr = ''
                    }
                  }
                }
              }
            }
          }
        }
      }

    }
    this.setState({ error, [nm]: val })
  }

  /* handleOption= selectedOption => {
         this.setState({ selectedOption });
         console.log('Option selected:',selectedOption);
       };*/

  handleOption(e) {
    this.setState({ selectedOption: e.target.value })
  }
  async convertToFile(customerFabricImg, fabricImgType, fabricImgName) {
    if (fabricImgType === undefined) {
      return null
    }
    let file = await fetch(customerFabricImg)
      .then((r) => r.blob())
      .then(
        (blobFile) =>
          new File([blobFile], fabricImgName, { type: fabricImgType }),
      )

    return file
  }
  async onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({ isLoading: true })
      console.log(e.target.files[0])
      let img = e.target.files[0]
      let fileImage = await this.convertToFile(
        URL.createObjectURL(img),
        'png',
        e.target.files[0].name,
      )
      const formData = new FormData()
      formData.append('file', fileImage)
      console.log(fileImage)
      axios
        .post(
          process.env.REACT_APP_BASE_URL + '/upload_product_image',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          console.log(res)
          this.setState({ p_image: res.data, isLoading: false })
        })
        .catch((err) => { })
    }
  }
  submitForm = async (e) => {
    e.preventDefault()
    let sign = JSON.parse(localStorage.getItem('data1'))
    let data = {
      "categoryIds": [this.state.selectedFurnishedType.value,...this.state.selectedPropertyType.map(v=>v.value),...this.state.selectedTenentType.map(v=>v.value),...this.state.selectedParkingType.map(v=>v.value),this.state.selectedPropertyStructureType.value],
      "rent": this.state.rent,
      "deposite": this.state.deposite,
      "imageUrl": this.state.p_image,
      "ownerId": sign.id,
      "name":this.state.title,
      "desc": this.state.describe,
      "address": this.state.address,
      "city": this.state.city,
      "area": this.state.area,
      "noOfBalconies": this.state.balconies,
      "isAvailable": true
    }
    await axios.post(process.env.REACT_APP_BASE_URL + '/property', data)
      .then((resp) => {
        window.location.href = '/owner'
        resp.json()
      })
      .then((data) => {

        this.setState({ st: data, success: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    axios.get(process.env.REACT_APP_BASE_URL + '/register/property_type').then((catRes) => {
      catRes.data.forEach(a => {
        this.setState({ allPropertyTypes: [...this.state.allPropertyTypes, { value: a.id, label: a.name }] })
      })
      axios.get(process.env.REACT_APP_BASE_URL + '/register/furnished_type').then((furnished_type) => {
        furnished_type.data.forEach(a => {
          this.setState({ allFurnishedTypes: [...this.state.allFurnishedTypes, { value: a.id, label: a.name }] })
        })
        axios.get(process.env.REACT_APP_BASE_URL + '/register/tenent_type').then((tenent_type) => {
          tenent_type.data.forEach(a => {
            this.setState({ allTenentTypes: [...this.state.allTenentTypes, { value: a.id, label: a.name }] })
          })
          axios.get(process.env.REACT_APP_BASE_URL + '/register/parking_type').then((parking_type) => {
            parking_type.data.forEach(a => {
              this.setState({ allParkingTypes: [...this.state.allParkingTypes, { value: a.id, label: a.name }] })
            })
            axios.get(process.env.REACT_APP_BASE_URL + '/register/property_structure_type').then((property_structure_type) => {
              property_structure_type.data.forEach(a => {
                this.setState({ allPropertyStructureTypes: [...this.state.allPropertyStructureTypes, { value: a.id, label: a.name }] })
              })
              this.setState({ isLoading: false })
            }).catch((err) => { })
          }).catch((err) => { })
        }).catch((err) => { })
      }).catch((err) => { })
    }).catch((err) => { })
  }
  onClickAdd = (endpoint, modal, allValueState, selectedValueState, inputValue) => {
    this.setState({ [modal]: false })
    let data = {
      name: inputValue
    }
    axios.post(process.env.REACT_APP_BASE_URL + '/register/' + endpoint, data).then((res) => {
      console.log(res)
      this.setState({
        isShowAddPublisherModal: false,
        [allValueState]: [...this.state[allValueState], { value: res.data.id, label: res.data.name }],
        [selectedValueState]: { value: res.data.id, label: res.data.name }
      })
    }).catch((err) => { })
  }
  onChangePropertyType = (selectedOption) => {
    console.log(selectedOption)
    this.setState({ selectedPropertyType: selectedOption })
  }
  onChangePropertyStructureType = (selectedOption) => {
    this.setState({ selectedPropertyStructureType: selectedOption })
  }
  onChangeFurnishedType = (selectedOption) => {
    this.setState({ selectedFurnishedType: selectedOption })
  }
  onChangeParkingType = (selectedOption) => {
    this.setState({ selectedParkingType: selectedOption })
  }
  onChangeTenentType = (selectedOption) => {
    this.setState({ selectedTenentType: selectedOption })
  }
  render() {
    // console.log(this.state.allPropertyTypes)
    return (
      <div className="register">
        {/* add new property type */}
        <ModalForAddProperty
          show={this.state.isShowAddPropertyTypeModal}
          inputValue={this.state.newPropertyType}
          setValue={(value) => this.setState({ newPropertyType: value })}
          label={"Property Type "}
          onClickAdd={() => this.onClickAdd("property_type", "isShowAddPropertyTypeModal", "allPropertyTypes", "selectedPropertyType", this.state.newPropertyType)}
          onClose={() => this.setState({ isShowAddPropertyTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddPropertyStructureTypeModal}
          inputValue={this.state.newPropertyStructureType}
          setValue={(value) => this.setState({ newPropertyStructureType: value })}
          label={"Property Structure Type"}
          onClickAdd={() => this.onClickAdd("property_structure_type", "isShowAddPropertyStructureTypeModal", "allPropertyStructureTypes", "selectedPropertyStructureType", this.state.newPropertyStructureType)}
          onClose={() => this.setState({ isShowAddPropertyStructureTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddFurnishedTypeModal}
          inputValue={this.state.newFurnishedType}
          setValue={(value) => this.setState({ newFurnishedType: value })}
          label={"Furnished Type"}
          onClickAdd={() => this.onClickAdd("furnished_type", "isShowAddFurnishedTypeModal", "allFurnishedTypes", "selectedFurnishedType", this.state.newFurnishedType)}
          onClose={() => this.setState({ isShowAddFurnishedTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddTenentTypeModal}
          inputValue={this.state.newTenentType}
          setValue={(value) => this.setState({ newTenentType: value })}
          label={"Tenent Type "}
          onClickAdd={() => this.onClickAdd("tenent_type", "isShowAddTenentTypeModal", "allTenentTypes", "selectedTenentType", this.state.newTenentType)}
          onClose={() => this.setState({ isShowAddTenentTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddParkingTypeModal}
          inputValue={this.state.newParkingType}
          setValue={(value) => this.setState({ newParkingType: value })}
          label={"Parking Type "}
          onClickAdd={() => this.onClickAdd("parking_type", "isShowAddParkingTypeModal", "allParkingTypes", "selectedParkingType", this.state.newParkingType)}
          onClose={() => this.setState({ isShowAddParkingTypeModal: false })}
        />
        {this.state.isLoading ? <Loader /> :
          <div className="register_container">
            <Row>
              <Col>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Property Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Property Type</Form.Label>
                  <Select
                    options={this.state.allPropertyTypes}
                    placeholder="Select Property Type"
                    isMulti={true}
                    onChange={this.onChangePropertyType}
                    value={this.state.selectedPropertyType}
                  />
                  <span style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => this.setState({ isShowAddPropertyTypeModal: true })}>Not in list? or Add
                  </span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Tenent Type</Form.Label>
                  <Select
                    options={this.state.allTenentTypes}
                    placeholder="Select Tenent Type"
                    isMulti={true}
                    onChange={this.onChangeTenentType}
                    value={this.state.selectedTenentType}
                  />
                  <span style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => this.setState({ isShowAddTenentTypeModal: true })}>Not in list? or Add
                  </span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Parking Type</Form.Label>
                  <Select
                    options={this.state.allParkingTypes}
                    placeholder="Select Parking Type"
                    isMulti={true}
                    onChange={this.onChangeParkingType}
                    value={this.state.selectedParkingType}
                  />
                  <span style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => this.setState({ isShowAddParkingTypeModal: true })}>Not in list? or Add
                  </span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Furnished Type</Form.Label>
                  <Select
                    options={this.state.allFurnishedTypes}
                    placeholder="Select Furnished Type"
                    isMulti={false}
                    onChange={this.onChangeFurnishedType}
                    value={this.state.selectedFurnishedType}
                  />
                  <span style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => this.setState({ isShowAddFurnishedTypeModal: true })}>Not in list? or Add new author
                  </span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Property Structure Type</Form.Label>
                  <Select
                    options={this.state.allPropertyStructureTypes}
                    placeholder="Select Property Structure Type"
                    isMulti={false}
                    onChange={this.onChangePropertyStructureType}
                    value={this.state.selectedPropertyStructureType}
                  />
                  <span style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => this.setState({ isShowAddPropertyStructureTypeModal: true })}>Not in list? or Add
                  </span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label> Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Description"
                    name="describe"
                    value={this.state.describe}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label> Rent</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Rent"
                    name="rent"
                    value={this.state.rent}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label> Deposite</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Deposite"
                    name="deposite"
                    value={this.state.deposite}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label> Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter address"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label> City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label> Area(sq.ft.)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter area"
                    name="area"
                    value={this.state.area}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label> No. of Balconies</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter No. of Balconies"
                    name="balconies"
                    value={this.state.balconies}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control type="file" onChange={this.onChangeImage} />
                </Form.Group>
                <span style={{ color: 'red' }}>*Upload Imgage within 2MB size</span>
                {(this.state.p_image !== null && this.state.p_image !== undefined) && (
                  <div>
                    <img
                      src={this.state.p_image}
                      alt="image"
                      style={{ width: '50px', height: '50px' }}
                    />
                  </div>
                )}
              </Col>
              <Row>
                <Col style={{display:"flex",justifyContent: 'center'}}>
                  <Link to="/owner">
                    {' '}
                    <button
                      className="innerbutton"
                      type="submit"
                      value="Submit"
                      onClick={this.submitForm}
                    >
                      Add Property
                    </button>
                  </Link>
                  <br />
                  <span>
                    {this.state.error.titleerr}
                    {this.state.error.describeerr}
                    {this.state.error.ratingerr}
                    {this.state.error.depositeerr}
                    {this.state.error.renterr}
                    {this.state.error.addresserr}
                    {this.state.error.cityerr}
                    {this.state.error.areaerr}
                    {this.state.error.balconieserr}
                  </span>
                </Col>
              </Row>

            </Row>
          </div>
        }
      </div>
    )
  }
}
