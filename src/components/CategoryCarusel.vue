<script setup>
const categories = [
  {
    id: 1,
    title: 'Phones',
    img: 'https://images.wallpaperscraft.com/image/single/tunnel_lines_neon_875834_1920x1080.jpg'
  },
  {
    id: 2,
    title: 'Laptops',
    img: 'https://images.wallpaperscraft.com/image/single/buildings_houses_roofs_875974_1920x1080.jpg'
  }
]
</script>

<template>
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div
        v-for="c in categories"
        :key="c.id"
        :class="{ 'carousel-item': true, active: c.id == 1 ? true : false }"
      >
        <img :src="c.img" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
