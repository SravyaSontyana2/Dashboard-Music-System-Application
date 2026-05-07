"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Speedometer } from "./speedometer";
import { RPMGauge } from "./rpm-gauge";
import { CenterHUD } from "./center-hud";
import { FuelBattery } from "./fuel-battery";
import { ClusterNavbar, type DriveMode } from "./cluster-navbar";
import { StatusBar } from "./status-bar";

interface ClusterScreenProps {
  onMusicClick: () => void;
}

export function ClusterScreen({ onMusicClick }: ClusterScreenProps) {
  const [speed, setSpeed] = useState(87);
  const [rpm, setRpm] = useState(3200);
  const [fuel] = useState(74);
  const [battery, setBattery] = useState(84);
  const [driveMode, setDriveMode] = useState<DriveMode>("comfort");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
      setDate(
        d.toLocaleDateString(undefined, {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSpeed((s) => {
        const factor = driveMode === "sport" ? 12 : driveMode === "eco" ? 3 : 6;
        const drift = (Math.random() - 0.5) * factor;
        return Math.max(0, Math.min(220, s + drift));
      });
      setRpm((r) => {
        const factor = driveMode === "sport" ? 700 : driveMode === "eco" ? 200 : 400;
        const drift = (Math.random() - 0.5) * factor;
        return Math.max(800, Math.min(7800, r + drift));
      });
      setBattery((b) => Math.max(20, Math.min(100, b + (Math.random() - 0.55) * 0.4)));
    }, 700);
    return () => clearInterval(id);
  }, [driveMode]);

  return (
    <motion.div
      key="cluster-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-screen flex-col"
    >
      <StatusBar
        time={time || "--:--"}
        outsideTemp={18}
        range={312}
        gear="D3"
        battery={Math.round(battery)}
      />

      <section className="relative flex-1 px-6 md:px-10 py-6">
        <div className="grid h-full items-center gap-8 lg:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <Speedometer speed={speed} maxSpeed={240} unit="km/h" />
          </motion.div>

          <div className="flex justify-center order-first lg:order-none">
            <CenterHUD
              time={time || "--:--"}
              date={date || ""}
              modelName="MBX-Series · EQS"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-end gap-4"
          >
            <RPMGauge rpm={rpm} maxRpm={8000} redline={6500} />
            <FuelBattery fuel={fuel} battery={Math.round(battery)} />
          </motion.div>
        </div>
      </section>

      <ClusterNavbar
        driveMode={driveMode}
        onDriveModeChange={setDriveMode}
        onMusicClick={onMusicClick}
      />
    </motion.div>
  );
}
