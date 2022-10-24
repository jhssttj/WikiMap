// Client facing scripts here
$(() => {
  const id = $('#identifier').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/maps/${id}`
  })
  .then((response) => {
    const map = response.map;
    const $mapDetails = $('#map-details');
    $mapDetails.empty();
    $(`<h1 class="title">`).text(map.title).appendTo($mapDetails);
    $(`<p class="name">`).text('By: ' + map.name).appendTo($mapDetails);
    $(`<p class="created_date">`).text('Created: ' + map.created_date).appendTo($mapDetails);
    $(`<p class="description">`).text('Description: ' + map.description).appendTo($mapDetails);
    // Google Maps render code
    let gMap = google.maps.Map;
    const mapOptions = {
      zoom: map.zoom,
      center: { lat: map.lat, lng: map.lng },
    };
    gMap = new google.maps.Map(
      document.getElementById('google-map'),
      mapOptions,
    );
  });

  //Favourite status of map
  const userId = $('#favourite').attr('value');
  $.ajax({
    method: 'GET',
    url: `/api/favourites/${userId}`
  })
  .done((response) => {
    for (const favourite of response.favourite) {
      if (favourite.id === id ) {
        $('.fa-star').addClass('iconStarActive')
      }
    }
  })

  const favouriteId = $('.fa-star').attr('value');
  $('.fa-star').click(() => {
    //Unfavourite a map
    if ($('.fa-star').hasClass('iconStarActive')) {
      $('.fa-star').removeClass('iconStarActive');
      $('.fa-star').addClass('iconStarInactive');
    } else {
      //Favourite a map
      $('.fa-star').removeClass('iconStarInactive');
      $('.fa-star').addClass("iconStarActive");
    }
  })
});


