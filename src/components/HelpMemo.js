import '../styles/HelpMemo.css';

function HelpMemo({ memoToggle, handleMemoToggle }){
  return (
    <div className={`HelpMemo-container ${memoToggle? 'Memo-open' : 'Memo-hidden'}`}>
      <div className="HelpMemo-header">
        <h5>Help</h5>
        <div className='button-container'>
                <button onClick={handleMemoToggle}>X</button>
        </div>
      </div>
      <div className='HelpMemo-textarea'>
          <p>
            설명내용입니다.
          </p>
      </div>
    </div>
  )
}

export default HelpMemo;