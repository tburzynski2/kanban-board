# Task Board

## Description

This project is a task board application that allows a team to manage project tasks. It features dynamically updated HTML and CSS powered by jQuery UI. The application uses the Day.js library to work with dates in the browser.

## Usage

1. Open the [project](https://tburzynski2.github.io/kanban-board/Develop/index.html) file in your browser.
2. Use the task board to manage project tasks.
3. Tasks are displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed).
4. Each task is color-coded to indicate whether it is nearing the deadline (yellow) or is overdue (red).
5. Click on the Add Task button to define a new task.
6. Enter the title, description, and deadline date for the new task into a modal dialog, then click save.
7. Saved tasks are stored in localStorage.
8. Drag a task to a different progress column to update its progress state.
9. Click the delete button for a task to remove it from the task board.
10. Refreshing the page will persist saved tasks.

## Screenshots

![Task Board application in action](https://static.bc-edx.com/coding/full-stack/05-Third-Party-APIs/assets/100-third-party-apis-homework-demo.gif)

## Dependencies

- jQuery
- jQuery UI
- Day.js

## Credits

- This project was completed as part of a web development course. The original codebase was provided by the course instructors.
- Module 5, Student Activity 28
