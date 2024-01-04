import './App.css';
import ButtonPad from './components/PadButton';
import Header from './components/Header';
import ListLibraries from './components/ListLibraries';
import { notes } from './constants';

function App() {
  return (
    <div className="h-screen select-none grid grid-rows-[50px_50px_1fr]">
      <Header />
      <ListLibraries />
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
    </div>
  );
}





export default App;
