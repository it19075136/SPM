import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublishedVehicleAds, getVehicleAdById } from '../redux/actions/vehicleAdActions';
import jwt from 'jsonwebtoken'
import { Card, Placeholder, Loader, Button, Pagination, Image ,Icon} from 'semantic-ui-react';

class vehicleAdsView extends Component {

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
        user:{
            _id:"",
            name:"",
            email:"",
            type:"",
            phoneNumber:"",
            image:[],
            wishList:[],
            password:"",
        }
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
            vehicleAds: this.props.vehicleAds.slice(this.state.pagination.indexOfFirstCard, this.state.pagination.indexOfLastCard)
        }, () => {
            this.setState({ ...this.state, pagination: { ...this.state.pagination, totalPages: this.props.vehicleAds.length / this.state.pagination.cardsPerPage } }, () => {
                console.log(this.state.pagination.indexOfFirstCard, (this.state.vehicleAds.length - this.state.pagination.indexOfFirstCard))
                for (let index = 0; index < this.state.pagination.indexOfLastCard - (9 * (this.state.pagination.activePage - 1)); index++) {
                    this.props.getVehicleAdById(this.state.vehicleAds[index]._id).then((res) => {
                        this.setState({ ...this.state, vehicleAds: [res, ...this.state.vehicleAds.filter((item) => item._id != res._id)] }, this.sortAdsArray)
                    })
                }
            })
        });
    }

    componentDidMount = () => {
        // const userdetais = localStorage.getItem("user");
        // const users = jwt.decode(userdetais);
        // this.setState({
        //     ...this.state,
        //     pagination: {...this.state.pagination,
        //         indexOfFirstCard: this.state.pagination.indexOfLastCard - this.state.pagination.cardsPerPage,
        //         indexOfLastCard: this.state.pagination.activePage * this.state.pagination.cardsPerPage,
        //     },
        //     user:{
        //         _id:users._id,
        //         name:users.name,
        //         email:users.email,
        //         type:users.type,
        //         phoneNumber:users.phoneNumber,
        //         image:users.image,
        //         wishList:users.wishList,
        //         password:users.password
        //     }
        // })
        // this.setAdsForPage()
        // console.log('in componentDidMount')

        this.props.getPublishedVehicleAds().then((res) => {
            const userdetais = localStorage.getItem("user");
        const users = jwt.decode(userdetais);
            this.setState({
                ...this.state,
                pagination: {
                    ...this.state.pagination,
                    indexOfFirstCard: (this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
                    indexOfLastCard: (this.props.vehicleAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.props.vehicleAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) + 9 * (this.state.pagination.activePage - 1) : (this.state.pagination.activePage * this.state.pagination.cardsPerPage)
                },
                user:{
                    _id:users._id,
                    name:users.name,
                    email:users.email,
                    type:users.type,
                    phoneNumber:users.phoneNumber,
                    image:users.image,
                    wishList:users.wishList,
                    password:users.password
                }
            }, () => this.setAdsForPage()
            )
        }).catch((err) => {
            alert('Connection error!')
        })
    }

    handlePaginationChange = (e, { activePage }) => this.setState({
        ...this.state, vehicleAds: [], counter: 0, pagination: {
            ...this.state.pagination, activePage, disabled: true, indexOfFirstCard: (activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
            indexOfLastCard: (this.props.vehicleAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.props.vehicleAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) + 9 * (activePage - 1) : (activePage * this.state.pagination.cardsPerPage)
        }
    }, () => {
        this.setAdsForPage(this.state);
    })

    navigateToDetails = (id) => {
        window.location.href = `/vehicleAdDetail/${id}`
    }

    render() {
        // const setwishList=(id)=>{
        //     console.log('in set wishlist',id)
        //     if( this.state.user.wishList.includes(id)){

        //     }    
        // }
        return (
            <div >
                <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
                    {this.state.vehicleAds.length > 0 ? this.state.vehicleAds.map((item) => {
                        return <Card>
                            <Icon name="heart" disabled={this.state.user.wishList ? !this.state.user.wishList.includes(item._id):true }
                            corner="top right"
                                // user.wishList.map(list=>{ return list==item._id})
                                color={this.state.user.wishList.includes(item._id) ? "red" : null}
                                size="big" 
                                link={onclick=()=>{
                                    console.log('in set wishlist',item._id)
                                    if( this.state.user.wishList.includes(item._id)){
                                        this.setState({
                                            ...this.state,
                                            user:{
                                                ...this.state.user,
                                                wishList:this.state.user.wishList.filter(Wish=> Wish!=item._id )
                                               
                                            }
                                        })
                                        console.log('this.state.user.wishList in if',this.state.user.wishList)
                                    }
                                    else{
                                        this.setState({
                                            ...this.state,
                                            user:{
                                                ...this.state.user,
                                                wishList:[...this.state.user.wishList,item._id]
                                               
                                            }
                                        })
                                        console.log('this.state.user.wishList',this.state.user.wishList)
                                        localStorage.setItem('user', this.state.user);
                                    }
                                }} 
                                // link={}
                                />
                            <Card.Content className='ad-cards'>
                                <h4>{item.title}</h4>
                                {/* {item.images ? <img src={item.images[0]['data_url']} alt="" width="100" height="100" /> : <Placeholder style={{ width: '100px', height: '100px' }} >
                                    <Placeholder.Image square />
                                </Placeholder>}
                                {item.title ? <div>
                                    <h4>{item.location}</h4>
                                    <h4>Rs. {item.price}</h4> {item.negotiable ? 'Negotiable' : null}
                                </div> : null}
                                <Button primary icon='eye' label='view' onClick={() => console.log(item._id)} >view</Button> */}
                            {item.images ? <Image src={item.images[0]['data_url']} wrapped centered ui={false} /> : <Placeholder >
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
    vehicleAds: state.vehicle.publishedVehicleAdIds
})

export default connect(mapStateToProps, { getPublishedVehicleAds, getVehicleAdById })(vehicleAdsView);
