## State Management Choice

I chose Zustand for state management because it is lightweight, simple to use, and avoids unnecessary boilerplate. Compared to React Context with useReducer, Zustand provides better performance for large datasets by preventing unnecessary re-renders. It also allows direct access to global state without prop drilling, making the code more maintainable and scalable.