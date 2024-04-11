import "../StylingSheets/popup.css"

type popuptForUpsellProductprops={
    closePopUp: ()=>void;

} 

export function PopUpForUpsellProduct(props:popuptForUpsellProductprops){
    return(<div className="form-popup">
        <p> This is a popupBox</p>
        <p></p>
        <button onClick={props.closePopUp}> Close box</button>
        <button> Upgrade</button>
        </div>)
}

