import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <h1 className='text-4xl'>HandyHub</h1>
      <Button className='bg-destructive'>Delete</Button>
    </main>
  )
}