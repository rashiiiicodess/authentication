import {RouterProvider} from "react-router-dom"
import {router} from "./routes"
function App() {
  return (
    <div >
     <div>
      <RouterProvider router={router}>

      </RouterProvider>
     </div>
    </div>
  )
}

export default App