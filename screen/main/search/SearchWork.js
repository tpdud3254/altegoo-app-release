import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import LoginContext from "../../../context/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import { Ionicons } from "@expo/vector-icons";
import PlainText from "../../../component/text/PlainText";
import TruckLogo from "../../../component/logo/TruckLogo";
import { theme } from "../../../styles";
import axios from "axios";
import { SERVER } from "../../../server";
import { VALID } from "../../../constant";
import { getAsyncStorageToken } from "../../../utils";

function SearchWork({ navigation }) {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setInfo } = useContext(UserContext);
  //   const navigation = useNavigation();
  const [workList, setWorkList] = useState([]);
  // TODO: 밑으로 쓸어내리면 업데이트

  useEffect(() => {
    const getWorkList = async () => {
      axios
        .get(SERVER + "/works/list", {
          headers: {
            auth: await getAsyncStorageToken(),
          },
        })
        .then(({ data }) => {
          if (data.result === VALID) {
            console.log(data.data);
            setWorkList(data.data);
          } else {
            //TODO:에러처리
          }
        })
        .catch((error) => {
          console.log(error);
          //TODO:에러처리
        })
        .finally(() => {});
    };
    getWorkList();

    const unsubscribe = navigation.addListener("focus", () => {
      getWorkList();
    });
    return unsubscribe;
  }, [navigation]);

  const Work = ({ data }) => {
    // console.log(data);
    return (
      <View style={{ backgroundColor: "#efefef", marginBottom: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 2 }}>
            <PlainText>
              {data.registUser.userName} / {data.upDown}-
              {data.workHeight === "high"
                ? "고층"
                : data.workHeight === "middle"
                ? "중층"
                : "저층"}
            </PlainText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="location" color="black" size={25} />
              <PlainText>{data.address}</PlainText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="time" color="black" size={25} />
              <PlainText>
                {data.workDate} {data.workTime}
              </PlainText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="heart" color="black" size={25} />
              <PlainText>{data.commission}P</PlainText>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View>
              <PlainText>요청</PlainText>
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
            <PlainText>{data.cost}</PlainText>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <PlainText>작업 완료</PlainText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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
          <PlainText>1월 1주차</PlainText>
          <TouchableOpacity>
            <Ionicons name="arrow-forward" color="black" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="person" color="black" size={25} />
          <PlainText>20건 작업 요청 중</PlainText>
        </View>
      </View>
      <ScrollView>
        <View>
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
              <PlainText>서울 작업 10개</PlainText>
              <Ionicons name="checkmark-circle" color="black" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PlainText>모든 작업 보기</PlainText>
              <Ionicons
                name="checkmark-circle-outline"
                color="black"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View>
            {workList.map((value, index) => (
              <Work data={value} key={index} />
            ))}
          </View>
        </View>

        <View></View>
      </ScrollView>
    </DefaultLayout>
  );
}

SearchWork.propTypes = {};
export default SearchWork;
