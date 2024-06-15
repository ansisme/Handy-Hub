import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getServicesByUser } from '@/lib/actions/service.action'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Profile = async () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
    const myServices = await getServicesByUser({userId, page: 1});
  return (
    <>
    {/* Hired Services */}
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex justify-center items-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'>Hired Services</h3>
            <Button asChild size="lg" className='button hidden sm:flex'>
                <Link
                href="/#services"
                className=''>
                    Discover More Services
                </Link>
            </Button>
        </div>
    </section>
  
    {/* <section className='wrapper my-8'>
    <Collection
          data={services?.data}
          emptyTitle="You have not hired any services yet"
          emptyStateSubtext="Explore our services and hire a professional today!"
          collectionType="My_Services"
          limit={3}
          page={1}
          urlParamName='ordersPage'
          totalPages={2}
        />
    </section> */}

      {/* Provided Services */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex justify-center items-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'>My Services</h3>
            <Button asChild size="lg" className='button hidden sm:flex'>
                <Link
                href="/services/create"
                className=''>
                    Create a New Service
                </Link>
            </Button>
        </div>
    </section>
    <section className='wrapper my-8'>
    <Collection
          data={myServices?.data}
          emptyTitle="You have not provided any services yet"
          emptyStateSubtext="Create a new service and start earning today!"
          collectionType="My_Services"
          limit={6}
          page={1}
          urlParamName='servicesPage'
          totalPages={2}
        />
    </section>
    </>
  )
}

export default Profile