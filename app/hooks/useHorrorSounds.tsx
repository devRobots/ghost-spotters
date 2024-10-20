/* eslint-disable react-hooks/exhaustive-deps */
import useSound from "use-sound";
import { useCallback, useEffect } from "react";
import { useGameStore } from "@/providers/game";

export default function useHorrorSounds() {
  const { status, time, spotted, shutup, scream, unmark } = useGameStore((state) => state);

  const [playAmbient] = useSound("/sounds/ambient.mp3", { volume: 0.25, interrupt: false });
  const [playHeartbeat] = useSound("/sounds/heartbeat.mp3", { volume: 2, interrupt: false, playbackRate: 1.5 });

  const [playScream1, infoScream1] = useSound("/sounds/scream.mp3", { volume: 1, interrupt: true });
  const [playScream2, infoScream2] = useSound("/sounds/loud_scream.mp3", { volume: 1, interrupt: true });

  const [playWhisper1, infoWhisper1] = useSound("/sounds/cat.mp3", { volume: 1, interrupt: true });
  const [playWhisper2, infoWhisper2] = useSound("/sounds/laugh.mp3", { volume: 1, interrupt: true });
  const [playWhisper3, infoWhisper3] = useSound("/sounds/breath.mp3", { volume: 1, interrupt: true });

  const playScream = useCallback(() => {
    scream();
    const option = Math.random();
    const info = option <= 0.5 ? infoScream1 : infoScream2;

    if (option <= 0.5) playScream1();
    else playScream2();

    setTimeout(() => {
      shutup();
      unmark();
    }, info.duration!);
  }, [shutup, playScream1, playScream2]);

  const playWhisper = useCallback(() => {
    const option = Math.random();
    const info = option <= 0.33 ? infoWhisper1 : option <= 0.66 ? infoWhisper2 : infoWhisper3;

    if (option <= 0.33) playWhisper1();
    else if (option <= 0.66) playWhisper2();
    else playWhisper3();

    setTimeout(() => {
      unmark();
    }, info.duration!);
  }, [shutup, playWhisper1, playWhisper2, playWhisper3]);

  useEffect(() => {
    if (spotted) {
      if (Math.random() >= 0.75) playScream();
      else playWhisper();
    }
  }, [spotted, playScream, playWhisper]);

  useEffect(() => {
    if (time === 30) playHeartbeat();
  }, [time]);

  useEffect(() => {
    if (status === "playing") playAmbient();
  }, [status]);
}