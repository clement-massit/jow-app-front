<template>
    <div class="home">
        <header>
            <h1>Bienvenue sur l'application de recettes !</h1>
            <p>Créez vos listes de courses à partir de vos recettes préférées.</p>
        </header>

        <section class="recipes">
            <Recipes></Recipes>
        </section>

        <!-- <section class="recipes">
            <h2>Recettes populaires</h2>
            <div class="recipe-list">
                <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
                    <h3>{{ recipe.name }}</h3>
                    <p>{{ recipe.description }}</p>
                    <button @click="addToShoppingList(recipe.ingredients)">Ajouter à la liste de courses</button>
                </div>
            </div>
        </section>

        <section class="shopping-list">
            <h2>Ma Liste de Courses</h2>
            <ul>
                <li v-for="(item, index) in shoppingList" :key="index">{{ item }}</li>
            </ul>
            <button @click="clearShoppingList">Vider la liste de courses</button>
        </section> -->
    </div>
</template>
<script setup>import Recipes from './Recipes.vue';</script>
<script>

export default {
    data() {
        return {
            recipes: [
                {
                    id: 1,
                    name: 'Spaghetti Carbonara',
                    description: 'Une délicieuse recette italienne de spaghetti avec sauce carbonara.',
                    ingredients: ['Spaghetti', 'Œufs', 'Lardons', 'Parmesan', 'Crème fraîche']
                },
                {
                    id: 2,
                    name: 'Salade César',
                    description: 'Une salade classique avec du poulet grillé, des croûtons et une sauce césar.',
                    ingredients: ['Poulet', 'Laitue', 'Croûtons', 'Parmesan', 'Sauce César']
                }
            ],
            shoppingList: []
        };
    },
    methods: {
        addToShoppingList(ingredients) {
            this.shoppingList = [...new Set([...this.shoppingList, ...ingredients])]; // Ajout sans doublons
        },
        clearShoppingList() {
            this.shoppingList = [];
        }
    }
};
</script>

<style scoped>
.home {
    font-family: Arial, sans-serif;
    margin: 0 auto;
    max-width: 800px;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 30px;
}

.recipe-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.recipe-item {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #218838;
}

.shopping-list {
    margin-top: 40px;
}

.shopping-list ul {
    list-style-type: none;
    padding: 0;
}

.shopping-list li {
    padding: 5px 0;
    border-bottom: 1px solid #ddd;
}
</style>