function checkFilter(category, title, checked){
    if(checked){
        this[category].push(title);
    }else{
        let index = this[category].indexOf(title);
        if(index > -1){
            this[category].splice(index, 1); //cut 1 item at position index.
        }
    }
}

export { checkFilter }; //to make check filter a property of that object.