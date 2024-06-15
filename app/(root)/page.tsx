import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllServices } from '@/lib/actions/service.action';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({searchParams}: SearchParamProps) {
  const page = Number(searchParams?.page || 1);
  const searchText = searchParams?.query as string || '';
  const category = searchParams?.category as string || '';
  const services=await getAllServices({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
   <>
      <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className='h1-bold max-sm:text-xl'>Connecting Needs with Expertise: Your Trusted Home's Toolbox</h1>
            <p className='p-regular-16 md:p-regular-20 text-[#787878] max-sm:text-sm'>
            Elevate your living with our skilled community. We fix, repair, and maintain, ensuring homes stay at their best. Join us where craftsmanship meets care, turning houses into homes with expertise to share.
            </p>
            <Button size="lg" asChild className='button w-full sm:w-fit'>
              <Link href="#services" className='max-sm:text-sm'>
                Find Handyman Now
              </Link>
            </Button>
          </div>
          <Image 
          src='/assets/images/hero.png' 
          width={500}
          height={500} 
          alt='HandyHub Hero Image'
          className='max-h-[70vh] object-contain object-center 2xl:max-h-50vh' />

        </div>
      </section>
      <section id="services" className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={services?.data}
          emptyTitle="No services found"
          emptyStateSubtext="Please check back later"
          collectionType="All_Services"
          limit={6}
          page={page}
          totalPages={services?.totalPages}
        />
      </section>
     
   </>
  )
}

