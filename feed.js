

// where the content will go
    var start = document.getElementById('feed')

    start.addEventListener('mouseover', hover)

    // subReddit route
    var foodRoute = document.getElementById('subReddit').addEventListener('click', changeRoutes, false)

    // favorite route
    var favRoute = document.getElementById('favorites').addEventListener('click', changeRoutes, false)

    // fav div
    var favDiv = document.getElementById('favorites-list')
    
    var nonFav = document.getElementById("fav-msg")

    // favs number
    var favNum = document.getElementById('number')

    // variable for hearts on page
    var hearts

    // variable for hovered item on page
    var hovered

        // 1. initial page setup

       // give subReddit the class clicked
    document.getElementById('subReddit').classList.add('clicked')
    document.getElementById('favorites').classList.add('unClicked')

    $.ajax({

      url: 'https://www.reddit.com/r/food/top/.json',
      type: 'GET',

      success: function (data) {

        //gets num of favs
        favNum.textContent = getNumOfFavs()

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
          singleImg.className = 'picImg'
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
        console.log('nopers!')
      }

    })

        // function that changes color of routes when clicked on
    function changeRoutes (e) {

      switch (e.target.id) {
        case 'subReddit':

          if (!subReddit.classList.contains('clicked')) {
            favorites.classList.remove('clicked')
            favorites.classList.add('unClicked')

            subReddit.classList.remove('unClicked')
            subReddit.classList.add('clicked')

            start.style.display = 'initial'
            favDiv.style.display = 'none'
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

    function picLike (e) {
     // when heart is clicked, favorite this item
    // get all info - name and likes of person

    // get index of the heart icon
      var idx = Array.from(hearts).indexOf(e.target)
      favNum.textContent++


      var currentImg = e.target.nextSibling.currentSrc
      var currentTitle = e.target.parentNode.nextSibling.childNodes[0].childNodes[0].data

      var currentPerson = e.target.parentElement.nextElementSibling.nextElementSibling.childNodes[0].childNodes[0].childNodes[0].data

      var currentLikes = Number(e.target.parentElement.nextElementSibling.nextElementSibling.childNodes[0].childNodes[1].childNodes[0].data)



      var obj = {

        img: currentImg,
        title: currentTitle,
        creator: currentPerson,
        likes: currentLikes

      }

      // get entries before pushing
      var allFavs = JSON.parse(localStorage.getItem("favorites"))
      
      if(allFavs == null){ //if allFavs doesn't exist then it equals an array

        allFavs = []

      }

         //save all entries to local storage
        allFavs.push(obj)
        localStorage.setItem("favorites", JSON.stringify(allFavs))
        
        console.log(JSON.parse(localStorage.getItem("favorites")))
    }



    function hover (e) {
        // get index of the hovered item
      var idx = Array.from(hovered).indexOf(e.target) + 1
      hearts[idx].style.visibility = 'visible'
    }

    function getNumOfFavs(){

      return JSON.parse(localStorage.getItem("favorites"))  ?

      JSON.parse(localStorage.getItem("favorites")).length : 0

             
  
    }

    function showFavs () {
    

       // show no favorites alert box if no favorites in local storage
       if (JSON.parse(localStorage.getItem("favorites")).length > 0) {
        
        nonFav.style.display="none"
  
       }

       //clear div first
       favDiv.innerHTML = ""
          
      //load local storage favs
      JSON.parse(localStorage.getItem("favorites")).forEach(function(val){

        console.log(val)

        var content = document.createElement('div')
        content.id = 'container'
        favDiv.appendChild(content)

        var imgContainer = document.createElement('div')
        imgContainer.className = 'image'
        content.appendChild(imgContainer)
        var singleImg = document.createElement('img')
        singleImg.className = 'picImg'
        singleImg.src = val.img
        imgContainer.appendChild(singleImg)

        var titleContent = document.createElement('p')
        titleContent.id = 'heading'

        content.appendChild(titleContent)
        var textContent = document.createElement('p')
        titleContent.appendChild(textContent)
        textContent.innerHTML = val.title

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

        var personNode = document.createTextNode(val.creator + '•')
        var likeNode = document.createTextNode(val.likes)

        creditItem.appendChild(personNode)
        likeItem.appendChild(likeNode)

      })

    }

    function moveOut (e) {
      var idx = Array.from(hovered).indexOf(e.target) + 1

      window.setTimeout(function () {
        hearts[idx].style.visibility = 'hidden'
      }, 2000)
    }


    // get the class names and adds eventlisteners
    function manipulate () {
      hovered = document.querySelectorAll('.picImg')
      hearts = document.querySelectorAll('.fa-heart')

      for (var i = 0; i < hearts.length; i++) {
        hearts[i].addEventListener('click', picLike)
        hearts[i].style.visibility = 'hidden'
      }

      for (var i = 0; i < hovered.length; i++) {
        hovered[i].addEventListener('mouseover', hover)
        hovered[i].addEventListener('mouseout', moveOut)
      }
    }
