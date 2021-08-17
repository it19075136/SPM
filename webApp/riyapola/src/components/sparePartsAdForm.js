import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select, Segment, Divider, Header, Radio, Grid } from 'semantic-ui-react'

const partTypeOption = [
    { key: 'b', text: 'Body Components', value: 'components' },
    { key: 'a', text: 'Car Audio Systems', value: 'audio' },
    { key: 'e', text: 'Engines & Engine Parts', value: 'engine' },
]

export default class sparePartAdForm extends Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (

            <Form className="form-centered" width="10">
                <Header as='h2' color='blue' textAlign='center'>
                    Add Spare Parts Form
                </Header>
                <Segment raised>
                    <Form.Group inline>
                        <label>Category</label>
                        <Form.Field
                            control={Radio}
                            label='Used'
                            value='1'
                            checked={value === '1'}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Radio}
                            label='New'
                            value='2'
                            checked={value === '2'}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Radio}
                            label='Recondition'
                            value='3'
                            checked={value === '3'}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Field required
                        width='16'
                        control={Select}
                        option={partTypeOption}
                        label={{ children: 'Vehicle Make', htmlFor: 'part' }}
                        placeholder='Part or Accessory Type'
                        search
                        searchInput={{ id: 'vehicleMake' }}
                    />
                    <Form.Field>
                        <label>Advertisement Title</label>
                        <input placeholder='Title Name' />
                    </Form.Field>
                    
                    
                    <Form.Field required
                        width='16'
                        control={Select}
                        label={{ children: 'Vehicle Model', htmlFor: 'vehicleModel' }}
                        placeholder='Vehicle Model'
                        search
                        searchInput={{ id: 'vehicleModel' }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
                        label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                        placeholder='Vehicle Make'
                        search
                        searchInput={{ id: 'vehicleMake' }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
                        label={{ children: 'Vehicle Body Type', htmlFor: 'bodyType' }}
                        placeholder='Vehicle Body Type'
                        search
                        searchInput={{ id: 'bodyType' }}
                    />
                    <Form.Field required
                        width='16'
                        control={Select}
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