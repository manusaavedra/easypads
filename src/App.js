import './App.css';
import { Howler } from 'howler'
import AppHeader from './components/Header';
import useToggle from './hooks/useToggle';
import InputStepNumber from './components/InputStepNumber';
import { ContextPads } from './context/PadsContext'
import { useContext, useEffect, useRef, useState } from 'react';
import { clearButtons } from './helpers';
import ButtonPad from './components/PadButton';

function App() {

  const {statePads, setStatePads} = useContext(ContextPads)
  const [count, setCount] = useState(0)
  const [isToggle, toggle] = useToggle()
  const padRef = useRef({})

  useEffect(() => {

    const createGridPads = () => {

      const listPads = Array.from({ length: count }).map((_, i) => {
        return <ButtonPad ref={padRef} key={i} />
      })

      setStatePads(listPads)
    }

    createGridPads()

  }, [count, setStatePads])

  const masterVolume = (e) => {
    Howler.volume(e.target.value)
  }

  const toggleEditing = () => {
    toggle()
    Howler.stop()
    clearButtons()
  }

  const handleChangeCountInput = (value) => {
    setCount(value)
  }

  console.log(statePads)

  return (
    <div className="app">
      <AppHeader />
      <div className="inline-container">
        <div className={`padsbutton ${isToggle ? 'disabled' : ''}`}>
          {
            statePads.map((pad, i) => {
              return pad
            })
          }
        </div>
        <div className='config-panel'>
          <div className="input-group">
            <label htmlFor="volume">Volume</label>
            <input type="range" name='volume' min={0} max={1} step={0.01} onChange={masterVolume} />
          </div>
          <hr />
          <div className="input-group">
            <label htmlFor="length">Modo edición</label>
            <div className='input-switch'>
              <input type="checkbox" onChange={toggleEditing} />
              <div className='track'></div>
              <div className='switch'></div>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="">Numero de pads</label>
            <InputStepNumber onChange={handleChangeCountInput} min={5} max={30} disabled={!isToggle} />
          </div>
          <footer>
            <span>Powered by <a href="https://github.com/manusaavedra">Manuel Saavedra</a> | this project uses react js and howler js</span>
          </footer>
        </div>
      </div>
    </div>
  );
}





export default App;
