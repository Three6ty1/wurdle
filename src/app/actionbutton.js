const ActionButton = (props) => {
    return (
        <div className='flex justify-center items-center w-20 h-12 border-2 border-solid border-black m-0.5' onClick={() => props.onClick(props.letter)}>{props.letter}</div>
    );
};

export default ActionButton;