import React, { useContext } from "react";
import { ORDINARY } from "../../../constant";
import UserContext from "../../../context/UserContext";
import OrdinarySignUp from "./OrdinarySignUp";
import SpecialSignUp from "./SpecialSignUp";

function SignUpStep1() {
  const { info } = useContext(UserContext);

  console.log("step1 info : ", info);
  return info.userType === ORDINARY ? <OrdinarySignUp /> : <SpecialSignUp />;
}

export default SignUpStep1;
