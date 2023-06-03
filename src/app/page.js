'use client'
import GuessBox from "./guessbox";
import React from "react";
import KeyButton from "./keybutton";
import ActionButton from "./actionbutton";

const keyboard = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACK'],
]

export default function Home() {
  const [guess, setGuess] = React.useState(['', '', '', '', '']);

  const handleLetterClick = (e) => {
    console.log(e)
  }

  const handleEnterClick = (e) => {
    console.log(e)
  }
  
  const handleBackClick = (e) => {
    console.log(e)
  }

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      console.log(e.key)
    })
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-white dark:bg-gray-900'>
      <div>Wurdle</div>
      <br />
      <br />
      <div className='flex flex-col h-[420px] border-2 border-solid border-red-500 '>
        {[...Array(6)].map((e, i) => (
          <div key={'row' + i}className='flex flex-row w-[350px] h-1/6'>
            <GuessBox />
            <GuessBox />
            <GuessBox />
            <GuessBox />
            <GuessBox />
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className='flex flex-col border-2 border-solid border-red-500 w-[600px] h-[200px]'>
        {keyboard.map((row, i) => (
          <div key={'row' + i} className='flex justify-center'>
            {row.map((letter, j) => {
              if (letter == 'ENTER') {
                return <ActionButton key={'letter' + j} letter={letter.toUpperCase()} onClick={handleEnterClick} />
              } else if (letter == 'BACK') {
                return <ActionButton key={'letter' + j}  letter={letter.toUpperCase()} onClick={handleBackClick} />
              } 
              return <KeyButton key={'letter' + j}  letter={letter.toUpperCase()} onClick={handleLetterClick} />
            }
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
