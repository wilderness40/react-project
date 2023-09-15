import '../styles/Header.css'
import React, {useState} from 'react'

function Header(){
    return(
        <div className="header">
            <h5>일하자</h5>
            <div className='button-container'>
                <button>X</button>
            </div>
        </div>    
    )
}

export default Header