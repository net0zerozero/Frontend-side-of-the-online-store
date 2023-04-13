const cartMethods = {
  getCart: function () {
    return JSON.parse(localStorage.getItem('cart')) || []
  },

  addToCart: function (product) {
    const cart = this.getCart()
    // check if product already exists in cart
    const productExists = cart.find((item) => item.id === product.id)
    if (!productExists) {
      cart.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  },

  removeFromCart: function (product) {
    const cart = this.getCart()
    const updatedCart = cart.filter((item) => item.id !== product.id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  removeFromCartById: function (id) {
    const cart = this.getCart()
    const updatedCart = cart.filter((item) => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  },
  clearCart: function () {
    localStorage.removeItem('cart')
  },

  getCartTotal: function () {
    const cart = this.getCart()
    const total = cart.reduce((acc, item) => acc + item.price, 0)
    return total
  }
}

export default cartMethods
