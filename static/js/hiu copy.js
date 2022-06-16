  d3.json("http://192.168.1.121:8000/avocado/volume").then(function(volume_data, err) {
    if (err) throw err;
  
    volume_data.forEach(function(data){
		console.log(data)

	}
	)
})