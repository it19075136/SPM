import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getSparepartAdById } from '../redux/actions/sparepartsActions'
import ImageGallery from 'react-image-gallery';

class sparepartAdDetails extends Component {

    state = {
        sparepartAdDetails: null,
        loading: true,
        images: []
    }

    componentDidMount = () => {
        this.props.getSparepartAdById(window.location.pathname.replace('/sparepartAdDetail/', '')).then((data) => {
            this.setState({ ...this.state, loading: false, sparepartAdDetails: data }, () => {
                console.log(this.state)
                for (let index = 0; index < data.images.length; index++) {
                    this.setState({ ...this.state, images: [...this.state.images, { original: data.images[index]['data_url'], thumbnail: data.images[index]['data_url'] }] })
                }
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
                    <Grid.Column width={6}>
                        <ImageGallery items={this.state.images} style={{ padding: '10px' }} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h1>{this.state.sparepartAdDetails.title}&nbsp;</h1></Header><p style={{ marginTop: '10px' }}>Posted on {this.state.sparepartAdDetails.updatedAt.split('T')[0]}</p>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h2>Rs. {this.state.sparepartAdDetails.price}&nbsp;</h2></Header>{!this.state.sparepartAdDetails.Negotiable ? ' Negotiable' : null}
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Specifications</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Grid.Column width={3}>
                                <List verticalAlign='middle' divided>
                                    <List.Item>Condition: <b>{this.state.sparepartAdDetails.condition}</b></List.Item>
                                    <List.Item>Category: <b>{this.state.sparepartAdDetails.category}</b></List.Item>
                                    <List.Item>Delivery: <b>{this.state.sparepartAdDetails.delivery ? 'Available' : 'Not Applicable'}</b></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Description</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container textAlign='left'>
                                {this.state.sparepartAdDetails.description}
                            </Container>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                        <a href={'tel:'+ this.state.sparepartAdDetails.contactNumbers ? this.state.sparepartAdDetails.contactNumbers[0].split(')')[1]:(null)} ><Button icon labelPosition='left' color='blue'>
                            <Icon name='phone' />
                            CONTACT SELLER
                        </Button></a>
                         {/* add mail from user when available */}
                        <a href={'mailto:'+this.state.sparepartAdDetails.contactNumbers[0].split(')')[1]}><Button icon labelPosition='left' color='orange'>
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
                            <Header>Location: {this.state.sparepartAdDetails.location} </Header> <Icon name='map marker alternate' size="big" style={{marginTop: '-10px'}}  color="blue"/>
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