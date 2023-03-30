<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const isLoaded = ref(false)
const products = ref([])
const route = useRoute()

const fetchProducts = async () => {
  isLoaded.value = false
  const product_req = await axios.get('http://localhost:8000/api/products', {
    params: {
      category: route.query.category || 1
    }
  })
  products.value = product_req.data.results
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
  <div class="container">
    <h1>Products</h1>
    <div class="container">
      <div class="dropdown d-flex justify-content-end my-2">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort by
        </a>

        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Price asc</a></li>
          <li><a class="dropdown-item" href="#">Price desc</a></li>
        </ul>
      </div>

      <div v-if="isLoaded" class="prod_div">
        <div class="prod1" v-for="product in products" :key="product.id">
          <div class="prod1">
            <img :src="product.image" :alt="product.title" />
            <p>{{ product.title }}</p>
            <p>{{ product.price }}</p>
          </div>
        </div>
      </div>

      <div v-else>
        <p>Loading</p>
      </div>

      <nav class="py-4" aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
  .card-hover:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }

  .prod1 {
    background-color: #030029;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    display: grid;
    place-items: center;
  }

  .prod1 img {
    z-index: 2;
    margin: 15px;
    border-radius: 8px;
  }

  .prod1 p {
    font-family: system-ui;
    font-size: 2rem;
    color: white;
    text-align: center;
    z-index: 2;
  }


  .prod_div {
    display: grid;
    grid-column-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    .prod1 {
      width: 100%;
      height: auto;
      margin: 5px 0;
    }

  }
  </style>