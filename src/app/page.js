'use client'
import GuessBox from "./guessbox";
import React from "react";
import KeyButton from "./keybutton";
import ActionButton from "./actionbutton";
import State from "./state";

const keyboard = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACK'],
]

const word = ['C', 'R', 'A', 'N', 'E'];

function isLetter(key) {
  return key.match(/[A-Z]/i);
}

export default function Home() {
  const [prevGuesses, setPrevGuesses] = React.useState([['P', 'R', 'E', 'V', 'G'], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
  const [guess, setGuess] = React.useState('');
  const [row, setRow] = React.useState(1);

  const handleLetterClick = (e) => {
    if (guess.length == 5) return;

    let newGuess = guess + e.toUpperCase();
    setGuess(newGuess);
  }

  const handleEnterClick = () => {
    if (guess.length < 5) return;  // TODO: Error pop up
    let newPrevGuesses = [...prevGuesses];
    newPrevGuesses[row] = guess.split('');
    setPrevGuesses(newPrevGuesses);
    setRow(row + 1);
    setGuess('');
  }
  
  const handleBackClick = () => {
    if (guess.length == 0) return;

    let newGuess = guess.slice(0, -1);
    setGuess(newGuess);
  }

  onkeydown = (e) => {
    if (e.repeat) return;

    switch (e.key) {
      case 'Backspace':
        handleBackClick();
        break;
      case 'Enter':
        handleEnterClick();
        break;
      default:
        if (isLetter(e.key)) handleLetterClick(e.key);
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-white dark:bg-gray-900'>
      <div>Wurdle</div>
      <br />
      <br />
      <div className='flex flex-col h-[420px] border-2 border-solid border-red-500 '>
        {prevGuesses.map((e, i) => {
          if(i == row) {
            return (
              <div key={'row' + i} className='flex flex-row w-[350px] h-1/6 border-2 border-solid border-blue-500'>
                {[...Array(5)].map((f, j) => (
                  <GuessBox key={'row' + i + 'col' + j} letter={guess[j]} />
                ))}
              </div>
            )
          }
          return (
            <div key={'row' + i} className='flex flex-row w-[350px] h-1/6'>
              {[...Array(5)].map((f, j) => (
                <GuessBox key={'row' + i + 'col' + j} letter={e[j]} />
              ))}
            </div>
          )
        })}
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
