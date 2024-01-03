import './App.css';
import { Howler } from "howler"
import ButtonPad from './components/PadButton';
import Header from './components/Header';
import { useStorePads } from './store';

function App() {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  const handleChange = (e) => {
    Howler.autoUnlock.valueOf(true)
    useStorePads.setState({ hightpassFrecuency: e.target.value })
  }

  return (
    <div className="h-screen grid grid-rows-[50px_1fr_40px]">
      <Header />
      <div className="grid grid-cols-3 grid-rows-4 gap-2 h-full p-2 overflow-hidden">
        {
          notes.map((note) => (
            <ButtonPad
              key={note}
              note={note}
            />
          ))
        }
      </div>
      <footer className="px-4 flex items-center py-1">
        {/**<p className="text-xs text-center">Powered by <a className="underline text-blue-500" href="https://github.com/manusaavedra">Manuel Saavedra</a> | this project uses react js and howler js</p> */}
      </footer>
    </div>
  );
}





export default App;
