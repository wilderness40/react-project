import React from "react";

function FoodList ({FoodList}) {
    console.log(FoodList)
    return (
        <>
        <div class="mapinfo-container">
            <div class="mapinfo-container-box">
                <div class="mapinfo-container-boxBody">
                    <div class="mapinfo-container-boxTitle">
                        {FoodList.length !==0 && FoodList.data.map( (list, index) => {
                                return (
                                    <div key={list.REST_ID} className='foodlist-contents'>
                                        <div className="foodlist-title">
                                            <h3>{list.REST_NM}</h3>
                                            <span>{list.TOB_INFO}</span>
                                        </div>
                                        <div className="foodlist-body">
                                            <span>{list.ADDR}</span>
                                            <span>{list.OPEN_HR_INFO}</span>
                                        </div>
                                    </div>
                                )
                        })}
                    </div>
                    {/* <div class="mapinfo-container-boxDescript">
                        <span>{FoodList.data[0].RPRS_MENU_NM}</span>
                    </div> */}
                </div>
            </div>
        </div>
        </>
    )
}
export default FoodList