# Interview Scheduler

Scheduler is a single page web-app designed to facilitate the creation, storage, editing, and deletion of appointments for interviews at LHL. 

## Setup

Install dependencies with `npm install`, and ensure that your API calls are directed toward the proxy at localhost:3001. 

## Running Webpack Development Server

This project requires a couple of separate terminals to be running. First, you need to run npm start from the root directory (scheduler) to start the app itself running. Without the API, however, there's not much to do besides click around and watch the pretty colors change. If you want to see some appointments, add, or delete them, you'll also need to run the scheduler-api from the folder of the same name, also using npm start. While the first can be run from anywhere in your host machine, the second will work best when run from a Vagrant VM configured to Lighthouse Labs' usual standards. 

## Running Jest Test Framework

If you'd like to run some tests, feel free to run 

```sh
npm test
```

from the root directory. 

## Running Storybook Visual Testbed

Similarly, if you'd like to see a component run in a more controlled environment, feel free to test-drive storybook by running this command, again, from the root directory:

```sh
npm run storybook
```

## Screenshots

Everyone loves a screenshot:
!["Look at that spinner... I mean, it really spins in the real thing."](https://github.com/the1andonlycj/scheduler/blob/master/screenshots/SavingSpinner.png?raw=true)

!["We wouldn't just let you delete that important appointment without verification, now would we?](https://github.com/the1andonlycj/scheduler/blob/master/screenshots/ConfirmDelete.png?raw=true)

!["We gotta spin for that, too.](https://github.com/the1andonlycj/scheduler/blob/master/screenshots/Deleting.png?raw=true)

!["Look at that! It's a new interview!](https://github.com/the1andonlycj/scheduler/blob/master/screenshots/SavedInterview.png?raw=true)
