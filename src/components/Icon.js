import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Icons.css'

function Icon({ src, children, href }) {
    
    const [iconActiveFlag, setIconActiveFlag] = useState('');
    

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
       navigate(href, {state:children})
    }

    useEffect(() => { // Icon 컴포넌트가 생성될 때 이벤트 리스너를 추가한다.
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);  // Icon 컴포넌트가 사라질 때 이벤트 리스너를 제거한다.
      };
    }, []);
  
    return (
      <div
        className={`main-icons ${iconActiveFlag ==='clicked' ? 'blurred' : ''}`}
        onClick={changeIconFlag} onDoubleClick={moveToPage}
      >
        <div className="icon-image">
          <img src={src} alt="" />
        </div>
        <h5 className={`${iconActiveFlag==='clicked' ? 'active' : ''}`}>{children}</h5>
      </div>
    );
  }

export default Icon