# Glitched
# Glitched  

## Team Members  
| ID           | Name                | Email                      | Role       |  
|--------------|---------------------|----------------------------|------------|  
| 20220104013  | Syed Abir Hossain   | borshonjsr@gmail.com       | Backend    |  
| 20220104016  | Alim Bin Yeasin     | alimbinyeasin@gmail.com    | Frontend   |  
| 20220104021  | Ashik Mahmud        | ashikmamud123@gmail.com    | Lead       |  
| 20220104024  | Antik Dhar          | antikdhar1357@gmail.com    | Frontend   |  

---

## Project Overview  

### Project Title  
**Glitched**  

### Objective  
Glitched is a gaming blog platform that delivers the latest gaming news, reviews, and engaging content. It fosters a vibrant community for gamers and gaming enthusiasts.  

### Target Audience  
Gamers, game developers, and gaming enthusiasts who want to stay updated on gaming trends, share opinions, and participate in discussions.  

### Tech Stack  
- **Backend**: Laravel (mandatory)  
- **Frontend**: React with Inertia.js  
- **Rendering Method**: Client-Side Rendering (CSR)  

---

## UI Design  

### Mock UI  
The mock user interface for Glitched has been designed using Figma. It includes screens for filtering articles, profile page, browsing blogs, viewing detailed articles, and interactive features such as likes and comments.

[Figma Design Link](https://www.figma.com/design/WhoQl0oP5QzoSnDZk9HwUl/Glitched?node-id=0-1&t=aOdN5ttpQUVZf6Bc-1) 
---

## Project Features  

- **User Authentication**: Registration, login, and profile management.  
- **Blog Management**:  
  - `GET /blogs` - Fetch all blogs.  
  - `POST /blogs` - Add a new blog.  
  - `GET /blogs/{id}` - Fetch a specific blog.  
  - `PUT /blogs/{id}` - Update a blog.  
  - `DELETE /blogs/{id}` - Delete a blog.  
- **Comment System**: Add comments on blogs.  
- **Like and Save Functionality**: Users can like blogs and save them for later.  
- **Search and Filter**: Search blogs by game titles, genres, or trending topics.  
- **Interactive Features**: Trending sections for enhanced engagement.  

---

---

---
## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- PHP >= 8.0.3
- Composer
- Node.js >= 16.x
- NPM 
- MySQL

### Backend Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Ashik5/Glitched.git
    cd Glitched
    ```

2. **Install PHP dependencies**:
    ```bash
    composer install
    ```

3. **Set up your `.env` file**:
    Copy the `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```

    Then, configure your database credentials and other environment variables.


4. **Run migrations**:
    ```bash
    php artisan migrate:fresh
    ```

5. **Start the Laravel server**:
    ```bash
    php artisan serve
    ```

The backend should now be running on `http://localhost:8000`.

### Frontend Installation

1. **Install JavaScript dependencies**:
    ```bash
    npm install
    ```

2. **Configure the API base URL**:
   Ensure the frontend is set to connect to the correct backend URL. You may want to set the backend URL in an environment variable or directly within the frontend application.
   
   Add your TinyMCE apikey
   

4. **Start the development server**:
    ```bash
    npm run dev
    ```

The frontend should now be running on `http://localhost:5173`.


### Database Setup

1. **Create a new MySQL database**:
   Use MySQL workbench or command-line tools to create a new database (e.g., `glitched`).

2. **Update `.env` for database**:
   Set the correct database connection settings in the `.env` file in the root directory of the Laravel application:
   ```dotenv
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=glitched
   DB_USERNAME=root
   DB_PASSWORD=
   ```


### Run database migrations

3. **Run database migrations**:
    ```bash
    php artisan migrate
    ```

4. **Seed the database (optional)**:
    If you want to populate the database with sample data:
    ```bash
    php artisan db:seed

## Milestones  

### Milestone 1: CRUD Operations & Basic Profile  
- Set up the Laravel backend for handling CRUD operations.  
- Implement user registration, login, and authentication APIs.  
- Create a database schema for users, including profiles and roles.  
- Build APIs for creating, updating, and deleting user profiles.  
- Design and develop a responsive home page.  
- Display user information (e.g., name, profile picture) on the home page.  
- Set up a basic navigation system for the platform.  

### Milestone 2: Blog Functionality  
- Develop the blog creation form with text, images, and tags input.  
- Implement the backend logic for saving blogs to the database.  
- Build APIs for fetching, updating, and deleting blogs.  
- Create the blog description page to display detailed blog content.  
- Add functionality to post comments on blogs.  
- Enable users to like and save blogs.  
- Create an interactive UI for liking and saving blogs with real-time feedback.  
- Display the number of likes and comments for each blog.  
- Allow users to view their saved blogs in a dedicated section.  

### Milestone 3: Filters and Related Features  
- Add a blog tagging system (e.g., genres, trending topics).  
- Implement filtering functionality on the home page for:  
  - Tags (e.g., Action, Strategy, RPG).  
  - Popular blogs (e.g., by most likes or views).  
  - Recently posted blogs.  
- Build APIs to handle filter queries from the frontend.  
- Design and develop a filtering UI with checkboxes, dropdowns, and search bars.  
- Create dynamic pages to display filtered blog results.  
- Optimize database queries for efficient filtering and retrieval.  
- Include pagination for filtered results to enhance performance.  
- Add an analytics section showing trending tags or most viewed blogs.  

---


