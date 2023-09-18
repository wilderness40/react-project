import '../styles/MinimizeTab.css'

function MinimizeTab({ children, handleMemoToggle }){
  return (
    <div className="Minimize-tab" onClick={handleMemoToggle}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOySF_Ur3n71KsGeLUgeuwuoE-2FkxxLZeUA&usqp=CAU" alt="minimize-icon"/>
      {children}
    </div>
  )
}

export default MinimizeTab;