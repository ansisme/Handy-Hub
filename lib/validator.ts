import { z } from "zod"
export const ServiceFormSchema = z.object({
   serviceTitle: z.string().min(3,"Title must be atleast 3 characters"),
   categoryId: z.string(),
   description: z.string().min(3,"Description must be atleast 3 characters").max(400, 'Description must be less than 400 characters'),
   
   imageUrl: z.string(),
 
   // createdBy: z.string().min(3, "Created by must be atleast 3 characters"),
   
  
   location: z.string().min(3,"Location must be atleast 3 characters").max(400, 'Location must be less than 400 characters'),
   createdAt: z.date(),
   // price:z.string(),
   price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message: "Price must be a valid number with up to two decimal places",
    }),
   // url: z.string().url(),
   isAvailable: z.boolean(),
   phoneNumber: z.string().min(10, "Phone number must be atleast 10 characters"),
  })