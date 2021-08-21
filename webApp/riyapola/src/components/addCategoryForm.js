import React, { Component } from "react";
import { Button, Checkbox, Form, Label } from "semantic-ui-react";
import '../App.css';

export default class AddCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainName: '',
      mainDescription: '',
      childCategory: [
        {
          name: '',
          description: ''
        }
      ]
    }

    this.addClick = this.addClick.bind(this);
    this.removeClick = this.removeClick.bind(this);
    this.handleMainName = this.handleMainName.bind(this);
    this.handleMainDescription = this.handleMainDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  childCategoryUi() {
    return (
      this.state.childCategory.map((el, index) =>
        <Form>

          <Form.Field className="category-name-input">
            <label>Name</label>
            <input placeholder="Main Category Name" key={index} value={el.name || ''} onChange={this.handleChildName.bind(this, index)} />
          </Form.Field>

          <Form.TextArea
            key={index}
            label="Description"
            placeholder="Main Category Description"
            className="category-description-input"
            value={el.description}
            onChange={this.handleChildDescription.bind(this, index)}
          />

          <Button type="submit" className="add-category-button" onClick={() => this.removeClick(el.index)}>
            Remove
          </Button>
        </Form>
      )
    )
  }

  handleMainName(e) {
    this.setState({
      mainName: e.target.value
    })
  }


  handleMainDescription(e) {
    this.setState({
      mainDescription: e.target.value
    })
  }

  removeClick(i) {
    let childCategory = [...this.state.childCategory];
    childCategory.splice(i, 1);
    this.setState({ childCategory });
  }

  addClick() {
    const addChildCategory = {
      name: '',
      description: ''
    }
    this.setState((prevState) => ({
      childCategory: [...prevState.childCategory, addChildCategory]
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

  handleSubmit(){
    const { childCategory, mainName, mainDescription } = this.state;
    let category = this.state;
    
  }

  render() {
    const { childCategory, mainName, mainDescription } = this.state;

    return (
      <div>
        <div className="main-form-wrapper">
          <Form>
            <Label className="main-label-text">Main Category</Label>
            <Form.Field className="category-name-input">
              <label>Name</label>
              <input placeholder="Main Category Name" value={mainName} onChange={this.handleMainName} />
            </Form.Field>

            <Form.TextArea
              label="Description"
              placeholder="Main Category Description"
              className="category-description-input"
              value={mainDescription}
              onChange={this.handleMainDescription}
            />
            <Button type="submit" className="add-category-button" onClick={this.handleSubmit}>
              Add Category
            </Button>
            <Button type="submit" className="add-category-button" onClick={this.addClick}>
              Add Child Category
            </Button>
          </Form>

          <div>
            <Label className="main-label-text">Child Category</Label>
            {this.childCategoryUi()}
          </div>
        </div>
      </div>
    );
  }
}
