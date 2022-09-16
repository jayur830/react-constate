import { useCallback } from "react";
import { useContext } from "../Provider";

export default function PasswordLine() {
  console.log('PasswordLine');

  const password = useContext(value => value.password);
  const setPassword = useContext(value => value.setPassword);

  const onKeyUpPassword = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);

  return (
    <tr>
      <td>PASSWORD</td>
      <td><input defaultValue={password} onKeyUp={onKeyUpPassword} /></td>
    </tr>
  );
}