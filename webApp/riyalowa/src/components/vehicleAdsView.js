import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublishedVehicleAds, getVehicleAdById } from '../redux/actions/vehicleAdActions';

class vehicleAdsView extends Component {

    state = {
        vehicleAds: []
    }

    componentDidMount = () => {

        this.props.getPublishedVehicleAds().then((res) => {
            console.log(res);
            console.log(this.props.vehicleAds);
            for (let index = 0; index < 2; index++) {
                this.props.getVehicleAdById(this.props.vehicleAds[index]._id).then((res) => {
                    this.setState({ vehicleAds: [...this.state.vehicleAds,res] }, () => {
                        console.log(this.state.vehicleAds)
                    })
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div style={{margin: '0 auto'}}>
                {this.state.vehicleAds.length > 0 ? this.state.vehicleAds.map((item) => {
                    return <div>
                    <h2>{item.title}</h2>
                    <img src={item.images[0]['data_url']} alt="" width="100" height="100" />
                    </div>
                }) : 'loading...'}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    vehicleAds: state.vehicle.publishedVehicleAdIds
})

export default connect(mapStateToProps, { getPublishedVehicleAds, getVehicleAdById })(vehicleAdsView);
