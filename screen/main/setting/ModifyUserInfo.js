import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import axios from "axios";
import { SERVER } from "../../../server";
import { getAsyncStorageToken } from "../../../utils";
import { VALID } from "../../../constant";
import PlainText from "../../../component/text/PlainText";
import SubTitleText from "../../../component/text/SubTitleText";

function ModifyUserInfo() {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getRecommendUser();
    }, []);
    const getRecommendUser = async () => {
        try {
            const response = await axios.get(SERVER + "/users/user/recommend", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            });

            console.log(response.data);

            const {
                data: { result },
            } = response;

            if (result === VALID) {
                const {
                    data: {
                        data: { list },
                    },
                } = response;

                setUserList(list);
            } else {
                const {
                    data: { msg },
                } = response;

                console.log(msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <SubTitleText>내 추천인 정보</SubTitleText>

            <View style={{ marginTop: 20 }}>
                {userList.length > 0 ? (
                    userList.map((user, index) => (
                        <View>
                            <PlainText>{user.userName}</PlainText>
                        </View>
                    ))
                ) : (
                    <PlainText>추천인 없음</PlainText>
                )}
            </View>
        </View>
    );
}

ModifyUserInfo.propTypes = {};
export default ModifyUserInfo;
