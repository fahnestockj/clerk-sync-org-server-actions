"use client";

import { serverAction } from "./serverAction";

export function ClientComponent() {
  return (
    <button
      onClick={async () => {
        await serverAction();
      }}
    >
      Trigger server action
    </button>
  );
}
