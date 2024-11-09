import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'

function Class() {
    const {slug} = useParams();    
    const classData = useSelector(state => state.class.classData)
    const classInfo = classData.filter((item)=>{
      return item.classCode === slug
    })
  return (
    <div>
      {
        slug
      }
    </div>
  )
}

export default Class
