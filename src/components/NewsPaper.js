import React from "react";
import "../styles/NewsPaper.css"


function NewsPaper() {
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
                                <img src='https://a.cdn-hotels.com/gdcs/production125/d653/a01517ea-0ec0-4639-b862-33922c62f04a.jpg' />
                            </div>    
                            <div className="left__article__text">
                                <h3 className="left__article__text__headline">왼쪽기사 헤드라인입니다. 뭐먹지.</h3>
                            </div>
                        </div>
                </article>
                <article className="center">
                    <div className="center__article">
                        <div className="center__article__img">
                            <img src='https://media.cntraveler.com/photos/63e404a09e9cb374b710214b/16:9/w_2560%2Cc_limit/GettyImages-902452584%2520(1).jpg' />
                        </div>    
                        <div className="center__article__text">
                            <h3 className="center__article__text__headline">테스트용 헤드라인입니다. 조금뒤면 점심시간이다.</h3>
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
                </article>
            </div>
            <div className="newspapaer__footer"></div>
       </div>
    )
}

export default NewsPaper