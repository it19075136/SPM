import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublishedVehicleAds, getVehicleAdById } from '../redux/actions/vehicleAdActions';
import { Card, Placeholder, Loader, Button, Form, Grid, Segment, Pagination } from 'semantic-ui-react';

class vehicleAdsView extends Component {

    state = {
        vehicleAds: [],
        vehicleAdsForPage: [],
        pagination: {
            activePage: 1,
            boundaryRange: 1,
            siblingRange: 1,
            showEllipsis: false,
            showFirstAndLastNav: false,
            showPreviousAndNextNav: false,
            totalPages: 1,
        }
    }

    sortAdsArray = () => {
        console.log(this.state)
        this.setState({
            ...this.state,
            vehicleAdsForPage: this.state.vehicleAdsForPage.sort((a, b) => a.title.localeCompare(b.title) == 0 ? -1 : a.title.localeCompare(b.title)),
        })
    }

    setAdsForPage = () => {

        this.props.getPublishedVehicleAds().then((res) => {
            this.setState({
                ...this.state,
                vehicleAds: res
            }, () => {
                this.setState({ ...this.state, pagination: { ...this.state.pagination, totalPages: this.state.vehicleAds.length / 9 } }, () => {
                    for (let index = (this.state.pagination.activePage - 1) * 9; index < (this.state.vehicleAds.length - (this.state.pagination.activePage - 1) * 9 >= 9 * this.state.pagination.activePage ? 9 * this.state.pagination.activePage : this.state.vehicleAds.length); index++) {
                        this.props.getVehicleAdById(this.props.vehicleAds[index]._id).then((res) => {
                            this.setState({ ...this.state, vehicleAdsForPage: [res, ...this.state.vehicleAdsForPage] }, this.sortAdsArray)
                        })
                    }
                })
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount = () => {
        this.setAdsForPage()
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ ...this.state, pagination: { ...this.state.pagination, activePage } }, () => {
        this.setState({ ...this.state, vehicleAdsForPage: [] })
        this.setAdsForPage()
    })

    render() {
        return (
            <div >
                <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
                    {this.state.vehicleAdsForPage.length > 0 ? this.state.vehicleAdsForPage.map((item) => {
                        return <Card>
                            <Card.Content className='ad-cards'>
                                <h4>{item.title}</h4>
                                {item.images ? <img src={item.images[0]['data_url']} alt="" width="100" height="100" /> : <Placeholder style={{ width: '100px', height: '100px' }} >
                                    <Placeholder.Image square />
                                </Placeholder>}
                                {item.title ? <div>
                                    <h4>{item.location}</h4>
                                    <h4>Rs. {item.price}</h4> {item.negotiable ? 'Negotiable' : null}
                                </div> : null}
                                <Button primary icon='eye' label='view' onClick={() => console.log(item._id)} >view</Button>
                            </Card.Content>
                        </Card>
                    }) : <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} />}
                </Card.Group>
                <div className='pagination'>
                    <Pagination
                        activePage={this.state.pagination.activePage}
                        boundaryRange={this.state.pagination.boundaryRange}
                        onPageChange={this.handlePaginationChange}
                        size='mini'
                        siblingRange={this.state.pagination.siblingRange}
                        totalPages={this.state.pagination.totalPages}
                        ellipsisItem={this.state.pagination.showEllipsis ? undefined : null}
                        firstItem={this.state.pagination.showFirstAndLastNav ? undefined : null}
                        lastItem={this.state.pagination.showFirstAndLastNav ? undefined : null}
                        prevItem={this.state.pagination.showPreviousAndNextNav ? undefined : null}
                        nextItem={this.state.pagination.showPreviousAndNextNav ? undefined : null}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    vehicleAds: state.vehicle.publishedVehicleAdIds
})

export default connect(mapStateToProps, { getPublishedVehicleAds, getVehicleAdById })(vehicleAdsView);
