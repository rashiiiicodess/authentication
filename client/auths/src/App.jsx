import {RouterProvider} from "react-router-dom"
import {router} from "./routes"
import { SessionProvider } from "./context/SessionContext"
function App() {
  return (
    <div >
     <div>
      <SessionProvider>
        <RouterProvider router={router} />
        </SessionProvider>
      

     
     </div>
    </div>
  )
}
// Testing GitHub contribution fix

export default App