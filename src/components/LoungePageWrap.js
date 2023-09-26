import React from 'react';

function LoungePageWrap({children}){

    return(
        <>
            <div className="pagenation__wrap">
                {children}
            </div>
        </>
    )
}

export default LoungePageWrap