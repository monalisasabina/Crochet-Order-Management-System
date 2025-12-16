## 1. Title & Objective
### CROCHET ORDER  MANAGEMENT SYSTEM

I will be using Next.js for this project. I selected it out of curiosity. I'd like to know what the actual difference is between React.js and Next.js, and why most job postings I have seen want a developer with experience in Next.js. 

From my research online, what intrigued me is this statement: “Next.js is a popular React-based framework used in building web applications with the use of React components. Next.js provides additional structure, features, and optimization for your web application.” from freecodecamp.

Crochet is my hobby, and it is slowly turning out to be a side hustle. I get orders from friends and family. Recently, a relative asked me, “Where is the scarf you were to crochet for me?”…. Oops! So apparently, I had forgotten all about it since I hadn’t written it down. So with this application, I’m hoping I will be able to track down orders given, and I should be able to track them to know if I have finished them.

 

## 2. Quick Summary of the Technology
Next.js is a React framework used for building full-stack web applications. It was created by Vercel.
It is used in e-commerce platforms, marketing and corporate websites, the media industry, business services, and community-driven web apps.
Next.js has been used to build the official website of OpenAI. Through the website, the user is informed about the company's research, and they also inform the user about their products, ChatGPT and DALL-E.


### 3. System Requirements
- Operating systems: macOS, Windows/Linux
- Minimum RAM: 4GB
- Software:   
```
-Node.js(LTS version, 18+)
-Git
```
- Code editor(IDE): Visual Studio Code(recommended)
- Browser: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari
- Internet Connection: Required for initial setup


### 4. Installation & Setup Instructions
Ensure you have all the system requirements listed above
1. To install Node.js:
Visit the Node.js website
Download the LTS version
Run the installer and follow the prompts
To verify if installed, run:
```bash
      node -v
      npm -v
```

2. Access the project’s GitHub repository;
https://github.com/monalisasabina/Crochet-Order-Management-System

Then fork and clone the repository.
```git clone <repository-url>```
To open the directory on the terminal;
```cd crochet-order-management-system```


3. Install the application dependencies for both frontend and backend, run the code;
Frontend:
```bash
cd Client
npm install

Backend:
cd Server
npm install
```

To start the application;
```bash
Frontend:
PORT=4000 npm run dev
Backend:
npm run dev
```

To access the application on the browser:
Frontend:
```http://localhost:4000```
Backend:
```http://localhost:3000```



### 5. AI Prompt journal

| # | Prompt Theme                          | Key Takeaways |
|---|--------------------------------------|---------------|
| 1 | Next.js Installation (9/12/2025)     | - Requires Node.js ≥18.17, Windows/macOS/Linux, modern browser.<br>- Install via `npx create-next-app@latest my-app`.<br>- Recommended project structure: `client/` for frontend, `server/` for backend, root `package.json`. |
| 2 | Client-Side Routing (11/12/2025)     | - Next.js uses file-system routing (`pages/` or `app/`) instead of central `<Router>`.<br>- Pages are mapped to URLs automatically.<br>- Next.js supports JS or TS; choose JS with `--javascript` flag. |
| 3 | Setting up the Backend                | - Next.js backend uses JS/TS and Prisma; API routes in `app/api/<route>/route.js`.<br>- Python uses Flask & SQLAlchemy.<br>- Prisma setup: `prisma/` for models, `lib/prisma.js` for client, `.env` for DB.<br>- Use REST API endpoints for CRUD operations. |
| 4 | Setting up Models (Prisma)           | - Define models in `schema.prisma`.<br>- Supports one-to-one, one-to-many, many-to-many relationships.<br>- Run migrations after modeling: `npx prisma migrate dev --name <name>`.<br>- Use Prisma Studio to inspect DB. |
| 5 | Verification of Prisma Models         | - Models mostly valid; minor fixes:<br>  - Field names camelCase.<br>  - `endDate` optional in Order.<br>  - Add `updatedAt`, `unique` constraints.<br>  - Notification model needs Boolean `isRead`, `message`, `createdAt`.<br>- Python habits noticed: explicit join tables, developing tables first. |
| 6 | Code Readability Improvement          | - Repeated ID extraction/validation should use helper function.<br>- Better naming: `id→clientId`, `body→updatedData`.<br>- Break down logic, separate error handling.<br>- Maintain consistent style and spacing. |
| 7 | Error Message Translation             | - `toLocaleDateString` error: `order.startDate` not a Date object (likely ISO string from API).<br>- Debug: log value/type, wrap in `new Date()` before formatting.<br>- Use helper function `formatDate` for safe date formatting. |
| 8 | Understanding SVG Code                | - `<svg>` is Scalable Vector Graphics; code-defined images.<br>- Attributes: `width/height`, `viewBox`, `fill`, `stroke`.<br>- `<path>` and `<line>` draw the image.<br>- Specialized roles: SVG designers, illustrators, animators. |
| 9 | Project README Generation             | - README includes project title, description, features, installation, usage, configuration, troubleshooting, contributing, license, and folder structure overview (`client/`, `server/`). |
| 10| React/Flask API vs Next.js            | - Next.js enforces stricter data handling for security, edge runtime, and consistency.<br>- Community acknowledges Next.js is strict compared to Flask.<br>- Comparison: <br>  - Next.js: SSR, SEO, React integration, stricter rules.<br>  - Flask: lightweight, flexible, easy prototypes, less built-in tooling. |


### 6. References

- **Next.js vs React.js**: [https://www.freecodecamp.org/news/nextjs-vs-react-differences/](https://www.freecodecamp.org/news/nextjs-vs-react-differences/)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **How to use Prisma ORM with Next.js**: [https://www.prisma.io/docs/guides/nextjs](https://www.prisma.io/docs/guides/nextjs)
- **Prisma Next.js database guide**: [https://www.prisma.io/docs/guides/nextjs](https://www.prisma.io/docs/guides/nextjs)
- **Prisma with SQLite Quickstart**: [https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite)
- **Markdown Tables Guide**: [https://www.markdownguide.org/extended-syntax/#tables](https://www.markdownguide.org/extended-syntax/#tables)
