# **Testing**

1. [Manual testing](#manual-testing)
    - Browser compatability
2. [Code validation](#code-validation)
    - Python PEP8
    - W3School (HTML & CSS)
    - Lighthouse
    - WAVE
3. [Bugs and fixes](#bugs-and-fixes)

---

### **Manual testing**

During the entire developing stage I repeatedly tested the elements added and altered regarding appearance as well as responsiveness via the simulated live server GitPod provides. After the site was live deployed I also checked the site regularly trough my smartphone for first hand updates on a live mobile viewport. In combination with the direct visual view of the page provided by the live server I frequently used Google Chrome developer tools, both for direct changes of the code as well as the tools for responsive testing of different platforms and screen sizes. The final version of the website passed all the visual and functional appereances changes on both large and small screens as well as the change between landscape and portrait orientaion changes on the same device.
My best friend during the debugging and testing was to commit in and out code as well as to the <em>console.log</em>-function in combination with commenting out code, to see if I targeted the right element or if my code was reachable from where I wanted to reach certain element.

Before the User Stories where marked as closed, I tested the stories to see if the result was satisfying and the app lived up to the project plan (see project board for more information [Kanban](https://github.com/Monika-81/wanderlust-p5/projects/1) ).

![Iphone SE](/src/assets/readme-docs/userstories.png)

<br>

### **Browser compadability**
<br>

- [BrowserStack](https://www.browserstack.com/)

To get a complement to the responsiveness tested with Chrome DevTools and a broader testing of devices, I also tested the site through BrowserStack. The websites compatibility to various browsers (Chrome, Safari, Opera, Firefox, Internet Explorer, Edge) including different versions of said browsers, was tested for both desktop and mobile. Different mobile versions was tested also for different browsers. Over all the functionality were consistent throughout for most of the devices and browsers. No notable difference was found. Devices tested:

<details>

![BrowserStack](/src/assets/readme-docs/browserstack.png)
![Manual testing](/src/assets/readme-docs/browser.png)

</details>

<br>

[Back to top](#testing)

---

### **Code validation**
<br>

- [ESlint](https://eslint.org/) 

I installed ESlint to the project and to validate the react app. I was met with several unexpected errors, mostly ESlint was missint props validation, React in JSX scope and disliked **'** and **"** in the html test headings/paragrapghs. To solve the problems I had to imort React in full, where only smaller react features where imported. The errors with the missing props validation was fixed by importing PropTypes and declaring proptypes to functions and objects according to the ESlint error messages. In the DotDropDown.js component, ESlint also was missing a display name as well as propstype. From all the error massages ESlint rendered, there was only one error left without fixing (for code details, please see below). I had help from my mentor to test the code with every possible variation according to the [ReactJS docs](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) as well as talked to the tutor support without finding a sollution to the problem. As the apps functionality works as expected with no known error caused by the **id** not having props validation, the last ESlint error was therefor left **unfixed** since the rest of the errors was sollwed.

<details>
<br>

**ESlint errors:**
<br>

![eslint](/src/assets/readme-docs/eslint/eslint.png)
![eslint](/src/assets/readme-docs/eslint/3.png)

<br>

#### Code fixes:

<br>

![fix](/src/assets/readme-docs/eslint/fix.png)
![react](/src/assets/readme-docs/eslint/react-e.png)

<br>

#### Error unsollwed with assocciated code:

<br>

![error](/src/assets/readme-docs/eslint/last-eslint.png)

<br>

![function](/src/assets/readme-docs/eslint/33.png)

<br>

![code tried](/src/assets/readme-docs/eslint/code.png)

<br>
</details>

<br>

- [HTML Validation](https://www.w3schools.com/) 

I ran code validation through W3Schools Validator for the HTML files as well as the CSS files. The biggest problem with the HTML was that I had manage to put the footer code outside the body-tag. The other problem was with the %-characters in the manifest.json file, that piece of code was not alltered since I din't want to risk th function of the app.

<details>
<br>
 
**Errors**

![error](/src/assets/readme-docs/html-error-index.png)

**Finished check result**

![final](/src/assets/readme-docs/html-error-end.png)


<br>
</details>

<br>

- [CSS Validation](https://www.w3schools.com/) 

The CSS files had one error, where I got the max-height value wrong.
Below are the error and the finished result.

<details>
<br>

![Error](/src/assets/readme-docs/css-error-fixed.png)
![No error](/src/assets/readme-docs/css-wanderlust.png)

<br>
</details>

<br>

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

I also ran the page through Lighthouse for both desktop and mobile to test out the performance and accessibility of the page. The input gave me further information how to proceed with the project, and was repeated after all major changes and bug fixes. Initialy the result was not good but gave me valuable input to what to fix.

 The biggest problem was that the performance on mobile viewport since the pictures that the users upload to the posts and profiles. The performance became better with production deployment of the API but are still not quite as high as I would lik. As a future feature I'd like to look for a solution to resize the images that are uploaded and display diffrent versions depending on if the image is a thumbnail, profile picture or a post rendered on a smaller screen. 

**Inital testing:**

<details>

![Lighthouse desktop](/src/assets/readme-docs/Home-desktop-1.png)
![Lighthouse desktop](/src/assets/readme-docs/Home-desktop-2.png)

<br>

![Lighthouse mobile](/src/assets/readme-docs/Profile-mobile-1a.png)

</details>

<br>

**Final testing:**

<details>

![Lighthouse desktop](/src/assets/readme-docs/desktop.png)
![Lighthouse mobile](/src/assets/readme-docs/PERFORMANCE1.png)

</details>

<br>


- [WAVE](https://wave.webaim.org/)

To validate the accessibility further I also tested the site at Wave - Web Accessibility Evaluation Tool. No errors were found.

<details>
<br>

![WAVE](/src/assets/readme-docs/WAVE.png) 

<br>
</details>

<br>

[Back to top](#testing)


---


### **Bugs and fixes**
There were a number of bugs and mishaps committed through the development as I tried to learn the best way to code the app. As the project came along, and the bugs with it, I started to see and understand more naturally what I had done too cause the bugs to happen. 

**The major bugs where**: <br>
1. Error trying to submit form data to API.
    - FIX: type-o in api/axiosDefaults.js file. I had 'content type' not 'content-type'.
2. Blank username in sign in form not showing error message.
    - Unclear what the error it. Tried several times to rewrite the code and by coping working code and redoing the whole form, each time getting the same result. Works fine for the password field or if both fields are empty. <br>
    FIX: added an asterix to show wich fields are required in form.
3. "CreatePost.js:47: Uncaught (in promise) TypeError: Cannot read properties of null (reading 'files')" Created post not uploading.
    - Had forgotten **ref** to imageInput in form.file
4.  Images in card not fitting content.
    - Fixed by adding css height, line height and overflow hidden.
5. Search bar visible on all pages but not redirecting to search results pages.
    - Fix: Made Search bar as a separate component only rendering if the right pathname exists, making the search bar only visible on pages that shows the post feeds.
6.  Not scrolling to top when changing page url.
    -  FIX: [Scroll Restoration](https://v5.reactrouter.com/web/guides/scroll-restoration) from React doc.

<br>

**Bug not fixed**:
- See [ESlint](#code-validation) & [CSS-validation](#code-validation)
<br>

[Back to top](#testing)

---