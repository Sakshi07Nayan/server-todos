const { Todo } = require("../models/todo");

exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        // Ensure req.userId is available
        console.log("User ID:", req.userId);

        // Create the todo
        const todo = await Todo.create({
            title,
            description,
            user_id: req.userId // Make sure user_id is correctly passed
        });

        res.status(201).json(todo);  // Return the created todo
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({ where: { user_id: req.userId } });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const todo = await Todo.findOne({ where: { id, user_id: req.userId } });

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({ where: { id, user_id: req.userId } });

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        await todo.destroy();

        res.status(204).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
