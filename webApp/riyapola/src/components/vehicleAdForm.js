import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select, Divider, Header } from 'semantic-ui-react'

const categoryOptions = [
    { key: 'c', text: 'Car', value: 'car' },
    { key: 's', text: 'SUV', value: 'suv' },
    { key: 'v', text: 'Van', value: 'van' },
    { key: 'b', text: 'Bus', value: 'bus' },
    { key: 'l', text: 'Lorry', value: 'lorry' },
    { key: 'm', text: 'Motor Cycle', value: 'motorCycle' },
    { key: 'o', text: 'Other', value: 'othe' },
]

const vehicleMakeOptions = [
    { key: 't', text: 'Toyota', value: 'toyota' },
    { key: 's', text: 'Suzuki', value: 'suzuki' },
    { key: 'h', text: 'Honda', value: 'honda' },
]

const vehicleModelOptions = [
    { key: 'ax', text: 'Axio', value: 'axio' },
    { key: 'al', text: 'Allion', value: 'allion' },
    { key: 'v', text: 'Vitz', value: 'vitz' },
]

const vehicleBodyOptions = [
    { key: 'h', text: 'Hatchback', value: 'hatchback' },
    { key: 's', text: 'Sedan', value: 'sedan' },
    { key: 'c', text: 'Coupe', value: 'coupe' },
]

const transmissionOptions = [
    { key: 'a', text: 'Automatic', value: 'automatic' },
    { key: 'm', text: 'Manual', value: 'manual' },
    { key: 't', text: 'Triptonic', value: 'triptonic' },
]

const fuelOptions = [
    { key: 'p', text: 'Petrol', value: 'petrol' },
    { key: 'd', text: 'Diesel', value: 'diesel' },
    { key: 'h', text: 'Hybrid', value: 'hybrid' },
    { key: 'e', text: 'Electric', value: 'electric' },
]

const phoneOptions = [
    { key: 'sl', text: 'Sri Lanka (+94)', value: '+94' }
]

const validateFields = (e) => {
    switch (e.target.name) {
        case 'advertisementTitle':
            return e.target.value ? {
                content: 'Please enter a valid title',
                pointing: 'below',
            } : false;
        case '2':
            return e.target.value ? {

            } : true;
        case '3':
            return e.target.value ? false : true;
        case '4':
            return e.target.value ? false : true;
        default:
            break;
    }
}

export default class vehicleAdForm extends Component {

    state = {
        payload: {
            title: '',
            description: '',
            status: 'pending',
            year: null,
            make: '',
            model: '',
            category: '',
            bodyType: '',
            transmission: '',
            condition: '',
            engineCapacity: null,
            fuelType: '',
            mileage: null,
            price: null,
            negotiable: false,
            imageUrls: [],
            userId: null,
            contactNumbers: []
        },
        code: ''
    }

    handleChange = (e) => {
        console.log(e.target.option);
        this.setState({...this.state, payload: {...this.state.payload,[e.target.name]: e.target.value }}, () => {
            console.log(this.state);
        });
    }

    handleSubmit = () => {
        console.log(this.state);
    }

    render() {

        return (
            <Form className='form-centered' onSubmit={this.handleSubmit}>
                <Form.Field required
                    width='16'
                    id='title'
                    name="title"
                    control={Input}
                    label='Advertisement Title'
                    placeholder='Add an advertisement title'
                    onChange={this.handleChange}
                />
                <Form.Field required
                    id='category'
                    name="category"
                    width='16'
                    control={Select}
                    options={categoryOptions} // get categories
                    label={{ children: 'Category', htmlFor: 'category' }}
                    placeholder='Vehicle Category'
                    search
                    searchInput={{ id: 'category' }}
                    onChange={(e) => this.setState({ ...this.state, payload: {...this.state.payload, category: e.target.innerText }}, () => {
                        console.log(this.state)
                    })}
                />
                <Form.Field required
                    name="make"
                    width='16'
                    control={Select}
                    options={vehicleMakeOptions}
                    label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                    placeholder='Vehicle Make'
                    search
                    searchInput={{ id: 'vehicleMake' }}
                    onChange={(e) => this.setState({ ...this.state, payload: {...this.state.payload, category: e.target.innerText }}, () => {
                        console.log(this.state)
                    })}
                />
                <Form.Field required
                    name="model"
                    width='16'
                    control={Select}
                    options={vehicleModelOptions}
                    label={{ children: 'Vehicle Model', htmlFor: 'vehicleModel' }}
                    placeholder='Vehicle Model'
                    search
                    searchInput={{ id: 'vehicleModel' }}
                    onChange={(e) => this.setState({ ...this.state, payload: {...this.state.payload, category: e.target.innerText }}, () => {
                        console.log(this.state)
                    })}
                />
                <Form.Field required
                    name='year'
                    width='16'
                    control={Input}
                    type='date'
                    label={{ children: 'Registered year', htmlFor: 'date' }}
                    placeholder='Registered year'
                    search
                    searchInput={{ id: 'date' }}
                />
                <Form.Field required
                    name='bodyType'
                    width='16'
                    control={Select}
                    options={vehicleBodyOptions}
                    label={{ children: 'Vehicle Body Type', htmlFor: 'bodyType' }}
                    placeholder='Vehicle Body Type'
                    search
                    searchInput={{ id: 'bodyType' }}
                    onChange={(e) => this.setState({ ...this.state, payload: {...this.state.payload, category: e.target.innerText }}, () => {
                        console.log(this.state)
                    })}
                />
                <Form.Field required
                    name='transmission'
                    width='16'
                    control={Select}
                    options={transmissionOptions}
                    label={{ children: 'Transmission', htmlFor: 'transmission' }}
                    placeholder='Transmission'
                    search
                    searchInput={{ id: 'transmission' }}
                    onChange={(e) => this.setState({ ...this.state, payload: {...this.state.payload, category: e.target.innerText }}, () => {
                        console.log(this.state)
                    })}
                />
                <Form.Group>
                    <Form.Field required
                        id='engineCapacity'
                        name='engineCapacity'
                        type='number'
                        control={Input}
                        label='Engine capacity'
                        placeholder='Engine capacity(cc)'
                        onChange={this.handleChange}
                    />
                    <Form.Field required
                        name='fuelType'
                        control={Select}
                        options={fuelOptions}
                        label={{ children: 'Fuel Type', htmlFor: 'fuelType' }}
                        placeholder='Fuel Type'
                        search
                        searchInput={{ id: 'fuelType' }}
                        onChange={(e) => this.setState({ ...this.state, payload: {...this.state.payload, category: e.target.innerText }}, () => {
                            console.log(this.state)
                        })}
                    />
                </Form.Group>
                <Form.Field required
                    name='description'
                    width='16'
                    id='description'
                    control={TextArea}
                    label='Description'
                    placeholder='Description'
                    onChange={this.handleChange}
                />
                <Form.Group>
                    <Form.Field required
                        name='mileage'
                        id='mileage'
                        type='number'
                        control={Input}
                        label='Mileage'
                        placeholder='Mileage(Kms)'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        name='price'
                        id='price'
                        type='number'
                        control={Input}
                        label='Price'
                        placeholder='Price(Rs)'
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group inline>
                    <Form.Radio
                        name='registered'
                        label='Registered'
                        value='registered'
                        checked={this.state.condition === 'registered'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        name='unregistered'
                        label='Unregistered'
                        value='unregistered'
                        checked={this.state.condition === 'unregistered'}
                        onChange={this.handleChange}
                    />
                    <Form.Checkbox label='Negotiable'
                        name='negotiable'
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Divider section />
                <Header as='h3'>Contact Details</Header>
                <Form.Group>
                    <Form.Field required
                        id='phoneCode'
                        control={Select}
                        options={phoneOptions}
                        label='Code'
                        placeholder='Code'
                        onChange={(e) => this.setState({ ...this.state, code: e.target.innerText }, () => {
                            console.log(this.state)
                        })}
                    />
                    <Form.Field
                        action={{
                            color: 'blue',
                            labelPosition: 'right',
                            icon: 'add',
                            content: 'Add',
                            onclick: (e) => this.setState({ ...this.state, payload: {...this.state.payload, contactNumbers: [...this.state.payload.contactNumbers,this.state.code ? this.state.code + '-' + e.target.innerText: e.target.innerText ]}})
                        }                        
                        }
                        id='phone'
                        name='phone'
                        control={Input}
                        label='Phone number'
                        placeholder='77-xxxxxxx'
                    />
                    <ul>
                        {this.state.payload.contactNumbers.length > 0 ? this.state.payload.contactNumbers.map(contact => {
                            <li>{contact}</li>
                        }):null}
                    </ul>
                </Form.Group>
                <Form.Field
                    primary
                    id='submit'
                    control={Button}
                    content='Post Ad'
                />
            </Form>
        )
    }
}
