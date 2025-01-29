import FileManager from './components';
import { FileManagerProvider } from './contexts/file-manager';

function App() {
  return (
    <>
      <FileManagerProvider>
        <FileManager />
      </FileManagerProvider>
    </>
  );
}

export default App;
