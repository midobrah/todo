import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware

app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Define your tasks array
const tasks = [];

// Define routes and middleware here
app.get("/", (req, res) => {
  const today = new Date();
  const formattedDate = getFormattedDate(today);

  res.render("index", {
    formattedDate: formattedDate,
    tasks: tasks,
  });
});

app.post("/add-task", (req, res) => {
  const taskText = req.body.task.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
  }
  res.redirect("/");
});

app.post("/update-task", (req, res) => {
  const { index, completed } = req.body;
  if (typeof index === "number" && index >= 0 && index < tasks.length) {
    tasks[index].completed = completed === "true"; // Convert string to boolean
  }
  res.sendStatus(200);
});

app.post("/delete-task", (req, res) => {
    const { index } = req.body;
    if (typeof index === "number" && index >= 0 && index < tasks.length) {
      // Remove the task at the specified index
      tasks.splice(index, 1);
      res.sendStatus(200);
    } else {
      res.sendStatus(400); // Bad request if index is invalid
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

function getFormattedDate(date) {
  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthIndex = date.getMonth();
  const monthName = monthsOfYear[monthIndex];
  const year = date.getFullYear();
  const day = date.getDate();

  return `${dayOfWeek}, ${monthName} ${year}`;
}



