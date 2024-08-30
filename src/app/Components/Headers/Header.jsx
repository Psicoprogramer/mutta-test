'use client'
import Image from "next/image"
import Link from "next/link"
import Search from "../Inputs/Search";
import { useState } from "react";

const Header = () => { 

  return (
    <>
    <div className=' flex bg-white w-full h-12'>
        <Image  src ='/Pokebola.png'
                width={50}
              height={50} >
        </Image>
       <div className="flex w-full items-center justify-evenly">
            <Link href ={'/Home' } >Home</Link>
            <Link href ={'/Buscar'} >Pokemos</Link>
            <Link href ={'/Comparar'} >Comparar</Link>
            <Link href ={'/Favoritos'}>Favoritos</Link>
       </div>
    </div>
    </>
  )
}

export default Header