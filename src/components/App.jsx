import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'
import './App.css'
import Dice from './Dice'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numRolls, setNumRolls] = useState(0)

  useEffect(() => {
    const allMatch = dice.every(die => die.isHeld && die.value === dice[0].value)
    if (allMatch) {
      setTenzies(allMatch) 
    }
  }, [dice])

  function createNewDie() {
    const randNum = Math.floor(Math.random() * 6 + 1)

    return {
      value: randNum,
      isHeld: false,
      id: nanoid(10)
    }
  }
  
  function allNewDice() {
    const diceValues = []
    for(let i = 0; i < 10; i++) {
        diceValues.push(
          createNewDie()
        )
    } 

    return diceValues
  }

  function rollDice() {

    setDice(prevDice => {
      return prevDice.map(die => {
        if(die.isHeld){
          return die
        } else {
          return createNewDie()
        }
      }) //end of map
    }) //end of setDice

    setNumRolls(prevNum => {
      return prevNum + 1
    })

  }

  function resetGame() {
    setTenzies(false)
    setNumRolls(0)
    setDice(allNewDice())
  }

  function handleHold(id) {

    setDice(prevDice => {
      const selectedDie = prevDice.filter(die => die.id === id)[0]

      return prevDice.map(die => {
        if(die.id === id || 
          (die.value === selectedDie.value && die.isHeld === selectedDie.isHeld)
        ){
          return {...die, isHeld: !die.isHeld}
        } else {
          return die
        }
      }) //end of map
    }) //end of setDice
  }


  const diceElements = dice.map(die => {
    return <Dice 
      value={die.value} 
      handleHold={() => handleHold(die.id)} 
      isHeld={die.isHeld}
      key={die.id} 
    />
  })

  return (
    <main className="main--container">
      {tenzies && <Confetti />}
      <div className="game_info--container">
        <h1 className="title">{tenzies ? `You won with ${numRolls} Rolls` : 'Tenzies'}</h1>
        {!tenzies && <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
      </div>
      <div className='dice--container'>
        {...diceElements}
      </div>
      <button className='btn' onClick={tenzies ? resetGame : rollDice} >{tenzies ? 'New Game' : 'Roll Dice'}</button>
    </main>
  )
}

export default App
