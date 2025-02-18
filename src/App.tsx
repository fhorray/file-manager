import { config } from '../dosya.config';
import FileManager from './components';

import { DosyaProvider } from './providers/dosya-provider';
import { DosyaConfigProps } from './types/dosya';

function App() {
  return (
    <>
      <DosyaProvider>
        <FileManager />
      </DosyaProvider>
    </>
  );
}

export default App;
