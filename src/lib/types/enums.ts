export enum TranslationFormat{
     Json = "json",
     Xml = "xml",
     Po = "po",
     Resx = "resx",
     Xliff = "xliff",
}
export enum UpdaterStatus {
     Checking = "checking",
     Updating = "updating",
     NeedsUpdate = "needs-update",
     Updated = "updated",
     CheckError = "failed-check",
     Completed = "completed",
     UpdateError = "failed-update"
}
export enum SettingsTab{
     General = "general",
     FileFormats = "file-formats",
     Shortcuts = "shortcuts",
     Editor = "editor",
     Translation = "translation",
     Toolbar = "toolbar",
     Glossary = "glossary",
     ClearData = "clear-data"
}