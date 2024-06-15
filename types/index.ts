// ====== USER PARAMS--RIGHT
export type CreateUserParams = { //changed as per my config
    clerkId: string
    email: string
    username: string
    firstName: string
    lastName: string
    // phoneNumber: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }
  
  // ====== SERVICE PARAMS--CHANGED
  export type CreateServiceParams = {
    userId: string
    service: {
      serviceTitle: string
      categoryId: string
      description: string
      imageUrl: string
      location: string
      
      createdAt: Date
      // startDateTime: Date
      // endDateTime: Date
      // createdBy: string // check for this
      
      price: string
      // url: string
      isAvailable: boolean
    }
    path: string
  }
  
 //changed as per my config
  export type UpdateServiceParams = {
    userId: string
    service: {
      _id: string
      serviceTitle: string
      imageUrl: string
      description: string
      location: string
      createdAt: Date
      categoryId: string
      price: string
      isAvailable: boolean
    }
    path: string
  }
 //changed as per my config
  export type DeleteServiceParams = {
    serviceId: string
    path: string
  }
  
  //changed as per my config
  export type GetAllServiceParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  //changed as per my config
  export type GetServicesByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  //changed as per my config
  export type GetRelatedServicesByCategoryParams = {
    categoryId: string
    serviceId: string
    limit?: number
    page: number | string
  }
  //changed as per my config - still check pending
  export type Service = {
    _id: string
    serviceTitle: string
    description: string
    price: string
    isAvailable: boolean
    imageUrl: string
    location: string
    createdAt: Date
    // endDateTime: Date
    // url: string
    createdBy: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      categoryName: string
    }
  }
  
  // ====== CATEGORY PARAMS--RIGHT
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS--RIGHT
  export type CheckoutOrderParams = {
    serviceTitle: string
    serviceId: string
    price: string
    isAvailable: boolean
    buyerId: string
  }
  //changed as per my config
  export type CreateOrderParams = {
    stripeId: string
    serviceId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
   //changed as per my config
  export type GetOrdersByServiceParams = {
    serviceId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS--RIGHT
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }