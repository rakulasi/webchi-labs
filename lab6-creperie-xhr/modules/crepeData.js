export function normalizeCrepe(crepe) {
    const packaging = crepe.packaging || {}
    return {
        ...crepe,
        crepePrice: Number(crepe.crepePrice) || 0,
        packaging: {name: packaging.name || '', cost: Number(packaging.cost) || 0},
        ingredients: Array.isArray(crepe.ingredients) ? crepe.ingredients : []
    }
}
