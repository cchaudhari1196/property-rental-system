import React from 'react'
import '../register.css'
import { Link } from 'react-router-dom'
import 'react-dropdown/style.css'
import { Form, Modal, Button } from 'react-bootstrap'
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
      size: '',
      brand: '',
      qty: '',
      pages: '',
      price: '',
      rating: '',
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
      error: {
        titleerr: '',
        describeerr: '',
        sizeerr: '',
        branderr: '',
        qtyerr: '',
        priceerr: '',
        ratingerr: '',
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
        if (nm === 'size') {
          val = input.value
          if (val.length > 5) {
            error.sizeerr = 'Too Large Size'
          } else {
            error.sizeerr = ''
          }
        } else {
          if (nm === 'pages') {
            val = input.value
            if (val.length < 2) {
              error.branderr = 'Invalid No of Pages'
            } else {
              error.branderr = ''
            }
          } else {
            if (nm === 'qty') {
              val = input.value
              if (val.length < 1) {
                error.qtyerr = 'Invalid qty'
              } else {
                error.qtyerr = ''
              }
            } else {
              if (nm === 'price') {
                val = input.value
                if (val.length < 1) {
                  error.priceerr = 'Invalid price'
                } else {
                  error.priceerr = ''
                }
              } else {
                if (nm === 'rating') {
                  val = input.value
                  if (val > 5) {
                    error.ratingerr = 'Rating should not exceed 5'
                  } else {
                    error.ratingerr = ''
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
      'pname': this.state.title,
      'pdesc': this.state.describe,
      'language': this.state.selectedLanguage.value,
      'pprice': Number(this.state.price),
      'pqty': this.state.qty,
      'imageUrl': this.state.p_image,
      'vId': sign.id,
      'noOfPages': Number(this.state.pages),
      'categoryIds': this.state.selectedCategories.map(c => c.value),
      'authorIds': this.state.selectedAuthors.map(a => a.value),
      'publisherId': this.state.selectedPublishers.value,
    }
    await axios.post(process.env.REACT_APP_BASE_URL + '/product', data)
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
  onClickAdd = (endpoint, modal, allValueState, selectedValueState) => {
    this.setState({ [modal]: false })
    let data = {
      p_name: this.state.newPropertyType
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
    console.log(this.state.p_image)
    return (
      <div className="register">
        {/* add new property type */}
        <ModalForAddProperty
          show={this.state.isShowAddPropertyTypeModal}
          inputValue={newPropertyType}
          setValue={(value) => this.setState({ newPropertyType: value })}
          label={"Property Type "}
          onClickAdd={() => this.onClickAdd("property_type", "isShowAddPropertyTypeModal", "allPropertyTypes", "selectedPropertyType")}
          onClose={() => this.setState({ isShowAddPropertyTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddPropertyStructureTypeModal}
          inputValue={newPropertyStructureType}
          setValue={(value) => this.setState({ newPropertyStructureType: value })}
          label={"Property Structure Type"}
          onClickAdd={() => this.onClickAdd("property_structure_type", "isShowAddPropertyStructureTypeModal", "allPropertyStructureTypes", "selectedPropertyStructureType")}
          onClose={() => this.setState({ isShowAddPropertyStructureTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddFurnishedTypeModal}
          inputValue={newFurnishedType}
          setValue={(value) => this.setState({ newFurnishedType: value })}
          label={"Furnished Type"}
          onClickAdd={() => this.onClickAdd("furnished_type", "isShowAddFurnishedTypeModal", "allFurnishedTypes", "selectedFurnishedType")}
          onClose={() => this.setState({ isShowAddFurnishedTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddTenentTypeModal}
          inputValue={newTenentType}
          setValue={(value) => this.setState({ newTenentType: value })}
          label={"Tenent Type "}
          onClickAdd={() => this.onClickAdd("tenent_type", "isShowAddTenentTypeModal", "allTenentTypes", "selectedTenentType")}
          onClose={() => this.setState({ isShowAddTenentTypeModal: false })}
        />
        <ModalForAddProperty
          show={this.state.isShowAddParkingTypeModal}
          inputValue={newParkingType}
          setValue={(value) => this.setState({ newParkingType: value })}
          label={"Parking Type "}
          onClickAdd={() => this.onClickAdd("parking_type", "isShowAddParkingTypeModal", "allParkingTypes", "selectedParkingType")}
          onClose={() => this.setState({ isShowAddParkingTypeModal: false })}
        />
        {this.state.isLoading ? <Loader /> :
          <div className="register_container">
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
              <Form.Label>Select Tenent Type</Form.Label>
              <Select
                options={this.state.allPropertyTypes}
                placeholder="Select Property Type"
                isMulti={true}
                onChange={this.onChangeCategory}
                value={this.state.selectedParkingType}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Parking Type</Form.Label>
              <Select
                options={this.state.allParkingTypes}
                placeholder="Select Parking Type"
                isMulti={true}
                onChange={this.onChangeCategory}
                value={this.state.selectedParkingType}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Furnished Type</Form.Label>
              <Select
                options={this.state.allAuthors}
                placeholder="Select Furnished Type"
                isMulti={false}
                onChange={this.onChangeAuthor}
                value={this.state.selectedAuthors}
              />
              <span style={{ cursor: "pointer", color: "blue" }}
                onClick={() => this.setState({ isShowAddAuthorModal: true })}>Not in list? or Add new author
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
                onClick={() => this.setState({ isShowAddAuthorModal: true })}>Not in list? or Add
              </span>
            </Form.Group>

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
              <Form.Label> Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                name="qty"
                value={this.state.qty}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label> Price</Form.Label>
              <Form.Control
                type="Float"
                placeholder="Enter Price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>No. of pages</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter No. of Pages"
                  name="pages"
                  value={this.state.pages}
                  onChange={this.handleChange}
                />
              </Form.Group>
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
            <Link to="/owner">
              {' '}
              <button
                className="innerbutton"
                type="submit"
                value="Submit"
                onClick={this.submitForm}
              >
                Add Product
              </button>
            </Link>
            <br />
            <span>
              {this.state.error.titleerr}
              {this.state.error.describeerr}
              {this.state.error.sizeerr}
              {this.state.error.branderr}
              <br />
              {this.state.error.imageerr}
              {this.state.error.priceerr}
            </span>
          </div>
        }
      </div>
    )
  }
}
