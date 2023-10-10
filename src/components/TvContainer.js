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
    const [slideIndex, setSlideIndex] = useState(0)
    const [bacSlideIndex, setBacSlideIndex] = useState(null)
    const youtubeContents = document.querySelectorAll('.youtube-content')
    useEffect( () => { // 3초마다 슬라이드가 이동하는 코드
        const increaseIndex = () => {
            setSlideIndex(slideIndex + 1)
        }
        const TimerID = setTimeout(increaseIndex,3000)
        return () => {
            clearTimeout(TimerID)
        }
        
    },[slideIndex])
    console.log(slideIndex)
    const slideStyle = { // 슬라이드 애니메이션
        transition: "all 1s ease-in-out",
        transform: `translateX(${
            -1 * (youtubeContents.length * slideIndex)
        }%)`,
    }
    if(slideIndex === 7) {
        slideStyle.transition = ''

        setSlideIndex(0)

        setTimeout( ()=> {
            slideStyle.transition = "all 500ms ease-in-out"
        })
    }
    const tvShow = (e) => { // 리스트를 누르면 윗상단에 있는 tv에 누른 리스트가 보여지는 함수
        const tvifram = document.querySelector('.Tv-body-container > iframe')
        tvifram.classList.add('hide')
        if (youTubeApiData.length !==0) {
            youTubeApiData.items.map( (youtube) => {
                if(e.target.src === youtube.snippet.thumbnails.medium.url) {
                    const movieSrc = `https://www.youtube.com/embed/${youtube.id.videoId}`
                    setTimeout( () => {
                        tvifram.classList.remove('hide')
                        tvifram.src = movieSrc
                    }, 5000)
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
                        {/* <iframe style={iframeStyle} src='https://youtu.be/vrfJF5QYLfQ'/> */}
                    </div>
                </div>
                <div className="youtube-container">
                    {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, id) => {
                        return (
                            <div key={id} className="youtube-content" style={slideStyle}>
                                <img src={youtube.snippet.thumbnails.medium.url} onClick={tvShow}/>
                                <div className="youtube-description">
                                    <span>{youtube.snippet.title}</span>
                                </div>
                            </div>
                        ) 
                    })}
                </div>
                <RemoteControl></RemoteControl>
            </div>
       </>
    )
}

export default React.memo(TvContainer)