import React from "react";
import FoodMenuData from "../FoodMenuData";
function FoodMenu({addActive}) {
    return (
        <div class="mapinfo-taplist">
            <ul>
                {FoodMenuData.map ( (data, index) => {
                    return (
                        <div key={index}>
                            <li onClick={addActive}>
                                <span class="material-symbols-outlined">
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