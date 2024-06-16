"use server"

import { CreateServiceParams, DeleteServiceParams, GetAllServiceParams, GetRelatedServicesByCategoryParams, GetServicesByUserParams, UpdateServiceParams } from "@/types";
import { connectToDatabase } from "../database";
import Service from "../database/models/service.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

export const createService = async({service, userId, path}: CreateServiceParams)=>{
    try{
        await connectToDatabase();
        const createdBy = await User.findById(userId);
        if(!createdBy){
            throw new Error('Service Provider not found');
        }
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

const populateService = (serviceQuery: any)=>{
    return serviceQuery
    .populate({path: 'createdBy', model: User, select: '_id firstName lastName email imageUrl'})
    .populate({path: 'category', model: Category, select: '_id categoryName'});
}

const getCategoryByName = async (categoryName: string) => {
    return Category.findOne({ categoryName: { $regex: categoryName, $options: 'i' } })
  }

  
export const getServiceById = async(serviceId:string)=>{
    try{
        await connectToDatabase();
        const service = await populateService(Service.findById(serviceId));
        if(!service){
            throw new Error('Service not found');
        }

        return JSON.parse(JSON.stringify(service));
    }
    catch(error){
        handleError(error);
    }
}


// UPDATE
export async function updateService({ userId, service, path }: UpdateServiceParams) {
    try {
      await connectToDatabase()
  
      const serviceToUpdate = await Service.findById(service._id)
      if (!serviceToUpdate || serviceToUpdate.createdBy.toHexString() !== userId) {
        throw new Error('Unauthorized or service not found')
      }
  
      const updatedService = await Service.findByIdAndUpdate(
        service._id,
        { ...service, category: service.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedService))
    } catch (error) {
      handleError(error)
    }
  }

// export const getAllServices = async({query, limit=6,page,category}: GetAllServiceParams)=>{
//     try{
//         await connectToDatabase();
//         const conditions={};
//         const serviceQuery = Service.find(conditions)
//         .sort({createdAt: 'desc'}) //new ones on top
//         .skip(0)
//         .limit(limit);

//         const services = await populateService(serviceQuery);
//         const serviceCount = await Service.countDocuments(conditions);
//         return {
//             data: JSON.parse(JSON.stringify(services)),
//             totalPages: Math.ceil(serviceCount/limit)
//         }
//     }
//     catch(error){
//         handleError(error);
//     }
// }

export const deleteService = async({serviceId, path}: DeleteServiceParams)=>{
    try{
        await connectToDatabase();
        const deletedService = await Service.findByIdAndDelete(serviceId);
        if(!deletedService){
            revalidatePath(path);
        }
    }
    catch(error){
        handleError(error);
    }
}


//new code to be changed as per my configruration of service providers

// GET ALL SERVICES
export async function getAllServices({ query, limit = 6, page, category }: GetAllServiceParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = query ? { serviceTitle: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }
  
      const skipAmount = (Number(page) - 1) * limit
      const servicesQuery = Service.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const services = await populateService(servicesQuery)
      const servicesCount = await Service.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(services)),
        totalPages: Math.ceil(servicesCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET Service BY createdBy
  export async function getServicesByUser({ userId, limit = 6, page }: GetServicesByUserParams) {
    try {
      await connectToDatabase()
  
      const conditions = { createdBy: userId }
      const skipAmount = (page - 1) * limit
  
      const servicesQuery = Service.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const services = await populateService(servicesQuery)
      const servicesCount = await Service.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(services)), totalPages: Math.ceil(servicesCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET RELATED serviceS: serviceS WITH SAME CATEGORY
  export async function getRelatedServicesByCategory({
    categoryId,
    serviceId,
    limit = 3,
    page = 1,
  }: GetRelatedServicesByCategoryParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ category: categoryId }, { _id: { $ne: serviceId } }] }
  
      const servicesQuery = Service.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const services = await populateService(servicesQuery)
      const servicesCount = await Service.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(services)), totalPages: Math.ceil(servicesCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }