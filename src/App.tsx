import Header from './Header'
import './App.css'
import Todos from './Todos'

function App() {

  return (
    <div className="App">
      <div className="headerSection">
        <Header/>
      </div>
      <div className="todosSection">
        <Todos/>
      </div>
    </div>
  )
}

export default App
