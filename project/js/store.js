// js/store.js
import { db } from './firebase-config';
import {
  doc, getDoc,
  collection, query, where, orderBy, getDocs
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

const vendorId = new URLSearchParams(location.search).get("vendorId");
if (!vendorId) location.href = "404.html";

const storeHeader = document.getElementById("storeHeader");
const productGrid = document.getElementById("productGrid");

async function loadVendorData() {
  const vendorRef = doc(db, "vendors", vendorId);
  const snap = await getDoc(vendorRef);
  if (!snap.exists()) return storeHeader.innerHTML = "<h3>Store Not Found</h3>";

  const vendor = snap.data();
  storeHeader.innerHTML = `
    <img src="${vendor.bannerUrl || 'images/placeholder.jpg'}" class="banner" />
    <div class="store-info">
      <img src="${vendor.logoUrl || 'images/placeholder.jpg'}" class="logo" />
      <h1>${vendor.storeName}</h1>
    </div>
  `;
}

async function loadProducts(tag) {
  productGrid.innerHTML = "<p>Loading...</p>";

  const productsRef = collection(db, "products");
  const q = query(
    productsRef,
    where("vendorId", "==", vendorId),
    where("tags", "array-contains", tag),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  productGrid.innerHTML = "";

  if (snapshot.empty) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const p = doc.data();
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.imageUrl}" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="alert('Added to Cart')">🛒</button>
      <button onclick="alert('Added to Wishlist')">❤️</button>
    `;
    productGrid.appendChild(div);
  });
}

// Filter tab switching
document.querySelectorAll(".filter-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadProducts(btn.dataset.filter);
  });
});

loadVendorData();
loadProducts("new");
