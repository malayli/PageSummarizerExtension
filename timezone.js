function getTimezoneLabel() {
    const offset = -new Date().getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(offset) / 60);
    const mins = Math.abs(offset) % 60;
  
    const offsetStr = `UTC${sign}${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")}`;
    const name = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    return `${name} (${offsetStr})`;
}

export { getTimezoneLabel };
