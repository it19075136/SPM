import React, { Component } from 'react';
import { updateVehicleAd, getPendingVehicleAds, getPublishedVehicleAds } from '../redux/actions/vehicleAdActions';
import { getAllSellers } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Icon, Table, Header, Loader } from 'semantic-ui-react';
import { CSVLink } from "react-csv";

class AdminVehicleAdsView extends Component {
    state = {
        payload: this.props.vehicleAds,
        success: false,
        error: false,
        loading: true,
        actionWaiting: false,
        approvedPayload: [],
        sellers: []
    }

    componentDidMount = () => {
        this.props.getPendingVehicleAds().then((data) => {
            console.log(data);
            this.setState({ ...this.state, payload: data, loading: false }, () => {
                console.log(this.state)
            })
        }).catch((err) => {
            console.log(err);
            this.setState({ ...this.state, loading: false }, () => {
                alert('Please check your network connection and refresh the page')
            });
        })

        this.props.getPublishedVehicleAds();
        this.props.getAllSellers().then((res) => {
            console.log(res)
        });
    }

    navigateToDetails = (id) => {
        window.location.href = `/vehicleAdDetail/${id}`
    }

    handleSelect = (e) => {
        if (e.target.id)
            this.setState({ ...this.state, approvedPayload: this.state.approvedPayload.find(item => item == e.target.id) ? this.state.approvedPayload.filter(item => item != e.target.id) : [...this.state.approvedPayload, e.target.id] });
    }

    bulkApprove = () => {
        this.state.approvedPayload.forEach(async (item, index) => {
            const res = await this.props.updateVehicleAd({ status: 'published' }, item);
            console.log(item, index, res)
        })
    }
 
    headers = [
      { label: "Ad title", key: "title" },
      { label: "Posted Date", key: "updatedAt" },
      { label: "Seller's Name", key: "userId" },
      { label: "Status", key: "status" }
    ];
          
    csvReport = {
      data: [...this.props.vehicleAds],
      headers: this.headers,
      filename: 'allVehicleAds.csv'
    };
     
    render() {
        console.log(this.csvReport);
        return (
            <div>
                <Header size='huge' textAlign="center">Vehicle Ads Management</Header>
                <br />
                <br />
                <CSVLink {...this.csvReport} className='export-btn'>Export to CSV</CSVLink>
                <Table compact celled definition color="blue" inverted>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell />
                            <Table.HeaderCell>Ad Title</Table.HeaderCell>
                            <Table.HeaderCell>Ad Posted Date</Table.HeaderCell>
                            <Table.HeaderCell>Ad Owner's Name</Table.HeaderCell>
                            <Table.HeaderCell>View Ad</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Loader indeterminate active={this.state.loading} />
                        {this.props.vehicleAds.length != 0 ? this.props.vehicleAds.filter(vehicleAd => vehicleAd.status != 'published').map(vehicleAd => {
                            return (
                                <Table.Row key={vehicleAd._id}>
                                    <Table.Cell collapsing selectable={false}>
                                        <Checkbox slider onChange={this.handleSelect} id={vehicleAd._id} checked={this.state.approvedPayload.find(item => item == vehicleAd._id) ? true : false} />
                                    </Table.Cell>
                                    <Table.Cell>{vehicleAd.title}</Table.Cell>
                                    <Table.Cell textAlign="center">{vehicleAd.updatedAt.split('T')[0]}</Table.Cell>
                                    <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon onClick={this.navigateToDetails.bind(this, vehicleAd._id)}>
                                            <Icon name='info' color="blue" circular />
                                        </Button>
                                        <Button disabled size='small'>Approve</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }) : !this.state.loading ? <Table.Row style={{ textAlign: 'right', color: 'black', fontSize: '24px' }}>No Ads pending approval</Table.Row> : null}

                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Button disabled={this.state.approvedPayload.length < 1} size='small' onClick={this.bulkApprove}>
                                    Approve Selected Ads
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    vehicleAds: state.vehicle.vehicleAds,
    publishVehicleAds: state.vehicle.publishedVehicleAdIds
});

export default connect(mapStateToProps, { updateVehicleAd, getPendingVehicleAds, getPublishedVehicleAds, getAllSellers })(AdminVehicleAdsView)

