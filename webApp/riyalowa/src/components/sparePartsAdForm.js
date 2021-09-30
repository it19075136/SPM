import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select, Segment, Divider, Header, Radio, Loader, Transition, List, Icon } from 'semantic-ui-react'
import ImageUploading from 'react-images-uploading';
import { connect } from 'react-redux';
import {publishSparepartsAd} from '../redux/actions/sparepartsActions';
import { getAllCategories } from '../redux/actions/categoryActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {districts} from '../utils/districts';

const partTypeOption = [
    { key: 'b', text: 'Body Components', value: 'components' },
    { key: 'a', text: 'Car Audio Systems', value: 'audio' },
    { key: 'e', text: 'Engines & Engine Parts', value: 'engine' },
]

const phoneOptions = [
    { key: 'sl', text: 'Sri Lanka (+94)', value: '+94' }
]

class sparePartAdForm extends Component {
    state = {
        payload: {
            condition: '',
            category: '',
            title: '',
            description: '',
            delivery: false,
            price: null,
            negotiable: false,
            images: [],
            location: '',
            userId: this.props.user._id,
            contactNumbers: [this.props.user.phoneNumber],
            status: 'pending'
        },
        code: '',
        phone: '',
        success: false,
        error: false,
        actionWaiting: false,
        categoryOption: [],
        makeOption: [],
        locationOptions: []
    }

    arrangeDistricts = () => {

        let dists = []
        for (let index = 0; index < districts.length; index++) 
            dists.push({ key: index, text: districts[index], value: districts[index] })

        this.setState({...this.state,locationOptions:dists})            
        
    }

    componentDidMount = () => {
        this.props.getAllCategories().then((res) => {
            console.log(res)
            res.filter(item => item.type == 'Spare Parts').forEach((element, index) => {
                this.setState({ ...this.state, categoryOption: [...this.state.categoryOption, {key: index, text: element.mainName, value: element.mainName}]}, () => {
                    element.make.forEach((childrenElem) => {
                        this.setState({...this.state, makeOption: [...this.state.makeOption, {key: element.mainName , text: childrenElem, value: childrenElem}]})
                    })
                })
            })
            this.arrangeDistricts();
        })
    }

    addPhone = () => {
        this.setState({ ...this.state, payload: { ...this.state.payload, contactNumbers: [...this.state.payload.contactNumbers, this.state.code + this.state.phone] } }, () => {
            this.setState({ ...this.state, phone: '' })
        })
    }

    deletePhone = () =>
        this.setState((prevState) => ({ ...this.state, payload: { ...this.state.payload, contactNumbers: prevState.payload.contactNumbers.slice(0, -1) } }))

    render() {



        const handleChange = (e) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } }, () => {
                console.log(this.state);
            });
        }

        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
            this.setState({ ...this.state, actionWaiting: true }, () => {
                this.props.publishSparepartsAd(this.state.payload).then((res) => {
                    console.log(res);
                    this.setState({ ...this.state, success: true }, () => {
                        notify();
                        this.setState({ ...this.state, success: false, actionWaiting: false })
                    })
                }).catch((err) => {
                    console.log(err);
                    this.setState({ ...this.state, error: true }, () => {
                        notify();
                        this.setState({ ...this.state, error: false, actionWaiting: false })
                       
                    })
                })
            })
        }

        const handleImageDrop = (imageList, addUpdateIndex) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, images: imageList.filter(img => img.file ? img.file.size / (1000 * 1024) < 5 : true) } }, () => {
                return imageList.length > imageList.filter((img, index) => img.file ? img.file.size / (1000 * 1024) < 5 : true).length ? alert('One or more images you selected exceeds size limit of 5mb, those will not be published') : null
            })
        }

        const notify = () => this.state.success ? toast.success('✔ Your ad successfully submitted for reviewing!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }) : this.state.error ? toast.error('❌ Action was unsuccessful, please check and try again!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }) : null


        return (
            <Form className="form-centered" onSubmit={handleSubmit}>
                <Header as='h2' color='blue' textAlign='center'>
                    Fill Your Spare Parts Details
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
                    name="category"
                    options={this.state.categoryOption}
                    label={{ children: 'Part or Accessory Type', htmlFor: 'accessoryType' }}
                    placeholder='Part or Accessory Type'
                    error={this.state.payload.category == ''}
                    search
                    searchInput={{ id: 'category' }}
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

                <Form.Checkbox label='Delivery Available?'
                    name='delivery'
                    onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, delivery: !this.state.delivery } })}
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
                    options={this.state.locationOptions}
                    error={this.state.payload.location == ''}
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
                    onChange={handleImageDrop}
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
                        onChange={(e) => this.setState({ ...this.state, code: e.target.innerText }, () => {
                            console.log(this.state)
                        })}

                    />
                    <Form.Field
                        action={
                            <Button.Group style={{ marginLeft: '0px' }}>
                                <Button
                                    primary
                                    type='button'
                                    disabled={this.state.phone == ''}
                                    icon='plus'
                                    onClick={this.addPhone}
                                />
                                <Button
                                    color='red'
                                    type='button'
                                    disabled={this.state.payload.contactNumbers.length === 0}
                                    icon='trash'
                                    onClick={this.deletePhone}
                                />
                            </Button.Group>
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

                <Transition.Group
                    as={List}
                    duration={200}
                    divided
                    size='huge'
                    verticalAlign='middle'
                >
                    {this.state.payload.contactNumbers.map((item) => (
                        <List.Item key={item}>
                            <Icon name='call' />
                            <List.Content header={item} />
                        </List.Item>
                    ))}
                </Transition.Group>

                <Form.Group>
                    <Form.Field
                        primary
                        id='submit'
                        name="formSubmit"
                        type='submit'
                        control={Button}
                        content={this.state.actionWaiting ? 'Please wait..' : 'Post Ad'}
                        disabled={this.state.actionWaiting}
                    />
                    {this.state.actionWaiting ? <Loader active inline /> : null}
                </Form.Group>
                <ToastContainer style={{ fontSize: '20px' }} />

            </Form>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    user: state.user.user
})

export default connect(mapStateToProps, { publishSparepartsAd, getAllCategories })(sparePartAdForm)