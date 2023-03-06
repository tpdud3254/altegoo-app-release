import React, { useContext } from "react";
import LoginContext from "../../../context/LoginContext";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import SearchWork from "../search/SearchWork";
import { ORDINARY } from "../../../constant";

function Home() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { info, setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  return <>{info.userType === ORDINARY ? null : null}</>;
}

Home.propTypes = {};
export default Home;
