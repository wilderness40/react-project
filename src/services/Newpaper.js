import React, {useState, useEffect} from "react";

function NewsPaper() {
    const [newsData , setNewsData] = useState([]) // 빈 배열을 넣지않으면 가져온 data가 배열로 처리되지 않아 .length !==0 조건문을 사용할 수 없음
        // 뉴스 api데이터 가져오기
    const newsApiKey = process.env.REACT_APP_Newspaper_API_KEY 
    useEffect( ()=> {
            try{
            fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${newsApiKey}`)
           .then(res => res.json())
           .then(newsDatas => {
            setNewsData(newsDatas)      
                })
               } catch(err){
                console.log(err)
               }                   
 },[])
 return newsData
}
export default NewsPaper