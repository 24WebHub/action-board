import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import {Pie} from 'react-chartjs-2'

import { useAppContext } from "../../context/AppContext";

ChartJS.register(ArcElement, Tooltip, Legend);


const StatsChart = () => {
 const {allProjects} = useAppContext()

 const completedProject = allProjects.filter(allProject => allProject.status === 'Completed' )

 const notStartedProject = allProjects.filter(allProject => allProject.status === 'Not Started' )

 const inProgressProject = allProjects.filter(allProject => allProject.status === 'In Progress' )

  const data = {
    label: ['Not Started', 'In Progress,', 'Completed'],
    datasets: [
      {
      label: 'projects',
      data: [notStartedProject.length, inProgressProject.length, completedProject.length],
      backgroundColor: ['#D9D9D9', '#FB8C00', '#22C55E']
    }
    ]
  }

  const options =  {
    // animation: false
  }

  return (
    <div style={{width: '205px', height: '205px'}}>
      <Pie data={data} options={options}/>
      </div>
  )
}

export default StatsChart