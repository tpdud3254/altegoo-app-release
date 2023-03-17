import React, { useContext, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { theme } from "../../../styles";
import PlainText from "../../../component/text/PlainText";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import MainLayout from "../../../component/layout/MainLayout";
import styled from "styled-components/native";
import KakaoButton, {
    ButtonContainer,
} from "../../../component/button/KakaoButton";
import PlainButton from "../../../component/button/PlainButton";
import { useForm } from "react-hook-form";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import RegistContext from "../../../context/RegistContext";
import { REGIST_NAV } from "../../../constant";

LocaleConfig.locales["fr"] = {
    monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
    ],
    monthNamesShort: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
    ],
    dayNames: [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
    ],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

const handArr = [
    [
        "2023-01-01",
        "2023-01-10",
        "2023-01-11",
        "2023-01-20",
        "2023-01-21",
        "2023-01-30",
        "2023-01-31",
    ],
    ["2023-02-09", "2023-02-10", "2023-02-19", "2023-02-28"],
    [
        "2023-03-01",
        "2023-03-10",
        "2023-03-11",
        "2023-03-20",
        "2023-03-21",
        "2023-03-30",
        "2023-03-31",
    ],
    ["2023-04-09", "2023-04-10", "2023-04-19", "2023-04-28", "2023-04-29"],
    [
        "2023-05-08",
        "2023-05-09",
        "2023-05-18",
        "2023-05-19",
        "2023-05-28",
        "2023-05-29",
    ],
    ["2023-06-07", "2023-06-08", "2023-06-17", "2023-06-26", "2023-06-27"],
    [
        "2023-07-06",
        "2023-07-07",
        "2023-07-16",
        "2023-07-17",
        "2023-07-26",
        "2023-07-27",
    ],
    ["2023-08-05", "2023-08-06", "2023-08-15", "2023-08-24", "2023-08-25"],
    [
        "2023-09-03",
        "2023-09-04",
        "2023-09-13",
        "2023-09-14",
        "2023-09-23",
        "2023-09-24",
    ],
    [
        "2023-10-03",
        "2023-10-04",
        "2023-10-13",
        "2023-10-14",
        "2023-10-23",
        "2023-10-24",
    ],
    ["2023-11-02", "2023-11-03", "2023-11-12", "2023-11-21", "2023-11-22"],
    [
        "2023-12-01",
        "2023-12-02",
        "2023-12-11",
        "2023-12-12",
        "2023-12-21",
        "2023-12-22",
        "2023-12-31",
    ],
];

const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;

const SelectDate = styled.View`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
`;
const HelpContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

const HelpWrapper = styled.View`
    flex-direction: row;
`;

const Notice = styled.View`
    flex-direction: row;
    align-items: center;
`;
const SelectTime = styled(SelectDate)`
    margin-top: 10px;
`;

const SelectTimeWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;
const Ampm = styled.View`
    flex-direction: row;
`;
const Am = styled.TouchableOpacity`
    border-left-width: 1px;
    border-left-color: #777777;
    border-top-width: 1px;
    border-top-color: #777777;
    border-bottom-width: 1px;
    border-bottom-color: #777777;
    border-right-width: 1px;
    border-right-color: #777777;
    padding: 5px 10px 5px 13px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: ${(props) => (props.selected ? "aliceblue" : "white")};
`;
const Pm = styled.TouchableOpacity`
    border-top-width: 1px;
    border-top-color: #777777;
    border-bottom-width: 1px;
    border-bottom-color: #777777;
    border-right-width: 1px;
    border-right-color: #777777;
    padding: 5px 13px 5px 10px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${(props) => (props.selected ? "aliceblue" : "white")};
`;
const InputTime = styled.View`
    flex-direction: row;
    align-items: center;
`;
const Input = styled.TextInput`
    border: 1px solid #777;
    margin-left: 13px;
    width: 55px;
    padding: 3px 3px;
    margin-right: 5px;
    font-size: 20px;
`;
function SelectDateTime({ navigation }) {
    const [selectedDay, setSelectedDay] = useState("");
    const [ampm, setAmpm] = useState(null);
    const { setValue, register, handleSubmit, getValues } = useForm();
    const { registInfo, setRegistInfo } = useContext(RegistContext);

    console.log(registInfo);

    useEffect(() => {
        register("hour");
        register("min");

        if (registInfo.dateTime) {
            const date = new Date(registInfo.dateTime);
            setSelectedDay(
                `${date.getFullYear()}-${getMonth(date)}-${getDate(date)}`
            );

            if (date.getHours() >= 12 || date.getHours() <= 23) {
                setAmpm("pm");
            } else {
                setAmpm("am");
            }

            if (date.getHours() > 12) {
                setValue("hour", date.getHours() - 12);
            } else if (date.getHours() === 0) {
                setValue("hour", "12");
            } else {
                setValue("hour", date.getHours());
            }

            setValue("min", date.getMinutes());
        }
    }, []);

    const getMonth = (date) => {
        return date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    };

    const getDate = (date) => {
        return date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    };

    const getMinDate = () => {
        const today = new Date();

        return `${today.getFullYear()}-${getMonth(today)}-${
            today.getDate() < 10 ? "0" + today.getDate() : today.getDate()
        }`;
    };
    const isHandDay = (dateString, month) =>
        handArr[month - 1].includes(dateString);

    const isSelectedDay = (dataString) => selectedDay === dataString;

    const onNextStep = ({ hour, min }) => {
        const selectHour = parseInt(hour);
        const selectMin = parseInt(min);

        console.log(ampm, selectHour, selectMin);

        if (!selectedDay || selectedDay === "") {
            Toast.show({
                type: "errorToast",
                props: "작업 날짜를 선택해주세요.",
            });
            return;
        }

        if (
            !ampm ||
            (!selectHour && selectHour !== 0) ||
            (!selectMin && selectMin !== 0)
        ) {
            Toast.show({
                type: "errorToast",
                props: "작업 시간을 입력해주세요.",
            });
            return;
        }

        if (
            selectHour < 1 ||
            selectHour > 12 ||
            selectMin < 0 ||
            selectMin > 59
        ) {
            Toast.show({
                type: "errorToast",
                props: "유효한 시간을 입력해주세요.",
            });
            return;
        }

        const selectDateTime = new Date(selectedDay);
        const hourResult =
            ampm === "am"
                ? selectHour === 12
                    ? 0
                    : selectHour
                : selectHour !== 12
                ? selectHour + 12
                : selectHour;

        selectDateTime.setHours(hourResult, selectMin);

        setRegistInfo({ dateTime: selectDateTime, ...registInfo });
        navigation.navigate(REGIST_NAV[2]);
    };
    const LeftArrow = () => (
        <AntDesign name="leftcircleo" size={28} color="black" />
    );

    const RightArrow = () => (
        <AntDesign name="rightcircleo" size={28} color="black" />
    );

    const Help = ({ number, text }) => (
        <HelpWrapper>
            <MaterialCommunityIcons
                name={`numeric-${number}-circle-outline`}
                size={30}
                color="#777777"
            />
            <PlainText style={{ marginLeft: 5, color: "#777777" }}>
                {text}
            </PlainText>
        </HelpWrapper>
    );

    return (
        <MainLayout>
            <Container behavior="position" keyboardVerticalOffset={200}>
                <SelectDate>
                    <HelpContainer>
                        <Help number="1" text="날짜 선택" />
                        <Notice>
                            <View
                                style={{
                                    backgroundColor: theme.sub.yellow + "44",
                                    borderRadius: 25,
                                    width: 30,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            />
                            <AntDesign
                                name="arrowright"
                                size={20}
                                color="#777777"
                                style={{ marginLeft: 5, marginRight: 5 }}
                            />
                            <PlainText style={{ color: "#777777" }}>
                                손 없는 날
                            </PlainText>
                        </Notice>
                    </HelpContainer>
                    <Calendar
                        style={{
                            borderTopColor: "#eeeeee",
                            borderTopWidth: 1,
                        }}
                        renderHeader={(date) => (
                            <View>
                                <PlainText>
                                    {date.getFullYear()}년 {getMonth(date)}월
                                </PlainText>
                            </View>
                        )}
                        renderArrow={(direction) =>
                            direction === "left" ? (
                                <LeftArrow />
                            ) : (
                                <RightArrow />
                            )
                        }
                        dayComponent={({ date, state }) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: isSelectedDay(
                                        date.dateString
                                    )
                                        ? theme.main
                                        : isHandDay(date.dateString, date.month)
                                        ? theme.sub.yellow + "44"
                                        : state === "today"
                                        ? "aliceblue"
                                        : "white",
                                    borderRadius: 25,
                                    width: 45,
                                    height: 45,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={
                                    state === "disabled"
                                        ? null
                                        : () => setSelectedDay(date.dateString)
                                }
                            >
                                <PlainText
                                    style={{
                                        color: isSelectedDay(date.dateString)
                                            ? "white"
                                            : state === "disabled"
                                            ? "#cccccc"
                                            : "black",
                                        fontSize: 19,
                                    }}
                                >
                                    {date.day < 10 ? "0" + date.day : date.day}
                                </PlainText>
                            </TouchableOpacity>
                        )}
                        theme={{
                            textDayHeaderFontSize: 18,
                            textDayHeaderFontFamily: "NanumGothic_400Regular",
                            textSectionTitleColor: "#777777",
                        }}
                        minDate={getMinDate()}
                        monthFormat={"yyyy년 MM월"}
                    />
                </SelectDate>
                <SelectTime>
                    <Help number="2" text="시간 선택" />
                    <SelectTimeWrapper>
                        <Ampm>
                            <Am
                                onPress={() => setAmpm("am")}
                                selected={ampm === "am"}
                            >
                                <PlainText>오전</PlainText>
                            </Am>
                            <Pm
                                onPress={() => setAmpm("pm")}
                                selected={ampm === "pm"}
                            >
                                <PlainText>오후</PlainText>
                            </Pm>
                        </Ampm>
                        <InputTime>
                            <Input
                                keyboardType="number-pad"
                                onChangeText={(text) => setValue("hour", text)}
                                defaultValue={getValues("hour")}
                            />

                            <PlainText>시</PlainText>
                            <Input
                                keyboardType="number-pad"
                                onChangeText={(text) => setValue("min", text)}
                                defaultValue={() => {
                                    getValues("min");
                                }}
                            />
                            <PlainText>분</PlainText>
                        </InputTime>
                    </SelectTimeWrapper>
                </SelectTime>
            </Container>
            <ButtonContainer>
                <PlainButton
                    text="다음단계"
                    style={{ width: "80%" }}
                    onPress={handleSubmit(onNextStep)}
                />
                <KakaoButton />
            </ButtonContainer>
        </MainLayout>
    );
}

export default SelectDateTime;
