
document.addEventListener("DOMContentLoaded", async () => {
    const loadingSpinner = document.getElementById("loading-spinner");
  
    if (!loadingSpinner) {
      console.error("Loading spinner element not found.");
      return;
    }

    try {
      loadingSpinner.style.display = "flex";
  
      await fetchDataAndInitialize();
  
      loadingSpinner.style.display = "none";
    } catch (error) {
      console.error("Error during initialization:", error);
      loadingSpinner.innerHTML = "<p>Wystąpił błąd podczas ładowania danych.</p>";
    }
  });
  
  async function fetchDataAndInitialize() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }