/***********************************************************************
# CODE QUESTION 1
***********************************************************************/

const hamburger = { name: "Cheese Burger", weight: 250 };
const secondBurger = hamburger;
secondBurger.name = 'Double Cheese Burger';
secondBurger.weight = 500;

console.log(hamburger.name); // ? 'Double Cheese Burger'
console.log(secondBurger.name); // ? 'Double Cheese Burger'

/*
Senza lanciare il codice, riesci a prevedere cosa viene stampato in console?
Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice?
*/
// RISPOSTA: 1 oggetto

// NOTA: posso verificare cos'è stato creato in memoria andando su "inspect" del Browser, nella TAB "Memory", dove troverò tutti i dati in memoria.



/***********************************************************************
# CODE QUESTION 2
***********************************************************************/

const hamburgerQ2 = {
    name: "Cheese Burger",
    weight: 250,
    ingredients: ["Cheese", "Meat", "Bread", "Tomato"]
};

const secondBurgerQ2 = { ...hamburgerQ2 };
secondBurgerQ2.ingredients[0] = "Salad";

console.log(hamburgerQ2.ingredients[0]); // ? 'Salad'
console.log(secondBurgerQ2.ingredients[0]); // ? 'Salad'

/*
Senza lanciare il codice, riesci a prevedere cosa viene stampato in console?
Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice?
*/
// RISPOSTA: 3 oggetti
// 3 perchè considero come oggetto anche l'Array, oltre ai due Object (gli Hamburgers).



/***********************************************************************
# CODE QUESTION 3
***********************************************************************/

const hamburgerQ3 = {
    name: "Cheese Burger",
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true,
        },
        age: 29
    }
};

const secondBurgerQ3 = structuredClone(hamburgerQ3);
const thirdBurgerQ3 = structuredClone(hamburgerQ3);

// Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice?
// RISPOSTA: 9 oggetti
// 9 oggetti perchè devo conteggiare anche gli Objects annidati.



/***********************************************************************
# CODE QUESTION 4
***********************************************************************/

const chef = {
    name: "Chef Hyur",
    age: 29,
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
}

const restaurant = {
    name: "Hyur's Burgers",
    address: {
        street: 'Main Street',
        number: 123,
    },
    openingDate: new Date(2025, 3, 11),
    isOpen: false,
};

// NOTA: "num = 1" nella funzione, decreta il valore di DEFAULT nel caso io non apssi un parametro alla funzione.

/*
Qual è il metodo migliore per clonare l’oggetto chef, e perché?
Qual è il metodo migliore per clonare l’oggetto restaurant, e perché?
*/
// RISPOSTA 1: In questo caso è perfetto fare una SHALLOW COPY, così da copiare anche la funzione.
// RISPOSTA 2: Nel caso del Ristorante è bene fare uno structuredClone, in quanto il ristorante contiene valori complessi (Object / Date).



/***********************************************************************
# CODE QUESTION 5 (Bonus)
***********************************************************************/

const hamburgerQ5 = {
    name: "Cheese Burger",
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true,
        },
        age: 29
    }
};

const newRestaurant = { ...hamburgerQ5.maker.restaurant };
newRestaurant.name = "Hyur's II";
newRestaurant.address = "Second Street, 12";
const secondBurgerQ5 = { ...hamburgerQ5 };
secondBurgerQ5.maker.restaurant = newRestaurant;
secondBurgerQ5.maker.name = "Chef Hyur";

console.log(hamburgerQ5.maker.name); // ? "Chef Hyur"
console.log(secondBurgerQ5.maker.name); // ? "Chef Hyur"
console.log(hamburgerQ5.maker.restaurant.name); // ? "Hyur's II"
console.log(secondBurgerQ5.maker.restaurant.name); // ? "Hyur's II"

/*
Senza lanciare il codice, riesci a prevedere cosa viene stampato in console?
Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice?
*/
// RISPOSTA: 5 oggetti



/***********************************************************************
# CODE QUESTION 6 (Bonus)
***********************************************************************/

const chefQ6 = {
    name: "Chef Hyur",
    age: 29,
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
    restaurant: {
        name: "Hyur's Burgers",
        welcomeClient: () => {
            console.log("Benvenuto!");
        },
        address: {
            street: 'Main Street',
            number: 123,
            showAddress: () => {
                console.log("Main Street 123");
            }
        },
        isOpen: true,
    }
}

/*
Qual è il metodo migliore per clonare l’oggetto chef, e perché?
*/
// RISPOSTA: SHALLOW COPIES nidificate.
const cloneChefQ6 = {
    ...chefQ6,
    restaurant: { ...chefQ6.restaurant, address: { ...chefQ6.restaurant.address } },
}



/***********************************************************************
# SNACK (Bonus)
***********************************************************************/

// CONSEGNA:
/*
Crea una funzione che permette la copia profonda (deep copy) di un oggetto, che copia anche i suoi metodi (proprietà che contengono funzioni). Usa l’oggetto di Code Question 6 come test.
⚠️ Serve usare una funzione ricorsiva! (fai un po’ di ricerca).

COS'E' UNA FUNZIONE RICORSIVA?
E' una funzione che richiama sè stessa al suo interno, permettendo un ciclo.
*/

// STEP
/*
Siccome, nonostante usiamo come test l'Object della QUESTION 6, l'Object passato come argument potrebbe cambiare,
bisogna creare una funzione che si adatti a qualsiasi Object.
(0) Devo controllare se il typeof è un OBJECT
(1) Devo stilare una lista delle KEYS, a prescindere dal numero
(2) Poi verificare se ogni KEY racchiuda un valore PRIMITIVO o COMPLESSO.
(3) Poi utilizzare il metodo di copia migliore in base al tipo di KEY.
(4) Dopo restituire il nuovo oggetto copiato.
*/

function deepCopy(object) {
    if (typeof (object) !== 'object') {
        return object;
    }

    const copy = {};

    // Con questo scorro le KEYS di un Object
    for (const key in object) {
        const value = object[key];
        if (typeof value !== 'object') {
            copy[key] = object[key];
        } else {
            // Invoco la funzione stessa al suo interno
            copy[key] = deepCopy(value)
        }
    }

    return copy;
}

const chefQ6Copy = deepCopy(chefQ6);
console.log(chefQ6Copy);