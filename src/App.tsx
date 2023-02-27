import RouterControl from "./routes";
import { AuthProvider } from "./contexts/auth";
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer enableMultiContainer position={toast.POSITION.TOP_CENTER} />
      <AuthProvider >
        <RouterControl />
      </AuthProvider>
    </>
  );
}

export default App;
