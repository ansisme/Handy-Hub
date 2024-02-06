// import { SignIn } from '@clerk/nextjs'
// import React from 'react'

// const SignInPage = () => {
//   return (
//     <div>
//           <SignIn/>
//     </div>
  
//   );
// }

// export default SignInPage;

import { SignIn } from '@clerk/nextjs'
export default function page(){
  return (
    <div>
      <SignIn/>
    </div>
  )
}

// export default page