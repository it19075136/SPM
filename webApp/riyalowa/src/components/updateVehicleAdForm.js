import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, TextArea, Button, Select, Header, Icon, Modal, Segment, List, Loader, Transition, Dimmer, Image } from 'semantic-ui-react'
import ImageUploading from 'react-images-uploading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCategories } from '../redux/actions/categoryActions';
import { updateVehicleAd, deleteVehicleAd, getVehicleAdById } from '../redux/actions/vehicleAdActions';
import {districts} from '../utils/districts';

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

const yearOptions = [
    { key: 'l', text: '2000', value: '2000' },
    { key: '2', text: '2001', value: '2001' },
    { key: '3', text: '2002', value: '2002' },
    { key: '4', text: '2003', value: '2003' },
    { key: '5', text: '2004', value: '2004' }
]

class updateVehicleAdForm extends Component {

    state = {
        payload: this.props.vehicleAd,
        code: '',
        phone: '',
        titleState: true,
        engineState: true,
        priceState: true,
        mileageState: true,
        descriptionState: true,
        imgModalOpen: false,
        success: false,
        error: false,
        loading: true,
        actionWaiting: false,
        isDelete: false,
        categoryOptions: [],
        makeOptions: [],
        locationOptions: []
    }

    arrangeDistricts = () => {

        let dists = []
        for (let index = 0; index < districts.length; index++) 
            dists.push({ key: index, text: districts[index], value: districts[index] })

        this.setState({...this.state,locationOptions:dists})            
        
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

    componentDidMount = () => {
        this.props.getVehicleAdById(window.location.pathname.replace('/vehicleAd/update/', '')).then((data) => {
            console.log(data);
            this.setState({ ...this.state, payload: data, loading: false }, () => {
                console.log(this.state)
            })
        }).catch((err) => {
            console.log(err)
            this.setState({ ...this.state, loading: false }, () => {
                alert('Please check your network connection and refresh the page')
            });
        })

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
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } }, () => {
                console.log(this.state);
            });
        }

        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
            this.setState({ ...this.state, actionWaiting: true }, () => {
                this.props.updateVehicleAd(this.state.payload, window.location.pathname.replace('/vehicleAd/update/', '')).then((res) => {
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
                        window.location.reload(false);
                    })

                })
            })
        }

        const handleDelete = () => {
            console.log(this.state);
            this.setState({ ...this.state, actionWaiting: true }, () => {
                this.props.deleteVehicleAd(window.location.pathname.replace('/vehicleAd/update/', '')).then((res) => {
                    console.log(res);
                    this.setState({ ...this.state, success: true, isDelete: true }, () => {
                        notify();
                        setTimeout(() => {
                            this.setState({ ...this.state, success: false, actionWaiting: false, isDelete: false })
                            window.location.href = '/'
                        }, 2000);
                    })
                }).catch((err) => {
                    console.log(err);
                    this.setState({ ...this.state, error: true }, () => {
                        notify();
                        this.setState({ ...this.state, error: false, actionWaiting: false })
                        window.location.reload(false);
                    })

                })
            })
        }

        const handleImageDrop = (imageList, addUpdateIndex) => {
            console.log(imageList)
            this.setState({ ...this.state, payload: { ...this.state.payload, images: imageList.filter(img => img.file ? img.file.size / (1000 * 1024) < 5 : true) } }, () => {
                return imageList.length > imageList.filter((img, index) => img.file ? img.file.size / (1000 * 1024) < 5 : true).length ? alert('One or more images you selected exceeds size limit of 5mb, those will not be published') : null
            })
        }

        const notify = () => this.state.success && this.state.isDelete ? toast.success('✔ Your ad is successfully deleted!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: this.setState({ ...this.state, isDelete: false }),
            progress: undefined,
        }) : this.state.success ? toast.success('✔ Your ad successfully submitted for reviewing!', {
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
            <div className='form-centered'>
                <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Update Your Vehicle Details
                </Header>
                {this.state.payload ?
                    <Form className='update-form-content' onSubmit={handleSubmit} loading={this.state.loading}>
                        <div>
                            <Form.Field required
                                id='category'
                                name="category"
                                width='16'
                                control={Select}
                                options={this.state.categoryOptions} // get categories
                                value={this.state.payload.category}
                                label={{ children: 'Category', htmlFor: 'category' }}
                                placeholder={this.state.loading ? 'Please wait...' : this.state.payload.category ? this.state.payload.category : 'Vehicle Category'}
                                search
                                searchInput={{ id: 'category' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, category: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })}
                            />
                            <Form.Field required
                                name="make"
                                width='16'
                                control={Select}
                                options={this.state.payload.category ? this.state.makeOptions.filter(item => item.key == this.state.payload.category) : this.state.makeOptions}
                                value={this.state.payload.make}
                                label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                                placeholder={this.state.payload.make ? this.state.payload.make : 'Vehicle Make'}
                                search
                                searchInput={{ id: 'vehicleMake' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, make: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })}
                            />
                            <Form.Field required
                                name="model"
                                width='16'
                                control={Select}
                                value={this.state.payload.model}
                                options={vehicleModelOptions}
                                label={{ children: 'Vehicle Model', htmlFor: 'vehicleModel' }}
                                placeholder={this.state.payload.model ? this.state.payload.model : 'Vehicle Model'}
                                search
                                searchInput={{ id: 'vehicleModel' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, model: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })}
                            />
                            <Form.Field required
                                name='year'
                                width='16'
                                control={Select}
                                options={yearOptions}
                                value={this.state.payload.year}
                                label={{ children: 'Registered year', htmlFor: 'year' }}
                                placeholder={this.state.payload.year ? this.state.payload.year : 'Manufacture Date'}
                                search
                                searchInput={{ id: 'year' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, year: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })} />
                            <Form.Field required
                                name='bodyType'
                                width='16'
                                control={Select}
                                options={vehicleBodyOptions}
                                value={this.state.payload.bodyType}
                                label={{ children: 'Vehicle Body Type', htmlFor: 'bodyType' }}
                                placeholder={this.state.payload.bodyType ? this.state.payload.bodyType : 'Vehicle Body Type'}
                                search
                                searchInput={{ id: 'bodyType' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, bodyType: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })}
                            />
                            <Form.Field required
                                name='transmission'
                                width='16'
                                control={Select}
                                options={transmissionOptions}
                                value={this.state.payload.transmission}
                                label={{ children: 'Transmission', htmlFor: 'transmission' }}
                                placeholder={this.state.payload.transmission ? this.state.payload.transmission : 'Transmission'}
                                search
                                searchInput={{ id: 'transmission' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, transmission: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })}
                            />
                            <Form.Field required
                                name='fuelType'
                                control={Select}
                                options={fuelOptions}
                                label={{ children: 'Fuel Type', htmlFor: 'fuelType' }}
                                value={this.state.payload.fuelType}
                                placeholder={this.state.payload.fuelType ? this.state.payload.fuelType : 'Fuel Type'}
                                search
                                searchInput={{ id: 'fuelType' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, fuelType: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })}
                            />
                        </div>
                        &nbsp;
                        <div>
                            <Form.Field required
                                id='location'
                                name="location"
                                width='16'
                                control={Select}
                                options={this.state.locationOptions}
                                value={this.state.payload.location}
                                label={{ children: 'location', htmlFor: 'location' }}
                                placeholder={this.state.payload.location ? this.state.payload.location : 'Select location'}
                                search
                                searchInput={{ id: 'location' }}
                                onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, location: e.target.innerText } }, () => {
                                    console.log(this.state)
                                })}
                            />
                            <div className='form-edit-field'>
                                <Form.Field>
                                    <div>
                                        <Icon
                                            name={this.state.titleState ? 'edit' : 'save'}
                                            onClick={() => this.setState({ ...this.state, titleState: !this.state.titleState })}
                                        />
                                        <label>Advertisement Title</label>
                                    </div>
                                    <input
                                        required
                                        width='16'
                                        id='title'
                                        value={this.state.payload.title}
                                        name="title"
                                        placeholder='Add an advertisement title'
                                        disabled={this.state.titleState ? this.state.titleState : false}
                                        onChange={handleChange}
                                    />
                                </Form.Field>
                            </div>
                            <br />
                            <div className='form-edit-field'>
                                <Form.Field>
                                    <div>
                                        <Icon
                                            name={this.state.engineState ? 'edit' : 'save'}
                                            onClick={() => this.setState({ ...this.state, engineState: !this.state.engineState })}
                                        />
                                        <label>Engine capacity</label>
                                    </div>
                                    <input required
                                        id='engineCapacity'
                                        name='engineCapacity'
                                        value={this.state.payload.engineCapacity}
                                        type='number'
                                        placeholder='Engine capacity(cc)'
                                        disabled={this.state.engineState ? this.state.engineState : false}
                                        onChange={handleChange}
                                    />
                                </Form.Field>
                            </div>
                            <br />
                            <div className='form-edit-field'>
                                <Form.Field>
                                    <div>
                                        <Icon
                                            name={this.state.priceState ? 'edit' : 'save'}
                                            onClick={() => this.setState({ ...this.state, priceState: !this.state.priceState })}
                                        />
                                        <label>Price(Rs.)</label>
                                    </div>
                                    <input
                                        name='price'
                                        id='price'
                                        type='number'
                                        value={this.state.payload.price}
                                        placeholder='Price(Rs)'
                                        disabled={this.state.priceState ? this.state.priceState : false}
                                        onChange={handleChange}
                                    />
                                    <Form.Checkbox label='Negotiable'
                                        name='negotiable'
                                        checked={this.state.payload.negotiable}
                                        onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, negotiable: !this.state.negotiable } })}
                                    />
                                </Form.Field>
                            </div>
                            <br />
                            <div className='form-edit-field'>
                                <Form.Field>
                                    <div>
                                        <Icon
                                            name={this.state.mileageState ? 'edit' : 'save'}
                                            onClick={() => this.setState({ ...this.state, mileageState: !this.state.mileageState })}
                                        />
                                        <label>Mileage</label>
                                    </div>
                                    <input required
                                        name='mileage'
                                        id='mileage'
                                        type='number'
                                        value={this.state.payload.mileage}
                                        placeholder='Mileage(Kms)'
                                        disabled={this.state.mileageState ? this.state.mileageState : false}
                                        onChange={handleChange}
                                    />
                                </Form.Field>
                            </div>
                            <Form.Group inline>
                                <Form.Radio
                                    name='registered'
                                    label='Registered'
                                    checked={this.state.payload.condition === 'registered'}
                                    onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, condition: 'registered' } }, () => {
                                        console.log(this.state)
                                    })}
                                />
                                <Form.Radio
                                    name='unregistered'
                                    label='Unregistered'
                                    checked={this.state.payload.condition === 'unregistered'}
                                    onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, condition: 'unregistered' } }, () => {
                                        console.log(this.state)
                                    })}
                                />
                            </Form.Group>
                            <div className='form-edit-field'>
                                <Icon
                                    name={this.state.descriptionState ? 'edit' : 'save'}
                                    onClick={() => this.setState({ ...this.state, descriptionState: !this.state.descriptionState })}
                                />
                                <Form.Field required
                                    name='description'
                                    width='16'
                                    id='description'
                                    value={this.state.payload.description}
                                    control={TextArea}
                                    label='Description'
                                    placeholder='Description'
                                    disabled={this.state.descriptionState ? this.state.descriptionState : false}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='update-form-edit-btn-section'>
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
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='green' onClick={() => this.setState({ ...this.state, cntModalOpen: false })}>
                                            <Icon name='checkmark' /> Done
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </div>
                            <div className='form-main-btn-section'>
                                <Button color='red'
                                    type='button'
                                    className='form-delete-btn'
                                    disabled={this.state.actionWaiting}
                                    onClick={handleDelete}
                                >{this.state.actionWaiting ? 'Please wait..' : 'Delete Ad'}
                                </Button>
                                <Form.Group>
                                    <Form.Field
                                        primary
                                        id='submit'
                                        name="formSubmit"
                                        type='submit'
                                        control={Button}
                                        content={this.state.actionWaiting ? 'Please wait..' : 'Update Ad'}
                                        disabled={this.state.actionWaiting}
                                    />
                                </Form.Group>
                                {this.state.actionWaiting ? <Loader active inline /> : null}
                            </div>
                        </div>
                    </Form>
                    :
                    <Dimmer active inverted style={{ margin: '0 auto' }}>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>}
                <ToastContainer style={{ fontSize: '20px' }} />
            </div>

        )
    }
}

const mapStateToProps = state => ({
    vehicleAd: state.vehicle.vehicleAd
});

export default connect(mapStateToProps, { updateVehicleAd, deleteVehicleAd, getVehicleAdById, getAllCategories })(updateVehicleAdForm)