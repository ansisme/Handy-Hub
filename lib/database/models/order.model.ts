import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  createdAt: Date
  stripeId: string
  totalAmount: string
  service: {
    _id: string
    serviceTitle: string
  }
  buyer: {
    _id: string
    firstName: string
    lastName: string
    email: string
    phonrNumber: string
  }
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  createdAt: Date
  serviceTitle: string
  serviceId: string
  buyer: string
  email: string
  phoneNumber: string
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Order = models.Order || model('Order', OrderSchema)

export default Order