const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const game = {
  player1Move: null,
  player2Move: null,
  result: null,
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const { player, move } = JSON.parse(data);
    if(player === 0) {
        game.player1Move = move;
    }
    else if(player === 1) {
        game.player2Move = move;
    }
    if(game.player1Move && game.player2Move) {
        calculateWinner();
    }

    wss.clients.forEach(sendGame);
  });

  sendGame(ws);
});

function sendGame(client) {
  client.send(JSON.stringify(game));
}

const wins = [
  ['rock', 'scissors'],
  ['scissors', 'paper'],
  ['paper', 'rock'],
];

function calculateWinner() {
    const {player1Move, player2Move} = game;
    if(player1Move === player2Move) {
        game.result = "tie!";
        return;
    }
    const p1Win = wins.find(([p1, p2]) => player1Move === p1 && player2Move === p2);
    if(p1Win) {
        game.result = "Player One Wins!";
    }
    else {
        game.result = "Player Two Wins!";
    }
}
