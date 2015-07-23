'use strict';
$(document).ready(function(){
	var datatable=$('#tabla').DataTable({
		"info":false,
		"paging":false,
		"processing":true,
		"serverSide":false,
		//"ajax":"scripts/jsonRadio.txt",
		"ajax":"http://localhost:3000/radios",
		"columns":[
			{"data":"name"},
			{
				"data":"source",
				"render":function(data){
					return '<a href="'+data+'" target="_blank" role="button" class="btn btn-warning">Play</a>';
				}
			},
			{
				"data":"source",
				"render":function(data){
					return '<button type="button" class="btn btn-info" id="editBtn">Edit</button><button type="button" class="btn btn-info" id="deleteBtn">Delete</button>';
				}
			}
		]
	});



	//show addModal
	$('#addBtn').on("click",function(e){
		e.preventDefault();
		document.getElementById('addForm').reset();
		$('#modalAdd').modal('show');
	});

	//show editModal
	$('#tabla').on("click",'#editBtn',function(e){
		e.preventDefault();

		var tr=$(this).parents('tr');
		var row=datatable.row(tr).data();
		var name=row.name;
		var url=row.source;
		document.getElementById('editForm').reset();
		$('#modalEdit').modal('show');
		$('#editName').val(name);
		$('#editUrl').val(url);
	});

	//show modalDelete
	$('#tabla').on("click",'#deleteBtn',function(e){
		e.preventDefault();
		
		$('#modalDelete').modal('show');

	});
});