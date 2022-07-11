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
  const [tabSize, setTabSize] = useState(4)
  const [problemText, setProblemText] = useState('')

  function changeTabSize(newTabSize){
    setTabSize((!isNaN(Number(newTabSize)) && Number(newTabSize)) >= 0 ? Number(newTabSize) : 4)
  }

  function changeInputText(newString){
    setTheText(newString)
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
      <Header theText={theText} problemText={problemText} />
      <SplitPane split='vertical' style={{position: "relative"}} defaultSize="50%">
        <InputPane changeInputText={changeInputText} perfboost={perfboost} tabSize={tabSize} />
        <OutputPane inputText={perfboost ? sentText : theText} setProblemText={setProblemText} />
      </SplitPane>
      <Footer perfboost={perfboost} setPerfboost={setPerfboost} clickBoost={performanceHit} changeTabSize={changeTabSize} />
    </div>
  );
}

export default App;
