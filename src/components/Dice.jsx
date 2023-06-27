import './App.css'

function Dice({ value, handleHold, isHeld, id }) {

    const styles = {
        backgroundColor: isHeld ? '#59E391' : '#ffffff'
    }

    return (
      <div className="dice--component" style={styles} onClick={() => handleHold(id)}> 
        <h2>{value}</h2>
      </div>
    )
  }
  
  export default Dice