<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import cartMethods from '../utils/cart'
import axios from 'axios'

const isLoaded = ref(false)
const products = ref([])
const route = useRoute()
const pages = ref(0)

const fetchProducts = async () => {
    isLoaded.value = false
    const product_req = await axios.get('http://localhost:8000/api/products', {
        params: {
            ...route.query,
            category: route.query.category || 1
        }
    })
    products.value = product_req.data.results
    pages.value = product_req.data.count % 10 === 0
        ? Math.floor(product_req.data.count / 10)
        : Math.floor(product_req.data.count / 10) + 1
    isLoaded.value = true
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
    <div class="back-anim">
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
              <RouterLink :to="{name: 'products', query: { ...route.query, ordering: 'price' }}" class="dropdown-item">
                Price asc
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'products', query: { ...route.query, ordering: '-price' }}"  class="dropdown-item">
                Price desc
              </RouterLink>
            </li>
          </ul>
        </div>
  
        <div v-if="isLoaded" class="div-prod">
          <div class="card-style1"
            style="width: 17%"
            v-for="product in products"
            :key="product.id"
          >
            <div class="card-body12">
              <RouterLink class="a_link_routerlink" :to="'products/' + product.id">
                <img :src="product.image" class="card-img-top" :alt="product.title"/>
              </RouterLink>
                <div class="card-body">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <p class="card-text">{{ product.price }}</p>
                  <button class="btn-button" @click="cartMethods.addToCart(product)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    Add to cart
                  </button>
                  

                </div>
            </div>
          </div>
  
          <nav class="py-4" aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"
                v-for="i in pages"
                :key="i"
              >
                <RouterLink :to="{name: 'products', query: { ...route.query, page: i }}" class="page-link">{{i}}</RouterLink>
              </li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
  
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .card-hover:hover {
      box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
  .a_link_routerlink{
      text-decoration: none;
  }
  .div-prod {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
  }
  
  .card-body12{
      overflow: hidden;
  }
  
  .card-style1 {
      width: 100%;
      max-width: 300px;
      height: 470px;
      margin: 10px;
      padding: 10px;
      border-radius: 20px;
      font-family: "Anton", sans-serif;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
      transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card-style1:hover {
      background-color: black;
      color: white;
      box-shadow: none;
  }
  
  .card-body{
      text-align: center;
  }
  
  .card-body h5{
      margin-top: 15px;
      color: black;
  }
  
  .card-body p{
      margin-top: 25px;
      font-size: 25px;
      color: black;
  }
  
  .card-img-top{
      border-radius: 10px;
  }
  
  .card-style1:hover .card-body h5,
  .card-style1:hover .card-body p {
      color: white;
  }
  
  .btn-button{
      height: 35px;
      width: 70%;
      border-radius: 15px;
      color: white;
      background-color: black;
      padding: 3px;
      font-weight: 700;
      border-style: double;
  }
  
  .card-style1:hover .btn-button{
      color: black;
      background-color: white;
  }
  
  /* Медиа-запрос для мобильных устройств */
  @media (max-width: 767px) {
      .div-prod {
          justify-content: flex-start;
      }
      .card-style1 {
          max-width: 100%;
      }
  }
  </style>
  