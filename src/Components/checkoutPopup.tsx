import "../StylingSheets/popup.css"
import "../Pages/index.css"




export function checkoutPopup (){




    function ImageErrorHandler(event: React.SyntheticEvent<HTMLImageElement, Event>){
        const targetEvent = event.target as HTMLImageElement;
        targetEvent.src="https://via.placeholder.com/150";
        
    }


    return(
        <div className="form-popup">
            <div>
                <img className="product-image"
                    alt="PlaceholderImage" 
                    onError={ImageErrorHandler}/>
                <p> Do you want to upgrade? </p>

                <div className="form-button-div">
                    <div className="form-button-div">
                        <button className="add-to-cart-button" onClick={props.closePopUp}> Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )

}






