import "i18next";
import translation from "@i18n/en/translation.json";
import update from "@i18n/en/update.json"
import quickAccess from "@i18n/en/quick-access.json"
import buttons from "@i18n/en/buttons.json"
import table from "@i18n/en/table.json"

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
          };
     }
}