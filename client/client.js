var list = document.getElementById("display-list");

function addCLickEvent() {
  const close = document.querySelectorAll(".btn");
  close.forEach((li) => {
    li.addEventListener("click", () => {
      deleteData(li.id);
    });
  });
}

function createList(data) {
  list.innerHTML = "";
  for (let i = 0; i < data.length; ++i) {
    var div = document.createElement("div");
    var p = document.createElement("p");
    var delBtn = document.createElement("div");

    delBtn.innerHTML = "\u00D7";
    delBtn.setAttribute("class", "btn");
    delBtn.setAttribute("id", data[i].id);
    p.innerHTML = data[i].task;

    div.appendChild(p);
    div.appendChild(delBtn);
    div.classList.add("list-item");
    list.appendChild(div);
  }
  addCLickEvent();
}

function getData() {
  fetch("http://localhost:5000/data")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.length === 0) {
        list.innerHTML = "No Task to do Hurry!!";
      } else {
        createList(data);
      }
      console.log(data);
    });
}

function postData() {
  const input = document.getElementById("task");
  fetch("http://localhost:5000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: input.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getData();
      console.log(data);
    });
  return false;
}

function deleteData(id) {
  console.log(id);
  fetch("http://localhost:5000/data/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getData();
      console.log(data);
    });
}

getData();
