"use client";

// import { useState, useEffect } from "react";
// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "@/amplify/data/resource";
// import "./../app/app.css";
// import { Amplify } from "aws-amplify";
// import outputs from "@/amplify_outputs.json";
// import "@aws-amplify/ui-react/styles.css";

// Amplify.configure(outputs);

// const client = generateClient<Schema>();

// export default function App() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

//   function listTodos() {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }

//   useEffect(() => {
//     listTodos();
//   }, []);

//   function createTodo() {
//     client.models.Todo.create({
//       content: window.prompt("Todo content"),
//     });
//   }

//   return (
//     <main>
//       <h1>My todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.content}</li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
//           Review next steps of this tutorial.
//         </a>
//       </div>
//     </main>
//   );
// }

import { FormEvent, useState } from "react";

import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [answer, setAnswer] = useState<string | null>(null);

  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, errors } = await client.queries.generateHaiku({
      prompt,
    });

    if (!errors) {
      setAnswer(data);
      setPrompt("");
    } else {
      console.log(errors);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">Haiku Generator</h1>

        <form className="mb-4 self-center max-w-[500px]" onSubmit={sendPrompt}>
          <input
            className="text-black p-2 w-full"
            placeholder="Enter a prompt..."
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </form>

        <div className="text-center">
          <pre>{answer}</pre>
        </div>
      </div>
    </main>
  );
}
