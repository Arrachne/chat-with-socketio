import React from "react";
import { observer } from "mobx-react";
import { useStore } from "store/helpers";


const LoginPage: React.FC = observer(() => {
  const store = useStore();

  return <div>123</div>;
});

export default LoginPage;
