function getData (url, functionName, id=false){
    fetch(url).then(res => res.json()).then(levels => functionName(levels.data, id)).catch(errors => console.log(errors))
}
const displayLevels = levels => {
    const level_container = document.querySelector('.level_container')
    levels.forEach(level => {
    
        const newLevel = document.createElement('div')
        newLevel.innerHTML = `<button id="lever_${level.level_no}" onclick="getData('https://openapi.programming-hero.com/api/level/${level.level_no}', displayData, ${level.level_no})" class="levels btn btn-outline btn-primary">Lessons - ${level.level_no}</button>`
        level_container.append(newLevel)


 });
}



const displayData = (datas, id) => {
    const data_container = document.querySelector('.data_container')
    data_container.innerHTML = ''

    const levelId = document.getElementById(`lever_${id}`)
    
    const levelClasss = document.getElementsByClassName('levels')
    for (let levelClass of levelClasss){
        levelClass.removeAttribute('style')
    }
    levelId.style.backgroundColor = '#422AD5'
    levelId.style.color = 'white'


    if (datas.length == 0){

        data_container.innerHTML = `
        <div class="col-span-full">
            <p class="bangla_font font-normal text-sm text-[#79716B] text-center mb-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="bangla_font font-medium text-4xl text-[#292524] text-center">নেক্সট Lesson এ যান</p>
        </div>
        `

        return

    }
    datas.forEach(data => {

        const newData = document.createElement('div')
        // {
        //     "id": 5,
        //     "level": 1,
        //     "word": "Eager",
        //     "meaning": "আগ্রহী",
        //     "pronunciation": "ইগার"
        //     },
        newData.innerHTML = `
        <div class="card bg-white">
            <div class="card-body items-center text-center">
              <h2 class="card-title">${data.word ? data.word : 'পাওযায়নি' }</h2>
              <p>Meaning /Pronounciation</p>
              <h2 class="card-title bangla_font">"${data.meaning ? data.meaning : 'পাওযায়নি' } / ${data.pronunciation ? data.pronunciation : 'পাওযায়নি' }"!</h2>
              <div class="card-actions flex justify-between">
                <button class="btn bg-[#1A91FF10]" id='btnInfo' onclick="dataInfo(${data.id})"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick='pronounceWord("${data.word}")' class="btn bg-[#1A91FF10] "><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
          </div>

          </div>
        
        `
        data_container.appendChild(newData)
    })
}





const dataInfo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(resp => resp.json()).then(info => displayInfo(info.data))
}

const displayInfo = infos => {
    document.getElementById('my_modal_3').showModal()

    //     "word": "Eager",
    //     "meaning": "আগ্রহী",
    //     "pronunciation": "ইগার",
    //     "level": 1,
    //     "sentence": "The kids were eager to open their gifts.",
    //     "points": 1,
    //     "partsOfSpeech": "adjective",
    //     "synonyms": [
    //     "enthusiastic",
    //     "excited",
    //     "keen"
    //     ], 

    const info_container = document.querySelector('.info_container')
    info_container.innerHTML=`
        <h1 class="text-2xl font-bold">${infos.word ? infos.word : 'পাওযায়নি'} (     :${infos.pronunciation ? infos.pronunciation : 'পাওযায়নি'})</h1>
        <h3 class="text-lg font-bold pt-4">Meaning</h3>
        <p class="py-4">${infos.meaning ? infos.meaning : 'পাওযায়নি'}</p>
        <h3 class="text-lg font-bold pt-4">Example</h3>
        <p class="py-4">${infos.sentence ? infos.sentence : 'পাওযায়নি'}</p>
        <h3 class="text-lg font-bold pt-4">সমার্থক শব্দ গুলো</h3>
        <div class='flex gap-4 mt-4'>
            ${infos.synonyms.map(synonyms => `<button class="btn bg-[#1A91FF10]">${synonyms}</button>`).join('')}
        </div>
    `
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
  }



getData('https://openapi.programming-hero.com/api/levels/all', displayLevels)
