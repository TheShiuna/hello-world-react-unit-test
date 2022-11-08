const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "hooks": path.resolve(__dirname, "src/hooks/index.ts"),
      "todo-list": path.resolve(__dirname, "src/todo-list/index.ts"),
      "interfaces": path.resolve(__dirname, "src/interfaces/index.ts"),
    },
  },
};