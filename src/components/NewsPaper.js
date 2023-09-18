import React, {useEffect, useState} from "react";
import "../styles/NewsPaper.css"
import NewsPapers from "../services/Newpaper"

function NewsPaper() {
    // 헤더 우측 날짜관련 변수
    const data = NewsPapers()
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();   
    const day = today.getDay(); 
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    console.log(data.articles)
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
                                <img src='https://a.cdn-hotels.com/gdcs/production125/d653/a01517ea-0ec0-4639-b862-33922c62f04a.jpg' />
                            </div>    
                            <div className="left__article__text">
                                <h3 className="left__article__text__headline">왼쪽기사 헤드라인입니다. 뭐먹지.</h3>
                            </div>
                        </div>
                    <div className="left__article__sub">
                        <div className="left__article__sub__img">
                            <img src='https://a.cdn-hotels.com/gdcs/production125/d653/a01517ea-0ec0-4639-b862-33922c62f04a.jpg' />
                        </div>    
                        <div className="left__article__sub__text">
                            <h3 className="left__article__sub__text__headline">왼쪽기사 헤드라인입니다. 뭐먹지.</h3>
                        </div>
                    </div>    
                </article>
                <article className="center">
                    <div className="center__article">
                        <div className="center__article__img">
                            <img src='zz'/>
                        </div>    
                        <div className="center__article__text">
                            {/* {data.articles.length !== 0 && data.articles.map( (data, index) => {
                                if(index===0) {
                                    return <h3 className="center__article__text__headline">{data[0].title}</h3>
                                    
                                }
                            })} */}
                        </div>
                    </div>
                    <div className="center__article__sub">
                        <div className="center__article__sub__img">
                            <img src='https://static01.nyt.com/images/2023/03/28/multimedia/00skorea-japan-explainer-01-wpcf/00skorea-japan-explainer-01-wpcf-videoSixteenByNine3000.jpg' />
                        </div>    
                        <div className="center__article__sub_text">
                            <h3 className="center__article__sub__text__headline">서브기사 헤드라인 자리, 이곳에 서브기사 헤드라인이 노출됩니다.</h3>
                        </div>
                    </div>  
                </article>
                <article className="right">
                    <div className="right__article">
                                <div className="right__article__img">
                                    <img src='https://www.state.gov/wp-content/uploads/2023/07/shutterstock_656695444v2.jpg' />
                                </div>    
                                <div className="right__article__text">
                                    <h3 className="right__article__text__headline">오른쪽기사 헤드라인입니다. 배고프다</h3>
                                </div>
                            </div>
                    <div className="right__article__sub">
                        <div className="right__article__sub__img">
                            <img src='https://www.state.gov/wp-content/uploads/2023/07/shutterstock_656695444v2.jpg' />
                        </div>    
                        <div className="right__article__sub__text">
                            <h3 className="right__article__sub__text__headline">오른쪽기사 헤드라인입니다. 배고프다</h3>
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