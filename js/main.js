class NumBlock{
    constructor(root, index, option, value = ""){
        //attributes
        // root : panrent node; index : built id ; 
        // option(object), has "label" and "unit"
        this.root = root;
        this.index = index;
        this.label = option.label;
        this.unit = option.unit;
        this.value = value;
        //layout elements
        this.input;
        this.layout();
    }
    layout(){
        let elem = document.createElement('div'),
            label = document.createElement('label'),
            div_value = document.createElement('div'),
            input = document.createElement('input'),
            unit = document.createElement('span');
        
        div_value.className = "value";
        unit.className = "unit";

        input.id = "input_" + this.index;
        input.type = "number";
        input.step = "0.01";
        label.htmlFor = input.id;
        label.innerHTML = this.label;
        unit.innerHTML = this.unit;

        elem.appendChild(label);
        elem.appendChild(div_value);
        div_value.appendChild(input);
        div_value.appendChild(unit);

        this.input = input;
        this.root.appendChild(elem);
    }
    refresh(label, unit, value){
        this.label = label;
        this.unit = unit;
        this.value = value;

        this.root.querySelector("label").innerHTML = label;
        this.root.querySelector(".unit").innerHTML = unit;
        this.input.value = value;
    }
}

class Convert_2{
    constructor(root, index_from=0, index_to=1){
        this.root = root;
        this.indexes = [index_from, index_to];
        this.OPTIONS = [
            { label:"label#1", unit:"unit#1" },
            { label:"label#2", unit:"unit#2" },
            { label:"label#3", unit:"unit#3" },
        ];
        this.convertFunc;
        //layout elements
        this.numblocks = [];
        this.swapbtn;
        // this.layout();
    }
    layout(){
        let divs = this.setup_numblocks();
        this.setup_swapbtn();
        this.root.appendChild( divs[0] );
        this.root.appendChild( this.swapbtn );
        this.root.appendChild( divs[1] );
    }
    setup_numblocks(){
        let divFrom = document.createElement('div'),
            divTo   = document.createElement('div'),
            i_0 = this.indexes[0],
            i_1 = this.indexes[1];
        
        divFrom.id = "from";
        divTo.id = "to";
        divFrom.className = "num-block";
        divTo.className = "num-block";

        let block_0 = new NumBlock(divFrom, 0, this.OPTIONS[i_0]),
            block_1 = new NumBlock(divTo, 1, this.OPTIONS[i_1]);
        this.numblocks = [block_0, block_1];
        
        //interactions
        block_0.input.onchange = () => {
            let value = this.numblocks[0].input.value;
            this.numblocks[1].input.value = this.convertFunc(value);
        };
        block_1.input.disabled = true;

        return [divFrom,divTo];
        
    }
    setup_swapbtn(){
        let elem = document.createElement('div'),
            btn = document.createElement('button'),
            icon = document.createElement('img');
        elem.className = "btn-convert";
        icon.src = "./imgs/swap.svg";
        icon.alt = "swap";

        elem.appendChild(btn);
        btn.appendChild(icon);

        this.swapbtn = elem;
    }
    refresh(){}
    swap(){}
}
class Temperature extends Convert_2{
    constructor(root, index_from=0, index_to=1){
        super(root, index_from, index_to);
        this.OPTIONS = [
            { label:"celsius", unit:"&#176;C" },
            { label:"fahrenheit", unit:"&#176;F" },
            { label:"kelvin", unit:"K" },
        ];
        this.convertFunc = temperatures(this.indexes[0],this.indexes[1]);
        this.layout();
    }
}
function fixed(fl){
    return fl.toFixed(1);
}
const temp_types = {
        C:0, F:1, K:2
    },
    temp_types_text = [
        "celsius", "fahrenheit", "kelvin"
    ],
    temp_types_unit = [
        "&#176;C", "&#176;F", "K"
    ];
function temperatures(type_0, type_1){
    const equal = (n)=>{
        return n;
    },
        celsius_to_fahrenheit = (n)=>{
        // F = C * 1.8 + 32
        return n*1.8 + 32;
    },
        fahrenheit_to_celsius = (n)=>{
        // C = (F - 32)/1.8
        return (n - 32)/1.8;
    },
        celsius_to_kelvin = (n) => {
        // C = K + 273.15
        return n + 273.15;
    },
        kelvin_to_celsius = (n) => {
        return n-273.15;
    },
        fahrenheit_to_kelvin = (n) => {
        return n/1.8 - 290.9278;
    },
        kelvin_to_fahrenheit = (n) => {
        return n*1.8 + 523.67;
    }
    if(type_0 === type_1){
        return equal;
    }
    // celsius_to_fahrenheit
    if(type_0 == temp_types.C && type_1 == temp_types.F){
        return celsius_to_fahrenheit;
    }
    if(type_0 == temp_types.F && type_1 == temp_types.C){
        return fahrenheit_to_celsius;
    }
    if(type_0 == temp_types.C && type_1 == temp_types.K){
        return celsius_to_kelvin;
    }
    if(type_0 == temp_types.K && type_1 == temp_types.C){
        return kelvin_to_celsius;
    }
    if(type_0 == temp_types.F && type_1 == temp_types.K){
        return fahrenheit_to_kelvin;
    }
    if(type_0 == temp_types.K && type_1 == temp_types.F){
        return kelvin_to_fahrenheit;
    }
}
function refresh(type_0,type_1, value_0 = false, value_1){
    // reset label, input value and unit
    let div_from = document.querySelector("#from"),
        div_to = document.querySelector("#to");
        input_0 = div_from.querySelector("input"),
        input_1 = div_to.querySelector("input");
    
    input_0.value = value_0 == ""? "":value_0;
    input_1.value = value_0 == ""? "":value_1;

    div_from.querySelector("label").innerHTML = temp_types_text[type_0];
    div_to.querySelector("label").innerHTML = temp_types_text[type_1];

    div_from.querySelector(".unit").innerHTML = temp_types_unit[type_0];
    div_to.querySelector(".unit").innerHTML = temp_types_unit[type_1];
}


window.onload = ()=>{
    let root = document.querySelector('.converter');
    new Temperature(root);
    // const div_from = document.querySelector("#from");
    // const div_to = document.querySelector("#to");
    // let input_0 = div_from.querySelector("input"),
    //     input_1 = div_to.querySelector("input"),
    //     label_0 = div_from.querySelector("label"),
    //     label_1 = div_to.querySelector("label");
    
    // let type_0 = temp_types.K,
    //     type_1 = temp_types.F;

    // label_0.innerHTML = temp_types_text[type_0];
    // label_1.innerHTML = temp_types_text[type_1];
    // div_from.querySelector(".unit").innerHTML = temp_types_unit[type_0];
    // div_to.querySelector(".unit").innerHTML = temp_types_unit[type_1];

    // document.querySelector(".btn-convert").onclick = () =>{
    //     let temp = type_0;
    //     type_0 = type_1;
    //     type_1 = temp;

    //     let num0 = input_0.value;
    //     let num1 = input_1.value;
    //     refresh(type_0,type_1,num1,num0)
    // }
    // input_0.onchange = (e) => {
    //     let value_0 = Number(e.target.value);
    //     input_1.value = temperatures(type_0,type_1)(value_0).toFixed(2);
    // };

};