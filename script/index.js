const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //return promise of response
    .then((res)=>res.json()) //promise of json data
    .then((json)=>displayLesson(json.data)); //property named in data
}
const loadLevelWord=(id)=>{
    
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayLevelWord(data.data))
}
const displayLevelWord=(words)=>{
    const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML="";
    
    if(words.length == 0){
        wordContainer.innerHTML=`
        <div class="text-center col-span-full rounded-xl space-y-6 py-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return
    }
    // "id": 4,
    // "level": 5,
    // "word": "Diligent",
    // "meaning": "পরিশ্রমী",
    // "pronunciation": "ডিলিজেন্ট"

    words.forEach((word) => {
        const card=document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word? word.word:"শব্দ খুঁজে পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning? word.meaning:"অর্থ খুঁজে পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation:"উচ্চারণ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-circle-info hover:bg-blue-300"></i></button>
                <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.appendChild(card)
    });
}
const displayLesson=(lessons)=>{
    //1.get the container and empty.
    const levelContainer=document.getElementById("level-container")
    levelContainer.innerHTML="";
    //2.get into every lessons
    for(const lesson of lessons){
        //3.create Element
        console.log(lesson)
        const btnDiv=document.createElement("div")
        btnDiv.innerHTML=`
                <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        `
        //4.append into container
        levelContainer.appendChild(btnDiv)
    }
    
}
loadLessons();