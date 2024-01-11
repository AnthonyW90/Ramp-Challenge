import { useEffect, useState } from 'react'
import { useFetchFlag } from './utils'

import './App.css'

/*
Flag url was found by visiting: https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge

Then running this code in the console:

const characters = document.querySelectorAll("code div span i");
Array.from(characters).reduce((acc, curr) => {
    return acc + curr.getAttribute("value")
    }, "");
*/

const flagURL = "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/676c75"

function TypeWriter({ text }: { text: string }) {
  const [index, setIndex] = useState<number>(0)
  const [displayText, setDisplayText] = useState<Array<string>>([])

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
          setDisplayText(chars => [...chars, text[index]]);
          setIndex(i => i + 1);
      }, 500); // 500ms delay for typewriter effect

      return () => clearTimeout(timer);
  }
  }, [index, text])

  return (
    <ul>
      {displayText.map((char, index) => (
        // Generally not a good idea to use index as key, but for this simple example it should be fine
        <li key={index}>{char}</li>
      ))}
    </ul>
  )
}


function App() {
  const { flag, error } = useFetchFlag(flagURL)

  if (error) {
    return (
      <div className="App">
        <h1>Oops, something went wrong!</h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <>
      {flag ? <TypeWriter text={flag} /> : <h1>Loading...</h1>}
    </>
  )
}

export default App
