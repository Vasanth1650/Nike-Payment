const app = require('express')()
const path = require('path')
const Razorpay = require('razorpay')
const shortid = require('shortid')
const cors = require('cors')

app.use(cors())


const razorpay = new Razorpay({
  key_id:'rzp_test_1UP2mUDjjS5OZf',
  key_secret : 'tziVVIDj3fPxsI4ptfjSGIp6'
})



app.post('/razorpay' ,async(req,res)=>{

  const payment_capture = 1
  const amount = 50000
  const currency = "INR"
  const options = {
      amount:amount*100,
      currency,
      receipt: shortid.generate(), 
      payment_capture
  }
  try{
    const response = await razorpay.orders.create(options)
    console.log(response)
    res.json({
      id: response.id,
      currency:"INR",
      amount:response.amount,
      order_id:response.order_id
    })
  }catch(error){
    console.log(error)
  }
  
})

app.listen(8081)