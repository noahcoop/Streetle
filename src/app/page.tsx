"use client";

import styles from "./page.module.css";
import Map from "./components/map";
import { useEffect, useState } from "react";
import { Answer } from "./types/answer";
import InputArea from "./components/inputArea";
import { GameState } from "./types/gameState";
import { Modal } from "@mantine/core";

const DEFAULT_GAME_STATE: GameState = {
  won: false,
  finished: false,
  guesses: [],
};

export default function Home() {
  const [todayAnswer, setTodayAnswer] = useState<Answer | null>(null);
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [modalOpen, setModalOpen] = useState<boolean>(false);


  useEffect(() => {
    fetch("http://localhost:3000/api/today-answer")
      .then((response) => response.json())
      .then((data) => {
        setTodayAnswer(data);
      });
  }, []);

  useEffect(() => {
    if (gameState.finished && gameState.won) {
      setModalOpen(true)
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

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Congrats!">
        <>
        </>
      </Modal>
    </main>
  );
}
