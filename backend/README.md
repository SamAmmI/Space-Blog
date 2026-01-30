# Space Blog API Backend

A FastAPI backend with SQLAlchemy ORM and Pydantic validation for the Space Blog application.

## Setup

### 1. Create Python Virtual Environment
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
Copy `.env.example` to `.env` and update your MySQL credentials:
```bash
cp .env.example .env
```

Edit `.env` with your MySQL connection details:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=space_blog
```

### 4. Create MySQL Database
```sql
CREATE DATABASE space_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run the Server
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`
API docs: `http://localhost:8000/docs`

## Project Structure

- `main.py` - FastAPI application and endpoints
- `models.py` - SQLAlchemy ORM models (User, Post)
- `schemas.py` - Pydantic validation models
- `database.py` - Database connection and configuration
- `requirements.txt` - Python dependencies

## API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users` - List all users
- `GET /api/users/{user_id}` - Get user with posts
- `PUT /api/users/{user_id}` - Update user
- `DELETE /api/users/{user_id}` - Delete user

### Posts
- `POST /api/posts?author_id=1` - Create new post
- `GET /api/posts` - List all posts
- `GET /api/posts/{post_id}` - Get post details
- `GET /api/users/{user_id}/posts` - Get user's posts
- `PUT /api/posts/{post_id}` - Update post
- `DELETE /api/posts/{post_id}` - Delete post

## Next Steps

1. Implement password hashing (use `passlib` with bcrypt)
2. Add JWT authentication
3. Add request validation improvements
4. Create database migration system (Alembic)
5. Add logging
6. Create unit tests
