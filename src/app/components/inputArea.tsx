"use client";

import Input from "./input";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const MAX_GUESSES = 6;

export default function InputArea() {
  const [numGuesses, setNumGuesses] = useState<number>(0);

  return (
    <div>
      {Array.from(Array(6).keys()).map((num) => (
        <Input key={num} disabled={num > numGuesses} />
      ))}
    </div>
  );
}
