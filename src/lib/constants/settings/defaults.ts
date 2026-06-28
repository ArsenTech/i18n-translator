import { TranslationFormat } from "@/lib/types/enums"

export const DEFAULT_SETTINGS = {
     "app-settings": {
          currNamespaceOnly: true,
          showLineNumbers: false,
          showSidebar: true,
          showGlossary: true,
          autoSave: false,
          defaultGlossaryView: "few",
          defaultFormat: TranslationFormat.Json,
          checkUpdatesOnStartup: false,
          androidTranslatableCol: true,
          androidTranslatable: true,
          compactToolbar: false,
          xliffAutoDetect: true,
          xliffPreserveMeta: true,
          preserveEmpty: true,
          autoDetectBaseLang: true
     },
     "auto-translation-settings": {
          geminiApi: "",
          libreTranslateApi: "",
          libreTranslateServer: "",
          llamaEndpoint: "",
          llamaModel: ""
     },
     "toolbar-settings": {
          newFile: true,
          openFile: true,
          saveFile: true,
          find: true,
          findMissing: true,
          replace: true,
          batchRename: false,
          selectUntranslated: false,
          addToGlossary: true,
          autoTranslate: false,
          validateKeys: true,
          removeUnusedKeys: false,
          transliterate: false,
          glossaryManager: true,
          spellCheck: false
     }
} as const