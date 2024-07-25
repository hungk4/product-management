// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
     let time = showAlert.getAttribute("show-alert") || 3000;
     time = parseInt(time);
     
     setTimeout(() => {
      showAlert.classList.add("hidden");
    }, time);
}
// End show-alert

// Cập nhật số lượng trong giỏ hàng
const listInputQuantity = document.querySelectorAll(`input[name="quantity"]`);
if(listInputQuantity.length > 0){
  for(const input of  listInputQuantity){
    input.addEventListener("change", () => {
      const quantity = parseInt(input.value) ;
      const productId = input.getAttribute("product-id");

      if(productId && quantity > 0) {
        window.location.href = `/cart/update/${productId}/${quantity}`;
      }
    })
  }
}
// Hết Cập nhật số lượng trong giỏ hàng