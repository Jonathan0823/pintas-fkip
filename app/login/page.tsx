import BackButton from '@/components/BackButton'
import Footer from '@/components/Footer'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div><div className="w-full bg-[rgb(204,180,156)]">
    <div className="md:max-w-md mx-auto">
      <div
        style={{
          backgroundImage: "url(/bg/login_bg.png)",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
        }}
        className="w-full flex flex-col justify-center items-center relative"
      >
        <Image
          src="/unsikalogo.png"
          alt="unsika"
          width={100}
          height={100}
          className="absolute top-2 w-20"
        />
        <BackButton className='text-[#997c5c] text-5xl absolute top-16 left-5' />
        <div className="text-white text-center">
          <h1>PINTAS FKIP</h1>
          <h2>(PEMINJAMAN FASILITAS)</h2>
          <h2>FKIP UNSIKA</h2>
        </div>
      </div>
      <Footer color=""/>
    </div>
  </div></div>
  )
}

export default Page