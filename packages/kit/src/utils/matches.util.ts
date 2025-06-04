export function matches(element: Element, selector: string) {
    const nativeMatches = element.matches || element.webkitMatchesSelector || (element as any).msMatchesSelector;
    return nativeMatches.call(element, selector);
}
