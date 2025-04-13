# itstoaster v1 Roadmap

A structured and phased development plan to build a modern, powerful, and beautiful toast notification system with delightful UX and developer-first design.

---

## ✨ Version: `v0.0.7-alpha` (Core Foundation)
- [x] Basic toast types: `success`, `error`, `info`, `warning`
- [x] Custom title and description
- [x] Style import (`style.css`)
- [x] Manual dismiss button
- [x] Positioning (default: top-right)
- [x] Toast Stacking 

## 📚 Phase 2: Developer Experience (DX)
- [ ] Global configuration API
- [ ] Chainable methods (e.g. `.withIcon().at('top-left')`)
- [ ] TypeScript strict mode & types
- [ ] Customizable container selector
- [ ] Zero-dependency mode
- [ ] Auto animation cleanup
- [ ] Keyboard support: `Esc` to dismiss

---

## 🌟 Phase 3: UI, Animations, and Styling
- [ ] Toast appearance animations: fade, slide, zoom
- [ ] Dark mode auto detection
- [ ] Progress bar (linear or radial)
- [ ] Support for SVG icons
- [ ] Custom class injection / Tailwind support
- [ ] Custom layout size (compact, large)
- [ ] Custom corner radius

---

## 🧪 Phase 4: Interaction Enhancements
- [ ] Pause on hover
- [ ] Click outside to dismiss
- [ ] Toast stacking logic (smart layout)
- [ ] Toast queue & scheduling
- [ ] Responsive adjustments (mobile friendly)
- [ ] Smart position detection (avoid nav/footers)

---

## ⚖️ Phase 5: Advanced UX Features
- [ ] Undoable toast (e.g. restore deleted item)
- [ ] Voice toast (Web Speech API integration)
- [ ] Clipboard copy toast
- [ ] Toast with actions (buttons, links)
- [ ] Time-based toast triggers (scheduled)
- [ ] Toast carousel or feed display

---

## 🯡 Phase 6: Ecosystem & Framework Integration
- [ ] Alpine.js plugin mode
- [ ] Vue 3 composable (`useToast()`)
- [ ] React hook (`useToaster`) [planned]
- [ ] Laravel Blade helper & Livewire compatibility
- [ ] CDN-ready UMD build

---

## 🏘️ Phase 7: Playground & Docs
- [ ] Docs: API reference + live examples
- [ ] Hosted playground on GitHub Pages
- [ ] Theme designer UI for custom styling
- [ ] Toast generator / visual editor (optional)

---

## 🔄 Milestone Plan
| Version        | Focus Area                                  |
|----------------|----------------------------------------------|
| `v0.1.7-alpha` | Core functionality, manual setup, toast stacking|
| `v0.1.8-alpha` | Animations, progress bars   |
| `v0.1.9-alpha` | Voice, undo, advanced interaction            |
| `v0.1.10-beta` | Framework support, smart queue, DX polish    |
| `v1.0.0`       | Docs, playground, accessibility, stability   |

---

> Want to contribute? Check out the open issues or propose your own ideas to help make `itstoaster` the most loved toast lib in the JS ecosystem.

