// SEARCH.JS IS FOR ALL DOM Manipulation
// SEARCH.JS IS FOR ALL DOM Manipulation
// SEARCH.JS IS FOR ALL DOM Manipulation
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

function assetFilterClicked () {
   var assetFilter = document.querySelector('.checkbox-options-holder');
   assetFilter.classList.toggle('inactive');
   var chevronDown = document.querySelector('.fa-chevron-down');
   chevronDown.classList.toggle('rotateInMod');
}

function ModalListClicked () {
  document.querySelector('.uploadModal').classList.toggle('active');
}
function closeModal() {
  document.querySelector('.uploadModal').classList.toggle('active');
}


// SEARCH.JS IS FOR ALL DOM Manipulation
// SEARCH.JS IS FOR ALL DOM Manipulation
// SEARCH.JS IS FOR ALL DOM Manipulation
// SEARCH.JS IS FOR ALL DOM Manipulation
