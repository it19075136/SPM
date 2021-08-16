import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

const vehicleMakeOptions = [
  { key: 't', text: 'Toyota', value: 'toyota' },
  { key: 's', text: 'Suzuki', value: 'suzuki' },
  { key: 'h', text: 'Honda', value: 'honda' },
]

const vehicleModelOptions = [
    { key: 'ax', text: 'Axio', value: 'axio' },
    { key: 'al', text: 'Allion', value: 'allion' },
    { key: 'v', text: 'Vitz', value: 'vitz' },
  ]

  const vehicleBodyOptions = [
    { key: 'h', text: 'Hatchback', value: 'hatchback' },
    { key: 's', text: 'Sedan', value: 'sedan' },
    { key: 'c', text: 'Coupe', value: 'coupe' },
  ]

  const transmissionOptions = [
    { key: 'a', text: 'Automatic', value: 'automatic' },
    { key: 'm', text: 'Manual', value: 'manual' },
    { key: 't', text: 'Triptonic', value: 'triptonic' },
  ]

export default class vehicleAdForm extends Component {
    render() {
        return (
            <Form className='form-centered'>
                <Form.Field required
                    width='16'
                    id='advertisementTitle'
                    control={Input}
                    label='Advertisement Title'
                    placeholder='Add an advertisement title'
                />
                <Form.Field required
                    width='16'
                    control={Select}
                    options={vehicleMakeOptions}
                    label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                    placeholder='Vehicle Make'
                    search
                    searchInput={{ id: 'vehicleMake' }}
                />
                <Form.Field required
                    width='16'
                    control={Select}
                    options={vehicleModelOptions}
                    label={{ children: 'Vehicle Model', htmlFor: 'vehicleModel' }}
                    placeholder='Vehicle Model'
                    search
                    searchInput={{ id: 'vehicleModel' }}
                />
                <Form.Field required
                    width='16'
                    control={Select}
                    options={vehicleMakeOptions}
                    label={{ children: 'Vehicle Make', htmlFor: 'vehicleMake' }}
                    placeholder='Vehicle Make'
                    search
                    searchInput={{ id: 'vehicleMake' }}
                />
                <Form.Field required
                    width='16'
                    control={Select}
                    options={vehicleBodyOptions}
                    label={{ children: 'Vehicle Body Type', htmlFor: 'bodyType' }}
                    placeholder='Vehicle Body Type'
                    search
                    searchInput={{ id: 'bodyType' }}
                />
                <Form.Field required
                    width='16'
                    control={Select}
                    options={transmissionOptions}
                    label={{ children: 'Transmission', htmlFor: 'transmission' }}
                    placeholder='Transmission'
                    search
                    searchInput={{ id: 'transmission' }}
                />
            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
              />
            </Form.Group>
            <Form.Field
              id='form-textarea-control-opinion'
              control={TextArea}
              label='Opinion'
              placeholder='Opinion'
            />
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Email'
              placeholder='joe@schmoe.com'
              error={{
                content: 'Please enter a valid email address',
                pointing: 'below',
              }}
            />
            <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Confirm'
              label='Label with htmlFor'
            />
          </Form>
        )
    }
}
