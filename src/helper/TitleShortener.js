export const titleShortener = (title) =>{
    const array_title=title.split(" ")
    if(array_title[1] == "-"){
       return `${array_title[0]} ${array_title[1]} ${array_title[2]} ...`
    }
    return `${array_title[0]} ${array_title[1]} ...`
}