$(function(){ 

  var modal = document.querySelector(".my-modal");
  var trigger = document.querySelector(".my-trigger");
  var closeButton = document.querySelector(".close-button");

  function toggleModal() {
      modal.classList.toggle("show-modal");
  }

  function windowOnClick(event) {
      if (event.target === modal) {
          toggleModal();
      }
  }
 
  trigger.addEventListener("click", toggleModal);
  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);

  });