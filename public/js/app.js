$(function(){

  $(".app").click(getApps);
  $(".boards").click(getBoards);
  $(".random").click(getRandom);

  getRandom();

});

// Article Information
// gets article creation date
function getCreated(created){
  return moment.duration(moment.unix(created)).humanize();
}
// gets the get_the_app api 
function getApps(){
  $.get("/api/get_the_app.json", function(data){
    getArticles(data);
  });
}
// gets the my_boards api
function getBoards(){
  $.get("/api/my_boards.json",function(data){
    getArticles(data);
  });
}
function getRandom(){
  $.get("/api/random.json",function(data){
    getArticles(data);
  });
}
// renders new articles
function getArticles(data){
  var articles = data.data.children;
  $.each(articles, function (index, article){
    var newArticle = {
      url : article.data.url,
      title : article.data.title,
      author : article.data.author,
      views : article.data.score,
      age : getCreated(article.data.created) + " ago"
    };
    renderBox(newArticle);
  });
}
// 
function renderBox(article_data){
  $(".demo").remove();
  // creates outermost container element
  var box = $("<article>", {
    "class" : "panels"
  });
  // creates img div
  var image = $("<div>", {
    "class" : "img"
  });
  // adds background image to image element
  image.css("background-image", "url("+ article_data.url + ")");

  // creates h2 with title
  var title = $("<h2>", {
    html : article_data.title
  });
  // creates p with meta 
  var metatag = $("<p>", {
    "class" : "meta"
  });
  // creates span with author
  var author = $("<span>", {
    "class" : "author",
    html : article_data.author
  });
  // creates span with view count
  var count = $("<span>", {
    "class" : "views",
    html : article_data.views
  });
  // creates span with created date
  var date = $("<span>", {
    "class" : "date",
    html : article_data.age
  });

  var meta = metatag.append([author, date, count]);
  var desc = $("<p>", {
    "class" : "excerpt",
    html : "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia?"
  });

  box.append([image, title, meta, desc]);
  box.appendTo(".container");
}