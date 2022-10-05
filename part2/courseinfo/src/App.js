const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ partsArray }) => <p> 
  {}
</p>

const Part = ({partName, noOfExercises}) => 
<>
  {partName} {noOfExercises}
</>

const Content = ({ course }) =>

  <>

<li>
  {course.parts.map(part => <li key={part.id}> <Part partName={part.name} noOfExercises={part.exercises} /></li>)  }
</li>

  </>
  const Course = ({courseName}) => 
  <>
    <Header course={courseName} />
  </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  // const total = course.parts.reduce(() => (initialValue, currentValue) => {
  //   return initialValue + currentValue;
  // }, 0);

  //test


  return (
    <>
      <Course courseName={course.name} />
      <Content course={course} />
      <Total partArray={course.parts} />

    </>





    // <div>
    //   <Header course={course} />
    //   <Content parts={parts} />
    //   <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    // </div>
  )
}

export default App