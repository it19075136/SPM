import React, { Component } from 'react';
import { updateVehicleAd, getPendingVehicleAds } from '../redux/actions/vehicleAdActions';
import { getAllSellers } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Icon, Table, Header, Loader } from 'semantic-ui-react';
import { CSVLink } from "react-csv";

class AdminVehicleAdsView extends Component {

    headers = [
        { label: "Ad title", key: "title" },
        { label: "Posted Date", key: "updatedAt" },
        { label: "Seller's Name", key: "userId" },
        { label: "Status", key: "status" }
    ];

    state = {
        payload: this.props.vehicleAds,
        success: false,
        error: false,
        loading: true,
        actionWaiting: false,
        approvedPayload: [],
        sellers: [],
        csvReport: {
            data: [],
            headers: this.headers,
            filename: 'allVehicleAds.csv'
        }
    }

    componentDidMount = () => {
        this.props.getPendingVehicleAds().then((data) => {
            this.setState({ ...this.state, payload: data }, () => {
                this.props.getAllSellers().then((res) => {
                    for (let index = 0; index < res.length; index++) {
                        if (this.state.payload.find(elem => elem.userId == res[index]._id))
                            this.setState({ ...this.state, payload: [...this.state.payload.filter(item => item.userId != res[index]._id), { ...this.state.payload.find(elem => elem.userId == res[index]._id), userId: res[index].name }]});
                    }
                    this.setState({ ...this.state, csvReport: {...this.csvReport,data: [...this.state.payload]}, loading: false })
                });
            })
        }).catch((err) => {
            console.log(err);
            this.setState({ ...this.state, loading: false }, () => {
                alert('Please check your network connection and refresh the page')
            });
        })

    }

    navigateToDetails = (id) => {
        window.location.href = `/vehicleAdDetail/${id}`
    }

    handleSelect = (e) => {
        if (e.target.id)
            this.setState({ ...this.state, approvedPayload: this.state.approvedPayload.find(item => item == e.target.id) ? this.state.approvedPayload.filter(item => item != e.target.id) : [...this.state.approvedPayload, e.target.id] });
    }

    
    handleApprove = (id) => {
        console.log(id)
        this.setState({ ...this.state, actionWaiting: true }, () => {
            this.props.updateVehicleAd({status: "published"}, id).then((res) => {
                console.log(res);
                this.setState({ ...this.state, success: true }, () => {
                    // notify();
                    this.setState({ ...this.state, success: false, actionWaiting: false })

                })
            }).catch((err) => {
                console.log(err);
                this.setState({ ...this.state, error: true }, () => {
                    // notify();
                    this.setState({ ...this.state, error: false, actionWaiting: false })
                    window.location.reload(false);

                })

            })
        })
    }

    bulkApprove = () => {
        this.state.approvedPayload.forEach(async (item, index) => {
            const res = await this.props.updateVehicleAd({ status: 'published' }, item);
        })
    }

    render() {
        return (
            <div>
                <Header size='huge' textAlign="center">Vehicle Ads Management</Header>
                <br />
                <br />
                <CSVLink {...this.state.csvReport} className='export-btn' hidden={this.props.vehicleAds.length < 1}>Export to CSV</CSVLink> 
                {this.props.vehicleAds.length != 0 ? <Table compact celled definition color="blue" inverted>
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
                        {!this.state.loading && this.props.vehicleAds.length != 0 ? this.state.payload.filter(vehicleAd => vehicleAd.status != 'published').map(vehicleAd => {
                            return (
                                <Table.Row key={vehicleAd._id}>
                                    <Table.Cell collapsing selectable={false}>
                                        <Checkbox slider onChange={this.handleSelect} id={vehicleAd._id} checked={this.state.approvedPayload.find(item => item == vehicleAd._id) ? true : false} />
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">{vehicleAd.title}</Table.Cell>
                                    <Table.Cell textAlign="center">{vehicleAd.updatedAt.split('T')[0]}</Table.Cell>
                                    <Table.Cell textAlign="center">{vehicleAd.userId}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon onClick={this.navigateToDetails.bind(this, vehicleAd._id)}>
                                            <Icon name='info' color="blue" circular  size='tiny' inverted/>
                                        </Button>
                                        <Button color="white" type="button" size='small' onClick={this.handleApprove.bind(this, vehicleAd._id)}>Approve</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }) : <Loader indeterminate active={this.state.loading} />}

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
                </Table> : <Header style={{ textAlign: 'center',fontWeight: 'bold', fontSize: '24px' }}> - No Ads pending approval -</Header> }
            </div>
        )
    }

}

const mapStateToProps = state => ({
    vehicleAds: state.vehicle.vehicleAds
});

export default connect(mapStateToProps, { updateVehicleAd, getPendingVehicleAds, getAllSellers })(AdminVehicleAdsView)

