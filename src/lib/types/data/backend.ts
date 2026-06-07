export interface IBackendTranslation{
    key_name: string,
    base_string: string,
    translation_string: string,
    line_number: number
}

export interface CreateTranslationResult {
    entries: IBackendTranslation[],
    target_path: string,
}