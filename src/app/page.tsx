"use client";

import { useState } from "react";

import { Button } from "@/stories/Button.tsx";

export default function page() {
  const [first, setfirst] = useState(false);

  return (
    <>
      <h1 className="border border-slate-300">page</h1>
      <Button
        label="dd"
        onClick={() => {
          setfirst(!first);
        }}
        primary={first}
      />
    </>
  );
}
