export default function FireWork() {
  return (
    <>
    <div className='absolute [&_div]:before:animate-[explosion_2s_infinite] -top-[30%] -right-[20%] scale-[0.8]'>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
    </div>
    <div className='absolute [&_div]:before:animate-[explosion_2s_infinite_600ms] top-[30%] -left-[40%] scale-[0.6]'>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
    </div>
    <div className='absolute [&_div]:before:animate-[explosion_2s_infinite_200ms] bottom-[40%] right-0 scale-[0.4]'>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
      <div className="explosion"></div>
    </div>
    </>
  )
}