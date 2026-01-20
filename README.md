# 🐦 Pigeon REST

**Pigeon REST** is a lightweight, web-based HTTP Client built with **Nuxt** and **Nuxt UI**.
It serves as a modern alternative to tools like Postman or Insomnia, running directly in your browser while bypassing CORS issues via a smart server-side proxy.

<!-- ![Pigeon REST Preview](./.github/assets/preview.png) -->

## ✨ Features

- 🚀 **Full HTTP Support**: GET, POST, PUT, PATCH, DELETE.
- 🛡️ **Smart Proxy**: Built-in Nitro server route using **Got** to bypass CORS and capture low-level network details.
- 💅 **Modern UI**: Built with Nuxt UI and Tailwind CSS for a sleek, dark-mode ready interface.
- 📝 **Advanced Editors**:
  - **CodeMirror** integration for JSON Body (syntax highlighting, linting).
  - **Dynamic Table** for Request Headers management.
- 📊 **Detailed Response Metrics**:
  - Status Code & Description (via MDN standards).
  - Request Duration (ms).
  - Response Size (Headers + Body).
- 🛑 **Request Cancellation**: Abort ongoing requests with a single click.
- ✅ **Validation**: Robust input validation using **Valibot**.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com)
- **UI Library**: [Nuxt UI](https://ui.nuxt.com)
- **Editor**: [CodeMirror](https://codemirror.net)
- **Validation**: [Valibot](https://valibot.dev)
- **HTTP Client**: [Got](https://github.com/sindresorhus/got) (Server-side)
- **Icons**: [Phosphor Icons](https://phosphoricons.com) (via Nuxt UI)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/pigeon-rest/pigeon
cd pigeon
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to http://localhost:3000.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (git checkout -b feat/amazing-feature)
3. Commit your changes (git commit -m 'feat: add some amazing-feature')
4. Push to the branch (git push origin feat/amazing-feature)
5. Open a Pull Request

📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
