import CONSTANTS from "../const";

const buildBotGame = (currentGame) => {
    const game = {
        currentPlayer: currentGame.currentPlayer == "red" ? "blue" : "red",
        pucks: {},
        fallenPucks: [],
    };
    for (const puck of currentGame.pucks) {
        const position = `${puck.position.x}:${puck.position.y}`;
        game.pucks[position] = {
            color: puck.color,
            position: position,
            flipped: puck.flipped,
        };
    }
    return game;
};

const gameApi = {
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
    tilt: (direction, playerName, gameId) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName, direction }),
        };
        return fetch(
            `${CONSTANTS.BASE_URL}/game/${gameId}/tilt`,
            requestOptions
        ).then((res) => {
            if (!res.ok) {
                return Promise.reject(
                    new Error(`error on requesting /game/${gameId}/tilt`)
                );
            }
        });
    },
    replace: (gameId) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };
        return fetch(
            `${CONSTANTS.BASE_URL}/game/${gameId}/replace`,
            requestOptions
        ).then(async (res) => {
            if (!res.ok) {
                return Promise.reject(
                    new Error(`error on requesting /game/${gameId}/replace`)
                );
            }
        });
    },
    newGame: (playerName, withBot) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName, withBot: withBot }),
        };
        return fetch(`${CONSTANTS.BASE_URL}/game`, requestOptions).then(
            async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                return data;
            }
        );
    },
    pendingGames: () => {
        return fetch(`${CONSTANTS.BASE_URL}/game/pending`).then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.status;
                return Promise.reject(new Error(error));
            }
        });
    },
    joinGame: (playerName, gameId) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName }),
        };
        return fetch(
            `${CONSTANTS.BASE_URL}/game/${gameId}/join`,
            requestOptions
        ).then(async (res) => {
            if (!res.ok) {
                return Promise.reject("une erreur!");
            }
        });
    },
    getGame: (gameId) => {
        return fetch(`${CONSTANTS.BASE_URL}/game/${gameId}`).then(
            async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                return data;
            }
        );
    },
};

export default gameApi;
