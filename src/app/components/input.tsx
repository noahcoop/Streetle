"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

const MAX_GUESSES = 6;

export default function Input(props: {
  disabled?: boolean
}) {
  return (
    <div>
      <input type="text" disabled={props.disabled} />
      <button disabled={props.disabled}>Guess!</button>
    </div>
  );
}
