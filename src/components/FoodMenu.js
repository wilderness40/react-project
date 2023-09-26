import React from "react";
import FoodMenuData from "../FoodMenuData";
function FoodMenu({addActive}) {
    return (
        <div className="mapinfo-taplist">
            <ul>
                {FoodMenuData.map ( (data, index) => {
                    return (
                        <div key={index}>
                            <li onClick={addActive}>
                                <span className="material-symbols-outlined">
                                    {data.iconTitle}
                                </span>
                                <span>{data.title}</span>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}
export default FoodMenu