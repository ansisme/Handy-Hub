"use server"

import { CreateServiceParams } from "@/types";
import { connectToDatabase } from "../database";
import Service from "../database/models/service.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const createService = async({service, userId, path}: CreateServiceParams)=>{
    try{
        await connectToDatabase();
        const createdBy = await User.findById(userId);
        if(!createdBy){
            throw new Error('Service Provider not found');
        }
        // console.log({
        //     categoryId: service.categoryId, 
        //     createdById: userId
        // })
        const newService = await Service.create({
            ...service, 
            category: service.categoryId,
            createdBy: userId
        });
        // revalidatePath(path);
        return JSON.parse(JSON.stringify(newService));
    }   
    catch(error){
        console.log(error);
        handleError(error);
    }
};