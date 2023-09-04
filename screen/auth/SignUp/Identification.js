import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../context/UserContext";
import { CommonActions } from "@react-navigation/native";
import { SERVER, SIGNUP_NAV, VALID } from "../../../constant";
import { showError, showErrorMessage } from "../../../utils";
import axios from "axios";
import { SafeAreaView, View, useWindowDimensions } from "react-native";
import { LAYOUT_PADDING_X } from "../../../component/layout/Layout";
import WebView from "react-native-webview";

function Identification({ navigation }) {
    const webViewRef = useRef();
    const { width } = useWindowDimensions();
    const [progress, setProgress] = useState(0.0);

    const { info, setInfo } = useContext(UserContext);

    const sendMessage = (data) => {
        webViewRef.current.postMessage(data);
    };

    const errorHandler = ({ nativeEvent }) =>
        console.log("WebView error: ", nativeEvent);

    const receiveMessage = async (event) => {
        console.log("받음");
        try {
            const {
                nativeEvent: { data },
            } = event;
            const parsed = JSON.parse(data);
            console.log("parsed : ", parsed);
            switch (parsed.result) {
                case "cancel":
                    navigation.goBack();
                    break;
                case "ok":
                    console.log(parsed.data);
                    authenticating(parsed.data);
                    break;
                default:
                    navigation.goBack();
                    break;
            }
        } catch (e) {
            console.log(e);
            navigation.goBack();
        }
    };

    useEffect(() => {
        if (progress === 1) {
            sendMessage(
                JSON.stringify({
                    // ...route?.params?.data,
                    test: true,
                })
            );
        }
        console.log("progress : ", progress);
    }, [progress]);

    const goToPage = (pageName) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: "SignUp" },
                    {
                        name: "Agreements",
                    },
                    {
                        name: pageName,
                    },
                ],
            })
        );
    };

    const authenticating = async (data) => {
        const { name, phone, birth, gender } = data;

        try {
            const response = await axios.get(SERVER + "/users/search", {
                params: {
                    phone,
                },
            });

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                showErrorMessage("이미 존재하는 사용자입니다.");
                navigation.goBack();
            } else {
                const data = {
                    name,
                    phone,
                    gender,
                    birth,
                };

                setInfo({ ...info, ...data });

                const curNavIndex =
                    SIGNUP_NAV[info.userType].indexOf("Identification");
                goToPage(SIGNUP_NAV[info.userType][curNavIndex + 1]);
            }
        } catch (error) {
            console.log(error);
            showError(error);
        }
    };

    return (
        // <AuthLayout>
        //     <InputContainer>
        //         <InputWrapper>
        //             <TextInput
        //                 title="이름"
        //                 placeholder="실명입력"
        //                 returnKeyType="next"
        //                 value={watch("name")}
        //                 onChangeText={(text) => setValue("name", text)}
        //                 onReset={() => setValue("name", "")}
        //                 onSubmitEditing={() => phoneRef.current.setFocus()}
        //             />
        //         </InputWrapper>
        //         <InputWrapper>
        //             <TextInput
        //                 ref={phoneRef}
        //                 title="휴대폰 번호"
        //                 placeholder="- 없이 숫자만 입력해주세요."
        //                 keyboardType="number-pad"
        //                 returnKeyType="done"
        //                 value={watch("phone")}
        //                 onChangeText={(text) => setValue("phone", text)}
        //                 onReset={() => setValue("phone", "")}
        //             />
        //         </InputWrapper>
        //     </InputContainer>
        //     <Button
        //         onPress={handleSubmit(authenticating)}
        //         type="accent"
        //         text="본인 인증하기"
        //         disabled={!validation}
        //     />
        // </AuthLayout>
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: -LAYOUT_PADDING_X,
                marginRight: -LAYOUT_PADDING_X,
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        height: 700,
                        flex: 1,
                    }}
                >
                    <WebView
                        ref={webViewRef}
                        style={{ width: width, height: 700, flex: 1 }}
                        source={{
                            uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/certification",
                        }}
                        javaScriptEnabled={true}
                        onError={errorHandler}
                        onMessage={receiveMessage}
                        onLoadProgress={(event) => {
                            setProgress(event.nativeEvent.progress);
                        }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Identification;
