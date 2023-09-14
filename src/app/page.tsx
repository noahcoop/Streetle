"use client";

import styles from "./page.module.css";
import Map from "./components/map";
import { useEffect, useState } from "react";
import { Answer } from "./types/answer";
import InputArea from "./components/inputArea";
import { GameState } from "./types/gameState";
import { Modal } from "@mantine/core";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";

const DEFAULT_GAME_STATE: GameState = {
  won: false,
  finished: false,
  guesses: [],
};

export default function Home() {
  const [todayAnswer, setTodayAnswer] = useState<Answer | null>(null);
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [streak, setStreak] = useState<string | null>(null);

  const readGameState = (): string | null => {
    return window.localStorage.getItem("gameState");
  };

  const writeGameState = () => {
    window.localStorage.setItem("gameState", JSON.stringify(gameState));
  };

  const readStreak = () => {
    setStreak(window.localStorage.getItem("streak"));
  };

  const updateStreak = () => {
    const newStreak = gameState.won ? !streak ? "1" : `${parseInt(streak) + 1}` : "0"
    window.localStorage.setItem("streak", newStreak);
    setStreak(newStreak);
  };

  useEffect(() => {
    fetch("/api/today-answer")
      .then((response) => response.json())
      .then((data) => {
        setTodayAnswer(data);
      });

    const cachedState = readGameState();

    if (cachedState) {
      const parsedState = JSON.parse(cachedState) as GameState;

      if (parsedState.saveTime && isToday(parseISO(parsedState.saveTime))) {
        setGameState({...parsedState, fromCache: true});
      }
    }

    readStreak();
  }, []);

  useEffect(() => {
    if (gameState.saveTime) {
      writeGameState();
    }

    if (gameState.finished) {
      if (!gameState.fromCache) {
        updateStreak()
      }

      setModalOpen(true);
    }
  }, [gameState]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>streetle! a daily geography game by noahcoop</p>
      </div>

      {todayAnswer && (
        <>
          <Map answer={todayAnswer} />
          <InputArea
            answer={todayAnswer}
            gameState={gameState}
            setGameState={setGameState}
          />
        </>
      )}

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Congrats!"
      >
        <div>Streak: {streak}</div>
      </Modal>
    </main>
  );
}
