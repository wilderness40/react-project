import React, {useState, useEffect, useRef} from "react";
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
    const [slideIndex, setSlideIndex] = useState(0)
    const [bacSlideIndex, setBacSlideIndex] = useState(null)
    const youtubeContents = document.querySelectorAll('.youtube-content')
    useEffect( () => {
        const increaseIndex = () => {
            setSlideIndex(slideIndex + 1)
        }
        const TimerID = setTimeout(increaseIndex,4000)
        return () => {
            clearTimeout(TimerID)
        }
        
    })
    console.log(slideIndex)
    const slideStyle = {
        transition: "all 4s ease-in-out",
        transform: `translateX(${
            -1 * (300/youtubeContents.length * slideIndex)
        }%)`,
    }
    if(slideIndex === 8) {
        slideStyle.transition = ''

        setSlideIndex(0)

        setTimeout( ()=> {
            slideStyle.transition = "all 500ms ease-in-out"
        })
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
    // const tvShow = (e) => {
    //     const tvifram = document.querySelector('.Tv-body-container > iframe')
    //     tvifram.classList.add('hide')
    //     if (youTubeApiData.length !==0) {
    //         youTubeApiData.items.map( (youtube) => {
    //             if(e.target.src === youtube.snippet.thumbnails.medium.url) {
    //                 const movieSrc = `https://www.youtube.com/embed/${youtube.id.videoId}`
    //                 setTimeout( () => {
    //                     tvifram.classList.remove('hide')
    //                     tvifram.src = movieSrc
    //                 }, 1000)
    //             }
    //         },[])
    //     }
    // }
    return(
        <>       
            <div className="TvContainer">
                <div className="Tv">
                    <div className="Tv-body-container">
                        {/* {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, index, id) => {
                            // console.log(youtube)
                            if(index === 0) {
                                return <iframe key={id} style={iframeStyle} src={`https://www.youtube.com/embed/${youtube.id.videoId}`}/>
                            }
                        })} */}
                        <iframe style={iframeStyle} src='https://youtu.be/vrfJF5QYLfQ'/>
                    </div>
                </div>
                <div className="youtube-container">
                    {/* {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, id) => {
                        return (
                            <div key={id} className="youtube-content" >
                                <img src={youtube.snippet.thumbnails.medium.url} onClick={tvShow}/>
                                <div className="youtube-description">
                                    <span>{youtube.snippet.title}</span>
                                </div>
                            </div>
                        ) 
                    })} */}
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test1</span>
                        </div>
                    </div>
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test2</span>
                        </div>
                    </div>
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test3</span>
                        </div>
                    </div>
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test4</span>
                        </div>
                    </div>
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test5</span>
                        </div>
                    </div>
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test6</span>
                        </div>
                    </div>
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test7</span>
                        </div>
                    </div>
                    <div className="youtube-content" style={slideStyle}>
                        <img/>
                        <div className="youtube-description">
                            <span>test8</span>
                        </div>
                    </div>
                </div>
                <RemoteControl></RemoteControl>
            </div>
       </>
    )
}

export default TvContainer