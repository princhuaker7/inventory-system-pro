const API_URL = "http://localhost:8080/api/products";

const productForm = document.getElementById("productForm");
const productTableBody = document.getElementById("productTableBody");
const messageBox = document.getElementById("message");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("productId").value;
  const product = {
    name: document.getElementById("name").value.trim(),
    category: document.getElementById("category").value.trim(),
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value)
  };

  if (!product.name || !product.category || isNaN(product.price) || isNaN(product.stock)) {
    showMessage("Completa todos los campos correctamente.", true);
    return;
  }

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
      showMessage("Producto actualizado correctamente.");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
      showMessage("Producto agregado correctamente.");
    }

    productForm.reset();
    document.getElementById("productId").value = "";
    loadProducts();
  } catch (error) {
    showMessage("No se pudo conectar con el backend.", true);
  }
});

function showMessage(text, isError = false) {
  messageBox.textContent = text;
  messageBox.style.color = isError ? "#ef4444" : "#16a34a";
}

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    showMessage("Error al cargar productos. Revisa si el backend está corriendo.", true);
  }
}

function renderProducts(products) {
  productTableBody.innerHTML = "";

  products.forEach(product => {
    const stockStatus = product.stock < 5
      ? '<span class="low-stock">Stock bajo</span>'
      : '<span class="ok-stock">Disponible</span>';

    const safeName = String(product.name).replace(/'/g, "\\'");
    const safeCategory = String(product.category).replace(/'/g, "\\'");

    const row = `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>$${product.price}</td>
        <td>${product.stock}</td>
        <td>${stockStatus}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editProduct(${product.id}, '${safeName}', '${safeCategory}', ${product.price}, ${product.stock})">Editar</button>
          <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Eliminar</button>
        </td>
      </tr>
    `;
    productTableBody.innerHTML += row;
  });
}

function editProduct(id, name, category, price, stock) {
  document.getElementById("productId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("category").value = category;
  document.getElementById("price").value = price;
  document.getElementById("stock").value = stock;
  showMessage("Modo edición activado.");
}

async function deleteProduct(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    showMessage("Producto eliminado correctamente.");
    loadProducts();
  } catch (error) {
    showMessage("No se pudo eliminar el producto.", true);
  }
}

async function searchProducts() {
  const name = document.getElementById("searchInput").value.trim();

  if (name === "") {
    loadProducts();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/search?name=${encodeURIComponent(name)}`);
    const products = await response.json();
    renderProducts(products);
    showMessage(`Búsqueda completada: ${products.length} resultado(s).`);
  } catch (error) {
    showMessage("No se pudo realizar la búsqueda.", true);
  }
}

loadProducts();
