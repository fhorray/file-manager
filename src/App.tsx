import FileManager from "./components";
import {
  FileManagerConfig,
  FileManagerProvider,
} from "./contexts/file-manager";

const config = {
  baseUrl: "https://media.grupometrocasa.com",
} satisfies FileManagerConfig;

function App() {
  return (
    <>
      <FileManagerProvider config={config}>
        <FileManager />
      </FileManagerProvider>
    </>
  );
}

export default App;
