import {KeyState} from './state';

const GuessBox = ( props ) => {

    let style = 'flex basis-1/2 justify-center items-center w-1/5 border-2 border-solid border-black m-0.5';

    // console.log(props.state)

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
        <div className={style}>{props.letter}</div>
    );
};

export default GuessBox;