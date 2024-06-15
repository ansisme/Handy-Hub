import React,{useEffect} from 'react'
import { Button } from '../ui/button'
import { IService } from '@/lib/database/models/service.model'
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.action';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const Checkout = ({service, userId}: {service: IService, userId: string}) => {
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
    const onCheckOut = async () => {
       const order = {
        serviceTitle: service.serviceTitle,
        serviceId: service._id,
        price: service.price,
        isAvailable: service.isAvailable,
        buyerId: userId,
       }
       await checkoutOrder(order);
    }
  return (
    <form action={onCheckOut} method="post">
        <Button type="submit" size="lg" role="link" className='button sm:w-fit'>
            {service.isAvailable ? "Book Now" : "Not Available"}
        </Button>
    </form>
  )
}

export default Checkout