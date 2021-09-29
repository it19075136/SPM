import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader,Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {getAllSparePartsAds } from '../redux/actions/sparepartsActions'
import ImageGallery from 'react-image-gallery';
import jwt from 'jsonwebtoken'
import { CSVLink } from "react-csv";

class sparepartAdDetails extends Component {

    headers = [
        { label: "_id", key: "_id" },
        { label: "Ad title", key: "title" },
        { label: "description", key: "description" },
        { label: "delivery", key: "delivery" },
        { label: "Status", key: "status" },
        { label: "location", key: "location" },
        { label: "category", key: "category" },
        { label: "condition", key: "condition" },
        { label: "price", key: "price" },
        { label: "negotiable", key: "negotiable" },
        { label: "images", key: "images" },
        { label: "userId", key: "userId" },
        { label: "contactNumbers", key: "contactNumbers" },
        { label: "createdAt", key: "createdAt" },
        { label: "updatedAt", key: "updatedAt" }
    ];

    state = {
        sparepartAdDetails: null,
        loading: true,
        images: [],
        user:null,
        csvReport: {
            data: [],
            headers: this.headers,
            filename: 'SparepartsMyAds.csv'
        }
    }

    componentDidMount = () => {
        this.props.getAllSparePartsAds().then((res) => {
            const userdetais = localStorage.getItem("user");
            const users = jwt.decode(userdetais);
            console.log("res",res)
            this.setState({
                ...this.state,
                user:users,
                sparepartAdDetails:res.filter(sparePart=> sparePart.userId ==users._id),
                csvReport: {
                    ...this.state.csvReport,
                    data:res.filter(spareParts=> spareParts.userId ==users._id)
                }
            })
            // this.setAdsForPage()
            console.log('this.state.vehicleAdDetails',this.state.vehicleAdDetails)
        }).catch((err) => {
            alert('Connection error pas!')
        })
    }

    render() {
        return (
            <div>
                 {this.state.sparepartAdDetails  ? (
                     <div>
                <CSVLink {...this.state.csvReport} className='export-btn' hidden={this.state.sparepartAdDetails.length < 1 }  >Export to CSV</CSVLink> 
           
            <div>  
            {this.state.sparepartAdDetails ? this.state.sparepartAdDetails.map(sparepartAdDetails=>{            
            return<div style={{ margin: '0 auto' }}>
                <Grid style={{ margin: '0 auto' }}>
                    <Grid.Column width={6}>
                        <ImageGallery items={sparepartAdDetails.images} style={{ padding: '10px' }} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h1>{sparepartAdDetails.title}&nbsp;</h1></Header><p style={{ marginTop: '10px' }}>Posted on {sparepartAdDetails.updatedAt.split('T')[0]}</p>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h2>Rs. {sparepartAdDetails.price}&nbsp;</h2></Header>{!sparepartAdDetails.Negotiable ? ' Negotiable' : null}
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Specifications</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Grid.Column width={3}>
                                <List verticalAlign='middle' divided>
                                    <List.Item>Condition: <b>{sparepartAdDetails.condition}</b></List.Item>
                                    <List.Item>Category: <b>{sparepartAdDetails.category}</b></List.Item>
                                    <List.Item>Delivery: <b>{sparepartAdDetails.delivery ? 'Available' : 'Not Applicable'}</b></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Description</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container textAlign='left'>
                                {sparepartAdDetails.description}
                            </Container>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                        <a href={'tel:'+ sparepartAdDetails.contactNumbers ?sparepartAdDetails.contactNumbers[0].split(')')[1]:(null)} ><Button icon labelPosition='left' color='blue'>
                            <Icon name='phone' />
                            CONTACT SELLER
                        </Button></a>
                         {/* add mail from user when available */}
                        <a href={'mailto:'+sparepartAdDetails.contactNumbers[0].split(')')[1]}><Button icon labelPosition='left' color='orange'>
                            <Icon name='mail' />
                            EMAIL
                        </Button></a>
                        <a href={'/sparePartsAd/update/'+sparepartAdDetails._id}><Button icon labelPosition='left' color='orange'>
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
                            <Header>Location: {sparepartAdDetails.location} </Header> <Icon name='map marker alternate' size="big" style={{marginTop: '-10px'}}  color="blue"/>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>status: {sparepartAdDetails.status} </Header> 
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
            </div>
             ):<h1>NO Ads TO Display</h1>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    // sparepart: state.sparepart.sparepartAd
})

export default connect(mapStateToProps, { getAllSparePartsAds })(sparepartAdDetails)