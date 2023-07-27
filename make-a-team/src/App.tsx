import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "primeflex/primeflex.css";
import MyTeamsPage from "./pages/MyTeamsPage";
import RatingPage from "./pages/RatingPage";
import LoginPage from "./pages/LoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import { ApiService } from "./services/ApiService";
import Popup from "./components/popup/Popup";

function App() {
  const apiService = new ApiService();

  const { isAuthenticated, isLoading, user } = useAuth0();
  if (isLoading) {
    return <>Loading...</>;
  } else if (!isAuthenticated) {
    return <LoginPage />;
  } else if (user?.sub) {
    // TODO remove
    console.log(JSON.stringify(user));

    apiService.addUserIfNotExist(user?.sub, user?.name ?? "").then((isNew) => {
      if (isNew) {
        // TODO ask user for its name, and save it
      }
    });
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={MyTeamsPage} />
            <Route path="/myTeams/:teamId" component={RatingPage} />
          </Switch>
        </BrowserRouter>
      </>
    );
  } else {
    return <>Error</>;
  }
}

export default App;
