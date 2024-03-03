import "./App.css";
import "./page.css";
import CustomDisplay from "./Components/UseQuery/CustomUseQuery/CustomDisplay";
// import TextEditor from "./Components/TextEditor/TextEditor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UseQueryContextProvider from "./context/UseQueryContextProvider";
import Post from "./Components/UseQuery/CustomUseQuery/Post";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomDisplay />,
    },
    {
      path: "/post",
      element: <Post />,
    },
  ]);

  return (
    <>
      <UseQueryContextProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </UseQueryContextProvider>
    </>
  );
}

export default App;
