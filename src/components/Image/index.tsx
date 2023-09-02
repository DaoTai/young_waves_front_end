import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import FallbackImg from '../../assets/images/default-fallback-image.png'
const Image = ({...props} : DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {

    if(props.src){
        return (
          <img {...props}/>
        )
       
    }

  return (
    <img
        {...props}
        src={FallbackImg}
    />
  )
}

export default Image