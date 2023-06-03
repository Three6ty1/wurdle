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

  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-white dark:bg-gray-900'>
      <div>Wurdle</div>
      <br />
      <br />
      <div className='flex flex-col h-[420px] border-2 border-solid border-red-500 '>
        {[...Array(6)].map((e, i) => (
          <div className='flex flex-row w-[350px] h-1/6'>
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
          <div className='flex justify-center'>
            {row.map((letter, j) => {
              if (letter == 'ENTER') {
                return <ActionButton letter={letter}/>
              } else if (letter == 'BACK') {
                return <ActionButton letter={letter}/>
              } 
              return <KeyButton letter={letter}/>
            }
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
