import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getVehicleAdById } from '../redux/actions/vehicleAdActions'
import ImageGallery from 'react-image-gallery';
import axios from 'axios';

class vehicleAdDetails extends Component {

    state = {
        vehicleAdDetails: null,
        sellerMail: null,
        loading: true,
        images: [],
        sellerName: null
    }

    componentDidMount = () => {
        this.props.getVehicleAdById(window.location.pathname.replace('/vehicleAdDetail/', '')).then((res) => {
            this.setState({ ...this.state, loading: false, vehicleAdDetails: res }, () => {
                let images = []
                for (let index = 0; index < res.images.length; index++) {
                    images.push({ original: res.images[index]['data_url'], thumbnail: res.images[index]['data_url'], originalHeight: 300, originalWidth: 200 })
                }
                this.setState({...this.state, images: images})
                axios.get(`http://localhost:5000/user/${this.state.vehicleAdDetails.userId}`).then((res) => {
                    this.setState({...this.state,sellerMail: res.data.email, sellerName: res.data.name}, () => console.log('sellerMail',this.state.sellerMail))
                }).catch((err) => {
                    alert(String.toString(err))
                })
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            this.state.loading ? <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} /> :
            <div style={{ margin: '0 auto' }}>
                <Grid style={{ margin: '0 auto' }}>
                    <Grid.Column width={8}>
                        <ImageGallery showBullets={true} thumbnailPosition='left' showPlayButton={false} items={this.state.images} style={{ padding: '10px' }} />
                        <div style={{marginLeft: '25%'}}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Specifications</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px', display: 'flex', flexDirection: 'row' }} >
                            <Grid.Column width={3}>
                                <List verticalAlign='middle' divided>
                                    <List.Item>Category: <b>{this.state.vehicleAdDetails.category}</b></List.Item>
                                    <List.Item>Body Type: <b>{this.state.vehicleAdDetails.bodyType}</b></List.Item>
                                    <List.Item>Make: <b>{this.state.vehicleAdDetails.make}</b></List.Item>
                                    <List.Item>Model: <b>{this.state.vehicleAdDetails.model}</b></List.Item>
                                    <List.Item>Engine Capacity: <b>{this.state.vehicleAdDetails.engineCapacity} cc</b></List.Item>
                                </List>
                            </Grid.Column>
                            &nbsp;
                            &nbsp;
                            <Grid.Column width={3} >
                                <List verticalAlign='middle' divided>
                                    <List.Item>Transmission: <b>{this.state.vehicleAdDetails.transmission}</b></List.Item>
                                    <List.Item>Fuel Type: <b>{this.state.vehicleAdDetails.fuelType}</b></List.Item>
                                    <List.Item>Year: <b>{this.state.vehicleAdDetails.year}</b></List.Item>
                                    <List.Item>condition: <b>{this.state.vehicleAdDetails.condition === 'registered' ? 'Used' : 'New'}</b></List.Item>
                                    <List.Item>Mileage: <b>{this.state.vehicleAdDetails.mileage} km</b></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h1>{this.state.vehicleAdDetails.title}&nbsp;</h1></Header><p style={{ marginTop: '10px' }}>Posted on {this.state.vehicleAdDetails.updatedAt.split('T')[0]}</p>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h2>Rs. {this.state.vehicleAdDetails.price}&nbsp;</h2></Header>{!this.state.vehicleAdDetails.Negotiable ? ' Negotiable' : null}
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Description</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container style={{ padding: '10px'}}>
                                {this.state.vehicleAdDetails.description}
                            </Container>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Seller: {this.state.sellerName}</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Location: {this.state.vehicleAdDetails.location} </Header> <Icon name='map marker alternate' size="big" style={{marginTop: '-10px'}}  color="blue"/>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                        {this.state.vehicleAdDetails.contactNumbers.length > 0 ? 
                        <a href={this.state.vehicleAdDetails.contactNumbers.find(elem => elem != '').includes(')') ? 'tel:'+ this.state.vehicleAdDetails.contactNumbers.find(elem => elem != '').split(')')[1]:'tel:'+ this.state.vehicleAdDetails.contactNumbers.find(elem => elem != '')} ><Button icon labelPosition='left' color='blue'>
                            <Icon name='phone' />
                            CONTACT SELLER
                        </Button></a> : null}
                        <a href={this.state.sellerMail ? 'mailto:'+this.state.sellerMail : window.location.pathname}><Button icon labelPosition='left' color='orange' style={{top: '10px'}} >
                            <Icon name='mail' />
                            EMAIL
                        </Button></a>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    vehicle: state.vehicle.vehicleAd
})

export default connect(mapStateToProps, { getVehicleAdById })(vehicleAdDetails)