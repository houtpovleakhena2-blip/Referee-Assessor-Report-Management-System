import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import MatchPage from "../pages/MatchPage";
import RefereePage from "../pages/RefereePage";
import ReportPage from "../pages/ReportPage";
import MainLayout from "../components/layout/MainLayout";

export default function AppRoutes(){

  return(

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage/>}
        />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <DashboardPage/>
            </MainLayout>
          }
        />

        <Route
          path="/matches"
          element={
            <MainLayout>
              <MatchPage/>
            </MainLayout>
          }
        />

        <Route
          path="/referees"
          element={
            <MainLayout>
              <RefereePage/>
            </MainLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <MainLayout>
              <ReportPage/>
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}
