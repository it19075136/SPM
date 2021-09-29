import React, { Component } from 'react'
import { getAllVehicleAds } from '../redux/actions/vehicleAdActions'
import jwt from 'jsonwebtoken'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader,Dimmer } from 'semantic-ui-react'
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
        user:null,
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
        this.props.getAllVehicleAds().then(res=>{
            console.log('res in getall vehicles',res)
            const userdetais = localStorage.getItem("user");
            const users = jwt.decode(userdetais);
            console.log('res in get user vehicles',res.filter(vehicle=> vehicle.userId ==users._id))
                this.setState({
                    ...this.state,
                    user:users,
                    vehicleAdDetails:res.filter(vehicle=> vehicle.userId ==users._id),
                    csvReport: {
                        ...this.state.csvReport,
                        data:res.filter(vehicle=> vehicle.userId ==users._id)
                    }
                })
                // this.state.vehicleAdDetails.map(vehicleDetails=)
                console.log('this.state.vehicleAdDetails',this.state.vehicleAdDetails)
        }).catch(err=>{
            // console.log(err)
            alert('Connection error pas!')
        })
    }
    render() {
        return (
            <div>
                <CSVLink {...this.state.csvReport} className='export-btn' hidden={this.state.vehicleAdDetails.length < 1}  >Export to CSV</CSVLink> 
            {/* {this.state.vehicleAdDetails.length >0 ? ( */}
            <div>
            {this.state.vehicleAdDetails ? this.state.vehicleAdDetails.map(vehicleAdDetails=>{
               const images =[]
                {
                    // console.log(this.state)
                    // for (let index = 0; index < vehicleAdDetails.images.length; index++) {
                    //     this.setState({ ...this.state, 
                    //         images = [...vehicleAdDetails.images, { original: vehicleAdDetails.images[index]['data_url'], thumbnail: vehicleAdDetails.images[index]['data_url'] }]
                    //      })
                    // }
                    // axios.get(`http://localhost:5000/user/${vehicleAdDetails.userId}`).then((res) => {
                    //     this.setState({...this.state,sellerMail: res.data.email}, () => console.log('sellerMail',this.state.sellerMail))
                    // }).catch((err) => {
                    //     alert(String.toString(err))
                    // })
                }
                return <div style={{ margin: '0 auto' }}>
                <Grid style={{ margin: '0 auto' }}>
                    <Grid.Column width={6}>
                        <ImageGallery items={vehicleAdDetails.images} style={{ padding: '10px' }} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h1>{vehicleAdDetails.title}&nbsp;</h1></Header><p style={{ marginTop: '10px' }}>Posted on {vehicleAdDetails.updatedAt.split('T')[0]}</p>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h2>Rs. {vehicleAdDetails.price}&nbsp;</h2></Header>{!vehicleAdDetails.Negotiable ? ' Negotiable' : null}
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Specifications</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Grid.Column width={3}>
                                <List verticalAlign='middle' divided>
                                    <List.Item>Category: <b>{vehicleAdDetails.category}</b></List.Item>
                                    <List.Item>Body Type: <b>{vehicleAdDetails.bodyType}</b></List.Item>
                                    <List.Item>Make: <b>{vehicleAdDetails.make}</b></List.Item>
                                    <List.Item>Model: <b>{vehicleAdDetails.model}</b></List.Item>
                                    <List.Item>Engine Capacity: <b>{vehicleAdDetails.engineCapacity} cc</b></List.Item>
                                </List>
                            </Grid.Column>
                            &nbsp;
                            &nbsp;
                            <Grid.Column width={3} >
                                <List verticalAlign='middle' divided>
                                    <List.Item>Transmission: <b>{vehicleAdDetails.transmission}</b></List.Item>
                                    <List.Item>Fuel Type: <b>{vehicleAdDetails.fuelType}</b></List.Item>
                                    <List.Item>Year: <b>{vehicleAdDetails.year}</b></List.Item>
                                    <List.Item>condition: <b>{vehicleAdDetails.condition === 'registered' ? 'Used' : 'New'}</b></List.Item>
                                    <List.Item>Mileage: <b>{vehicleAdDetails.mileage} km</b></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Description</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container textAlign='left'>
                                {vehicleAdDetails.description}
                            </Container>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                        <a href={'tel:'+vehicleAdDetails.contactNumbers[0].split(')')[1]} ><Button icon labelPosition='left' color='blue'>
                            <Icon name='phone' />
                            CONTACT SELLER
                        </Button></a>
                         {/* add mail from user when available */}
                        <a href={'mailto:'+vehicleAdDetails.contactNumbers[0].split(')')[1]}><Button icon labelPosition='left' color='orange'>
                            <Icon name='mail' />
                            EMAIL
                        </Button></a>
                        <a href={'/vehicleAd/update/'+vehicleAdDetails._id}><Button icon labelPosition='left' color='orange'>
                            <Icon name='edit' />
                            Edit
                        </Button></a>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Seller: abc</Header>

                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Location: {vehicleAdDetails.location} </Header> <Icon name='map marker alternate' />
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>status: {vehicleAdDetails.status} </Header> 
                            {/* <Icon name='map marker alternate' /> */}
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                </div>
                }):<Dimmer active inverted style={{ margin: '0 auto' }}>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
        // <ToastContainer style={{ fontSize: '20px' }} />
        }
            
            </div>
             {/* ):<h1>NO Ads TO Display</h1>} */}
             </div>
        )
    }
}
const mapStateToProps = (state) => ({
    // vehicleAds: state.vehicle.publishedVehicleAdIds
})
export default connect(mapStateToProps, {getAllVehicleAds })(myads);