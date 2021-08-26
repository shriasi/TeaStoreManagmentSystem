import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/shipping')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Select Delivery details</h1>
      <Form
        onSubmit={submitHandler}
        className='shadow p-3 mb-5 bg-white rounded'
      >
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Self Pickup'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {<Form.Check
              type='radio'
              label='Delivery'
              id='Delivery'
              name='paymentMethod'
              value='Delivery'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>}
          </Col>
        </Form.Group>

        <Button type='submit' variant='success' className='btnc'>
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
