import LoginButton from "../components/LoginButton";

export default function LoginPage() {
  return (
    <>
      <Header />
      <LoginButton />
    </>
  );
}

const Header = () => {
  return (
    <>
      <h1>Make a team</h1>
      <h3>The site that lets you play equally</h3>
    </>
  );
};
