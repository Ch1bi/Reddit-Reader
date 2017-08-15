// where the content will go
    var start = document.getElementById('feed')

    start.addEventListener("mouseover", hover)

    // subReddit route
    var foodRoute = document.getElementById('subReddit').addEventListener('click', changeRoutes, false)

    // favorite route
    var favRoute = document.getElementById('favorites').addEventListener('click', changeRoutes, false)

    // fav div
    var favDiv = document.getElementById('favorites-list')

    // favs number
    var favNum = document.getElementById('number')

    //variable for hearts on page
    var hearts

    //variable for hovered item on page
    var hovered
    


        // 1. initial page setup

       // give subReddit the class clicked
      document.getElementById('subReddit').classList.add('clicked')
      document.getElementById('favorites').classList.add('unClicked')

      $.ajax({
        
            url: 'https://www.reddit.com/r/food/top/.json',
            type: 'GET',
        
            success: function (data) {
             
              data.data.children.forEach(function (val, idx) {
                var json = data.data.children[idx].data
                var images = json.url
                var title = json.title
                var person = json.author
                var upvotes = json.ups

                var content = document.createElement('div')
                content.id = 'container'
                start.appendChild(content)

                var imgContainer = document.createElement('div')
                imgContainer.className = 'image'
                imgContainer.innerHTML = '<i class="fa fa-heart like" aria-hidden="true"></i>'
                content.appendChild(imgContainer)
                var singleImg = document.createElement('img')
                singleImg.className = "picImg"
                singleImg.src = images
                imgContainer.appendChild(singleImg)

                var titleContent = document.createElement('p')
                titleContent.id = 'heading'
                
                content.appendChild(titleContent)
                var textContent = document.createElement('p')
                titleContent.appendChild(textContent)
                textContent.innerHTML = title

                var info = document.createElement('div')
                info.id = 'pic-info'
                content.appendChild(info)

                var creditList = document.createElement('ul')
                info.appendChild(creditList)

                var creditItem = document.createElement('li')
                creditItem.id = 'creator'

                var likeItem = document.createElement('li')
                likeItem.id = 'likes'

                creditList.appendChild(creditItem)
                creditList.appendChild(likeItem)

                var personNode = document.createTextNode(person + '•')
                var likeNode = document.createTextNode(upvotes)

                creditItem.appendChild(personNode)
                likeItem.appendChild(likeNode)

              })

              manipulate()
            },
        
            error: function () {
             
              console.log("nopers!")
            }
        
        })
  


        // function that changes color of routes when clicked on
    function changeRoutes (e) {
      console.log(e)

      switch (e.target.id) {
        case 'subReddit':

          if (!subReddit.classList.contains('clicked')) {
            favorites.classList.remove('clicked')
            favorites.classList.add('unClicked')

            subReddit.classList.remove('unClicked')
            subReddit.classList.add('clicked')

            start.style.display = 'initial'
            favDiv.style.display = 'none'
            console.log(favDiv)
          }

          break

        case 'favorites':

          if (!favorites.classList.contains('clicked')) {
            subReddit.classList.remove('clicked')
            subReddit.classList.add('unClicked')

            favorites.classList.remove('unClicked')
            favorites.classList.add('clicked')

            start.style.display = 'none'
            favDiv.style.display = 'initial'
            showFavs()
          }

          break
      }
    }

    function picLike(e){

    console.log(e)
    //get index of the heart icon
    var idx = Array.from(hearts).indexOf(e.target)
    
   
    }

    function hover (e) {

        //get index of the hovered item - e.target starts with one but array is 0 based so i added +1 so array isn't undefined
    var idx = Array.from(hovered).indexOf(e.target) + 1
    hearts[idx].style.visibility="visible"
    
    }

    function showFavs () {
            // show no favorites alert box if no favorites
      if (favNum.textContent == 0) {
        console.log('I am nothing')
      }
            //  favNum.textContent++;
    }

    function moveOut(e){

      var idx = Array.from(hovered).indexOf(e.target) + 1
      hearts[idx].style.visibility="hidden"

    }
    //get the class names and adds eventlisteners
    function manipulate(){

      hovered = document.querySelectorAll('.picImg')
      hearts = document.querySelectorAll(".fa-heart")

      
      for(var i = 0; i < hearts.length; i++){

        hearts[i].addEventListener("click", picLike)
        hearts[i].style.visibility = "hidden"
      }

      for(var i = 0; i < hovered.length; i++){

        hovered[i].addEventListener("mouseover", hover)
        hovered[i].addEventListener("mouseout",moveOut )
      }
      
    }
