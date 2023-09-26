import React from 'react'

function FoodDiscription ({foodData, state, num}) {
    console.log(foodData)
    return (
        <>
            {/* {state ?  */}
                <div className='food-discription'>
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
            {/* : null } */}
        </>
    )
}

export default FoodDiscription