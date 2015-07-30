'use strict';

$(document).ready(function(){
	var datatable=$('#tabla').DataTable({
		"info":false,
		"paging":false,
		"processing":true,
		"serverSide":false,
		"responsive":true,
		"columnDefs":[{
			"targets":[1,2],
			"orderable":false,
			"searchable":false,
			"width": "30%",
			"className":"center"
		}],
		"ajax": "/radios",
		"columns":[
			{"data":"name"},
			{
				"data":"source",
				"render":function(data){
					return '<a href="'+data+'" target="_blank" role="button" class="btn btn-primary btn-size"><span class="glyphicon glyphicon-play" aria-hidden="true"></span> Play</a>';
				}
			},
			{
				"data":"id",
				"render":function(data){
					return '<button type="button" class="btn btn-info btn-size" id="editBtn"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button><button type="button" class="btn btn-info btn-size text-center" id="deleteBtn"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>   Delete</button>';
				}
			}
		]
	}); 



	//show addModal
	$('#addBtn').on("click",function(e){
		e.preventDefault();
		document.getElementById('addForm').reset();
		$('#modalAdd').modal('show');
		$('#modalAdd').off('click', '#addSubmit').on('click', '#addSubmit', function(){
			var addName=$('#addRadioName').val();
			var addSource=$('#addRadioUrl').val();
			var promise= $.ajax({
				type: 'POST',
				url: "/radios/",
				data: {
					"radio[name]": addName,
					"radio[source]": addSource
				}
			});
			promise.done(function(){
  					$.growl.notice({ message: "The station has been added!" });
  					console.log('promiseDone');
				});
			promise.fail(function(){
					$.growl.error({ message: "The station has not been added." });
					console.log('promiseFail');
				});
			promise.always(function(){
					datatable.ajax.reload();
					console.log('promiseAlways');
				});
		});
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
		$('#modalEdit').off('click','#editSubmit').on('click','#editSubmit',function(){
			console.log('promise');
			var editName=$('#editName').val();
			var editSource=$('#editUrl').val();
			var urlPatch= "/radios/" + id;
			var promise=$.ajax({
				type:'PATCH',
				dataType:"json",
				url: urlPatch,
				data:{
					"radio[name]": editName,
					"radio[source]": editSource
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
					datatable.ajax.reload();
					console.log('promiseAlways');
				});
			
		});
	});

	//show modalDelete
	$('#tabla').on("click",'#deleteBtn',function(e){
		e.preventDefault();
		
		var tr=$(this).parents('tr');
		var row=datatable.row(tr).data();
		var idDelete=row.id;
		var nameDelete=row.name;
		$('#modalDelete').modal('show');
		$('#modalDelete').off('click', '#confirmDelete').on('click', '#confirmDelete', function(event){
			event.preventDefault();
			console.log('delete radio');
			
			console.log('id to delete: ' + idDelete);
			var promise= $.ajax({
  				url: "/radios/" + idDelete,
  				type: 'DELETE'
			});
			promise.done(function(){
  				$.growl.notice({ message: "The station has been removed!" });
  				console.log('promiseDone');
			});
			promise.fail(function(){
				$.growl.error({ message: "The station has not been removed." });
				console.log('promiseFail');
			});
			promise.always(function(){
				datatable.ajax.reload();
				console.log('promiseAlways');
			});
		});
	});
});
