import React, {useState, useEffect} from "react";
import { RemoteControl } from '../components'
import YoutubeAPI from "../services/YoutubeAPI";
import "../styles/TvContainer.css"

function TvContainer({}){
    const youTubeApiData = YoutubeAPI()
    const iframeStyle = {
        width: "100%" ,
        height: '100%' ,
        borderRadius: '20px',
        border : 'none',
    }
    // const blindShow = (e) => {
    //     const tvifram = document.querySelector('.Tv-body-container > iframe')
    //     tvifram.classList.add('hide')
    //     const src = e.target.firstChild.src
    //     // console.log(e.target.firstChild)
    //     // console.log(src)
    //     setTimeout(() => {
    //         tvifram.classList.remove('hide')
    //         tvifram.src = src
    //     }, 1000)
    // }
    const tvShow = (e) => {
        const tvifram = document.querySelector('.Tv-body-container > iframe')
        tvifram.classList.add('hide')
        if (youTubeApiData.length !==0) {
            youTubeApiData.items.map( (youtube) => {
                if(e.target.src === youtube.snippet.thumbnails.medium.url) {
                    const movieSrc = `https://www.youtube.com/embed/${youtube.id.videoId}`
                    setTimeout( () => {
                        tvifram.classList.remove('hide')
                        tvifram.src = movieSrc
                    }, 1000)
                }
            },[])
        }
    }
    return(
        <>       
            <div className="TvContainer">
                <div className="Tv">
                    <div className="Tv-body-container">
                        {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, index, id) => {
                            // console.log(youtube)
                            if(index === 0) {
                                return <iframe key={id} style={iframeStyle} src={`https://www.youtube.com/embed/${youtube.id.videoId}`}/>
                            }
                        })}
                    </div>
                </div>
                <div className="youtube-container">
                    {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, id) => {
                        return (
                            <div key={id} className="youtube-content" >
                                <img src={youtube.snippet.thumbnails.medium.url} onClick={tvShow}/>
                                {/* <iframe width="300px" height='200px'src={`https://www.youtube.com/embed/${youtube.id.videoId}`}/> */}
                                <div className="youtube-description">
                                    <span>{youtube.snippet.title}</span>
                                </div>

                                {/* <p>{youtube.snippet.description}</p> */}
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