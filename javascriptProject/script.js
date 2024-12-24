const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiUrl = `http://localhost:3000/news`;
        console.log(`Fetching news from: ${apiUrl}`);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Fetched articles:", data.articles);
        return data.articles;
    }catch(error){
        console.error("Error fetching news", error);
        return [];
    }
}
searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim();
    if(query!==""){
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.error("Error searching news", error);
            return;
        }
    }
});
async function fetchNewsQuery(query) {
    try {
        // Envoyer la requête avec le paramètre "q"
        const apiUrl = `http://localhost:3000/news?q=${encodeURIComponent(query)}`;
        console.log(`Fetching news from: ${apiUrl}`);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Fetched articles:", data.articles);
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}


function displayBlogs(articles){
    blogContainer.innerHTML = "";
    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles found.</p>";
        return;
    }
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage || "placeholder.jpg";
        img.alt = article.title || "No title available";
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : + article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        description.textContent = article.description;
        // const truncatedDescription = article.description.length > 100 ? article.description.slice(0, 100) + "..." : article.description;
        // description.textContent = truncatedDescription ;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async ()=> {
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching news", error);
    }
})();
