import {
  BookOpen,
  BookPlus,
  Cog,
  FilePlus,
  FolderOpen,
  Info,
  Languages,
  RotateCcw,
  RotateCw,
  Save,
  SaveAll,
  Scan,
  Search,
  SpellCheck,
} from "lucide-react";
import { TFunction } from "i18next";
import { CommandAction } from "../types/data";

export const getFileActions = (
  t: TFunction<"translation", "command-popup">
): CommandAction[] => [
  {
    popup: "new",
    label: t("file.new"),
    Icon: FilePlus,
  },
  {
    popup: "open",
    label: t("file.open"),
    Icon: FolderOpen,
  },
  {
    popup: "open-xliff",
    label: t("file.open-xliff"),
    Icon: FolderOpen,
  },
  {
    label: t("file.save"),
    Icon: SaveAll,
    shortcut: "Ctrl+S",
    saveType: "save-all"
  },
  {
    label: t("file.save-as"),
    Icon: Save,
    shortcut: "Ctrl+Shift+S",
    saveType: "save-as"
  },
];

export const getEditActions = (
  t: TFunction<"translation", "command-popup">
): CommandAction[] => [
  {
    popup: "find",
    label: t("edit.find"),
    Icon: Search,
  },
  {
    popup: "replace",
    label: t("edit.replace"),
    Icon: RotateCw,
  },
  {
    popup: "batch-rename",
    label: t("edit.batch-rename"),
    Icon: Scan,
  },
  {
    popup: "spell-check",
    label: t("edit.spell-check"),
    Icon: SpellCheck,
    disabled: true
  },
];

export const getTranslationActions = (
  t: TFunction<"translation", "command-popup">
): CommandAction[] => [
  {
    popup: "add-glossary",
    label: t("translation.add-glossary"),
    Icon: BookPlus,
  },
  {
    popup: "transliterate",
    label: t("translation.transliterate"),
    Icon: Languages,
    disabled: true
  },
];

export const getViewActions = (
  t: TFunction<"translation", "command-popup">
): CommandAction[] => [
  {
    popup: "settings",
    label: t("view.settings"),
    Icon: Cog,
  },
  {
    popup: "glossary",
    label: t("view.glossary"),
    Icon: BookOpen,
  },
  {
    popup: "updater",
    label: t("view.updater"),
    Icon: RotateCcw,
  },
  {
    popup: "about",
    label: t("view.about"),
    Icon: Info,
  },
];