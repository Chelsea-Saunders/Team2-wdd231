export function querySelectorHelp(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element'${selector}' not found; skipping related setup.`);
    }
    return element;
}