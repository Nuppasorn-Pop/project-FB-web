import AuthContextProvider from "./contexts/AuthContext";
import Router from "./route";
import { Slide, ToastContainer } from "react-toastify";
import { Suspense } from "react";
function App() {
  return (
    <Suspense fallback={<h>Loading...</h>}>
      <AuthContextProvider>
        <Router />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          transition={Slide}
        />
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;

// Toast ==> UI แบบหนึ่งที่ popup ขึ้นบนหน้า browser ได้
