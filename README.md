# Intentional Explorer Reveal

Scroll the Explorer when you open a file. Skip that scroll when you close editors.

VS Code's `explorer.autoReveal` setting scrolls the Explorer whenever the active editor changes. That includes the passive case: you close the other tabs, focus lands on a pinned file, and the Explorer jumps to it. [This behavior was requested and closed as out of scope](https://github.com/microsoft/vscode/issues/123020).

This extension wraps the close-editor commands. For the duration of the close, it turns `explorer.autoReveal` off, closes the editors, then restores the previous value. Opening a file, clicking a tab, or using Quick Open still scrolls, because those actions use VS Code's normal reveal.

Leave `explorer.autoReveal` enabled. That is the default.

## Shortcuts

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Close all editors | `Ctrl+K Ctrl+W`, or `Ctrl+M` then `Ctrl+W` | `Cmd+K Cmd+W`, or `Ctrl+K Ctrl+W` |
| Close editors in the group | `Ctrl+K W` | `Cmd+K W` |
| Close the active editor | `Ctrl+W` or `Ctrl+F4` | `Cmd+W` |

`Ctrl+M` then `Ctrl+W` is a chord: press `Ctrl+M`, release it, then press `Ctrl+W`. On macOS, `Cmd+M` minimizes the window, so the extra close-all shortcut there is `Ctrl+K Ctrl+W`.

Close All Editors keeps pinned tabs open. After the other editors close, the pinned file stays active and the Explorer stays where you scrolled.

These commands are also in the Command Palette:

- Close All Editors Without Explorer Reveal
- Close Editors in Group Without Explorer Reveal
- Close Other Editors Without Explorer Reveal
- Close Editors to the Right Without Explorer Reveal
- Close Editor Without Explorer Reveal

## Known limits

Clicking a tab's close button still runs VS Code's built-in close, so the Explorer can scroll in that case.

While a wrapped close runs, the extension sets `explorer.autoReveal` to `false` in workspace settings, then puts the previous workspace value back. If this folder is a git repo, `.vscode/settings.json` can look dirty for that moment.

## Development

Press F5 to open an Extension Development Host with the extension loaded.

```bash
npm install
npm run compile
```

## License

[MIT](LICENSE)
