let form = document.querySelector('form');
let input = document.querySelector('#entry input');
let table = document.querySelector('.display');
let task = document.querySelectorAll('.task');
let checkbox = document.querySelectorAll('.check');
let items = document.querySelector('.items-left');
let it = document.querySelector('.it');
let theme = document.querySelector('.theme');
let attribution = document.querySelector('.attribution');
let icon = document.getElementById('icon');
let allTaskTab = document.querySelector('.all-tasks');

//TABLES
let allTask = document.querySelector('.allTask');
let active = document.querySelector('.activeTasks');
let completed = document.querySelector('.completedTasks');


let delBtn = document.querySelectorAll('.del');

let index = 1;
let itemsLeft = 0;

// THEME CHANGE ON CLICK 
theme.addEventListener('click', () => {

    // FOR LIGHT THEME 
    if(theme.childNodes[1].classList == "sun") {

        input.style.color = "hsl(235, 19%, 35%)";
        attribution.style.color = "hsl(235, 19%, 35%)";
        input.style.backgroundColor = "hsl(0, 0%, 98%)";
        allTaskTab.style.backgroundColor = "hsl(0, 0%, 98%)";
        table.style.backgroundColor = "hsl(0, 0%, 98%)";
        active.style.backgroundColor = completed.style.backgroundColor = "hsl(0, 0%, 98%)";
        document.querySelector('body').style.backgroundColor = "hsl(0, 0%, 98%)";
        document.querySelector('.entry').style.backgroundColor = "hsl(0, 0%, 98%)";
        document.body.style.backgroundImage = "url('./images/bg-mobile-light.jpg')";

        icon.classList.remove('sun');
        icon.classList.add('moon');
        icon.src = "./images/icon-moon.svg";

    } 

    //FOR DARK THEME
    else if (theme.childNodes[1].classList == "moon") {

        input.style.color = "white";
        attribution.style.color = "white";
        input.style.backgroundColor = "hsl(235, 24%, 19%)";
        allTaskTab.style.backgroundColor = "hsl(235, 24%, 19%)";
        table.style.backgroundColor = "hsl(235, 24%, 19%)";
        active.style.color = completed.style.color = "hsl(234, 11%, 52%);";
        active.style.backgroundColor = completed.style.backgroundColor = "hsl(235, 24%, 19%)";
        document.querySelector('body').style.backgroundColor = "hsl(235, 24%, 19%)";
        document.querySelector('.entry').style.backgroundColor = "hsl(235, 24%, 19%)";
        document.body.style.backgroundImage = "url('./images/bg-mobile-dark.jpg')";

        icon.classList.remove('moon');
        icon.classList.add('sun');
        icon.src = "./images/icon-sun.svg";
    }
});



// ENTRY FUNCTION 
let entry = (text) => {

    let html = `<div class="task row" data-set="${index}">
                    <div class="check" data-num="${index}">
                    <img class="unchecked" src="./images/icon-check.svg" alt="Checkbox for entry">
                    </div>
                    <p class="">${input.value}</p>
                    <img data-num="${index}" class="del" src="./images/icon-cross.svg" alt="Cross Icon">
                </div>`;
        
    // INSERTING THE ENTERED TASKS TO MAIN TASKS            
    table.insertAdjacentHTML('afterbegin', html);

    // INSERTING THE ENTERED TASKS TO ACTIVE TASKS
    active.insertAdjacentHTML('afterbegin', html);


    // GETTING BACK FOCUS 
    input.value = "";
    
    // UPDATE ITEMS LEFT
    updateNumber(); 

    // UPDATE INDEX 
    index++;
} 

// UPDATING ITEMS 
let updateNumber = () => {

    // IF ITEM IS ONLY ONE IT WILL UPDATE THE WORD ITEM 
    if(itemsLeft === 1) {
        it.textContent = "item";
    } else {
        it.textContent = "items";
    }

    // IF NONE ITEMS LEFT IT WILL UPDATE THE WORD NO 
    if(itemsLeft === 0) {
        items.textContent = "No";
    } else {
        items.textContent = itemsLeft;
    }
}

// FUNTION FOR PRESSING ENTER 
form.addEventListener('keypress', function(e) {
    
    if(e.keyCode === 13) {
        e.preventDefault();

        // UPDATING ITEMS ONLY IF THERE IS AN ENTRY 
        itemsLeft++;
        
        // CALLING ENTRY BY INPUT 
        entry(input.value);
    }
});


// ON CLICK EVENT HANDLERS FOR THE TABLES 
allTask.addEventListener('click', (event) => propertyHandler(event));
active.addEventListener('click', (event) => propertyHandler(event));
completed.addEventListener('click', (event) => propertyHandler(event));


let propertyHandler = (e) => {

    // DELETING A TASK 
    if(e.target.parentNode.classList.contains('task') && e.target.classList.contains('del')) {
        toDelete = e.target.parentNode;
        toDelete.remove();

        // CHECKING IF DELETE ITEM IS CHECKED OR NOT 
        if(e.target.parentNode.childNodes[1].childNodes[1].classList.contains('unchecked')) {
            // UPDATING ITEMS LEFT 
            itemsLeft--;
            updateNumber();
        }

        // CHECK IF DELETED ITEM IS PRESENT IN ACTIVE OR COMPLETED TASKS 

        //ACTIVE TASKS
        act = [...active.childNodes];

        for (i = 0; i < (act.length - 5); i++) {
            if(act[i].getAttribute("data-set") == toDelete.getAttribute("data-set")) {
                toRemove = active.querySelector(`[data-set~="${act[i].getAttribute("data-set")}"]`);

                toRemove.parentNode.removeChild(toRemove);
            }
        }
        
        // COMPLETED TASKS
        com = [...completed.childNodes];

        for (i = 0; i < (com.length - 5); i++) {
            if(com[i].getAttribute("data-set") == toDelete.getAttribute("data-set")) {
                toRemove = completed.querySelector(`[data-set~="${com[i].getAttribute("data-set")}"]`);

                toRemove.parentNode.removeChild(toRemove);
            }
        }

        // ALL TASKS
        all = [...allTask.childNodes];

        for (i = 0; i < (all.length - 5); i++) {
            if(all[i].getAttribute("data-set") == toDelete.getAttribute("data-set")) {
                toRemove = allTask.querySelector(`[data-set~="${all[i].getAttribute("data-set")}"]`);

                toRemove.parentNode.removeChild(toRemove);
            }
        }

    }

    // CHECKING A TASK 
    if(e.target.parentNode.classList.contains('task') && e.target.classList.contains('check')) {
        e.target.childNodes[1].classList.remove('unchecked');
        e.target.parentNode.childNodes[3].classList.add('done');

        // INSERTING THE CHECKED TASKS TO COMPLETED TASKS
        n = e.target.parentNode.getAttribute("data-set");
        toInsert = e.target.parentNode.innerHTML;
        comHtml = `<div class="task row" data-set="${n}">${toInsert}</div`;
        completed.insertAdjacentHTML('afterbegin', comHtml);

        //CHECKING THE TASK IN ALL TASKS IF IT IS CHECKED IN ACTIVE OR COMPLETED TASKS
        if(e.target.parentNode.parentNode.classList.contains('activeTasks')) {
            all = [...allTask.childNodes];

            for (i = 0; i < (all.length - 5); i++) {
                // console.log(all[i]);
                if(all[i].getAttribute("data-set") == n) {
                    toCheck = allTask.querySelector(`[data-num~="${all[i].getAttribute("data-set")}"]`);

                    toCheck.childNodes[1].classList.remove('unchecked');
                    toCheck.parentNode.childNodes[3].classList.add('done');
                }
            }    
        }

        //REMOVING THE CHECKED TASK FROM THE ACTIVE TASKS
        act = [...active.childNodes];

        for (i = 0; i < (act.length - 5); i++) {
            if(act[i].getAttribute("data-set") == n) {
                toRemove = active.querySelector(`[data-set~="${act[i].getAttribute("data-set")}"]`);

                toRemove.parentNode.removeChild(toRemove);
            }
        }

        // UPDATING ITEMS LEFT 
        itemsLeft--;
        updateNumber();   
    }

    // UNCHECKING A TASK 
    if(!e.target.classList.contains('unchecked') && e.target.parentNode.classList.contains('check')) {

        target = e.target;

        target.classList.add('unchecked');
        target.parentNode.parentNode.childNodes[3].classList.remove('done');
        
        // INSERTING THE UNCHECKED TASKS TO ACTIVE TASKS
        n = target.parentNode.parentNode.getAttribute("data-set");
        toInsert = target.parentNode.parentNode.innerHTML;
        comHtml = `<div class="task row" data-set="${n}">${toInsert}</div`;
        active.insertAdjacentHTML('afterbegin', comHtml);

        // console.log(e.target.parentNode.parentNode);

        //UNCHECKING THE TASK IN ALL TASKS IF IT IS UNCHECKED IN COMPLETED TASKS
        if(target.parentNode.parentNode.parentNode.classList.contains('completedTasks')) {
            all = [...allTask.childNodes];

            for (i = 0; i < (all.length - 5); i++) {
                // console.log(all[i]);
                if(all[i].getAttribute("data-set") == n) {
                    toCheck = allTask.querySelector(`[data-num="${all[i].getAttribute("data-set")}"]`);

                    toCheck.childNodes[1].classList.add('unchecked');
                    toCheck.parentNode.childNodes[3].classList.remove('done');
                }
            }    
        }

        //REMOVING THE UNCHECKED TASK FROM THE COMPLETED TASKS
        com = [...completed.childNodes];

        for (i = 0; i < (com.length - 5); i++) {
            if(com[i].getAttribute("data-set") == n) {
                toRemove = completed.querySelector(`[data-set ="${com[i].getAttribute("data-set")}"]`);

                toRemove.parentNode.removeChild(toRemove);
            }
        }

        // UPDATING ITEMS LEFT 
        itemsLeft++;
        updateNumber();
    }
}


// CLEARING ALL COMPLETED TASKS 
const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
    
    // DELETING CHECKED TASKS FROM COMPLETED TASKS 
    completed.innerHTML = `<div class="task row"><div>Completed Tasks</div></div>`;

    // DELETING CHECKED TASKS FROM ALL TASKS 
    all = [...allTask.childNodes];

    for (i = 0; i < (all.length - 5); i++) {
        if(!all[i].childNodes[1].childNodes[1].classList.contains('unchecked')){
            toRemove = document.querySelector(`.allTask [data-set~="${all[i].getAttribute("data-set")}"]`);

            toRemove.parentNode.removeChild(toRemove);
        }
    }
});


// ON CLICK OPEN THE RESPECTED TODOS 

allTaskTab.addEventListener('click', (e) => {
    if(e.target.classList.contains('active')) {
        allTask.style.display = completed.style.display = "none";
        active.style.display = "block";
    }

    if(e.target.classList.contains('completed')) {
        allTask.style.display = active.style.display = "none";
        completed.style.display = "block";
    }

    if(e.target.classList.contains('all')) {
        active.style.display = completed.style.display = "none";
        allTask.style.display = "block";
    }
});