import { PropsWithChildren } from "react";

interface Props {
  id: number;
}

function LoggingScreen({ id, children }: PropsWithChildren<Props>) {
  console.log(id);

  return <>{children}</>;
}

export default LoggingScreen;
