import './App.css';
import ButtonPad from './components/PadButton';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  return (
    <div className="h-screen grid grid-rows-[50px_1fr_50px]">
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
      <Footer />
    </div>
  );
}





export default App;
