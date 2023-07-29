import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { SERVER, SIGNUP_NAV, VALID } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MediumText from "../../../component/text/MediumText";
import LoginContext from "../../../context/LoginContext";
import { Ionicons } from "@expo/vector-icons";
import { BackHandler, useWindowDimensions } from "react-native";
import BoldText from "../../../component/text/BoldText";
import Loading from "../../../component/Loading";
import * as Location from "expo-location";
import axios from "axios";
import {
    setAsyncStorageToken,
    showError,
    showErrorMessage,
} from "../../../utils";

const Container = styled.View`
    align-items: center;
    flex: 1;
    background-color: white;
`;

function SignUpComplete() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const { setIsLoggedIn, setFirstLogin } = useContext(LoginContext);

    useEffect(() => {
        console.log(info);
        createAccount();
    }, []);

    const createAccount = async () => {
        //로그인지역 가져오기
        let accessedRegion = "조회 실패";
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
            accuracy: 5,
        });

        try {
            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
                {
                    headers: {
                        Authorization:
                            "KakaoAK 86e0df46fbae745bb4c658276b280088",
                    },
                }
            );

            console.log(response.data);
            const {
                data: {
                    documents,
                    meta: { total_count },
                },
            } = response;

            if (total_count > 0)
                accessedRegion = `${documents[0].address.region_1depth_name}>${documents[0].address.region_2depth_name}`;
        } catch (error) {
            console.log(error);
        }

        // data = {
        //     userType: "DRIVER",
        //     name: "ㄱㅅㅇ",
        //     phone: "0109066545",
        //     password: "qqqq1111",
        //     birth: "580820",
        //     gender: "남",
        //     sms: true,
        //     licenseUrl: "",
        //     recommendUserId: 1,
        //     companyName: "딩딩딩",
        //     companyPersonName: "딩딩",
        //     workCategory: 3,
        //     vehicle: { floor: 1, number: "ㅈㄴㅈ", type: 1 },
        //     vehiclePermissionUrl: "",
        //     workRegion: [1, 2, 4],
        // };

        const sendingData = {
            userType: info.userType || null,
            name: info.name || null,
            phone: info.phone || null,
            password: info.password || null,
            birth: info.birth || null,
            gender: info.gender || null,
            sms: info.sms || null,
            license: info.licenseUrl || null,
            recommendUserId: info.recommendUserId || null,
            companyName: info.companyName || null,
            companyPersonName: info.companyPersonName || null,
            workCategory: info.workCategory || null,
            vehicle: info.vehicle || null,
            vehiclePermission: info.vehiclePermissionUrl || null,
            workRegion: info.workRegion || null,
            accessedRegion: accessedRegion,
            status: "정상", //고정값
            grade: 1, //고정값
        };

        try {
            const response = await axios.post(SERVER + "/users/create", {
                ...sendingData,
            });

            const {
                data: { data, result },
            } = response;

            console.log(data);
            console.log(result);
            if (result === VALID) {
                signIn(info.phone, info.password);
                setInfo({ ...data });
            } else {
                navigation.goBack();
                showErrorMessage("회원가입에 실패하였습니다.");
            }
        } catch (e) {
            navigation.goBack();
            showErrorMessage("회원가입에 실패하였습니다.");
        }
    };

    const signIn = async (phone, password) => {
        try {
            const response = await axios.post(SERVER + "/users/login", {
                phone,
                password,
            });

            console.log(response.data);
            const {
                data: {
                    result,
                    data: { token, user },
                },
            } = response;

            if (result === VALID) {
                console.log("Current User : ", user);
                console.log("Token : ", token);
                setInfo(user);
                await setAsyncStorageToken(token);
                setIsLoggedIn(true);
                setFirstLogin(true);
            } else {
                navigation.navigate("SignInNavigator");
                showErrorMessage("자동 로그인에 실패하였습니다.");
            }
        } catch (error) {
            console.log(error);
            navigation.navigate("SignInNavigator");
            showErrorMessage("자동 로그인에 실패하였습니다.");
            showError(error);
        }
    };

    return (
        <Container>
            <Loading />
        </Container>
    );
}

export default SignUpComplete;
