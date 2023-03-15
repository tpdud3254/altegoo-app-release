import React from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";

function BlockUser() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <View style={{ height: 700 }}>
                <WebView
                    scalesPageToFit={false}
                    setDisplayZoomControls={false}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={false}
                    containerStyle={{ width: 400, height: 700 }}
                    source={{
                        uri: "https://master.d1p7wg3e032x9j.amplifyapp.com/",
                    }}
                />
            </View>
        </View>
    );
}

BlockUser.propTypes = {};
export default BlockUser;
