import './App.css'
import SplitPane from 'react-split-pane';
import InputPane from './InputPane/InputPane'; 
import OutputPane from './OutputPane/OutputPane';
import Footer from './Footer/Footer';
import { useState } from 'react'

function App() {
  const [theText, setTheText] = useState('')

  function changeInputText(e){
    setTheText(String(e.target.value))
  }

  return (
    <div className="App">
      <SplitPane split='vertical' defaultSize="50%">
        <InputPane changeInputText={changeInputText} />
        <OutputPane inputText={theText} />
      </SplitPane>
      <Footer />
    </div>
  );
}

export default App;
