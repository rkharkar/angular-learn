// src/types/import-meta.d.ts
interface ImportMeta {
  readonly env: {
    readonly [key: string]: string | boolean | undefined;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
  }
}
