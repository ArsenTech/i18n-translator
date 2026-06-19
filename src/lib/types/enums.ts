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