'use strict';
$(document).ready(function(){
	var datatable=$('#tabla').DataTable({
		"info":false,
		"paging":false,
		"processing":true,
		"serverSide":false,
		"columnDefs":[{
			"targets":[1,2],
			"orderable":false,
			"searchable":false
		}],
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
				"data":"id",
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
		var id=row.id;
		var name=row.name;
		var url=row.source;
		document.getElementById('editForm').reset();
		$('#modalEdit').modal('show');
		$('#editName').val(name);
		$('#editUrl').val(url);
		$('#modalEdit').on('click','#addSubmit',function(){
			console.log('promise');
			var editName=$('#editName').val();
			var editSource=$('#editUrl').val();
			var promise=$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'culo',
				data:{
					id:id,
					name:editName,
					source:editSource
				}
			});
			promise.done(function(){
  					$.growl.notice({ message: "The station has been edited!" });
  					console.log('promiseDone');
				});
			promise.fail(function(){
					$.growl.error({ message: "The station has not been edited." });
					console.log('promiseFail');
				});
			promise.always(function(){
					datatable.draw();
				});
		});
	});

	//show modalDelete
	$('#tabla').on("click",'#deleteBtn',function(e){
		e.preventDefault();
		
		$('#modalDelete').modal('show');
		var tr=$(this).parents('tr');
		var row=datatable.row(tr).data();
		var idDelete=row.id;
		var nameDelete=row.name;

		
	});
});
