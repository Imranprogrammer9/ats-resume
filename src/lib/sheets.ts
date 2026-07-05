const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

export async function pushToSheets(payload: Record<string, string>): Promise<void> {
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silently fail — sheets integration is optional
  }
}
