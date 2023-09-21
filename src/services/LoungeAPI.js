import React, {useState, useEffect} from "react";

function LoungeAPI(){
    const [lounge, setLounge] = useState([])
    //  lounge api key 없어도 되는건가?
    useEffect(() => {
        const fetchData = async () => {
            try{
        const response = await fetch('http://127.0.0.1:5300/lounge', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const loungeData = await response.json()
        setLounge(loungeData)
        console.log(lounge)
    }
catch(err){
        console.log(err)
    }
}
fetchData()
}, [])
    return lounge
}

export default LoungeAPI