import React, {useState} from "react";
import FoodMenuData from "../FoodMenuData";
import '../styles/FoodMenu.css'

// 메뉴 보여주기 위한 컴포넌트
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