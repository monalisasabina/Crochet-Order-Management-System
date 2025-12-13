# AI PROMPT JOURNAL

This journal provides guidance for understanding Next.js full-stack development.

## 1. Next.js Installation (9/12/2025)

Prompt
```text
I want to build a Next.js application.
I'm conversant with React.js for frontend and Python for Backend. 
So i have the following questions for you?
 1. what are the systems requirements? 
 2. Is Next.js installed the same way as React.js? 
 3. I'm thinking of structuring the project root folder 
 to have a client and server folder for frontend and backend respectively, is it recommended to do so?
```

Response summary
1. The systems requirements: 
    Operating systems: Windows/, macOS, Linus
    Node.js: Version 18.17 or later
    Browser: Chrome, Firefox or Edge

2. On the terminal, Next.js is installed with this starter command;
```bash
        npx create-next-app@latest my-app
```



3. Recommended Projects structure;

```bash
       project-root/
           client/
              pages/
              components/
              public/

           server/
               app/
               requirements.txt

           package.json
           README.md
```

## 2. Client-Side-Routing (11/12/2025)
Prompt
```text
For the frontend, in react.js there was the app.js folder the 
dealt with the routing and the whole application itself. I preferred 
having the routes defined on its own folder, routes.js. The Next.js
documentation is puzzling me about client side routing, so;

 1.Is the routing installed the same as React.js? 
 2.Components play a big part in routing and how the pages are organized, 
 is it the same with Next.js?
 3.I noticed the default home page for Next.js in a tsx file, I thought 
 next.js is JavaScript and not Typescript? Kindly take me through step
  by step on how to go about it.

```

Response summary;
1. In React the routing is installed but not Next.js. Next.js uses
 file-system routing. Each file in ```pages/``` and ```app/``` directories 
 maps to to a route.

2. In react, the components are central. In Next.js, page files are 
created e.g ```pages/about.js``` or ```app/about/page.tsx``` instead of wiring
 routes in one central <Router> tree.

App Router(app/):
- ```app/page.js```.... ```/``` Home page
- ```app/about/page.js```.... ```/about``` About page
- ```app/posts/[id]page.js``` ...```/posts/123``` Specific post

The Client-side navigation example was also provided, the code is in 
my ```app/Nav.js```


3. Next.js works with Javascript or Typescript or both. ```create-next-app``` can 
scaffold TypeScript by default or if you opt-in. So I should have forced javascript
when installing Next.js from the beginning.
```bash
      npx create-next-app@latest my-app --javascript
```  

## 3. Setting up the Backend

```
i want to switch to backend, I just realized i can't do much on the frontend 
after client-side routing. im conversant with Python (SQLAlchemy) for the backend. 
Now I know models.py is used for models, seed.py is for sample data, and app.py deals with the 
API(FLASK). Now, i want you to;
 1. differentiate between using Next.js and Python .
 2. give me the basic structure of a next.js backend
 3. is there anything installed? 
 4. are we still using SQLAIchemy? 
 5. what API is used?
 take me through step by step, avoid complex concepts
```
1. Differences
   Next.js;
   - uses JavaScript or TypeScript
   - create API routes inside
```
   app/api/<route>/route.js
```
   - next.js automatically exposes them as REST endpoints
   - uses Prima as database (answers my 4th question)

   Python(Flask Backend);
   - uses Python
   - uses SQLAlchemy for database
   - routes are created in app.py

2. The basic structure provide, taking into consideration I'll use the Prima;

```bash
   server/
        app/
           api/
               users/
                    route.js
                orders/
                     route.js

        prisma/
             schema.prisma

        lib/
            prisma.js   

        .env   
```

   - ```app/api``` it is where API logic goes
   - ```lib/prisma``` Equivalent to SQLAIchemy initialization
   - ```prisma/schema.prisma``` models go here
   - ```.env``` database connection


3. the only thing i installed is the Prisma database on the server directory using this command on the directory
```
   npm install prisma --save-dev
   npm install @prisma/client
   npx prisma init
```

4. No,SQLAlchemy is Python based. Next.js uses Prisma.

5. Use REST API, Example routes:
   - GET /api/orders      ...list orders
   - POST /api/orders     ...create order
   - GET /api/orders/:id  ...single order

## 4. Setting up the database

prompt
```text
i want to start putting models in my Next.js backend and I'm using Prisma. 
I'm aware they are done in the schema.prisma file. 
There several things i want to know;
1. there are different data types, how are they put there? 
2. there are three types of model relationship, one to one, one to many and many to many, how are done in Prisma? 
3. is migration done after modelling? 
I'm learning Next.js, don't put complex content
```
1. Modelling
An example of a model;
```
model User {
   id         Int     @id @default(autoincrement())
   name       String
   email      String  @unique
   createdAt  Date    @default(now())
}
```

2. Relationships
 - ONE TO ONE
   User has one profile and each profile belongs to one client
   ```
   model User {
      id       Int    @id @default(autoincrement())
      profile  Profile?
   }

   model Profile {
      id      Int   @id @default(autoincrement())

      user    User  @relation(fields: [userId], references[id])
      userId  Int   @unique
   }
   ```

 - ONE TO MANY
A user can have many posts but a post can have one user.

 ```
   model User {
      id    Int     @id @default(autoincrement())

      posts Post[]
   }

   model Post {
      id     Int   @id @default(autoincrement())

      user   User  @relation(fields: [userId], references: [id])
      userId Int
   }

 ```

 - MANY TO MANY
 A student can have many courses and a course can have many students.

 ```
   model Student {
      id      Int       @id @default(autoincrement())

      courses Course[]
   }

   model Course {
      id       Int       @id @default(autoincrement())

      students Student[]
   }

 ```

 
 3. Migration
 - After modelling, migration can be done using the following command;
 ```
  npx prisma migrate dev --name init
 ```

- Incase you have only one model;
```
  npx prisma migrate dev --name add_order_model
```

- After running the command, you check the migrations directory under the prisma directory.

- To inspect the database, you use the Prisma Studio. This lets you view tables, inspect relations and confirm migration has worked.
```
   npx prisma studio
```
   

## 5. Understanding Verification

prompt
```
"I've created this Prisma model in schema.prisma:
generator client { 
   provider = "prisma-client" 
   output   = "../generated/prisma" 
   }

datasource db {
    provider = "sqlite"
    url = env("DATABASE-URL") 
    }

model Order {
    id           Int         @id @default(autoincrement()) 
    Title        String 
    imageUrl     String 
    isCompleted  Boolean     @default(false) 
    startDate    DateTime    @default(now()) 
    endDate      DateTime

    clientId     Int   //foreign key client       
    Client      @relation(fields: [clientId], references: [id]) 
    }

    
model Client {
    id          Int        @id @default(autoincrement())
    firstName   String 
    lastName    String 
    mobile      String
    dateAdded   DateTime   @default(now())

    orders      Order[]   //client can have many orders 
    }
  
model Admin{
    id          Int        @id @default(autoincrement()) 
    firstName   String lastName    String 
    userName    String email       String 
    password    String 
    }

model Notification{
    id          Int       @id @default(autoincrement())
    isRead      @default(false) 
    }

Could you:
- Verify if I've followed prisma modelling best practices?
- Explain any improvements I should make?
- Suggest what I should learn next?
- Point out any Python SQLAIchemy habits that might be showing in my prisma code?"

```

Summary
1. The models are valid. Although just a few fixes here and there.

2. Improvements
  - Change DATABASE-URL TO DATABASE_URL
  - In Notification model, I didn't put the data type. I have to add Boolean
  -model fields are written in camelCase, so the 'Title' field has to be 'title'
  - Recommended to add updatedAt field in Order, Client and Admin 
  - make endDate field in Order model optional
  ```endDate DateTime?```
  - make the userName and email under Admin model to be unique to prevents duplicate admins.
  - Improve on the Notification model by adding message and createdAt field

3. Learning suggestions
  - Prisma Client queries
  - Api routing
  - Auth basics like password hashing
  - Migrations

4. Python SQLAIchemy habits noted
  - Developing tables first
  - Explicit join tables every where. In SQLAIchemy you often create join tables manualyy but in Prisma, many to many is automatic and you don't write join tables inless you need extra fields
