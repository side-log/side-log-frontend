import { useEffect, useRef, useState } from 'react';
import useLogger, { ImpressionParams } from '../../hooks/useLogger';
import { ImpressionArea } from './ImpressionArea';

interface LoggingImpressionProps {
  params?: ImpressionParams;
  children: React.ReactNode | Promise<React.ReactNode>;
}

export default function LoggingImpression({ children, params }: LoggingImpressionProps) {
  const { logger } = useLogger();

  const [schemaId, setSchemaId] = useState<string | null>(null);
  const [hasLoggedImpression, setHasLoggedImpression] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const parentWithSchemaId = elementRef.current.closest('[data-schema-id]');

      if (parentWithSchemaId != null) {
        const id = parentWithSchemaId.getAttribute('data-schema-id');
        setSchemaId(id);
      } else {
        throw new Error('No parent element with data-schema-id found.');
      }
    }
  }, []);

  const handleImpression = () => {
    if (!hasLoggedImpression && schemaId != null) {
      logger.impression(parseInt(schemaId), { ...params });
      setHasLoggedImpression(true);
    }
  };

  return (
    <ImpressionArea ref={elementRef} onImpressionStart={handleImpression}>
      {children as React.ReactNode}
    </ImpressionArea>
  );
}
