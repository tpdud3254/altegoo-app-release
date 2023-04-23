import React, { useContext } from "react";
import { ORDINARY, PERSON } from "../../../constant";
import UserContext from "../../../context/UserContext";
import CompanySignUp from "./CompanySignUp";
import OrdinarySignUp from "./OrdinarySignUp";
import PersonalSignUp from "./PersonalSignUp";
import SpecialSignUp from "./SpecialSignUp";

function SignUpStep1() {
  const { info } = useContext(UserContext);

  console.log("step1 info : ", info);
  return info.userType === ORDINARY ? (
    <OrdinarySignUp />
  ) : info.userDetailType === PERSON ? (
    <PersonalSignUp />
  ) : (
    <CompanySignUp />
  );
}

export default SignUpStep1;
