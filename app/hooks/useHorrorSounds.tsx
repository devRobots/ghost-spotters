import { useGameStore } from "@/providers/game";
import { useEffect } from "react";
import useSound from "use-sound";

export default function useHorrorSounds() {
  const { isScreaming, stopScream } = useGameStore((state) => state);

  const [playScream1, infoScream1] = useSound("/sounds/scream.mp3", { volume: 1, interrupt: true });
  const [playScream2, infoScream2] = useSound("/sounds/loud_scream.mp3", { volume: 1, interrupt: true });

  const [playWhisper1, infoWhisper1] = useSound("/sounds/cat.mp3", { volume: 1, interrupt: true });
  const [playWhisper2, infoWhisper2] = useSound("/sounds/laugh.mp3", { volume: 1, interrupt: true });
  const [playWhisper3, infoWhisper3] = useSound("/sounds/breath.mp3", { volume: 1, interrupt: true });


  useEffect(() => {
    if (isScreaming) {
      let info = null;
      const action = Math.random();
      const option = Math.random();

      if (action >= 0.75) {
        if (option <= 0.5) playScream1();
        else playScream2();

        info = option <= 0.5 ? infoScream1 : infoScream2;
      }
      else {
        if (option <= 0.33) playWhisper1();
        else if (option <= 0.66) playWhisper2();
        else playWhisper3();

        info = option <= 0.33 ? infoWhisper1 : option <= 0.66 ? infoWhisper2 : infoWhisper3;
      }

      setTimeout(() => {
        stopScream();
      }, info.duration!);
    }
  }, [isScreaming, stopScream]);

  return {};
}