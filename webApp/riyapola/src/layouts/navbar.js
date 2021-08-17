import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react';
import './style.css';

export default class navbar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <div>
                <Menu stackable className="navbar" inverted >
                    <Menu.Item className="item">
                        <img src="/images/logo-white.png" style={{width:'70px'}} />
                    </Menu.Item>

                    <Menu.Item
                        className="item"
                        name='home'
                        active={activeItem === 'features'}
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

                    <Menu.Item
                        className="item"
                        name='sign-in'
                        active={activeItem === 'sign-in'}
                        onClick={this.handleItemClick}
                    >
                        Sign-in
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}