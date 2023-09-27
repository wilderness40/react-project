import React, {useState, useEffect} from "react"
import LoungeButton from "./LoungeButton"
import LoungePageWrap from "./LoungePageWrap"

function LoungePagenation  ({page, setPage, totalPosts, limit}) {
    const pageLimit = 5 // 페이지 버튼 수
    const numPages = Math.ceil(totalPosts / limit) // 총페이징 수

    const [totalPageArray, setTotalPageArray] = useState([]) // 총 페이지 배열
    const [currentPagesArray, setCurrentPagesArray] = useState([]) // 현재 페이지 배열, 5개 단위로 끊어서 보여줌
    const [btnActive, setBtnActive] = useState(page) 
    
    useEffect(()=> {
        const slicedPageArray = slicedPageArrayByLimit(numPages ,pageLimit) // 페이징 수 제한
        setTotalPageArray(slicedPageArray) 
        setCurrentPagesArray(slicedPageArray[0]) 
    }, [numPages])

    useEffect(()=> { 
        if(page % pageLimit === 1){
            setCurrentPagesArray(totalPageArray[Math.floor(page / pageLimit)]) 
        }else if(page % pageLimit === 0){
            setCurrentPagesArray(totalPageArray[Math.floor(page / pageLimit) - 1]) 
        }
    }, [page])

    const handlePageChange = (e ,i,currentPage) => {
        setPage(e.target.innerText)
        setBtnActive(e.target.innerText) // 버튼 활성화
        console.dir(e.target)
        console.log(page)
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
                <LoungeButton 
                onClick={()=> {
                    setPage(page - 1) 
                    setBtnActive(page-1)
                }} 
                disabled={page === 1}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </LoungeButton> 
                
                {currentPagesArray?.map(( currentPage , i)=> { // 페이지 버튼
                    return(
                        <LoungeButton
                            key={i+1}
                            className={ currentPage === btnActive ? 'active' : ''} 
                            onClick={(e)=>handlePageChange(e, i, currentPage)} // 페이지 클릭시
                            aria-current={page === i + 1 ? 'page' : undefined} // 현재 페이지
                            > { currentPage }
                        </LoungeButton> 
                    )
                })}
                <LoungeButton 
                    onClick={()=>{ 
                        setPage(page + 1) 
                        setBtnActive(page+1)       
                    }} 
                    disabled={page === numPages}>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                </LoungeButton>
            </LoungePageWrap>
              <span className="pagenation__text">Page {page} of {numPages}</span>
              <span className="pagenation__text">Total {totalPosts} Posts</span>
        </>
    )

}

export default LoungePagenation

