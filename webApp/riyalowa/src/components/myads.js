import React, { Component } from 'react'
import { getAllVehicleAds } from '../redux/actions/vehicleAdActions'
import jwt from 'jsonwebtoken'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader, Dimmer, Card, Placeholder } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux'
import { CSVLink } from "react-csv";

class myads extends Component {
    headers = [
        { label: "_id", key: "_id" },
        { label: "Ad title", key: "title" },
        { label: "description", key: "description" },
        { label: "year", key: "year" },
        { label: "Status", key: "status" },
        { label: "make", key: "make" },
        { label: "model", key: "model" },
        { label: "location", key: "location" },
        { label: "category", key: "category" },
        { label: "bodyType", key: "bodyType" },
        { label: "condition", key: "condition" },
        { label: "engineCapacity", key: "engineCapacity" },
        { label: "transmission", key: "transmission" },
        { label: "fuelType", key: "fuelType" },
        { label: "condition", key: "condition" },
        { label: "mileage", key: "mileage" },
        { label: "price", key: "price" },
        { label: "negotiable", key: "negotiable" },
        { label: "images", key: "images" },
        { label: "userId", key: "userId" },
        { label: "contactNumbers", key: "contactNumbers" },
        { label: "createdAt", key: "createdAt" },
        { label: "updatedAt", key: "updatedAt" }
    ];
    state = {
        vehicleAdDetails: [],
        loading: true,
        images: [],
        user: null,
        csvReport: {
            data: [],
            headers: this.headers,
            filename: 'VehicleMyAds.csv'
        }
    }

    componentDidMount = () => {
        // this.props.getVehicleAdById(window.location.pathname.replace('/vehicleAdDetail/', '')).then((res) => {
        //     this.setState({ ...this.state, loading: false, vehicleAdDetails: res }, () => {
        //         console.log(this.state)
        //         for (let index = 0; index < res.images.length; index++) {
        //             this.setState({ ...this.state, images: [...this.state.images, { original: res.images[index]['data_url'], thumbnail: res.images[index]['data_url'] }] })
        //         }
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
        this.props.getAllVehicleAds().then(res => {
            console.log('res in getall vehicles', res)
            const userdetais = localStorage.getItem("user");
            const users = jwt.decode(userdetais);
            console.log('res in get user vehicles', res.filter(vehicle => vehicle.userId == users._id))
            this.setState({
                ...this.state,
                user: users,
                vehicleAdDetails: res.filter(vehicle => vehicle.userId == users._id),
                csvReport: {
                    ...this.state.csvReport,
                    data: res.filter(vehicle => vehicle.userId == users._id)
                }
            })
            // this.state.vehicleAdDetails.map(vehicleDetails=)
            console.log('this.state.vehicleAdDetails', this.state.vehicleAdDetails)
        }).catch(err => {
            // console.log(err)
            alert('Connection error pas!')
        })
    }

    navigateToDetails = (id) => {
        window.location.href = `/vehicleAdDetail/${id}`
    }

    navigateToEdit = (id) => {
        window.location.href = `/vehicleAd/update/${id}`
    }

    render() {
        return (
            <div>
                <CSVLink {...this.state.csvReport} className='export-btn' hidden={this.state.vehicleAdDetails.length < 1}  >Export to CSV</CSVLink>
                {/* {this.state.vehicleAdDetails.length >0 ? ( */}
                <div>
                    <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
                        {this.state.vehicleAdDetails ? this.state.vehicleAdDetails.map((item) => {
                            return <Card>
                                {item.images ? item.images[0] ? <Image src={item.images[0]['data_url']} wrapped centered ui={false} /> : <h1>No Image</h1> : <Placeholder >
                                    <Placeholder.Image square />
                                </Placeholder>}
                                <Card.Content>
                                    <Card.Content>
                                        <Card.Header>{item.title}
                                            
                                        </Card.Header>
                                        {item.title ? <div><Card.Description>
                                            <h4 className="date">Rs. {item.price} {item.negotiable ? 'Negotiable' : null}</h4>
                                        </Card.Description>
                                            <Card.Meta>{item.location}</Card.Meta></div>
                                            : null}
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button primary icon='eye' label='view' onClick={this.navigateToDetails.bind(this, item._id)} >view</Button>
                                        <Button primary icon='pencil' label='Edit' onClick={this.navigateToEdit.bind(this, item._id)} >Edit</Button>
                                    </Card.Content>
                                </Card.Content>
                            </Card>

                        }) : <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} />}
                    </Card.Group>

                </div>
                {/* ):<h1>NO Ads TO Display</h1>} */}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    // vehicleAds: state.vehicle.publishedVehicleAdIds
})
export default connect(mapStateToProps, { getAllVehicleAds })(myads);