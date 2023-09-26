import React, {useState} from "react";
import FoodMenuData from "../FoodMenuData";
import '../styles/FoodMenu.css'
function FoodMenu({addActive}) {
    return (
        <>
            <div className="foodMenu-taplist">
                <ul>
                    {FoodMenuData.map ( (data, index) => {
                        return (
                            <div key={index}>
                                <li onClick={addActive}>
                                    <span className="material-symbols-outlined">
                                        {data.iconTitle}
                                    </span>
                                    <span>
                                        {data.title}
                                    </span>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
export default FoodMenu