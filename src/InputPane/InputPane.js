import { Textarea } from 'evergreen-ui';
import { useState } from 'react';
import './InputPane.css'

const InputPane = (props) => {
  const [theString, setTheString] = useState('')
  const changeInputText = props.changeInputText

  function handleTab(event){
    if(event.keyCode === 9){
      event.preventDefault()
      
      setTheString(theString + (" ").repeat(props.tabSize))
      changeInputText(theString + (" ").repeat(props.tabSize))
    }
  }

  function setString(event){
    setTheString(event.target.value)
    changeInputText(event.target.value)
  }

  return ( 
    <div className="InputPane">
      <Textarea className='textarea' placeholder='Enter Markdown Here...' value={theString} onChange={(e) => setString(e)} onKeyDown={(e) => handleTab(e)} />
    </div>
  );
}
 
export default InputPane;