// SEARCH.JS IS FOR ALL DOM Manipulation

function downloadActivationQueue() {
  document.getElementById("get-assets-container").className = "active";
}


  function openTagsModal() {
    // document.querySelector('update-tags-modal').classList.toggle('active');
    document.getElementById("update-tags-modal").className = "active";
    // modal.classList.add("active";
  };

function closeTagsModal() {
  document.getElementById("update-tags-modal").classList.remove("active");
}
