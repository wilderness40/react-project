import React, {useState} from "react";
import NewsPaperAPI from "../services/NewspaperAPI"

function NewpaperArticle({showDetailArticle}){
    // 헤더 우측 날짜관련 변수
    const data = NewsPaperAPI()
    const news = data[0]
    const techNews = data[1]
    const sportsNews = data[2]

    return(
        <>
{/* 본문부분 */}
<div className="newspapaer__body">
{/* 좌측기사 */}
                <article className="left">
                    <div className="left__article">
                            <div className="left__article__img">
                            <img src={data.length !==0 && techNews[0].urlToImage ? techNews[0].urlToImage : 'https://dummyimage.com/450x250/'} onClick={showDetailArticle}/>
                            </div>    
                            <div className="left__article__text">
                                <h3 className="left__article__text__headline" onClick={showDetailArticle}>{data.length !==0 && techNews[0].title} </h3>
                            </div>
                        </div>
{/* 좌측기사-서브 */}
                    <div className="left__article__sub">
                        <div className="left__article__sub__content">
                        {data.length !== 0 ? (
                            techNews.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} onClick={showDetailArticle}/>
                                <h3 className="left__article__sub__text__headline" onClick={showDetailArticle}>{item.title}</h3>
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
{/* 중앙기사  */}
                <article className="center">
                    <div className="center__article">
                        <div className="center__article__img"> 
                            <img src={data.length !==0 && news[0].urlToImage ? news[0].urlToImage : 'https://dummyimage.com/600x300/'} onClick={showDetailArticle}/>
                        </div>    
                        <div className="center__article__text">
                        <h3 className="center__article__text__headline" onClick={showDetailArticle}>{data.length !==0 && news[0].title}</h3>
                        </div>
                    </div>
{/* 중앙기사 - 서브 */}
                    <div className="center__article__sub">
                    <div className="center__article__sub__content">
                        {data.length !== 0 ? (
                            news.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} onClick={showDetailArticle} />
                                <h3 className="center__article__sub__text__headline" onClick={showDetailArticle}>{item.title}</h3>
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
{/* 우측기사  */}
                <article className="right">
                    <div className="right__article">
                                <div className="right__article__img">
                                    <img src={data.length !==0 && sportsNews[0].urlToImage ? sportsNews[0].urlToImage : 'https://dummyimage.com/450x250/'} onClick={showDetailArticle}/>
                                </div>    
                                <div className="right__article__text">
                                    <h3 className="right__article__text__headline" onClick={showDetailArticle}>{data.length !==0 && sportsNews[0].title}</h3>
                                </div>
                            </div>
{/* 우측기사 - 서브 */}
                    <div className="right__article__sub">
                        <div className="right__article__sub__content">
                        {data.length !== 0 ? (
                            sportsNews.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} onClick={showDetailArticle}/>
                                <h3 className="right__article__sub__text__headline" onClick={showDetailArticle}>{item.title}</h3>
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
            </>
    )
}

export default NewpaperArticle