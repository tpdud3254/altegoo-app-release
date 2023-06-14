import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import LoginContext from "../../../context/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { Ionicons } from "@expo/vector-icons";
import MediumText from "../../../component/text/MediumText";
import TruckLogo from "../../../component/logo/TruckLogo";

import axios from "axios";
import { SERVER } from "../../../constant";
import { getAsyncStorageToken, showError } from "../../../utils";

function WorkSchedule() {
    const { setIsLoggedIn } = useContext(LoginContext);
    const { setInfo } = useContext(UserContext);
    const navigation = useNavigation();

    const getMyOrderList = async () => {
        axios
            .get(SERVER + "/works/mylist", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                console.log(data);
                // const {
                //   result,
                //   data: { list },
                // } = data;
                // console.log("result: ", result);
                // console.log("list: ", list);
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const Work = () => (
        <View style={{ backgroundColor: "#efefef", marginBottom: 5 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View style={{ flex: 2 }}>
                    <MediumText>홍길동 / 양사-저층</MediumText>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Ionicons name="location" color="black" size={25} />
                        <MediumText>서울시 구로구 구로동 243-2</MediumText>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Ionicons name="time" color="black" size={25} />
                        <MediumText>23년 1월 2일 17:00</MediumText>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Ionicons name="heart" color="black" size={25} />
                        <MediumText>16,000P</MediumText>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View>
                        <MediumText>요청</MediumText>
                    </View>
                    <View>
                        <TruckLogo />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 2,
                    }}
                >
                    <Ionicons name="arrow-up-circle" color="black" size={25} />
                    <MediumText>165,000</MediumText>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <TouchableOpacity>
                        <MediumText>작업 완료</MediumText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const Logout = () => (
        <TouchableOpacity
            onPress={async () => {
                setIsLoggedIn(false);
                setInfo({});
                await AsyncStorage.removeItem("token");
            }}
        >
            <Text>로그아웃</Text>
        </TouchableOpacity>
    );
    return (
        <DefaultLayout>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity>
                        <Ionicons name="calendar" color="black" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" color="black" size={25} />
                    </TouchableOpacity>
                    <MediumText>1월 1주차</MediumText>
                    <TouchableOpacity>
                        <Ionicons
                            name="arrow-forward"
                            color="black"
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="person" color="black" size={25} />
                    <MediumText>6건 예정</MediumText>
                </View>
            </View>
            <ScrollView>
                <View style={{ marginBottom: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <MediumText>서울 작업 3개</MediumText>
                            <Ionicons
                                name="checkmark-circle"
                                color="black"
                                size={25}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <MediumText>모든 작업 보기</MediumText>
              <Ionicons
                name="checkmark-circle-outline"
                color="black"
                size={25}
              />
            </TouchableOpacity> */}
                    </View>
                    <View>
                        {/* list */}
                        <Work />
                        <Work />
                        <Work />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <MediumText>경기 북서부 작업 3개</MediumText>
                            <Ionicons
                                name="checkmark-circle"
                                color="black"
                                size={25}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <MediumText>모든 작업 보기</MediumText>
              <Ionicons
                name="checkmark-circle-outline"
                color="black"
                size={25}
              />
            </TouchableOpacity> */}
                    </View>
                    <View>
                        {/* list */}
                        <Work />
                        <Work />
                        <Work />
                    </View>
                </View>
            </ScrollView>
        </DefaultLayout>
    );
}

WorkSchedule.propTypes = {};
export default WorkSchedule;
