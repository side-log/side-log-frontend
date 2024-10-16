import { useEffect, useState, useRef, PropsWithChildren } from "react";
import useLogger, { ClickParams } from "../../hooks/useLogger";

interface LoggingClickProps {
  params: ClickParams;
}

export default function LoggingClick({
  params,
  children,
}: PropsWithChildren<LoggingClickProps>) {
  const { logger } = useLogger();

  const [schemaId, setSchemaId] = useState<string | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const parentWithSchemaId = elementRef.current.closest("[data-schema-id]");

      if (parentWithSchemaId != null) {
        const id = parentWithSchemaId.getAttribute("data-schema-id");
        setSchemaId(id);
      } else {
        throw new Error("No parent element with data-schema-id found.");
      }
    }
  }, []);

  const handleClick = () => {
    if (schemaId != null) {
      logger.click(parseInt(schemaId), params);
    }
  };

  return (
    <div ref={elementRef} onClick={handleClick}>
      {children}
    </div>
  );
}
