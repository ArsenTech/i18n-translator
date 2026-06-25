import { FindState } from "@/actions/find"
import { ITranslation } from "./data"

export type FindSuccess = {
     success: true
     translation: ITranslation
     index: number
     findState?: FindState
}
export type FindError = {
     success: false
     error: string
}
export type FindResult = FindSuccess | FindError