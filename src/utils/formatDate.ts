export function formatDate(date: Date, locale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function formatDateShort(date: Date, locale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

export function toISOString(date: Date): string {
    return date.toISOString();
}
