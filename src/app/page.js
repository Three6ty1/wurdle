import GuessBox from "./guessbox"

export default function Home() {
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
    </main>
  )
}
