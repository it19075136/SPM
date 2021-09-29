import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublishedSparepartsAds, getSparepartAdById } from '../redux/actions/sparepartsActions';
import jwt from 'jsonwebtoken'
import { userUpdate } from '../redux/actions/userActions';
import { Card, Placeholder, Loader, Button, Pagination, Image, Select, Icon, Search, Grid, Modal, Header, Form, Radio } from 'semantic-ui-react';
import './sample.css'

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
        counter: 0,
        user: null,
        filter: "",
        open: false,
        conditionFilter: null
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
    // componentDidUpdate=()=>{
    //     // const userdetais = localStorage.getItem("user");
    //     // const decodeItem = jwt.decode(userdetais);
    //     console.log('componentDidUpdate',this.state)
    //     if(this.state.user){
    //         this.props.userUpdate(this.state.user,this.state.user).then((res) => {
    //             console.log('in post');
    //             const { token } = res;
    //             if (token) {
    //                 console.log(token,"token")
    //                 // setAction(({
    //                 //     success:true
    //                 //  }));
    //                 // this.setState({
    //                 //     ...this.state,
    //                 //     action:true
    //                 //   })
    //                 //   notify();
    //                 // localStorage.setItem('user',token);
    //                 // const userResponds = jwt.decode(token);
    //                 // const userDetails = {
    //                 //     _id: userResponds._id,
    //                 //     name: userResponds.name,
    //                 //     email: userResponds.email,
    //                 //     type: userResponds.type,
    //                 //     phoneNumber: userResponds.phoneNumber,
    //                 //     wishList:userResponds.wishList,
    //                 //     image:userResponds.image,
    //                 //     password:userResponds.password
    //                 // }

    //                 // console.log(userDetails);


    //                 // dispatch({type:'ADD_USER',payload:userDetails});
    //                 // resolve(userDetails);
    //             }
    //             else{
    //                 // this.setState({
    //                 //     ...this.state,
    //                 //     action:false
    //                 //   })
    //                 //   notify();
    //             }
    //             // setAction(({
    //             //     success:false
    //             //  }));

    //         }).catch((err) => {
    //             // reject(err)
    //             // setAction(({
    //             //     success:false
    //             //  }));
    //             // this.setState({
    //             //     ...this.state,
    //             //     action:false
    //             //   })
    //             //   notify();
    //         })
    //     }

    // }
    componentDidMount = () => {
        this.props.getPublishedSparepartsAds().then((res) => {
            const userdetais = localStorage.getItem("user");
            const users = jwt.decode(userdetais);
            this.setState({
                ...this.state,
                pagination: {
                    ...this.state.pagination,
                    indexOfFirstCard: (this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage,
                    indexOfLastCard: (this.props.sparepartsAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) < 9 ? (this.props.sparepartsAds.length - ((this.state.pagination.activePage * this.state.pagination.cardsPerPage) - this.state.pagination.cardsPerPage)) + 9 * (this.state.pagination.activePage - 1) : (this.state.pagination.activePage * this.state.pagination.cardsPerPage)
                },
                user: users
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

    handleChange = (context, event) => {
        console.log("in filter")
        switch (context) {
            case "CONDITION":
                this.setState({ conditionFilter: this.state.conditionFilter == event.target.textContent ? null : event.target.textContent }, () => {
                    console.log(this.state.conditionFilter)
                })
                break;
            case "TYPE":
                console.log(event.target)
                break;
            default:
                this.setState({...this.state, filter: event.target.value })
                break;
        }
    }

    handleModal = (e, { name }) => {
        switch (name) {
            case 'close':
                this.setState({ ...this.state, open: false })
                break;
            case 'open':
                this.setState({ ...this.state, open: true })
                break;
            default:
                throw new Error('Unsupported Action!')
        }
    }


    render() {
        console.log(this.state.sparepartsAds);
        const { filter } = this.state;
        return (
            <div>
                <center>
                    <input type="search" placeholder="Search" value={filter} onChange={this.handleChange.bind(this,null)} />
                    <Button circular size="medium" color="blue" icon="filter" style={{ marginLeft: 5 }} onClick={this.handleModal} name='open' />
                </center>

                <Card.Group itemsPerRow={3} stackable className='ad-cards-group'>
                    {this.state.sparepartsAds.length > 0 ? this.state.sparepartsAds.filter(
                        elem => {
                            return (
                                elem.title.toLowerCase().includes(`${filter.toLocaleLowerCase()}`) 
                                &&  ((this.state.conditionFilter != null && elem.condition) ? (elem.condition.toLocaleLowerCase() == this.state.conditionFilter.toLocaleLowerCase()) : (this.state.filter == "") || (this.state.conditionFilter == null && (this.state.filter != "")))
                            )
                        }
                    ).map((item) => {
                        return <Card>
                            {item.images ? item.images[0] ? <Image src={item.images[0]['data_url']} wrapped centered ui={false} /> : <h1>No Image</h1> : <Placeholder >
                                <Placeholder.Image square />
                            </Placeholder>}
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
                                            })
                                            console.log('this.state.user.wishList in if', this.state.user.wishList)
                                        }
                                        else {
                                            this.setState({
                                                ...this.state,
                                                user: {
                                                    ...this.state.user,
                                                    wishList: [...this.state.user.wishList, item._id]

                                                }
                                            })
                                            console.log('this.state.user.wishList', this.state.user.wishList)
                                            localStorage.setItem('user', jwt.sign(this.state.user, "user"));
                                        }

                                    }} >
                                        {/* <a onclick = {setwishList(item._id)}> */}
                                        <Icon name="heart" disabled={this.state.user ? !this.state.user.wishList.includes(item._id) : true}
                                            corner="bottom right"
                                            style={{ float: 'right' }}
                                            // user.wishList.map(list=>{ return list==item._id})
                                            color={this.state.user ? (this.state.user.wishList.includes(item._id) ? "red" : "brown") : "brown"}
                                            size="big"

                                        // link={}
                                        />
                                        {/* </a> */}
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
                <Modal
                    open={this.state.open}
                    onClose={() => this.setState({ ...this.state, open: false })}
                    onOpen={() => this.setState({ ...this.state, open: true })}
                    size="small"
                >
                    <Modal.Header>Filter Your Result</Modal.Header>
                    <Modal.Content>
                        <Header as="h5">Condition</Header>
                        <Form.Group inline>
                            <Form.Field
                                control={Radio}
                                label="New"
                                name="new"
                                checked={this.state.conditionFilter == 'New'}
                                onChange={this.handleChange.bind(this, "CONDITION")}
                            />
                            <Form.Field
                                control={Radio}
                                label="Used"
                                name="used"
                                checked={this.state.conditionFilter == 'Used'}
                                onChange={this.handleChange.bind(this, "CONDITION")}
                            />
                            <Form.Field
                                control={Radio}
                                label="Recondition"
                                name="recondition"
                                checked={this.state.conditionFilter == 'Recondition'}
                                onChange={this.handleChange.bind(this, "CONDITION")}
                            />
                        </Form.Group>
                        <Header as="h5">Sparepart Category</Header>
                        <Form.Field required
                            width='16'
                            control={Select}
                            placeholder='Part or Accessory Type'
                            onChange={this.handleChange.bind(this, "TYPE")}
                            search
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.setState({ ...this.state, open: false })}>
                            Cancel
                        </Button>
                        <Button color="blue" onClick={() => this.setState({ ...this.state, open: false })}>
                            Filter
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    sparepartsAds: state.sparepart.publishSparepartAdIds
})

export default connect(mapStateToProps, { getPublishedSparepartsAds, getSparepartAdById, userUpdate })(sparePartAdView);