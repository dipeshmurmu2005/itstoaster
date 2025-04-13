
# 🔔 itstoaster

**A lightweight, theme-aware, and customizable toast notification system — built for modern web apps.**

---

## 📦 Installation

```bash
npm install itstoaster
```

---

## 🛠️ Usage

### 1. Import JavaScript and CSS

```js
import { Toaster } from "itstoaster";
import "itstoaster/style.css";
```

### 2. Create a toast instance

```js
const toast = new Toaster({
  containerId: "custom-toast-container", // optional
  stack: 5 // optional: max number of toasts visible at once
});
```

### 3. Show a toast

```js
toast.success({
  title: "Success!",
  description: "Your settings have been saved.",
  duration: 3000, // optional (default: 3000ms)
  dismissable: true, // optional
  position: "top-right" // optional: top-left, top-center, top-right
});
```

---

## ⚙️ Toast Options

| Option        | Type              | Default      | Description |
|---------------|-------------------|--------------|-------------|
| `title`       | `string \| null`  | `null`       | Optional title text |
| `description` | `string \| null`  | `null`       | Optional description |
| `duration`    | `number \| false` | `3000`       | How long toast stays (in ms). Use `false` to disable auto-dismiss |
| `dismissable` | `boolean`         | `false`      | Show a close button |
| `position`    | `string`          | `top-right`  | One of: `top-left`, `top-center`, `top-right` |
| `icon`        | `string`          | Based on type | Override the default icon (see below) |

---

## 🌈 Theme Support

- Automatically follows **system theme**
- To **force dark mode**, add to your `<html>` tag:

```html
<html data-theme="dark">
```

---

## 🌟 Default Icons

| Type     | Icon name           |
|----------|---------------------|
| success  | `check_circle`       |
| warning  | `exclamation_circle` |
| error    | `triangular_error`   |
| info     | `info_circle`        |
| close    | `cross`              |

✅ You can **override any icon** by passing a custom icon name in the `icon` option.

---

## 📍 Positioning

Toasts can be positioned at:

- `top-left`
- `top-center`
- `top-right` *(default)*

---

## 📦 Toaster Initialization Options

When creating a new `Toaster` instance, you can pass these options:

| Option       | Type     | Description |
|--------------|----------|-------------|
| `containerId` | `string` | Optional ID to use for the toast container element |
| `stack`       | `number` | Max number of toasts shown at once (default: unlimited) |

---

## ✅ Features

- 🚀 Lightweight and fast
- 🎨 Light/dark/system theme support
- 📌 Position control
- 📚 Custom title & description
- 🧱 Stackable with limit
- 🧑‍🎨 Icon override
- ❌ Dismissable option
- ⚡ No framework needed

---

## 📃 License

MIT

---

## 🧑‍💻 Author

Made with ❤️ by [@dipeshmurmu2005](https://github.com/dipeshmurmu2005)
