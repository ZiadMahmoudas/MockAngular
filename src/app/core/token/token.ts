import { InjectionToken } from "@angular/core";

export const BROWSER_STORAGE = new InjectionToken<Storage>("browserStorage",{
  factory:()=> localStorage,
  providedIn:"root",
});
