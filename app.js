$(document).ready(function() {
  let Characters = [];
  $("#btnSearch").on("click", function(){
    var ID = $('#idInput').val();
    if(ID < 50) {
      $('#container').css('background-color', 'green');
    }else if(ID > 50 && ID < 80) {
      $('#container').css('background-color', 'blue');
    }else if(ID > 80 ) {
      $('#container').css('background-color', 'red');
    }
    getData(ID);
  });

  async function getData(id) {
    const apiUrl = `https://rickandmortyapi.com/api/location/${id}`;

    try {
      const resp = await fetch(apiUrl);
      const data = await resp.json();
      var character = data.residents.slice(0, 5);
      Characters = []; 
      if(character.length>0){
        for (var i = 0; i < character.length; i++) {
          const characterData = await getCharacters(character[i]);
          if (characterData) {
            Characters.push(characterData);
          }
        }
        console.log('characterApi:', Characters);
        viewData(Characters);
        $('#idInput').val('');
      }else{
        $('#viewData').empty();
        html = `<h1>no hay personajes por aqui :v</h1>`;
        $('#viewData').append(html);

      }
      
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  async function getCharacters(URL) {
    try{
      const resp = await fetch(URL);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  function viewData(Characters) {
    $('#viewData').empty();
    var html = '';
    var modal = '';
    for (var i = 0; i < Characters.length; i++) {
      html += `<div class="card m-1" style="width: 18rem;">` +
        `<img src="${Characters[i].image}" class="card-img-top" id=clickimage alt="image" data-bs-toggle="modal" data-bs-target="#exampleModal" data-name="${Characters[i].name}" data-species="${Characters[i].species}">` +
        `<div class="card-body">` +
        ` <h5 class="card-title" id="title-card-1">${Characters[i].name}</h5>` +
        ` </div>` +
        `<ul class="list-group list-group-flush">` +
        `<li class="list-group-item">${Characters[i].status}</li>` +
        `<li class="list-group-item">${Characters[i].species}</li>` +
        `<li class="list-group-item">${Characters[i].origin.name}</li>` +
        `</ul>` +
        `<div class="card-body">`;
        var limit = Characters[i].episode.length > 3 ? 3 : Characters[i].episode.length;
        for(var j =0 ; j < limit  ; j++){
          html += 
        `<a href="${Characters[i].episode[j]}" class="card-link">${Characters[i].episode[j]}</a> <br>`;
        }
       html +=
       `</div>` +
       `</div>`;
       $(document).on('click', '#clickimage', function() {
        var personName = $(this).data('name');
        var personSpecies = $(this).data('species');
  
        $('#personName').text(personName);
        $('#personSpecies').text(personSpecies);
      });
    }
    
    $('#viewData').append(html);

  }
});