const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    const trimmedData = data.data.news_category.slice(0, 3);
    // console.log(trimmedData);
    trimmedData.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    });
};

const handleLoadNews = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    // console.log(data.data);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.data.forEach((news) => {
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact w-96 bg-base-100 shadow-xl">
           <figure><img src="${news.image_url}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${news.title.slice(0, 40)}
                    <div class="badge badge-secondary p-5">
                    ${news.rating.badge}
                    </div>
                </h2>
                <p>${news.title.slice(0, 50)}</p>
                <div class="card-footer flex justify-between mt-8">
                    <div class="flex gap-40">
                        <div >
                            <div class="avatar online">
                                <div class="w-14 rounded-full">
                                    <img src="${news.author.img}" alt="">

                                </div>
                            </div>
                            <div>
                                <h6>${news.author.name}</h6>
                                <small>2022-08-24 17:27:34</small>
                            </div>
                        </div>
                        <div class="card-detailed-btn">
                            <button onclick=handleModal('${news._id}') class="btn btn-primary">Details</button>
                        </div>
                        
                    </div>
                    

                </div>
                
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
}

const handleModal = async (newsID) => {
    // console.log(newsID);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsID}`)
    const data = await res.json();
    console.log(data);
    const singleNews = data.data[0]; 
    console.log(singleNews);

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML= '';
    const div=document.createElement('div');
    div.innerHTML=`

    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">${singleNews.title}</h3>
        <img src="${singleNews.image_url}" alt="Shoes" />
        <p class="py-4">${singleNews.details}e</p>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>`;

    modalContainer.appendChild(div);
    const modal = document.getElementById('my_modal_1');

    modal.showModal();

}

handleCategory();