{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };


    const bindEvents = () => {
        const removeButton = document.querySelectorAll(".js-removeTaskButton");

        removeButton.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleTaskDoneButton = document.querySelectorAll(".js-completedTaskButton");

        toggleTaskDoneButton.forEach((toggleTaskDoneButton, index) => {
            toggleTaskDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                    <li class="tasks__item ${hideDoneTasks && task.done ? "tasks__item--hidden" : ""}"> 
                        <button class="tasks__button ${task.done ? "tasks__button--done" : ""} js-completedTaskButton">
                           ${task.done ? "✓" : ""}
                        </button>
                        <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                           ${task.content}
                        </span>                
                        <button class="tasks__button tasks__button--remove js-removeTaskButton">🗑
                        </button>
                    </li>
            `;
        }

        document.querySelector(".js-taskList").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
           <button class="buttons__button js-toggleHideDoneTasks">
               ${hideDoneTasks ? "Show" : "Hide"} done tasks
           </button>
           <button class="buttons__button js-markAllAsDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
               Mark all as done
           </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllAsDoneButton = document.querySelector(".js-markAllAsDone");

        if (markAllAsDoneButton) {
            markAllAsDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindButtonsEvents();
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            newTaskElement.focus();
            return;
        }

        newTaskElement.focus();

        addNewTask(newTaskContent);
        newTaskElement.value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}