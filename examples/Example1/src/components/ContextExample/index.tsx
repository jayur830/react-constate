// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import Footer from "./Footer";
import PasswordLine from "./PasswordLine";
import { Provider } from "./Provider";
import UsernameLine from "./UsernameLine";

export default function ContextExample() {
  return (
    <Provider a="abc" b={123} c={false}>
      <div>
        <table>
          <tbody>
            <UsernameLine />
            <PasswordLine />
          </tbody>
          <Footer />
        </table>
      </div>
    </Provider>
  );
}

// 함수로 작성한 styled component를 선언하세요.
