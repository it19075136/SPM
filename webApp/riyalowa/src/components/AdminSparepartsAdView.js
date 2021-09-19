import React, { Component } from 'react';
import { updateSparepartsAd, deleteSparepartsAd, getAllSparePartsAds } from '../redux/actions/sparepartsActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Icon, Table, Header } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';


class AdminSparepartsAdView extends Component {
    state = {
        payload: this.props.sparepartsAd,
        success: false,
        error: false,
        loading: true,
        actionWaiting: false
    }

    componentDidMount = () => {
        this.props.getAllSparePartsAds().then((data) => {
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
                <Header size='huge' textAlign="center">Admin Spare Parts Action Table</Header>
                <br />
                <br />
                <Table compact celled definition color="blue" inverted>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell />
                            <Table.HeaderCell>Ad Titile</Table.HeaderCell>
                            <Table.HeaderCell>Ad Post Date</Table.HeaderCell>
                            <Table.HeaderCell>Ad Owner's Name</Table.HeaderCell>
                            <Table.HeaderCell>View Ad</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {this.props.sparepartsAd.length != 0 ? this.props.sparepartsAd.filter(spare => spare.status == "pending").map(sparepart => {
                            return (
                                <Table.Row key={sparepart._id}>
                                    <Table.Cell collapsing>
                                        <Checkbox slider />
                                    </Table.Cell>
                                    <Table.Cell>{sparepart.title}</Table.Cell>
                                    <Table.Cell textAlign="center">{sparepart.updatedAt.split('T')[0]}</Table.Cell>
                                    <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button icon onClick={this.navigateToDetails.bind(this, sparepart._id)}>
                                            <Icon name='info'  color="blue" circular inverted/>
                                        </Button>
                                        <Button color="blue" type="button" size='small' onClick={this.handleApprove.bind(this, sparepart._id)}>Approve</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }) : (null)}

                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Button size='small'>
                                    Approve All
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
    sparepartsAd: state.sparepart.sparepartsAds
});

export default connect(mapStateToProps, { updateSparepartsAd, deleteSparepartsAd, getAllSparePartsAds })(AdminSparepartsAdView)

