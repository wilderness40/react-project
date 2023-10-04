import React, {useState, useEffect, Children} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Icons.css'
import OptionModal from "../components/OptionModal";

function Icon({ src, children, href }) {
    
    const [iconActiveFlag, setIconActiveFlag] = useState('');
    const [optionModalState , setOptionModalState] = useState(false)

    const changeIconFlag = (e) => {
        setIconActiveFlag('clicked');
        removeAndAddActiveClass(e);
    };
  
    const removeAndAddActiveClass = (e) => {
        const icons = document.querySelectorAll('.main-icons');
        const h5 = document.querySelectorAll('h5');
        icons.forEach((icon) => {
            icon.classList.remove('blurred');
        });
        h5.forEach((h5) => {
            h5.classList.remove('active');  
        })
        e.currentTarget.classList.add('blurred');
        e.currentTarget.lastChild.classList.add('active');
    }
    const handleClickOutside = (e) => {
      if (
        // e.currentTarget.className !== 'main-icons' 
        e.target.className !== 'icon-image' &&
        e.target.className !== 'main-icons' &&
        e.target.tagName !== 'IMG' &&
        e.target.tagName !== 'H5'
      ) {
        setIconActiveFlag('');
      }
    };
    
    const navigate = useNavigate() // useNavigate hook을 이용해 페이지 이동을 구현한다.
    const moveToPage = () => { // Icon 컴포넌트를 더블클릭하면 해당 페이지로 이동한다.
      if(children === '설정') { // 설정 아이콘을 더블클릭하면 바탕화면 바꾸는 모달창 나오게 하는 코드
        setOptionModalState(true) 
      } else {
        navigate(href, {state:children})
      }
    }
    const modalStateChange = () => {
      setOptionModalState(!optionModalState)
    }
    useEffect(() => { // Icon 컴포넌트가 생성될 때 이벤트 리스너를 추가한다.
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);  // Icon 컴포넌트가 사라질 때 이벤트 리스너를 제거한다.
      };
    }, []);
    return (
      <>
        <div
          className={`main-icons ${iconActiveFlag ==='clicked' ? 'blurred' : ''}`}
          onClick={changeIconFlag} onDoubleClick={moveToPage}
        >
          <div className="icon-image">
            <img src={src} alt="" />
          </div>
          <h5 className={`${iconActiveFlag==='clicked' ? 'active' : ''}`}>{children}</h5>
        </div>
        <OptionModal key={src} state={optionModalState} modalStateChange={modalStateChange}></OptionModal>
      </>
    );
  }

export default Icon