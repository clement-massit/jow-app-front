<template>
    <div class="shopping-list">

        <h1 v-if="!isMobile">Liste de courses</h1>
        <h3 v-else class="mt-6">Liste de courses</h3>
        <!-- <div v-for="(recette, index) in recettes" :key="index">

            <div class="ingredients">
                <h3>Ingrédients :</h3>
                <div v-for="(ingredient, indexIng) in recette.ingredients" :key="indexIng">
                    <div class="my-2 text-left ml-8">
                        <label>
                            <Checkbox v-model="checkedItems" name="ingredient" :value="ingredient.name" />


                        </label>
                        {{ ingredient.name }} {{ ((ingredient.quantity * (increment)).toFixed(4)) }} {{
                            ingredient.unit }}
                    </div>

                </div>
            </div>
        </div> -->



        <ul v-if="recettes.length">
            <li v-for="(recette, index) in recettes" :key="index">
                <div class="recipe-card">
                    <div class="left-recipe">

                        <h4 class="recipe-title">{{ recette.name }}</h4>
                        <img :src="recette.imgUrl" alt="Image de la recette" class="w-4 " />

                        <div class="recipe-info">

                            <div>
                                <i class="icon-time"></i> {{ recette.preparationTime }} min Préparation
                            </div>
                            <div>
                                <i class="icon-cooking"></i> {{ recette.cookingTime }} min Cuisson
                            </div>
                            <div>

                                <div class="counter">

                                    <Button @click="decrementer" size="small" icon="pi pi-minus" severity="info" text
                                        rounded aria-label="Plus" />

                                    {{ recette.coversCount + increment - 1 }}
                                    Personne(s)

                                    <Button @click="incrementer" size="small" icon="pi pi-plus" severity="info" text
                                        rounded aria-label="Plus" />

                                </div>
                            </div>

                        </div>


                    </div>
                    <div class="rigth-recipe">
                        <div v-for="(ingredient, indexIng) in recette.ingredients" :key="indexIng">
                            <div class="my-3 text-left">
                                <label>
                                    <Checkbox v-model="checkedItems" name="ingredient" :value="ingredient.name" />


                                </label>
                                {{ ingredient.name }} {{ ((ingredient.quantity * (increment)).toFixed(4)) }} {{
                                    ingredient.unit }}
                            </div>

                        </div>
                        <Button size="large" rounded @click="deleteRecipe(recette.name, index)" class="delete-button">
                            <i class="pi pi-trash"></i>

                        </Button>
                    </div>

                </div>



                <!-- <sub>{{ recette.url }}</sub>  -->
            </li>
        </ul>
        <p v-else>Aucun ingrédient à afficher.</p>
        <div v-if="newIngredients.length !== 0">
            {{ newIngredients }}
        </div>
        <!-- Ajouter un ingrédient -->
        <div class="add-ingredient">
            <h3>Ajouter un ingrédient</h3>
            <input v-model="newIngredient.name" placeholder="Nom de l'ingrédient" />
            <input v-model="newIngredient.quantity" placeholder="Quantité" type="number" />
            <input v-model="newIngredient.unit" placeholder="Unité (g, ml, etc.)" />
            <button @click="addIngredient">Ajouter</button>
        </div>
    </div>
</template>
<script setup>
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox';
// import


</script>
<script>


export default {
    data() {
        return {
            imgUrl: null,
            increment: 1,
            recettes: [],
            newIngredients: [],
            newIngredient: {
                name: "",
                quantity: "",
                unit: "",
            },
            checkedItems: [],
            isMobile: false

        };
    },
    created() {
        // Charger les éléments cochés depuis le localStorage (si existants)
        const savedCheckedItems = JSON.parse(localStorage.getItem('checkedItems'));
        if (savedCheckedItems) {
            this.checkedItems = savedCheckedItems;
        }
        const savedNewIngredients = JSON.parse(localStorage.getItem('newIngredients'));
        if (savedNewIngredients) {
            console.log(savedNewIngredients)
            this.newIngredients = savedNewIngredients;
        }

    },
    watch: {
        checkedItems(newCheckedItems) {
            // Enregistrer les éléments cochés dans le localStorage dès qu'ils changent
            localStorage.setItem('checkedItems', JSON.stringify(newCheckedItems));
        },
        newIngredients(addedNewIngredients) {
            localStorage.setItem('newIngredients', JSON.stringify(addedNewIngredients));
        }

    },


    mounted() {
        console.log(this.newIngredients)
        fetchOwnRecipes().then(data => {
            this.recettes.push(...data)
            this.recettes.forEach(recette => {
                this.fetchImgUrl(recette.url, recette.name).then(url => recette.imgUrl = url)
                const ingredientObjects = recette.ingredients.map(ingredient => {
                    // Extraire le nom
                    const nameMatch = ingredient.match(/^[^\(]+/); // Tout avant la première parenthèse
                    const name = nameMatch ? nameMatch[0].trim() : '';

                    // Extraire la quantité et l'unité
                    const quantityUnitMatch = ingredient.match(/\(([\d,.]+)\s([^\)]+)\)/); // Trouver "(quantité unité)"
                    const quantity = quantityUnitMatch ? parseFloat(quantityUnitMatch[1]) : 0;
                    const unit = quantityUnitMatch ? quantityUnitMatch[2] : '';

                    // Retourner un objet avec les propriétés name, quantity et unit
                    return { name, quantity, unit };
                });
                recette.ingredients = ingredientObjects
                console.log(recette.ingredients);

            });
        })
        this.checkScreenSize();
        // Ajoute un écouteur d'événement pour détecter les changements de taille de l'écran
        window.addEventListener('resize', this.checkScreenSize);





    },
    beforeDestroy() {
        // Nettoie l'écouteur d'événement lorsque le composant est détruit
        window.removeEventListener('resize', this.checkScreenSize);
    },
    methods: {
        checkScreenSize() {
            this.isMobile = window.innerWidth <= 768;
        },


        incrementer() {
            this.increment++
            // if (this.increment < this.maxCouverts) {
            //     this.nombreCouverts++;
            // }
        },
        decrementer() {
            if (this.increment > 1) {
                this.increment--;
            }

        },
        async deleteRecipe(recipeName, index) {
            const apiUrl = "https://jow-app-production.up.railway.app"; // Remplacez par l'URL de votre API
            console.log(`${apiUrl}/own/recipes/${recipeName}`)
            try {
                const response = await fetch(`${apiUrl}/own/recipes/${recipeName}`, {
                    method: "DELETE",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur POST : ${response.status}`);
                }
                else {
                    this.recettes.splice(index, 1)
                }

                // const data = await response.json();
                // console.log(data)
                // return data; // Retourne les données pour les utiliser dans Vue.js
            } catch (error) {
                console.error("Erreur lors de la requête POST:", error);
                throw error;
            }

        },
        async fetchImgUrl(recipeUrl, recipeName) {
            try {
                const data = await this.getImgUrl(recipeUrl, recipeName);
                this.imgUrl = data.imgUrl; // Assigne l'URL de l'image à la propriété imgUrl
                return data.imgUrl
            } catch (error) {
                console.error("Erreur lors de la récupération de l'image:", error);
            }
        },

        async getImgUrl(recipeUrl, recipeName) {
            const apiUrl = "https://jow-app-production.up.railway.app"; // Remplacez par l'URL de votre API
            const postData = {
                recipeUrl: recipeUrl,
                recipeName: recipeName
            };

            try {
                const response = await fetch(`${apiUrl}/recipe/img`, {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error(`Erreur POST : ${response.status}`);
                }

                const data = await response.json();
                // console.log(data)
                return data; // Retourne les données pour les utiliser dans Vue.js
            } catch (error) {
                console.error("Erreur lors de la requête POST:", error);
                throw error;
            }
        },
        addIngredient() {
            if (this.newIngredient.name && this.newIngredient.quantity) {
                this.newIngredients.push({
                    ...this.newIngredient,
                    quantity: Number(this.newIngredient.quantity),
                });
                this.newIngredient = { name: "", quantity: "", unit: "" }; // Réinitialiser le formulaire
            } else {
                alert("Veuillez remplir tous les champs.");
            }

        },

    }
};

async function fetchOwnRecipes() {
    const apiUrl = "https://jow-app-production.up.railway.app";

    try {
        const response = await fetch(`${apiUrl}/own/recipes`, {
            method: "GET",
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
        // console.log(data)
        return data; // Retourne les données pour les utiliser dans Vue.js
    } catch (error) {
        console.error("Erreur lors de la requête POST:", error);
        throw error;
    }
}




</script>
<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f8f8;
}

h2,
h3 {
    color: #333;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    /* padding: 20px; */
}

/* Styles pour la partie recette */
.recette {
    background-color: #fff;
    /* padding: 20px; */
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Styles pour la partie ingrédients */
.ingredients {
    font-size: small;
    background-color: #fff;
    /* padding: 20px; */
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

ol,
ul {
    padding-left: 20px;
    list-style-type: none;
}

li {
    margin-bottom: 10px;
}

.recipe-card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 3px;
    grid-row-gap: 0px;
    align-items: center;
}

.left-recipe {
    grid-area: 1 / 1 / 2 / 2;
}

.right-recipe {
    grid-area: 1 / 2 / 2 / 3;

}

/* Adaptation pour les petits écrans (comme les téléphones) */
@media (max-width: 768px) {

    body {
        color: black;
    }

    .grid-container {
        grid-template-columns: 1fr;
    }

    .recipe-card {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .left-recipe {
        grid-area: 1 / 1 / 2 / 2;
    }

    .right-recipe {
        grid-area: 2 / 1 / 3 / 2;
    }
}
</style>
<!-- <style scoped>
.shopping-list {
    max-width: 100%;
    margin: 0 auto;
    font-family: Arial, sans-serif;
}

ul {
    padding: 0;
    list-style-type: none;
}


.delete-button {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #28a745;


    /* border-radius: 50%; */
    /* width: 25px;
    height: 25px; */
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}







.add-ingredient {
    margin-top: 20px;
}

input {
    margin: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}


.ingredients-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 300px;
    margin: 20px auto;
    font-family: 'Helvetica', sans-serif;
}

.title {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #333;
}

.ingredients-list {
    list-style-type: none;
    padding: 0;
}

.ingredient-item {
    font-size: 1rem;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    color: #555;
}

.ingredient-item:last-child {
    border-bottom: none;
}

.recipe-card {
    background: linear-gradient(to right, #FFB75E, #ED8F03);
    /* border-radius: 10px; */
    /* padding: 20px; */
    text-align: center;
    color: #fff;
    /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
    position: relative;
    /* width: 300px;*/
    min-height: min-content;
    max-height: 10px;
    /* padding: 20px; */
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    margin: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 3px;
    grid-row-gap: 0px;
    align-items: center;
}

.left-recipe {
    grid-area: 1 / 1 / 2 / 2;
}

.right-recipe {
    grid-area: 1 / 2 / 2 / 3;

}

.recipe-img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
}

.recipe-title {
    font-size: 2rem;
    margin-top: 15px;
    color: #fff;
}

.recipe-info {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    font-size: 1.1rem;
}

.icon-time,
.icon-cooking,
.icon-difficulty {
    margin-right: 5px;
}

@media only screen and (max-width: 768px) {
    .shopping-list {
        max-width: 100%;
        margin: 0 auto;
        font-family: Arial, sans-serif;

    }

    .recipe-card {
        width: 100%;
        position: relative;
        height: 50px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .left-recipe {
        grid-area: 1 / 1 / 2 / 2;
    }

    .right-recipe {
        grid-area: 2 / 1 / 3 / 2;
    }

    .recipe-title {
        font-size: 1rem;
        margin-top: 5px;
        color: #fff;
    }

    .recipe-info {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
        font-size: 0.8rem;
    }

    ul {
        list-style-type: none;
    }



}
</style> -->
