import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "primeflex/primeflex.css";
import MyTeamsPage from "./pages/MyTeamsPage";
import RatingPage from "./pages/RatingPage";
import LoginPage from "./pages/LoginPage";
import { User, useAuth0 } from "@auth0/auth0-react";
import { ApiService } from "./services/ApiService";
import SetNameForm from "./components/SetNameForm";
import { useState } from "react";
import EditTeamPage from "./pages/EditTeamPage";
import { UserInfoContext, UserInfo } from "./contexts/UserInfoContext";
import JoinTeamForm from "./components/JoinTeamForm";
import JoinTeamPage from "./pages/JoinTeamPage";

export default function App() {
  const [isNew, setIsNew] = useState<boolean | undefined>(undefined);

  const apiService = new ApiService();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

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
      if (!userInfo) {
        apiService.getUserName(user?.sub).then((name) => {
          setUserInfo({ id: user.sub!, name });
        });
      }

      return (
        <>
          <UserInfoContext.Provider value={userInfo}>
            <BrowserRouter>
              <Switch>
                <Route exact={true} path="/" component={MyTeamsPage} />
                <Route path="/myTeams/:teamId/edit" component={EditTeamPage} />
                <Route path="/myTeams/:teamId/join" component={JoinTeamPage} />
                <Route path="/myTeams/:teamId" component={RatingPage} />
              </Switch>
            </BrowserRouter>
          </UserInfoContext.Provider>
        </>
      );
    }
  } else {
    return <>Error</>;
  }
  return <></>;
}
