import { VisibilityState } from "@tanstack/react-table";
import type { IUpdaterState, TranslationFiles } from "../types";
import { UpdaterStatus } from "../types/enums";

export const INITIAL_UPDATER_STATE: IUpdaterState = {
     status: UpdaterStatus.Checking,
     newVersion: null,
     downloaded: 0,
     total: 0
}
export const INITIAL_TRANSLATION_VISIBILITY_STATE: VisibilityState = {
     baseChars: false,
     baseWords: false,
     translationChars: false,
     translationWords: false,
}
export const INITIAL_GLOSSARY_VISIBILITY_STATE: VisibilityState = {
     termChars: false,
     termWords: false,
     translationChars: false,
     translationWords: false,
}
export const INITIAL_FILES_STATE: TranslationFiles = {
     basePath: "",
     targetPath: "",
     format: null
}