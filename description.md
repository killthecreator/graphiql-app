#  GraphiQL

Our app is **GraphiQL** - a playground/IDE for graphQL requests. GraphiQL is a sandbox for compiling, editing and sending GraphQL requests to the server API and getting responses to them. Our application also allows user to specify variables and headers and add them to the request. The user can also retrieve the API schema using an introspective query. To perform validation, we always get the schema when the editor is loaded.

We also added authorization/authentication capabilities to our app, to give access to the tool to only to authorized users.

## Team
We worked on our app in a team of 3 developers: Olga Khmaruk, Gleb Belegov and Alexander Mikhailov. Our work was carried out in the private github repository graphiql-app. The develop branch was the main working branch. Each team member created new branch from develop, worked in this branch and after that made a pull request to the develop branch. Other teammates checked and commented new pull request code. After proper corrections pull requests were merged to the develop branch.

## API
We used an open GraphQL Pokemon api in our app. GraphQL-Pokemon is a GraphQL API that provides extensive Pokémon data. Unlike contemporary APIs this API focusses on speed, accuracy and data quality. API provides fully generated client-side TypeScript typings, images, information about various assets in Pokemon: Pokedex, Items, AbilitiesMoves, Learnsets, Type matchups. API has a detailed documentation with instructions for installation and use. The documentation also contains a description of possible queries and variables to them.

## Design
Design of our application is minimalistic. The color scheme is close to black and white. We used a SHADCN component libruary in our app. The user has the ability to change the color theme using the switcher in the header. Dark and light themes are available.

## Application structure
Our site contains Welcome page, User auth, GraphiQL page with request editor, variables editor, headers editor, docummentation explorer and response section.

## Backend
We used firebase for implementing authentication and authorizing with username and password.

## Deploy
The demo version of the application is deployed on Vercel and available on deploy link.





//TODO rewright
## Technical requirements

- localization (at least 2 languages). You should be able to change the language by clicking on the toggler/select in header.
- semantic layout
- the application should work at least in the latest version of the Google Chrome browser
- private routes, 404, error boundary
- using jQuery in the main application code is not allowed
- you must use React 18 + **suspense** feature
- you can use Vite (or any React framework you want, e.g. Gatsby, NextJS, Remix), css frameworks, any js/components libs you want, html and css pre-processors
- you MUST use Typescript
- ❗ it is forbidden to copy the code of other students or [GraphiQL](https://www.npmjs.com/package/@graphiql/react). This ban applies to html, css, and js code. You can use small code snippets from Stack Overflow, and other self-found sources on the Internet, except github repositories of course students.

## Application design requirements

- the application quality is characterized by the elaboration of details, attention to typography (no more than three fonts per page, font size of at least 14 px, optimal [font and background contrast](https://snook.ca/technical/colour_contrast/colour.html)), carefully selected content
- adaptive layout, the minimum page width of the application should be 320px
- interactivity of elements users can interact with; element hover effects; usage of different styles for the active and inactive state of the element; smooth animations
- the unity of styles of all pages of the application - the same fonts, button styles, indents, the same elements on all pages of the application have the same appearance and layout. Item colors and background images may vary. In this case, colors should be from the same palette, and background images from the same collection.

## Description of function blocks

### General requirements
- Errors from the api side - (Not found, unhandled rejection, etc) should be displayed in a user-friendly format (toast, pop-up, or something like this - up to your decision).

### Welcome page
- If user is not authorized, the page should contain a link to Sign In / Sign Up page
- If user is authorized, the page should contain a link to the Main page

### Header

- All Private routes should contain sticky header. Moment when it become sticky (if there is a scroll on a page) should be animated: color can be changed or it's height can become smaller. [Animated sticky header](https://www.youtube.com/watch?v=hR8UW5CvYgw)
- Sign Out button - signs user out

### Footer

- Footer should contain a link to the authors' github, the year the application was created, [course logo](https://rs.school/images/rs_school_js.svg) with [link to the course](https://rs.school/react/).
- Footer is displayed on all pages of the application.

### Sign In / Sign Up

- For the authentication you should use Firebase with email option. Please, check this [article](https://blog.logrocket.com/user-authentication-firebase-react-apps/)
- Client-side validation should be implemented (email and password strength - minimum 8 symbols, at least one letter, one digit, one special character)
- Upon successful login, the user should be redirected to the Main page
- If the user is already logged in and tries to reach these routes, they should be redirected to the Main page

### Main page - GraphiQL
- Editor
- Variables section
- Headers section
- Documentation section, should be visible only when app will receive a successfull response with the schema definition from the api
- Response section

## How to submit tasks

- Link to pull request in rs app is submitted only by **team leader** ❗
- Make sure the pull request is available for review ❗. To do this, open the link that you submit in rs app in incognito browser mode
- If the task is not submitted before the deadline, it will not be distributed during the cross-check and points will not be added to your score.
## Evaluation criteria

**Maximum available points for the task 120**
It contains:
- maximum 90 for crosscheck
- maximum 30 for your involvement into a project. Those points will be assigned by the mentor for each student.

## Cross-check criteria
For the convenience of verification, it is **necessary** to record and post on YouTube a short (5-7 min) video for reviewers with an explanation of how each of the items listed in the evaluation criteria is implemented. Add a link to the video to the pull-request.

[How to evaluate tasks in Cross check](https://docs.rs.school/#/cross-check-flow). In the comments to the assessment, it is necessary to indicate which items are not fulfilled or partially fulfilled.
### Welcome route - max 10 points

- [ ] The welcome page should contain general information about the developers, project, and course. **2 point**
- [ ] In the upper right corner there are 2 buttons: Sign In and Sign Up. **2 point**
- [ ] If login token is valid and unexpired, change the Sign In and Sign Up buttons to the "Go to Main Page" button. **2 points**
- [ ] When the token expires - the user should be redirected to the "Welcome page" automatically. **3 points**
- [ ] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. **1 point**

### Sign In / Sign Up  - max 20 points

- [ ] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **5 points**
- [ ] Client-side validation should be implemented. **10 points**
- [ ] Upon successful login, the user should be redirected to the Main page **3 point**
- [ ] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page. **2 point**

### GraphiQL route - max 50 points
- [ ] Working editor allowing to edit the query. **15 points**
- [ ] Working documentation explorer, should be visible only when sdl request will succeed. **15 points**
- [ ] Variables section. Should be closed/opened **5 points**
- [ ] Headers section. Should be closed/opened **5 points**
- [ ] Response section. **10 points**


### General requirements - max 10 points

- [ ] Localization **5 point**
- [ ] Sticky header **5 points**


### Penalties
- [ ] React default favicon **- 5 points**
- [ ] The presence of errors and warnings in the console **- 2 points** for each
- [ ] The presence in the console of the results of the console.log execution **- 2 points** for each
- [ ] @ts-ignore or any usage (search through github repo) **- 1 point** for each
- [ ] Making commits after the deadline **- 20 points**
- [ ] The administration reserves the right to apply penalties for the use of incorrect repository or branch names.
