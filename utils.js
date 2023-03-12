import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
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

export const getWorkTime = (dateTime, mode) => {
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

    if (mode === "short")
        return `${workDateTime.getFullYear()}.${
            workDateTime.getMonth() + 1 < 10
                ? "0" + (workDateTime.getMonth() + 1)
                : workDateTime.getMonth() + 1
        }.${
            workDateTime.getDate() < 10
                ? "0" + workDateTime.getDate()
                : workDateTime.getDate()
        } ${
            workDateTime.getHours() < 10
                ? "0" + workDateTime.getHours()
                : workDateTime.getHours()
        }:${
            workDateTime.getMinutes() < 10
                ? "0" + workDateTime.getMinutes()
                : workDateTime.getMinutes()
        }`;
    else
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

export const showError = (error) => {
    console.log(error.response);
    if (!error?.response?.data?.msg || error.response.data.msg.length < 1) {
        console.log("msg.len : ", error.response.data.msg.length);
        Toast.show({
            type: "errorToast",
            props: "서버와의 통신이 원활하지 않습니다. 다시 시도하여 주십시오.",
        });
    } else {
        console.log("Error Message : ", error.response.data.msg);
        Toast.show({
            type: "errorToast",
            props: error.response.data.msg,
        });
    }

    // console.log("error: ", error.response.status);
    // console.log("error: ", error.response.data.msg);
    // console.log("error: ", error.response.data.result);
};
