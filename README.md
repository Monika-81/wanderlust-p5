# **Wanderlust**
Wanderlust is your online travel diary app, where you can post anecdotes about your travel adventures! Both for yourself to remember, to share with family and friends as well as to inspire other fellow wanderlusters around the globe. The travel diary aims to be a platform for inspiration, discussions and sharing about all things travel related. The user can search for other users posts to get information and inspiration for coming trips, as well as to share and communicate with there friends and family about the trip they are undertaken orprieviously been came home from. The travel diary site targets various kinds of people whom are interested in knowing more about a specific travel location, travel in general or to just socialize with like-minded Wanderlusters!

Let me introduce you further to [**Wanderlust**](https://wanderlust-p5.herokuapp.com/)!
<br>
<br>

![Home](/src/assets/readme-docs/responsive-image.png)
<br>


## **Content**
1. [**Strategy**](#strategy)
    - [Project goal](#project-goal)
    - [UX](#ux)

2. [**Scope**](#scope)
    - [User Stories](#user-stories)
    - [Flowchart](#flowchart)
    - [Wireframes](#wireframes)    

3. [**Structure**](#structure)
    - [Authentication](#authentication)
    - [Navigation](#navigation)
    - [Posts](#posts)
    - [Add post](#add-post)
    - [Edit & delete post](#edit-&-delete-post)
    - [Like post](#like-post)
    - [Comments](#comments)
    - [Profile page](#profile-page)
    - [Follow profile](#follow-profile)
    - [Search function](#search-function)
    - [Future feature](#future-feature)
   
4. [**Skeleton**](#skeleton)
    - [Technologies](#technologies)

5. [**Surface**](#surface)
    - [Design](#design) 

6. [**Testing**](#testing)
    
7. [**Deployment**](#deployment)
    - [Deployment](#deployment)
    - [Clone](#clone)
    - [Forking](#forking)

8. [**Credits**](#credits)
    - [Content](#content)
    - [Acknowledgement](#acknowledgement)

[Back to top](#wanderlust)

<br>

---

## Strategy

### **Project goal**

The goal with this project is to create a content sharing online travel diary that allows the user to create, read, update and delete their content for a fully interactive experience. 

The goals are summarized here:

- Make the apps **React** front end content connect smoothly with the **Django REST** back end to store, fetch and delete content.
- Allow an authorized users to comment, like and follow other users.
- Make a responsive app that are easily accessible on every viewport, and with screen readers.
- Make a easily navigated app, with intuitive features.

### **UX** 

With the UX principles and project goal in mind I started with the Strategy phase, thinking about the target audience and what features would benefit them. 

The target audience are:
- people in various age groups, mostly adults, who likes to travel
- people that likes to search for inspiration online for their next trip
- people that likes to share about their travels
- people that likes to follow others travel adventures
- people searching for a specific destination or topic

What the user will be looking for:

- Images and posts about someones travel in diary form
- Inspiration for their next travel
- Information about someones trip
- Information about a location they like to travel to
- Information about the others users of the site
- Interaction with other people interested in traveling


[Back to top](#wanderlust)

---

## Scope

### **User Stories**

<br>

**Epic: Account Management**

1. As a Site User I can sign up for an account so that I can use all the features reserved for members
2. As a Site User I can log in to the site so that I can use all the features of the site
3. As a Site User I can easily log out from the site so that my account and its content remains secure
4. As a Site User I can create a personal profile so that I can control my content
5. As a Site User I can edit my personal profile so that I can keep it up to date and safe

**Epic: Site View**

6. As a Site User I can read posts and comments in detail so that I can get information and inspiration
7. As a Site User I can see a specific users post at their profile page so that I can see more post from the same user
8. As a Site User I can use a search function so that I can find the right post or user that interests me
9. As a Site User I can easily and intuitively navigate the site so that I can find what I am looking for
10. As a Site User I can see the date a post was created and updated so that I know how accurate it is

**Epic: Site Interactions**

11. As a logged in Site User I can create new post so that I can update my travel diary
12. As a logged in Site User I can comment on posts so that I can interact with the other users
13. As a logged in Site User I can edit or delete my posts and comment so that I display control my input on the site
14. As a logged in Site User I can like posts so that others can see if a post is popular and so I can find it easily again
15. As a logged in Site User I can follow profiles so that I can find it easily again
16. As a Site User I get notifications when something is wrong or changed so that I understand how to use the app

<br>

To follow an agile approach, a project board (kanban-board) was set up using GitHub Projects [Kanban](https://github.com/Monika-81/wanderlust-p5/projects/1)

<br>

### **Flowchart**

The structure of the site is based on this basic flowchart:

<details>

![Flowchart](/src/assets/readme-docs/Flowchart.png)
</details>

<br>

### **Wireframes**

The wireframes for the project is very basic to get the feeling where I wanted the project to go, but over all the choices of the visual design grew with the development.

<details>

![Mobile](/src/assets/readme-docs/wireframes-mobile.png)
![Desktop](/src/assets/readme-docs/wireframe-desktop.png)
![Desktop](/src/assets/readme-docs/wireframe-desktop2.png)

</details>

<br>

[Back to top](#wanderlust)

<br>

## Structure

### **Features**

When the site user enters the site they are greeted with a feed of the latest posts to the site. The post previews gives a brief introduction to each post with a title and subtitle. As well as features the image for the post, admin avatar, icon to like the post and an icon that shows the number of comments. A non logged in user can use the site as "Read only", without any interactions. 
Below are the existing features and how they tie in to the user stories and with that the project goals.


<details>

![Home page desktop](/src/assets/readme-docs/home1.png)
![Home page mobile](/src/assets/readme-docs/mobile1.png)
</details>

<br>

#### **Authentication**
To connect with the site content the non logged in user finds the option to sign in or sign up/register in the navbar menu. After the user has created a profile they are asked to log in and are there after moved back to the home page, now the links to sign in and sign up are changed to give the user access to the interactive content of the site (see [navigation](#navigation) below). The user also get's the choice to actively sign out of the page. 
If the user forgets to submit input to any of the required fields, they get an error message.

(**User Story 1, 2 , 3 & 16**)
<details>


<br>
<br>

![Sign up](/src/assets/readme-docs/signup.png)
![Sign in](/src/assets/readme-docs/signin.png)
![Sign up mobile](/src/assets/readme-docs/signup-m.png)
![Sign in mobile](/src/assets/readme-docs/signin-m.png)

<br>
</details>

<br>

#### **Navigation**
At the top of the website there is a hero image, logo and an internal navigation bar. The navigation bar is shown when the user clicks the burger menu to toggle the menu to expand. The current page the user is visiting is marked for easier navigation on the site. As a non logged in user, the navbar contains the choice to go to the "Home" page, "Sign in" or "Sign out". For a logged in user the sign in/sign up links are exchanged to link to the "Feed" page (posts from profiles the user is following), "Liked" page (posts the user have liked), "Add post", "Profile" (the users own profile page) and "Sign out".  On desktop and landscape oriented screens the navigation bar is located to the top right side of the page, and on portrait oriented devices the navigation bar is fixed at the top of the screen. When a user visits the Home, Feed or Liked page, a search function appears. 

(**User story 9**)
<details>


<br>
<br>

![Navbar desktop](/src/assets/readme-docs/navbar.png)
![Navbar desktop unauth](/src/assets/readme-docs//non-auth-navbar.png)
<br>

![Navbar mobile auth feed](/src/assets/readme-docs/auth-navbar.png)
<br>

![Navbar mobile auth](/src/assets/readme-docs/auth-navbar2.png)


<br>
</details>

<br>

#### **Posts**
The view of the post contains the post, a comments list section and an input box to leave a new comment. At the top of the post the user read the title, subtitle and date the post was created or last edited. Depending on the screen with, the image connected to the post are either displayed underneath the title or to the right of the title and subtitle. Below the picture the text content of the post is rendered in two columns on larger screen size and in one column on smaller screen size. Lastly the user finds the authors name and/or avatar as well as the to social interaction counters, displaying how many comments the post has as well as how many likes. The amount of interaction the site user have access to depends on if the user is just browsing the page, is logged in and created the post as well as if the user have created any comments. A none registered user can see and read the comments but no more, neither comment or like a post. A user that is reading the post can like or unlike the post (airplane icon), leave a comment and edit or delete their comment. The post creator can, except from all of the above, also edit and delete their post. 

(**User Story 6 & 10**)
<details>


<br>
<br>

![Post mobile 1](/src/assets/readme-docs/post.png)
![Post mobile 2](/src/assets/readme-docs/post2.png)
<br>

![Post](/src/assets/readme-docs/post3.png)

<br>
</details>

<br>

#### **Add Post**
To add a post the user has to be logged in and click the "Add post" button in the navigation bar. The form asks the user to upload an image and to give the post a title, subtitle and text content. The user can only upload one picture with a max size off 1 MB as well as a max height/width of 2048px. All three text fields as well as an image are required before the user can create a post. If the user submits a form with incorrect input, they get an error message that displays what went wrong. If the post was created successfully, the user is redirected to the created post's page to get confirmation that the post has been submitted as well as an overview of the result and the opportunity to edit the post directly. If the user forgets to submit input to any of the required fields, they get an error message.

(**User Story 11 & 16**)
<details>


<br>
<br> 

![Add post](/src/assets/readme-docs/create-post.png)
<br>

![Add post mobile](/src/assets/readme-docs/create-post-m.png)
![Add post mobile 2](/src/assets/readme-docs/create-post-m2.png)
<br>

![Add post validation](/src/assets/readme-docs/create-post-validation.png)

<br>
</details>

<br>


#### **Edit & Delete Post**
To edit the post, the user can either find their post through the search bar, their profile page or directly after they have created a new post. From the desired post the user would like to edit or delete, there is a three dot drop down menu icon at the end of the post. The user gets the choice to either edit or delete the post. 

If the user chooses to edit the post, they are taken back to the form create page but the forms fields are prepopulated with the content of the post the user wishes to edit. The user can edit all or none of the fields or cancel the edit. If the user instead chooses to delete their post, the first get a confirmation message so no post are deleted by mistake. 

(**User Story 13 & 16**)
<details>


<br>
<br> 

![Edit post tablet](/src/assets/readme-docs/edit-post-p.png)
<br>

![Edit post mobile](/src/assets/readme-docs/edit-post-m.png)
![Delete post](/src/assets/readme-docs/delete-post.png)


<br>
</details>

<br>


#### **Comments**
As a site user you can read all the comments even if you are not logged in. The comments section are located below the post. A none logged in user can not see the box to add a comment. The user that has left a comment on a post has the choice to edit or delete their comment. The function to edit and/or delete are almost identical to editing and deleting a post. 

(**User Story 12 & 13**)
<details>


<br>
<br> 

![Comments](/src/assets/readme-docs/comments.png)
<br>

![Comment](/src/assets/readme-docs/comment.png)
<br>

![Edit comment](/src/assets/readme-docs/comment-auth.png)
<br>

![Delete comment](/src/assets/readme-docs/comment-edit.png)

<br>
</details>

<br>

#### **Like Post**
To add more interactivity and a more social aspect to the site, the user has the opportunity to like or unlike a post that they finds interesting. As well as a post the user would like to save so they can easily find it again. A user that is not logged in can see the amount of likes but can not interact with the function. 

(**User Story 14**)
<details>


<br>
<br> 

![Likes 1](/src/assets/readme-docs/likes.png)
<br>

![Likes 2](/src/assets/readme-docs/tooltip2.png)
![Likes 3](/src/assets/readme-docs/tooltip3.png)

<br>
</details>

<br>

#### **Profile Page**
From the navigation menu, the user can reach their personal page. The personal page displays a profile picture, the username and an option to write an description about the user. On default there is an anonymous picture and an empty description field. If the profile belong to the user, their is a three dot menu icon next to the profile name, where the user can edit their profile or change their password.

Underneath the description area is three counters showing the amounts of post the user have posted, how many profiles they are following and how many other users are following their profile. If the user is visiting the profile off another user, there is also a button displaying the choice to follow or unfollow the user.

Lastly, the profile owners posts are displayed below the profile information. So the user can access all of their own or a specific user's posts (not comments) from the profile page as well. If the user clicks on a post, they will be transported to the page of the post. 

(**User Story 4, 5 & 7**)
<details>

<br>
<br> 

![Profile ](/src/assets/readme-docs/profile-auth.png)
![Profile dropdown](/src/assets/readme-docs/profile-auth2.png)
![Profile edit](/src/assets/readme-docs/edit-profile.png)
![Profile password](/src/assets/readme-docs/edit-password.png)


<br>
</details>

<br>

#### **Follow Profile**
The site user has the opportunity to follow a specific profile they find interesting, wants to come back to, interact with and so on. The followed profiles posts are displayed in a separate page called "Feed". To follow or unfollow a user, the site user visits the desired profile page and clicks on the button "follow" or "Unfollow" in the profile description. The number of followers that follows a specific profile are displayed both to others and the profile owner them self, on the profile page. 

(**User Story 15**)
<details>


<br>
<br> 

![Profile follow](/src/assets/readme-docs/profile.png)
![Profile unfollow](/src/assets/readme-docs/profile1.png)

<br>
</details>

<br>

#### **Search Function**
A search bar function is displayed in the navbar when the user visits the "Home", "Feed" or "Liked page", giving the site user the option to search the posts of current site page. The user does not need to be verified to search through the posts. The search renders posts with the searched value in the post title, subtitle, content or username. If the input doesn't render a finding, the user gets feedback directly. 

(**User Story 8**)
<details>


<br>
<br> 

![Search all](/src/assets/readme-docs/search.png)
![Search feed](/src/assets/readme-docs/search3.png)
![Search fail](/src/assets/readme-docs/search2.png)

<br>
</details>

<br>

#### **Future Feature**
- Email registration
- Notification of new posts or comments
- Change username and delete account
- Image resizing to optimize performance
- Image croping when the user uploads an image
- Option to add more than one image in a post
- Adding searchable tags to a post 
- Adding custom decorations to the post's 


[Back to top](#wanderlust)

---

## Surface

### **Design**

The design idea behind the project is to give the user a feel of a travel diary. With a playful, almost handwritten font and a display of the posts looking like polaroids and post cards/diary entries.

#### **Hero image**
As part of the main design there is a "hero image" at the top of the page. The image main purpose is to set the mode, color scheme and in itself get the user to associate the site with traveling. The logo "Wanderlust" that rest on top off the hero image acts both as an title to the entire page but also works as a internal link to the home page of the site. Giving the user the option to interact with the image text to take them back to the home page.

![Hero image](/src/assets/navbar-small.jpg)

#### **Color scheme**

The goal of the design is to keep a clean and consistent user experience throughout the pages. With mainly a light background/dark text set up and accent colors that connects back to the hero image at the top. The colors for the background was picked from the hero image using Chrome DevTools color dropper tool and using the bootstrap 4 color "info" that connects to the hero image color scheme as well. A color palette was created with the help of Colormind to work as a design foundation during the project.

![Color Scheme](/src/assets/readme-docs/colorscheme.png)

<br>

A contrast grid was used to see how well the colors worked together and to maximize the visibility on the site. Note that the dark text works well on all light color backgrounds, as intended.

![Color grid](/src/assets/readme-docs/colorgrid.png)


[Back to top](#wanderlust)

---

## Skeleton

### **Technologies**

#### **Languages**

- **React JS**
<br> The main language for building the User interface for the front end of this full stack application is the JavaScript Library React. React allows for creating reusable UI components that can be updated separately making the site interactive and user friendly. 
To make the apps design responsive I used React Bootstrap 4 in combination with the rest of the application.

    Reusable components in the project includes:
    - the NavBar, rendered on every page of the site.
    - the SearchBar, that only renders on the "Home", "Feed" and "Liked" pages, where the user can search for posts under each category (eg. all posts, posts by followed profiles or liked posts).
    - the ScrollToTop function, that automatically scrolls the page to the top of the page when the user changes location on the site.
    - the DotDropdown, used to give the user the option to edit or delete the content in both posts, comments and the users own profile page.

- **HTML5**
<br> I used HTML to create the base structure of the project. I started with a basic boilerplate set up and created the first crude structure of the page out of the original design. 

- **CSS3**
<br> The CSS was used to apply the custom styles where I didn't use bootstrap. 

<br>

#### **Tools**

- [Heroku](https://www.heroku.com/)
    -  I used Heroku to deploy the application. 

- [Balsamiq](https://balsamiq.com/)
    - I used Balsamiq to make the basic wireframes for mobile for this project. 

- [Colormind](http://www.colormind.io)
    - I used Colormind to create a color palette for my color scheme.

- [DevTools](https://developer.chrome.com/docs/devtools/)
    -  I used DevTools to test both changes in my code and the responsivity of the site.  

- [EightShapes](https://contrast-grid.eightshapes.com) 
    - I used Eight Shapes color grid to check the color scheme's visibility in different combinations.

- [Lucid Chart](https://www.lucidchart.com/pages/)
    - I used Lucid Chart to design the flowchart for the project.

- [GitPod](https://www.gitpod.io/)
    - I used GitPod as the code editor as well as to display to test out changes in my code.

- [GitHub](https://github.com/)
    - I used GitHub to create a repository for my project.

- [Responsive Design Checker](https://responsivedesignchecker.com)
    - I tried using the website on the finally deployed project but the site wouldn't connect to heroku.

- [WAVE](https://wave.webaim.org/)
    - I used WAVE to test the accessibility of the site.

- [W3Schools](https://www.w3schools.com/) 
    - I used W3C to test and validate my code throughout the project. 

- [Wireframes|cc](https://wireframe.cc/)
    - I used Balsamiq to make the basic wireframes for desktop for this project. 


[Back to top](#wanderlust)

---

## **Testing**

For more information about the testing performed during the development, go to the separate [testing](/TESTING.md) page.
<br>
<br>

[Back to top](#wanderlust)

---

## **Deployment**

### **Deployment**

The project was deployed to **Heroku** from **GitPod**:
- After creating an account or logging in to an existing one on Heroku, click the "New" button on the right hand side of the 'Personal' menu.
- Choose the option 'Create new app' and then choose a unique name for your application and the right region. Then click 'Create New App'.
- Now it's time to deploy the app. Go to the top of the page and click "Deploy".
- Choose a deployment method, I used GitHub since my repository is located on GitHub.
- Scroll down to 'Connect to GitHub' and search for your project. Make sure you are connected to the right GitHub account. Click 'Connect'.
- Keep scrolling downwards, now you can choose between Automatic Deployment or Manual Deployment. I choose Manual first, until the app was properly deployed and a link to the app was visual. Then I choose to enable automatic deployment for smoother testing. 

The live front-end app can be found here: https://wanderlust-p5.herokuapp.com/
<br>

<br>
<br>


A copy of this GitHub Repository can be made by either making a copy on your local machine or by forking the GitHub content. By using a copy of the repository changes can be made to the copy without affecting the original code. To make a copy of the repository, follow these steps:

### **Clone**
- Locate the repository at **GitHub**.
- At the top of the file's menu, click the green *code* button to the right.
- The first option in the drop-down menu is clone, where you get three choices of how to clone the repository.
- To clone a copy of the python project, click the 'copy' icon on the right-hand side of **Clone with HTTPS**.
- Choose your code editor, open GitBash and change the working directory to where you want the cloned directory to be made saved.
- In the terminal you write git clone and then paste the copied URL. Like this: '$ git clone https://github.com/Monika-81/wanderlust-p5.git' 
- Press enter and then install the dependencies you like to use for the project.
<br>

### **Forking**
- Locate the repository at **GitHub**.
- At the top right-hand side is a button called *fork*, click on the button to create a copy of the original repository in your GitHub Account.
<br>
<br>

The API repository is found at: https://github.com/Monika-81/wanderlust-api


[Back to top](#wanderlust)

---

## **Credits**

### **Content**

For most of the development and bug fixes I went back to the Code Institute LMS (over and over again) and the learning material for this section of the advanced front end course. While setting up the API the provided Cheat Sheets in the Django section was heavily relied on. Most of the API code is based on the moments project but adjusted to fit this project. The front end code is also based on the Moments lesson project as a learning resource but adjusted to suit the needs I had for this project.

Some of the other sites media I frequently **consulted** was :
<br>

- [StackOverflow](www.stackoverflow.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Reach Bootstrap 4](https://react-bootstrap-v4.netlify.app)
- [React JS](https://reactjs.org)
- [React Router](https://reactrouter.com)

<br>
Special credit where I found help edit for specific subjects:
<br>

- To build a grid inside infinit scroll page: [StackOverflow](https://stackoverflow.com/questions/70893476/react-infinitescroll-with-grid-system) & [React Bootstrap](https://react-bootstrap-v4.netlify.app/components/cards/#card-deck)
- To render search results from Navbar to Feedpage: [StackOverflow](https://stackoverflow.com/questions/71124611/how-to-get-value-from-one-component-to-another-page-component-without-navigation)
- Validation before delete: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
- Customize linebreak: [CSS-tricks](https://css-tricks.com/examples/hrs/) also see Code Credit in App.module.css.
- To clear search input on URL change, see answer from Ahmed Boutaraa Feb 11, 2020 at 16:48: [StackOverflow](https://stackoverflow.com/questions/41911309/how-to-listen-to-route-changes-in-react-router-v4)
```
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

function MyApp() {

  const location = useLocation();

  useEffect(() => {
      console.log('route has been changed');
      ...your code
  },[location.pathname]);

}
```


### **Media**

- The Hero image picture comes from the user Quang Nguyen Vinh on [Pexels](https://www.pexels.com/sv-se/foto/landskap-natur-silhuett-berg-2649403/)
- The rest of the picture used both as default form images and images in post and profiles all comes from [Unsplash](https://unslach.com) and the users:
  - [Laura Chouette](https://unsplash.com/@laurachouette)
  - [Mike Erskine](https://unsplash.com/@mikejerskine)
  - [Ella Jardim](https://unsplash.com/@daniellajardim)
  - [Mesut Kaya](https://unsplash.com/@directormesut)
  - [Dino Reichmuth](https://unsplash.com/@dinoreichmuth)
  - [Rebe Adelaida](https://unsplash.com/es/@rrebba)
  - [Wang Xi](https://unsplash.com/@kenwood123)
  - [Agustin Diaz Gargiulo](https://unsplash.com/@agustindiazg)
  - [Jaakko Kemppainen](https://unsplash.com/@jaakkok)
  - [Christoph Schulz](https://unsplash.com/@christoph)
  - [David Salamanca](https://unsplash.com/@daveslmnca)
  - [Briony Brown](https://unsplash.com/@pretty_and_pure)
  - [Minh Pham](https://unsplash.com/@minhphamdesign)
  - [Vicky Hladynets](https://unsplash.com/@vhladynets)

- Icons used comes from [FontAwesome](https://fontawesome.com/)
- The font used is **Kalam** from [Google Fonts](https://fonts.google.com/specimen/Kalam?query=kalam)


### **Acknowledgement**

- My mentor **Sammy Dartnall** at Code Institute for valuable input, support and encouragement.
- The Code Institute Tutor support when I got stuck with bugs uploading the content to Heroku.
- The Slack community for being such an open, warm and sharing place. 


[Back to top](#wanderlust)

---