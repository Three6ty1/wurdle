'use client'
import GuessBox from "./guessbox";
import React from "react";
import KeyButton from "./keybutton";
import ActionButton from "./actionbutton";
import {KeyState} from "./state";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const keyboard = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

function isLetter(key) {
  return key.length === 1 && key.match(/[A-Z]/i);
}

export default function Home() {
  const [prevGuesses, setPrevGuesses] = React.useState([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
  const [guess, setGuess] = React.useState('');
  const [row, setRow] = React.useState(0);
  const [playing, setPlaying] = React.useState('true');
  const [word, setWord] = React.useState('');
  const [keyMap, setKeyMap] = React.useState(() => {
    const x = {};
    for (const letter of alphabet) {
      x[letter] = KeyState.NotGuessed;
    }
    return x
  });
  

  React.useEffect(() => {
    const fetchWord = async () => {
      const request = await fetch('https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase');
      const data = await request.json();
      setWord(data[0]);
      console.log(data[0]);
    }

    fetchWord();
  }, [])

  const onKeyDown = (e) => {
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

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onKeyDown]);

  const handleLetterClick = (e) => {
    if (guess.length == 5 || !playing) return;

    let newGuess = guess + e.toUpperCase();
    setGuess(newGuess);
  }

  const handleEnterClick = () => {
    if (!playing) return;

    if (guess.length < 5) {
      alert("not 5 letter word")
      return;  // TODO: Error pop up
    }
      let newPrevGuesses = [...prevGuesses];
    newPrevGuesses[row] = guess.split('');
    setPrevGuesses(newPrevGuesses);
    
    // compare guess to word
    // for each letter, 
    // if the current state is > new guess state, replace
    // Correct > Position > Missing > NotGuessed
    let newKeyMap = keyMap;
    for (let i = 0; i < 5; i++) {
      if (!word.includes(guess[i])) {     // Missing
        console.log('missing');
        if (newKeyMap[guess[i]] > KeyState.Missing) newKeyMap[guess[i]] = KeyState.Missing;
      }
      if (word.includes(guess[i])) {
        console.log('wrong pos');
        if (newKeyMap[guess[i]] > KeyState.Position) newKeyMap[guess[i]] = KeyState.Position;
      }
      if (word[i] == guess[i]) {
        console.log('correct');
        newKeyMap[guess[i]] = KeyState.Correct;
      }
    }

    setKeyMap(newKeyMap);

    if (guess == word) {
      alert('You guessed the word!');
      setPlaying(false);
    }

    setRow(row + 1);
    setGuess('');
  }
  
  const handleBackClick = () => {
    if (guess.length == 0 || !playing) return;

    let newGuess = guess.slice(0, -1);
    setGuess(newGuess);
  }

  React.useEffect(() => {
    if (row == 6) {
      alert('you didnt guess the word. it was ' + word);
      setPlaying(false);
    }
  }, [row]);

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
                return <ActionButton key={'letter' + j} letter={letter} onClick={handleEnterClick} />
              } else if (letter == 'BACK') {
                return <ActionButton key={'letter' + j}  letter={letter} onClick={handleBackClick} />
              } 
              return <KeyButton key={'letter' + j}  letter={letter} onClick={handleLetterClick} state={keyMap[letter]} />
            }
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
