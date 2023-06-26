import './App.css'

function Dice({ value, handleHold }) {

    return (
      <div className="dice--component" onClick={handleHold}> 
        <h2>{value}</h2>
      </div>
    )
  }
  
  export default Dice