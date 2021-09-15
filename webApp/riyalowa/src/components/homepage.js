import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Table,
  Modal,
  Header,
  Grid,
  Label,
  Card,
  Image,
} from "semantic-ui-react";
import "../App.css";
import { getAllCategories } from "../redux/actions/categoryActions";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpeg";


class homepage extends Component {
  constructor(props) {
    super(props);

    this.testing = this.testing.bind(this);

    this.state = {
      allCategories: "",
    };
  }

  componentDidMount() {
    const { getAllCategories } = this.props;
    getAllCategories();
  }

  testing(title, price, description, id) {
    return (
      <Grid.Column>
        <Card>
          <Image src={image2} wrapped ui={false}/>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
              <span className="date">{price}</span>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="car" />
              Buy Now
            </a>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }

  render() {
    const { categories } = this.props;

    let lengthSpareParts = categories
      .filter((val) => val.type == "Spare Parts")
      .slice(0, 4).length;

    let lengthVehicles = categories
      .filter((val) => val.type == "Vehicles")
      .slice(0, 4).length;

    return (
      <div className="form-centered-homepage">
        <div className="header-text-homepage-riyapola">
          Riyapola
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="header-text-homepage">
          Affordability at your fingertip
          <br></br>
          <br></br>
          <br></br>& Best cars in town.
        </div>

        <h3>Browse Vehicles</h3>

        <div>
          <Grid columns={lengthVehicles} container stackable>
            {categories
              .filter((val) => val.type == "Vehicles")
              .slice(0, 4)
              .map((data, index) => (
                <Grid.Column key={index}>
                  <Button className="category-card-custom" animated="vertical">
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
            {categories
              .filter((val) => val.type == "Spare Parts")
              .slice(0, 8)
              .map((data, index) => (
                <Grid.Column key={index}>
                  <Button className="category-card-custom" animated="vertical">
                    <Button.Content visible>{data.mainName}</Button.Content>
                    <Button.Content hidden>{data.mainName}</Button.Content>
                  </Button>
                </Grid.Column>
              ))}
          </Grid>
        </div>


        <div className="sub1-text-homepage">
          A smart, dishonest car seller can cover up signs of damage, at The VIN
          distinguishes each car from all others. If you want to check the car's
          history, find and record the 17-digit VIN. The most common locations
          for the metal VIN strip are the driver-side doorjamb, beneath the
          windshield or on the firewall in the engine bay.
        </div>

        <div className="trending-vehicle-text">Trending Vehicles</div>
        <div className="card-view-homepage">
          <Grid columns={4}>
            {this.testing("Vehicle Title", "Price", "Description", 1234)}
            {this.testing("Vehicle Title", "Price", "Description", 1234)}
            {this.testing("Vehicle Title", "Price", "Description", 1234)}
            {this.testing("Vehicle Title", "Price", "Description", 1234)}
            {this.testing("Vehicle Title", "Price", "Description", 1234)}
            {this.testing("Vehicle Title", "Price", "Description", 1234)}
            {this.testing("Vehicle Title", "Price", "Description", 1234)}
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
