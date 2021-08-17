import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const signin = () => (
  <Form className='form-centered'>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Button type='submit'>SignIn</Button>
  </Form>
)

export default signin
