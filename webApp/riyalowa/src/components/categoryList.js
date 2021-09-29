import React, { Component } from "react";
import {
  Button,
  Icon,
  Table,
  Modal,
  Header,
  Dropdown,
  Radio,
  Form
} from "semantic-ui-react";
import "../App.css";
import { connect } from "react-redux";
import {getAllCategories,deleteCategories} from "../redux/actions/categoryActions";
import { CSVLink } from 'react-csv';
class categoryList extends Component {
  
  constructor(props) {
    super(props);

    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.basicCloseModal = this.basicCloseModal.bind(this);
    this.deleteAndCloseCategory = this.deleteAndCloseCategory.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.categoryOnCLick= this.categoryOnCLick.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);


    this.state = {
      isModalOpen : false,
      deleteId : '',
      searchQuerry: '',
      radioVehicleType : 'Vehicles',
      csvReport : {
        data : [],
        headers :  [
          { label:'Category type', key:'type' }, //type
          { label:'Category name', key:'mainName' }, //name
          { label:'Category description', key:'mainDescription' }, //description
          // { label:'Created At', key:'date' } //created At
        ],
        filename : 'categoryReport.csv'  
      }

    }
  }

  handleTypeChange(e,{value}){
    this.setState({
      radioVehicleType : value 
    })

  }

  categoryOnCLick(){
    window.location.href= '/category/add'
  }

  handleInputChange(e){
    this.setState({
      searchQuerry : e.target.value
    })

  }

  updateCategory(id){
    this.props.history.push({
      pathname: '/category/update',
        state: id // your data array of objects
    })
  }

  deleteCategory(id){
    // this.props.deleteCategories(id);
    this.setState({
      isModalOpen : true,
      deleteId : id
    })
  }

  deleteAndCloseCategory(){
    this.props.deleteCategories(this.state.deleteId)
    this.setState({isModalOpen:false})
  }

  componentDidMount(){
    this.props.getAllCategories();
  }

  basicCloseModal(){
    return( <Modal
    basic
    open={this.state.isModalOpen}
    size='small'
  >
    <Header icon>
      <Icon name='trash' />
      <br></br>
      <br></br>
      <br></br>
      Are you sure want to delete this category ?
    </Header>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={() => this.setState({isModalOpen:false})}>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted 
      onClick={this.deleteAndCloseCategory}
      >
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>)
  }
  
  render() {
    const {categories} = this.props;  
    console.log('categories: ', categories);
    const {searchQuerry, csvReport} = this.state;  

    let categoriesCustom = categories.map((value) => {
     if(value.type == this.state.radioVehicleType){
       return value;
     }
    }).filter(n => n)

    let CSV = {
      data : categories,
      headers :  [
        { label:'Category type', key:'type' }, //type
        { label:'Category name', key:'mainName' }, //name
        { label:'Category description', key:'mainDescription' }, //description
        // { label:'Created At', key:'date' } //created At
      ],
      filename : 'categoryReport.csv'  
    }
    console.log('CSV: ', CSV.headers);

    return (
      <div className="main-form-wrapper-category-list">
        {this.basicCloseModal()}

        <Button className="add-category-btn" onClick={this.categoryOnCLick}>Add a new category</Button>
        <CSVLink 
        headers = {CSV.headers}
        data = {CSV.data}
        filename={"categoryList.csv"}
         className='export-btn-category'
          // hidden={this.props.sparepartsAd.length < 1}
          >Export to CSV</CSVLink>

        <input type="text" className="search-bar-cat-list" placeholder="Search for..."  onChange={this.handleInputChange}/>

        <Form className="form-category-types">
        {/* <Form.Field>
          Selected value: <b>{this.state.radioVehicleType}</b>
        </Form.Field> */}
        <Form.Field className="form-field-category">
          <Radio
            label='Vehicles'
            name='radioGroup'
            value='Vehicles'
            checked={this.state.radioVehicleType === 'Vehicles'}
            onChange={this.handleTypeChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Spare Parts'
            name='radioGroup'
            value='Spare Parts'
            checked={this.state.radioVehicleType === 'Spare Parts'}
            onChange={this.handleTypeChange}
          />
        </Form.Field>
        {/* <Form.Field>
          <Radio
            label='All Types'
            name='radioGroup'
            value=''
            checked={this.state.radioVehicleType === ''}
            onChange={this.handleTypeChange}
          />
        </Form.Field> */}
      </Form>

        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          
          <Table.Body>
          {categoriesCustom.filter(
            elem => {return elem.mainName.toLowerCase().includes(`${searchQuerry.toLocaleLowerCase()}`)} 
          ).map((value) => {
           
           return(
            <Table.Row>
              <Table.Cell>{value.type}</Table.Cell>
              <Table.Cell>{value.mainName}</Table.Cell>
              <Table.Cell>{value.mainDescription}</Table.Cell>
              <Table.Cell>
              <Button color="blue" onClick={() => this.updateCategory(value._id)} >
                Update
              </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => this.deleteCategory(value._id)}>
                Delete
                </Button>
              </Table.Cell>
            </Table.Row>
            )
              })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    categories:state.category.categories
});

export default connect(mapStateToProps, {getAllCategories,deleteCategories})(categoryList);

