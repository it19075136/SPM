import React, { Component } from 'react';
import { updateSparepartsAd, deleteSparepartsAd, getPendingSparepartsAds } from '../redux/actions/sparepartsActions';
import { getAllSellers } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Icon, Table, Header, Loader } from 'semantic-ui-react';
import { CSVLink } from "react-csv";


class AdminSparepartsAdView extends Component {
    
    headers = [
        { label: "Ad title", key: "title" },
        { label: "Posted Date", key: "updatedAt" },
        { label: "Seller's Name", key: "userId" },
        { label: "Status", key: "status" }
    ];

    state = {
        payload: this.props.sparepartsAd,
        success: false,
        error: false,
        loading: true,
        actionWaiting: false,
        approvedPayload: [],
        csvReport: {
            data: [],
            headers: this.headers,
            filename: 'pendingSparePartAds.csv'
        }
    }

    componentDidMount = () => {
        this.props.getPendingSparepartsAds().then((data) => {
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
        window.location.href = `/sparepartAdDetail/${id}`
    }

    handleApprove = (id) => {
        console.log(id)
        this.setState({ ...this.state, actionWaiting: true }, () => {
            this.props.updateSparepartsAd({status: "published"}, id).then((res) => {
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

    
    handleSelect = (e) => {
        if(e.target.id)
        this.setState({...this.state,approvedPayload: this.state.approvedPayload.find(item => item == e.target.id) ? this.state.approvedPayload.filter(item =>  item != e.target.id):[...this.state.approvedPayload,e.target.id]});
    }

    bulkApprove = () => {
        this.state.approvedPayload.forEach(async (item,index) => {
            const res = await this.props.updateSparepartsAd({status: 'published'},item);
            console.log(item,index,res)
        })

    }

    render() {

        
        // const notify = () => this.state.success ? toast.success('✔ Ad successfully approved and published!', {
        //     position: "bottom-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // }) : this.state.error ? toast.error('❌ Action was unsuccessful, please check and try again!', {
        //     position: "bottom-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // }) : null
    

        return (
            <div>
                <Header size='huge' textAlign="center">Spare Part Ads Management</Header>
                <br />
                <br />
                <CSVLink {...this.state.csvReport} className='export-btn' hidden={this.props.sparepartsAd.length < 1}>Export to CSV</CSVLink>
                {this.props.sparepartsAd.length != 0 ? <Table compact celled definition color="blue" inverted>
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
                        {!this.state.loading && this.props.sparepartsAd.length != 0 ? this.props.sparepartsAd.filter(sparePart => sparePart.status != 'published').map(sparepart => {
                            return (
                                <Table.Row key={sparepart._id}>
                                    <Table.Cell collapsing selectable={false}>
                                        <Checkbox slider onChange={this.handleSelect} id={sparepart._id} checked={this.state.approvedPayload.find(item => item == sparepart._id) ? true:false} />
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">{sparepart.title}</Table.Cell>
                                    <Table.Cell textAlign="center">{sparepart.updatedAt.split('T')[0]}</Table.Cell>
                                    <Table.Cell textAlign="center">{sparepart.userId}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon onClick={this.navigateToDetails.bind(this, sparepart._id)}>
                                            <Icon name='info' color="blue" circular  size='tiny' inverted/>
                                        </Button>
                                        <Button color="white" type="button" size='small' onClick={this.handleApprove.bind(this, sparepart._id)}>Approve</Button>
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
    sparepartsAd: state.sparepart.sparepartsAds
});

export default connect(mapStateToProps, { updateSparepartsAd, deleteSparepartsAd, getPendingSparepartsAds, getAllSellers })(AdminSparepartsAdView)

