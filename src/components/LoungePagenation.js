import React, {useState, useEffect} from "react"
import LoungeButton from "./LoungeButton"
import LoungePageWrap from "./LoungePageWrap"

function LoungePagenation  ({page, setPage, totalPosts, limit}) {
    const pageLimit = 5 // 페이지 버튼 수
    const numPages = Math.ceil(totalPosts / limit) // 총페이징 수

    const [totalPageArray, setTotalPageArray] = useState([]) // 총 페이지 배열
    const [currentPagesArray, setCurrentPagesArray] = useState([]) // 현재 페이지 배열, 5개 단위로 끊어서 보여줌
    
    useEffect(()=> {
        const slicedPageArray = slicedPageArrayByLimit(numPages ,pageLimit) // 페이징 수 제한
        setTotalPageArray(slicedPageArray) 
        setCurrentPagesArray(slicedPageArray[0]) 
        console.log(slicedPageArray) // [[1,2,3,4,5], [6,7,8,9,10],[11]]
        console.log(currentPagesArray, totalPageArray) // [1,2,3,4,5] , [[1,2,3,4,5], [6,7,8,9,10],[11]]
    }, [numPages])

    useEffect(()=> { 
        if(page % pageLimit === 1){
            setCurrentPagesArray(totalPageArray[Math.floor(page / pageLimit)]) // 페이지가 1일때
        }else if(page % pageLimit === 0){
            setCurrentPagesArray(totalPageArray[Math.floor(page / pageLimit) - 1]) // 페이지가 5일때
        }
    }, [page])

    const [btnActive, setBtnActive] = useState(0) 
    const handlePageChange = (e ,i) => {
        setPage(i+1)
        setBtnActive(i) // 버튼 활성화
    }

    const slicedPageArrayByLimit = (numPages, pageLimit) => { // 페이징 수 제한
        const totalPageArray = Array(numPages)
        .fill()
        .map((_, i) => i + 1)
        return Array(Math.ceil(numPages / pageLimit))
        .fill()
        .map(()=> totalPageArray.splice(0, pageLimit))
    }


    return(
        <>
            <LoungePageWrap>
                <LoungeButton onClick={()=> setPage(page - 1)} disabled={page === 1}><span className="material-symbols-outlined">arrow_back_ios</span></LoungeButton> 
                
                {currentPagesArray?.map((_ , i)=> { // 페이지 버튼
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

