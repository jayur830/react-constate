import { useCallback } from "react";
import { useContext } from "../Provider";

export default function UsernameLine() {
  console.log("UsernameLine");

  const username = useContext((value) => value.username);
  const setUsername = useContext((value) => value.setUsername);

  const onKeyUpUsername = useCallback((e: any) => {
    setUsername(e.target.value);
  }, []);

  return (
    <tr>
      <td>USERNAME</td>
      <td>
        <input defaultValue={username} onKeyUp={onKeyUpUsername} />
      </td>
    </tr>
  );
}
