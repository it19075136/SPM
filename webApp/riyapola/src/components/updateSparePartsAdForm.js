import axios from 'axios';
import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select, Divider, Header, Icon, Segment, Radio, Modal } from 'semantic-ui-react';
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
            userId: 'u1',
            contactNumbers: [],
            status: 'pending'
        },
        code: '',
        phone: '',
        titleState: true,
        descriptionState: true,
        priceState: true,
        imgModalOpen: false,
        success: false,
        error: false,
        loading: true,
        actionWaiting: false
    }

    componentDidMount = () => {
        axios.get(`http://localhost:5000/spareparts/${window.location.pathname.replace('sparePartsAd/update/', '')}`).then((res) => {
            console.log(res);
            this.setState({ ...this.state, payload: res.data, loading: false }, () => {
                console.log(this.state)
            })
        }).catch((err) => {
            alert('Please check your network connection and try again')
        })
    }

    render() {

        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
            this.setState({ ...this.state, actionWaiting: true }, () => {
                axios.put(`http://localhost:5000/spareparts/${window.location.pathname.replace('/sparePartsAd/update/', '')}`, this.state.payload).then((res) => {
                    console.log(res);
                    this.setState({ ...this.state, success: true }, () => {
                        setTimeout(() => {
                            this.setState({ ...this.state, success: false, actionWaiting: false })
                        }, 2000)
                    }).catch((err) => {
                        console.log(err);
                        this.setState({ ...this.state, error: true }, () => {
                            setTimeout(() => {
                                this.setState({ ...this.state, error: false, actionWaiting: false })
                                window.location.reload(false);
                            }, 2000)
                        })
                    })
                })
            })
        }

        const deletePhone = (contact) => {
            console.log(contact);
            // this.setState({ ...this.state, payload: { ...this.state.payload, contactNumbers: this.state.payload.contactNumbers.filter(contact) } }, () => {
            //     console.log(this.state)
            // })
        }

        const handleChange = (e) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } }, () => {
                console.log(this.state);
            });
        }

        const addPhone = () => {
            this.setState({ ...this.state, payload: { ...this.state.payload, contactNumbers: [...this.state.payload.contactNumbers, this.state.code + this.state.phone] } }, () => {
                this.setState({ ...this.state, phone: '' })
            })
        }

        return (
            <div className="form-centered">
                <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Update Your Spare parts Details
                </Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Group inline >
                        <label>Category</label>
                        <Form.Field required
                            control={Radio}
                            label='Used'
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
                        value={this.state.payload.category}
                        search
                        searchInput={{ id: 'accessoryType' }}
                        onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, category: e.target.innerText } }, () => {
                            console.log(this.state)
                        })}
                    />

                    <label>Advertisement Title</label>
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
                            // label='Advertisement Title'
                            placeholder='Add an advertisement title'
                            disabled={this.state.titleState ? this.state.titleState : false}
                            onChange={handleChange}
                        />
                    </div>

                    <label >Description</label>
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
                            // label='Description'
                            placeholder='Description'
                            disabled={this.state.descriptionState ? this.state.descriptionState : false}
                            onChange={handleChange}
                        />
                    </div>

                    <label >Price(Rs.)</label>
                    <div className='form-edit-field'>
                        <Icon
                            name={this.state.priceState ? 'edit' : 'save'}
                            onClick={() => this.setState({ ...this.state, priceState: !this.state.priceState })}
                        />

                        <Form.Field
                            width='16'
                            name='price'
                            id='price'
                            inline={false}
                            type='number'
                            control={Input}
                            // label='Price(Rs.)'
                            placeholder='Price(Rs)'
                            disabled={this.state.priceState ? this.state.priceState : false}
                            onChange={handleChange}
                        />
                    </div>

                    <Form.Checkbox label='Negotiable'
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
                    <div style={{ marginTop: '20px' }}>
                        <Modal
                            closeIcon
                            open={this.state.imgModalOpen}
                            trigger={<Button color='orange' type='button'><Icon name='edit' />Images</Button>}
                            onClose={() => this.setState({ ...this.state, imgModalOpen: false })}
                            onOpen={() => this.setState({ ...this.state, imgModalOpen: true })}
                        >
                            <Header icon='image' content='Update Images' />
                            <Modal.Content>

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
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={() => this.setState({ ...this.state, imgModalOpen: false })}>
                                    <Icon name='checkmark' /> Done
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        <Modal
                            closeIcon
                            open={this.state.cntModalOpen}
                            trigger={<Button color='orange' type='button'><Icon name='edit' />Contact</Button>}
                            onClose={() => this.setState({ ...this.state, cntModalOpen: false })}
                            onOpen={() => this.setState({ ...this.state, cntModalOpen: true })}
                        >
                            <Header icon='phone' content='Update Contact Details' />
                            <Modal.Content>
                                <Form.Group style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Form.Field
                                        id='phoneCode'
                                        control={Select}
                                        options={phoneOptions}
                                        label='Code'
                                        placeholder='Code'
                                        onChange={(e) => this.setState({ ...this.state, code: e.target.innerText }, () => {
                                            console.log(this.state)
                                        })}
                                    />
                                    &nbsp;
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
                                <ul style={{ display: 'flex', flexDirection: 'column' }}>
                                    {this.state.payload.contactNumbers.length > 0 ? this.state.payload.contactNumbers.map(contact => {
                                        return <div style={{ decoration: 'none', display: 'flex', flexDirection: 'row', marginTop: '30px' }}><Icon name='phone'><h4>{contact.replace('Sri Lanka', '')}</h4></Icon><Icon name='delete' onClick={deletePhone} color='red' /></div>
                                    }) : null}
                                </ul>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={() => this.setState({ ...this.state, cntModalOpen: false })}>
                                    <Icon name='checkmark' /> Done
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                </Form>
            </div>
        )
    }
}