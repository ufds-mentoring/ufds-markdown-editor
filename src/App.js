import './App.css'
import SplitPane from 'react-split-pane';
import InputPane from './InputPane/InputPane'; 
import OutputPane from './OutputPane/OutputPane';
import { useState } from 'react'

function App() {
  const [sizes, setSizes] = useState(['50%', '50%',])

  return (
    <div className="App">
      <SplitPane split='vertical'>
        <InputPane />
        <OutputPane />
      </SplitPane>
    </div>
  );
}

export default App;
