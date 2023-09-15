import React, {useState, useEffect} from "react";
import axios from "axios"
function YoutubeAPI() {
    const [youTubeData , setYouTubeData] = useState([])
    const API_KEY = process.env.REACT_APP_Youtube_API_KEY;
    // const getApidata = async () => {
    //     const apiData = await axios.get(`https://www.googleapis.com/youtube/v3/search?&key=${API_KEY}&part=snippet&type=video&q=dog`)
    //     // console.log(apiData)
    //         setYouTubeData(apiData.data)
    // }
    useEffect( ()=> {
        fetch(`https://www.googleapis.com/youtube/v3/search?&key=${API_KEY}&part=snippet&type=video&q=dog`)
        .then( res => res.json())
        .then(response => {
            // console.log(response)
            setYouTubeData(response)
        })
        // getApidata()
    },[])
    // console.log(youTubeData)
    // const data = youTubeData
    // console.log(data)
    // console.log(youTubeData.items)
    // return (
    //     <>
    //         <div>
    //             {youTubeData.items.map( (youtube, id) => {
    //                 return (
    //                     <iframe width="400px" height='500px' src={`https://www.youtube.com/embed/${youtube.id.videoId}`}>

    //                     </iframe>
    //                 )
    //             })}

    //         </div>
    //     </>
    // )
    return youTubeData
}

export default YoutubeAPI