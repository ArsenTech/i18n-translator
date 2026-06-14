import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(err: unknown){
  const stringErr = String(err);
  const fallback = stringErr.trim()==="" ? "Something went wrong" : stringErr
  return err instanceof Error ? err.message : String(err) ?? fallback
}