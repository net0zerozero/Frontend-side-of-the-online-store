<script setup>
    import cartMethods from '../utils/cart';
    import { ref, watch } from 'vue';
    import { onMounted } from 'vue';

    const cart = ref([]);

    const fetchCart = () => {
        cart.value = cartMethods.getCart();
    }

    const removeItem = (id) => {
        cartMethods.removeFromCartById(id);
        cart.value = cartMethods.getCart();
    }

    const clearCart = () => {
        cartMethods.clearCart();
        cart.value = cartMethods.getCart();
    }

    onMounted(async () => {
        fetchCart();
    })
</script>

<template>
    <div>
        <h1>Корзина</h1>
      <div class="container">
        
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }}</p>
          <button @click="removeItem(item.id)">Remove</button>
        </div>
  
        <div v-if="cart.length === 0">
          <h3>Cart is empty</h3>
        </div>
  
        <div v-if="cart.length > 0">
          <h3>Total: {{ cartMethods.getCartTotal() }}</h3>
          <button @click="clearCart()">Clear cart</button>
        </div>
      </div>
    </div>
  </template>


<style scoped>
.container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 500px;
    max-width: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.cart-item{
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    border-radius: 40px;
}
</style>