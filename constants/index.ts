export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Service', //create events
      route: '/service/create', //events/create
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
  ]
  
  export const serviceDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }