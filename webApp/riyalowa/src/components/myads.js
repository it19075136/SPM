// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { Label, Menu, Tab } from 'semantic-ui-react'
// import { getPublishedVehicleAds, getVehicleAdById } from '../redux/actions/vehicleAdActions';
// import { Card, Placeholder, Loader, Button, Pagination, Icon } from 'semantic-ui-react';
// import jwt from 'jsonwebtoken'
// class myads extends Component {
//     state = {
//         vehicleAds: [],
//         pagination: {
//             activePage: 1,
//             cardsPerPage: 9,
//             indexOfLastCard: 9,
//             indexOfFirstCard: 0,
//             boundaryRange: 1,
//             siblingRange: 1,
//             showEllipsis: false,
//             showFirstAndLastNav: false,
//             showPreviousAndNextNav: false,
//             totalPages: 1,
//             disabled: true
//         },
//         counter: 0,
//         user:{
//             _id:"",
//             name:"",
//             email:"",
//             type:"",
//             phoneNumber:"",
//             image:[],
//             wishList:[],
//             password:"",
//         }
//     }
  
//     sortAdsArray = () => {
//         this.setState({
//             ...this.state,
//             counter: this.state.counter+1,
//             vehicleAds: this.state.vehicleAds.sort((a, b) => a.title.localeCompare(b.title) == 0 ? -1 : a.title.localeCompare(b.title))
//         },() => {
//         if(this.state.counter === this.state.vehicleAds.length)
//         this.setState({
//             ...this.state
//             ,pagination: {...this.state.pagination,disabled: false}
//         })
//     })
//     }

//     setAdsForPage = () => {

//         this.props.getPublishedVehicleAds().then((res) => {
//             this.setState({
//                 ...this.state,
//                 vehicleAds: res.slice(this.state.pagination.indexOfFirstCard,this.state.pagination.indexOfLastCard)
//             }, () => {
//                 this.setState({ ...this.state, pagination: { ...this.state.pagination, totalPages: this.props.vehicleAds.length / this.state.pagination.cardsPerPage } }, () => {
//                     console.log(this.state.pagination.indexOfFirstCard,(this.state.vehicleAds.length - this.state.pagination.indexOfFirstCard))
//                     for (let index = 0; index < this.state.pagination.indexOfLastCard - (9*(this.state.pagination.activePage-1)); index++) {
//                         this.props.getVehicleAdById(this.state.vehicleAds[index]._id).then((res) => {
//                             this.setState({ ...this.state, vehicleAds: [res, ...this.state.vehicleAds.filter((item) => item._id != res._id)] },this.sortAdsArray)
//                         })
//                     }
//                 })
//             })
//         }).catch((err) => {
//             console.log(err);
//         })
//     }

//     componentDidMount = () => {
//         const userdetais = localStorage.getItem("user");
//         const users = jwt.decode(userdetais);
//         this.setState({
//             ...this.state,
//             pagination: {...this.state.pagination,
//                 indexOfFirstCard: this.state.pagination.indexOfLastCard - this.state.pagination.cardsPerPage,
//                 indexOfLastCard: this.state.pagination.activePage * this.state.pagination.cardsPerPage,
//             },
//             user:{
//                 _id:users._id,
//                 name:users.name,
//                 email:users.email,
//                 type:users.type,
//                 phoneNumber:users.phoneNumber,
//                 image:users.image,
//                 wishList:users.wishList,
//                 password:users.password
//             }
//         })
//         this.setAdsForPage()
//         console.log('in componentDidMount')
//     }

//     handlePaginationChange = (e, { activePage }) => this.setState({ ...this.state,vehicleAds:[],counter:0,pagination: { ...this.state.pagination, activePage, disabled: true, indexOfFirstCard: (activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
//         indexOfLastCard: (this.props.vehicleAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.props.vehicleAds.length - ((activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage))+9*(activePage-1):(activePage * this.state.pagination.cardsPerPage)}}, () => {
//             this.setAdsForPage(this.state);
//     })
    

//     render() {
//         const panes = [
//             {
//               menuItem: { key: 'users', icon: 'users', content: 'Users' },
//               render: () => 
//               <Tab.Pane><div >
//                   <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
//                       {this.state.vehicleAds.length > 0 ? this.state.vehicleAds.map((item) => {
//                           return <Card>
//                               {/* <Icon name="heart" disabled={this.state.user.wishList ? !this.state.user.wishList.includes(item._id):true }
//                               corner="top right"
//                                   // user.wishList.map(list=>{ return list==item._id})
//                                   color={this.state.user.wishList.includes(item._id) ? "red" : null}
//                                   size="big" 
//                                   link={onclick=()=>{
//                                       console.log('in set wishlist',item._id)
//                                       if( this.state.user.wishList.includes(item._id)){
//                                           this.setState({
//                                               ...this.state,
//                                               user:{
//                                                   ...this.state.user,
//                                                   wishList:this.state.user.wishList.filter(Wish=> Wish!=item._id )
                                                 
//                                               }
//                                           })
//                                           console.log('this.state.user.wishList in if',this.state.user.wishList)
//                                       }
//                                       else{
//                                           this.setState({
//                                               ...this.state,
//                                               user:{
//                                                   ...this.state.user,
//                                                   wishList:[...this.state.user.wishList,item._id]
                                                 
//                                               }
//                                           })
//                                           console.log('this.state.user.wishList',this.state.user.wishList)
//                                           localStorage.setItem('user', this.state.user);
//                                       }
//                                   }} 
//                                   // link={}
//                                   /> */}
//                               <Card.Content className='ad-cards'>
//                                   <h4>{item.title}</h4>
//                                   {item.images ? <img src={item.images[0]['data_url']} alt="" width="100" height="100" /> : <Placeholder style={{ width: '100px', height: '100px' }} >
//                                       <Placeholder.Image square />
//                                   </Placeholder>}
//                                   {item.title ? <div>
//                                       <h4>{item.location}</h4>
//                                       <h4>Rs. {item.price}</h4> {item.negotiable ? 'Negotiable' : null}
//                                   </div> : null}
//                                   <Button primary icon='eye' label='edit' onClick={() => console.log(item._id)} >Edit</Button>
//                               </Card.Content>
//                           </Card>
//                       }) : <Loader active inline='centered' indeterminate size='massive' style={{ margin: '0 auto' }} />}
//                   </Card.Group>
//                   <div className='pagination'>
//                       <Pagination
//                           activePage={this.state.pagination.activePage}
//                           boundaryRange={this.state.pagination.boundaryRange}
//                           onPageChange={this.handlePaginationChange}
//                           size='mini'
//                           siblingRange={this.state.pagination.siblingRange}
//                           totalPages={this.state.pagination.totalPages}
//                           ellipsisItem={this.state.pagination.showEllipsis ? undefined : null}
//                           firstItem={this.state.pagination.showFirstAndLastNav ? undefined : null}
//                           lastItem={this.state.pagination.showFirstAndLastNav ? undefined : null}
//                           prevItem={this.state.pagination.showPreviousAndNextNav ? undefined : null}
//                           nextItem={this.state.pagination.showPreviousAndNextNav ? undefined : null}
//                           disabled={this.state.pagination.disabled}
//                       />
//                   </div>
//               </div></Tab.Pane>,
//             },
//             {
//               menuItem: { key: 'users', icon: 'users', content: 'Users' },
//               render: () => <Tab.Pane>Tab 2 Content
//               </Tab.Pane>,
//             },
//           ]
//         return (
//             <div>
//                  <Tab panes={panes} />
//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => ({
//     vehicleAds: state.vehicle.publishedVehicleAdIds
// })
// export default connect(mapStateToProps, { getPublishedVehicleAds, getVehicleAdById })(myads);
import React, { Component } from 'react'
import { getAllVehicleAds } from '../redux/actions/vehicleAdActions'
import jwt from 'jsonwebtoken'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Loader,Dimmer } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux'

class myads extends Component {
    state = {
        vehicleAdDetails: [],
        loading: true,
        images: [],
        user:null
    }

    componentDidMount = () => {
        // this.props.getVehicleAdById(window.location.pathname.replace('/vehicleAdDetail/', '')).then((res) => {
        //     this.setState({ ...this.state, loading: false, vehicleAdDetails: res }, () => {
        //         console.log(this.state)
        //         for (let index = 0; index < res.images.length; index++) {
        //             this.setState({ ...this.state, images: [...this.state.images, { original: res.images[index]['data_url'], thumbnail: res.images[index]['data_url'] }] })
        //         }
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
        this.props.getAllVehicleAds().then(res=>{
            console.log('res in getall vehicles',res)
            const userdetais = localStorage.getItem("user");
            const users = jwt.decode(userdetais);
            console.log('res in get user vehicles',res.filter(vehicle=> vehicle.userId ==users._id))
                this.setState({
                    ...this.state,
                    user:users,
                    vehicleAdDetails:res.filter(vehicle=> vehicle.userId ==users._id)
                })
                // this.state.vehicleAdDetails.map(vehicleDetails=)
                console.log('this.state.vehicleAdDetails',this.state.vehicleAdDetails)
        }).catch(err=>{
            // console.log(err)
            alert('Connection error pas!')
        })
    }
    render() {
        return (
            <div>
            {this.state.vehicleAdDetails ? this.state.vehicleAdDetails.map(vehicleAdDetails=>{
                return <div style={{ margin: '0 auto' }}>
                <Grid style={{ margin: '0 auto' }}>
                    <Grid.Column width={6}>
                        <ImageGallery items={vehicleAdDetails.images} style={{ padding: '10px' }} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h1>{vehicleAdDetails.title}&nbsp;</h1></Header><p style={{ marginTop: '10px' }}>Posted on {vehicleAdDetails.updatedAt.split('T')[0]}</p>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header><h2>Rs. {vehicleAdDetails.price}&nbsp;</h2></Header>{!vehicleAdDetails.Negotiable ? ' Negotiable' : null}
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Specifications</Header>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Grid.Column width={3}>
                                <List verticalAlign='middle' divided>
                                    <List.Item>Category: <b>{vehicleAdDetails.category}</b></List.Item>
                                    <List.Item>Body Type: <b>{vehicleAdDetails.bodyType}</b></List.Item>
                                    <List.Item>Make: <b>{vehicleAdDetails.make}</b></List.Item>
                                    <List.Item>Model: <b>{vehicleAdDetails.model}</b></List.Item>
                                    <List.Item>Engine Capacity: <b>{vehicleAdDetails.engineCapacity} cc</b></List.Item>
                                </List>
                            </Grid.Column>
                            &nbsp;
                            &nbsp;
                            <Grid.Column width={3} >
                                <List verticalAlign='middle' divided>
                                    <List.Item>Transmission: <b>{vehicleAdDetails.transmission}</b></List.Item>
                                    <List.Item>Fuel Type: <b>{vehicleAdDetails.fuelType}</b></List.Item>
                                    <List.Item>Year: <b>{vehicleAdDetails.year}</b></List.Item>
                                    <List.Item>condition: <b>{vehicleAdDetails.condition === 'registered' ? 'Used' : 'New'}</b></List.Item>
                                    <List.Item>Mileage: <b>{vehicleAdDetails.mileage} km</b></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Description</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container textAlign='left'>
                                {vehicleAdDetails.description}
                            </Container>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                        <a href={'tel:'+vehicleAdDetails.contactNumbers[0].split(')')[1]} ><Button icon labelPosition='left' color='blue'>
                            <Icon name='phone' />
                            CONTACT SELLER
                        </Button></a>
                         {/* add mail from user when available */}
                        <a href={'mailto:'+vehicleAdDetails.contactNumbers[0].split(')')[1]}><Button icon labelPosition='left' color='orange'>
                            <Icon name='mail' />
                            EMAIL
                        </Button></a>
                        <a href={'/vehicleAd/update/'+vehicleAdDetails._id}><Button icon labelPosition='left' color='orange'>
                            <Icon name='edit' />
                            Edit
                        </Button></a>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Seller: abc</Header>

                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>Location: {vehicleAdDetails.location} </Header> <Icon name='map marker alternate' />
                        </Grid.Row>
                        <Grid.Row style={{ padding: '10px' }} >
                            <Header>status: {vehicleAdDetails.status} </Header> 
                            {/* <Icon name='map marker alternate' /> */}
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                </div>
                }):<Dimmer active inverted style={{ margin: '0 auto' }}>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
        // <ToastContainer style={{ fontSize: '20px' }} />
        }
            
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    // vehicleAds: state.vehicle.publishedVehicleAdIds
})
export default connect(mapStateToProps, {getAllVehicleAds })(myads);