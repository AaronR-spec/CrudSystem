let numberOfRecords = 10;
let product_row_id = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
async function ajaxGetRecords()
{
    let url = "php/get_records.php";   /* name of file to send request to */
    let urlParameters = ""; /* Construct a url parameter string to POST to fileName */

    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

        updateWebpage(await response.json());
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }

    /* use the fetched data to change the content of the webpage */
    function updateWebpage(json)
    {
        let htmlString = "";
        for (let i = 0; i < json.length; i++)
        {
            htmlString += "<div class='record' ><h1 class='company' onclick='ajaxOpenProductModel(" + json[i].id + ")'>" + json[i].customer + "</h1><p class='address'>" + json[i].address + "</p> <h2>" + json[i].name + "</h2><img class='delete' src='img/bin.png' title='Delete Record' alt='delete' onclick ='ajaxDeleteRecord(" + json[i].id + ")'/><p class='comment'>Note: " + json[i].note + "</p><h1 class='id'>OFT455" + json[i].id + "</h1><h3 class='price'>&euro;" + json[i].price + "</h3><h3 class='date'>" + json[i].date + "</h3><p class='quantity'>Quantity: " + json[i].quantity + "<p></div>";
        }
        document.getElementById('recordDisplay').innerHTML = htmlString;
    }
}

async function ajaxDeleteRecord(record)
{
    let url = "php/delete_record.php";   /* name of file to send request to */
    let urlParameters = "record=" + record;
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage(await response.text());
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }

    function updateWebpage()
    {
        ajaxGetRecords();
        showToast("Deleted...");
    }

}
function searchBar()
{
    var textBox = document.getElementById('search_text');
    var search = "";
    textBox.onkeyup = function () {
        search = this.value;

        search = search.replace(/^\s|\s $/, "");
        ajaxProductLiveSearch(search);
    };

}
async function ajaxProductLiveSearch(search)
{
    if (search.length === 0)
    {
        ajaxProductSort();
        return;
    } else {
        let url = "php/search_record.php";
        let urlParameters = "search=" + search;   /* Construct a url parameter string to POST to fileName */
        try
        {
            const response = await fetch(url,
                    {
                        method: "POST",
                        headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        body: urlParameters
                    });

            updateWebpage(await response.json()); // return a JSON string
        } catch (error)
        {
            console.log("Fetch failed: ", error);
        }


        /* use the fetched data to change the content of the webpage */
        function updateWebpage(json)
        {
            let htmlString = "";
            for (let i = 0; i < json.length; i++)
            {
                htmlString += "<div class='record' ><h1 class='company' onclick='ajaxOpenProductModel(" + json[i].id + ")'>" + json[i].customer + "</h1><p class='address'>" + json[i].address + "</p> <h2>" + json[i].name + "</h2><img class='delete' src='img/bin.png' title='Delete Record' alt='delete' onclick ='ajaxDeleteRecord(" + json[i].id + ")'/><p class='comment'>Note: " + json[i].note + "</p><h1 class='id'>OFT455" + json[i].id + "</h1><h3 class='price'>&euro;" + json[i].price + "</h3><h3 class='date'>" + json[i].date + "</h3><p class='quantity'>Quantity: " + json[i].quantity + "<p></div>";

            }
            document.getElementById('recordDisplay').innerHTML = htmlString;
            window.scrollTo({top: 0, behavior: 'smooth'});

        }
    }
}
async function ajaxProductSort()
{
    let sort = document.getElementById("selectSort").value;
    let url = "php/sort_record.php";
    let urlParameters = "sort=" + sort;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

        updateWebpage(await response.json()); // return a JSON string
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }


    /* use the fetched data to change the content of the webpage */
    function updateWebpage(json)
    {
        let htmlString = "";
        for (let i = 0; i < json.length; i++)
        {
            htmlString += "<div class='record' ><h1 class='company' onclick='ajaxOpenProductModel(" + json[i].id + ")'>" + json[i].customer + "</h1><p class='address'>" + json[i].address + "</p> <h2>" + json[i].name + "</h2><img class='delete' src='img/bin.png' title='Delete Record' alt='delete' onclick ='ajaxDeleteRecord(" + json[i].id + ")'/><p class='comment'>Note: " + json[i].note + "</p><h1 class='id'>OFT455" + json[i].id + "</h1><h3 class='price'>&euro;" + json[i].price + "</h3><h3 class='date'>" + json[i].date + "</h3><p class='quantity'>Quantity: " + json[i].quantity + "<p></div>";

        }
        document.getElementById('recordDisplay').innerHTML = htmlString;
        window.scrollTo({top: 0, behavior: 'smooth'});

    }
}
async function ajaxOpenProductModel(id)
{
    if (id < 0)
    {
        clearInfo();
        let htmlString = "<h2 >Account Id: </h2><h2 class='billingInvoice'>Invoice Id:</h2><h2>Customer: </h2><h2 class='billingInvoice'>Account Id: </h2><h2>Address:  </h2><h2 class='billingInvoice'>Attention Of: </h2><h2>Order By: </h2><h2 id='date'>Order Date: </h2>\n\
                          <h2 class='billingInvoice'>Order Id: </h2><h2 id='quantity'>Quantity: </h2><h2>Price: &euro;</h2>";

        document.getElementById('recordInfo').innerHTML = htmlString;
        document.getElementById("modelContainer").style.visibility = 'visible';
        ajaxSelectOptionsProducts();
        saveButton(true);

    } else {
        let url = "php/find_record.php";
        let urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
        try
        {
            const response = await fetch(url,
                    {
                        method: "POST",
                        headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        body: urlParameters
                    });

            updateWebpage(await response.json()); // return a JSON string
        } catch (error)
        {
            console.log("Fetch failed: ", error);
        }


        /* use the fetched data to change the content of the webpage */
        function updateWebpage(json)
        {
                    saveButton();

            ajaxSelectOptionsProducts();
            setTimeout(function ()
            {
                ajaxLoadProducts(json[0].id);

                document.getElementById("accountId").innerHTML = "OFT455" + json[0].id;
                document.getElementById("customer").innerHTML = json[0].customer;
                document.getElementById("notes").innerHTML = json[0].note;
                document.getElementById("address").innerHTML = json[0].address;
                document.getElementById("postcode").innerHTML = json[0].postcode;
                document.getElementById("orderBy").innerHTML = json[0].name;
                document.getElementById("invoiceId").innerHTML = json[0].id;

                let htmlString = "<h2 >Account Id: OFT455" + json[0].id + "</h2><h2 class='billingInvoice'>Invoice Id:</h2><h2>Customer: " + json[0].customer + "</h2><h2 class='billingInvoice'>Account Id: OFT455" + json[0].id + "</h2><h2>Address: " + json[0].address + " </h2><h2 class='billingInvoice'>Attention Of: " + json[0].name + "</h2><h2>Order By: " + json[0].name + "</h2><h2 id='date'>Order Date: " + json[0].date + "</h2>\n\
                          <h2 class='billingInvoice'>Order Id: OFT455" + json[0].id + "</h2><h2 id='quantity'>Quantity: " + json[0].quantity + "</h2><h2 id='priceRecord'>Price: &euro;</h2>";

                document.getElementById('recordInfo').innerHTML = htmlString;
                validateSave();




                document.getElementById("modelContainer").style.visibility = 'visible';
            }, 300);
        }

    }
}
function closeProductModel()
{
    document.getElementById("modelContainer").style.visibility = 'hidden';
    return;

}
function clearInfo()
{
    document.getElementById("accountId").innerHTML = "";
    document.getElementById("customer").innerHTML = "";
    document.getElementById("address").innerHTML = "";
    document.getElementById("postcode").innerHTML = "";
    document.getElementById("orderBy").innerHTML = "";
    document.getElementById("invoiceId").innerHTML = "";
    document.getElementById("notes").innerHTML = "";
    document.getElementById("price").innerHTML = "";

}

async function ajaxSelectOptionsProducts()
{
    let url = "php/get_products.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

        updateWebpage(await response.json()); // return a JSON string
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }


    /* use the fetched data to change the content of the webpage */
    function updateWebpage(json)
    {
        
        let htmlString = "";
        for (let i = 0; i < numberOfRecords; i++) {
            htmlString += "<div class='recordDataInput'><select  class='recordOptions' onchange='ajaxSelectOptionsChange(" + i + ")' id= 'row" + i + "'><option selected='true' ></option>";

            for (let j = 0; j < json.length; j++)
            {
                htmlString += "<option value='" + json[j].id + "'>" + json[j].name + "</option>";

            }
            htmlString += "</select><h4 class = 'selectText' id='rowText" + i + "'></h4></div>";
        }
        document.getElementById('recordDataSelect').innerHTML = htmlString;


    }
}
function initaliseProductRows()
{
    for (let j = 0; j < numberOfRecords; j++)
    {
        product_row_id[j] = document.getElementById("row" + j).value;

    }

}
async function ajaxSelectOptionsChange(index)
{
    initaliseProductRows();
    product_row_id[index] = document.getElementById("row" + index).value;
    let url = "php/find_product.php";
    let urlParameters = "id=" + document.getElementById("row" + index).value;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

        updateWebpage(await response.json()); // return a JSON string
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }


    /* use the fetched data to change the content of the webpage */
    function updateWebpage(json)
    {
        document.getElementById("rowText" + index).innerHTML = "";
        document.getElementById("rowText" + index).value = json[0].id;
        document.getElementById("rowText" + index).innerHTML += json[0].description;
    }
}

let editable = false;
function toggleEdit()
{
    if (editable)
    {
        document.getElementById("customer").contentEditable = true;
        document.getElementById("address").contentEditable = true;
        document.getElementById("postcode").contentEditable = true;
        document.getElementById("orderBy").contentEditable = true;
        document.getElementById("notes").contentEditable = true;

        showToast("Edit On");
    } else
    {
        document.getElementById("customer").contentEditable = false;
        document.getElementById("address").contentEditable = false;
        document.getElementById("postcode").contentEditable = false;
        document.getElementById("orderBy").contentEditable = false;
        document.getElementById("invoiceId").contentEditable = false;
        document.getElementById("notes").contentEditable = false;
        showToast("Edit Off");
    }

}
function showToast(message) {
    let toast = document.getElementById("toast");
    // Add the "show" class to DIV
    toast.innerHTML = message;
    toast.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
async function ajaxSaveRecord()
{
    if(validateSave()){
    let recordDetails = [document.getElementById("accountId").innerHTML.substring(6), document.getElementById("customer").innerHTML, document.getElementById("address").innerHTML, document.getElementById("price").innerHTML, document.getElementById("notes").innerHTML, document.getElementById("quantity").innerHTML.substring(9), document.getElementById("date").innerHTML.substring(11), document.getElementById("orderBy").innerHTML, document.getElementById("postcode").innerHTML];
    let url = "php/save_record.php";
    let urlParameters = "details=" + recordDetails;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage(await response.text);
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    function updateWebpage(text)
    {
        if (text) {
            ajaxSaveProducts();

            ajaxGetRecords();
            closeProductModel();
            
        }
        else
        {
             showToast("Could Not Save, Error In Validation");
        }
    }
    }
    else
    {
        
        
    }
}
async function ajaxSaveProducts()
{
    let url = "php/save_product.php";
    let urlParameters = "products=" + product_row_id;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage(await response);
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    function updateWebpage()
    {
        initaliseProductRows();


    }
}

async function ajaxLoadProducts(id)
{
    let url = "php/load_products.php";
    let urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage(await response.json());
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    function updateWebpage(json)
    {
        let totalPrice = 0;
        document.getElementById("quantity").innerHTML = "Quantity: " + json.length;
        if (json.length !== 0)
        {
            for (let i = 0; i < json.length; i++)
            {
                let row = document.getElementById("row" + i);
                for (let j = 0; j < row.options.length; j++)
                {
                    if (row.options[j].value === json[i].product_id) {
                        row.selectedIndex = j;


                        document.getElementById("rowText" + i).innerHTML += json[i].description + " \t&euro; " + json[i].price;

                    }

                }

                totalPrice += parseInt(json[i].price);
            }
        }
        document.getElementById("priceRecord").innerHTML += totalPrice;
        document.getElementById("price").innerHTML = totalPrice;
    }

}
function saveButton()
{
        let htmlString = "<button class= 'save' type='button' onclick='ajaxSaveRecord()'>Save</button>";
        document.getElementById('saveButtonContainer').innerHTML = htmlString;

}
function validateSave()
{
    if( document.getElementById("customer").innerHTML.length < 2  )
    {
        document.getElementById("customer").style.borderColor = "red";
         showToast("Could Not Save, Error In Customer Validation");
        return false;
        
    }
    if( document.getElementById("address").innerHTML.length < 8)
    {
         document.getElementById("address").style.borderColor = "red";
          showToast("Could Not Save, Error In Address Validation");
        
    }
        if( document.getElementById("accountId").innerHTML.length < 0)
    {
         document.getElementById("accountId").style.borderColor = "red";
          showToast("Could Not Save, Error In Id Validation");
        
    }
    else
    {
        document.getElementById("customer").style.borderColor = "";
        document.getElementById("address").style.borderColor = "";
        return true;
        
    }
    
}