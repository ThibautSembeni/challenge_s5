import "./App.css";
import ErrorBoundary from "./components/molecules/ErrorBoundary/index.jsx";
import RouterProvider from "./routers/router.provider.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import ClinicAdminContext from "@/contexts/ClinicAdminContext.jsx";


function App() {
  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <ClinicAdminContext>
            <RouterProvider />
          </ClinicAdminContext>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
