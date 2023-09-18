import '../styles/MinimizeTab.css'

function MinimizeTab({ children, handleMemoToggle }){
  return (
    <div className="Minimize-tab" onClick={handleMemoToggle}>{children}</div>
  )
}

export default MinimizeTab;