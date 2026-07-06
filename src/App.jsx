import Routing from './Pages/Routing_page'
import './App.css'
import { Provider } from 'react-redux';
import { store } from "./Pages/store";

function App() {

  return (
    <>
      <Provider store={store}><Routing /></Provider>
    </>
  )
}

export default App

