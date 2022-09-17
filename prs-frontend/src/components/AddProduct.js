import React from 'react'
import '../register.css'
import { Link } from 'react-router-dom'
import 'react-dropdown/style.css'
import { Form, Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select'
import Loader from './Loader'
export default class AddProduct extends React.Component {
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
      isShowAddAuthorModal: false,
      isShowAddPublisherModal: false,
      isLoading: false,
      newAuthorName: '',
      newPublisherName: '',
      error: {
        titleerr: '',
        describeerr: '',
        sizeerr: '',
        branderr: '',
        qtyerr: '',
        priceerr: '',
        ratingerr: '',
      },
      c_types: [],
      allAuthors: [],
      allPublishers: [],
      allCategories: [],
      allLanguages: [],
      selectedAuthors: [],
      selectedPublishers: {},
      selectedCategories: [],
      selectedLanguage: [],
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
  // convertImage = async (imageBlobUrl, imageName) => {
  //     const formData = new FormData();
  //     let blob = await fetch(imageBlobUrl).then((r) => r.blob());
  //     var file = new File([blob], imageName);
  //     formData.append("file", file);
  //     console.log(formData);
  //     return formData
  //     // let res = await this.uploadImage(formData);
  //     // return res.data;
  // };
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
      'vId': sign.v_id,
      'noOfPages': Number(this.state.pages),
      'categoryIds': this.state.selectedCategories.map(c => c.value),
      'authorIds': this.state.selectedAuthors.map(a => a.value),
      'publisherId': this.state.selectedPublishers.value,
    }
    await axios.post(process.env.REACT_APP_BASE_URL + '/product', data)
      .then((resp) => {
        window.location.href = '/vendor'
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
    axios.get(process.env.REACT_APP_BASE_URL + '/register/authors').then((res) => {
      res.data.forEach(a => {
        this.setState({ allAuthors: [...this.state.allAuthors, { value: a.a_id, label: a.a_name }] })
      })
      axios.get(process.env.REACT_APP_BASE_URL + '/register/publishers').then((pubRes) => {
        pubRes.data.forEach(a => {
          this.setState({ allPublishers: [...this.state.allPublishers, { value: a.publisher_id, label: a.p_name }] })
        })
        axios.get(process.env.REACT_APP_BASE_URL + '/category').then((catRes) => {
          catRes.data.forEach(a => {
            this.setState({ allCategories: [...this.state.allCategories, { value: a.c_id, label: a.c_name }] })
          })
        }).catch((err) => { })
        axios.get(process.env.REACT_APP_BASE_URL + '/register/languages').then((langRes) => {
          langRes.data.forEach(a => {
            this.setState({ isLoading: false })
            this.setState({ allLanguages: [...this.state.allLanguages, { value: a.language_id, label: a.language }] })
          })
        }).catch((err) => { })
      }).catch((err) => { })
    }).catch((err) => { })
  }
  onClickAddAuthor = () => {
    this.setState({ isShowAddAuthorModal: false })
    let data = {
      a_name: this.state.newAuthorName
    }
    axios.post(process.env.REACT_APP_BASE_URL + '/register/author', data).then((res) => {
      console.log(res.data)
      this.setState({
        isShowAddAuthorModal: false, allAuthors: [...this.state.allAuthors, { value: res.data.a_id, label: res.data.a_name }],
        selectedAuthors: [...this.state.selectedAuthors, { value: res.data.a_id, label: res.data.a_name }]
      })
    }).catch((err) => { })
  }
  onClickAddPublisher = () => {
    this.setState({ isShowAddPublisherModal: false })
    let data = {
      p_name: this.state.newPublisherName
    }
    axios.post(process.env.REACT_APP_BASE_URL + '/register/publisher', data).then((res) => {
      console.log(res)
      this.setState({
        isShowAddPublisherModal: false,
        allPublishers: [...this.state.allPublishers, { value: res.data.publisher_id, label: res.data.p_name }],
        selectedPublishers: { value: res.data.publisher_id, label: res.data.p_name }
      })
    }).catch((err) => { })
  }
  onChangeAuthor = (selectedOption) => {
    console.log(selectedOption)
    this.setState({ selectedAuthors: selectedOption })
  }
  onChangePublisher = (selectedOption) => {
    this.setState({ selectedPublishers: selectedOption })
  }
  onChangeCategory = (selectedOption) => {
    this.setState({ selectedCategories: selectedOption })
  }
  onChangeLanguage = (selectedOption) => {
    this.setState({ selectedLanguage: selectedOption })
  }
  render() {
    console.log(this.state.p_image)
    return (
      <div className="register">
        {/* add new author */}
        <Modal
          show={this.state.isShowAddAuthorModal}
          onHide={() => this.setState({ isShowAddAuthorModal: false })}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Author
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Enter author name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                name="title"
                value={this.state.newAuthorName}
                onChange={(e) => { this.setState({ newAuthorName: e.target.value }) }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ isShowAddAuthorModal: false })}>Close</Button>
            <Button variant="success"
              disabled={this.state.newAuthorName === ''} onClick={this.onClickAddAuthor}>Add</Button>
          </Modal.Footer>
        </Modal>

        {/* add new publisher */}
        <Modal
          show={this.state.isShowAddPublisherModal}
          onHide={() => this.setState({ isShowAddPublisherModal: false })}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Publisher
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Enter publisher name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter publisher"
                name="title"
                value={this.state.newPublisherName}
                onChange={(e) => { this.setState({ newPublisherName: e.target.value }) }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ isShowAddPublisherModal: false })}>Close</Button>
            <Button variant="success"
              disabled={this.state.newPublisherName === ''} onClick={this.onClickAddPublisher}>Add</Button>
          </Modal.Footer>
        </Modal>
        {this.state.isLoading ? <Loader /> :
          <div className="register_container">
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Category</Form.Label>
              <Select
                options={this.state.allCategories}
                placeholder="Select Category"
                isMulti={true}
                onChange={this.onChangeCategory}
                value={this.state.selectedCategories}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Author</Form.Label>
              <Select
                options={this.state.allAuthors}
                placeholder="Select Author"
                isMulti={true}
                onChange={this.onChangeAuthor}
                value={this.state.selectedAuthors}
              />
              <span style={{ cursor: "pointer", color: "blue" }}
                onClick={() => this.setState({ isShowAddAuthorModal: true })}>Not in list? or Add new author
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Publisher</Form.Label>
              <Select
                options={this.state.allPublishers}
                placeholder="Select Publisher"
                isMulti={false}
                onChange={this.onChangePublisher}
                value={this.state.selectedPublishers}
              />
              <span style={{ cursor: "pointer", color: "blue" }}
                onClick={() => this.setState({ isShowAddPublisherModal: true })}>Not in list? or Add new publisher
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Language</Form.Label>
              <Select
                options={this.state.allLanguages}
                placeholder="Select Language"
                isMulti={false}
                onChange={this.onChangeLanguage}
                value={this.state.selectedLanguage}
              />
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
            <Link to="/vendor">
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
