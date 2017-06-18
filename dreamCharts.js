/**
 * Created by Zhangxiaoman on 2017/6/9.
 */
var dreamCharts = {
    SVG:{},//获取SVG对象
    maxData:0,//多组数值数组的最大数值
    /****************计算多组数值数组的最大数值************/
    calPublicMax:function(arr){
        var maxDataArr = [];
        for(let i = 0;i < arr.length;i++){
            maxDataArr.push(Math.max.apply(Math,arr[i]));
        }
        this.maxData = Math.max.apply(Math,maxDataArr);
    },
    getSVG:function(id){
        this.SVG = Snap(id);
        return this.SVG;
    },
    addEventListener:function(arr,event,func){
        for(var i = 0,len = arr.length; i < len;i++){
            if(event == "mousemove"){
                arr[i].mousemove(func);
            }
            else if(event == "click"){
                arr[i].click(func);
            }
            else if(event == "dblclick"){
                arr[i].dblclick(func);
            }
            else if(event == "mousedown"){
                arr[i].mousedown(func);
            }
            else if(event == "mouseout"){
                arr[i].mouseout(func);
            }
            else if(event == "mouseover"){
                arr[i].mouseover(func);
            }
            else if(event == "touchstart"){
                arr[i].touchstart(func);
            }
            else if(event == "touchmove"){
                arr[i].touchmove(func);
            }
            else if(event == "touchend"){
                arr[i].touchend(func);
            }
            else if(event == "hover"){
                arr[i].hover(func);
            }
            else if(event == "drag"){
                arr[i].drag(func);
            }
            else{
                return 0;
            }
        }
    },
    removeEventListener:function(arr,event,func){
        for(var i = 0,len = arr.length; i < len;i++){
            if(event == "unmousemove"){
                arr[i].unmousemove(func);
            }
            else if(event == "unclick"){
                arr[i].unclick(func);
            }
            else if(event == "undblclick"){
                arr[i].undblclick(func);
            }
            else if(event == "unmousedown"){
                arr[i].unmousedown(func);
            }
            else if(event == "unmousemove"){
                arr[i].unmousemove(func);
            }
            else if(event == "unmouseout"){
                arr[i].unmouseout(func);
            }
            else if(event == "unmouseover"){
                arr[i].unmouseover(func);
            }
            else if(event == "untouchstart"){
                arr[i].untouchstart(func);
            }
            else if(event == "untouchmove"){
                arr[i].untouchmove(func);
            }
            else if(event == "untouchend"){
                arr[i].untouchend(func);
            }
            else if(event == "unhover"){
                arr[i].unhover(func);
            }
            else if(event == "undrag"){
                arr[i].undrag(func);
            }
            else{
                return 0;
            }
        }
    }
};

/****************图例****************/
var legend = {
    width:0,
    height:0,
    settings:function(obj){
        this.width = obj.width;
        this.height = obj.height;
        return dreamCharts.legend;
    },
    drawLegendRect:function(wStart,hStart){
        return dreamCharts.SVG.paper.rect(wStart,hStart,this.width,this.height);
    },
    drawLegendText:function(x,y,text){
        return dreamCharts.SVG.paper.text(x,y,text);
    }
};

/****************y轴****************/
var yAxis = {
    distanceY:0,
    dataLength:0,
    direction:0,
    xOffsetText:0,
    yOffsetText:0,
    data:[],
    getPublicMax:false,
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.distanceY = obj.distanceY;
        this.direction = obj.direction;
        this.xOffsetText = obj.xOffsetText;
        this.yOffsetText = obj.yOffsetText;
        return dreamCharts.yAxis;
    },
    /****************画y轴长垂线************/
    drawYLine:function(wStart,hStart,hEnd){
        return dreamCharts.SVG.paper.line(wStart,hStart,wStart,hEnd);//纵轴垂直线
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性

    /****************画y轴刻度线************/
    drawYGraduationLine:function(wStart,hStart,hEnd,className){
        var interval = (hEnd-hStart-this.distanceY)/this.dataLength;//刻度间的间隔
        for(let i = 0;i < this.dataLength+1; i++) {
            dreamCharts.SVG.paper.line(wStart, hEnd - interval * i, wStart + this.direction,
                    hEnd - interval * i).addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，direction决定刻度线在长垂线左侧（负数）还是右侧（正数），绝对值决定长度

    /****************画y轴文本************/
    drawYText:function(wStart,hStart,hEnd,className){
        var interval = (hEnd-hStart-this.distanceY)/this.dataLength;//刻度间的间隔
        var dataMax = 0;
        if(this.getPublicMax == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxData;
        }
        /******************画刻度文本********************/
        for(let i = 0;i < this.dataLength+1; i++){
            dreamCharts.SVG.paper.text(wStart+this.xOffsetText,hEnd-(interval)*i+this.yOffsetText,(i*Math.ceil((dataMax/this.dataLength))).toString())
                .addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    }//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，xOffsetText是决定文本沿水平方向左右移动，yOffsetText是决定文本沿垂直方向上下移动，dataMax是取出数据中最大的数据值
};

/****************y轴****************/
var xAixs = {
    distanceX:0,
    dataLength:0,
    direction:0,
    xOffsetText:0,
    yOffsetText:0,
    catogary:[],
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.distanceX = obj.distanceX;
        this.direction = obj.direction;
        this.xOffsetText = obj.xOffsetText;
        this.yOffsetText = obj.yOffsetText;
        this.allOffset = obj.allOffset;
        return dreamCharts.xAxis;
    },
    /****************画X轴水平线************/
    drawXLine:function(wStart,wEnd,hEnd){
        return dreamCharts.SVG.paper.line(wStart,hEnd,wEnd,hEnd);
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性

    /****************画x轴刻度线************/
    drawXGraduationLine:function(wStart,wEnd,hEnd,className){
        var interval = (wEnd-wStart-this.distanceX)/this.dataLength;//刻度间的间隔
        for(let i = 1;i < this.dataLength; i++){
            dreamCharts.SVG.paper.line(wStart+i*interval,hEnd,wStart+i*interval,
                    hEnd+this.direction).addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，direction决定刻度线在长垂线左侧（负数）还是右侧（正数），绝对值决定长度

    /****************画x轴文本************/
    drawXText:function(wStart,hEnd,wEnd,className){
        var interval = (wEnd-wStart-this.distanceX)/this.dataLength;//刻度间的间隔
        /******************画刻度线和刻度文本********************/
        for(let i = 0;i < this.dataLength+1; i++){
            dreamCharts.SVG.paper.text(wStart+(i+this.allOffset)*interval+this.xOffsetText,hEnd+this.yOffsetText,this.data[i])
                .addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    }//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，xOffsetText是决定文本沿水平方向左右移动，yOffsetText是决定文本沿垂直方向上下移动，catogary是类目数据数组
};

/****************柱状图****************/
var histogram = {
    dataLength:0,
    data:[],
    multiple:0.5,
    getPublicMax:false,
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.multiple = obj.multiple;
        return dreamCharts.histogram;
    },
    /****************画直方图矩形************/
    drawBar:function(wStart,wEnd,hStart,hEnd,className){
        var dataMax = 0;
        if(this.getPublicMax == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxData;
        }
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        for(let i = 0;i < this.dataLength+1;i++){
            x = wStart+i*interval+this.multiple*interval;
            y = hEnd-Math.floor(this.data[i]/Math.ceil(dataMax/this.dataLength))*a-(this.data[i]%Math.ceil(dataMax/this.dataLength))/Math.ceil(dataMax/this.dataLength)*a;
            dreamCharts.SVG.paper.rect(x,y,interval*(1-this.multiple)*2,hEnd-y)
                .addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    }//num是一个系倍数，用来调节直方图方块的宽度
    /*addEventListener:function(arr,event,func){
        //console.log(arr);
        dreamCharts.addEvent(arr,event,func);
    },
    removeEventListener:function(arr,event,func){
        dreamCharts.removeEvent(arr,event,func);
    }*/
};

/****************折线图****************/
var polyLine = {
    dataLength:0,
    data:[],
    getPublicMax:false,
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.allOffset = obj.allOffset;
        return dreamCharts.polyLine;
    },
    /****************画折线************/
    drawPolyLine:function(wStart,wEnd,hStart,hEnd,className){
        var dataMax = 0;
        if(this.getPublicMax == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxData;
        }
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var d = "";
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        for(let i = 0;i < this.dataLength+1;i++){
            x = wStart+(i+this.allOffset)*interval;
            y = hEnd-Math.floor(this.data[i]/Math.ceil(dataMax/this.dataLength))*a-(this.data[i]%Math.ceil(dataMax/this.dataLength))/Math.ceil(dataMax/this.dataLength)*a;
            if(i == 0){
                d = "M"+x+" "+y;
            }
            else{
                d = d+"L"+x+" "+y+" ";
            }
        }
        return dreamCharts.SVG.paper.path(d)
            .addClass(className);
    }
};
dreamCharts.yAxis = yAxis;
dreamCharts.xAxis = xAixs;
dreamCharts.histogram = histogram;
dreamCharts.polyLine = polyLine;
dreamCharts.legend = legend;