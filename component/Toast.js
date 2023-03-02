import styled from "styled-components/native";
import { theme } from "../styles";
import PlainText from "./text/PlainText";
import { Ionicons } from "@expo/vector-icons";

const ToastBox = styled.View`
  background-color: ${theme.sub.blue};
  width: 90%;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
`;

export const toastConfig = {
  errorToast: ({ props }) => (
    <ToastBox>
      <Ionicons name="warning" size={30} color={theme.sub.yellow} />
      <PlainText style={{ color: "white", marginTop: 5 }}>{props}</PlainText>
    </ToastBox>
  ),
};
