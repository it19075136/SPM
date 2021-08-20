import React, {Component} from 'react';
import { Form, Input, TextArea, Button, Select, Divider, Header, Icon, Segment } from 'semantic-ui-react';

export default class updateSparePartsAdForm extends Component {
    render() {
        return(
            <div className="form-centered">
                <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Update Your Spare Parts Details
                </Header>
            </div>
        )
    }
}