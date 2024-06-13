import { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+\\|[]{};:/?.>~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToCLipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,25);
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(()=>{
    passwordGenerator()
  },[length , numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-500 p-4 m-3">
      <h1 className="text-4xl font-bold mb-20 text-white underline">Random Password Generator</h1>
      <div className="w-full max-w-md p-6 bg-pink-300 rounded-lg shadow-md">
        <div className="flex mb-4">
          <input
            type="text"
            value={password}
            className="flex-1 p-2 border border-gray-300 rounded-l-md outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-green-600 text-white p-2 rounded-r-md"
            onClick={copyPasswordToCLipboard}
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            className="mr-2"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput" className="text-sm text-gray-900">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            className="mr-2"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput" className="text-sm text-gray-900">
            Include Special Characters
          </label>
        </div>

        <button
          className="w-full bg-green-600 text-white p-2 rounded-md"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
