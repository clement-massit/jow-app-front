<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <h1>RecetteApp</h1>
        </div>
        <ul class="navbar-links">
            <li><a href="/accueil">Accueil</a></li>
            <li><a href="/liste_de_course">Ma Liste</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <div class="navbar-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul v-if="isMenuOpen" class="navbar-links-mobile">
            <li><a href="#" @click="toggleMenu">Accueil</a></li>
            <li><a href="#" @click="toggleMenu">Ma Liste</a></li>
            <li><a href="#" @click="toggleMenu">Contact</a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.navbar {
    position: fixed;
    /* Fixe la barre en haut de l'écran */
    top: 0;
    left: 0;
    width: 100%;
    /* Fait en sorte que la barre occupe toute la largeur de l'écran */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    /* Assure que la barre est au-dessus du reste du contenu */
}

.navbar-logo h1 {
    font-size: 1.5rem;
    font-family: 'Poppins', sans-serif;
    color: #218838;
}

.navbar-links {
    list-style: none;
    display: flex;
    gap: 30px;
}

.navbar-links li {
    font-size: 1rem;
}

.navbar-links a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
}

.navbar-links a:hover {
    color: #ff6347;
}

.navbar-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 5px;
}

.navbar-toggle span {
    width: 25px;
    height: 3px;
    background-color: #333;
    transition: transform 0.3s ease;
}

/* Mobile view */
@media (max-width: 768px) {
    .navbar-links {
        display: none;
    }

    .navbar-toggle {
        display: flex;
    }

    .navbar-links-mobile {
        list-style: none;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 20px 0;
    }

    .navbar-links-mobile li {
        text-align: center;
        padding: 10px 0;
    }

    .navbar-links-mobile a {
        text-decoration: none;
        color: #333;
        font-size: 1.2rem;
    }

    .navbar-links-mobile a:hover {
        color: #ff6347;
    }
}
</style>