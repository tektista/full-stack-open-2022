const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1> {props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercise={props.exercise1} />
      <Part part={props.part2} exercise={props.exercise2} />
      <Part part={props.part3} exercise={props.exercise3} />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>The total number is: {props.total}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const part1 = {
    name: "Fundumentals of React",
    exercises: 10,
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <>
      <Header course={part1.name} />
      <Content
        part1={part1.name}
        exercise1={part1.exercises}
        part2={part2.name}
        exercise2={part2.exercises}
        part3={part3.name}
        exercise3={part3.exercises}
      />

      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </>
  );

  // const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  // return (
  //   <>
  //     <Header course={course} />

  //     <Content
  //       part1={part1}
  //       exercise1={exercises1}
  //       part2={part2}
  //       exercise2={exercises2}
  //       part3={part3}
  //       exercise3={exercises3}
  //     />

  //     <Total total={exercises1 + exercises2 + exercises3} />
  //   </>
  // );
};

export default App;
