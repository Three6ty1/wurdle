import {KeyState} from './state';

const KeyButton = (props) => {

  let style = 'flex justify-center items-center w-11 h-12 border-2 border-solid border-black m-0.5';
  switch (props.state) {
    case KeyState.Correct:
      style += ' bg-green-500';
      break;
    case KeyState.Missing:
      style += ' bg-gray-600';
      break;
    case KeyState.Position:
      style += ' bg-yellow-500';
      break;
    default:
      style += '';
  }

  return (
    <button className={style} onClick={() => props.onClick(props.letter)}>
      {props.letter}
    </button>
  );
};

export default KeyButton;