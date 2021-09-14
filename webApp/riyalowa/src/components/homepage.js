import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Table, Modal, Header, Grid, Label } from "semantic-ui-react";
import "../App.css";
import { getAllCategories } from "../redux/actions/categoryActions";

class homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCategories: "",
    };
  }

  componentDidMount() {
    const { getAllCategories } = this.props;
    getAllCategories();
  }

  render() {
    const { categories } = this.props;

    let lengthSpareParts = categories.filter((val) => val.type == "Spare Parts").slice(0,4).length
    console.log('lengthSpareParts: ', lengthSpareParts);

    let lengthVehicles = categories.filter((val) => val.type == "Vehicles").slice(0,4).length



    return (
      <div className="form-centered-homepage">

         <h3>Browse Vehicles</h3> 
         
         <div>
        <Grid columns={lengthVehicles} container>
            
          {categories.filter((val) => val.type ==  'Vehicles' ).slice(0,4).map((data, index) => (
             
            <Grid.Column key={index}>
              <Button className="category-card-custom"  animated='vertical'>
                <Button.Content visible>{data.mainName}</Button.Content>
                <Button.Content hidden>{data.mainName}</Button.Content>
              </Button>
            </Grid.Column>
          ))}
        </Grid>
        </div>

        <h3>Browse Spare Parts</h3> 
         
         <div>
        <Grid columns={lengthSpareParts} container>
            
          {categories.filter((val) => val.type == "Spare Parts" ).slice(0,8).map((data, index) => (
             
            <Grid.Column key={index}>
              <Button className="category-card-custom"  animated='vertical'>
                <Button.Content visible>{data.mainName}</Button.Content>
                <Button.Content hidden>{data.mainName}</Button.Content>
              </Button>
            </Grid.Column>
          ))}
        </Grid>
        </div>   



      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categories: state.category.categories,
});

export default connect(mapStateToProps, { getAllCategories })(homepage);
