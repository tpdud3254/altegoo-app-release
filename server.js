import { speech } from "./utils";

export const SERVER =
    "http://ec2-3-35-110-238.ap-northeast-2.compute.amazonaws.com:4000";

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

export const ws = new WebSocket(
    `ws:///ec2-3-35-110-238.ap-northeast-2.compute.amazonaws.com:4000`
);

createSocket();
