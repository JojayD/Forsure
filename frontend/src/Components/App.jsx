import { useState } from 'react'
import '../Styles/App.css'
import '../Styles/index.css'
import LoginPage from "./LoginPage.jsx";
import Header    from "./Header.jsx";
import Input from "./Input.jsx";
function App() {

    const[isAuthenticated, setIsAuthenticated] = useState(false)

    return(
      <div className='app__container'>
          {isAuthenticated ?
              (<>
                  <Header/>
                  <Input/>
              </>) :
              (<LoginPage setIsAuthenticated = {setIsAuthenticated}/>)}
      </div>
    )

}

export default App;
