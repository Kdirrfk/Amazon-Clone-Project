import React from 'react'

const CheckLogin = () => {
  const user_id=localStorage.getItem("user_id")
  if(user_id && user_id!==null && user_id!=='null')
  {
    return true
  }
  else{
    return false
  }
}

export default CheckLogin