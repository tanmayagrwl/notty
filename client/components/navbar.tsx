import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function Navbar() {
  return (
    <section>
        <div className='w-full flex justify-between items-center px-10 pt-5'>
            <Image alt='logo' src={"/logo.svg"} width={100} height={100} />
            <Button>Create Note</Button>
        </div>
    </section>
  )
}

export default Navbar