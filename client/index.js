import "./index.scss";

let ws;
function start(){
    ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = function({ data }) {
        document.getElementById("game").innerHTML = data;
    };
    ws.onclose = function(){
        // attempt reconnection on close
        setTimeout(start, 1000);
    };
}
start();

console.log(document.getElementById("player-one-send"));

document.getElementById("player-one-send").addEventListener('click', () => {
    const {value} = document.getElementById("player-one-select");
    ws.send(JSON.stringify({ player: 0, move: value }));
});

document.getElementById("player-two-send").addEventListener('click', () => {
    const {value} = document.getElementById("player-two-select");
    ws.send(JSON.stringify({ player: 1, move: value }));
});
