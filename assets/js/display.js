let tableData;
$(document).ready(function(){
    tableData = undefined;
});

$('.search').each(function(){
    var elem = $(this);

    //save the prev value
    elem.data('oldV',elem.val());

    //changes in the search by different means
    elem.bind('propertychange change click keyup input paste',function(event){
        //check for state change of search bar
        if(elem.data('oldV')!=elem.val()){
            //update the event value with new value
            elem.data('oldV',elem.val());

            let query = elem.val().toLowerCase();

            //find the table using id
            var table= $('#data-container');

            if(tableData == undefined){
                tableData=getData(table);
            }
            //filter the data according to the query
            var filteredData= getFilteringData(tableData,query);

            //as per query update the table dynamically
            updateDynamically(table,filteredData);
        }
    });
});

//function for taking the data into the search bar
function getData(table) {
    let data = [];

    table.find('tr').each(function (rowIndex, r) {
        var cols = [];
        
        $(this).find('td').each(function (colIndex, c) {
            cols.push(c.textContent);
        });
        data.push(cols);
    });
    console.log(data);
    return data;
}

//function for Filtering the data according to query and return to the updateDynamically function()
function getFilteringData(tableData,query){
    let data = [];

    for(let i=0;i<tableData.length;i++){
        let row=tableData[i];

        let found=false;

        for(let j=0;j<row.length;j++){
            if(row[j].toLowerCase().includes(query)){
                found=true;
                break;
            }
        }

        if(found){
            data.push(row);
        }
    }
    return data;
}


//function for by taking the data from filtering function() Update the table dynamically
function updateDynamically(table,data){

    let html = '<tbody>'

    for(let i=0;i<data.length;i++){
        let row = data[i];
        html= html+'<tr>';
        for(let j = 0; j < row.length; j++){
            html =html+ '<td>'+row[j]+'</td>';
        }
        html = html+'</tr>';
    }
    html=html+'<tbody>';

    table.find('tbody').detach();

    table.append(html);
}

function sort(key){
    var table = $('#data-container');
    let data = getData(table);
    
    //calling sort data function
    data= sorting(data,key);

    updateDynamically(table,data);
}

function sorting(data,key){
    data.sort(function(a,b){
        if(a[key]<b[key]){
            return -1;
        }
        if(b[key]<a[key]){
            return 1;
        }
        return 0;
    });
    return data;
    // var rows, switching, i, x, y, shouldSwitch, dir, switchContent=0;
    // var table = $('#data-container');
    // switching =true;
    // //Set the sorting direction to ascending
    // dir='asc';

    // while(switching){
    //     switching=false;
    //     rows=table.rows;

    //     for(i=1;i<(rows.length-1);i++){
    //         shouldSwitch=false;
    //         x=rows[i].getElementByTagName('td')[n];
    //         y=rows[i+1].getElementByTagName('td')[n];

    //         if(dir=='asc'){
    //             if(x.innerHTML.toLowerCase()>y.innerHTML.toLowerCase()){
    //                 shouldSwitch=true;
    //                 break;
    //             }
    //         }else if(dir=='desc'){
    //             if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    
    //                 shouldSwitch = true;
    //                 break;
    //             }
    //         }
    //     }
    //     if(shouldSwitch){
    //         
    //         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    //         switching = true;
    //         
    //         switchcount ++; 
    //     }else {
    //         
    //         if (switchcount == 0 && dir == "asc") {
    //           dir = "desc";
    //           switching = true;
    //         }
    // }
}