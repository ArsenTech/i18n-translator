<p align="center">
     <picture>
          <source media="(prefers-color-scheme: dark)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark.png" />
          <source media="(prefers-color-scheme: light)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
          <img alt="i18n-translator" width="283" height="130" style="object-fit: contain;" src="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
     </picture>
</p>

<h1 align="center">Frequently Asked Questions</h1>

## General
### What is I18N Translator?
**I18N Translator** is a desktop localization tool designed to help translators and developers create, edit, and maintain application translations in multiple file formats.

It provides a simple spreadsheet-like interface for editing translation keys while preserving the original file structure whenever possible.

---

### Is the project open source?
Refer to the [repository license][license-url] for licensing information and contribution guidelines.

---

### What platforms does I18N Translator run on?
**I18N Translator** is built with Tauri + React + Typescript and runs on:
- Windows 10 and later
- Linux depending on which distro
- macOS High Sierra or later (Apple Silicon / arm64)

---

### Where is my data stored?
I18N Translator stores settings, recent translations, and glossaries in a platform-specific data folder (`%appdata%/com.arsentech.i18n-translator` on Windows for example).

---

### How do I report a bug or request a feature?
You can open the issue in following ways:

---

#### Method 1: Straight from the app
![logo dropdown](https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/docs-images/logo-dropdown.png)

1. Open The app
2. Click on **The App Icon**
3. Make sure to click on one of these buttons inside the App Menu
   - **Report a bug** - Opens the Github Issue Template for writing a bug report
   - **Request a feature** - Opens the Github Issue Template for writing a feature request
4. Write some details about the bug you've encountered (or a new feature proposal)
5. Once finished, click on the **Create** button on GitHub

#### Method 2: Straight from GitHub
1. Click on one of these links
   - **Bug Report** - https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=bug_report.md&title=
   - **Feature Request** - https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=feature_request.md&title=
2. Write some details about the bug you've encountered (or a new feature proposal)
3. Once finished, click on **Create**

## App-related
### Which file formats are currently supported?
- JSON
- XML (Desktop)
- Android XML
- Microsoft RESX
- XLIFF 2.0

Additional formats may be added in future releases.

---

### Does the application modify my original translation structure?
The application preserves the original structure whenever possible and updates only translation values or missing entries.

---

### Can I edit existing translations?
Yes. Existing translation files can be opened, modified, and saved.

---

### Can I create a new translation from a base language?
Yes. A new translation file can be generated from an existing base language file.

---

### Is an internet connection required?
No. All translation editing works completely offline.

---

### Is machine translation included?
Not yet. Automatic translation is planned for a future release.

---

### Are glossaries supported?
Glossary support is planned for a future version.

---

### Will my original translation file be overwritten?
No. The application only overwrites the target translation file when you explicitly save your changes.

---
### Navigation
- Docs
  - [Usage Guide](./usage.md)
  - [Installation Guide](./installation.md)
  - [Troubleshooting](./troubleshooting.md)
  - [FAQs](./faq.md)
  - [Translation Guide](./docs/translation.md)
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