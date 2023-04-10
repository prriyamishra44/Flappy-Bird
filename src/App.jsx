import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
const BIRD_SIZE = 20;
const GAME_HIGHT = 500;
const GAME_WIDTH = 500;
const GAME_DIFFICULTY_GAP = 120;
const OBSTRICAL_WIDTH = 50;
function App() {
  const [startGame, setStartGame] = useState(false);
  const [birdPosition, setBirdPosition] = useState(
    GAME_HIGHT / 2 + BIRD_SIZE / 2
  );
  const [score, setScore] = useState(0);
  const [obstracleHight, setObstracleHight] = useState(100);
  const [obstricalLeftPosition, setObstricalLeftPosition] = useState(
    GAME_WIDTH - OBSTRICAL_WIDTH
  );

  useEffect(() => {
    let interval = null;
    if (startGame) {
      interval = setInterval(() => {
        if (birdPosition < GAME_HIGHT - BIRD_SIZE) {
          setBirdPosition((birdPosition) => birdPosition + 4);
        }
      }, 24);
      return () => clearInterval(interval);
    }
  }, [startGame, birdPosition]);
  useEffect(() => {
    let interval = null;
    if (startGame) {
      interval = setInterval(() => {
        if (obstricalLeftPosition > -OBSTRICAL_WIDTH) {
          setObstricalLeftPosition((opstPos) => opstPos - 6);
        } else {
          setObstricalLeftPosition(GAME_WIDTH - OBSTRICAL_WIDTH);
          setObstracleHight(
            Math.floor(Math.random() * (GAME_HIGHT - GAME_DIFFICULTY_GAP))
          );
          setScore((score) => score + 1);
        }
      }, 24);
      return () => clearInterval(interval);
    }
  }, [startGame, obstricalLeftPosition]);
  useEffect(() => {
    if (startGame) {
      const birdColidedWithUpperObstracle = birdPosition < obstracleHight;
      const birdColidedWithLowerObstracle =
        birdPosition > obstracleHight + GAME_DIFFICULTY_GAP;
      if (
        obstricalLeftPosition < BIRD_SIZE &&
        (birdColidedWithLowerObstracle || birdColidedWithUpperObstracle)
      ) {
        setStartGame(false);
       
          let interval = null;
          if (!startGame) {
            interval = setInterval(() => {
              if (birdPosition < GAME_HIGHT - BIRD_SIZE) {
                setBirdPosition((birdPosition) => birdPosition + 4);
              }
            }, 24);
            return () => clearInterval(interval);
          }
        
      }
    }
  }, [startGame, birdPosition, obstracleHight, obstricalLeftPosition]);
  const bottomObstracleHight =
    GAME_HIGHT - obstracleHight - GAME_DIFFICULTY_GAP;
  return (
    <div className="App">
      <div
        onClick={() => {
          const newBirdPosition = birdPosition - 50;
          if (newBirdPosition > 0) {
            setBirdPosition((birdPosition) => birdPosition - 50);
          } else setBirdPosition(0);
        }}
        style={{
          overflow: "hidden",
          position: "relative",
          backgroundColor: "blue",
          color: "white",
          width: `${GAME_HIGHT}px`,
          height: `${GAME_WIDTH}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${0}px`,
            width: `${OBSTRICAL_WIDTH}px`,
            height: `${obstracleHight}px`,
            left: `${obstricalLeftPosition}px`,
            backgroundColor: "green",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: `${obstracleHight + GAME_DIFFICULTY_GAP}px`,
            width: `${OBSTRICAL_WIDTH}px`,
            height: `${bottomObstracleHight}px`,
            left: `${obstricalLeftPosition}px`,
            backgroundColor: "green",
          }}
        />
        <div
          style={{
            position: "absolute",
            backgroundColor: "red",
            width: `${BIRD_SIZE}px`,
            height: `${BIRD_SIZE}px`,
            borderRadius: "50%",
            top: `${birdPosition}px`,
          }}
        ></div>
      </div>
      {score}
      <button
        onClick={() => {
          setStartGame(true);
        }}
      >
        Start Game
      </button>
    </div>
  );
}

export default App;
