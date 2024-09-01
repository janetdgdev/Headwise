import { useContext } from "react";
import { LevelContext } from "../Text/LevelContext";

export function Section({children}) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}

