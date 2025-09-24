document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  function showPage(id) {
    pages.forEach((page) => {
      if (page.id === id) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });
  }

  function setActiveLink(id) {
    links.forEach((link) => {
      if (link.dataset.target === id) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Animasi fade dengan Promise agar urut
  function fadeOut(element) {
    return new Promise((resolve) => {
      element.style.opacity = 1;
      let opacity = 1;
      let timer = setInterval(() => {
        if (opacity <= 0) {
          clearInterval(timer);
          element.style.display = "none";
          resolve();
        }
        element.style.opacity = opacity;
        opacity -= 0.05;
      }, 15);
    });
  }

  function fadeIn(element) {
    return new Promise((resolve) => {
      element.style.display = "block";
      element.style.opacity = 0;
      let opacity = 0;
      let timer = setInterval(() => {
        if (opacity >= 1) {
          clearInterval(timer);
          resolve();
        }
        element.style.opacity = opacity;
        opacity += 0.05;
      }, 15);
    });
  }

  // Fungsi ganti halaman dengan animasi
  async function changePage(id) {
    const currentPage = document.querySelector(".page.active");
    if (currentPage.id === id) return;

    await fadeOut(currentPage);
    currentPage.classList.remove("active");

    const nextPage = document.getElementById(id);
    nextPage.classList.add("active");
    await fadeIn(nextPage);

    setActiveLink(id);
    // Update URL tanpa reload
    history.pushState({ page: id }, "", `#${id}`);
  }

  // Event click link navigasi
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      changePage(target);
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.page) {
      changePage(e.state.page);
    } else {
      changePage("home");
    }
  });

  // Load halaman sesuai URL awal
  const hash = window.location.hash.replace("#", "");
  if (hash && document.getElementById(hash)) {
    changePage(hash);
  } else {
    showPage("home");
    setActiveLink("home");
    history.replaceState({ page: "home" }, "", "#home");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ... kode lama tetap dijalankan

  // Kode baru untuk jurusan
  const jurusanItems = document.querySelectorAll(".jurusan-list li");
  const jurusanDetails = document.querySelectorAll(".jurusan-detail");

  jurusanItems.forEach((item) => {
    item.style.cursor = "pointer"; // tanda klikable
    item.addEventListener("click", () => {
      const targetId = item.dataset.jurusan;
      
      jurusanDetails.forEach((detail) => {
        if (detail.id === targetId) {
          // Toggle aktif/nonaktif dengan smooth toggle
          if (detail.classList.contains("active")) {
            detail.classList.remove("active");
          } else {
            // tutup semua detail dulu
            jurusanDetails.forEach(d => d.classList.remove("active"));
            // buka detail yg dipilih
            detail.classList.add("active");
            // Scroll ke penjelasan yang aktif dengan smooth scroll
            detail.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          detail.classList.remove("active");
        }
      });
    });
  });

});