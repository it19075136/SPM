import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select, Segment, Divider, Header, Radio, Grid, Checkbox, Icon } from 'semantic-ui-react'

const partTypeOption = [
    { key: 'b', text: 'Body Components', value: 'components' },
    { key: 'a', text: 'Car Audio Systems', value: 'audio' },
    { key: 'e', text: 'Engines & Engine Parts', value: 'engine' },
]

const phoneOptions = [
    { key: 'sl', text: 'Sri Lanka (+94)', value: '+94' }
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
                <br />
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
                    options={partTypeOption}
                    label={{ children: 'Part or Accessory Type', htmlFor: 'accessoryType' }}
                    placeholder='Part or Accessory Type'
                    search
                    searchInput={{ id: 'accessoryType' }}
                />

                <Form.Field required
                    width='16'
                >
                    <label>Advertisement Title</label>
                    <input placeholder='Advertisement Title' />
                </Form.Field>

                <Form.Field required
                    width='16'
                    id='description'
                    control={TextArea}
                    label='Description'
                    placeholder='Description'
                />

                <Form.Field
                    id='price'
                    width='16'
                    type='number'
                    control={Input}
                    label='Price (Rs)'
                    placeholder='Pick a good price'
                />

                <Form.Field>
                    <Checkbox label='Negotiable' />
                </Form.Field>

                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='photo' circular />
                        Photos
                    </Header>
                </Divider>

                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='volume control phone' circular />
                        Contact
                    </Header>
                </Divider>

                <Form.Group>
                    <Form.Field required
                        id='phoneCode'
                        control={Select}
                        options={phoneOptions}
                        label='Code'
                        placeholder='Code'
                    />
                    <Form.Field required >
                        <Input
                        action={{
                            color: 'blue',
                            labelPosition: 'right',
                            icon: 'plus',
                            content: 'Add',
                        }}
                        actionPosition='right'
                        placeholder='77-xxxxxxxx'
                        />
                    </Form.Field>
                    
         
                    
                </Form.Group>


            </Form>
        )
    }
}