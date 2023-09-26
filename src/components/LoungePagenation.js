import React, {useState} from "react"
import LoungeButton from "./LoungeButton"
import LoungePageWrap from "./LoungePageWrap"

function LoungePagenation  ({page, setPage, totalPosts, limit}) {
    const numPages = Math.ceil(totalPosts / limit) // 총페이징 수
    const [btnActive, setBtnActive] = useState(0) 
    const handlePageChange = (e ,i) => {
        setPage(i+1)
        setBtnActive(i) // 버튼 활성화
    }
    return(
        <>
              
            <LoungePageWrap>
                <LoungeButton onClick={()=> setPage(page - 1)} disabled={page === 1}><span className="material-symbols-outlined">arrow_back_ios</span></LoungeButton> 
                
                {Array(numPages).fill().map((page, i)=> { // 페이지 버튼
                    return(
                        <LoungeButton
                            key={i}
                            className={ i === btnActive ? 'active' : ''} 
                            onClick={(e)=>handlePageChange(e, i)} // 페이지 클릭시
                            aria-current={page === i+1 ? 'page' : undefined} // 현재 페이지
                            > { i + 1 }
                        </LoungeButton> 
                    )
                })}
                <LoungeButton onClick={()=> setPage(page + 1)} disabled={page === numPages}><span className="material-symbols-outlined">arrow_forward_ios</span></LoungeButton>
            </LoungePageWrap>
              <span className="pagenation__text">Page {page} of {numPages}</span>
              <span className="pagenation__text">Total {totalPosts} Posts</span>
        </>
    )

}

export default LoungePagenation

