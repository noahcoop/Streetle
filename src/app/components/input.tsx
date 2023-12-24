"use client";

import { useCallback, useState } from "react";
import { Autocomplete, Button, CheckIcon, CloseIcon } from "@mantine/core";
import '../../app/globals.css'
import { GuessResult } from "../types/guessResult";

export default function Input(props: {
  disabled?: boolean;
  guess: (_: string) => GuessResult;
  possibleAnswers: string[];
  value?: string;
}) {
  const autoFocusFn = useCallback(
    (element: any) => (element && !props.disabled ? element.focus() : null),
    [props]
  );

  const [inputText, setInputText] = useState<string>("");
  const [inputResult, setInputResult] = useState<GuessResult>("unanswered");

  const getResultText = () => {
    if (inputResult === "correct") {
      return "Right!"
    } else if (inputResult === "wrong") {
      return "Wrong!"
    } else {
      return "Guess!"
    }
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Autocomplete
        ref={autoFocusFn}
        type="text"
        disabled={props.disabled}
        onChange={setInputText}
        list="dropdown"
        autoComplete="none"
        autoFocus
        data={props.possibleAnswers}
        limit={props.possibleAnswers.length}
        size="xs"
        value={props.value}
      />
      <Button
        disabled={props.disabled}
        onClick={() => {
          const result = props.guess(inputText)
          setInputResult(result)
        }}
        size="xs"
      >
        {getResultText()}
      </Button>
    </div>
  );
}
