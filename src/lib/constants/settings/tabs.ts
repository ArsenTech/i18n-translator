import { BookOpen, Cog, Edit, FileIcon, Keyboard, Languages, Trash2, Wrench } from "lucide-react";
import type { ISettingsTab } from "@/lib/types";
import { lazy } from "react";
import { SettingsTab } from "@/lib/types/enums";

import GeneralSettingsLoader from "@/loaders/settings/general";
import FileFormatSettingsLoader from "@/loaders/settings/file-formats";
import ShortcutSettingsLoader from "@/loaders/settings/shortcuts";
import EditorSettingsLoader from "@/loaders/settings/editor";
import TranslationSettingsLoader from "@/loaders/settings/translation";
import ToolbarSettingsLoader from "@/loaders/settings/toolbar";
import GlossarySettingsLoader from "@/loaders/settings/glossary";
import ClearDataSettingsLoader from "@/loaders/settings/clear-data";

export const SETTINGS_TABS: ISettingsTab[] = [
     {
          page: SettingsTab.General,
          Icon: Cog,
          LazyComponent: lazy(()=>import("@/contents/settings/general")),
          Loader: GeneralSettingsLoader
     },
     {
          page: SettingsTab.FileFormats,
          Icon: FileIcon,
          LazyComponent: lazy(()=>import("@/contents/settings/file-formats")),
          Loader: FileFormatSettingsLoader
     },
     {
          page: SettingsTab.Shortcuts,
          Icon: Keyboard,
          LazyComponent: lazy(()=>import("@/contents/settings/shortcuts")),
          Loader: ShortcutSettingsLoader
     },
     {
          page: SettingsTab.Editor,
          Icon: Edit,
          LazyComponent: lazy(()=>import("@/contents/settings/editor")),
          Loader: EditorSettingsLoader
     },
     {
          page: SettingsTab.AutoTranslate,
          Icon: Languages,
          LazyComponent: lazy(()=>import("@/contents/settings/translation")),
          Loader: TranslationSettingsLoader
     },
     {
          page: SettingsTab.Toolbar,
          Icon: Wrench,
          LazyComponent: lazy(()=>import("@/contents/settings/toolbar")),
          Loader: ToolbarSettingsLoader
     },
     {
          page: SettingsTab.Glossary,
          Icon: BookOpen,
          LazyComponent: lazy(()=>import("@/contents/settings/glossary")),
          Loader: GlossarySettingsLoader
     },
     {
          page: SettingsTab.ClearData,
          Icon: Trash2,
          LazyComponent: lazy(()=>import("@/contents/settings/clear-data")),
          Loader: ClearDataSettingsLoader
     },
]