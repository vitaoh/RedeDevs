document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("editButton");
    const cancelButton = document.getElementById("cancelButton");
    const editForm = document.getElementById("editForm");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const photoInput = document.getElementById("photo");

    editButton.addEventListener("click", () => {
      editForm.classList.remove("d-none");
      editButton.classList.add("d-none");
    });

    cancelButton.addEventListener("click", () => {
      editForm.classList.add("d-none");
      editButton.classList.remove("d-none");
    });

    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      profileName.textContent = nameInput.value;
      profileEmail.textContent = emailInput.value;
      
      if (photoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.querySelector(".profile-picture").src = e.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]);
      }

      editForm.classList.add("d-none");
      editButton.classList.remove("d-none");
      alert("Informações salvas com sucesso!");
    });
  });