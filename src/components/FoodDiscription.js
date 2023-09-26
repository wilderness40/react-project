import React from 'react'
import "../styles/animation.css"
function FoodDiscription ({foodData, state, num, open}) {
    console.log(open)
    return (
        <>
            <div className={`food-discription ${open}`}>
                <ul>
                    {foodData.MENU_KORN_NM.map( (data, index) => {
                        if(index <= 5) {
                            return (
                                <li>{data} / {foodData.MENU_AMT[index]}</li>
                            )
                        }
                    })}
                </ul>
            </div>
        </>
    )
}

export default FoodDiscription