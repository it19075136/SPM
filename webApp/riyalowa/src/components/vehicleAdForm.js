import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Input, TextArea, Button, Select, Divider, Header, Icon, Segment, Message, Loader, List, Transition } from 'semantic-ui-react'
import ImageUploading from 'react-images-uploading';
import { publishVehicleAd } from '../redux/actions/vehicleAdActions';
import { getAllCategories } from '../redux/actions/categoryActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { districts } from '../utils/districts';
import axios from 'axios';

const vehicleBodyOptions = [
    { key: 'h', text: 'Hatchback', value: 'hatchback' },
    { key: 's', text: 'Sedan', value: 'sedan' },
    { key: 'c', text: 'Coupe', value: 'coupe' },
    { key: 'o', text: 'Other', value: 'other' },
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
    { key: 'sl', text: 'Sri Lanka (+94)', value: 'Sri Lanka (+94)' }
]

const yearOptions = [
    { key: 'l', text: '2000', value: '2000' },
    { key: '2', text: '2001', value: '2001' },
    { key: '3', text: '2002', value: '2002' },
    { key: '4', text: '2003', value: '2003' },
    { key: '5', text: '2004', value: '2004' }
]

class vehicleAdForm extends Component {

    state = {
        payload: {
            title: '',
            description: '',
            status: 'pending',
            year: '',
            make: '',
            model: '',
            category: '',
            location: '',
            bodyType: '',
            transmission: '',
            condition: 'registered',
            engineCapacity: null,
            fuelType: '',
            mileage: null,
            price: null,
            negotiable: false,
            images: [],
            userId: this.props.user._id,
            contactNumbers: [this.props.user.phoneNumber]
        },
        code: '',
        phone: '',
        success: false,
        error: false,
        actionWaiting: false,
        categoryOptions: [],
        makeOptions: [],
        locationOptions: [],
        vehicleModelOptions: [],
        setModelsLoading: false
        // validation: {
        //     year: false,
        //     make: false,
        //     model: false,
        //     category: false,
        //     location: false,
        //     bodyType: false,
        //     transmission: false,
        //     fuelType: false,
        //     mileage: false
        // }
    }

    arrangeCategories = (categories) => {

        let cats = []
        for (let index = 0; index < categories.length; index++)
            cats.push({ key: index, text: categories[index].mainName, value: categories[index].mainName })

        let makes = []
        categories.forEach(elem => {
            elem.make.forEach(child => {
                makes.push({ key: elem.mainName, text: child, value: child })
            })
        })

        this.setState({ ...this.state, categoryOptions: cats, makeOptions: makes }, () => console.log(this.state))
    }

    arrangeDistricts = () => {

        let dists = []
        for (let index = 0; index < districts.length; index++)
            dists.push({ key: index, text: districts[index], value: districts[index] })

        this.setState({ ...this.state, locationOptions: dists })

    }

    arrangeModels = (models) => {

        let mods = []
        for (let index = 0; index < models.length; index++)
            mods.push({ key: models[index].Model_ID, text: models[index].Model_Name, value: models[index].Model_Name })

        this.setState({ ...this.state, vehicleModelOptions: mods, setModelsLoading: false })

    }

    componentDidMount = () => {

        this.props.getAllCategories().then((res) => {
            this.arrangeCategories(res.filter(elem => elem.type == "Vehicles"));
            this.arrangeDistricts();
        })


    }

    addPhone = () =>
        this.setState({ ...this.state, payload: { ...this.state.payload, contactNumbers: [...this.state.payload.contactNumbers, this.state.code + this.state.phone] } }, () => {
            this.setState({ ...this.state, phone: '' })
        })

    deletePhone = () =>
        this.setState((prevState) => ({ ...this.state, payload: { ...this.state.payload, contactNumbers: prevState.payload.contactNumbers.slice(0, -1) } }))

    render() {

        const handleChange = (e) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } });
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            this.setState({ ...this.state, actionWaiting: true }, () => {
                this.props.publishVehicleAd(this.state.payload).then((res) => {
                    this.setState({ ...this.state, success: true }, () => {
                        notify();
                        this.setState({ ...this.state, success: false, actionWaiting: false })
                    })
                }).catch((err) => {
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

        const notify = () => this.state.success ? toast.success('??? Your ad successfully submitted for reviewing!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }) : this.state.error ? toast.error('??? Action was unsuccessful, please check and try again!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }) : null

        return (
            <Form className='form-centered' onSubmit={handleSubmit}>
                <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Fill Your Vehicle Details
                </Header>
                <Form.Field required
                    width='16'
                    id='title'
                    name="title"
                    control={Input}
                    label='Advertisement Title'
                    placeholder='Add an advertisement title'
                    onChange={handleChange}
                />
                <Form.Field required
                    name="location"
                    width='16'
                    control={Select}
                    options={this.state.locationOptions}
                    error={this.state.payload.location == ''}
                    label={{ children: 'Location', htmlFor: 'location' }}
                    placeholder='Select location'
                    search
                    searchInput={{ id: 'location' }}
                    onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, location: e.target.innerText } })}
                />
                <Form.Field required
                    id='category'
                    name="category"
                    width='16'
                    control={Select}
                    options={this.state.categoryOptions} // get categories
                    label={{ children: 'Category', htmlFor: 'category' }}
                    placeholder='Vehicle Category'
                    error={this.state.payload.category == ''}
                    search
                    searchInput={{ id: 'category' }}
                    onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, category: e.target.innerText } })}
                />
                <Form.Field required
                    name="make"
                    width='16'
                    control={Select}
                    options={this.state.payload.category ? this.state.makeOptions.filter(item => item.key == this.state.payload.category) : this.state.makeOptions}
                    error={this.state.payload.make == ''}
                    label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                    placeholder='Vehicle Make'
                    search
                    searchInput={{ id: 'vehicleMake' }}
                    onChange={(e) => this.setState(
                        { ...this.state, payload: { ...this.state.payload, make: e.target.innerText }, setModelsLoading: true },
                        () => {
                            axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${this.state.payload.make.toLocaleLowerCase()}?format=json`).then((res) => this.arrangeModels(res.data.Results)).catch((err) => {
                                alert('No Models found!!')
                                this.setState({ ...this.state, setModelsLoading: false })
                            }
                            );
                        })}
                />
                <Form.Field required
                    name="model"
                    width='16'
                    control={Select}
                    options={this.state.vehicleModelOptions.length > 0 ? this.state.vehicleModelOptions : null}
                    label={{ children: 'Vehicle Model', htmlFor: 'vehicleModel' }}
                    placeholder={this.state.setModelsLoading ? 'please wait...' : 'Vehicle Model'}
                    error={this.state.payload.model == ''}
                    search
                    searchInput={{ id: 'vehicleModel' }}
                    onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, model: e.target.innerText } })}
                />
                <Form.Field required
                    name='year'
                    width='16'
                    control={Select}
                    options={yearOptions}
                    value={this.state.payload.year}
                    label={{ children: 'Registered year', htmlFor: 'year' }}
                    error={this.state.payload.year == ''}
                    placeholder='Manufacture Date'
                    search
                    searchInput={{ id: 'year' }}
                    onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, year: e.target.innerText } })} />
                <Form.Field required
                    name='bodyType'
                    width='16'
                    control={Select}
                    options={vehicleBodyOptions}
                    label={{ children: 'Vehicle Body Type', htmlFor: 'bodyType' }}
                    placeholder='Vehicle Body Type'
                    error={this.state.payload.bodyType == ''}
                    search
                    searchInput={{ id: 'bodyType' }}
                    onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, bodyType: e.target.innerText } })}
                />
                <Form.Field required
                    name='transmission'
                    width='16'
                    control={Select}
                    options={transmissionOptions}
                    label={{ children: 'Transmission', htmlFor: 'transmission' }}
                    placeholder='Transmission'
                    error={this.state.payload.transmission == ''}
                    search
                    searchInput={{ id: 'transmission' }}
                    onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, transmission: e.target.innerText } })}
                />
                <Form.Group>
                    <Form.Field required
                        id='engineCapacity'
                        name='engineCapacity'
                        type='number'
                        control={Input}
                        label='Engine capacity'
                        placeholder='Engine capacity(cc)'
                        onChange={handleChange}
                    />
                    <Form.Field required
                        name='fuelType'
                        control={Select}
                        options={fuelOptions}
                        label={{ children: 'Fuel Type', htmlFor: 'fuelType' }}
                        placeholder='Fuel Type'
                        error={this.state.payload.fuelType == ''}
                        search
                        searchInput={{ id: 'fuelType' }}
                        onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, fuelType: e.target.innerText } })}
                    />
                </Form.Group>
                <Form.Field required
                    name='description'
                    width='16'
                    id='description'
                    control={TextArea}
                    label='Description'
                    placeholder='Description'
                    onChange={handleChange}
                />
                <Form.Group>
                    <Form.Field required
                        name='mileage'
                        id='mileage'
                        type='number'
                        control={Input}
                        label='Mileage'
                        placeholder='Mileage(Kms)'
                        onChange={handleChange}
                    />
                    <Form.Field
                        name='price'
                        id='price'
                        type='number'
                        control={Input}
                        label='Price(Rs.)'
                        placeholder='Price(Rs)'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group inline>
                    <Form.Radio
                        name='registered'
                        label='Registered'
                        checked={this.state.payload.condition === 'registered'}
                        onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, condition: 'registered' } })}
                    />
                    <Form.Radio
                        name='unregistered'
                        label='Unregistered'
                        checked={this.state.payload.condition === 'unregistered'}
                        onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, condition: 'unregistered' } })}
                    />
                    <Form.Checkbox label='Negotiable'
                        name='negotiable'
                        onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, negotiable: !this.state.negotiable } })}
                    />
                </Form.Group>
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
                    <Form.Field
                        id='phoneCode'
                        control={Select}
                        options={phoneOptions}
                        label='Code'
                        placeholder='Code'
                        onChange={(e) => this.setState({ ...this.state, code: e.target.innerText })}
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
                                    disabled={this.state.payload.contactNumbers.length === 1}
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
                    {this.state.payload.contactNumbers.filter(elem => elem != '').map((item) => (
                        <List.Item key={item}>
                            <Icon name='call' />
                            <List.Content header={item} />
                        </List.Item>
                    ))}
                </Transition.Group>
                <Form.Group className='form-submit-btn'>
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
    user: state.user.user,
    categories: state.category.categories
})

export default connect(mapStateToProps, { publishVehicleAd, getAllCategories })(vehicleAdForm)