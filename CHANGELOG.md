# Change Log
All notable changes of I18N Translator will be documented here.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [0.3.5] - 2026-06-25
### Added
- Editor Settings
  - Auto-detect base language
- Importing / Exporting Settings
### Improved
- **Language code detection** - Slightly updated the logic to detect other language code instances from the file
- **New Translation, Open Translation, Open XLIFF** - Referenced default base and target languages into the form
- **Import Glossary** - Added Validations before settings
### Changed
- Refactored Contexts, Constants, Helpers, and Types
- Cached the function that returns the format from path
### Skeleton loader Support
- Mode Toggler
- Color Changer
- Import and Export buttons on Settings and Glossary Manager

[0.3.5]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.3.5

---

## [0.3.4] - 2026-06-24
### Added
- Appearance
  - Brightness
  - Compact Toolbar mode
  - **New Color** - Grayscale
- General Settings
  - Check for updates
- Toolbar Management Settings
- Glossary Settings
  - Show Sidebar By Default
- File Formats Settings
  - XLIFF Settings
    - Auto-Detect Languages
    - Preserve Metadata
  - Android XML Settings
    - Default Translatable State
    - Show Translatable column
- Editor Settings
  - Preserve Empty Translations
- New Toolbar items
  - Find
  - Batch Rename Keys
  - Add To Glossary 
  - Transliterate Script
  - Glossary Manager

### Skeleton loader Support
- New Settings Items
- Brightness Slider

### Fixed
- Toaster duplication bug
- Loader Mismatch In Tables

### Improved
- Clear Data
  - Clear Settings & Restore Defaults
- **Skeleton Loaders** - Updated the UI to match the layout

[0.3.4]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.3.4

---

## [0.3.3] - 2026-06-23
### Added
- General Settings
  - Appearance
  - Language Settings
- Editor Settings
  - Show current namespace only
  - Show line numbers
  - Show sidebar by default
  - Default Editor Language
  - Auto-save Translations
- Clear Data
  - Clear Recent Translations
  - Clear Settings & Restore Defaults (Frontend)
- Glossary Settings
  - Default glossary view type (Show All / Few)
- Translation Settings
  - Gemini Settings
  - Libre Translate Settings
  - Llama AI Settings
- File Formats Settings
  - Default format for new Translation
- Keyboard Shortcut references

### Skeleton loader Support
- New Settings Items
- Language Selector Items
- Language Icon inside these items

### Added Themes
- Dark mode
- Colors:
  - Sky Blue
  - Lime
  - Rose
  - Violet

### Improved
- **Glossary** - Now handles those where text is not empty, but the term doesn't exist
- **Main Content** - Updated Skeleton Loading
- **Settings** - Changed Scroll Height

[0.3.3]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.3.3

---

## [0.3.2] - 2026-06-19
### Added
- Glossary Apply Actions
  - Apply glossary term using the card as a button
    - Replace matching term in current translation
    - Insert translation if no matching term exists
  - Apply All Matches button
    - Replace every matching glossary term in one action
- Updater to update the app version directly
- About Popup
### New Skeleton loader support
- Logo Dropdown and Menubar
- Updater
- RadioField
- Glossary Manager
- Table Filtering and Sorting Functions
- Tree Node Item
- Every Popup Form posible
- LanguageInput
- Popup Triggers
- Status Cell and Other content
- About Popup Details
### Improved
- XLIFF-related actions like getting the metadata are now cached

[0.3.2]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.3.2

---

## [0.3.1] - 2026-06-17
### Added
- Glossary Visibility Toggler (Show All / Show Few)
- Tools -> Glossary Menu Bar Item
  - Browse all entries
  - Search/filter
  - Edit entries
  - Delete entries
  - Import/export glossary packs to CSV or JSON
### New Skeleton Loader Support
- SelectorField
- ComboboxField
- FilePicker / XliffFilePicker
- LangSelector
- Entire Glossary Manager except the Import / Export button
### Improved
- Input buttons grid layout
### Replaced
- About Window => About Popup
- Settings Window => Settings Popup

[0.3.1]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.3.1

---

## [0.3.0] - 2026-06-17
> [!NOTE]
> The planned release of v0.3.0 has been rescheduled from 2026-06-16 to 2026-06-17 (morning-afternoon) to allow for final polishing and quality improvements before publication.
### Added
- Glossary Sidebar
- Glossary Actions
  - Add to Glossary
  - Load Glossary
  - Auto-load glossary on opening translation
  - Toggle Glossary Sidebar
### Improved
- Skeleton Loaders to match the UI
### Removed
- Compare Difference - Will be replaced with Add to Glossary

[0.3.0]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.3.0

---

## [0.2.7] - 2026-06-14
### Added
- XLIFF translation support
- Android XML support
- **Close Current Translation** item inside the **Open** Quick Action
### Changed
- **Open Translation** menu items are now grouped into a submenu, including a dedicated option for opening XLIFF files
- Refactored XML open and save functions
### Initialized Docs
- Installation
- Usage Guide
- Troubleshooting
- Frequently asked questions
### Improved
- **File Menu** eligibility state
  - No translation open: **Open** actions enabled, **Close Current Translation** disabled
  - Translation open: **Close Current Translation** enabled, **Open** actions disabled
- **Readme** - Now completed

[0.2.7]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.7

---

## [0.2.6] - 2026-06-13
### Added
- XML support
- Microsoft RESX support
- Close Current Translation action
### Changed
- **Save Confirmation** dialog now uses simple **Yes**, **No**, and **Cancel** buttons
### Fixed
- XML parsing issue preserving raw XML entities (e.g. `&amp;`)

[0.2.6]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.6

---

## [0.2.5] - 2026-06-09
### Added
- **Edit Actions**
  - Undo
  - Redo
  - Cut
  - Copy
  - Paste
  - Select All
  - Select Untranslated
  - Clear Selection
- **Save Confirmation Dialog**
  - Prompt to save unsaved changes before closing the application
### Changed
- **NSIS Installer**
  - Icon
  - Sidebar image
  - Header image

[0.2.5]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.5

---

## [0.2.4] - 2026-06-07
### Added
- Find Actions
  - Find
  - Find Next
  - Find Previous
  - Find Missing Keys
- Replace Translations
- Batch Rename Keys
- Compare Difference
- Remove Unused Keys
- Validate Keys
### Improved
- **Differences Table** — Changed columns from `Key | Before | After` to `Key | Source | Translation`
- **Key Column** — Added a tooltip displaying the full key name
### Removed
- **Go to Key Name** — Merged into **Find** using **Key** search mode

[0.2.4]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.4

---

## [0.2.3] - 2026-06-06
### Added
- Jump to Next Blank Field
- Jump to Previous Blank Field
- Keyboard shortcuts for saving and navigation
- Go to Key Name action
### Temporarily Added
- **Current Namespace switch** — Will be moved to Settings once the Settings page is implemented
### Improved
- **Translation Input** — Optimized save and navigation workflow
- **Language Selector** — Added search for faster language selection
### Changed
- Moved several states into context to reduce rerenders and improve performance

[0.2.3]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.3

---

## [0.2.2] - 2026-06-04
> [!NOTE]
> This release focuses on making the File and View menu actions functional.
### Added
- New Translation action
- Open Translation action
- Save actions
  - Save String
  - Save All
  - Save As
- Open Recent submenu (up to 25 recent translations)
- Toggle Sidebar action on desktop
- Keyboard shortcuts for saving
### Improved
- **Table** - Optimized rendering and filtering performance
- **Stats** - Correctly calculated values based on current data
- **Sidebar** - Improved desktop and mobile UX
- **Language Selector** - Made it working with the `useState` approach

[0.2.2]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.2

---

## [0.2.1] - 2026-06-02
### Added
- Spell Checker Popups
  - Dictionary setup form
  - Workflow
  - Summary
- Compare Difference Modal
### Improved
- **Table design** - Fixed the UI sticky header issue
- **Key names** - Now uses monospace font

[0.2.1]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.1

---

## [0.2.0] - 2026-05-31
### Added
- "Toggle Missing Keys Only" Option
- Keyboard shortcuts for zoom
- Popup Forms
  - Auto Translate
  - Batch Rename Keys
  - Find
  - Go To key name
  - New Translation
  - Open Translation
  - Replace Translation
  - Transliterate Script
- Skeleton loading inside the Title Bar and the language selector
- Skeleton loading of the entire main content

[0.2.0]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.2.0

---

## [0.1.3] - 2026-05-27
### Added
- Skeleton loading inside the Main Window
- Toggle Sidebar Menubar option
- **Zoom Actions** - Zoom in, Zoom out, reset zoom
### Initialized
- Few Translation, FileSystem, and Find actions, which is coming soon on v0.2.x
### Improved
- **Language Selector** - Cached the function
### Removed
- The "Open Sidebar" button in favor of the Toggle Sidebar Menubar option

[0.1.3]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.1.3

---

## [0.1.2] - 2026-05-26
### Added
- Sorting + Filtering frontend logic for translations
- Indicators inside the table
- "Borrowed from Source" stat
- Feature to Select translation from the row
- Translation input and Copy from source logic
### Initialized
- Settings Window
- About Window
### Improved
- **Sidebar** - the Responsible UX
- **Progressbar and Stats count** - Uses real data
- **Tree Sidebar** - Now uses real data
- **Translation key and line number stat** - Uses real data
### Removed
- React Router Approach for the native Window approach
- Settings from Quick Actions for the Settings dropdown menu item

[0.1.2]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.1.2

---

## [0.1.1] - 2026-05-24
### Added
- Initial Layout of the Translator
- Sidebar and Table
- Quick access buttons
- Filter, Search, and Sort UI
- New UI changes after initializing the layout
### Improved
- **Menubar and Logo dropdown menu** - Added links and more items

[0.1.1]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.1.1

---

## [0.1.0] - 2026-05-23
> [!IMPORTANT]
> The first pre-release is mostly focused on UI design meaning that it won't work or some parts might work
### Added
- Language Inputs
- Custom Tilebar with Menus
### Initialized
- Main Page with a sample test

[0.1.0]: https://github.com/ArsenTech/i18n-translator/releases/tag/v0.1.0