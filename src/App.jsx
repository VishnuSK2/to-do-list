import { useState } from "react"
import NewProject from "./Components/NewProject"
import NoProjectSelected from "./Components/NoProjectSelected"
import ProjectSideBar from "./Components/ProjectSideBar"
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[]
  });

  function handleAddTask(text){
    setProjectState((preState) => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: preState.selectedProjectId,
        id: taskId
      };
      return {
        ...preState,
        tasks:[ newTask,...preState.tasks]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectState((preState) => {
      return{
        ...preState,
        tasks: preState.tasks.filter( 
        (task) => task.id !== id)
      }
    });
  }

  function handleSelectProject(id){
    setProjectState((preState) => {
      return{
        ...preState,
        selectedProjectId:id,
      }
    });
  }

  function handleStartAddProject(){
    setProjectState((preState) => {
      return{
        ...preState,
        selectedProjectId:null,
      }
    });
  }

  function handleCancelProject(){
    setProjectState((preState) => {
      return{
        ...preState,
        selectedProjectId:undefined,
      }
    });
  }

  function handleAddProject(projectData){
    setProjectState((preState) => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id:projectId
      };
      return {
        ...preState,
        selectedProjectId:undefined,
        projects: [...preState.projects, newProject]
      }
    })
  }

  function handleDeleteProject(){
    setProjectState((preState) => {
      return{
        ...preState,
        selectedProjectId:undefined,
        projects: preState.projects.filter( 
        (project) => project.id !== preState.selectedProjectId 
      )
      }
    });
  }

  const selectedProject =projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject 
    project={selectedProject} 
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
  />
);
  
  if(projectState.selectedProjectId === null){
    content = 
    <NewProject 
    onAdd={handleAddProject } 
    onCancel={handleCancelProject} />
  }
  else{
    if(projectState.selectedProjectId === undefined){
      content = 
      <NoProjectSelected 
      onStartAddProject={handleStartAddProject} />
    }
  }
  
  return (
    <main className="h-screen my-8 flex gap-8">

    <ProjectSideBar 
    onStartAddProject={handleStartAddProject}
    projects = {projectState.projects}
    onSelectProject = {handleSelectProject}
    selectedProjectId ={projectState.selectedProjectId}
    />
    {content}

    </main>
  )
}
export default App
