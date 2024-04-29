import { memo } from "react";
import placeHolder from "../Data/150.png"

interface imagehandlerProps {
  url: string | null;
}


function ImageErrorHandler(event: React.SyntheticEvent<HTMLImageElement, Event>){
  const targetEvent = event.target as HTMLImageElement;
  targetEvent.src=placeHolder;
}


export const ImageHandler = memo(function ImageHandler1(props: imagehandlerProps){
  if(props.url!==null){
    return (        
      <img className="product-image"
      src={props.url}
      alt="Image of the product"
      onError={ImageErrorHandler}/>
    )
  }else{
    return (        
      <img className="product-image"
      src={placeHolder}
      alt="Placeholder for product image"/>
    )
  }

});
 
