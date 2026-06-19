import "i18next";
import translation from "@i18n/en/translation.json";
import update from "@i18n/en/update.json"

import { LangCode } from "../i18n/config";

declare module "i18next" {
     interface CustomTypeOptions {
          defaultNS: "translation";
          resources: {
               translation: typeof translation;
               update: typeof update
          };
     }
}