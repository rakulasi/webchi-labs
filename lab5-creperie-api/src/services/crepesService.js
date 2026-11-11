const fileService = require('./fileService');

let crepesFilePath;

const init = (filePath) => {
    crepesFilePath = filePath;
};

const findAll = (title, category) => {
    const crepes = fileService.readData(crepesFilePath);
    return crepes.filter((crepe) => {
        const titleMatches = !title || crepe.title.toLowerCase().includes(title.toLowerCase());
        const categoryMatches = !category || crepe.category.toLowerCase() === category.toLowerCase();
        return titleMatches && categoryMatches;
    });
};

const findOne = (crepeId) => {
    const crepes = fileService.readData(crepesFilePath);
    return crepes.find((crepe) => crepe.id === crepeId);
};

const create = (crepeData) => {
    const crepes = fileService.readData(crepesFilePath);
    const newId = crepes.length > 0
        ? Math.max(...crepes.map((crepe) => crepe.id)) + 1
        : 1;
    const newCrepe = { id: newId, ...crepeData };
    crepes.push(newCrepe);
    fileService.writeData(crepesFilePath, crepes);
    return newCrepe;
};

const update = (crepeId, crepeData) => {
    const crepes = fileService.readData(crepesFilePath);
    const index = crepes.findIndex((crepe) => crepe.id === crepeId);
    if (index === -1) {
        return null;
    }
    crepes[index] = { ...crepes[index], ...crepeData, id: crepeId };
    fileService.writeData(crepesFilePath, crepes);
    return crepes[index];
};

const remove = (crepeId) => {
    const crepes = fileService.readData(crepesFilePath);
    const restCrepes = crepes.filter((crepe) => crepe.id !== crepeId);
    if (restCrepes.length === crepes.length) {
        return false;
    }
    fileService.writeData(crepesFilePath, restCrepes);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
