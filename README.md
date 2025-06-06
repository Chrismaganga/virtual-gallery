# Virtual Gallery

A modern web application for artists to showcase their work and connect with art enthusiasts. Built with Next.js, Prisma, and PostgreSQL.

## Features

- User Authentication
- Artwork Management (CRUD operations)
- Gallery Organization
- Social Sharing
- Interactive Viewing Experience
- User Profiles & Collections
- Search & Filtering
- Comments & Engagement
- Analytics & Insights

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Upload**: Custom implementation with Next.js API Routes
- **State Management**: React Query
- **UI Components**: Custom components with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/virtual-gallery.git
   cd virtual-gallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/virtual_gallery"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
virtual-gallery/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/           # Authentication pages
│   └── ...               # Other pages
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                   # Utility functions and configurations
├── prisma/               # Prisma schema and migrations
└── public/               # Static files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- The open-source community for their contributions
