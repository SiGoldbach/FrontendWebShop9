interface imagehandlerProps {
  url: string | null;
}


function ImageErrorHandler(event: React.SyntheticEvent<HTMLImageElement, Event>){
  const targetEvent = event.target as HTMLImageElement;
  targetEvent.src="https://via.placeholder.com/150";
}


export function ImageHandler(props: imagehandlerProps){
  if(props.url!=null){
    return (        
      <img className="product-image"
      src={props.url}
      alt="Image of the product"
      onError={ImageErrorHandler}/>
    )
  }else{
    return (        
      <img className="product-image"
      src={"https://via.placeholder.com/150"}
      alt="Placeholder for product image"/>
    )
  }
}
 
