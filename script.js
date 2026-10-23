
const foods = [
    {
        id: 1,
        name: "Nasi Putih",
        emoji: "🍚",
        category: "Makanan pokok",
        calories: 130,
        protein: 2.7,
        carbs: 28.2,
        fat: 0.3
    },
    {
        id: 2,
        name: "Telur Rebus",
        emoji: "🥚",
        category: "Sumber protein",
        calories: 155,
        protein: 12.6,
        carbs: 1.1,
        fat: 10.6
    },
    {
        id: 3,
        name: "Tempe",
        emoji: "🫘",
        category: "Sumber protein",
        calories: 193,
        protein: 20.3,
        carbs: 8.8,
        fat: 10.8
    },
    {
        id: 4,
        name: "Tahu",
        emoji: "🧈",
        category: "Sumber protein",
        calories: 76,
        protein: 8.1,
        carbs: 1.9,
        fat: 4.8
    },
    {
        id: 5,
        name: "Dada Ayam Matang",
        emoji: "🍗",
        category: "Sumber protein",
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6
    },
    {
        id: 6,
        name: "Pisang",
        emoji: "🍌",
        category: "Buah",
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3
    },
    {
        id: 7,
        name: "Brokoli Rebus",
        emoji: "🥦",
        category: "Sayuran",
        calories: 35,
        protein: 2.4,
        carbs: 7.2,
        fat: 0.4
    },
    {
        id: 8,
        name: "Apel",
        emoji: "🍎",
        category: "Buah",
        calories: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2
    },
    {
        id: 9,
        name: "Ikan Kembung Matang",
        emoji: "🐟",
        category: "Sumber protein",
        calories: 205,
        protein: 19,
        carbs: 0,
        fat: 14
    }
];

// Mengambil elemen HTML berdasarkan ID-nya.
const foodGrid = document.getElementById("foodGrid");
const searchInput = document.getElementById("searchInput");

const selectedFoodName =
    document.getElementById("selectedFoodName");

const selectedFoodPortion =
    document.getElementById("selectedFoodPortion");

const selectedFoodEmoji =
    document.getElementById("selectedFoodEmoji");

const caloriesValue =
    document.getElementById("caloriesValue");

const proteinValue =
    document.getElementById("proteinValue");

const carbsValue =
    document.getElementById("carbsValue");

const fatValue =
    document.getElementById("fatValue");

const portionInput =
    document.getElementById("portionInput");

const calculateButton =
    document.getElementById("calculateButton");

const resultText =
    document.getElementById("resultText");

const menuGoal = document.getElementById("menuGoal");
const suggestButton = document.getElementById("suggestButton");
const suggestionResult =
    document.getElementById("suggestionResult");

// Makanan yang sedang dipilih pengguna.
let selectedFood = foods[0];

// Membuat kartu makanan berdasarkan data.
function renderFoods(foodList) {
    if (foodList.length === 0) {
        foodGrid.innerHTML = `
            <p class="empty-state">
                Makanan tidak ditemukan.
                Coba kata kunci lainnya.
            </p>
        `;
        return;
    }

    foodGrid.innerHTML = foodList.map(food => `
        <button
            type="button"
            class="food-card ${
                food.id === selectedFood.id ? "selected" : ""
            }"
            data-food-id="${food.id}"
            aria-pressed="${food.id === selectedFood.id}"
        >
            <span class="food-emoji" aria-hidden="true">
                ${food.emoji}
            </span>

            <h3>${food.name}</h3>

            <p>${food.category}</p>

            <span class="food-calories">
                ${food.calories} kkal / 100 g
            </span>
        </button>
    `).join("");
}

// Memilih makanan dan memperbarui detailnya.
function selectFood(foodId) {
    const food = foods.find(item => item.id === foodId);

    if (!food) return;

    selectedFood = food;

    renderFoods(
        foods.filter(item =>
            item.name.toLowerCase().includes(
                searchInput.value.trim().toLowerCase()
            )
        )
    );

    updateNutrition();
}

// Menjalankan pencarian setiap kali pengguna mengetik.
searchInput.addEventListener("input", function () {
    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(keyword)
    );

    renderFoods(filteredFoods);
});

// Menangani klik pada kartu makanan.
foodGrid.addEventListener("click", function (event) {
    const card = event.target.closest("[data-food-id]");

    if (!card || !foodGrid.contains(card)) return;

    selectFood(Number(card.dataset.foodId));
});

// Membulatkan angka menjadi maksimal satu angka desimal.
function formatNumber(value) {
    return Number(value.toFixed(1)).toLocaleString("id-ID");
}

// Memperbarui panel nutrisi sesuai makanan terpilih.
function updateNutrition() {
    selectedFoodName.textContent = selectedFood.name;
    selectedFoodEmoji.textContent = selectedFood.emoji;

    caloriesValue.textContent = formatNumber(
        selectedFood.calories
    );

    proteinValue.textContent = formatNumber(
        selectedFood.protein
    );

    carbsValue.textContent = formatNumber(
        selectedFood.carbs
    );

    fatValue.textContent = formatNumber(
        selectedFood.fat
    );

    selectedFoodPortion.textContent =
        "Estimasi nilai per 100 gram";

    portionInput.value = "1";

    calculateNutrition();
}

// Menghitung total nutrisi berdasarkan jumlah porsi.
function calculateNutrition() {
    const portions = Number(portionInput.value);

    if (
        !Number.isFinite(portions) ||
        portions < 0.5 ||
        portions > 20
    ) {
        resultText.textContent =
            "Masukkan jumlah porsi antara 0,5 dan 20.";
        return;
    }

    const calories =
        selectedFood.calories * portions;

    const protein =
        selectedFood.protein * portions;

    const carbs =
        selectedFood.carbs * portions;

    const fat =
        selectedFood.fat * portions;

    resultText.textContent =
        `Total ${formatNumber(portions * 100)} gram ` +
        `${selectedFood.name}: ` +
        `${formatNumber(calories)} kkal energi, ` +
        `${formatNumber(protein)} g protein, ` +
        `${formatNumber(carbs)} g karbohidrat, dan ` +
        `${formatNumber(fat)} g lemak.`;
}

// Menjalankan perhitungan ketika tombol diklik.
calculateButton.addEventListener(
    "click",
    calculateNutrition
);

// Hitung ulang ketika jumlah porsi berubah.
portionInput.addEventListener(
    "input",
    calculateNutrition
);

const menuSuggestions = {
    seimbang: {
        title: "Inspirasi menu beragam",
        items: [
            "Nasi putih",
            "Dada ayam matang",
            "Brokoli rebus"
        ],
        description:
            "Contoh kombinasi sumber karbohidrat, protein, " +
            "dan sayuran. Sesuaikan pilihan dan porsinya " +
            "dengan kebutuhan masing-masing."
    },

    protein: {
        title: "Inspirasi sumber protein",
        items: [
            "Telur rebus",
            "Tempe",
            "Tahu",
            "Ikan kembung matang"
        ],
        description:
            "Kamu bisa mengeksplorasi beberapa sumber protein " +
            "hewani dan nabati."
    },

    praktis: {
        title: "Inspirasi menu praktis",
        items: [
            "Telur rebus",
            "Nasi putih",
            "Pisang"
        ],
        description:
            "Contoh ide bahan sederhana yang mudah ditemukan. " +
            "Kombinasi ini bukan otomatis menu lengkap untuk " +
            "semua kebutuhan gizi."
    }
};

suggestButton.addEventListener("click", function () {
    const suggestion = menuSuggestions[menuGoal.value];

    if (!suggestion) return;

    const listItems = suggestion.items
        .map(item => `<li>${item}</li>`)
        .join("");

    suggestionResult.innerHTML = `
        <strong>${suggestion.title}</strong>

        <ul>
            ${listItems}
        </ul>

        <p>${suggestion.description}</p>
    `;
});
// Menampilkan seluruh makanan ketika website dibuka.
renderFoods(foods);

// Menampilkan detail makanan pertama.
updateNutrition();