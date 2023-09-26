import React from "react";
import '../styles/LoungeButton.css'

function LoungeButton({key, onClick, children, className, disabled, ariaCurrent}){

    return(
        <>
            <button 
                onClick={onClick} 
                className={`pagenation-btn ${className}`} 
                disabled={disabled} 
                ariaCurrent={ariaCurrent} 
                >
                {children}
            </button>
        </>
    )
}

export default LoungeButton