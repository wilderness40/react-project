import React, {forwardRef} from "react";
import '../styles/HomeMenubarButton.css'

const HomeMenubarButton = forwardRef((props, ref) => {
  const {toggleMenubar} = props
    return (
        <>
          <button onClick={toggleMenubar} ref={el=>ref.current[1]=el}>
                <div>
                    <img src="images/windows95.png" alt='window95-logo'></img>
                    <span>시작</span>
            </div>
          </button>
        </>
    )
})

export default HomeMenubarButton