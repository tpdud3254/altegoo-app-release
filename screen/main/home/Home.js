import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { ORDINARY } from "../../../constant";
import axios from "axios";
import { SERVER } from "../../../server";
import { getAsyncStorageToken } from "../../../utils";
import HeaderLeft from "../../../component/HeaderLeft";
import HeaderRight from "../../../component/HeaderRight";
import OrderList from "../orders/OrderList";

function Home({ navigation }) {
  const { info } = useContext(UserContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
    });
    getPoint(); //포인트가져오기
  }, []);

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

        navigation.setOptions({
          headerLeft: () => (
            <HeaderLeft
              onPress={goToPoint}
              name={info.name}
              point={point?.curPoint}
            />
          ),
        });
      })
      .catch((error) => {
        console.log("error: ", error); //TODO:에러처리
      })
      .finally(() => {});
  };

  const goToPoint = () => {
    navigation.navigate("SettingNavigator", { screen: "PointNavigator" });
  };

  return <>{info.userType === ORDINARY ? null : <OrderList />}</>;
}

export default Home;
