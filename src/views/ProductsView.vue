<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store.js';
import axios from 'axios'

const isLoaded = ref(false)
const products = ref([])
const route = useRoute()
const pages = ref(0)
const userStore = useUserStore();

const fetchProducts = async () => {
  isLoaded.value = false
  const product_req = await axios.get('http://localhost:8000/api/products', {
    params: {
      ...route.query,
      category: route.query.category || 1
    }
  })
  products.value = product_req.data.results.map(product => ({
    ...product,
    inWishlist: false  // Добавляем свойство inWishlist для отслеживания наличия товара в списке желаний
  }))
  pages.value = product_req.data.count % 10 === 0
    ? Math.floor(product_req.data.count / 10)
    : Math.floor(product_req.data.count / 10) + 1
  isLoaded.value = true
}

const addToWishlist = async (product) => {
  await axios.post(
    'http://localhost:8000/api/wishlist/',
    {
      product_id: product.id
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
  )
  product.inWishlist = true  // После успешного добавления в список желаний, обновляем свойство inWishlist
}

const addToCart = async (product) => {
  await axios.post(
    'http://localhost:8000/api/cart/',
    {
      product_id: product.id
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
  )
}


watch(route, async () => {
    isLoaded.value = false
    products.value = []
    await fetchProducts()
})

onMounted(async () => {
    await fetchProducts()
})
</script>
<template>
  <div class="container">
    <div class="dropdown d-flex justify-content-end my-2">
      <a class="btn btn-secondary dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sort by
      </a>

      <ul class="dropdown-menu">
        <li>
          <router-link :to="{ name: 'products', query: { ...$route.query, ordering: 'price' } }" class="dropdown-item">
            Price asc
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'products', query: { ...$route.query, ordering: '-price' } }" class="dropdown-item">
            Price desc
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="isLoaded" class="row">
  <div class="col-12 col-md-6 col-lg-4" v-for="product in products" :key="product.id">
    <div class="card-prod">
      <router-link :to="'products/' + product.id">
        <img :src="product.image" class="card-img-top" :alt="product.title" />
      </router-link>
      <div class="card-body text-center"> <!-- Добавлен класс text-center -->
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="price text-success">{{ product.price }} тг</p>
        
        <button v-if="userStore.isLoggedIn" class="btn btn-danger" @click="addToCart(product)">
          <i class="bi bi-cart">Add to cart</i>
        </button>
        <button v-if="userStore.isLoggedIn" class="btn btn-danger" style="margin-left: 5px;" @click="addToWishlist(product)">
          <i class="bi bi-cart">Add to wishlist</i>
        </button>
      </div>
        </div>
      </div>

      <nav class="py-4" aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li class="page-item" v-for="i in pages" :key="i">
            <router-link :to="{ name: 'products', query: { ...$route.query, page: i } }" class="page-link">{{ i }}</router-link>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style>
.card-prod{
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin-top: 20px;
  border-radius: 20px;
}
</style>