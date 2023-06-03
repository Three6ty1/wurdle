const KeyButton = (props) => {
    return (
        <button className='flex justify-center items-center w-11 h-12 border-2 border-solid border-black m-0.5' onClick={() => props.onClick(props.letter)}>
            {props.letter}
        </button>
    );
};

export default KeyButton;