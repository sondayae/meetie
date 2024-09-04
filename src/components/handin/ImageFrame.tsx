import Image from 'next/image'

export default function ImageFrame({size='big', src, alt}: {size?: string, src: string, alt: string}) {
  return (
    <>
    {size === 'big' ? (
      <div className='relative aspect-video rounded-lg overflow-hidden border border-[#E9E9E9]'>
        <Image
          priority
          src={src}
          alt={alt}
          fill
          className='object-cover'
        />
      </div>
    ):(
      <div className='relative w-[82px] aspect-square rounded-lg overflow-hidden border border-[#E9E9E9]'>
        <Image
          priority
          src={src}
          alt={alt}
          fill
          className='object-cover'
        />
      </div>
    )}
  </>
  )
}