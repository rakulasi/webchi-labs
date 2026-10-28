export const crepes = [
    {
        id: 1,
        code: "ТК-010",
        title: "Галета Комплет",
        category: "Галеты",
        photo: "assets/crepes/complete.jpg",
        crepePrice: 490,
        packaging: { name: "Крафт-конверт", cost: 9 },
        ingredients: [
            { name: "Тесто гречневое (ТК-001)", net: 90, unit: "кг", pricePerKg: 40, loss: 0 },
            { name: "Ветчина", net: 50, unit: "кг", pricePerKg: 900, loss: 0 },
            { name: "Сыр эмменталь", net: 45, unit: "кг", pricePerKg: 1400, loss: 2 },
            { name: "Яйцо куриное", net: 55, unit: "кг", pricePerKg: 200, loss: 12 },
            { name: "Масло сливочное", net: 5, unit: "кг", pricePerKg: 1050, loss: 0 }
        ]
    },
    {
        id: 2,
        code: "ТК-011",
        title: "Галета с лососем",
        category: "Галеты",
        photo: "assets/crepes/salmon.jpg",
        crepePrice: 690,
        packaging: { name: "Крафт-конверт", cost: 9 },
        ingredients: [
            { name: "Тесто гречневое (ТК-001)", net: 90, unit: "кг", pricePerKg: 40, loss: 0 },
            { name: "Лосось слабосолёный", net: 50, unit: "кг", pricePerKg: 2600, loss: 0 },
            { name: "Сливочный сыр", net: 40, unit: "кг", pricePerKg: 900, loss: 0 },
            { name: "Шпинат", net: 20, unit: "кг", pricePerKg: 800, loss: 15 },
            { name: "Масло сливочное", net: 5, unit: "кг", pricePerKg: 1050, loss: 0 }
        ]
    },
    {
        id: 3,
        code: "ТК-020",
        title: "Креп сахар-масло",
        category: "Сладкие крепы",
        photo: "assets/crepes/sugar.jpg",
        crepePrice: 220,
        packaging: { name: "Крафт-уголок", cost: 7 },
        ingredients: [
            { name: "Тесто пшеничное (ТК-002)", net: 80, unit: "кг", pricePerKg: 165, loss: 0 },
            { name: "Масло сливочное", net: 15, unit: "кг", pricePerKg: 1050, loss: 0 },
            { name: "Сахар", net: 15, unit: "кг", pricePerKg: 80, loss: 0 }
        ]
    },
    {
        id: 4,
        code: "ТК-021",
        title: "Креп Nutella-банан",
        category: "Сладкие крепы",
        photo: "assets/crepes/nutella.jpg",
        crepePrice: 390,
        packaging: { name: "Крафт-уголок", cost: 7 },
        ingredients: [
            { name: "Тесто пшеничное (ТК-002)", net: 80, unit: "кг", pricePerKg: 165, loss: 0 },
            { name: "Nutella", net: 40, unit: "кг", pricePerKg: 1870, loss: 0 },
            { name: "Банан", net: 70, unit: "кг", pricePerKg: 150, loss: 35 }
        ]
    },
    {
        id: 5,
        code: "ТК-022",
        title: "Креп матча-крем",
        category: "Сладкие крепы",
        photo: "assets/crepes/matcha.jpg",
        crepePrice: 450,
        packaging: { name: "Крафт-уголок", cost: 7 },
        ingredients: [
            { name: "Тесто пшеничное (ТК-002)", net: 80, unit: "кг", pricePerKg: 165, loss: 0 },
            { name: "Сливочный сыр", net: 50, unit: "кг", pricePerKg: 900, loss: 0 },
            { name: "Матча", net: 4, unit: "кг", pricePerKg: 15000, loss: 0 },
            { name: "Сливки 33%", net: 30, unit: "л", pricePerKg: 600, loss: 0 },
            { name: "Сахарная пудра", net: 10, unit: "кг", pricePerKg: 150, loss: 0 }
        ]
    },
    {
        id: 6,
        code: "ТК-030",
        title: "Американо",
        category: "Напитки",
        photo: "assets/crepes/americano.jpg",
        crepePrice: 220,
        packaging: { name: "Стакан 300 мл с крышкой", cost: 14 },
        ingredients: [
            { name: "Кофе в зёрнах", net: 18, unit: "кг", pricePerKg: 2200, loss: 0 }
        ]
    },
    {
        id: 7,
        code: "ТК-031",
        title: "Капучино",
        category: "Напитки",
        photo: "assets/crepes/cappuccino.jpg",
        crepePrice: 290,
        packaging: { name: "Стакан 300 мл с крышкой", cost: 14 },
        ingredients: [
            { name: "Кофе в зёрнах", net: 18, unit: "кг", pricePerKg: 2200, loss: 0 },
            { name: "Молоко 3,2%", net: 180, unit: "л", pricePerKg: 92, loss: 5 }
        ]
    },
    {
        id: 8,
        code: "ТК-032",
        title: "Лимонад цитрус-мята",
        category: "Напитки",
        photo: "assets/crepes/lemonade.jpg",
        crepePrice: 260,
        packaging: { name: "Стакан 400 мл с крышкой", cost: 14 },
        ingredients: [
            { name: "Лимон", net: 60, unit: "кг", pricePerKg: 250, loss: 40 },
            { name: "Сахарный сироп", net: 30, unit: "л", pricePerKg: 90, loss: 0 },
            { name: "Газированная вода", net: 250, unit: "л", pricePerKg: 60, loss: 0 },
            { name: "Мята", net: 3, unit: "кг", pricePerKg: 2000, loss: 0 }
        ]
    }
]