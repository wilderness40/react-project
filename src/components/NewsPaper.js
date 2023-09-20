import React, {useState } from "react";
import "../styles/NewsPaper.css"
import NewsPaperAPI from "../services/NewspaperAPI"
import { NewsPaperHeadline } from "../components"


function NewsPaper({}) {
    // 헤더 우측 날짜관련 변수
    const data = NewsPaperAPI()
    const news = data[0]
    const techNews = data[1]
    const sportsNews = data[2]

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();   
    const day = today.getDay(); 
    const days = ['일', '월', '화', '수', '목', '금', '토'];
  
    const [selectedNews, setSelectedNews] = useState(null)

    const showDetailArticle = (e) => {
      const selectedNews = 
      techNews.find((news) => news.urlToImage === e.target.src || news.title === e.target.innerText) 
      || news.find((news) => news.urlToImage === e.target.src || news.title === e.target.innerText)
      || sportsNews.find((news) => news.urlToImage === e.target.src || news.title === e.target.innerText)
      setSelectedNews(selectedNews)
      console.log(selectedNews)
  }

    return (
       <div className="newspapaer">
{/* 헤더부분 */}
            <div className="newspapaer__header">
               <h1>세상에 이런 일이</h1>
                <div className="date-information">
                    <span>{`${year}-${month}-${date}(${days[day]})`}</span>
                    </div>
            </div>

{/* 본문부분 */}
{selectedNews ? 
 window.location.href = selectedNews.url // 해당기사 출처 본문으로 이동
: <NewsPaperHeadline showDetailArticle={showDetailArticle}></NewsPaperHeadline>
} 
          

{/* 푸터영역 */}
            <div className="newspapaer__footer">
                <div className="newspapaer__footer__left">
                    <h3>세상에 이런 일이</h3>
                    <div className="icon-links"></div>
                    <div className="site-information">
                        <p>Email : email@email.com</p>
                        <p>API Source : NewsApi.org</p>
                        <p>Publisher : Kwon | Jihun | Seunghyun</p>
                        <p>Copyright © React-Team All rights reserved.</p>
                    </div>
                </div>
                <div className="newspapaer__footer__right">
                    <ul>
                        <li className="About">About Us</li>
                        <li>History</li>
                        <li>Contact Us</li>
                    </ul>

                    <ul>
                        <li className="Service">Service</li>
                        <li>How to Use</li>
                        <li>Terms of Service</li>
                    </ul>

                    <ul>
                        <li className="Policy">Policy</li>
                        <li>Copyright Policy</li>
                    </ul>
                </div>
            </div>
       </div>
    )
}

export default NewsPaper