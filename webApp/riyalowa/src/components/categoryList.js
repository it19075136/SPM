import React, { Component } from "react";
import {
  Button,
  Icon,
  Table,
  Modal,
  Header
} from "semantic-ui-react";
import "../App.css";
import { connect } from "react-redux";
import {getAllCategories,deleteCategories} from "../redux/actions/categoryActions";

class categoryList extends Component {

  constructor(props) {
    super(props);

    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.basicCloseModal = this.basicCloseModal.bind(this);
    this.deleteAndCloseCategory = this.deleteAndCloseCategory.bind(this);


    this.state = {
      isModalOpen : false,
      deleteId : ''
    }
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
    return (
      <div className="main-form-wrapper">
        {this.basicCloseModal()}
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
          {categories.map((value) => {
           
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

