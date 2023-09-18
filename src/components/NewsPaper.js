import React, {useEffect, useState} from "react";
import "../styles/NewsPaper.css"
import NewsPaperAPI from "../services/NewspaperAPI"

function NewsPaper() {
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


    return (
       <div className="newspapaer">
            <div className="newspapaer__header">
               <h1>세상에 이런 일이</h1>
                <div className="date-information">
                    <span>{`${year}-${month}-${date}(${days[day]})`}</span>
                    </div>
            </div>
            <div className="newspapaer__body">
                <article className="left">
                    <div className="left__article">
                            <div className="left__article__img">
                            <img src={data.length !==0 && techNews[0].urlToImage ? techNews[0].urlToImage : 'https://dummyimage.com/450x250/'}/>
                            </div>    
                            <div className="left__article__text">
                                <h3 className="left__article__text__headline">{data.length !==0 && techNews[0].title}</h3>
                            </div>
                        </div>
                    <div className="left__article__sub">
                        <div className="left__article__sub__content">
                        {data.length !== 0 ? (
                            techNews.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} />
                                <h3 className="left__article__sub__text__headline">{item.title}</h3>
                                </div>
                            ) : (
                                <div key={index}>
                                <img src="https://dummyimage.com/150x100/" alt="사진을 가져오는 중입니다" />
                                <h3 className="left__article__sub__text__headline">{item.title}</h3>
                                </div>
                            );
                            })
                        ) : (
                            <div>
                            <img src="https://dummyimage.com/150x100/" alt="사진을 가져오는 중입니다" />
                            <h3 className="left_article_sub_text_headline">데이터를 가져오는 중입니다.</h3>
                            </div>
                        )}
                        </div>
                    </div>    
                </article>
                <article className="center">
                    <div className="center__article">
                        <div className="center__article__img"> 
                            <img src={data.length !==0 && news[0].urlToImage ? news[0].urlToImage : 'https://dummyimage.com/600x300/'}/>
                        </div>    
                        <div className="center__article__text">
                        <h3 className="center__article__text__headline">{data.length !==0 && news[0].title}</h3>
                        </div>
                    </div>
                    <div className="center__article__sub">
                    <div className="center__article__sub__content">
                        {data.length !== 0 ? (
                            news.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} />
                                <h3 className="center__article__sub__text__headline">{item.title}</h3>
                                </div>
                            ) : (
                                <div key={index}>
                                <img src="https://dummyimage.com/150x100/" alt="사진을 가져오는 중입니다" />
                                <h3 className="center__article__sub__text__headline">{item.title}</h3>
                                </div>
                            );
                            })
                        ) : (
                            <div>
                            <img src="https://dummyimage.com/150x100/" alt="사진을 가져오는 중입니다" />
                            <h3 className="center_article_sub_text_headline">데이터를 가져오는 중입니다.</h3>
                            </div>
                        )}
                        </div>
                    </div>  
                </article>
                <article className="right">
                    <div className="right__article">
                                <div className="right__article__img">
                                    <img src={data.length !==0 && sportsNews[0].urlToImage ? sportsNews[0].urlToImage : 'https://dummyimage.com/450x250/'}/>
                                </div>    
                                <div className="right__article__text">
                                    <h3 className="right__article__text__headline">{data.length !==0 && sportsNews[0].title}</h3>
                                </div>
                            </div>

                    <div className="right__article__sub">
                        <div className="right__article__sub__content">
                        {data.length !== 0 ? (
                            sportsNews.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} />
                                <h3 className="right__article__sub__text__headline">{item.title}</h3>
                                </div>
                            ) : (
                                <div key={index}>
                                <img src="https://dummyimage.com/150x100/" alt="사진을 가져오는 중입니다" />
                                <h3 className="right__article__sub__text__headline">{item.title}</h3>
                                </div>
                            );
                            })
                        ) : (
                            <div>
                            <img src="https://dummyimage.com/150x100/" alt="사진을 가져오는 중입니다" />
                            <h3 className="right_article_sub_text_headline">데이터를 가져오는 중입니다.</h3>
                            </div>
                        )}
                        </div>
                    </div>    
                </article>
            </div>

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