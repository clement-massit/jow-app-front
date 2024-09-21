<script>
export default {
    data() {
        return {
            searchQuery: '',
            postDataResult: null, // Pour stocker le résultat de la requête POST
            recipeAddToList: null,
            errorMessage: '', // Pour afficher un message d'erreur
        };
    },
    methods: {
        // Appelle la fonction postData et affiche les résultats
        async sendData() {
            const endpoint = 'recipes';
            const payload = { 'name': this.searchQuery, 'limit': 5 };

            try {
                const data = await fetchRecipes(endpoint, payload);
                this.postDataResult = data; // Stocker les résultats de la requête POST
            } catch (error) {
                this.errorMessage = "Erreur lors de l'envoi des données.";
            }
        },

        async viewRecipe(recipeName) {
            const endpoint = 'recipes';
            // const payload = { 'name': this.searchQuery, 'limit': 5 };
            const urlEnd = `${endpoint}/${(recipeName)}`


            try {
                const data = await fetchRecipeByName(encodeURI(recipeName));
                this.recipeAddToList = data; // Stocker les résultats de la requête POST
            } catch (error) {
                this.errorMessage = "Erreur lors de l'envoi des données.";
            }

        }
    },
};

// Fonction postData définie en dehors du composant Vue.js
async function fetchRecipes(endpoint, payload) {
    const apiUrl = "https://jow-app-production.up.railway.app"; // Remplacez par l'URL de votre API

    try {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            },
            body: JSON.stringify(payload),

        });

        if (!response.ok) {
            throw new Error(`Erreur POST : ${response.status}`);
        }

        const data = await response.json();
        return data; // Retourne les données pour les utiliser dans Vue.js
    } catch (error) {
        console.error("Erreur lors de la requête POST:", error);
        throw error;
    }
}

async function fetchRecipeByName(recipeName) {
    const apiUrl = "https://jow-app-production.up.railway.app"; // Remplacez par l'URL de votre API

    try {
        const response = await fetch(`${apiUrl}/recipes/${recipeName}`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur POST : ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        return data; // Retourne les données pour les utiliser dans Vue.js
    } catch (error) {
        console.error("Erreur lors de la requête POST:", error);
        throw error;
    }
}



</script>

<script setup>
import InputText from 'primevue/inputtext';

</script>
<template>
    <div class="home-container">
        <!-- Banner Section -->
        <!-- <section class="banner">
            <h1>Welcome to RecipeMaster!</h1>
            <p>Discover your favorite recipes</p>
        </section> -->

        <div class="">
            <!-- <label for="username">Enter a recipe</label> -->
            <InputText inputmode="text" v-model="searchQuery" placeholder="Rechercher une recette"
                @keydown.enter="sendData" />

            <!-- <button @click="sendData">Explore Recipes</button> -->
        </div>
        <!-- Featured Recipes Section -->
        <section class="featured-recipes">
            <!-- <h2>Featured Recipes</h2> -->
            <!-- <div v-if="postDataResult">
                <h3>Résultat de la requête POST :</h3>

            </div> -->
            <div class="recipes-grid">
                <div v-for="(recipe, index) in postDataResult" :key="index" class="recipe-card">
                    <!-- <img :src="recipe.image" :alt="recipe.name" class="recipe-image" /> -->
                    <h3>{{ recipe.name }}</h3>
                    <p>{{ recipe.description }}</p>
                    <button @click="viewRecipe(recipe.name)">Ajouter la recette à la liste</button>
                </div>
            </div>
        </section>
    </div>
</template>



<style scoped>
.home-container {
    padding: 20px;
}

.banner {
    text-align: center;
    background-color: #218838;
    color: white;
    padding: 40px 20px;
    border-radius: 10px;
    margin-bottom: 30px;
}

.banner h1 {
    font-size: 3rem;
    margin-bottom: 10px;
}

.banner p {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.banner button {
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
}

.banner button:hover {
    background-color: #ff4757;
}

.featured-recipes {
    text-align: center;
}

.recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.recipe-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
}

.recipe-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
}

.recipe-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.recipe-card p {
    font-size: 1rem;
    margin-bottom: 20px;
}

.recipe-card button {
    background-color: #218838;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
}

.recipe-card button:hover {
    background-color: #218838;
}
</style>
