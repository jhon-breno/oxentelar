"use client"
import React from "react"
import { useTypewriter, Cursor } from "react-simple-typewriter"

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Seu lugarzinho na palma da mão.",
      "Comonidade, tranquilidade e agilidade.",
      "Sem burocracia das imobiliárias.",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  })
  return (
    <div className="bg-banner-bg mx-auto mt-2 flex h-96 !w-full flex-col items-center justify-center rounded-lg bg-center bg-no-repeat">
      <h1 className="text-2xl font-bold uppercase text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)] md:text-4xl">
        Locação arretada é aqui !
      </h1>
      <p className="mt-8 font-semibold text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)] md:text-lg">
        {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
      </p>
    </div>
  )
}

export default Banner
