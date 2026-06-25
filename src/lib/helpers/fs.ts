import { writeTextFile } from "@tauri-apps/plugin-fs";
import type { GlossaryEntry } from "../types/data";

export function getFileName(path: string) {
     return path.split(/[\\/]/).pop() ?? path
}
const escapeCSV = (value: unknown) => {
     if (value == null) return "";
     const str = String(value);
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
     }
     return str;
};
export const exportCSV = async (path: string, data: GlossaryEntry[]) => {
     const headers = ["term", "translation", "partOfSpeech", "domain", "caseSensitive"];
     const rows = data.map(item =>headers.map(h => escapeCSV(item[h as keyof typeof item])).join(","));
     await writeTextFile(path, [headers.join(","), ...rows].join("\n"));
};
export const exportJSON = async(path: string, data: GlossaryEntry[]) => {
     const jsonData = JSON.stringify(data,null,2);
     await writeTextFile(path,jsonData);
}