import React, { Component } from 'react'
import { Menu, Button, Header, Icon, Modal } from 'semantic-ui-react';
import './style.css';
import jwt from 'jsonwebtoken'

export default class navbar extends Component {
    state = {
        open: false
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        switch (name) {
            case 'publishAd':
                this.setState({ ...this.state, open: true })
                break;
            case 'sign-in':
                window.location.href = '/signin'
                break;
            case 'sign-out':
                localStorage.removeItem("user");
                window.location.href = '/signin'
            default:
                break;
        }
    }

    render() {
        const userItem = localStorage.getItem("user");
    const user = jwt.decode(userItem);
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
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    >
                        Home
                    </Menu.Item>

                    <Menu.Item
                        className="item"
                        name='testimonials'
                        active={activeItem === 'testimonials'}
                        onClick={this.handleItemClick}
                    >
                        Testimonials
                    </Menu.Item>
                 {user ? <Menu.Item
                        className="item"
                        name='sign-out'
                        position='right'
                        active={activeItem === 'sign-out'}
                        onClick={this.handleItemClick}
                    >
                        Sign-out
                    </Menu.Item> : 
                    
                    <Menu.Item
                        className="item"
                        name='sign-in'
                        position='right'
                        active={activeItem === 'sign-in'}
                        onClick={this.handleItemClick}
                    >
                        Sign-in
                    </Menu.Item>
                    }
                    
                    <Menu.Item
                        className="item"
                        style={{ color: 'orange' }}
                        name='publishAd'
                        active={activeItem === 'publishAd'}
                        onClick={this.handleItemClick}
                    >
                        Publish ad for free
                    </Menu.Item>
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
                        Choose Your Advertisement Type
                    </Header>
                    <Modal.Content className='publish-add-action-btns'>
                        <Button color='blue' size='big' inverted onClick={() => window.location.href = '/vehicleAd/create'}>
                            <Icon name='car' /> Vehicle
                        </Button>
                        <Button color='green' size='big' inverted onClick={() => window.location.href = '/sparePartsAd/create'}>
                            <Icon name='settings' /> Spare Parts
                        </Button>
                    </Modal.Content>
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