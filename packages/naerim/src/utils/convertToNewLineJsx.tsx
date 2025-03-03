import React from 'react';

export function convertToNewLineJsx(text: string) {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}
