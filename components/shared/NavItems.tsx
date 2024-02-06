import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
  //to check the current active path and apply the styles
  const pathname = usePathname();
  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
        {headerLinks.map((link)=>{
            const isActive = pathname === link.route; //check if the current path is equal to the link route and style it
            return(
                <li key = {link.route} 
                className={`${
                    isActive && 'text-primary-500'
                } flex-center p-medium-16 whitespace-wrap
                `}>
                    <Link href={link.route}>
                        {link.label}
                    </Link>
                </li>
            )
        })}
    </ul>
  )
}

export default NavItems