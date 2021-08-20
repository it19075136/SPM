import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select, Divider, Header, Icon, Segment } from 'semantic-ui-react'
import ImageUploading from 'react-images-uploading';

const categoryOptions = [
    { key: 'c', text: 'Car', value: 'car' },
    { key: 's', text: 'SUV', value: 'suv' },
    { key: 'v', text: 'Van', value: 'van' },
    { key: 'b', text: 'Bus', value: 'bus' },
    { key: 'l', text: 'Lorry', value: 'lorry' },
    { key: 'm', text: 'Motor Cycle', value: 'motorCycle' },
    { key: 'o', text: 'Other', value: 'othe' },
]

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
    { key: 'e', text: 'Electric', value: 'electric' },
]

const phoneOptions = [
    { key: 'sl', text: 'Sri Lanka (+94)', value: '+94' }
]

export default class updateVehicleAdForm extends Component {

    state = {
        payload: {
            title: '',
            description: '',
            status: 'pending',
            year: null,
            make: '',
            model: '',
            category: '',
            bodyType: '',
            transmission: '',
            condition: '',
            engineCapacity: null,
            fuelType: '',
            mileage: null,
            price: null,
            negotiable: false,
            images: [],
            userId: null,
            contactNumbers: []
        },
        code: '',
        phone: '',
        titleState: true,
        engineState: true,
        priceState: true,
        mileageState: true,
        descriptionState: true
    }

    render() {

        const handleChange = (e) => {
            this.setState({ ...this.state, payload: { ...this.state.payload, [e.target.name]: e.target.value } }, () => {
                console.log(this.state);
            });
        }

        // const addPhone = () => {
        //     this.setState({ ...this.state, payload: { ...this.state.payload, contactNumbers: [...this.state.payload.contactNumbers, this.state.code + this.state.phone] } }, () => {
        //         console.log(this.state)
        //     })
        // }

        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
        }

        return (
            <div className='form-centered'>
                <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Update Your Vehicle Details
                </Header>
                <Form className='update-form-content' onSubmit={handleSubmit}>

                    <div>
                        <Form.Field required
                            id='category'
                            name="category"
                            width='16'
                            control={Select}
                            options={categoryOptions} // get categories
                            label={{ children: 'Category', htmlFor: 'category' }}
                            placeholder='Vehicle Category'
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
                            options={vehicleMakeOptions}
                            label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                            placeholder='Vehicle Make'
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
                            options={vehicleModelOptions}
                            label={{ children: 'Vehicle Model', htmlFor: 'vehicleModel' }}
                            placeholder='Vehicle Model'
                            search
                            searchInput={{ id: 'vehicleModel' }}
                            onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, model: e.target.innerText } }, () => {
                                console.log(this.state)
                            })}
                        />
                        <Form.Field required
                            name='year'
                            width='16'
                            control={Input}
                            type='date'
                            label={{ children: 'Registered year', htmlFor: 'date' }}
                            placeholder='Registered year'
                            search
                            searchInput={{ id: 'date' }}
                            onChange={handleChange}
                        />
                        <Form.Field required
                            name='bodyType'
                            width='16'
                            control={Select}
                            options={vehicleBodyOptions}
                            label={{ children: 'Vehicle Body Type', htmlFor: 'bodyType' }}
                            placeholder='Vehicle Body Type'
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
                            label={{ children: 'Transmission', htmlFor: 'transmission' }}
                            placeholder='Transmission'
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
                            placeholder='Fuel Type'
                            search
                            searchInput={{ id: 'fuelType' }}
                            onChange={(e) => this.setState({ ...this.state, payload: { ...this.state.payload, fuelType: e.target.innerText } }, () => {
                                console.log(this.state)
                            })}
                        />
                        <Form.Field
                            primary
                            id='submit'
                            name="formSubmit"
                            type='submit'
                            className='form-update-btn'
                            control={Button}
                            content='Post Ad'
                        />
                    </div>
                    &nbsp;
                    &nbsp;
                    <div>
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
                                name={this.state.engineState ? 'edit' : 'save'}
                                onClick={() => this.setState({ ...this.state, engineState: !this.state.engineState })}
                            />
                            <Form.Field required
                                id='engineCapacity'
                                name='engineCapacity'
                                type='number'
                                control={Input}
                                label='Engine capacity'
                                placeholder='Engine capacity(cc)'
                                disabled={this.state.engineState ? this.state.engineState : false}
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
                        <div className='form-edit-field'>
                            <Icon
                                name={this.state.mileageState ? 'edit' : 'save'}
                                onClick={() => this.setState({ ...this.state, mileageState: !this.state.mileageState })}
                            />
                            <Form.Field required
                                name='mileage'
                                id='mileage'
                                type='number'
                                control={Input}
                                label='Mileage'
                                placeholder='Mileage(Kms)'
                                disabled={this.state.mileageState ? this.state.mileageState : false}
                                onChange={handleChange}
                            />
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
                                control={TextArea}
                                label='Description'
                                placeholder='Description'
                                disabled={this.state.descriptionState ? this.state.descriptionState : false}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Button color='orange' type='button' onClick={() => console.log('btn clicked')}><Icon name='edit' />Images</Button>
                            <Button color='orange' type='button' onClick={() => console.log('btn clicked')}><Icon name='edit' />Contact</Button>
                        </div>
                    </div>

                    {/* <Divider horizontal>
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
                        <Button
                            type='button'
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </Button>
                        &nbsp;
                        <Button color='red' type='button' disabled={this.state.payload.images.length < 1} onClick={onImageRemoveAll} >Remove all images</Button>
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
*/}
                </Form>
            </div>

        )
    }
}
