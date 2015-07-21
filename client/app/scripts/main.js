'use strict';
$(document).ready(function(){
	$('#tabla').DataTable({
		"info":false,
		"paging":false,
		//"pagingType":"simple"
	});



	//show addModal
	$('#add').click(function(e){
		e.preventDefault();
		document.getElementById('addForm').reset();
		$('#modalAdd').modal('show');
	});

	//show addModal
	$('#edit').click(function(e){
		e.preventDefault();
		document.getElementById('editForm').reset();
		$('#modalEdit').modal('show');
	});

	//show modalDelete
	$('#delete').click(function(e){
		e.preventDefault();
		document.getElementById('editForm').reset();
		$('#modalDelete').modal('show');
	});
});