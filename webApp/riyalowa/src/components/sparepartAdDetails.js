import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getSparepartAdById } from '../redux/actions/sparepartsActions'
import ImageGallery from 'react-image-gallery';
import axios from 'axios';

class sparepartAdDetails extends Component {

    state = {
        sparepartAdDetails: null,
        sellerMail: null,
        loading: true,
        images: []
    }

    componentDidMount = () => {
        this.props.getSparepartAdById(window.location.pathname.replace('/sparepartAdDetail/', '')).then((data) => {
            this.setState({ ...this.state, loading: false, sparepartAdDetails: data }, () => {
                let images = []
                for (let index = 0; index < data.images.length; index++) {
                    images.push({ original: data.images[index]['data_url'], thumbnail: data.images[index]['data_url'], originalHeight: 300, originalWidth: 200 })
                }
                this.setState({...this.state, images: images})
                axios.get(`http://localhost:5000/user/${this.state.sparepartAdDetails.userId}`).then((res) => {
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
                                    <List.Item>Condition: <b>{this.state.sparepartAdDetails.condition}</b></List.Item>
                                    <List.Item>Category: <b>{this.state.sparepartAdDetails.category}</b></List.Item>
                                    <List.Item>Delivery: <b>{this.state.sparepartAdDetails.delivery ? 'Available' : 'Not Applicable'}</b></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h1>{this.state.sparepartAdDetails.title}&nbsp;</h1></Header><p style={{ marginTop: '10px' }}>Posted on {this.state.sparepartAdDetails.updatedAt.split('T')[0]}</p>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h2>Rs. {this.state.sparepartAdDetails.price}&nbsp;</h2></Header>{!this.state.sparepartAdDetails.Negotiable ? ' Negotiable' : null}
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Description</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container  style={{ padding: '10px'}}>
                                {this.state.sparepartAdDetails.description}
                            </Container>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Seller: abc</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Location: {this.state.sparepartAdDetails.location} </Header> <Icon name='map marker alternate' size="big" style={{marginTop: '-10px'}}  color="blue"/>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                        {this.state.sparepartAdDetails.contactNumbers.length > 0 ? 
                        <a href={this.state.sparepartAdDetails.contactNumbers.find(elem => elem != '').includes(')') ? 'tel:'+ this.state.sparepartAdDetails.contactNumbers.find(elem => elem != '').split(')')[1]:'tel:'+ this.state.sparepartAdDetails.contactNumbers.find(elem => elem != '')} ><Button icon labelPosition='left' color='blue'>
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
    sparepart: state.sparepart.sparepartAd
})

export default connect(mapStateToProps, { getSparepartAdById })(sparepartAdDetails)