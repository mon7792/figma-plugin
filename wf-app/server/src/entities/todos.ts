// todos
type todos = {
  title: string;
  description: string;
  done: boolean;
  created_at: number;
  updated_at: number;
  done_at: number;
};

let errEmptyTitle = Error("empty title");

// addTodo validates and returns todos to be added to the database.
export const addTodo = (title: string, description: string): todos => {
  if (title.trim().length === 0) {
    throw errEmptyTitle;
  }

  let td: todos = {
    title: title,
    description: description,
    done: false,
    created_at: Date.now(),
    updated_at: Date.now(),
    done_at: -1,
  };

  return td;
};
