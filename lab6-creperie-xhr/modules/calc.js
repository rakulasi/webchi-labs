export function getGross(ingredient) {
    if (ingredient.loss >= 100) {
        console.warn(`Потери ${ingredient.loss}% у «${ingredient.name}» — проверьте техкарту`)
        return ingredient.net
    }
    return ingredient.net / (1 - ingredient.loss / 100)
}

export function getCost(crepe) {
    let sum = crepe.packaging.cost
    crepe.ingredients.forEach((ingredient) => {
        sum += getGross(ingredient) / 1000 * ingredient.pricePerKg
    })
    return sum
}

export function getFoodCost(crepe) {
    return crepe.crepePrice > 0 ? getCost(crepe) / crepe.crepePrice * 100 : 0
}

export function getMarkup(crepe) {
    const cost = getCost(crepe)
    return cost > 0 ? (crepe.crepePrice - cost) / cost * 100 : 0
}
