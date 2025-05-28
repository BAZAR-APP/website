# Bazar Booking Web

A modern web application built with Next.js 15, featuring the App Router, Tailwind CSS, and shadcn/ui components for a seamless booking experience.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Language**: TypeScript
- **Linting**: ESLint + Prettier

## 📋 Prerequisites

- Node.js 18.0 or higher
- pnpm (recommended) or npm

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd bazar-booking-web
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Available Scripts

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `pnpm dev`    | Start development server with Turbopack |
| `pnpm build`  | Build the application for production    |
| `pnpm start`  | Start the production server             |
| `pnpm lint`   | Run ESLint to check code quality        |
| `pnpm format` | Format code using Prettier              |

## 📁 Project Structure

```
bazar-booking-web/
├── app/                    # Next.js App Router directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional stylesheets
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🎯 Features

- ⚡ **Next.js 15** with App Router for optimal performance
- 🎨 **Tailwind CSS v4** for rapid UI development
- 🧩 **shadcn/ui** components for consistent design system
- 📱 **Responsive design** out of the box
- 🔧 **TypeScript** for type safety
- 🚀 **Turbopack** for faster development builds
- 📐 **ESLint & Prettier** for code quality
- 🔄 **Lint-staged** for pre-commit hooks

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new):

```bash
pnpm build
```

Or deploy to other platforms like:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) - Learn about shadcn/ui components
- [Next.js App Router](https://nextjs.org/docs/app) - Learn about the new App Router

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
