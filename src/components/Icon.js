import React from "react";
import '../assets/styles/Icons.css'
import homeIcons from "../HomeIconsData";

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