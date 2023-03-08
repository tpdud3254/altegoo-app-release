import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "./constant";

export const checkPassword = (password) => {
  const regExp = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

  if (!password.match(regExp)) {
    return false;
  } else {
    return true;
  }
};

export const getAsyncStorageToken = () => {
  return AsyncStorage.getItem(TOKEN);
};

export const setAsyncStorageToken = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
};

export const numberWithComma = (cost) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getWorkTime = (dateTime) => {
  const getDay = (index) => {
    switch (index) {
      case 0:
        return "일";
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";

      default:
        break;
    }
  };
  const workDateTime = new Date(dateTime);

  return `${workDateTime.getFullYear()}년 ${
    workDateTime.getMonth() + 1 < 10
      ? "0" + (workDateTime.getMonth() + 1)
      : workDateTime.getMonth() + 1
  }월 ${
    workDateTime.getDate() < 10
      ? "0" + workDateTime.getDate()
      : workDateTime.getDate()
  }일 (${getDay(workDateTime.getDay())}) ${
    workDateTime.getHours() < 10
      ? "0" + workDateTime.getHours()
      : workDateTime.getHours()
  }:${
    workDateTime.getMinutes() < 10
      ? "0" + workDateTime.getMinutes()
      : workDateTime.getMinutes()
  }`;
};
