import React, {useState} from "react";
import { RemoteControl } from '../components'
<<<<<<< HEAD
=======
import YoutubeAPI from "../services/YoutubeAPI";
import "../styles/TvContainer.css"
>>>>>>> 4e58def85adf17ba98d5330e5fe7f282b78eb7d4

function TvContainer({}){
    const youTubeApiData = YoutubeAPI()
    const iframeStyle = {
        width: "100%" ,
        height: '100%' ,
        borderRadius: '20px',
        border : 'none',
    }
    console.log(youTubeApiData)
    const blindShow = (e) => {
        const tvifram = document.querySelector('.Tv-body-container > iframe')
        tvifram.classList.add('hide')
        const src = e.target.children[0].src
        setTimeout(() => {
            tvifram.classList.remove('hide')
            tvifram.src = src
        }, 1000)
        console.log(e.target.children[0].src)
    }
    return(
        <>       
            <div className="TvContainer">
                <div className="Tv">
                    <div className="Tv-body-container">
                        {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, index, id) => {
                            console.log(youtube)
                            if(index === 0) {
                                return <iframe key={id} style={iframeStyle} src={`https://www.youtube.com/embed/${youtube.id.videoId}`}></iframe>
                            }
                        })}
                    </div>
                </div>
                <div className="youtube-container">
                    {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, id) => {
                        return (
                            <div key={id} className="youtube-content" onClick={blindShow} >
                                <iframe width="200px" height='200px'src={`https://www.youtube.com/embed/${youtube.id.videoId}`}/>
                                <span>{youtube.snippet.channelTitle}</span>
                            </div>
                        ) 
                    })}
                </div>
                <RemoteControl></RemoteControl>
            </div>
       </>
    )
}

export default TvContainer