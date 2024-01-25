import Promotion from "./components/Promotion";
import SignIn from "./components/SignIn";

export default function Root() {
  return (
    <>
      <div className="flex items-center overflow-hidden">
        <Promotion />
        <SignIn />
      </div>
    </>
  );
}
