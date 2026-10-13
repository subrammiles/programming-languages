
interface Rectangle{
    height:number,
    width:number
}
interface ColorRectangle extends Rectangle{
    color:string
}

const rectangle:Rectangle={
    height:20,
    width:10
};

const colorRectangle:ColorRectangle={
    height:20,
    width:10,
    color:"red"
}