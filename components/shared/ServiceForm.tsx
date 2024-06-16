"use client"

import React, { useState } from 'react'
//copied from the shadcn official ui documentation of form 

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ServiceFormSchema } from '@/lib/validator'
import { z } from "zod"
import { serviceDefaultValues } from '@/constants'
import Dropdown from './Dropdown'
import { Textarea } from "@/components/ui/textarea"
import {FileUploader} from './FileUploader'
import Image from 'next/image'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from 'next/navigation'
import { createService, updateService } from '@/lib/actions/service.action'
import { IService } from '@/lib/database/models/service.model'

type ServiceFormProps={
    userId: string;
    type: "Create" | "Update";
    service? : IService;
    serviceId?: string;
}
const ServiceForm = ({userId, type,service,serviceId}: ServiceFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const initialValues = service && type==='Update'
    ? {...service, createdAt: new Date(service.createdAt) } 
    : serviceDefaultValues;
  const {startUpload} = useUploadThing('imageUploader');
  //from the shadcn ui official documentation
  const form = useForm<z.infer<typeof ServiceFormSchema>>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ServiceFormSchema>) {
    let uploadImageUrl= values.imageUrl;
    if(files.length>0){ //if user has uploaded the images
      const uploadImages = await startUpload(files);
      if(!uploadImages){
        return;
      }
      uploadImageUrl = uploadImages[0].url;
    }

    if(type==="Create"){
      try{
        const newService = await createService({ 
          service: {...values, imageUrl: uploadImageUrl},
          userId,
          path: '/profile'
        })
        if(newService){
          form.reset();
          router.push(`/services/${newService._id}`);
          // console.log(newService);
        }
      }
      catch(error){
        console.log(error);
      }
    }
    if(type==="Update"){
      if(!serviceId){
        router.back(); //go back to the previous page
        return;
      }
      try{
        const updatedService = await updateService({ 
          userId,
          service: {...values, imageUrl: uploadImageUrl, _id:serviceId},
          path: `/services/${serviceId}`
        })
        if(updatedService){
          form.reset();
          router.push(`/services/${updatedService._id}`);
        }
      }
      
      catch(error){
        console.log(error);
      }
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
                control={form.control}
                name="serviceTitle"
                render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <Input placeholder="Service Title" {...field}
                        className='input-field' />
                    </FormControl>
                
                    <FormMessage />
                </FormItem>
                )}
            />
          <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <Dropdown onChangeHandler={field.onChange} value={field.value}/>
                    </FormControl>
                
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                  <FormItem className='w-full'>
                      <FormControl className='h-72'>
                          <Textarea placeholder="Description" {...field}
                          className='text-area rounded-2xl' />
                      </FormControl>
                  
                      <FormMessage />
                  </FormItem>
                  )}
          />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
              <FormItem className='w-full'>
                  <FormControl className='h-72'>
                      <FileUploader onFieldChange={field.onChange}
                        imageUrl={field.value} setFiles={setFiles}/>
                  </FormControl>
              
                  <FormMessage />
              </FormItem>
              )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <div className='flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                          <Image src="/assets/icons/location-grey.svg"
                          alt="calender"
                          width={24} height={24}/>
                          <Input placeholder="Location" {...field}
                          className='input-field' />
                        </div>
                    </FormControl>
                
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>


        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <div className='flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                          <Image src="/assets/icons/calendar.svg"
                          alt="calendar"
                          width={24} height={24}
                          className='filter-grey'
                          />
                         <p className='ml-3 whitespace-nowrap text-grey-600'>Created At</p>
                         <DatePicker selected={field.value} 
                          onChange={(date: Date) => field.onChange(date)}
                          showTimeSelect 
                          timeInputLabel='Time:'
                          dateFormat={"MM/dd/yyy h:mm aa"}
                          wrapperClassName='datePicker'
                          />
                        </div>
                    </FormControl>
                      
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <div className='flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                          <Image src="/assets/icons/dollar.svg"
                          alt="dollar"
                          width={24} height={24}
                          className='filter-grey'
                          />
                        <Input type="number" placeholder='Price' {...field}
                        className='p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'/>
                        </div>
                    </FormControl>
                      
                    <FormMessage />
                </FormItem>
                )}
            />
        {/* </div>

         

        <div className='flex flex-col gap-5 md:flex-row'> */}
         {/* <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                <FormItem className='w-full'>
                    <FormControl>
                        <div className='flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                          <Image src="/assets/icons/link.svg"
                          alt="link"
                          width={24} height={24}/>
                          <Input placeholder="URL" {...field}
                          className='input-field' />
                        </div>
                    </FormControl>
                
                    <FormMessage />
                </FormItem>
                )}
            /> */}
        <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                <FormItem className='flex'>
                    <FormControl>
                        <div className='flex items-center'>
                        <label htmlFor="isAvailable" className='whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                          Available
                        </label>
                       <Checkbox onCheckedChange={field.onChange}
                       checked={field.value}
                       id="isAvailable"  className='mr-2 h-5 w-5 border-2 border-primary-500'/>
                        </div>
                    </FormControl>
                      
                    <FormMessage />
                </FormItem>
                )}
            />

        </div>
      <Button 
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting} //in case we are already submitting the form
        className="button col-span-2 w-full"
       >
        {form.formState.isSubmitting ? 'Submitting...' : `${type} your Service`}
        </Button>
    </form>
  </Form>
  )
}

export default ServiceForm