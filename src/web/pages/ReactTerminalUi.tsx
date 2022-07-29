import { useState } from 'react';
import Terminal, { ColorMode, LineType } from 'react-terminal-ui';
const ReactSvg = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    { type: LineType.Output, value: 'Welcome to the React Terminal UI Demo!' },
    { type: LineType.Input, value: 'Some previous input received' },
  ]);
  return (
    <div className="h-full">
      <Terminal
        name="React Terminal Usage Example"
        colorMode={ColorMode.Dark}
        lineData={terminalLineData}
        onInput={terminalInput => console.log(`New terminal input received: '${terminalInput}'`)}
      />
    </div>
  );
};
export default ReactSvg;
