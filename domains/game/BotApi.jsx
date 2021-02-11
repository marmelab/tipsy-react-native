import CONSTANTS from "../../const";

const buildBotGame = (currentGame) => {
    const game = {
        currentPlayer: currentGame.currentPlayer == "red" ? "blue" : "red",
        pucks: {},
        fallenPucks: [],
    };
    for (const puck of currentGame.pucks) {
        const position = puck.position.x + ":" + puck.position.y;
        game.pucks[position] = {
            color: puck.color,
            position: position,
            flipped: puck.flipped,
        };
    }
    return game;
};

const BotApi = {
    getBestMove: async (currentGame) => {
        const game = buildBotGame(currentGame);
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(game),
        };
        return fetch(CONSTANTS.AI_URL, requestOptions)
            .then((res) => res.text())
            .then((text) => {
                return text.split(":").slice(1);
            })
            .catch(() => {
                throw new Error("error calling bot api");
            });
    },
    tilt: async (direction, playerName, gameId) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName, direction }),
        };
        return fetch(
            CONSTANTS.BASE_URL + "/game/" + gameId + "/tilt",
            requestOptions
        ).then(async (res) => {
            if (!res.ok) {
                return Promise.reject(
                    new Error("error on requesting /game/" + game.id + "/tilt")
                );
            }
        });
    },
};

export default BotApi;
