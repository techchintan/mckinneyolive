import React from 'react'
import Image from 'next/image'

interface HeroProps {
  src: string
  alt: string
  width?: number
  height?: number
}

const Hero = ({ src, alt, width, height }: HeroProps) => (
  <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
    <Image
      src={src}
      alt={alt}
      fill
      priority
      style={{ objectFit: 'cover' }}
      sizes="100vw"
    />
  </div>
)

export default Hero
