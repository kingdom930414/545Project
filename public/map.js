var map;
            var markers = [];
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            function setMapOnAll(map) {
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
              }
            }

            ///不要动
            var timeout = setInterval(reload, 5000);  
            
            function reload () {
              $(function() {
              var requestConfig = {
                  method: "GET",
                  url: "http://localhost:3000/mapdata",
                  };
                  $.ajax(requestConfig).then(function(result){
                    if(result!=null){
                      console.log(result);
                      let marker = new google.maps.Marker({
                        position: {lat: result.lat, lng: result.lng}
                      });
                      var j = 0;
                      for (let index = 0; index < markers.length; index++) {
                        if((result.lat != markers[index].getPosition().toJSON().lat) && (result.lng != markers[index].getPosition().toJSON().lng)){
                          j+=1;
                        }     
                      }
                      console.log(j);
                      if(j == markers.length){
                        markers.push(marker);
                        j = 0;
                      }
                      //markers.push(marker);
                      console.log(markers);
                  }
                  });
              });
              map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 40.744882, lng: -74.025343},
                zoom: 18
              });
              map.addListener('click', function(e) {
                var inf = prompt("Please enter the event here: ", "Meet me");
                placeMarkerAndPanTo(e.latLng, map, inf);
              });
              map.addListener('rightclick', function(e) {
                setMapOnAll(null);
                markers = [];
              });
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
              }
            }

            function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 40.744882, lng: -74.025343},
                zoom: 18
              });
              map.addListener('click', function(e) {
                var inf = prompt("Please enter the event here: ", "Meet me");
                placeMarkerAndPanTo(e.latLng, map, inf);
              });
              map.addListener('rightclick', function(e) {
                setMapOnAll(null);
                markers = [];
              });
            };
            ///不要动
      
            function placeMarkerAndPanTo(latLng, map, inf) {
              var marker2 = new google.maps.Marker({
                position: latLng,
                map: map,
                title: inf,
                icon: image,
                draggable: true,
              });
              markers.push(marker2);
              var cache = [];
              console.log(marker2.getPosition().toJSON().lat);
              $.ajax({
                type:"post",
                url: "http://localhost:3000/map",
                dataType: "json",
                data: JSON.stringify({
                  "lat": marker2.getPosition().toJSON().lat,
                  "lng": marker2.getPosition().toJSON().lng
                }),
                contentType:"application/json",
                success: function(data,textStatus, xhr){
                  if(!data.error){
                    alert("Edit successfully!");
                    location.reload(true);
                  // alert(xhr);
                  // if(xhr.status == 200){
                  //   alert("success");
                  //   location.reload(true);
                  }
                  else
                    alert("Server is busy! Try again later...")
                },
              });
              setMapOnAll(map);
            }