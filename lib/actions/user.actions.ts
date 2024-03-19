'use server'

import { revalidatePath } from "next/cache"
import { CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Service from "../database/models/service.model"
import Order from "../database/models/order.model"

export async function createUser(user: CreateUserParams){
    try{
        await connectToDatabase(); //connect to database, if we have a cached connection no need to connect again
        const newUser = await User.create(user); //create user

        return JSON.parse(JSON.stringify(newUser)) //the data that we pass to the frontend 
    }
    catch(error){
        handleError(error)
    }
}

export async function getUserById(userId: string){
    try{
        await connectToDatabase();
        const user = await User.findById(userId);

        if(!user){
            throw new Error('User not found')
        }
        return JSON.parse(JSON.stringify(user))
    }
    catch(error){
        handleError(error)
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams){
    try{
        await connectToDatabase();
        const updatedUser=await User.findOneAndUpdate({clerkId}, user, {new: true});

        if(!user){
            throw new Error('User update failed')
        }
        return JSON.parse(JSON.stringify(updatedUser))
    }
    catch(error){
            handleError(error)
    }
}

export async function deleteUser(clerkId: string){
    try{
        await connectToDatabase();
        const userToDelete = await User.findOne({clerkId});
        if(!userToDelete){
            throw new Error('User not found')
        }

        //Unlink all the relationships with that user
        await Promise.all([
            //Update the 'services' collection to remove the references to the user
            Service.updateMany(
                {_id: {$in: userToDelete.services}},
                {$pull: {createdBy: userToDelete._id}}
            ),

            //Update the 'orders' collection to remove the references to the user
            Order.updateMany(
                {_id: {$in: userToDelete.orders}},
                {$unset: {user:{ buyer: 1}}}
            )
        ])


        //finaly delete the user
        const deletedUser = await User.findOneAndDelete({clerkId});
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    }   
    catch(error){
        handleError(error)
    }
}