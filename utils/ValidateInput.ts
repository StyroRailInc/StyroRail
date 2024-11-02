export function validateImperialInput(text: string): string | null {
  if (
    /^(\d+)-(\d+)"$/.test(text) || // matches 10-10"
    /^(\d+)-(\d+)$/.test(text) || // matches 10-10
    /^(\d+)'-?(\d+)"$/.test(text) || // matches 10'-10"
    /^(\d+)'-?(\d+)$/.test(text) || // matches 10'-10
    /^\d+$/.test(text) || // matches 10
    /^(\d+)'$/.test(text) || // matches 10'
    /^(\d+)"/.test(text) || // matches 10"
    /^(\d+)'?(\d+)"$/.test(text) || // matches 10'10"
    /^$/.test(text) // matches ""
  ) {
    return null;
  }
  return `Format: 8, 8', 4", 8-4, 8'-4, 8-4", 8'-4", 8'4"`;
}

export function validateIntegerInput(text: string): string | null {
  if (/^\d+$/.test(text) || /^$/.test(text)) {
    return null;
  }
  return "Entrez un nombre entier";
}
