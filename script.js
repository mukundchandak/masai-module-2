let data = []
let pageData = []
let perPage = 10
let activePage = 1
let select



var submit = document.getElementById('submit')
submit.addEventListener('click',getData)

function getData(e) {
    e.preventDefault()

    let descp = document.getElementById('descp').value
    let loc = (document.getElementById('loc').value).split(' ').join('+')
    if(loc == ''){
        var loc1 = ''
    }
    else {
        var loc1 = '&location='+ loc
    }
    let url = 'https://jobs.github.com/positions.json?description='+descp + loc1

    console.log(url)

    fetch(url)
    .then(response=>response.json())
    .then(res=>data=res)
    .then(res=>console.log(data))
    .then(res=>pagination(activePage))
}



function pagination(page) {
    console.log(data)
    let total = data.length
    console.log(total)
    let pageCount = Math.ceil(total/perPage)
    let pages = document.getElementById('pages')
    pages.textContent = ''
    for(let i=0;i<pageCount;i++) {
        let li = document.createElement('li')
        if(i===page-1){
            li.setAttribute('class','page-item active')
        }
        else {
            li.setAttribute('class','page-item')
        }
        li.setAttribute('onclick',`changePage(${i+1})`)
        let a = document.createElement('a')
        a.setAttribute('class','page-link')
        a.setAttribute('href',`#${i+1}`)
        a.textContent = i + 1
        li.append(a)
        pages.append(li)
    }
    loadData()
}


function changePage(newPage) {
    let liActive = document.querySelector(`#pages li:nth-child(${activePage})`)
    liActive.setAttribute('class','page-item')
    activePage = newPage
    let liNew = document.querySelector(`#pages li:nth-child(${activePage})`)
    liNew.setAttribute('class','page-item active')
    loadData()
}


function loadData() {
    let page = activePage
    let low = (page-1)*perPage
    let high = page*perPage
    pageData = data.filter((a,i) => i>=low && i<high)
    fillPage()
}


function fillPage() {
    let tbodytr = $('tbody tr').remove()
    tbodytr.textContent = ''
    count = 1
    pageData.forEach(item => {
        console.log(item)
        $('tbody').append(`<tr><th scope="row">${count}</th><td>${item.type}</td><td><a href='${item.url}'>${item.url}</a></td><td>${item.created_at}</td><td>${item.company}</td><td><a href='${item.company_url}'>${item.company_url}</a></td><td>${item.location}</td><td>${item.title}</td><td><button onclick='btnDescp(${count})' type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Description</button></td><td class='text-wrap'>${item.how_to_apply}</td><td><img src='${item.company_logo}' height='100px' width='100px'/></td></tr>`)
        count++
    })

    // for(i=1;i<pageData.length;i++){
    //     let child = document.createElement('div')
    //     child.textContent = pageData[i]['Country'] + ' ' + pageData[i]['Slug'] + ' ' + pageData[i]['NewConfirmed'] + ' ' + pageData[i]['TotalConfirmed'] + ' ' + pageData[i]['NewDeaths'] + ' ' + pageData[i]['TotalDeaths'] + ' ' + pageData[i]['NewRecovered'] + ' ' + pageData[i]['TotalRecovered']
    //     div.append(child)
    // }
}

window.addEventListener('load',()=>{
    select = document.getElementById('pageSelect')
    select.addEventListener('change',()=>{
        perPage = Number(select.value)
        pagination(activePage)
    })
})

function btnDescp(n) {
    var showDescp = pageData[n-1]['description']
    // $('#showD').text('')
    // $('#showD').html(showDescp)
    // $('.modal-body').html('')
    $('.modal-body').append(showDescp)
}


