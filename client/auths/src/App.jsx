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
// Testing GitHub contribution fix

export default App