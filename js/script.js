const makeRequest = async (url, config) => {
  const res = await fetch(url, config);
  if (!res.ok) {
    const message = `${res.status}`;
    throw new Error(message);
  } else {
    return res.json();
  }
};

const getData = () => {
  makeRequest("https://openapi.programming-hero.com/api/levels/all", {
    method: "GET",
  })
    .then((res) => displayItem(res.data))
    .catch((err) => console.log(err));
};
getData();

const displayItem = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  for (const lesson of lessons) {
    const newElement = document.createElement("div");
    newElement.innerHTML = `
    <button type="submit" class="btn btn-outline btn-primary">
        lesson-${lesson.level_no}
    </button>
    `;
    lessonContainer.appendChild(newElement);
  }
};
