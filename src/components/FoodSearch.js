import React from "react";

function FoodSearch({keywordSearch}) {
    return (
        <div className="foodSearch-container">
            <div className="foodSearch-body">
                <input type="text" className="keyword" placeholder="가게명을 입력해주세요"></input>
                <button className="searchBtn" onClick={keywordSearch}>검색</button>
            </div>
        </div>
    )
}
export default FoodSearch