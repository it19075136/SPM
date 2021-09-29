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
        images: []
    }

    componentDidMount = () => {
        this.props.getVehicleAdById(window.location.pathname.replace('/vehicleAdDetail/', '')).then((res) => {
            this.setState({ ...this.state, loading: false, vehicleAdDetails: res }, () => {
                console.log(this.state)
                for (let index = 0; index < res.images.length; index++) {
                    this.setState({ ...this.state, images: [...this.state.images, { original: res.images[index]['data_url'], thumbnail: res.images[index]['data_url'] }] })
                }
                axios.get(`http://localhost:5000/user/${this.state.vehicleAdDetails.userId}`).then((res) => {
                    this.setState({...this.state,sellerMail: res.data.email}, () => console.log('sellerMail',this.state.sellerMail))
                }).catch((err) => {
                    alert(String.toString(err))
                })
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        console.log(this.state.vehicleAdDetails)
        return (
            this.state.loading ? <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} /> :
            <div style={{ margin: '0 auto' }}>
                <Grid style={{ margin: '0 auto' }}>
                    <Grid.Column width={6}>
                        <ImageGallery items={this.state.images} style={{ padding: '10px' }} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h1>{this.state.vehicleAdDetails.title}&nbsp;</h1></Header><p style={{ marginTop: '10px' }}>Posted on {this.state.vehicleAdDetails.updatedAt.split('T')[0]}</p>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h2>Rs. {this.state.vehicleAdDetails.price}&nbsp;</h2></Header>{!this.state.vehicleAdDetails.Negotiable ? ' Negotiable' : null}
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Specifications</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
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
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Description</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container textAlign='left'>
                                {this.state.vehicleAdDetails.description}
                            </Container>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                        {this.state.vehicleAdDetails.contactNumbers.length > 0 ? 
                        <a href={'tel:'+ this.state.vehicleAdDetails.contactNumbers[0].contains(')') ? this.state.vehicleAdDetails.contactNumbers[0].split(')')[1]:this.state.vehicleAdDetails.contactNumbers[0]} ><Button icon labelPosition='left' color='blue'>
                            <Icon name='phone' />
                            CONTACT SELLER
                        </Button></a> : null}
                        <a href={'mailto:'+ this.state.sellerMail ? this.state.sellerMail : ''}><Button icon labelPosition='left' color='orange'>
                            <Icon name='mail' />
                            EMAIL
                        </Button></a>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Seller: abc</Header>

                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Location: {this.state.vehicleAdDetails.location} </Header> <Icon name='map marker alternate' size="big" style={{marginTop: '-10px'}}  color="blue"/>
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