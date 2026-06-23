import { IUpdaterState } from "../types"
import { UpdaterStatus } from "../types/enums"

export const PROVIDER_NAMES = {
     "google-translate": "Google Translate",
     gemini: "Google Gemini",
     libretranslate: "Libre Translate",
     "llama-ai": "Llama AI",
} as const
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const INITIAL_UPDATER_STATE: IUpdaterState = {
     status: UpdaterStatus.Checking,
     newVersion: null,
     downloaded: 0,
     total: 0
}