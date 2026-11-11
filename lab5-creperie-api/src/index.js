const express = require('express');
const path = require('path');
const crepesRouter = require('./routes/crepes');
const crepesService = require('./services/crepesService');

const app = express();
const PORT = 3000;

crepesService.init(path.join(__dirname, 'data/crepes.json'));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/crepes', crepesRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Тело запроса — некорректный JSON' });
    }
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`API креперии запущен: http://localhost:${PORT}/crepes`);
});
