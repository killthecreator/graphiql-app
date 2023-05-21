#  GraphiQL

Our app is **GraphiQL** - a playground/IDE for graphQL requests. GraphiQL is a sandbox for compiling, editing and sending GraphQL requests to the server API and getting responses to them. Our application also allows user to specify variables and headers and add them to the request. The user can also retrieve the API schema using an introspective query. To perform validation, we always get the schema when the editor is loaded.

We also added authorization/authentication capabilities to our app, to give access to the tool to only to authorized users.

## Team
We worked on our app in a team of 3 developers: Olga Khmaruk, Gleb Belegov and Alexander Mikhailov. Our work was carried out in the private github repository graphiql-app. The develop branch was the main working branch. Each team member created new branch from develop, worked in this branch and after that made a pull request to the develop branch. Other teammates checked and commented new pull request code. After proper corrections pull requests were merged to the develop branch.

## API
We used an open GraphQL Pokemon api in our app. GraphQL-Pokemon is a GraphQL API that provides extensive Pokémon data. Unlike contemporary APIs this API focusses on speed, accuracy and data quality. API provides fully generated client-side TypeScript typings, images, information about various assets in Pokemon: Pokedex, Items, AbilitiesMoves, Learnsets, Type matchups. API has a detailed documentation with instructions for installation and use. The documentation also contains a description of possible queries and variables to them.

## Design
Design of our application is minimalistic. The color scheme is close to black and white. The user has the ability to change the color theme using the switcher in the header. Dark and light themes are available.
Layout is adaptive, the minimum page width of the application is less then 320px.
Elements users can interact with are interactive through hover effects, cursor pointer style, usage of different styles for the active and inactive state of the element and smooth animations.
The unity of styles of all pages of the application is provided by SHADCN component libruary - the same fonts, button styles, indents, the same elements on all pages of the application have the same appearance and layout.

## Application structure
Our site contains Welcome page, User auth, GraphiQL page with request editor, variables editor, headers editor, docummentation explorer and response section.
App layout consists of header, footer and main component between them.
All Private routes contains sticky header. It doesn't change it's positin during scrolling the page. We used blur effect to emphasize a moment the header becomes sticky. All the scrolled content becomes blurred under the header.
Header contation language and theme switches and sign in/ sign up/ sign out buttons on their proper places.
Footer contains a link to the authors' github pages, the year the application was created, course logo with link to the react course.
Footer is displayed on all pages of the application.

## Backend
We used firebase for implementing authentication and authorizing with username and password.

## Deploy
The demo version of the application is deployed on Vercel and available on deploy link.

## Localization
localization at enflish and russian languages is implemented using inbuilt nextjs i18 plugun. Uesr is able to change the language by clicking on the switcher in header.

## private routes
There are private routes in our app...
## 404
We created cistom 404 page. 404 page is shoun if url is not exist or user entered unexsisting url pathname. 404 page's has a button letting user to try to go to the Welcomepage
## error boundary
Error Boundary surrounds all the App components. for exaple, if we try to throw an error in our code, error fallback components will apear on the page. User may click Error button to look through an error happened and to try to navigate to Welcome page.
Errors from the api side - (Not found, unhandled rejection, etc) are displayed in a user-friendly format as a red button in the response section. Clicking this button user can read Error Message and Error description for being able to handle with error correcting.

## Docamentation
Documentation is lazy-loaded using Suspence. First, when page is loading the first time, we send an introspective query to our server API to get graphql schema. After schema has been got and saved to the redux store we parse it and create the documentation consisting on our schema types and enums by our own.
Then we compile documentation of the description of our API and our newly created from schema components after it.
We used accordion like components showing and hiding their content for user' better experience.

## Libraries
We used Next.js for building our app. It allows for server side rendering under the hood.

### Sign In
If user is not authorized, the welcome page contains a link to Sign In / Sign Up page. Buttons for Sign In / Sign Up are placed in the right side of the app header.
Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form.
If user is authorized, the page should contains a link to the Main editor page and sign out button. Button sign out signs user out.
Client-side validation should be implemented using hook form built-in validation features and user's custom validation functions. We verify if the password consists of proper symbols(email and password strength - minimum 8 symbols, at least one letter, one digit, one special character), if the password is correct, if the user with entered email already exists in the database and other email and password validation.
Upon successful login, the user is redirected to the Main page. Also if the user is already logged in and tries to reach these routes, he is redirected to the Main editor page.
For the authentication you should use Firebase with email option ans Firestore.

### Welcome route - max 10 points
The welcome page contains general information about the developers, project, and course. In the upper right corner there are 2 buttons: Sign In and Sign Up. If login token is valid and unexpired, change the Sign In and Sign Up buttons to the "Go to Main Page" button. When the token expires - the user is redirected to the "Welcome page" automatically.

### GraphiQL route - max 50 points
Working editor allowing to edit the query. Working documentation explorer is visible only when sdl request will succeed. Variables sectioncan be closed/opened. Headers section also may be closed/opened. Response section.
