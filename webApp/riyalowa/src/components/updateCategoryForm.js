import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Form,
  Label,
  Dropdown,
  Icon,
  Radio,
} from "semantic-ui-react";
import axios from "axios";
import "../App.css";
import ImageUploading from "react-images-uploading";

export default class AddCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manualMake: "",
      vehicleNames: "",
      vehicleMake: [],
      type: "Vehicles",
      images: [],
      mainName: "",
      mainDescription: "",
      childCategory: [
        {
          name: "",
          description: "",
        },
      ],
    };

    this.addClick = this.addClick.bind(this);
    this.removeClick = this.removeClick.bind(this);
    this.handleMainName = this.handleMainName.bind(this);
    this.handleMainDescription = this.handleMainDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeNames = this.handleChangeNames.bind(this);
    this.handleManualMake = this.handleManualMake.bind(this);
    this.handleSubmitManualMake = this.handleSubmitManualMake.bind(this);
    this.handleImportAllMake = this.handleImportAllMake.bind(this);
    this.handleImportRemoveAllMake = this.handleImportRemoveAllMake.bind(this);
    this.categoryOnCLick= this.categoryOnCLick.bind(this);

  }

  
  categoryOnCLick(){
    window.location.href= '/category/list'
  }

  handleImportRemoveAllMake() {
    this.setState({
      vehicleMake: [],
    });
  }

  handleImportAllMake() {
    const { vehicleNames } = this.state;
    let vehicleMake = Array.from(
      new Set([...this.state.vehicleMake, ...vehicleNames])
    );
    this.setState({
      vehicleMake: vehicleMake,
    });
  }

  handleSubmitManualMake() {
    const { manualMake } = this.state;
    let vehicleMake = Array.from(
      new Set([...this.state.vehicleMake, manualMake])
    );
    this.setState({
      vehicleMake: vehicleMake,
    });
  }

  handleManualMake(e) {
    this.setState({
      manualMake: e.target.value,
    });
  }

  handleChangeNames(e) {
    let vehicleMake = Array.from(
      new Set([...this.state.vehicleMake, e.target.textContent])
    );
    this.setState({
      vehicleMake: vehicleMake,
    });
  }

  handleChangeType(value) {
    this.setState({
      type: value,
    });
  }
   componentDidMount() {
    const { state } = this.props.location;
     axios.get(`http://localhost:5000/category/${state}`).then((res) => {
      id = res.data._id;
      console.log('id: ', id);
      this.setState({
        // images: res.data.images,
        mainName: res.data.mainName,
        mainDescription: res.data.mainDescription,
        type: res.data.type,
        vehicleMake: res.data.make,
      });
    });

     axios
      .get(
        "https://private-anon-7d56ba085d-carsapi1.apiary-mock.com/manufacturers"
      )
      .then((res) => {
        this.setState({
          vehicleNames: res.data.map((el) => {
            return el.name;
          }),
        });
      });


  }

  childCategoryUi() {
    const { vehicleNames, vehicleMake, manualMake, type } = this.state;
    const stateOptions = vehicleNames
      ? vehicleNames.map((name, index) => ({
          key: index,
          text: name,
          value: name,
        }))
      : null;

    return (
      <Form>
        {type == "Spare Parts" ? (
          <div className="spare-part-label">
            This part is optional for the Spare Parts
          </div>
        ) : null}
        <Form.Field className="category-name-input">
          <label>Manually Add a Vehicle Make</label>
          <input
            placeholder="Add a make"
            value={manualMake}
            onChange={this.handleManualMake}
          />
          <Button
            onClick={this.handleSubmitManualMake}
            className="make-buttons-sub-category"
            color="green"
          >
            Add Make
          </Button>
        </Form.Field>

        <Dropdown
          placeholder="Vehicle Names"
          search
          selection
          options={stateOptions}
          onChange={this.handleChangeNames}
        />
        <Button
          onClick={this.handleImportAllMake}
          className="make-buttons-sub-category"
          color="blue"
        >
          Select All
        </Button>
        <Button
          onClick={this.handleImportRemoveAllMake}
          className="make-buttons-sub-category"
          color="red"
        >
          Remove All
        </Button>

        <div className="make-table-custom">
          {vehicleMake
            ? vehicleMake.map((el, index) => {
                return (
                  <div className="vehicle-make-labels">
                    <Label color="teal">
                      {el}
                      <Icon
                        key={index}
                        name="delete"
                        onClick={this.handleVehicleMakeRemove.bind(this, index)}
                      />
                    </Label>
                    <br></br>
                  </div>
                );
              })
            : null}
        </div>
      </Form>
    );
  }

  handleVehicleMakeRemove(i) {
    let vehicleMake = [...this.state.vehicleMake];
    vehicleMake.splice(i, 1);
    this.setState({ vehicleMake });
  }

  handleMainName(e) {
    this.setState({
      mainName: e.target.value,
    });
  }

  handleMainDescription(e) {
    this.setState({
      mainDescription: e.target.value,
    });
  }

  removeClick(i) {
    let childCategory = [...this.state.childCategory];
    childCategory.splice(i, 1);
    this.setState({ childCategory });
  }

  addClick() {
    const addChildCategory = {
      name: "",
      description: "",
    };
    this.setState((prevState) => ({
      childCategory: [...prevState.childCategory, addChildCategory],
    }));
  }

  handleChildName(i, event) {
    let childCategory = [...this.state.childCategory];
    childCategory[i].name = event.target.value;
    this.setState({ childCategory });
  }

  handleChildDescription(i, event) {
    let childCategory = [...this.state.childCategory];
    childCategory[i].description = event.target.value;
    this.setState({ childCategory });
  }

  onChangeImage(imageList, addUpdateIndex) {
    this.setState({
      images: imageList,
    });
  }

  handleSubmit() {
    const { state } = this.props.location
    const { childCategory, mainName, mainDescription, images } = this.state;
    let category = this.state;

    let finalValues = {
      images: category.images,
      mainDescription: category.mainDescription,
      mainName: category.mainName,
      type: category.type,
      make: category.vehicleMake,
    };

    if (this.state.type == "Vehicles" && finalValues.make.length == 0) {
      alert("Vehcle make cannot be empty");
    } else {
      if (
        !(
          finalValues.mainName.trim() == "" ||
          finalValues.mainDescription.trim() == ""
        )
      ) {
        axios
          .put(
            `http://localhost:5000/category/${state}`,
            finalValues
          )
          .then(() => {
            alert("Category Updated Successfully");
            window.location.href = '/category/list'
          });
      } else {
        alert("Main category fields cannot be empty");
      }
    }
  }

  render() {
    const { childCategory, mainName, mainDescription, images } = this.state;

    return (
      <div>
        <div className="main-form-wrapper">
          <Form>
            <Form.Field>{`Selected Value : ${this.state.type}`}</Form.Field>
            <Form.Field>
              <Radio
                label="Vehicles"
                name="radioGroup"
                value="Vehicles"
                checked={this.state.type === "Vehicles"}
                onChange={() => this.handleChangeType("Vehicles")}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Spare Parts"
                name="radioGroup"
                value="Spare Parts"
                checked={this.state.type === "Spare Parts"}
                onChange={() => this.handleChangeType("Spare Parts")}
              />
            </Form.Field>

            <Label className="main-label-text" color="black">
              Main Category
            </Label>
            <Form.Field className="category-name-input">
              <label>Name</label>
              <input
                placeholder="Main Category Name"
                value={mainName}
                onChange={this.handleMainName}
              />
            </Form.Field>

            <Form.TextArea
              label="Description"
              placeholder="Main Category Description"
              className="category-description-input"
              value={mainDescription}
              onChange={this.handleMainDescription}
            />
            <Button
              type="submit"
              className="add-category-button"
              onClick={this.handleSubmit}
              color="blue"
            >
              Update Category
            </Button>

            <Button className="add-category-btn" onClick={this.categoryOnCLick}>Go back </Button>


            <ImageUploading
              multiple
              value={this.state.images}
              onChange={this.onChangeImage}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    color="blue"
                  >
                    Click here to upload an image
                  </Button>
                  &nbsp;
                  {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                  {images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image["data_url"]}
                        alt=""
                        className="category-image-upload"
                      />
                      <div>
                        <Button
                          className="image-buttons-category"
                          color="green"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </Button>
                        <Button
                          className="image-buttons-category"
                          color="red"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </Form>

          <div>
            <Label className="main-label-text" color="black">
              Child Category
            </Label>
            {this.childCategoryUi()}
          </div>
        </div>
      </div>
    );
  }
}
