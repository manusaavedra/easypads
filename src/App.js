import './App.css';
import { Howler } from 'howler'
import ButtonPad from './components/PadButton';
import Header from './components/Header';

function App() {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  const handleVolume = (e) => {
    Howler.volume(e.target.value)
  }

  return (
    <div className="h-screen grid grid-rows-[50px_1fr_50px]">
      <Header />
      <div>
        <div className="grid grid-cols-3 grid-rows-4 gap-2 h-full p-2">
          {
            notes.map((note) => (
              <ButtonPad
                key={note}
                note={note}
              />
            ))
          }
        </div>
      </div>
      <footer className="px-4 flex items-center py-1">
        <input className="w-full accent-indigo-500" type="range" name='volume' defaultValue={1} min={0} max={1} step={0.01} onChange={handleVolume} />
        {/**<p className="text-xs text-center">Powered by <a className="underline text-blue-500" href="https://github.com/manusaavedra">Manuel Saavedra</a> | this project uses react js and howler js</p> */}
      </footer>
    </div>
  );
}





export default App;
