let lists = Array.from(document.getElementsByTagName('li'));
let add = document.getElementById('add');
let todo = document.getElementById('todo');
add.addEventListener('click', () => {
    axios.post('/', {todo: todo.value})
    .then(res =>  {
        let id = res['data']['insertId'];
        if(res.data !== false) {
            $('#lists').append(` <li class="par" id="par" data-act="${id}">
            <div class="form-check"> <label class="form-check-label"> ${todo.value} <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline"></i>
            </li>`)
            location.reload();
        }
    })
    .catch(err => console.log(err)) 
})
lists.forEach(list => {
    list.addEventListener('click', () => {
        // console.log('bisa');
        let act = list.dataset.act;
        axios.delete(`/${act}`)
        .then(res => {
            if(res.data == true) {
                list.remove();
            }
        } )
            .catch(err => console.log(err));
    })
});
