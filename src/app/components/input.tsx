"use client";

import { useCallback, useState } from "react";
import { Autocomplete, Button } from "@mantine/core";

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

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Autocomplete
        ref={autoFocusFn}
        type="text"
        disabled={props.disabled}
        onKeyDown={handleKeyDown}
        onChange={setInputText}
        list="dropdown"
        autoComplete="none"
        autoFocus
        data={props.possibleAnswers}
        limit={100}
        size="xs"

      />
      <Button 
        disabled={props.disabled}
        onClick={() => props.guess(inputText)}
        size="xs"
      >
        Guess!
      </Button>
    </div>
  );
}
