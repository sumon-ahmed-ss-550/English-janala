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
    <button id="click-btn-${lesson.level_no}"  onclick = "loadLevelWord(${lesson.level_no})" type="submit" class="btn btn-outline btn-primary removeActive">
        <i class="fa-solid fa-book-open"></i>lesson-${lesson.level_no}
    </button>
    `;
    lessonContainer.appendChild(newElement);
  }
};

// {id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = fetch(url);
  res
    .then((res) => res.json())
    .then((res) => {
      displayData(res.data);
      const btn = document.getElementById(`click-btn-${id}`);
      btn.classList.add("active");
    });
  removeActiveStyle();
};

// remove active btn style
const removeActiveStyle = () => {
  const removeClass = document.querySelectorAll(".removeActive");
  removeClass.forEach((item) => {
    item.classList.remove("active");
  });
};

const displayData = (data) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (data.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-3 space-y-3 py-12">
          <img class="mx-auto" src="../assets/alert-error.png"/>
          <p class="hind-siliguri font-normal text-sm leading-6 text-[#79716B]">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2
            class="hind-siliguri font-medium text-4xl leading-10 text-[#292524]"
          >
            নেক্সট Lesson এ যান
          </h2>
    </div>
    `;
  }

  for (const item of data) {
    const newElement = document.createElement("div");
    newElement.innerHTML = `
    <div class="bg-white rounded-xl p-14 text-center space-y-6">
          <h2 class="font-bold text-[32px] leading-6">${item.word ? item.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-medium text-xl leading-6">
            Meaning /Pronounciation
          </p>
          <h2 class="hind-siliguri font-semibold text-2xl">
            ${item.meaning ? item.meaning : "অর্থ পাওয়া যায়নি"} / ${item.pronunciation ? item.pronunciation : "Pronunciation পাওয়া যায়নি"}
          </h2>
          <div class="flex justify-between items-center">
            <button onclick="fadeItemShow(${item.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
    </div>
    `;
    wordContainer.appendChild(newElement);
  }
};

const fadeItemShow = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  fadeItemShowDisplay(details.data);
};

const fadeItemShowDisplay = (detail) => {
  const fadeItem = document.getElementById("fade-show");
  fadeItem.innerHTML = `

  <div class="space-y-8 p-6">
      <div class="border border-[#EDF7FF] rounded p-6 ">
        <div>
          <h2 class="font-semibold text-4xl leading-10">
            ${detail.word}(<i class="fa-solid fa-microphone-lines"></i>:${detail.pronunciation})
          </h2>
        </div>
        <div>
          <h2 class="font-semibold text-2xl leading-10">Meaning</h2>
          <p class="font-medium text-2xl leading-10">${detail.meaning}</p>
        </div>
        <div>
          <h2 class="font-semibold text-2xl leading-10">Example</h2>
          <p class="font-medium text-2xl leading-10">
            ${detail.sentence}
          </p>
        </div>
        <div class="mb-6">
          <h2 class="font-medium text-2xl leading-10 mb-5">
            সমার্থক শব্দ গুলো
          </h2>
          <div class="sm:flex gap-4">
            <span class="bg-[#EDF7FF] mb-4 sm:mb-0 block outline-[#D7E4EF] p-5 rounded-md"
              >${detail.synonyms[0]}</span
            >
            <span class="bg-[#EDF7FF] mb-4 sm:mb-0 block outline-[#D7E4EF] p-5 rounded-md"
              >${detail.synonyms[1]}</span
            >
            <span class="bg-[#EDF7FF] mb-4 sm:mb-0 block outline-[#D7E4EF] p-5 rounded-md"
              >${detail.synonyms[2]}</span
            >
          </div>
        </div>
      </div>
    </div>

  `;
  document.getElementById("my_modal_5").showModal();
};
