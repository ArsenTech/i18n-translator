import { BookOpen, Braces, SearchCheck, Cog, Edit, FileIcon, Keyboard, Languages, Trash2, Wrench } from "lucide-react";
import { ISettingsTab } from "@/lib/types";
import { lazy } from "react";
import { SettingsTab } from "../types/enums";
import GeneralSettingsLoader from "@/loaders/settings/general";
import FileFormatSettingsLoader from "@/loaders/settings/file-formats";
import ShortcutSettingsLoader from "@/loaders/settings/shortcuts";
import SpellCheckerSettingsLoader from "@/loaders/settings/spell-checker";
import EditorSettingsLoader from "@/loaders/settings/editor";
import TranslationSettingsLoader from "@/loaders/settings/translation";
import ToolbarSettingsLoader from "@/loaders/settings/toolbar";
import GlossarySettingsLoader from "@/loaders/settings/glossary";
import AdvancedSettingsLoader from "@/loaders/settings/advanced";
import ClearDataSettingsLoader from "@/loaders/settings/clear-data";

export const SETTINGS_TABS: ISettingsTab[] = [
     {
          page: SettingsTab.General,
          tabName: "General",
          Icon: Cog,
          LazyComponent: lazy(()=>import("@/contents/settings/general")),
          Loader: GeneralSettingsLoader
     },
     {
          page: SettingsTab.FileFormats,
          tabName: "File Formats",
          Icon: FileIcon,
          LazyComponent: lazy(()=>import("@/contents/settings/file-formats")),
          Loader: FileFormatSettingsLoader
     },
     {
          page: SettingsTab.Shortcuts,
          tabName: "Shortcuts",
          Icon: Keyboard,
          LazyComponent: lazy(()=>import("@/contents/settings/shortcuts")),
          Loader: ShortcutSettingsLoader
     },
     {
          page: SettingsTab.SpellChecker,
          tabName: "Spell Checker",
          Icon: SearchCheck,
          LazyComponent: lazy(()=>import("@/contents/settings/spell-checker")),
          Loader: SpellCheckerSettingsLoader,
          disabled: true
     },
     {
          page: SettingsTab.Editor,
          tabName: "Editor",
          Icon: Edit,
          LazyComponent: lazy(()=>import("@/contents/settings/editor")),
          Loader: EditorSettingsLoader
     },
     {
          page: SettingsTab.Translation,
          tabName: "Translation",
          Icon: Languages,
          LazyComponent: lazy(()=>import("@/contents/settings/translation")),
          Loader: TranslationSettingsLoader
     },
     {
          page: SettingsTab.Toolbar,
          tabName: "Toolbar",
          Icon: Wrench,
          LazyComponent: lazy(()=>import("@/contents/settings/toolbar")),
          Loader: ToolbarSettingsLoader
     },
     {
          page: SettingsTab.Glossary,
          tabName: "Glossary",
          Icon: BookOpen,
          LazyComponent: lazy(()=>import("@/contents/settings/glossary")),
          Loader: GlossarySettingsLoader
     },
     {
          page: SettingsTab.Advanced,
          tabName: "Advanced",
          Icon: Braces,
          LazyComponent: lazy(()=>import("@/contents/settings/advanced")),
          Loader: AdvancedSettingsLoader
     },
     {
          page: SettingsTab.ClearData,
          tabName: "Clear Data",
          Icon: Trash2,
          LazyComponent: lazy(()=>import("@/contents/settings/clear-data")),
          Loader: ClearDataSettingsLoader
     },
]