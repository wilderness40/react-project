import React, {useState, useRef, useEffect} from "react";
import axios from 'axios'
import FoodDiscription from "./FoodDiscription"
import '../styles/FoodList.css'
function FoodList ({FoodList}) {
    console.log(FoodList)
    const [discriptionState , setDiscriptionState] = useState(null)
    const [discription, setDiscription] = useState([])
    const [open , setOpen] = useState('')
    const showDiscription = (e, list, index) => {
            setDiscription(list)
            setDiscriptionState(index)
            setOpen('open')
    }
    return (
        <>
        <div className="foodlist-container">
            <div className="foodlist-container-box">
                <div className="foodlist-container-boxBody">
                    <div className="foodlist-container-boxTitle">
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
                                        <div className="foodlist-call">
                                            <span className="material-symbols-outlined">
                                                deskphone
                                            </span>
                                            <span>{list.TELNO}</span>
                                        </div>
                                    </div>
                                    {discriptionState === index ? 
                                        <FoodDiscription 
                                            key={list.SD_ID}
                                            foodData={discription}
                                            state={discriptionState}
                                            num={index}
                                            open={open}>
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