import React, { useEffect } from "react";
import "./style.scss";
import Pipe from "../Pipe";
import Bird from "../Bird";
import Foreground from "../Foreground";

import { connect } from "react-redux";

let gameLoop;
let pipeGenerator;
const Game = ({ status, start, fly }) => {
  if (status === "game_over") {
    clearInterval(gameLoop);
    clearInterval(pipeGenerator);
  }
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 32) {
        fly();
      }
      if (status !== "playing") {
        start();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <div className="game-wrapper">
      <Bird />
      <Pipe />
      <Foreground />
    </div>
  );
};
const fly = () => {
  return (dispatch) => {
    dispatch({ type: "FLY" });
  };
};
const start = () => {
  return (dispatch, getState) => {
    const { status } = getState().game;

    if (status !== "playing") {
      gameLoop = setInterval(() => {
        dispatch({ type: "FALL" });
        dispatch({ type: "RUNNING" });
        check(dispatch, getState);
      }, 300);
      pipeGenerator = setInterval(() => {
        dispatch({ type: "GENETARE" });
      }, 200);
      dispatch({ type: "START" });
    }
  };
};
const check = (dispatch, getState) => {
  const state = getState();
  const birdY = state.bird.y;
  const pipes = state.pipe.pipes;
  const x = state.pipe.x;

  const challenge = pipes
    .map(({ topHeight }, i) => {
      return {
        x1: x + i * 200,
        y1: topHeight,
        x2: x + i * 200,
        y2: topHeight + 100,
      };
    })
    .filter(({ x1 }) => {
      if (x1 > 0 && x1 < 288) {
        return true;
      }
    });

  if (birdY > 512 - 108) {
    dispatch({ type: "GAMEOVER" });
  }

  if (challenge.length) {
    const { x1, y1, x2, y2 } = challenge[0];

    if (
      (x1 < 120 && 120 < x1 + 52 && birdY < y1) ||
      (x2 < 120 && 120 < x2 + 52 && birdY > y2)
    ) {
      dispatch({ type: "GAMEOVER" });
    }
  }
};

const mapStateToProps = ({ game }) => ({ status: game.status });
const mapDispatchToProps = { start, fly };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
