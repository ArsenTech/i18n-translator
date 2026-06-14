<p align="center">
     <picture>
          <source media="(prefers-color-scheme: dark)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark.png" />
          <source media="(prefers-color-scheme: light)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
          <img alt="i18n-translator" width="283" height="130" style="object-fit: contain;" src="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
     </picture>
</p>

<h1 align="center">Troubleshooting</h1>

## The translation file cannot be opened

* Verify that the file exists.
* Verify that the file format is supported.
* Ensure the XML or JSON syntax is valid.

---

## Some translation keys are missing
Ensure that the base language file matches the translation file. Keys that do not exist in the base file are ignored.

---

## Escaped XML entities appear differently
XML entities such as `&amp;`, `&lt;`, and `&gt;` are preserved during parsing and saving to prevent accidental data loss.

---

## The save operation fails

Check that:
* The destination file is writable.
* The file is not opened by another application.
* You have sufficient filesystem permissions.

---

## The application closes unexpectedly
Restart the application and reopen the translation project. If the issue persists, create an issue with the affected file and reproduction steps.

---

## Unsupported file format

If a file cannot be opened:
- Verify that the selected format matches the file.
- Ensure the file is a supported localization format.
- Try opening the file with a text editor to confirm it is not corrupted.

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