<p align="center">
     <picture>
          <source media="(prefers-color-scheme: dark)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark.png" />
          <source media="(prefers-color-scheme: light)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
          <img alt="i18n-translator" width="283" height="130" style="object-fit: contain;" src="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
     </picture>
</p>

<h1 align="center">Frequently Asked Questions</h1>

## What is I18N Translator?

I18N Translator is a desktop localization editor for creating, editing, and maintaining translation files.

It provides a spreadsheet-like interface for translation keys while preserving file structure whenever possible.

---

## Is the project open source?
Refer to the [repository license][license-url] for licensing information.

---

## Which platforms are supported?
I18N Translator is built with Tauri, React, and TypeScript.

Windows packages are currently available. Linux and macOS support depends on released packages for those platforms. It's compatible on
- Windows 10 and later
- Linux depending on which distro
- macOS High Sierra or later (Apple Silicon / arm64)

---

## Where is my data stored?
I18N Translator stores settings, recent translations, and glossaries in the application data directory. On Windows, this is typically under:

```txt
%APPDATA%\com.arsentech.i18n-translator
```

---

## How do I report a bug or request a feature?
![logo dropdown](https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/docs-images/logo-dropdown.png)

From the app:

1. Open the app menu.
2. Select **Report a bug** or **Request a feature**.
3. Complete the GitHub issue form.
4. Submit the issue.

You can also open an issue directly from the repository.

---

## Which file formats are currently supported?
- JSON
- Desktop XML
- Android XML
- Microsoft RESX
- XLIFF 2.0

Additional formats may be added in future releases.

---

## Are glossaries supported?
Yes. You can create, edit, import, export, and apply glossary entries for the selected language pair.

---

## Will my original file be overwritten?
Only the selected target translation file is overwritten when you explicitly use **Save**.

---

## Can I edit existing translations?
Yes. Existing translation files can be opened, modified, and saved.

---

## Can I create a new translation from a base language?
Yes. A new translation file can be generated from an existing base language file.

---

## Is an internet connection required?
No. Translation editing and glossary features work offline.

---

## Is machine translation included?
Not yet. Automatic translation providers are planned for a future release.

---
## Navigation
- Docs
  - [Usage Guide](./usage.md)
  - [Installation Guide](./installation.md)
  - [Troubleshooting](./troubleshooting.md)
  - [FAQs](./faq.md)
  - [Translation Guide](./translation.md)
  - [Contribution Guide](./CONTRIBUTING.md)
- [← Back to README](./README.md)

> GitHub [@ArsenTech][github-url] &nbsp;&middot;&nbsp;
> YouTube [@ArsenTech][yt-url] &nbsp;&middot;&nbsp;
> Patreon [ArsenTech][patreon-url] &nbsp;&middot;&nbsp;
> [ArsenTech's Website][website-url]

[github-url]: https://github.com/ArsenTech
[yt-url]:https://www.youtube.com/channel/UCrtH0g6NE8tW5VIEgDySYtg
[patreon-url]:https://www.patreon.com/ArsenTech
[website-url]: https://arsentech.github.io
[license-url]: https://github.com/ArsenTech/i18n-translator/blob/main/LICENSE