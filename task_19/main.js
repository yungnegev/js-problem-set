// 19) ВК Апи

const API_KEY = 'cab86f8bcab86f8bcab86f8b93c9adc08cccab8cab86f8bafb1dbbbfdb1c10f46cfcad4'
let PAGE_COUNT = 1; 

// функция для создания url
const createUrl = (count = 10, offset = 0, key, callback) => {
    return `https://api.vk.com/method/wall.get?owner_id=-1&count=${count}&v=5.154&offset=${offset}1&access_token=${key}&callback=${callback}`
}

// функция для первой загрузки, она создает скрипт и вставляет его в head
// в скрипте уже вызывается функция firstLoadCallback с результатом запроса
// в этом суть JSONP
function firstLoad() {   
    const script = document.createElement('SCRIPT');
    script.src = createUrl(10, 0, API_KEY, 'firstLoadCallback');
    document.querySelector("head").appendChild(script);
}

function firstLoadCallback(result) {
    const items = result.response.items;
    addPostsToLocalStorage(items);
    createMarkup();
    handleItems(items);
    setObserver();
}

// я подгружаю посты порционно по 10 штук, в каждом запросе я увеличиваю offset на 1
// я сохраняю это значение в localStorage
function updatePageCount() {
    PAGE_COUNT++;
    localStorage.setItem('PAGE_COUNT', PAGE_COUNT);
}

// просто разметка
// тут я создаю компонент который при поподании в область видимости подгружает еще посты (это самый простой вариант infinite scroll)
function createMarkup () {
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    container.appendChild(postContainer);
    const posts = document.createElement('div');
    posts.classList.add('posts');
    postContainer.appendChild(posts);
    const loadMore = document.createElement('div');
    loadMore.classList.add('load-more');
    loadMore.innerHTML = 'Loading...';
    postContainer.appendChild(loadMore);
}

// функция для обработки постов
// беру текст и дату из каждого поста и вставляю в разметку
function handleItems(items) {   
    const posts = document.querySelector('.posts'); 
    items.forEach((item, index) => {
        const post = document.createElement('div');
        post.classList.add('post');
        posts.appendChild(post);

        const ruDate = new Date(
            item.date * 1000
        ).toLocaleString('ru', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        post.innerHTML = `<span class="date">${ruDate}</span> ${item.text}` // тут можно сделать любую разметку
    })
}


// функция для подгрузки постов
// подгружаю по 10 штук, в каждом запросе я увеличиваю offset на 1
function loadMore () {
    const script = document.createElement('SCRIPT');
    script.src = createUrl(10, PAGE_COUNT, API_KEY, 'loadMoreCallback');
    document.querySelector("head").appendChild(script);
    updatePageCount();
}

// добовляю посты в localStorage
// обрабатываю посты и вставляю в разметку
function loadMoreCallback(result) {
    const items = result.response.items;
    addPostsToLocalStorage(items);
    handleItems(items);
}

// функция для наблюдения за элементом
// когда элемент попадает в область видимости, то вызывается функция loadMore
function setObserver(){
    const loadMoreDiv = document.querySelector('.load-more');
    const options = {
        root: null,
        threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMore();
            }
        });
    }, options);

    observer.observe(loadMoreDiv);
}

// функции для работы с localStorage
// если там есть посты, то через spread operator я добавляю новые посты
// если нет постов, то просто сохраняю их
// я наверное не до конца понял последнее требование задания так как если я буду удалять ранее загруженные посты,
// то при перезагрузке страницы мне придется загружать их заново
// в данном случае при переполнении localStorage я просто удаляю его и PAGE_COUNT
function addPostsToLocalStorage(posts) {
    try {
        if (localStorage.getItem('stored_posts')) {
            const storedPosts = JSON.parse(localStorage.getItem('stored_posts'));
            const newPosts = [...storedPosts, ...posts];
            localStorage.setItem('stored_posts', JSON.stringify(newPosts));
        } else {
            localStorage.setItem('stored_posts', JSON.stringify(posts));
        }
    } catch (e) {
        console.log(e);
        localStorage.removeItem('stored_posts');
        localStorage.removeItem('PAGE_COUNT');
        alert('Local Storage is full.');
    }
}

// функция для получения постов из localStorage
// если постов нет, то возвращаю пустой массив
function getPostsFromLocalStorage() {
    try {
        const posts = JSON.parse(localStorage.getItem('stored_posts'));
        return posts ? posts : [];
    } catch (e) {
        console.log(e);
    }
}

// функция для получения первого поста
// я сохраняю его в sessionStorage
// первый пост нужен для того, чтобы определить, изменился ли он и нужно ли грузить новые посты
function fetchFirstPost () {
    const script = document.createElement('SCRIPT');
    script.src = createUrl(1, 0, API_KEY, 'fetchFirstPostCallback');
    document.querySelector("head").appendChild(script);
}

function fetchFirstPostCallback(result) {
    const items = result.response.items;
    if (items && items.length > 0) {
        const firstPost = items[0];
        sessionStorage.setItem('first_post_from_server', JSON.stringify(firstPost));
    }
}


// функция для инициализации
// сначала я проверяю пейдж каунт, если он есть, то я его сохраняю
// далее мне нужно дождаться первого поста, чтобы определить, нужно ли мне грузить новые посты
// для этого я использую callback и setInterval
// когда первый пост получен, я его сравниваю с первым постом из localStorage и если они совпадают, то я обрабатываю посты из localStorage
const init = () => {
  PAGE_COUNT = parseInt(localStorage.getItem('PAGE_COUNT')) || 1;

  const handleFirstPost = () => {
    const firstPostFromServer = JSON.parse(
      sessionStorage.getItem('first_post_from_server')
    );
    const postsFromLocalStorage = getPostsFromLocalStorage();

    if (
      postsFromLocalStorage.length > 0 &&
      firstPostFromServer &&
      firstPostFromServer.id === postsFromLocalStorage[0].id
    ) {
      createMarkup();
      handleItems(postsFromLocalStorage);
      setObserver();
    } else {
      localStorage.removeItem('stored_posts');
      localStorage.removeItem('PAGE_COUNT');
      firstLoad();
    }
  };

  // функция для получения первого поста с помощью callback и setInterval
  const fetchFirstPostWithCallback = () => {
    fetchFirstPost();
    const checkInterval = setInterval(() => {
      const firstPostFromServer = JSON.parse(
        sessionStorage.getItem('first_post_from_server')
      );
      if (firstPostFromServer) {
        clearInterval(checkInterval);
        handleFirstPost();
      }
    }, 100); // время делея для получения первого поста
  };

  // запускаю функцию
  fetchFirstPostWithCallback();
};


document.addEventListener('DOMContentLoaded', init);


