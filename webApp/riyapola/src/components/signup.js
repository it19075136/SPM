import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const signup = () => (
  <Form >
    <Form.Field>
      <label>Name</label>
      <input placeholder='Name' />
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>phoneNumber</label>
      <input placeholder='phoneNumber' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Form.Field>
      <label>Re Enter Password</label>
      <input placeholder='Re Enter Password' />
    </Form.Field>
    <Form.Field >
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Signup</Button>
  </Form>
)

export default signup
