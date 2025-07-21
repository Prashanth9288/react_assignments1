// js/product.js
import { db } from './firebase-config';
import {
  doc, getDoc,
  collection, query, where, limit, getDocs
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

const params = new URLSearchParams(location.search);
const productId = params.get("productId");

const detailDiv = document.getElementById("productDetail");
const reviewsDiv = document.getElementById("reviews");
const suggestedDiv = document.getElementById("suggested");

async function loadProduct() {
  const productRef = doc(db, "products", productId);
  const snap = await getDoc(productRef);
  if (!snap.exists()) {
    detailDiv.innerHTML = "<h2>Product Not Found</h2>";
    return;
  }

  const p = snap.data();
  detailDiv.innerHTML = `
    <div class="product-main">
      <img src="${p.imageUrl}" class="detail-img" />
      <div>
        <h2>${p.name}</h2>
        <p><strong>Price:</strong> $${p.price}</p>
        <p><strong>Stock:</strong> ${p.stock > 0 ? p.stock : "Out of Stock"}</p>
        <p>${p.description || ""}</p>
        <button onclick="alert('Added to Cart')">Add to Cart</button>
        <button onclick="alert('Saved to Wishlist')">❤️ Wishlist</button>
      </div>
    </div>
  `;

  loadReviews(productId);
  loadSuggestions(p.category, productId);
}

async function loadReviews(productId) {
  const reviewRef = collection(db, `products/${productId}/reviews`);
  const snapshot = await getDocs(reviewRef);

  if (snapshot.empty) {
    reviewsDiv.innerHTML = "<p>No reviews yet.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const r = doc.data();
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `
      <strong>${r.username}</strong>
      <span>${"⭐".repeat(r.rating)}</span>
      <p>${r.comment}</p>
    `;
    reviewsDiv.appendChild(div);
  });
}

async function loadSuggestions(category, currentProductId) {
  const q = query(
    collection(db, "products"),
    where("category", "==", category),
    limit(5)
  );
  const snapshot = await getDocs(q);
  suggestedDiv.innerHTML = "";

  snapshot.forEach(doc => {
    if (doc.id === currentProductId) return;

    const p = doc.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.imageUrl}" />
      <p>${p.name}</p>
      <p>$${p.price}</p>
      <a href="product.html?productId=${doc.id}">View</a>
    `;
    suggestedDiv.appendChild(div);
  });
}

loadProduct();
