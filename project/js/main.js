// main.js
import { db } from "./firebase-config";
import { collection, query, where, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function fetchFeaturedShops() {
  const q = query(collection(db, "vendors"), where("isFeatured", "==", true), limit(5));
  const snapshot = await getDocs(q);
  const container = document.getElementById("featuredShops");

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${data.storeName}</strong><br/><img src="${data.logoUrl}" height="50"/>`;
    container.appendChild(div);
  });
}

async function fetchNewArrivals() {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(5));
  const snapshot = await getDocs(q);
  const container = document.getElementById("newArrivals");

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${data.name}</strong><br/><span>$${data.price}</span>`;
    container.appendChild(div);
  });
}

async function fetchTopRated() {
  const q = query(collection(db, "products"), where("avgRating", ">=", 4.5), orderBy("avgRating", "desc"), limit(5));
  const snapshot = await getDocs(q);
  const container = document.getElementById("topRatedCarousel");

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${data.name}</strong><br/>⭐ ${data.avgRating}`;
    container.appendChild(div);
  });
}

fetchFeaturedShops();
fetchNewArrivals();
fetchTopRated();
