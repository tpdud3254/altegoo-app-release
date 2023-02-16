import styled from "styled-components/native";
import { theme } from "../styles";
import PlainText from "./text/PlainText";
import { Ionicons } from "@expo/vector-icons";

const ToastBox = styled.View`
  background-color: ${theme.sub.blue};
  width: 90%;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
`;

export const toastConfig = {
  errorToast: ({ props }) => (
    <ToastBox>
      <Ionicons name="warning" size={30} color="#aa0000" />
      <PlainText>{props}</PlainText>
    </ToastBox>
  ),
};
