import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublishedSparepartsAds, getSparepartAdById } from '../redux/actions/sparepartsActions';
import { Card, Placeholder, Loader, Button, Pagination, Image, Icon } from 'semantic-ui-react';

class sparePartAdView extends Component {
    state = {
        sparepartsAds: [],
        pagination: {
            activePage: 1,
            cardsPerPage: 9,
            indexOfLastCard: 9,
            indexOfFirstCard: 0,
            boundaryRange: 1,
            siblingRange: 1,
            showEllipsis: false,
            showFirstAndLastNav: false,
            showPreviousAndNextNav: false,
            totalPages: 1,
            disabled: true
        },
        counter: 0
    }

    sortAdsArray = () => {
        this.setState({
            ...this.state,
            counter: this.state.counter + 1,
            sparepartsAds: this.state.sparepartsAds.sort((a, b) => a.title.localeCompare(b.title) == 0 ? -1 : a.title.localeCompare(b.title))
        }, () => {
            if (this.state.counter === this.state.sparepartsAds.length)
                this.setState({
                    ...this.state
                    , pagination: { ...this.state.pagination, disabled: false }
                })
        })
    }

    setAdsForPage = () => {

        this.setState({
            ...this.state,
            sparepartsAds: this.props.sparepartsAds.slice(this.state.pagination.indexOfFirstCard, this.state.pagination.indexOfLastCard)
        }, () => {
            this.setState({ ...this.state, pagination: { ...this.state.pagination, totalPages: this.props.sparepartsAds.length / this.state.pagination.cardsPerPage } }, () => {
                console.log(this.state.pagination.indexOfFirstCard, (this.state.sparepartsAds.length - this.state.pagination.indexOfFirstCard))
                for (let index = 0; index < this.state.pagination.indexOfLastCard - (9 * (this.state.pagination.activePage - 1)); index++) {
                    this.props.getSparepartAdById(this.state.sparepartsAds[index]._id).then((res) => {
                        this.setState({ ...this.state, sparepartsAds: [res, ...this.state.sparepartsAds.filter((item) => item._id != res._id)] }, this.sortAdsArray)
                    })
                }
            })
        });

    }

    componentDidMount = () => {
        this.props.getPublishedSparepartsAds().then((res) => {
            this.setState({
                ...this.state,
                pagination: {
                    ...this.state.pagination,
                    indexOfFirstCard: (this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
                    indexOfLastCard: (this.props.sparepartsAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.props.sparepartsAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) + 9 * (this.state.pagination.activePage - 1) : (this.state.pagination.activePage * this.state.pagination.cardsPerPage)
                }
            })
            this.setAdsForPage()
        }).catch((err) => {
            alert('Connection error!')
        })
    }

    handlePaginationChange = (e, { activePage }) => this.setState({
        ...this.state, sparepartsAds: [], counter: 0, pagination: {
            ...this.state.pagination, activePage, disabled: true, indexOfFirstCard: (activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
            indexOfLastCard: (this.props.sparepartsAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.props.sparepartsAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) + 9 * (activePage - 1) : (activePage * this.state.pagination.cardsPerPage)
        }
    }, () => {
        this.setAdsForPage(this.state);
    })

    navigateToDetails = (id) => {
        window.location.href = `/sparepartAdDetail/${id}`
    }


    render() {
        console.log(this.props.sparepartsAds)
        return (
            <div >
                <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
                    {this.state.sparepartsAds.length > 0 ? this.state.sparepartsAds.map((item) => {
                        return <Card>
                            {item.images ? item.images[0] ? <Image src={item.images[0]['data_url']} wrapped centered ui={false} /> : <h1>No Image</h1> : <Placeholder >
                                <Placeholder.Image square />
                            </Placeholder>}
                            <Card.Content>
                                <Card.Header>{item.title}</Card.Header>
                                {item.title ? <div><Card.Description>
                                    <h4 className="date">Rs. {item.price} {item.negotiable ? 'Negotiable' : null}</h4>
                                </Card.Description>
                                    <Card.Meta>{item.location}</Card.Meta></div>
                                    : null}
                            </Card.Content>
                            <Card.Content extra>
                                <Button primary icon='eye' label='view' onClick={this.navigateToDetails.bind(this,item._id)} >view</Button>
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
                        disabled={this.state.pagination.disabled}
                    />
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    sparepartsAds: state.sparepart.publishSparepartAdIds
})

export default connect(mapStateToProps, { getPublishedSparepartsAds, getSparepartAdById })(sparePartAdView);