import './App.css'
import SplitPane from 'react-split-pane';
import InputPane from './InputPane/InputPane'; 
import OutputPane from './OutputPane/OutputPane';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useState, useEffect } from 'react'

function App() {
  const [theText, setTheText] = useState('')
  const [perfboost, setPerfboost] = useState(false);
  const [sentText, setSentText] = useState('');

  function changeInputText(e){
    setTheText(String(e.target.value))
  }

  function performanceHit() {
    setSentText(theText);
  }

  useEffect(() => {
    if (!perfboost) {
      setSentText(theText);
    }
  }, [theText]);

  return (
    <div className="App">
      <Header />
      <SplitPane split='vertical' style={{position: "relative"}} defaultSize="50%">
        <InputPane changeInputText={changeInputText} perfboost={perfboost} />
        <OutputPane inputText={perfboost ? sentText : theText} />
      </SplitPane>
      <Footer perfboost={perfboost} setPerfboost={setPerfboost} clickBoost={performanceHit} />
    </div>
  );
}

export default App;
