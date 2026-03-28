import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "./components/ui/button";
import LangSelector from "./components/lang-selector";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  async function greet() {
    setGreetMsg(await invoke("greet", { name: "ArsenTech" }));
  }
  return (
    <main className="p-4 space-y-2">
      <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold">I initialized I18n Content Translator!</h1>
      <p className="text-muted-foreground">TODO: Make a UI</p>
      {greetMsg && (
        <p className="text-primary-foreground">{greetMsg}</p>
      )}
      <Button onClick={greet}>
        Greet!
      </Button>
      <LangSelector/>
      <Toaster/>
    </main>
  );
}

export default App;
