import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select, Header, Icon, Segment, Radio, Modal, Dimmer, Loader, Transition, List } from 'semantic-ui-react';
import ImageUploading from 'react-images-uploading';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCategories } from '../redux/actions/categoryActions';
import { updateSparepartsAd, deleteSparepartsAd, getSparepartAdById } from '../redux/actions/sparepartsActions';
import {districts} from '../utils/districts';

const locationOption = [
    { key: '1', text: 'Kandy', value: 'kandy' },
    { key: '2', text: 'Colombo', value: 'colombo' },
    { key: '3', text: 'Malabe', value: 'malabe' },
    { key: '4', text: 'Kegalle', value: 'kegalle' },
    { key: '5', text: 'Kurunegala', value: 'kurunegala' },
    { key: '6', text: 'Jaffna', value: 'jaffna' },
    { key: '7', text: 'Ampara', value: 'ampara' },
]
const phoneOptions = [
    { key: 'sl', text: 'Sri Lanka (+94)', value: '+94' }
]


class updateSparePartsAdForm extends Component {

    state = {
        payload: this.props.sparepartsAd,
        code: '',
        phone: '',
        titleState: true,
        descriptionState: true,
        priceState: true,
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
        this.props.getSparepartAdById(window.location.pathname.replace('/sparePartsAd/update/', '')).then((data) => {
            console.log(data);
            this.setState({ ...this.state, payload: data, loading: false }, () => {
                console.log(this.state)
            })
        }).catch((err) => {
            console.log(err)
            this.setState({ ...this.state, loading: false }, () => {
                alert('Please check your network connection and refresh the page');
            });
        })

        this.props.getAllCategories().then((res) => {
            console.log(this.props.getAllCategories())
            this.arrangeCategories(res.filter(elem => elem.type == "Spare Parts"));
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

        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
            this.setState({ ...this.state, actionWaiting: true, payload: {...this.state.payload, status: 'pending'}  }, () => {
                this.props.updateSparepartsAd(this.state.payload, window.location.pathname.replace('/sparePartsAd/update/', '')).then((res) => {
                    console.log('in update', res);
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
                this.props.deleteSparepartsAd(window.location.pathname.replace('/sparePartsAd/update/', '')).then((res) => {
                    console.log(res);
                    this.setState({ ...this.state, success: true, isDelete: true }, () => {
                        notify();
                        this.setState({ ...this.state, success: false, actionWaiting: false })
                    }, () => {
                        window.location.href = '/';
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


        const handleChange = (e) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } }, () => {
                console.log(this.state);
            });
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
            <div className="form-centered">
                <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Update Your Spare parts Details
                </Header>
                {this.state.payload ?
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
                            options={this.state.categoryOptions}
                            label={{ children: 'Part or Accessory Type', htmlFor: 'accessoryType' }}
                            placeholder={this.state.loading ? 'Please wait...' : this.state.payload.category ? this.state.payload.category : 'Part or Accessory Type'}
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
                                value={this.state.payload.title}
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
                                value={this.state.payload.description}
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
                                value={this.state.payload.price}
                                control={Input}
                                placeholder='Price(Rs)'
                                disabled={this.state.priceState ? this.state.priceState : false}
                                onChange={handleChange}
                            />
                        </div>

                        <Form.Checkbox label='Negotiable'
                            name='negotiable'
                            onChange={() => this.setState({ ...this.state, payload: { ...this.state.payload, negotiable: !this.state.negotiable } })}
                            checked={this.state.payload.negotiable}
                        />

                        <Form.Field required
                            width='16'
                            name="location"
                            id="location"
                            control={Select}
                            options={this.state.locationOptions}
                            value={this.state.payload.location}
                            label={{ children: 'Location', htmlFor: 'location' }}
                            placeholder={this.state.loading ? 'Please wait...' : this.state.payload.location ? this.state.payload.location : 'Your Location'}
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
                        <br /><br />
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
                                    className='form-update-btn'
                                    control={Button}
                                    content={this.state.actionWaiting ? 'Please wait..' : 'Update Ad'}
                                    disabled={this.state.actionWaiting}
                                />
                            </Form.Group>

                            {this.state.actionWaiting ? <Loader active inline /> : null}
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
    sparepartsAd: state.sparepart.sparepartAd,
    categories: state.category.categories
});

export default connect(mapStateToProps, { updateSparepartsAd, deleteSparepartsAd, getSparepartAdById, getAllCategories })(updateSparePartsAdForm)