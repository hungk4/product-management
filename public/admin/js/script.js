// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");
if(listButtonStatus.length > 0) {
  let url = new URL(window.location.href);

  // Bắt sự kiện click
  listButtonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      
      if(status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
  
  // Thêm class active mặc định
  const statusCurrent = url.searchParams.get("status") || "";
  const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);
  if(buttonCurrent) {
    buttonCurrent.classList.add("active");
  }
}
// End Button Status

// Form Search
const formSearch = document.querySelector("[form-search]");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const keyword = event.target.elements.keyword.value;

    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
// End Form Search

// Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0) {
  let url = new URL(window.location.href);
  
  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      
      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
// End Pagination

// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0) {
  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("link");
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200) {
            window.location.reload();
          }
        })
    });
  });
}
// End Button Change Status

// Check Item
const inputCheckAll = document.querySelector("input[name='checkAll']");
if(inputCheckAll) {
  const listInputCheckItem = document.querySelectorAll("input[name='checkItem']");

  // Bắt sự kiện click vào nút checkAll
  inputCheckAll.addEventListener("click", () => {
    listInputCheckItem.forEach(inputCheckItem => {
      inputCheckItem.checked = inputCheckAll.checked;
    });
  });


  // Bắt sự kiện click vào nút checkItem
  listInputCheckItem.forEach(inputCheckItem => {
    inputCheckItem.addEventListener("click", () => {
      const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");

      if(listInputCheckItem.length == listInputCheckItemChecked.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End Check Item

// Box Actions
const boxActions = document.querySelector("[box-actions]");
if(boxActions) {
  const button = boxActions.querySelector("button");

  button.addEventListener("click", () => {
    const select = boxActions.querySelector("select");
    const status = select.value;

    const listInputChecked = document.querySelectorAll("input[name='checkItem']:checked");
    const ids = [];
    listInputChecked.forEach(input => {
      ids.push(input.value);
    });

    if(status != "" && ids.length > 0) {
      const dataChangeMulti = {
        status: status,
        ids: ids
      };

      const link = boxActions.getAttribute("box-actions");
      
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataChangeMulti),
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200) {
            window.location.reload();
          }
        })
    } else {
      alert("Hành động và checkItem phải được chọn!");
    }
  });
}
// End Box Actions

// Xoa ban ghi
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0){
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("button-delete");
      fetch(link, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
            window.location.reload();
          }
        })

    });
  });
}
// Het Xoa ban ghi

// Thay đổi vị trí
const listInputPosition = document.querySelectorAll("input[name='position']");
if(listInputPosition.length > 0){
  listInputPosition.forEach(input => {
    input.addEventListener("change", () => {
      const link = input.getAttribute("link");
      const position = parseInt(input.value);
      // const position = parseInt(input.getAttribute("value"));
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: position
        })
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
            window.location.reload();
          }
          console.log(data.code);
        })
    })
  })
}
// Hết thay đổi vị trí

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

// restore
const listButtonRestore = document.querySelectorAll("[button-restore]");
if(listButtonRestore.length > 0){
  listButtonRestore.forEach(button => {
    button.addEventListener("click", () =>{
      const link = button.getAttribute("button-restore");
      fetch(link, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
            window.location.reload();
          }
        })
    });
  });
}
// End restore

// permanentlyDelete
const listButtonPermanentlyDelete = document.querySelectorAll("[button-permanentlyDelete]");
if(listButtonPermanentlyDelete.length > 0){
  listButtonPermanentlyDelete.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("button-permanentlyDelete");
      fetch(link, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
            window.location.reload();
          }
        })
    })
  });
}
// End permanentlyDelete


// Upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })
}
// End upload Image


// Sort
const sort = document.querySelector("[sort]");
if(sort){
  let url = new URL(window.location.href);

  const select = sort.querySelector("[sort-select]");
  select.addEventListener("change", () => {
    const [sortKey, sortValue] = select.value.split("-");
    if(sortKey && sortValue){
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      window.location.href = url.href;
    }
  })

  // Thêm selected mặc định cho option
  const defaultSortKey = url.searchParams.get("sortKey");
  const defaultSortValue = url.searchParams.get("sortValue");
  console.log(defaultSortKey+" "+defaultSortValue);
  if(defaultSortKey && defaultSortKey) {
    const optionSelected = select.querySelector(`option[value="${defaultSortKey}-${defaultSortValue}"]`);
    optionSelected.selected = true;
  }

  // Tính năng clear
  const buttonClear = sort.querySelector("[sort-clear]");
  if(buttonClear){
    buttonClear.addEventListener("click", ()=>{
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      
      window.location.href = url.href;
    })
  }
}
// End Sort