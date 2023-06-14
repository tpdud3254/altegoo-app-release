import styled from "styled-components/native";
import { color } from "../styles";
import MediumText from "./text/MediumText";
import { Ionicons } from "@expo/vector-icons";

const ToastBox = styled.View`
    background-color: ${color.sub.blue};
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
            <Ionicons name="warning" size={30} color={color.sub.yellow} />
            <MediumText style={{ color: "white", marginTop: 5 }}>
                {props}
            </MediumText>
        </ToastBox>
    ),
};
