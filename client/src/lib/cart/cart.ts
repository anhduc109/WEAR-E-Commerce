export const countQuantity = (cart: any) => {
  let count = 0
  cart.map((product: any) => {
    count += product.quantity
  })
  return count
}

export const countTotalPrice = (cart: any) => {
  let count = 0
  cart.map((product: any) => {
    count += product.quantity * product.product.price
  })
  return Math.round(count * 100) / 100
}
