"use client";

import { useCallback, useState } from "react";
import { Autocomplete, Button } from "@mantine/core";
import '../../app/globals.css'

export default function Input(props: {
  disabled?: boolean;
  guess: (_: string) => void;
  possibleAnswers: string[];
  value?: string;
}) {
  const autoFocusFn = useCallback(
    (element: any) => (element && !props.disabled ? element.focus() : null),
    [props]
  );

  const [inputText, setInputText] = useState<string>("");

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
        onClick={() => props.guess(inputText)}
        size="xs"
      >
        Guess!
      </Button>
    </div>
  );
}
