<p align="center">
     <picture>
          <source media="(prefers-color-scheme: dark)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark.png" />
          <source media="(prefers-color-scheme: light)" style="object-fit: contain;" srcset="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
          <img alt="i18n-translator" width="283" height="130" style="object-fit: contain;" src="https://raw.githubusercontent.com/ArsenTech/i18n-translator/refs/heads/main/.github/logo-mark-alt.png" />
     </picture>
</p>

<h1 align="center">Translating I18N Translator</h1>

## Translation workflow

1. Download the base language files from "the translation source" (../public/locales/en/translation.json).
2. Translate the JSON values with I18N Translator or another editor.
3. Keep the original key names unchanged.
4. Save each file using the correct language folder and namespace.
5. Test the language in the application.
6. Open a pull request for review.

---

## Translation rules

- Translate values only. Do not rename, remove, or duplicate keys.
- Keep the wording clear and consistent with the rest of the application.
- Use the native language name when adding a language option.
- Preserve whitespace where it affects the displayed sentence.
- Open a draft pull request when a term is unclear.

---

## Glossary usage

Use the glossary to keep recurring terms consistent across the application.

When a terminology choice is uncertain:

1. Check existing translations.
2. Check the glossary for the current language pair.
3. Prefer established product, technical, and platform terminology.
4. Leave unclear terms for maintainer review instead of guessing.

---

## Preserving placeholders and XML entities

Keep all placeholders unchanged. For example:

{{string}}
{{number}}

Do not translate, remove, or change placeholder names.

Escape characters correctly in JSON:

Forward slash: \\
Double quote: \"

Keep XML entities unchanged where present:

&amp;
&lt;
&gt;

---

## Reviewing before saving

Before submitting a translation:

- Confirm that every key is still present.
- Check for untranslated strings.
- Verify placeholders and escaped characters.
- Review spelling, punctuation, and capitalization.
- Test the language in the application when possible.

---

## Contributing a language

1. Add your translated files to:
   
   public/locales/<lang-code>/

2. Add the language to "src/i18n/config.ts":
   
   export const languageOptions: languageOption[] = [
     // Existing languages...
     {
          language: "<native language name>",
          code: "<lang-code>",
          countryCode: "<country-code>",
     },
];

3. Translate the backend file:
   
   src-tauri/i18n/<lang-code>.json

4. Switch to the language in the app and test it.

5. Submit a pull request with the translated frontend and backend files.

---
### Navigation
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