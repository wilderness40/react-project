import React, {useEffect , useState} from "react";

function FoodSearchComponent({FoodList}) {
    return (
        <div key={FoodList.data.REST_ID} className='foodlist-contents'>
            <div className="foodlist-title">
                <h3>{FoodList.data.REST_NM}</h3>
                <span>{FoodList.data.TOB_INFO}</span>
            </div>
            <div className="foodlist-body">
                <span>{FoodList.data.ADDR}</span>
                <span>{FoodList.data.OPEN_HR_INFO}</span>
            </div>
        </div>
    )
}
export default FoodSearchComponent