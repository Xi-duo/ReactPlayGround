import ReactPlayground from "./ReactPlayground/ReactPlayground"
import './App.scss'
import { PlaygroundProvider } from "./ReactPlayground/PlaygroundContext"
function App() {
  return (
    <PlaygroundProvider>
    <ReactPlayground></ReactPlayground>
    </PlaygroundProvider>
  )
}

export default App
