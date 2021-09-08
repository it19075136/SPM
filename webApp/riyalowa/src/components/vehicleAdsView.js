import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublishedVehicleAds, getVehicleAdById } from '../redux/actions/vehicleAdActions';
import { Card, Placeholder, Loader } from 'semantic-ui-react';

class vehicleAdsView extends Component {

    state = {
        vehicleAds: []
    }

    componentDidMount = () => {

        this.props.getPublishedVehicleAds().then((res) => {
            this.setState({
                ...this.state,
                vehicleAds: res
            }, () => {
                // set max per page
                for (let index = 0; index < this.state.vehicleAds.length; index++) {
                    this.props.getVehicleAdById(this.props.vehicleAds[index]._id).then((res) => {
                        this.setState({ vehicleAds: [...this.state.vehicleAds.filter((item) => item._id != res._id), res] }, () => {
                            console.log(this.state.vehicleAds)
                        })
                    })
                }
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div >
                <Card.Group itemsPerRow={3} stackable>
                    {this.state.vehicleAds.length > 0 ? this.state.vehicleAds.map((item) => {
                        return <Card>
                            <Card.Content>
                                <h4>{item.title}</h4>
                                {item.images ? <img src={item.images[0]['data_url']} alt="" width="100" height="100" /> : <Placeholder style={{ width: '100px', height: '100px' }} >
                                    <Placeholder.Image square />
                                </Placeholder>}
                                {item.title ? <div>
                                    <h4>{item.location}</h4>
                                    <h4>Rs. {item.price}</h4> {item.negotiable ? 'Negotiable' : null}
                                </div> : null}
                            </Card.Content>
                        </Card>
                    }) : <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} />}
                </Card.Group>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    vehicleAds: state.vehicle.publishedVehicleAdIds
})

export default connect(mapStateToProps, { getPublishedVehicleAds, getVehicleAdById })(vehicleAdsView);
