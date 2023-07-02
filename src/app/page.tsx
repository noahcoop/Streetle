"use client";

import styles from "./page.module.css";
import Map from "./components/map";
import { useEffect, useState } from "react";
import { Guess } from "./types/guess";
import InputArea from './components/inputArea'

export default function Home() {
  const [todayGuess, setTodayGuess] = useState<Guess | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/today-guess")
      .then((response) => response.json())
      .then((data) => {
        setTodayGuess(data);
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>streetle! a daily geography game by noahcoop</p>
      </div>

      {todayGuess && (
        <div>
          <Map guess={todayGuess} />
        </div>
      )}

      <InputArea />
    </main>
  );
}
