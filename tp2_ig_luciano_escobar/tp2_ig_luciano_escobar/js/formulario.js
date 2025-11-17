document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Función para mostrar toast
  function showToast(msg, type = "error") {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.className = `toast fixed top-5 right-5 px-4 py-2 rounded shadow-lg font-semibold ${
      type === "error" ? "bg-red-500 text-white" : "bg-teal-400 text-black"
    }`;
    document.body.appendChild(toast);

    // Animación de entrada
    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 100);

    // Desaparece después de 3 segundos
    setTimeout(() => {
      toast.classList.remove("toast-show");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 3000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const motivo = form.motivo.value;
    const mensaje = form.mensaje.value.trim();

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Eliminar errores existentes
    document.querySelectorAll(".error-msg").forEach(el => el.remove());

    const showError = (input, msg) => {
      const p = document.createElement("p");
      p.classList.add("error-msg", "text-red-400", "text-sm", "mt-1");
      p.textContent = msg;
      input.parentElement.appendChild(p);
      isValid = false;
    };

    // Validaciones
    if (!nameRegex.test(nombre)) {
      showError(form.nombre, "Ingresá un nombre válido (solo letras, mínimo 2 caracteres).");
    }
    if (!emailRegex.test(email)) {
      showError(form.email, "Ingresá un email válido.");
    }
    if (motivo === "") {
      showError(form.motivo, "Seleccioná un motivo.");
    }
    if (mensaje.length < 10) {
      showError(form.mensaje, "El mensaje debe tener mínimo 10 caracteres.");
    }

    // Si todo está bien
    if (isValid) {
      showToast("Formulario enviado correctamente ✔️", "success");
      form.submit();
    } else {
      // Mostrar primer error en toast
      const firstError = document.querySelector(".error-msg");
      if (firstError) showToast(firstError.textContent, "error");
    }
  });
});






