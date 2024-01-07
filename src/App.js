import './App.css';
import ButtonPad from './components/PadButton';
import Header from './components/Header';
import ListLibraries from './components/ListLibraries';
import { useStorePads } from './store';
import useSoundPlayer from './hooks/useSoundPlayer';


function App() {
  const { currentLibrary } = useStorePads()
  const { pads } = useSoundPlayer()

  const padsCurrentLibrary = pads[currentLibrary.name] || []

  return (
    <div className="h-screen select-none grid grid-rows-[50px_50px_1fr]">
      <Header />
      <ListLibraries />
      <div className="grid grid-cols-3 grid-rows-4 gap-2 h-full p-2 overflow-hidden">
        {
          padsCurrentLibrary.map((pad) => (
            <ButtonPad
              key={pad.note}
              note={pad.note}
              player={pad.player}
            />
          ))
        }
      </div>
    </div>
  );
}





export default App;
