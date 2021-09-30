import React, { Component } from 'react'
import { Menu, Button, Header, Icon, Modal } from 'semantic-ui-react';
import './style.css';
import  { GoogleLogout } from 'react-google-login'
import jwt from 'jsonwebtoken'

export default class navbar extends Component {
    state = {
        open: false,
        activeItem: this.props.name
    }

    handleItemClick = (name,e) => {
        switch (name) {
            case 'publishAd':
                this.setState({ ...this.state, open: true })
                break;
            case 'sign-in':
                window.location.href = '/signin'
                break;
            case 'home':
                window.location.href = '/'
                break;    
            case 'sign-out':
                localStorage.removeItem("user");
                window.location.href = '/signin'
            case 'sign-out-google':
                const login = {
                    login:false
                  }
                  localStorage.setItem('login',login);
            default:
                break;
        }
    }

    render() {
        const userItem = localStorage.getItem("user");
        const user = jwt.decode(userItem);
        const loginItem = localStorage.getItem("login");
        const login = jwt.decode(loginItem)
        const { activeItem } = this.state
        return (
            <div>
                <Menu stackable className="navbar" inverted>
                    <Menu.Item className="item">
                        <img src="/images/logo-white.png" style={{ width: '70px' }} />
                    </Menu.Item>

                    <Menu.Item
                        className="item"
                        name='home'
                        active={this.state.activeItem === '/'}
                        onClick={this.handleItemClick.bind(this,"home")}
                    >
                        Home
                    </Menu.Item>
                    {user && user.type == 'admin' ? <Menu.Item
                        className="item"
                        name='Categories'
                        active={this.state.activeItem  === '/category/list'}
                        onClick={()=>{
                              window.location.href = '/category/list'
                        }}
                    ></Menu.Item>:null}
                    {user && user.type == 'admin' ? <Menu.Item
                        className="item"
                        name='Vehicle ads management'
                        active={this.state.activeItem  === '/adminVehicleAds'}
                        onClick={()=>{
                              window.location.href = '/adminVehicleAds'
                        }}
                    ></Menu.Item>:null}
                    {user && user.type == 'admin' ? <Menu.Item
                        className="item"
                        name='Spare part ads management'
                        active={this.state.activeItem  === '/adminsparePartsAds'}
                        onClick={()=>{
                              window.location.href = '/adminsparePartsAds'
                        }}
                    ></Menu.Item>:null}
                    {user && user.type != 'admin'? <Menu.Item
                        className="item"
                        name='Wish List'
                        position='right'
                        active={this.state.activeItem  === '/favorites'}
                        onClick={()=>{
                            // const login = {
                            //     login:false
                            //   }
                            //   localStorage.setItem('login',login);
                            //   localStorage.removeItem("user");
                              window.location.href = '/favorites'
                        }}
                    ></Menu.Item>:null}
                    {user && user.type != 'admin' ? <Menu.Item
                        className="item"
                        name='My Ads'
                        active={this.state.activeItem  === '/myads'}
                        onClick={()=>{
                            // const login = {
                            //     login:false
                            //   }
                            //   localStorage.setItem('login',login);
                            //   localStorage.removeItem("user");
                              window.location.href = '/myads'
                        }}
                    ></Menu.Item>:null}
                    {user && user.type != 'admin' ? <Menu.Item
                        className="item"
                        name='My Profile'
                        active={this.state.activeItem  === '/userProfile'}
                        onClick={()=>{
                            // const login = {
                            //     login:false
                            //   }
                            //   localStorage.setItem('login',login);
                            //   localStorage.removeItem("user");
                              window.location.href = '/userProfile'
                        }}
                    ></Menu.Item>:null}
                   
                    {user ?
                    ( login ?(
                    
                    <Menu.Item
                        className="item"
                        name='sign-out'
                        position={user.type == 'admin' ? 'right':null}
                        // active={activeItem === 'sign-out'}
                        onClick={()=>{
                            const login = {
                                login:false
                              }
                              localStorage.setItem('login',login);
                              localStorage.removeItem("user");
                              window.location.href = '/signin'
                        }}
                    >
                        <GoogleLogout
                        clientId="433588545715-a0rf1qdeefuafa8kn13lh9g2v810v9ri.apps.googleusercontent.com"
                        buttonText="sign-out"
                        onLogoutSuccess={()=>{
                            const login = {
                                login:false
                              }
                              localStorage.setItem('login',login);
                              localStorage.removeItem("user");
                              window.location.href = '/signin'
                        }}
                        
                        >

                        </GoogleLogout>
                        </Menu.Item>):
                    
                    (<Menu.Item
                        className="item"
                        name='sign-out'
                        position={user.type == 'admin' ? 'right':null}
                        active={this.state.activeItem === 'sign-out'}
                        onClick={this.handleItemClick.bind(this,'sign-out')}
                    >
                        Sign-out
                    </Menu.Item>
                    ))
                    // ) 
                    :(

                        <Menu.Item
                            className="item"
                            name='sign-in'
                            position='right'
                            active={this.state.activeItem === '/signin'}
                            onClick={this.handleItemClick.bind(this,'sign-in')}
                        >
                            Sign-in
                        </Menu.Item>
                        )
                    }
                    {user && user.type != 'admin' ? <Menu.Item
                        className="item"
                        style={{ color: 'orange' }}
                        name='publishAd'
                        active={(this.state.activeItem === '/vehicleAd/create') || (this.state.activeItem === '/sparePartsAd/create')}
                        onClick={this.handleItemClick.bind(this,'publishAd')}
                    >
                        Publish ad for free
                    </Menu.Item>:null}
                </Menu>
                <Modal
                    basic
                    onClose={() => this.setState({ ...this.state, open: false })}
                    onOpen={() => this.setState({ ...this.state, open: true })}
                    open={this.state.open}
                    size='small'
                >
                    <Header icon>
                        <Icon name='car' />
                        {jwt.decode(localStorage.getItem("user")) ? "Choose Your Advertisement Type" : null}
                    </Header>
                    {jwt.decode(localStorage.getItem("user")) ? <div>
                    <Modal.Content className='publish-add-action-btns'>
                        <Button color='blue' size='big' inverted onClick={() => window.location.href = '/vehicleAd/create'}>
                            <Icon name='car' /> Vehicle
                        </Button>
                        <Button color='green' size='big' inverted onClick={() => window.location.href = '/sparePartsAd/create'}>
                            <Icon name='settings' /> Spare Parts
                        </Button>
                    </Modal.Content></div> : <Header><Icon name='warning sign' />Please login to publish your ads</Header> }
                    <Modal.Actions>
                        <Button color='red' inverted onClick={() => this.setState({ ...this.state, open: false })}>
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}