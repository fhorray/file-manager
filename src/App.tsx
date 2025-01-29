import FileManager from './components/file-manager';
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
