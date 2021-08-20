import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select, Divider, Header, Icon, Segment, Radio } from 'semantic-ui-react';

const partTypeOption = [
    { key: 'b', text: 'Body Components', value: 'components' },
    { key: 'a', text: 'Car Audio Systems', value: 'audio' },
    { key: 'e', text: 'Engines & Engine Parts', value: 'engine' },
]

const locationOption = [
    { key: 'c', text: 'Colombo', value: 'colombo' },
    { key: 'k', text: 'Kandy', value: 'kandy' },
    { key: 'm', text: 'Matara', value: 'matara' },
]
const phoneOptions = [
    { key: 'sl', text: 'Sri Lanka (+94)', value: '+94' }
]


export default class updateSparePartsAdForm extends Component {

    state = {
        payload: {
            condition: '',
            category: '',
            title: '',
            description: '',
            price: null,
            negotiable: false,
            images: [],
            location: '',
            userId: null,
            contactNumbers: [],
            status: 'pending'
        },
        code: '',
        phone: '',
        titleState: true,
        descriptionState: true,
        priceState: true
    }


    render() {

        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
        }

        const handleChange = (e) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } }, () => {
                console.log(this.state);
            });
        }
        return (
            <div className="form-centered">
                <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Update Your Spare Parts Details
                </Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Group inline >
                        <label>Category</label>
                        <Form.Field required
                            control={Radio}
                            label='Used'
                            value='1'
                            name="used"
                            checked={this.state.payload.condition === 'used'}
                            onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, condition: 'used' } }, () => {
                                console.log(this.state)
                            })}
                        />
                        <Form.Field required
                            control={Radio}
                            label='New'
                            value='2'
                            name="new"
                            checked={this.state.payload.condition === 'new'}
                            onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, condition: 'new' } }, () => {
                                console.log(this.state)
                            })}
                        />
                        <Form.Field required
                            control={Radio}
                            label='Recondition'
                            value='3'
                            name="recondition"
                            checked={this.state.payload.condition === 'recondition'}
                            onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, condition: 'recondition' } }, () => {
                                console.log(this.state)
                            })}
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
                        onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, category: e.target.innerText } }, () => {
                            console.log(this.state)
                        })}
                    />

                    <div className='form-edit-field'>
                        <Icon
                            name={this.state.titleState ? 'edit' : 'save'}
                            onClick={() => this.setState({ ...this.state, titleState: !this.state.titleState })}
                        />
                        <Form.Field required
                            width='16'
                            id='title'
                            name="title"
                            control={Input}
                            label='Advertisement Title'
                            placeholder='Add an advertisement title'
                            disabled={this.state.titleState ? this.state.titleState : false}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-edit-field'>
                        <Icon
                            name={this.state.descriptionState ? 'edit' : 'save'}
                            onClick={() => this.setState({ ...this.state, descriptionState: !this.state.descriptionState })}
                        />
                        <Form.Field required
                            name='description'
                            width='16'
                            id='description'
                            control={TextArea}
                            label='Description'
                            placeholder='Description'
                            disabled={this.state.descriptionState ? this.state.descriptionState : false}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-edit-field'>
                        <Icon
                            name={this.state.priceState ? 'edit' : 'save'}
                            onClick={() => this.setState({ ...this.state, priceState: !this.state.priceState })}
                        />
                        <Form.Group grouped>
                            <Form.Field
                                name='price'
                                id='price'
                                inline={false}
                                type='number'
                                control={Input}
                                label='Price(Rs.)'
                                placeholder='Price(Rs)'
                                disabled={this.state.priceState ? this.state.priceState : false}
                                onChange={handleChange}
                            />
                            <Form.Checkbox label='Negotiable'
                                name='negotiable'
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <Form.Field required
                        width='16'
                        name="location"
                        id="location"
                        control={Select}
                        options={locationOption}
                        label={{ children: 'Location', htmlFor: 'location' }}
                        placeholder='Your Location'
                        search
                        searchInput={{ id: 'location' }}
                        onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, location: e.target.innerText } }, () => {
                            console.log(this.state)
                        })}
                    />
                    <div>
                        <Button color='orange' type='button' onClick={() => console.log('btn clicked')}><Icon name='edit' />Images</Button>
                        <Button color='orange' type='button' onClick={() => console.log('btn clicked')}><Icon name='edit' />Contact</Button>
                    </div>
                </Form>
            </div>
        )
    }
}