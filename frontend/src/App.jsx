
import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  taskCategory: "LEARNING",
  priority: "2",
  dueTime: "",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:8080/api/todos");

        if (!response.ok) {
          throw new Error(`Failed to fetch Todos: ${response.status}`);
        }

        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching Todos");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  // Local-only creation for now.
  // We will connect this to POST /api/todos in the next step.
  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.dueTime) {
      return;
    }

    const newTodo = {
      id: `local-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      taskCategory: form.taskCategory,
      priority: Number(form.priority),
      dueTime: new Date(form.dueTime).toISOString(),
      progress: 0,
    };

    setTodos((previousTodos) => [newTodo, ...previousTodos]);
    setForm(emptyForm);
  }

  const totalTodos = todos.length;

  const completedTodos = todos.filter(
    (todo) => todo.progress === 100
  ).length;

  const inProgressTodos = todos.filter(
    (todo) => todo.progress > 0 && todo.progress < 100
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            YOUR PERSONAL WORKSPACE
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            My Todo App
          </h1>

          <p className="mt-2 text-slate-500">
            Organize your tasks and keep making progress.
          </p>
        </header>

        {/* Summary cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total tasks", value: totalTodos },
            { label: "Completed", value: completedTodos },
            { label: "In progress", value: inProgressTodos },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Create Todo form */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Create a Todo</h2>

          <p className="mt-1 text-sm text-slate-500">
            Add a task you'd like to work on.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium"
              >
                Title *
              </label>

              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={200}
                placeholder="e.g. Finish the Todo API"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Add some details (optional)"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="taskCategory"
                  className="mb-1 block text-sm font-medium"
                >
                  Category *
                </label>

                <select
                  id="taskCategory"
                  name="taskCategory"
                  value={form.taskCategory}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                >
                  <option value="LEARNING">Learning</option>
                  <option value="PROJECT">Project</option>
                  <option value="PERSONAL">Personal</option>
                  <option value="WORK">Work</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-1 block text-sm font-medium"
                >
                  Priority *
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                >
                  <option value="1">1 — High</option>
                  <option value="2">2 — Medium</option>
                  <option value="3">3 — Low</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="dueTime"
                  className="mb-1 block text-sm font-medium"
                >
                  Due date &amp; time *
                </label>

                <input
                  id="dueTime"
                  name="dueTime"
                  type="datetime-local"
                  value={form.dueTime}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              + Add Todo
            </button>
          </form>
        </section>

        {/* Todo list */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Your tasks</h2>

          <p className="mt-1 text-sm text-slate-500">
            {totalTodos} task{totalTodos === 1 ? "" : "s"} in your list.
          </p>

          {loading && (
            <p className="py-6 text-center text-slate-500">
              Loading your tasks...
            </p>
          )}

          {!loading && error && (
            <div
              role="alert"
              className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700"
            >
              Could not load Todos: {error}
            </div>
          )}

          {!loading && !error && todos.length === 0 && (
            <p className="mt-6 rounded-xl bg-slate-50 p-6 text-center text-slate-500">
              No tasks yet. Create your first Todo above.
            </p>
          )}

          {!loading && !error && todos.length > 0 && (
            <div className="mt-5 space-y-3">
              {todos.map((todo) => (
                <article
                  key={todo.id}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{todo.title}</h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {todo.description || "No description"}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {todo.taskCategory} · Priority {todo.priority}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-0 sm:text-right">
                    <p className="text-sm font-medium text-indigo-600">
                      {todo.progress}% complete
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Due{" "}
                      {todo.dueTime
                        ? new Date(todo.dueTime).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                        : "Not set"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
