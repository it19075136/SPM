import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader, Dimmer, Card, Placeholder } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getAllSparePartsAds } from '../redux/actions/sparepartsActions'
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
        sparepartAdDetails: [],
        loading: true,
        images: [],
        user: null,
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
            console.log("res", res)
            this.setState({
                ...this.state,
                user: users,
                sparepartAdDetails: res.filter(sparePart => sparePart.userId == users._id),
                csvReport: {
                    ...this.state.csvReport,
                    data: res.filter(spareParts => spareParts.userId == users._id)
                }
            })
            console.log('this.state.vehicleAdDetails', this.state.vehicleAdDetails)
        }).catch((err) => {
            alert('Connection error pas!')
        })
    }

    navigateToDetails = (id) => {
        window.location.href = `/sparepartAdDetail/${id}`
    }

    navigateToEdit = (id) => {
        window.location.href = `/sparePartsAd/update/${id}`
    }

    render() {
        return (
            <div>
                {this.state.sparepartAdDetails.length >0 ? (
                    
                
                <div>
                    <CSVLink {...this.state.csvReport} className='export-btn' hidden={this.state.sparepartAdDetails.length < 1}  >Export to CSV</CSVLink>
                    <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
                        {this.state.sparepartAdDetails ? this.state.sparepartAdDetails.map((item) => {
                            return <Card>
                                {item.images ? item.images[0] ? <Image src={item.images[0]['data_url']} wrapped centered ui={false} /> : <h1>No Image</h1> : <Placeholder >
                                    <Placeholder.Image square />
                                </Placeholder>}
                                <Card.Content>
                                    <Card.Content>
                                        <Card.Header>
                                            {item.title} 
                                        </Card.Header>
                                        {item.title ? <div><Card.Description>
                                            <h4 className="date">Rs. {item.price} {item.negotiable ? 'Negotiable' : null}</h4>
                                        </Card.Description>
                                            <Card.Meta>{item.location}</Card.Meta>
                                            <Card.Meta>{item.status}</Card.Meta></div>
                                            : null}
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button primary icon='eye' label='view' onClick={this.navigateToDetails.bind(this, item._id)} >view</Button>
                                        <Button primary icon='pencil' label='Edit' onClick={this.navigateToEdit.bind(this, item._id)} >Edit</Button>
                                    </Card.Content>
                                </Card.Content>
                            </Card>

                        })  :<h1>No Ads TO Display</h1>} 
                                            </Card.Group>
                </div>
                     ): <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} />}

                    
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    sparepart: state.sparepart.sparepartAd
})

export default connect(mapStateToProps, { getAllSparePartsAds })(sparepartAdDetails)