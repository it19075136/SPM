import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select, Segment, Divider, Header } from 'semantic-ui-react'

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
]

const phoneOptions = [
    { key: 'sl', text: 'Sri Lanka (+94)', value: '+94' }
]

export default class vehicleAdForm extends Component {
    render() {
        return (
            <Form className='form-centered'>
                <Segment raised>
                    <Form.Field required
                        width='16'
                        id='advertisementTitle'
                        control={Input}
                        label='Advertisement Title'
                        placeholder='Add an advertisement title'
                        error={{
                            content: 'Please enter a valid title',
                            pointing: 'below',
                        }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
                        options={vehicleMakeOptions}
                        label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                        placeholder='Vehicle Make'
                        search
                        searchInput={{ id: 'vehicleMake' }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
                        options={vehicleModelOptions}
                        label={{ children: 'Vehicle Model', htmlFor: 'vehicleModel' }}
                        placeholder='Vehicle Model'
                        search
                        searchInput={{ id: 'vehicleModel' }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
                        options={vehicleMakeOptions}
                        label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                        placeholder='Vehicle Make'
                        search
                        searchInput={{ id: 'vehicleMake' }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
                        options={vehicleBodyOptions}
                        label={{ children: 'Vehicle Body Type', htmlFor: 'bodyType' }}
                        placeholder='Vehicle Body Type'
                        search
                        searchInput={{ id: 'bodyType' }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
                        options={transmissionOptions}
                        label={{ children: 'Transmission', htmlFor: 'transmission' }}
                        placeholder='Transmission'
                        search
                        searchInput={{ id: 'transmission' }}
                    />
                    <Form.Group>
                        <Form.Field required
                            id='engineCapacity'
                            type='number'
                            control={Input}
                            label='Engine capacity'
                            placeholder='Engine capacity(cc)'
                        />
                        <Form.Field required
                            control={Select}
                            options={fuelOptions}
                            label={{ children: 'Fuel Type', htmlFor: 'fuelType' }}
                            placeholder='Fuel Type'
                            search
                            searchInput={{ id: 'fuelType' }}
                        />
                    </Form.Group>
                    <Form.Field
                        width='16'
                        id='description'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                    />
                    <Form.Group>
                        <Form.Field required
                            id='mileage'
                            type='number'
                            control={Input}
                            label='Mileage'
                            placeholder='Mileage(Kms)'
                        />
                        <Form.Field
                            id='price'
                            type='number'
                            control={Input}
                            label='Price'
                            placeholder='Price(Kms)'
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <Form.Radio
                            label='Registered'
                            value='registered'
                        // checked={value === 'registered'}
                        // onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='Unregistered'
                            value='unregistered'
                        // checked={value === 'unregistered'}
                        // onChange={this.handleChange}
                        />
                        <Form.Checkbox label='Negotiable' />
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
                        />
                        <Form.Field
                            id='phone'
                            control={Input}
                            label='Phone number'
                            placeholder='77-xxxxxxx'
                        />
                    </Form.Group>
                    <Form.Field
                        id='add'
                        control={Button}
                        content='Add'
                    />
                    <Form.Field
                        className='form-submit-btn'
                        id='submit'
                        control={Button}
                        content='Post Ad'
                    />
                </Segment>
            </Form>
        )
    }
}
