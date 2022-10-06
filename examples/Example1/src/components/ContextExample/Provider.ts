import { useState } from "react";
// import { createProvider } from "../../../../../dist";
import { createProvider } from "../../../../../src";

interface Props {
  a: string;
  b: number;
  c: boolean;
}

function useExample({ a, b, c }: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(a, b, c);

  return {
    username,
    setUsername,
    password,
    setPassword,
  };
}

export const { Provider, useContext } = createProvider(useExample);
