import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

export async function createAboutWindow() {
     const existing = await WebviewWindow.getByLabel("about")

     if (existing) {
          existing.setFocus()
          return
     }

      new WebviewWindow("about", {
          title: "About I18N Translator",
          width: 600,
          height: 800,
          decorations: false,
          url: "/about.html"
     })
}

export async function createSettingsWindow() {
     const existing = await WebviewWindow.getByLabel("settings")

     if (existing) {
          existing.setFocus()
          return
     }

     new WebviewWindow("settings", {
          title: "Settings",
          width: 1000,
          height: 800,
          decorations: false,
          url: "/settings.html"
     })
}