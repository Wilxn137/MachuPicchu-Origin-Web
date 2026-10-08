/* =====================================================
   MACHUPICCHU ORIGIN
   JAVASCRIPT PRINCIPAL
===================================================== */


/* =====================================================
   CONFIGURACIÓN WEATHER API
===================================================== */

const WEATHER_API_KEY = "f7b37f3fa52e4a0686063014262109";


/* =====================================================
   PAQUETES TURÍSTICOS
===================================================== */

const packages = [

    {
        id: 1,

        name: "Cusco",

        duration: "5 días / 4 noches",

        price: 1490,

        image: "Imagenes/cusco.jpg",

        description:
            "Descubre la historia del Cusco, el Valle Sagrado y la maravilla mundial de Machu Picchu.",

        itinerary: [
            "Día 1: Llegada a Cusco y City Tour.",
            "Día 2: Valle Sagrado de los Incas.",
            "Día 3: Visita a Machu Picchu.",
            "Día 4: Montaña de 7 Colores.",
            "Día 5: Tiempo libre y retorno."
        ]

    },


    {
        id: 2,

        name: "Lima",

        duration: "7 días / 6 noches",

        price: 1290,

        image: "Imagenes/lima.jpg",

        description:
            "Conoce la capital peruana, su gastronomía, historia, arquitectura y paisajes frente al océano.",

        itinerary: [
            "Día 1: Llegada a Lima.",
            "Día 2: Centro Histórico de Lima.",
            "Día 3: Miraflores y Barranco.",
            "Día 4: Experiencia gastronómica.",
            "Día 5: Museos y cultura.",
            "Día 6: Tiempo libre.",
            "Día 7: Retorno."
        ]

    },


    {
        id: 3,

        name: "Arequipa",

        duration: "5 días / 4 noches",

        price: 1190,

        image: "Imagenes/arequipa.jpg",

        description:
            "Explora la Ciudad Blanca, su arquitectura colonial y el impresionante Cañón del Colca.",

        itinerary: [
            "Día 1: Llegada y recorrido por Arequipa.",
            "Día 2: Centro Histórico y Santa Catalina.",
            "Día 3: Ruta hacia el Cañón del Colca.",
            "Día 4: Miradores del Colca.",
            "Día 5: Retorno."
        ]

    },


    {
        id: 4,

        name: "Ica",

        duration: "4 días / 3 noches",

        price: 890,

        image: "Imagenes/ica.jpg",

        description:
            "Vive una experiencia entre desiertos, oasis y aventura en uno de los destinos más atractivos de la costa peruana.",

        itinerary: [
            "Día 1: Llegada a Ica.",
            "Día 2: Laguna de Huacachina.",
            "Día 3: Desierto y actividades de aventura.",
            "Día 4: Retorno."
        ]

    },


    {
        id: 5,

        name: "Puno",

        duration: "4 días / 3 noches",

        price: 990,

        image: "Imagenes/puno.jpg",

        description:
            "Descubre el Lago Titicaca y conoce parte de las tradiciones y cultura de los pueblos andinos.",

        itinerary: [
            "Día 1: Llegada a Puno.",
            "Día 2: Lago Titicaca e Islas Uros.",
            "Día 3: Isla Taquile.",
            "Día 4: Retorno."
        ]

    },


    {
        id: 6,

        name: "Amazonas",

        duration: "5 días / 4 noches",

        price: 1290,

        image: "Imagenes/amazonas.jpg",

        description:
            "Adéntrate en paisajes amazónicos y descubre la biodiversidad y cultura de la región.",

        itinerary: [
            "Día 1: Llegada y recorrido inicial.",
            "Día 2: Exploración de la naturaleza.",
            "Día 3: Experiencia cultural.",
            "Día 4: Aventura y paisajes.",
            "Día 5: Retorno."
        ]

    }

];


/* =====================================================
   CARRITO
===================================================== */

let cart = [];


/* =====================================================
   MOSTRAR PAQUETES
===================================================== */

function renderPackages() {

    const container =
        document.getElementById("packages-container");


    container.innerHTML = "";


    packages.forEach(packageItem => {

        const card =
            document.createElement("article");


        card.className = "package-card";


        let itineraryHTML = "";


        packageItem.itinerary.forEach(day => {

            itineraryHTML += `
                <p>${day}</p>
            `;

        });


        card.innerHTML = `

            <img
                src="${packageItem.image}"
                alt="${packageItem.name}"
                class="package-image"
            >

            <div class="package-body">

                <h3>
                    ${packageItem.name}
                </h3>

                <p class="package-duration">
                    ${packageItem.duration}
                </p>

                <p class="package-description">
                    ${packageItem.description}
                </p>


                <div class="itinerary">

                    <h4>
                        Itinerario
                    </h4>

                    ${itineraryHTML}

                </div>


                <div class="package-bottom">

                    <span class="package-price">
                        S/ ${packageItem.price.toLocaleString("es-PE")}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${packageItem.id})"
                    >
                        Agregar
                    </button>

                </div>

            </div>
        `;


        container.appendChild(card);

    });

}


/* =====================================================
   AGREGAR AL CARRITO
===================================================== */

function addToCart(packageId) {

    const packageItem =
        packages.find(item => item.id === packageId);


    if (!packageItem) {

        return;

    }


    const existing =
        cart.find(item => item.id === packageId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...packageItem,

            quantity: 1

        });

    }


    renderCart();

    document
        .getElementById("carrito")
        .scrollIntoView({

            behavior: "smooth"

        });

}


/* =====================================================
   MOSTRAR CARRITO
===================================================== */

function renderCart() {

    const container =
        document.getElementById("cart-items");


    const cartCount =
        document.getElementById("cart-count");


    const totalElement =
        document.getElementById("cart-total");


    if (cart.length === 0) {

        container.innerHTML = `

            <p class="empty-cart">
                Tu carrito está vacío.
            </p>

        `;

        cartCount.textContent = "0";

        totalElement.textContent = "S/ 0.00";

        document
            .getElementById("buy-button")
            .disabled = true;

        return;

    }


    let total = 0;

    let totalQuantity = 0;


    container.innerHTML = "";


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;


        total += subtotal;


        totalQuantity += item.quantity;


        const element =
            document.createElement("div");


        element.className = "cart-item";


        element.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    S/ ${item.price.toLocaleString("es-PE")}
                    por paquete
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    class="quantity-button"
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    -
                </button>


                <span class="quantity-number">
                    ${item.quantity}
                </span>


                <button
                    class="quantity-button"
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${item.id})"
                >
                    Eliminar
                </button>

            </div>

        `;


        container.appendChild(element);

    });


    cartCount.textContent =
        totalQuantity;


    totalElement.textContent =
        `S/ ${total.toLocaleString("es-PE", {
            minimumFractionDigits: 2
        })}`;


    document
        .getElementById("buy-button")
        .disabled = false;

}


/* =====================================================
   CAMBIAR CANTIDAD
===================================================== */

function changeQuantity(packageId, amount) {

    const item =
        cart.find(product => product.id === packageId);


    if (!item) {

        return;

    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(packageId);

        return;

    }


    renderCart();

}


/* =====================================================
   ELIMINAR
===================================================== */

function removeFromCart(packageId) {

    cart =
        cart.filter(item => item.id !== packageId);


    renderCart();

}


/* =====================================================
   COMPLETAR COMPRA
===================================================== */

function completePurchase() {

    if (cart.length === 0) {

        return;

    }


    const total =
        cart.reduce(

            (sum, item) =>
                sum + item.price * item.quantity,

            0

        );


    document
        .getElementById("purchase-total")
        .textContent =
        `S/ ${total.toLocaleString("es-PE", {
            minimumFractionDigits: 2
        })}`;


    document
        .getElementById("purchase-modal")
        .classList.add("active");


    cart = [];


    renderCart();

}


/* =====================================================
   CERRAR MODAL
===================================================== */

function closePurchaseModal() {

    document
        .getElementById("purchase-modal")
        .classList.remove("active");

}


/* =====================================================
   CERRAR MODAL AL HACER CLICK FUERA
===================================================== */

document
    .getElementById("purchase-modal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closePurchaseModal();

            }

        }
    );


/* =====================================================
   WEATHER API
===================================================== */

async function getWeather() {

    const city =
        document.getElementById("weather-city").value;


    const result =
        document.getElementById("weather-result");


    if (
        !WEATHER_API_KEY ||
        WEATHER_API_KEY === "AQUI_COLOCA_TU_LLAVE"
    ) {

        result.innerHTML = `

            <p>
                Configura primero tu clave de WeatherAPI
                en el archivo script.js.
            </p>

        `;

        return;

    }


    result.innerHTML = `

        <p>
            Consultando el clima...
        </p>

    `;


    try {

        const url =
            `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)},Peru&lang=es`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "No se pudo obtener el clima."
            );

        }


        const data =
            await response.json();


        result.innerHTML = `

            <h3>
                ${data.location.name}
            </h3>

            <p>
                ${data.location.region},
                ${data.location.country}
            </p>


            <div class="weather-temperature">

                ${Math.round(data.current.temp_c)}°C

            </div>


            <p>
                ${data.current.condition.text}
            </p>


            <div class="weather-info">

                <span>
                    Humedad:
                    ${data.current.humidity}%
                </span>

                <span>
                    Viento:
                    ${data.current.wind_kph} km/h
                </span>

                <span>
                    Sensación:
                    ${Math.round(data.current.feelslike_c)}°C
                </span>

            </div>

        `;


    } catch (error) {

        console.error(error);


        result.innerHTML = `

            <p>
                No se pudo consultar el clima.
                Verifica tu conexión y tu clave de API.
            </p>

        `;

    }

}


/* =====================================================
   FORMULARIO DE CONTACTO
===================================================== */

document
    .getElementById("contact-form")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();


            const email =
                document.getElementById("email").value.trim();


            const message =
                document.getElementById("message").value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                alert(
                    "Completa todos los campos."
                );

                return;

            }


            alert(
                "Gracias por contactarnos. Tu mensaje ha sido enviado correctamente."
            );


            this.reset();

        }
    );


/* =====================================================
   INICIALIZAR PÁGINA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderPackages();

        renderCart();

    }
);