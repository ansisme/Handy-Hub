export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Service', //create services
      route: '/services/create', //services/create
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
  ]
  
  //need to be changed
  export const serviceDefaultValues = {
    serviceTitle: '',
    description: '',
    location: '',
    imageUrl: '',
    categoryId: '',
    createdBy: '',
    price: '',
    isAvailable: false,
    // url: '',
    phoneNumber: '',
    createdAt: new Date(),
  }