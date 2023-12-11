import "./App.css";
import ErrorBoundary from "./components/molecules/ErrorBoundary/index.jsx";
import RouterProvider from "./routers/router.provider.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
function App() {
  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider />
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
