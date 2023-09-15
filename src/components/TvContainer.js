import React, {useState} from "react";
import { RemoteControl } from '../components'
import YoutubeAPI from "../services/YoutubeAPI";
import "../styles/TvContainer.css"
function TvContainer({}){
    const youTubeApiData = YoutubeAPI()
    console.log(youTubeApiData)
    return(
        <>
            <div className="TvContainer">
                <div className="Tv">
                    <div>
                        <iframe width="400px" height='500px' src={`https://www.youtube.com/embed/${youTubeApiData.items[0].id.videoId}`}></iframe>
                      {/* {youTubeApiData.items.map( (youtube, id) => {
                        return (<iframe width="400px" height='500px' src={`https://www.youtube.com/embed/${youtube.id.videoId}`}/>)
                        })} */}
                    </div>
                </div>
                <RemoteControl></RemoteControl>
            </div>
       </>
    )
}

export default TvContainer