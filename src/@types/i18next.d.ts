import "i18next";
import translation from "@i18n/en/translation.json";
import update from "@i18n/en/update.json"
import quickAccess from "@i18n/en/quick-access.json"
import buttons from "@i18n/en/buttons.json"
import table from "@i18n/en/table.json"
import glossary from "@i18n/en/glossary.json"
import titlebar from "@i18n/en/titlebar.json"
import menubar from "@i18n/en/menubar.json"
import about from "@i18n/en/about.json"
import find from "@i18n/en/find.json"
import autoTranslate from "@i18n/en/auto-translate.json"
import importExport from "@i18n/en/import-export.json"
import replace from "@i18n/en/replace.json"
import fileActions from "@i18n/en/file-actions.json"
import transliterate from "@i18n/en/transliterate.json"
import spellChecker from "@i18n/en/spell-checker.json"

import { LangCode } from "../i18n/config";

declare module "i18next" {
     interface CustomTypeOptions {
          defaultNS: "translation";
          resources: {
               translation: typeof translation;
               update: typeof update;
               "quick-access": typeof quickAccess;
               buttons: typeof buttons;
               table: typeof table;
               glossary: typeof glossary;
               titlebar: typeof titlebar;
               menubar: typeof menubar;
               about: typeof about;
               find: typeof find;
               "auto-translate": typeof autoTranslate;
               "import-export": typeof importExport;
               replace: typeof replace;
               "file-actions": typeof fileActions
               transliterate: typeof transliterate;
               "spell-checker": typeof spellChecker
          };
     }
}