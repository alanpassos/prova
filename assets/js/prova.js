
$('#update_offer').submit(function(event){
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, (n, i) => {
        if (n['name'] == 'premium') {
            data[n['name']] = n['value'] == 'on' ? true : false
        } else {
            data[n['name']] = n['value']
        }
    })

    var request = {
        "url": `http://localhost:3000/api/offers/${data.id}`,
        "method": "PUT",
        "data": data,
    }
    $.ajax(request).done((response) => {
        alert('Data Updated Successfully!')        
        location = '/';

    })

});

if (window.location.pathname == "/") {

    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
        var request = {
            "url": `http://localhost:3000/api/offers/${id}`,
            "method": "DELETE"
        }
        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done((response) => {
                alert('Data Deleted Successfully!');
                location.reload();
            })
        }
    })

    $onstatus = $(".table tbody td a.status");
    $onstatus.click(function() {
        var id = $(this).attr("data-id")
        var status = $(this).attr("data-status") === "true"
        console.log(status)
        var request = {
            "url": `http://localhost:3000/api/offers/status/${id}`,
            "method": "PUT",
            "data": {disabled:!status}
        }
        if (confirm("Do you really want update  to status this record?")) {
            $.ajax(request).done((response) => {
                alert('Status Updated Successfully!');
                location.reload();
            })
        }
    })

}

