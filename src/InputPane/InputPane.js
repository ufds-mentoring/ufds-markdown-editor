import { Textarea } from 'evergreen-ui';
import './InputPane.css'

const InputPane = (props) => {
  const changeInputText = props.changeInputText

  return ( 
    <div className="InputPane">
      <Textarea className='textarea' placeholder='Enter Markdown Here...' onChange={(e) => {changeInputText(e)}} />
    </div>
  );
}
 
export default InputPane;