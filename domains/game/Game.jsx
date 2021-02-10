import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Game = ({ playerName, game }) => {
    return (
        <View>
            <Text>New Game</Text>
            {/* <div class="game">
                <button name="action" type="submit" value="west" class="tilt">
                    Tilt
                </button>
                <div class="row">
                    <div class="cell">
                        <div id="cell00"></div>
                    </div>
                    <div class="cell">
                        <div id="cell01"></div>
                    </div>
                    <div class="cell">
                        <div id="cell02"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell03"></div>
                    </div>
                    <div class="cell">
                        <div id="cell04"></div>
                    </div>
                    <div class="cell left-exit">
                        <div id="cell05"></div>
                    </div>
                    <div class="cell">
                        <div id="cell06"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="cell top-exit">
                        <div id="cell10"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell11"></div>
                    </div>
                    <div class="cell">
                        <div id="cell12"></div>
                    </div>
                    <div class="cell">
                        <div id="cell13"></div>
                    </div>
                    <div class="cell">
                        <div id="cell14"></div>
                    </div>
                    <div class="cell  obstacle">
                        <div id="cell15"></div>
                    </div>
                    <div class="cell">
                        <div id="cell16"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div id="cell20"></div>
                    </div>
                    <div class="cell">
                        <div id="cell21"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell22"></div>
                    </div>
                    <div class="cell">
                        <div id="cell23"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell24"></div>
                    </div>
                    <div class="cell">
                        <div id="cell25"></div>
                    </div>
                    <div class="cell">
                        <div id="cell26"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="cell obstacle">
                        <div id="cell30"></div>
                    </div>
                    <div class="cell">
                        <div id="cell31"></div>
                    </div>
                    <div class="cell">
                        <div id="cell32"></div>
                    </div>
                    <div class="cell">
                        <div id="cell33"></div>
                    </div>
                    <div class="cell">
                        <div id="cell34"></div>
                    </div>
                    <div class="cell">
                        <div id="cell35"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell36"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div id="cell40"></div>
                    </div>
                    <div class="cell">
                        <div id="cell41"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell42"></div>
                    </div>
                    <div class="cell">
                        <div id="cell43"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell44"></div>
                    </div>
                    <div class="cell">
                        <div id="cell45"></div>
                    </div>
                    <div class="cell">
                        <div id="cell46"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div id="cell50"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell51"></div>
                    </div>
                    <div class="cell">
                        <div id="cell52"></div>
                    </div>
                    <div class="cell">
                        <div id="cell53"></div>
                    </div>
                    <div class="cell">
                        <div id="cell54"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell55"></div>
                    </div>
                    <div class="cell bottom-exit">
                        <div id="cell56"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div id="cell60"></div>
                    </div>
                    <div class="cell right-exit">
                        <div id="cell61"></div>
                    </div>
                    <div class="cell">
                        <div id="cell62"></div>
                    </div>
                    <div class="cell obstacle">
                        <div id="cell63"></div>
                    </div>
                    <div class="cell">
                        <div id="cell64"></div>
                    </div>
                    <div class="cell">
                        <div id="cell65"></div>
                    </div>
                    <div class="cell">
                        <div id="cell66"></div>
                    </div>
                </div>
                <button name="action" type="submit" value="east" class="tilt">
                    Tilt
                </button>
            </div> */}
        </View>
    );
};

Game.propTypes = {
    gameId: PropTypes.number,
    playerName: PropTypes.string,
};

export default Game;
