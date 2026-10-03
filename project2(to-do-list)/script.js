document.addEventListener("DOMContentLoaded",()=>{
  const storedtask =JSON.parse(localStorage.getItem('tasks'))
  if(storedtask){
    storedtask.forEach((task)=> tasks.push(task));
    updatetasklist();
    updatestart();
  };
});
let tasks = [];
const savetask = () =>{
localStorage.setItem('tasks',JSON.stringify(tasks))
  
};
const addtask = () => {
    const taskinput =document.getElementById('taskinput');
    const text = taskinput.value.trim();
    if(text){
        tasks.push({text:text,completed:false});
      updatetasklist();
      updatestart();
    savetask();
      taskinput.value='';

    }
   
};
const Toggletaskcomplete = (index) =>{
  tasks[index].completed =!tasks[index].completed;
  updatetasklist();
  updatestart();
  savetask();

};
const deletetask = (index) => {
  tasks.splice(index,1);
  updatetasklist();
  updatestart();
  savetask();
};
const edittask = (index) => {
  const taskinput= document.getElementById('taskinput');
  taskinput.value= tasks[index].text
  tasks.splice(index,1);
  updatetasklist();
  updatestart();
  savetask();

};
const updatestart = () =>{
  const completetask = tasks.filter(tasks => tasks.completed).length;
  const totaltask = tasks.length;
  const progress =(completetask/totaltask)*100;
  const progressbar = document.getElementById("progress");
  progressbar.style.width = `${progress}%`
  document.getElementById('number').innerText = `${completetask}/ ${totaltask}`;
  if(tasks.length && completetask == totaltask){
    blastconfetti();
  }
};

const updatetasklist = () =>{
    const tasklist = document.getElementById('tasklist');
      tasklist.innerHTML=''
      tasks.forEach((task,index )=> {
      const listitem = document.createElement('li');
        listitem.innerHTML=`
        <div class="taskitem">
        <div class="task ${task.completed ? "completed":""}">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked":""}/>
        <p>${task.text}</p>
        </div>
        <div class="icon">
        <img src="image/edit.png" onclick="edittask(${index})"/>
        <img src="image/bin.png" onclick="deletetask(${index})"/>
        </div>
        </div>
        `;
        listitem.addEventListener('change', ()=> Toggletaskcomplete(index));
        tasklist.append(listitem);
         });
};
document.getElementById('newtask').addEventListener('click',function(e){
    e.preventDefault();
    addtask();
});
const blastconfetti = () =>{
  confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: .6 }
});
};
 