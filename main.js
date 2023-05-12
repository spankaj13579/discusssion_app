document.addEventListener("DOMContentLoaded", getDiscussions);

var newQuestionSubject = document.getElementById('newQuestionSubject');
var newQuestionQuestion = document.getElementById('newQuestionQuestion');
var newQuestionSubmit= document.getElementById('newQuestionSubmit');
var content= document.querySelector('.content');
var NewQuestionsForm= document.getElementById('NewQuestionsForm');
var newQuestions= document.getElementById('newQuestions');
var resolve= document.getElementById('resolve');
var resolveSubjectTitle= document.getElementById('resolveSubjectTitle');
var resolvessubjectQuestion= document.getElementById('resolvessubjectQuestion');
var resolved= document.getElementById('resolved');
var repliedUserName= document.getElementById('repliedUserName');
var repliedUserReply= document.getElementById('repliedUserReply');
var enterName= document.getElementById('enterName');
var Commentss= document.getElementById('Commentss');
var submitComment= document.getElementById('submitComment');
var questionContent= document.querySelectorAll('.questionContent');
var response= document.querySelector('.response');
var responseUl= document.querySelector('.responseUl');
var search= document.getElementById('search');

var i=0,click=0,start=0,del;
// events
NewQuestionsForm.addEventListener('click', NewQuestionsFormOpen);
newQuestionSubmit.addEventListener('click', newSubmit);
content.addEventListener('click', resolving);
submitComment.addEventListener('click', addResponse);
resolved.addEventListener('click', deleteData);

// NewQuestionsFormOpen opens

function NewQuestionsFormOpen()
{
    newQuestions.classList.remove('hide');
    resolve.classList.add('hide');

}

// NewQuestionsFormOpen open ends


// resolving starts

function resolving(e)
{
    var elt,old;
    
    if(e.target.classList.contains('questionContent'))
    {
        elt= e.target;
    }
    if(e.target.parentElement.classList.contains('questionContent'))
    {
        elt= e.target.parentElement;
    }
        getResolved(elt.children[0].innerText);
        // click=0;
    del= elt;
    newQuestionSubject.value= null;
    newQuestionQuestion.value= null;
    console.log(elt);

    // console.log(elt.children[0].innerText);
    

    
    

    // console.log(content);

}

// resolving ends

// new questin submit starts
// submit new data on NewQuestionsFormOpen
function newSubmit()
{
    if(newQuestionSubject.value != "" && newQuestionQuestion.value != '')
    {
    saveLocalDiscussions(newQuestionSubject.value, newQuestionQuestion.value);
    console.log(newQuestionSubject.value);
    let li= document.createElement('li');
    let que= document.createElement('h3');
    let p= document.createElement('p');
    li.className= 'questionContent';
    que.innerText= newQuestionSubject.value;
    p.innerText= newQuestionQuestion.value;
    li.appendChild(que);
    li.appendChild(p);
    content.appendChild(li);
    newQuestionSubject.value= null;
    newQuestionQuestion.value= null;
    }
    else
    {
        alert('enter both fields');
    }
    
}


// new question submit ends


// delete data starts

function deleteData()
{
    let discussions;
    if(localStorage.getItem('discussions')== null)
    {
        discussions =[];
    }
    else{
        discussions= JSON.parse(localStorage.getItem('discussions'));
    }
    
    discussions.splice(i, 1);
    localStorage.setItem('discussions', JSON.stringify(discussions));
    // resolve.remove();
    resolve.className ='hide';
    newQuestions.classList.remove('hide');
    del.remove();    

}

// delete data ends



// add data to local storage

function saveLocalDiscussions(subject, question)
{
    let discussions;
    if(localStorage.getItem('discussions')== null)
    {
        discussions =[];
    }
    else{
        discussions= JSON.parse(localStorage.getItem('discussions'));
    }
    
    var obj= 
    {
        sub: subject,
        que: question,
        response: []
    };
    discussions.push(obj);
    localStorage.setItem('discussions', JSON.stringify(discussions));
}


// get discussions
function getDiscussions()
{
    let discussions;
    if(localStorage.getItem('discussions')== null)
    {
        discussions =[];
    }
    else{
        discussions= JSON.parse(localStorage.getItem('discussions'));
    }

    discussions.forEach(function(discussion){

    let li= document.createElement('li');
    let que= document.createElement('h3');
    let p= document.createElement('p');
    li.className= 'questionContent';
    que.innerText= discussion.sub;
    p.innerText= discussion.que;
    li.appendChild(que);
    li.appendChild(p);
    content.appendChild(li);

    });

}



// local storage for resolving 

function getResolved(que)
{
    enterName.value= null;
    Commentss.value= null;
    // click++;
    // responseUl.remove();
    newQuestions.className= 'hide';
    resolve.classList.remove('hide');

    
    let discussions;
    if(localStorage.getItem('discussions')== null)
    {
        discussions =[];
    }
    else{
        discussions= JSON.parse(localStorage.getItem('discussions'));
    }
    
    var len=discussions.length;
    for(i=0; i<len; i++)
    {
        if(discussions[i].sub == que)
        {
            break;
        }
    }
    resolveSubjectTitle.innerText= discussions[i].sub;
    resolvessubjectQuestion.innerHTML= discussions[i].que;

     // .........................showing response on reload starts
    
    //  var ull= document.createElement('ul');
    //  ull.className= 'responseUl';
    //  response.appendChild(ull);
     
    // if(click==1)
    // {
        responseUl.innerHTML=null;
        for(var n=0; n<discussions[i].response.length; n++)
     {
         var rli= document.createElement('li');
         var re= document.createElement('h4');
         re.setAttribute('id', 'repliedUserName');
         re.innerText= discussions[i].response[n].nam;
         var rp= document.createElement('p');
         rp.setAttribute('id', 'repliedUserReply');
         rp.innerText= discussions[i].response[n].comm;
         rli.appendChild(re);
         rli.appendChild(rp);
         responseUl.appendChild(rli);
     }
    // }
        
     
 // ........................showing response on reload ends


}


// insert responce to local server


function addResponse()
{
    if(enterName.value != '' && Commentss.value != '')
    {
    
    let discussions;
    if(localStorage.getItem('discussions')== null)
    {
        discussions =[];
    }
    else{
        discussions= JSON.parse(localStorage.getItem('discussions'));
    }


    var nameOfPerson= enterName.value;
    var COmments= Commentss.value;
    var objec= {
        nam:nameOfPerson,
        comm: COmments
    }

    // .........................showing response on reload starts
    
        var rli= document.createElement('li');
        var re= document.createElement('h4');
        re.setAttribute('id', 'repliedUserName');
        re.innerText= objec.nam;
        var rp= document.createElement('p');
        rp.setAttribute('id', 'repliedUserReply');
        rp.innerText= objec.comm;
        rli.appendChild(re);
        rli.appendChild(rp);
        responseUl.appendChild(rli);

// ........................showing response on reload ends
   


    console.log(discussions[i]);
    // var objects= JSON.stringify(objec);
    discussions[i].response.push(objec);

    localStorage.setItem('discussions', JSON.stringify(discussions));
    // console.log(discussions[i]);
    
    // adding response to dom 
    
    // clear input
    enterName.value= null;
    Commentss.value= null;
    }
    else{
        alert('Enter Both Fields');
    }

}




// searching starts................... 
function search()
{
    let discussions;
    if(localStorage.getItem('discussions')== null)
    {
        discussions =[];
    }
    else{
        discussions= JSON.parse(localStorage.getItem('discussions'));
    }

    console.log(discussions);


}



// searching ends......................