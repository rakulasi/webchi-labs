const crepesService = require('../services/crepesService');

const crepeFields = ['code', 'title', 'category', 'photo', 'crepePrice', 'packaging', 'ingredients'];

const pickCrepeFields = (body) => {
    const crepeData = {};
    crepeFields.forEach((field) => {
        if (body[field] !== undefined) {
            crepeData[field] = body[field];
        }
    });
    return crepeData;
};

const validateCrepe = (crepeData, isNew) => {
    if (isNew) {
        const requiredFields = ['code', 'title', 'category', 'crepePrice'];
        const missing = requiredFields.filter((field) => {
            return crepeData[field] === undefined || crepeData[field] === '';
        });
        if (missing.length > 0) {
            return `Не заполнены поля: ${missing.join(', ')}`;
        }
    }
    const price = crepeData.crepePrice;
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
        return 'crepePrice должна быть положительным числом';
    }
    const ingredients = crepeData.ingredients;
    if (ingredients !== undefined && !Array.isArray(ingredients)) {
        return 'ingredients должен быть массивом';
    }
    return null;
};

const parseCrepeId = (req, res) => {
    const crepeId = Number(req.params.id);
    if (!Number.isInteger(crepeId) || crepeId <= 0) {
        res.status(400).json({ error: 'id позиции должен быть целым положительным числом' });
        return null;
    }
    return crepeId;
};

const getAllCrepes = (req, res) => {
    const { title, category } = req.query;
    res.json(crepesService.findAll(title, category));
};

const getCrepeById = (req, res) => {
    const crepeId = parseCrepeId(req, res);
    if (crepeId === null) {
        return;
    }
    const crepe = crepesService.findOne(crepeId);
    if (!crepe) {
        return res.status(404).json({ error: 'Позиция меню не найдена' });
    }
    res.json(crepe);
};

const createCrepe = (req, res) => {
    const crepeData = pickCrepeFields(req.body || {});
    const error = validateCrepe(crepeData, true);
    if (error) {
        return res.status(400).json({ error });
    }
    const newCrepe = crepesService.create({
        photo: '',
        packaging: { name: '', cost: 0 },
        ingredients: [],
        ...crepeData
    });
    res.status(201).json(newCrepe);
};

const updateCrepe = (req, res) => {
    const crepeId = parseCrepeId(req, res);
    if (crepeId === null) {
        return;
    }
    const crepeData = pickCrepeFields(req.body || {});
    const error = validateCrepe(crepeData, false);
    if (error) {
        return res.status(400).json({ error });
    }
    const updatedCrepe = crepesService.update(crepeId, crepeData);
    if (!updatedCrepe) {
        return res.status(404).json({ error: 'Позиция меню не найдена' });
    }
    res.json(updatedCrepe);
};

const deleteCrepe = (req, res) => {
    const crepeId = parseCrepeId(req, res);
    if (crepeId === null) {
        return;
    }
    if (!crepesService.remove(crepeId)) {
        return res.status(404).json({ error: 'Позиция меню не найдена' });
    }
    res.status(204).send();
};

module.exports = {
    getAllCrepes,
    getCrepeById,
    createCrepe,
    updateCrepe,
    deleteCrepe
};
