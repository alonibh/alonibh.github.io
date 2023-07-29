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
import SetNameForm from "./components/SetNameForm";
import { useState } from "react";

export default function App() {
  const [isNew, setIsNew] = useState<boolean | undefined>(undefined);

  const apiService = new ApiService();
  const { isAuthenticated, isLoading, user } = useAuth0();

  function setName(name: string) {
    apiService.updateUser(user?.sub!, name).then(() => {
      setIsNew(false);
    });
  }

  if (isLoading) {
    return <>Loading...</>;
  } else if (!isAuthenticated) {
    return <LoginPage />;
  } else if (user?.sub) {
    //console.log(JSON.stringify(user));

    if (isNew == undefined) {
      apiService
        .addUserIfNotExist(user?.sub, user?.name ?? "")
        .then((isNewRes) => {
          setIsNew(isNewRes);
        });
    } else if (isNew) {
      return (
        <>
          <SetNameForm name={user?.name} handleSubmit={setName} />
        </>
      );
    } else {
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
    }
  } else {
    return <>Error</>;
  }
  return <></>;
}
