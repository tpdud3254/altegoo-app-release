import React, { useContext, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { color } from "../../../styles";
import MediumText from "../../../component/text/MediumText";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import RegistContext from "../../../context/RegistContext";
import { CALENDAR_HAND, CALENDAR_LOCALES, REGIST_NAV } from "../../../constant";
import Layout from "../../../component/layout/Layout";
import { OptionScroll } from "../../../component/OptionScroll";
import RegularText from "../../../component/text/RegularText";
import { shadowProps } from "../../../component/Shadow";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import RNDateTimePicker from "@react-native-community/datetimepicker";

LocaleConfig.locales["fr"] = CALENDAR_LOCALES;
LocaleConfig.defaultLocale = "fr";

const SelectDateContainer = styled.View`
    background-color: white;
    border-radius: 10px;
`;

const Notice = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
`;

const Item = styled.View`
    margin-bottom: 35px;
`;
const Wrapper = styled.View``;

const DialogContainer = styled.View`
    width: 90%;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: white;
    max-height: 500px;
`;

const optionData = [
    "사다리차",
    "내림",
    "10층",
    "예상 운임 150,000AP",
    "예상 운임 150,000AP",
    "예상 운임 150,000AP",
];
function SelectDateTime({ navigation }) {
    const [selectedDay, setSelectedDay] = useState("");
    const [ampm, setAmpm] = useState(null);
    const { setValue, register, handleSubmit, getValues } = useForm();
    const { registInfo, setRegistInfo } = useContext(RegistContext);

    const [popupShown, setPopupShown] = useState(false);
    const [selectionType, setSelectionType] = useState("");

    console.log(registInfo);

    useEffect(() => {
        register("hour");
        register("min");

        // if (registInfo.dateTime) {
        //     const date = new Date(registInfo.dateTime);
        //     setSelectedDay(
        //         `${date.getFullYear()}-${getMonth(date)}-${getDate(date)}`
        //     );

        //     if (date.getHours() >= 12 || date.getHours() <= 23) {
        //         setAmpm("pm");
        //     } else {
        //         setAmpm("am");
        //     }

        //     if (date.getHours() > 12) {
        //         setValue("hour", date.getHours() - 12);
        //     } else if (date.getHours() === 0) {
        //         setValue("hour", "12");
        //     } else {
        //         setValue("hour", date.getHours());
        //     }

        //     setValue("min", date.getMinutes());
        // }
    }, []);

    const showPopup = (option) => {
        setPopupShown(true);
        setSelectionType(option);
    };

    const hidePopup = () => {
        setPopupShown(false);
        setSelectionType("");
    };

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
        CALENDAR_HAND[month - 1].includes(dateString);

    const isSelectedDay = (dataString) => selectedDay === dataString;

    const onSelectDate = (dateString) => {
        setSelectedDay(dateString);
        hidePopup();
    };
    const onNextStep = ({ hour, min }) => {
        // const selectHour = parseInt(hour);
        // const selectMin = parseInt(min);

        // console.log(ampm, selectHour, selectMin);

        // if (!selectedDay || selectedDay === "") {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "작업 날짜를 선택해주세요.",
        //     });
        //     return;
        // }

        // if (
        //     !ampm ||
        //     (!selectHour && selectHour !== 0) ||
        //     (!selectMin && selectMin !== 0)
        // ) {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "작업 시간을 입력해주세요.",
        //     });
        //     return;
        // }

        // if (
        //     selectHour < 1 ||
        //     selectHour > 12 ||
        //     selectMin < 0 ||
        //     selectMin > 59
        // ) {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "유효한 시간을 입력해주세요.",
        //     });
        //     return;
        // }

        // const selectDateTime = new Date(selectedDay);
        // const hourResult =
        //     ampm === "am"
        //         ? selectHour === 12
        //             ? 0
        //             : selectHour
        //         : selectHour !== 12
        //         ? selectHour + 12
        //         : selectHour;

        // selectDateTime.setHours(hourResult, selectMin);

        // setRegistInfo({ dateTime: selectDateTime, ...registInfo });
        navigation.navigate(REGIST_NAV[2]);
    };
    const LeftArrow = () => (
        <AntDesign name="leftcircleo" size={28} color="black" />
    );

    const RightArrow = () => (
        <AntDesign name="rightcircleo" size={28} color="black" />
    );

    const ItemTitle = ({ title }) => {
        return (
            <RegularText style={{ fontSize: 20, marginBottom: 15 }}>
                {title}
            </RegularText>
        );
    };

    const SelectButton = ({ option }) => {
        return (
            <TouchableOpacity
                onPress={() => showPopup(option)}
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 2,
                    borderBottomColor: color["input-border"],
                    marginTop: 2,
                }}
            >
                <RegularText
                    style={{
                        width: "90%",
                        fontSize: 19,
                        paddingTop: 8,
                        paddingBottom: 16,
                        color:
                            option === "date"
                                ? selectedDay.length > 0
                                    ? color["page-black-text"]
                                    : color["page-lightgrey-text"]
                                : selectedDay.length > 0
                                ? color["page-black-text"]
                                : color["page-lightgrey-text"],
                    }}
                >
                    {option === "date"
                        ? selectedDay.length > 0
                            ? selectedDay
                            : "날짜 선택"
                        : null}
                    {option === "time"
                        ? selectedDay.length > 0
                            ? selectedDay
                            : "시간 선택"
                        : null}
                </RegularText>
                <View
                    style={{
                        width: "10%",
                        alignItems: "flex-end",
                        paddingTop: 8,
                        paddingRight: 2,
                        paddingBottom: 16,
                    }}
                >
                    <Image
                        source={require(`../../../assets/images/icons/allow_down.png`)}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const SelectDate = () => {
        return (
            <SelectDateContainer>
                <Notice>
                    <View
                        style={{
                            backgroundColor: color.sub.yellow + "44",
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
                        style={{
                            marginLeft: 5,
                            marginRight: 5,
                        }}
                    />
                    <MediumText style={{ color: "#777777" }}>
                        손 없는 날
                    </MediumText>
                </Notice>
                <Calendar
                    style={{
                        borderTopColor: "#eeeeee",
                        borderTopWidth: 1,
                    }}
                    renderHeader={(date) => (
                        <View>
                            <MediumText>
                                {date.getFullYear()}년 {getMonth(date)}월
                            </MediumText>
                        </View>
                    )}
                    renderArrow={(direction) =>
                        direction === "left" ? <LeftArrow /> : <RightArrow />
                    }
                    dayComponent={({ date, state }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: isSelectedDay(date.dateString)
                                    ? color.main
                                    : isHandDay(date.dateString, date.month)
                                    ? color.sub.yellow + "44"
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
                                    : () => onSelectDate(date.dateString)
                            }
                        >
                            <MediumText
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
                            </MediumText>
                        </TouchableOpacity>
                    )}
                    theme={{
                        textDayHeaderFontSize: 18,
                        textDayHeaderFontFamily: "SpoqaHanSansNeo-Regular",
                        textSectionTitleColor: "#777777",
                    }}
                    minDate={getMinDate()}
                    monthFormat={"yyyy년 MM월"}
                />
            </SelectDateContainer>
        );
    };

    return (
        <Layout
            scroll={false}
            kakaoBtnShown={true}
            bottomButtonProps={{
                onPress: onNextStep,
                title: "다음으로",
                // disabled: true,
            }}
        >
            <OptionScroll data={optionData} />
            <Item>
                <ItemTitle title="1. 원하시는 날짜를 선택해주세요." />
                <Wrapper>
                    <SelectButton option="date" />
                </Wrapper>
            </Item>
            <Item>
                <ItemTitle title="2. 원하시는 시간을 선택해주세요." />
                <Wrapper>
                    <SelectButton option="time" />
                </Wrapper>
            </Item>
            {popupShown && selectionType === "time" ? (
                <RNDateTimePicker
                    mode="time"
                    value={new Date()}
                    display="clock"
                    onChange={(e) => {
                        console.log(e);
                        hidePopup();
                    }}
                />
            ) : (
                <Dialog
                    dialogStyle={{
                        width: "100%",
                        backgroundColor: "#ffffff00",
                    }}
                    visible={popupShown}
                    onTouchOutside={hidePopup}
                    overlayOpacity={0.5}
                    overlayBackgroundColor="#00000044"
                    onHardwareBackPress={hidePopup}
                >
                    <DialogContent
                        style={{ width: "100%", alignItems: "center" }}
                    >
                        <DialogContainer style={shadowProps}>
                            <MediumText>
                                <SelectDate />
                            </MediumText>
                        </DialogContainer>
                    </DialogContent>
                </Dialog>
            )}
        </Layout>
    );
}

export default SelectDateTime;
