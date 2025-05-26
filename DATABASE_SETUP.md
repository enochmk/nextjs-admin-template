# Database Setup Guide

This project uses PostgreSQL with Drizzle ORM. Follow these steps to set up your local database:

## Prerequisites

1. **Install PostgreSQL** on your local machine:

   - **macOS**: `brew install postgresql`
   - **Ubuntu/Debian**: `sudo apt-get install postgresql postgresql-contrib`
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Start PostgreSQL service**:
   - **macOS**: `brew services start postgresql`
   - **Linux**: `sudo systemctl start postgresql`

## Database Setup

1. **Create a database user and database**:

   ```bash
   # Connect to PostgreSQL as superuser
   psql postgres

   # Create a new user (replace 'your_username' and 'your_password')
   CREATE USER your_username WITH PASSWORD 'your_password';

   # Create the database (replace 'shadcn_dashboard')
   CREATE DATABASE shadcn_dashboard OWNER your_username;

   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE shadcn_dashboard TO your_username;

   # Exit psql
   \q
   ```

2. **Configure environment variables**:

   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   # Edit .env.local with your database credentials
   # DATABASE_URL="postgresql://your_username:your_password@localhost:5432/shadcn_dashboard"
   ```

3. **Push the schema to your database**:

   ```bash
   # Push schema directly to database (for development)
   npm run db:push

   # OR generate and run migrations (for production)
   npm run db:generate
   npm run db:migrate
   ```

4. **Seed the database with sample data**:
   ```bash
   npm run db:seed
   ```

## Available Database Commands

- `npm run db:generate` - Generate new migration files
- `npm run db:migrate` - Run pending migrations
- `npm run db:push` - Push schema changes directly to database (development)
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed database with sample data

## Drizzle Studio

You can use Drizzle Studio to visually manage your database:

```bash
npm run db:studio
```

This will open a web interface where you can view and edit your data.

## Troubleshooting

### Connection Issues

- Ensure PostgreSQL is running: `brew services list | grep postgresql`
- Check if the database exists: `psql -l`
- Verify your DATABASE_URL in `.env.local`

### Permission Issues

- Make sure your user has the correct permissions on the database
- You might need to grant additional permissions:
  ```sql
  GRANT ALL ON SCHEMA public TO your_username;
  ```

### Migration Issues

- If you have schema conflicts, you might need to reset your database:
  ```bash
  # Drop and recreate the database
  dropdb shadcn_dashboard
  createdb shadcn_dashboard
  npm run db:push
  npm run db:seed
  ```
