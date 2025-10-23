var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var allBookmarks;
var layer;

 if (localStorage.getItem('bookmarksContainer')===null){
        allBookmarks=[];
}else{
        allBookmarks=JSON.parse(localStorage.getItem('bookmarksContainer'));
        displayBoomark();
}
function addBookmark(){
    if(validateInputs(siteNameInput)&&validateInputs(siteUrlInput)){
        var bookmark={
            name:siteNameInput.value,
            url:siteUrlInput.value
        };
        allBookmarks.push(bookmark);
        localStorage.setItem('bookmarksContainer',JSON.stringify(allBookmarks));
        console.log(allBookmarks);
        clearInputs();
        displayBoomark();
    }
}
function clearInputs(){
    siteNameInput.value=null;
    siteUrlInput.value=null;
}
function displayBoomark(){
    var cartona='';
    var counter=1;
    for(var i=0; i < allBookmarks.length; i++){
        // console.log(allBookmarks[i]);
        cartona+=`<tr>
                    <td>${counter++}</td>
                    <td>${allBookmarks[i].name}</td>
                    <td><button onclick="visitBookmark(${i})" class="btn btn-visit mt-2"><i class="fa-solid fa-eye"></i>Visit</button></td>
                    <td><button onclick="deleteBookmark(${i})" class="btn btn-del mt-2"><i class="fa-solid fa-trash"></i>Delete</button></td>
                </tr>`
    }
    document.getElementById('tableContent').innerHTML=cartona;
}
function visitBookmark(index){
    // console.log('visit');
    var urlVisited=allBookmarks[index].url;
    window.open(urlVisited, "_blank");
}
function deleteBookmark(index){
    // console.log('delete');
    allBookmarks.splice(index,1);
    localStorage.setItem('bookmarksContainer',JSON.stringify(allBookmarks));
    displayBoomark();
}
function validateInputs(element){
    var id=element.id;
    var val=element.value;

    var regex = {
    siteUrl:/^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)$/,
    siteName:/^[A-Z][a-z0-9]{2,31}$/
    };

    if(regex[id].test(val)){
        console.log('match');
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    }
    else{
        console.log('Not match');
        layer=document.getElementById('layer');
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        layer.classList.replace('d-none','d-block');
        return false;
    }
}

function closeLayer(){
    layer.classList.replace('d-block','d-none');
}