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
        
        <div class="content-div">
          <div class="container">
            <div class="h1-tag">
              <h1><svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>Корзина</h1>
            </div>
        
            
       <div class="card-item1">
        <div v-for="item in cart" style="width: 17%" :key="item.id" class="cart-item2">
          <img :src="item.image" class="card-img-top" :alt="item.title" />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.price }} тг</p>
          <button class="btn-button" @click="removeItem(item.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
            Remove</button>
        </div>
       </div>
  
        <div v-if="cart.length === 0">
          <h3>Cart is empty</h3>
        </div>
  
        <div v-if="cart.length > 0" class="content-div">
          <h3 class="h3-tag">Total: {{ cartMethods.getCartTotal() }} тг</h3>
        </div>
        <div class="content-div">
          <button @click="clearCart()" class="remove-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
            Clear cart</button>
        </div>

      </div>
        </div>
    </div>
  </template>


<style scoped>
.content-div{
    display: flex;
    justify-content: center;
    align-items: flex-start;
}


.h1-tag{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

h1 {
    text-align: center;
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
.cart-item2{
  position: relative;
  text-align: center;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    margin: 20px;
    width: 100%;
      max-width: 300px;
      height: 470px;
      margin: 10px;
      padding: 10px;
      border-radius: 20px;
      font-family: "Anton", sans-serif;
    
}

.card-item1{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
}
.cart-item2:hover {
      background-color: black;
      color: white;
      box-shadow: none;
  }
  
.cart-item2 h5{
  margin-top: 15px;
  color: black;
}

.cart-item2 p{
  margin-top: 25px;
  font-size: 25px;
  color: black;
  font-weight: bold;
}

.cart-item2 img{
  border-radius: 10px;
}


.btn-button{
  
      height: 35px;
      width: 70%;
      border-radius: 15px;
      color: white;
      background-color: black;
      padding: 1px;
      font-weight: 700;
      border-style: double;
      position: absolute;
      text-align: center;
      left: 15%;
      bottom: 25px;
      
  }
  .cart-item2:hover .btn-button{
      color: black;
      background-color: white;
  }
  .cart-item2:hover h5{
    color: white;
  }
  .cart-item2:hover p{
    color: white;
  }
  .remove-btn{
    height: 35px;
      width: 25%;
      border-radius: 15px;
      color: white;
      background-color: black;
      padding: 1px;
      font-weight: 700;
      border-style: double;
      margin-bottom: 20px;
  }
  .h3-tag{
    text-align: center;
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
    font-weight: bold;
  }
  .remove-btn:hover{
    background-color: white;
    color: black;
  }
</style>