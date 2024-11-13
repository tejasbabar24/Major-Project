import React from 'react'
import filelogo from '../noticeboard/filelogo.png'

function AttendanceCard({date , name}) {
  return (
    <div className=' border border-neutral-950  w-36 h-36 rounded-xl  flex justify-center items-center flex-col' >
      <div className=' flex rounded-full border w-16 h-16 border-neutral-950 mt-2 justify-center items-center bg-emerald-300'>
            <img src={filelogo} alt="" className='h-12 w-12' />
      </div>
      <div>
        <h1 className='text-md'>{name}</h1>
        <p>Date: {date}</p>
      </div>
    </div>
  ) 
}

export default AttendanceCard
