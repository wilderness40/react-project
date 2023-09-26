import React, {useState, useRef} from "react";
import axios from 'axios'
import FoodDiscription from "./FoodDiscription"
function FoodList ({FoodList}) {
    const [discriptionState , setDiscriptionState] = useState(null)
    const [discription, setDiscription] = useState([])
    const showDiscription = (e, list, index) => {
        console.log(e.target)
        setDiscription(list)
        setDiscriptionState(index)
        e.preventDefault()
    }
    return (
        <>
        <div className="mapinfo-container">
            <div className="mapinfo-container-box">
                <div className="mapinfo-container-boxBody">
                    <div className="mapinfo-container-boxTitle">
                        {FoodList.length !==0 && FoodList.data.map( (list, index) => {
                            return (
                                <div key={list.REST_ID} className='foodlist-contents' 
                                onClick={(e) => showDiscription(e, list, index)}>
                                    <div className="foodlist-title">
                                        <h3>{list.REST_NM}</h3>
                                        <span>{list.TOB_INFO}</span>
                                    </div>
                                    <div className="foodlist-body">
                                        <div className="foodlist-adress">
                                            <span className="material-symbols-outlined">
                                                location_on
                                            </span>
                                            <span>{list.ADDR}</span>
                                        </div>
                                        <div className="foodlist-time">
                                            <span className="material-symbols-outlined">
                                                Schedule
                                            </span>
                                            <span>{list.OPEN_HR_INFO}</span>
                                        </div>
                                    </div>
                                    {discriptionState === index ? 
                                        <FoodDiscription 
                                            key={list.SD_ID}
                                            foodData={discription}
                                            state={discriptionState}
                                            num={index}>
                                        </FoodDiscription> 
                                        : null
                                    }
                                </div>
                                ) 
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default FoodList