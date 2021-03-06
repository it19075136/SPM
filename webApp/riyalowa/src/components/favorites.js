import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublishedVehicleAds, getVehicleAdById } from '../redux/actions/vehicleAdActions';
import jwt from 'jsonwebtoken'
import { userUpdate } from '../redux/actions/userActions';
import { Card, Placeholder, Loader, Button, Pagination, Image, Icon } from 'semantic-ui-react';

class favorites extends Component {

    state = {
        vehicleAds: [],
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
        counter: 0,
        user: null
      
    }

    sortAdsArray = () => {
        this.setState({
            ...this.state,
            counter: this.state.counter + 1,
            vehicleAds: this.state.vehicleAds.sort((a, b) => a.title.localeCompare(b.title) == 0 ? -1 : a.title.localeCompare(b.title))
        }, () => {
            if (this.state.counter === this.state.vehicleAds.length)
                this.setState({
                    ...this.state
                    , pagination: { ...this.state.pagination, disabled: false }
                })
        })
    }

    setAdsForPage = () => {

        this.setState({
            ...this.state,
            vehicleAds: this.state.vehicleAds.slice(this.state.pagination.indexOfFirstCard, this.state.pagination.indexOfLastCard)
        }, () => {
            this.setState({ ...this.state, pagination: { ...this.state.pagination, totalPages: this.state.vehicleAds.length / this.state.pagination.cardsPerPage } }, () => {
                console.log(this.state.pagination.indexOfFirstCard, (this.state.vehicleAds.length - this.state.pagination.indexOfFirstCard))
                for (let index = 0; index < this.state.pagination.indexOfLastCard - (9 * (this.state.pagination.activePage - 1)); index++) {
                    this.props.getVehicleAdById(this.state.vehicleAds[index]._id).then((res) => {
                        this.setState({ ...this.state, vehicleAds: [res, ...this.state.vehicleAds.filter((item) => item._id != res._id)] }, this.sortAdsArray)
                    })
                }
            })
        });
    }
    removeFavorite = () => {
        console.log('componentDidUpdate', this.state)
        if (this.state.user) {
            this.props.userUpdate(this.state.user, this.state.user).then((res) => {
                console.log('in post');
                const { token } = res;
                if (token) {
                    console.log(token, "token")
                    const user = jwt.decode(token);
                    this.setState({
                        ...this.state,
                        vehicleAds: this.state.vehicleAds.filter((vehicle) => user.wishList.includes(vehicle._id)),
                        user: user
                    })
                   
                }
               

            }).catch((err) => {
            
            })
        }

    }

    componentDidMount = () => {
        this.props.getPublishedVehicleAds().then((res) => {
            const userdetais = localStorage.getItem("user");
            const users = jwt.decode(userdetais);

            console.log("users", users);
            console.log("vehicles", this.props.vehicleAds)

            this.setState({
                ...this.state,
                user: users,
                vehicleAds: this.props.vehicleAds.filter((vehicle) => users.wishList.includes(vehicle._id))
            }, () => {
                this.setState({
                    ...this.state,
                    pagination: {
                        ...this.state.pagination,
                        indexOfFirstCard: (this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
                        indexOfLastCard: (this.state.vehicleAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.state.vehicleAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) + 9 * (this.state.pagination.activePage - 1) : (this.state.pagination.activePage * this.state.pagination.cardsPerPage)
                    }
                }, () => {
                    console.log(this.state.vehicleAds)
                    this.setAdsForPage()
                })
            })
        }).catch((err) => {
            console.log('error test1', err)
        })
    }

    handlePaginationChange = (e, { activePage }) => this.setState({
        ...this.state, vehicleAds: [], counter: 0, pagination: {
            ...this.state.pagination, activePage, disabled: true, indexOfFirstCard: (activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
            indexOfLastCard: (this.state.vehicleAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.state.vehicleAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) + 9 * (activePage - 1) : (activePage * this.state.pagination.cardsPerPage)
        }
    }, () => {
        this.setAdsForPage(this.state);
    })

    navigateToDetails = (id) => {
        window.location.href = `/vehicleAdDetail/${id}`
    }

    render() {
        console.log("veh", this.state.vehicleAds)
        return (
            <div >
                {this.state.vehicleAds.length >0  ? (
                <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
                    {this.state.vehicleAds.length > 0 ? this.state.vehicleAds.map((item) => {
                        return <Card>
                            {item.images ? item.images[0] ? <Image src={item.images[0]['data_url']} wrapped centered ui={false} /> : <h1>No Image</h1> : <Placeholder >
                                <Placeholder.Image square />
                            </Placeholder>}
                            <Card.Content>
                                <Card.Content>
                                    <Card.Header>{item.title}
                                        <div hidden={this.state.user ? false : true} onClick={() => {

                                            console.log('in set wishlist', item._id)
                                            if (this.state.user.wishList.includes(item._id)) {
                                                this.setState({
                                                    ...this.state,
                                                    user: {
                                                        ...this.state.user,
                                                        wishList: this.state.user.wishList.filter(Wish => Wish != item._id)

                                                    }
                                                }, () => {
                                                    this.removeFavorite()
                                                })
                                                console.log('this.state.user.wishList in if', this.state.user.wishList)
                                            }
                                

                                        }} >
                                           
                                            <Icon name="heart" disabled={this.state.user ? !this.state.user.wishList.includes(item._id) : true}
                                                corner="bottom right"
                                                style={{ float: 'right' }}
                                                color={this.state.user ? (this.state.user.wishList.includes(item._id) ? "red" : "brown") : "brown"}
                                                size="big"
                                            />
                                        </div>
                                    </Card.Header>
                                    {item.title ? <div><Card.Description>
                                        <h4 className="date">Rs. {item.price} {item.negotiable ? 'Negotiable' : null}</h4>
                                    </Card.Description>
                                        <Card.Meta>{item.location}</Card.Meta></div>
                                        : null}
                                </Card.Content>
                                <Card.Content extra>
                                    <Button primary icon='eye' label='view' onClick={this.navigateToDetails.bind(this, item._id)} >view</Button>
                                </Card.Content>
                            </Card.Content>
                        </Card>

                    }):<h1>No Ads TO Display</h1>} 
                </Card.Group>
                ): <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} />}
               
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
    vehicleAds: state.vehicle.publishedVehicleAdIds
})

export default connect(mapStateToProps, { getPublishedVehicleAds, getVehicleAdById, userUpdate })(favorites);
