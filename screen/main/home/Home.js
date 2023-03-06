import React, { useContext } from "react";
import LoginContext from "../../../context/LoginContext";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import SearchWork from "../search/SearchWork";
import { ORDINARY } from "../../../constant";
import { TouchableOpacity, View } from "react-native";
import PlainText from "../../../component/text/PlainText";
import styled from "styled-components/native";
import { theme } from "../../../styles";
import axios from "axios";
import { SERVER } from "../../../server";
import { getAsyncStorageToken } from "../../../utils";

const Button = styled.TouchableOpacity`
  background-color: ${theme.btnColor};
  padding: 10px;
  margin: 10px;
  align-items: center;
`;

function Home() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { info, setInfo } = useContext(UserContext);
  const navigation = useNavigation();

  const getPoint = async () => {
    axios
      .get(SERVER + "/users/point", {
        headers: {
          auth: await getAsyncStorageToken(),
        },
      })
      .then(({ data }) => {
        const {
          result,
          data: { point },
        } = data;
        console.log("result: ", result);
        console.log("point: ", point);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };
  const getOrderInProgressCounts = async () => {
    axios
      .get(SERVER + "/works/count/progress", {
        headers: {
          auth: await getAsyncStorageToken(),
        },
      })
      .then(({ data }) => {
        const {
          result,
          data: { count },
        } = data;
        console.log("result: ", result);
        console.log("count: ", count);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };
  const getOrderList = async () => {
    axios
      .get(SERVER + "/works/list", {
        headers: {
          auth: await getAsyncStorageToken(),
        },
      })
      .then(({ data }) => {
        // console.log(data);
        const {
          result,
          data: { list },
        } = data;
        console.log("result: ", result);
        console.log("list: ", list);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };
  const setAcceptOrder = async () => {
    axios
      .patch(
        SERVER + "/works/status",
        {
          status: 2, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
          id: 28,
        },
        {
          headers: {
            auth: await getAsyncStorageToken(),
          },
        }
      )
      .then(({ data }) => {
        // console.log(data);
        const { result } = data;
        console.log("result: ", result);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };
  const setCancleOrder = async () => {
    axios
      .patch(
        SERVER + "/works/status",
        {
          status: 1, //1: 작업 요청, 2: 작업 예약, 3: 작업 중, 4: 작업 완료
          id: 29,
        },
        {
          headers: {
            auth: await getAsyncStorageToken(),
          },
        }
      )
      .then(({ data }) => {
        // console.log(data);
        const { result } = data;
        console.log("result: ", result);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };

  const setReserveOrder = async () => {
    axios
      .post(
        SERVER + "/works/reservation",
        {
          orderId: 29,
        },
        {
          headers: {
            auth: await getAsyncStorageToken(),
          },
        }
      )
      .then(({ data }) => {
        // console.log(data);
        const { result } = data;
        console.log("result: ", result);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };

  const setCancleReservation = async () => {
    axios
      .delete(SERVER + "/works/reservation", {
        data: { orderId: 29 },
        headers: {
          auth: await getAsyncStorageToken(),
        },
      })
      .then(({ data }) => {
        // console.log(data);
        const { result } = data;
        console.log("result: ", result);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };
  const getMyOrderList = async () => {
    axios
      .get(SERVER + "/works/mylist", {
        headers: {
          auth: await getAsyncStorageToken(),
        },
      })
      .then(({ data }) => {
        // console.log(data);
        const {
          result,
          data: { list },
        } = data;
        console.log("result: ", result);
        console.log("list: ", list);
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };

  const classifyAddress = () => {
    const text = [
      "서울시 관악구 신림동",
      "경기도 의정부시 어쩌구",
      "인천광역시 어쩌구저쩌구",
      "경기도 광주시",
      "전라북도 전주시",
    ];

    const regionArr = ["서울", "인천", "경기"];
    const regionDetailArr = [
      ["김포", "부천", "파주", "고양", "동두천", "연천"],
      ["의정부", "양주", "구리", "남양주", "포천", "가평"],
      [
        "광명",
        "시흥",
        "안산",
        "안양",
        "과천",
        "의왕",
        "군포",
        "수원",
        "오산",
        "화성",
        "평택",
      ],
      ["성남", "하남", "광주", "용인", "안성", "이천", "여주", "양평"],
    ];

    text.map((text, textIndex) => {
      regionArr.map((region, regionIndex) => {
        console.log(text, "includes", region, text.includes(region));
      });
    });

    // 경기 북서부 : 김포시, 부천시, 파주시, 고양시, 동두천시, 연천군
    // 경기 북동부 : 의정부시, 양주시, 구리시, 남양주시, 포천시, 가평군
    // 경기 남서부 : 광명시, 시흥시, 안산시, 안양시, 과천시, 의왕시, 군포시, 수원시, 오산시, 화성시, 평택시
    // 경기 남동부 : 성남시, 하남시, 광주시, 용인시, 안성시, 이천시, 여주시, 양평군
  };
  return (
    <>
      {info.userType === ORDINARY ? null : (
        <View>
          <Button onPress={getPoint}>
            <PlainText>포인트가져오기</PlainText>
          </Button>
          <Button onPress={getOrderInProgressCounts}>
            <PlainText>작업목록 개수가져오기</PlainText>
          </Button>
          <Button onPress={getOrderList}>
            <PlainText>작업 목록 가져오기</PlainText>
          </Button>
          <Button onPress={setAcceptOrder}>
            <PlainText>예약하기</PlainText>
          </Button>
          <Button onPress={setCancleOrder}>
            <PlainText>예약취소하기</PlainText>
          </Button>
          <Button onPress={setReserveOrder}>
            <PlainText>예약대기하기</PlainText>
          </Button>
          <Button onPress={setCancleReservation}>
            <PlainText>예약대기취소하기</PlainText>
          </Button>
          <Button onPress={getMyOrderList}>
            <PlainText>내 작업 목록 가져오기</PlainText>
          </Button>
          <Button onPress={classifyAddress}>
            <PlainText>작업주소분류</PlainText>
          </Button>
        </View>
      )}
    </>
  );
}

Home.propTypes = {};
export default Home;
