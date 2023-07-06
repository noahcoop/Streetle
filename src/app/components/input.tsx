"use client";

import { useCallback, useState } from "react";

const MAX_GUESSES = 6;

export default function Input(props: {
  disabled?: boolean;
  guess: (_: string) => void;
  possibleAnswers: string[];
}) {
  const autoFocusFn = useCallback(
    (element: any) => (element && !props.disabled ? element.focus() : null),
    [props]
  );

  const [inputText, setInputText] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      props.guess(inputText);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <input
        ref={autoFocusFn}
        type="text"
        size={40}
        disabled={props.disabled}
        onKeyDown={handleKeyDown}
        onChange={handleTextChange}
        list="dropdown"
        autoComplete="none"
        autoFocus
      />
      <datalist id="dropdown">
        {props.possibleAnswers.map((possibleAnswer, idx) => (
          <option key={idx} value={possibleAnswer} />
        ))}
      </datalist>
      <button disabled={props.disabled} onClick={() => props.guess(inputText)}>
        Guess!
      </button>
    </div>
  );
}
