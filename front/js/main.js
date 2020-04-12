$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();

	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;
			});
		} else{
			checkbox.each(function(){
				this.checked = false;
			});
		}
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
	$("#peliculas").click(function(){
		$('#main').load("form-movie.html");
		getMovies();
	});
	$("#reservas").click(function(){
		$('#main').load("list-movie.html");
		getReserves();
	});
});


// function reserveModal(id) {
// 	$("#pelicula").val(id)
// 	$('#addReserveModal').modal({
// 			 show: true
// 	 });
// }


function saveMovie(){

	var info = {
		titulo: $("#titulo").val(),
		sinopsis: $("#sinopsis").val(),
		url: $("#url").val(),
		fecha_inicio: $("#fecha-inicio").val(),
		fecha_fin: $("#fecha-fin").val()
	}

	$.ajax({
		url:"http://localhost:3000/api/v1/movies",
		method:"POST",
		data:JSON.stringify(info),
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
			$('#form-movie')[0].reset();
			$("#addMovieModal").modal("toggle");
		}
	})
	event.preventDefault();
}

function getMovies() {

	$.ajax({
		url: "http://localhost:3000/api/v1/movies",
		method: "GET",
		dataType: "json",
		success: function (data) {

			for (let i = 0; i < data.data.length; i++) {
				const element = data.data[i];
				var html = '<div class="col-md-4" >';
				html += '<div class="card">';
				html += '<button id="b'+ element.id +'" data-toggle="modal" data-trigger="hover" data-target="#addReserveModal">'
				// html += '<a href="#" id="h1" data-toggle="modal" data-trigger="hover" data-target="#addReserveModal">';
				html += '<img src="'+ element.url +'" class="card-img-top" alt="Card image cap"></button>';
				html += '<input type="hidden" id="pelicula" name="pelicula" value="'+ element.id +'">';
				html +=	'</div>';
				html +=	'</div>';
				$('#list-movie').prepend(html);
				var js = '<script type="text/javascript">';
				js += '$("#b'+ element.id +'").hover(function () {';
				js += '$("#pelicula").val('+ element.id +');';
				js += '$("#addReserveModal").modal({show: true})';
				js += '});</script>';
				$('#list-movie').prepend(js);
			}

		}
	});
}

function getReserves() {

	$.ajax({
		url: "http://localhost:3000/api/v1/reserves",
		method: "GET",
		dataType: "json",
		success: function (data) {

			for (let i = 0; i < data.data.length; i++) {
				const element = data.data[i];
				var html = '<tr>';
				html += '<td>' + element.titulo + '</td>';
				html += '<td>' + element.nombre + '</td>';
				html += '<td>' + element.correo + '</td>';
				html += '<td>' + element.cedula + '</td>';
				html += '<td>' + element.celular + '</td>';
				html += '</tr>';
				$('#table_data').prepend(html);
			}
		}
	});
}

function saveReserve(){
	var info =  {
		nombre: $("#nombre").val(),
		cedula: $("#cedula").val(),
		celular: $("#celular").val(),
		correo: $("#correo").val(),
		movie_id: $("#pelicula").val()
	}
console.log(info)
	$.ajax({
		url:"http://localhost:3000/api/v1/reserves",
		method:"POST",
		data:JSON.stringify(info),
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
			$('#form-reserve')[0].reset();
			$("#addReserveModal").modal("toggle");
		}
	});
	event.preventDefault();
}
