"use server";

import { handleError } from "../utils";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByServiceParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import Service from "../database/models/service.model";
import User from "../database/models/user.model";
import { ObjectId } from "mongodb";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = Number(order.price) * 100;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: price,
            product_data: {
              name: order.serviceTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        serviceId: order.serviceId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    const newOrder = await Order.create({
      ...order,
      service: order.serviceId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

// GET ORDERS BY service
export async function getOrdersByService({
  searchString,
  serviceId,
}: GetOrdersByServiceParams) {
  try {
    await connectToDatabase();

    if (!serviceId) throw new Error("Service ID is required");
    const serviceObjectId = new ObjectId(serviceId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          serviceTitle: "$service.serviceTitle",
          serviceId: "$service._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
          email: "$buyer.email",
        },
      },
      {
        $match: {
          $and: [
            { serviceId: serviceObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("service._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "service",
        model: Service,
        populate: {
          path: "createdBy",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await Order.distinct("service._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
