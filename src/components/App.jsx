import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Dice from './Dice'

function App() {

  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const diceValues = []
    for(let i = 0; i < 10; i++) {
      const randNum = Math.floor(Math.random() * 6 + 1)
        diceValues.push(
          {
            value: randNum,
            isHeld: false,
            id: nanoid(10)
          }
        )
    } 

    return diceValues
  }

  function rollDice() {
    //when set state check if held, if its true dice value should remain the same
    setDice(allNewDice())
  }

  function handleHold() {
    console.log('hold')
  }

  const diceElements = dice.map(die => {
    return <Dice value={die.value} handleHold={handleHold} key={die.id} />
  })

  console.log(diceElements)

  return (
    <main className='main--container'>
      <div className='dice--container'>
        {...diceElements}
      </div>
      <button className='btn' onClick={rollDice}>Roll Dice</button>
    </main>
  )
}

export default App
