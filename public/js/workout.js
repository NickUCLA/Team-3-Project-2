const exerciseTypeInput = document.getElementById('exerciseType');
const descriptionInput = document.getElementById('workoutDescription');
const weightInput = document.getElementById('weight');
const weightUnitInput = document.querySelector('select[name="weight_unit"]');
const workoutForm = document.querySelector('#workout-form');

const postWorkout = (workout) =>
  fetch('/api/workouts/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workout),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST request:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

const fetchAndRenderWorkouts = () => {
  fetch('/api/workouts')
    .then((res) => res.json())
    .then((data) => {

      const pastWorkoutsList = document.getElementById('workout-list'); // Updated line
      pastWorkoutsList.innerHTML = '';

      data.workouts.forEach((workout) => {
        const li = document.createElement('li');
        li.textContent = `${workout.exercise_type} - ${workout.description} - ${workout.weight} ${workout.weight_unit}`;
        pastWorkoutsList.appendChild(li);
      
      });
      console.log('Workouts rendered:', data.workouts);
    })
    .catch((error) => {
      console.error('Error fetching workouts:', error);
    });
};

workoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newWorkout = {
    exercise_type: exerciseTypeInput.value.trim(),
    description: descriptionInput.value.trim(),
    weight: weightInput.value,
    weight_unit: weightUnitInput.value,
  };


  postWorkout(newWorkout)
    .then((data) => {
      console.log(`Workout added! Workout ID: ${data.workout_id}`);
      fetchAndRenderWorkouts();
    })
    .catch((err) => console.error(err));
});