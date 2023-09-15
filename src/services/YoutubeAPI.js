import React, {useState, useEffect} from "react";
function YoutubeAPI() {
    const [youTubeData , setYouTubeData] = useState([])
    const API_KEY = process.env.REACT_APP_Youtube_API_KEY;
    useEffect( ()=> {
        fetch(`https://www.googleapis.com/youtube/v3/search?&key=${API_KEY}&part=snippet&type=video&q=dog`)
        .then(res => res.json())
        .then(response => {
            // console.log(response)
            setYouTubeData(response)
        })
    },[])
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