import { Pane } from 'evergreen-ui'

const Header = () => {
  return ( 
    <div className="Header">
      <Pane height="60px" display="flex" justifyContent="center" alignItems="center" borderBottom="2px solid #d3d3d3" background='whitesmoke'>
        <h3>UFDS Markdown Editor</h3>
      </Pane>
    </div>
  )
}
 
export default Header;