import React, { Component } from 'react';
import {connect} from 'react-redux';
import {} from '../redux/actions/sparepartsActions';
import {} from 'semantic-ui-react';

class sparePartAdView extends Component {
    state = {
        sparepartsAds: [],
        pagination: {
            activePage: 1,
            boundaryRange: 1,
            sibilingRange: 1,
            showEllipsis: false,
            showFirstAndLastNav: false,
            showPreviousAndNextNav: false,
            totalPage: 1
        }
    }

    finalizeImagePerPage = () => {
        this.setState({
            ...this.state,
            vehicleAds: this.state.sparepartsAds.splice((this.state.pagination.activePage - 1))
        })
    }

    
}

const mapStateToProps = (state) => {
    sparepartsAds: state.sparepart
}