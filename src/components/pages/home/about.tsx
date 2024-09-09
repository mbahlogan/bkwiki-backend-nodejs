import React from 'react'
import Banner from './banner'
import Image from 'next/image'

export default function About() {
  return (
      <div className=" py-12 relative bg-white ">
        <div className="absolute lg:right-0 hidden lg:block top-14 right-0  z-0  bg-red-500 bg-cover bg-no-repeat">
          <Image
            className="object-cover bg-green-500 "
            alt=""
            src="/assets/track-homepage-shapes-ecd2b1bbb590a36840168e4bdd6e283d8c48b43da40cb6802f995d01de6d0a3d.png"
            height={10}
            width={600}
          />
        </div>
        <Banner />
      </div> 
  )
}
