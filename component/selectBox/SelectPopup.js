import styled from "styled-components/native";
import Dialog, { DialogContent } from "react-native-popup-dialog";

const Container = styled.View``;

export const SelectPopup = ({ children, visible, onTouchOutside }) => {
    return (
        <Dialog
            dialogStyle={{
                width: "80%",
                backgroundColor: "#ffffff00",
            }}
            visible={visible}
            onTouchOutside={onTouchOutside}
            overlayBackgroundColor="#00000044"
            onHardwareBackPress={onTouchOutside}
        >
            <DialogContent>
                <Container>{children}</Container>
            </DialogContent>
        </Dialog>
    );
};
