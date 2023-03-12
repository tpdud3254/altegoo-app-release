import { speech } from "./utils";

export const SERVER = "https://9edf-211-59-182-118.jp.ngrok.io";

function createSocket() {
    console.log(ws);
    ws.onopen = () => {
        // connection opened
        console.log("connected");
        // send a message
    };

    ws.onmessage = (e) => {
        // a message was received
        console.log("message : ", e.data);
        if (e.data === "hello") {
            speech();
        }
    };

    ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
    };

    ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
    };

    return () => {
        ws.close();
    };
}

export const ws = new WebSocket(`wss:///9edf-211-59-182-118.jp.ngrok.io`);

createSocket();
