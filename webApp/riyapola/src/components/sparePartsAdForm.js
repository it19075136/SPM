import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select, Segment, Divider, Header, Radio, Grid, Checkbox, Icon } from 'semantic-ui-react'
import ImageUploading from 'react-images-uploading';

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

export default class sparePartAdForm extends Component {
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
        phone: ''
    }

    componentDidMount = () => {

    }

    render() {

        const addPhone = () => {
            this.setState({ ...this.state, payload: { ...this.state.payload, contactNumbers: [...this.state.payload.contactNumbers, this.state.code + this.state.phone] } }, () => {
                this.setState({ ...this.state, phone: '' })
            })
        }

        const handleChange = (e) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } }, () => {
                console.log(this.state);
            });
        }

        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
        }
        const { value } = this.state
        return (
            <Form className="form-centered">
                <Header as='h2' color='blue' textAlign='center'>
                    Fill Your Spare part Details
                </Header>
                <br />
                <Form.Group inline>
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

                <Form.Field required
                    width='16'
                    id='title'
                    name="title"
                    control={Input}
                    label='Advertisement Title'
                    placeholder='Advertisement title'
                    onChange={handleChange}
                />

                <Form.Field required
                    width='16'
                    id='description'
                    name="description"
                    control={TextArea}
                    label='Description'
                    placeholder='Description'
                    onChange={handleChange}
                />

                <Form.Field
                    id='price'
                    width='16'
                    type='number'
                    name='price'
                    control={Input}
                    label='Price (Rs)'
                    placeholder='Pick a good price'
                    onChange={handleChange}
                />

                <Form.Checkbox label="Negotiable"
                    name='negotiable'
                    onChange={handleChange}
                />

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

                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='photo' circular />
                        Photos
                    </Header>
                </Divider>

                <ImageUploading
                    multiple
                    value={this.state.payload.images}
                    onChange={(imageList, addUpdateIndex) => this.setState({ ...this.state, payload: { ...this.state.payload, images: imageList } })}
                    maxNumber={10}
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
                        <div className="upload__image-wrapper">
                            <div className='uploader-area'>
                                <Segment
                                    className='dnd-image-area'
                                    style={isDragging ? { backgroundColor: '#076AE0', color: 'white' } : { backgroundColor: '#ddd' }}
                                    textAlign='center'
                                    onClick={onImageUpload}
                                    {...dragProps}>
                                    Click or Drop Images here
                                </Segment>
                                &nbsp;
                                <Button color='red' type='button' disabled={this.state.payload.images.length < 1} onClick={onImageRemoveAll} ><Icon name='trash' />Remove all images</Button>
                            </div>
                            <div className="image-list">
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <Button color='grey' size='mini' type='button' icon='pencil' onClick={() => onImageUpdate(index)} />
                                            <Button color='red' size='mini' type='button' icon='trash' onClick={() => onImageRemove(index)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ImageUploading>

                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='volume control phone' circular />
                        Contact Details
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
                    <Form.Field
                        action={
                            <Button
                                primary
                                name='addPhone'
                                icon='add'
                                type='button'
                                onClick={addPhone}
                            />
                        }
                        id='phone'
                        name='phone'
                        control={Input}
                        label='Phone number'
                        value={this.state.phone}
                        placeholder='77-xxxxxxx'
                        onChange={(e) => this.setState({ ...this.state, phone: e.target.value })}
                    />
                </Form.Group>

                <ul>
                    {this.state.payload.contactNumbers.length > 0 ? this.state.payload.contactNumbers.map(contact => {
                        return <div style={{ decoration: 'none' }}><Icon name='phone'>{contact.replace('Sri Lanka', '')}</Icon></div>
                    }) : null}
                </ul>

                <Form.Field
                    primary
                    id='submit'
                    name="formSubmit"
                    control={Button}
                    content='Post Ad'
                />

            </Form>
        )
    }
}