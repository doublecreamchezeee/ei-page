import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Landing from "./pages/Landing";
import Profile from "./user/pages/Profile";
import Countries from "./pages/Countries";
import Contact from "./pages/Contact";
import CountryDetails from "./pages/CountryDetails";
import University from "./pages/University";
import Auth from "./pages/Auth";
import EmployeesList from "./components/Cms/EmployeesList";
import StudentsList from "./components/Cms/StudentsList";
import CountriesList from "./components/Cms/CountriesList";
import UniversitiesList from "./components/Cms/UniversitiesList";
import UniversityUpdateForm from "./components/UniversityForm/UniversityUpdateForm";
import CountryUpdateForm from "./components/CountryForm/CountryUpdateForm";
import EmployeeUpdateForm from "./components/EmployeeForm/EmployeeUpdateForm";

import PrivateRoute from "./shared/utils/PrivateRoute";
import AdminRoute from "./shared/utils/AdminRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/auth" exact>
              <Auth />
            </Route>
            <Route path="/contact" exact>
              <Contact />
            </Route>
            <Route path="/countries" exact>
              <Countries />
            </Route>
            <Route path="/countries/:cid" exact>
              <CountryDetails />
            </Route>
            <Route path="/universities" exact>
              <University />
            </Route>
            <PrivateRoute path="/profile/:uid" exact>
              <Profile />
            </PrivateRoute>
            <AdminRoute path="/cms/employees" exact>
              <EmployeesList />
            </AdminRoute>
            <AdminRoute path="/cms/students" exact>
              <StudentsList />
            </AdminRoute>
            <AdminRoute path="/cms/countries" exact>
              <CountriesList />
            </AdminRoute>
            <AdminRoute path="/cms/universities" exact>
              <UniversitiesList />
            </AdminRoute>
            <AdminRoute path="/cms/universities/:uid" exact>
              <UniversityUpdateForm />
            </AdminRoute>
            <AdminRoute path="/cms/countries/:cid" exact>
              <CountryUpdateForm />
            </AdminRoute>
            <AdminRoute path="/cms/employees/:eid" exact>
              <EmployeeUpdateForm />
            </AdminRoute>

            <Redirect to="/" />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
