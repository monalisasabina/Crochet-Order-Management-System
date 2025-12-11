# AI PROMPT JOURNAL

## 1. Step 1: Next.js Installation

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

or to force javascript, not Typescript
```bash
      npx create-next-app@latest my-app --javascript
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

## 2. Client-Side-Routing 
Prompt
```text
For the frontend, in react.js there was the app.js folder the dealt with the routing and the whole application itself. I preferred having the routes defined on its own folder, routes.js. The Next.js documentation is puzzling me about client side routing, so;

 1.Is the routing installed the same as React.js? 
 2.Components play a big part in routing and how the pages are organized, is it the same with Next.js?
 3.I noticed the default home page for Next.js in a tsx file, I thought next.js is JavaScript and not Typescript? Kindly take me through step by step on how to go about it.

```

Response summary;
1. In React the routing is installed but not Next.js. Next.js uses file-system routing. Each file in ```pages/``` and ```app/``` directories maps to to a route.

2. In react, the components are central. In Next.js, page files are created e.g ```pages/about.js``` or ```app/about/page.tsx``` instead of wiring routs in one central <Router> tree.

App Router(app/):
- ```app/page.js```.... ```/``` Home page
- ```app/posts/[id]/page.js```.... ```/about``` About page
- ```app/posts/[id]page.js``` ...```/posts/123``` Specific posts

For client-side navigation(NavBar)
On Nav


3. Fo




