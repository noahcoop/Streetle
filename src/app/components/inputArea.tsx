"use client";

import { GameState } from "../types/gameState";
import { Answer } from "../types/answer";
import Input from "./input";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const MAX_GUESSES = 6;

export default function InputArea(props: {
  answer: Answer;
  gameState: GameState;
  setGameState: (_: GameState) => void;
}) {
  const [numGuesses, setNumGuesses] = useState<number>(0);
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/possible-answers")
      .then((response) => response.json())
      .then((data) => {
        setPossibleAnswers(data);
      });
  }, []);

  useEffect(() => {
    if (numGuesses >= MAX_GUESSES && !props.gameState.finished) {
      props.setGameState({
        ...props.gameState,
        finished: true,
      });
    }
  }, [numGuesses, props]);

  const guess = (guessInput: string) => {
    if (guessInput.toUpperCase() === props.answer.name.toUpperCase()) {
      props.setGameState({
        ...props.gameState,
        finished: true,
        won: true,
      });
    }

    setNumGuesses(numGuesses + 1);
  };

  const checkDisabled = (idx: number) => {
    return idx !== numGuesses || props.gameState.finished;
  };

  return (
    <div>
      {Array.from(Array(6).keys()).map((idx) => (
        <Input
          key={idx}
          disabled={checkDisabled(idx)}
          guess={guess}
          possibleAnswers={possibleAnswers}
        />
      ))}
    </div>
  );
}
