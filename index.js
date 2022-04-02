let formulario=document.querySelector(".formulario");
let producto=document.querySelector(".producto");
let precio=document.querySelector(".precio");
let ok=document.querySelector(".ok");
let salida=document.querySelector(".salida");

let buscar=document.querySelector(".buscar");
let btn_buscar=document.querySelector(".btn_buscar");
let ul_buscar=document.querySelector(".ul_buscar");

let boton_add=document.querySelector(".boton_add");
let boton_buscar=document.querySelector(".boton_buscar");
let closee=document.querySelectorAll(".close");


let obj={}
let arr=[]
let contar=0;

function Buscar(){
ul_buscar.innerHTML=""
    let producto=buscar.value.toLowerCase()
    let array=JSON.parse(localStorage.getItem("producto"))
    for(let prod of array){
        let pAct=prod.producto.toLowerCase()
        if(pAct.indexOf(producto) !== -1){
            ul_buscar.innerHTML+=`
            <li class="li_buscar">${prod.producto} &nbsp &nbsp &nbsp <strong> $ ${prod.precio}</strong>.</li>
            `;
        }
    }
    if(ul_buscar.innerHTML===""){
        ul_buscar.innerHTML+=`    
            <li class="li_buscar">No Hay productos</li>
            `;
    }
  
}
// Buscar()
btn_buscar.addEventListener("click",(f)=>{
    Buscar()
})
document.addEventListener("keyup",()=>{
    Buscar()
})



function crearObjeto(producto,precio){
    contar++;
    obj={
        id:contar,
        producto:producto,
        precio:precio
    }
    arr.push(obj)
    localStorage.setItem("producto",JSON.stringify(arr))
    localStorage.setItem("contarPrecio",contar)
}
function pintarHtml(){
    salida.innerHTML=""
    let array=JSON.parse(localStorage.getItem("producto"))
    for(let a of array){
        if(array){
            salida.innerHTML+=`
            <li id="${a.id}" class="li">
            <p class="salida_p">${a.producto}</p>
            <p class="salida_precio">Precio: <strong>$ ${a.precio}</strong></p>
            <i class="fa-solid fa-trash"></i>
            </li>
            `;
        }
        if(array!=null){
            arr=array
        }
        // if(a==null){
        //     arr=[]
        // }


}

}
function limpia(){
    let array=JSON.parse(localStorage.getItem("producto"))

    if(array.length==0){
        contar=0

    }
    localStorage.setItem("contarPrecio",contar)

}
function mantenerId(){
    let id=JSON.parse(localStorage.getItem("contarPrecio"))
    if(id){
        contar=id
    }

}
eliminar=function(e){
    let array=JSON.parse(localStorage.getItem("producto"))
    let nuevo=[]
    for(let a of array){
        if(a.id!=e){
         nuevo.push(a)
        }
    }
    arr=nuevo
    localStorage.setItem("producto",JSON.stringify(arr))
   pintarHtml()
}

ok.addEventListener("click",(f)=>{
    f.preventDefault()

    let Producto=document.querySelector(".producto").value;
    let Precio=precio.value;
    if(Producto&&Precio){
        crearObjeto(Producto,Precio)
        pintarHtml()
        producto.value=""
        precio.value=""
    }

})
salida.addEventListener("click",(f)=>{
    // console.log(f.path[1].id)
    if(f.target.className==="fa-solid fa-trash")
    eliminar(f.path[1].id)
    // pintarHtml()
    limpia()
})
document.addEventListener("keyup",(f)=>{
    f.preventDefault()

    if(f.key=="Enter"){
        let Producto=document.querySelector(".producto").value;
        let Precio=precio.value;
        if(Producto&&Precio){
            crearObjeto(Producto,Precio)
            pintarHtml()
            producto.value=""
        precio.value=""

        }
    }
})



boton_add.addEventListener("click",()=>{
    document.querySelector(".caja_formulario").classList.toggle("mostrar_caja")
})
boton_buscar.addEventListener("click",()=>{
    document.querySelector(".contBuscar").classList.toggle("mostrar_caja")
})
closee.forEach((c)=>{
c.addEventListener("click",()=>{
    console.log("yes")
    document.querySelector(".contBuscar").classList.remove("mostrar_caja")
    document.querySelector(".caja_formulario").classList.remove("mostrar_caja")

    // c.classList.remove("mostrar_caja")
})
})


pintarHtml()
mantenerId()
