const container = document.querySelector('#container');
const size = document.querySelector('select');
const color = document.querySelector('input');
const rgb = document.querySelector('#rgb');
let rainbow = false;

//find out grid size selected by user 
let iterator = 256;
let n = 16;
size.addEventListener('change',()=>{
    if (size.value === "2") {
        iterator=32*32;
        n=32;
    }
    else if(size.value === "3") {
        iterator=64*64;
        n=64;
    }
    else if(size.value === "4") {
        iterator=100*100;
        n=100;
    }
    else {
        iterator=256;
        n=16;
    }
    createGrid(iterator,n);
});

//create grid based on the grid size
//nxn matrix
//borderWidth = (n-1)*2 + 2
//width of one div = (480 - borderWidth)/n;
function createGrid(iterator,n){
    removeExistingGrid();   // remove existing grid before creating a new one
    for(let i=0;i<iterator;i++){ 
        let div = document.createElement('div');
        div.classList.add('grid');
        //let borderWidth = (n-1)*2 + 2;
        //let divWidth = (480 - borderWidth)/n + "px";
        let divWidth = (480)/n + "px";
        div.style['width']=divWidth;
        div.style['height']=divWidth;
        container.appendChild(div);
    }
    etcher();  // call the etcher function to start etching 
}

function removeExistingGrid() {  
    const grids = container.querySelectorAll('div');
    grids.forEach((grid)=>{
        container.removeChild(grid);
    });
}

rgb.addEventListener('click',()=> rainbow=true);
color.addEventListener('click',()=> rainbow=false);

function randomColor(){
    const r = Math.round(Math.random()*256).toString(16);
    const g = Math.round(Math.random()*256).toString(16);
    const b = Math.round(Math.random()*256).toString(16);
    let rgb = `#${r}${g}${b}`;
    return rgb;
}

function etcher(){
    const divs = document.querySelectorAll('.grid');
    divs.forEach((div)=>{
        div.addEventListener('mouseenter',()=>{
            //div.classList.add('hover');
            if (rainbow===true){
                div.style['background-color']= randomColor();
            }
            else div.style['background-color']= color.value;
        });
    });
}

const clear = document.querySelector('#clear');
clear.addEventListener('click',()=>{
    const divs = document.querySelectorAll('.grid');
    divs.forEach((div)=>{
            //div.classList.remove('hover');
         div.style['background-color']='#ffe3b0';
    });
});

const erase = document.querySelector('#erase');
erase.addEventListener('click',()=> {
    color.value = '#ffe3b0';
    rainbow=false;
});

createGrid(256,16);   // initialize grid