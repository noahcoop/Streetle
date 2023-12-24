"use client";

import { GameState } from "../types/gameState";
import { Answer } from "../types/answer";
import Input from "./input";
import { useEffect, useState } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { formatDateStringEST } from "../../../lib/date-format";
import { GuessResult } from "../types/guessResult";

const MAX_GUESSES = 6;

export default function InputArea(props: {
  answer: Answer;
  gameState: GameState;
  setGameState: (_: GameState) => void;
}) {
  const [numGuesses, setNumGuesses] = useState<number>(0);
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/possible-answers")
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
        saveTime: formatDateStringEST(new Date()),
        fromCache: false
      });
    }
  }, [numGuesses, props]);

  const guess = (guessInput: string): GuessResult => {
    if (!possibleAnswers.find((answer) => answer.toUpperCase() === guessInput.toUpperCase())) {
      alert("Can't find this city in our database...guess again!")
      return 'invalid'
    }

    const winningGuess = guessInput.toUpperCase() === props.answer.name.toUpperCase()

    props.setGameState({
      ...props.gameState,
      finished: winningGuess,
      won: winningGuess,
      guesses: [...props.gameState.guesses, guessInput],
      saveTime: formatDateStringEST(new Date()),
      fromCache: false
    })

    setNumGuesses(numGuesses + 1);

    return winningGuess ? 'correct' : 'wrong'
  };

  const checkDisabled = (idx: number) => {
    return idx !== numGuesses || props.gameState.finished;
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column',gap: 8}}>
      {Array.from(Array(6).keys()).map((idx) => (
        <Input
          key={idx}
          disabled={checkDisabled(idx)}
          guess={guess}
          possibleAnswers={possibleAnswers}
          value={props.gameState.guesses[idx]}
        />
      ))}
    </div>
  );
}
