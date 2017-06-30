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
    removeEventListener:function(arr,event){
        for(var i = 0,len = arr.length; i < len;i++){
            if(event == "unmousemove"){
                arr[i].unmousemove();
            }
            else if(event == "unclick"){
                arr[i].unclick();
            }
            else if(event == "undblclick"){
                arr[i].undblclick();
            }
            else if(event == "unmousedown"){
                arr[i].unmousedown();
            }
            else if(event == "unmousemove"){
                arr[i].unmousemove();
            }
            else if(event == "unmouseout"){
                arr[i].unmouseout();
            }
            else if(event == "unmouseover"){
                arr[i].unmouseover();
            }
            else if(event == "untouchstart"){
                arr[i].untouchstart();
            }
            else if(event == "untouchmove"){
                arr[i].untouchmove();
            }
            else if(event == "untouchend"){
                arr[i].untouchend();
            }
            else if(event == "unhover"){
                arr[i].unhover();
            }
            else if(event == "undrag"){
                arr[i].undrag();
            }
            else{
                return 0;
            }
        }
    },
    catogaryColor5:function(index){
        var color = ["yellow","white","blue","green","silver"];
        var len = color.length;
        if(index < len){
            return color[index];
        }
        else{
            return color[index-len]
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
    ticks:0,
    direction:0,
    xOffsetText:0,
    yOffsetText:0,
    data:[],
    getPublicMax:new Boolean(false),
    settings:function(obj){
        this.data = obj.data;
        this.ticks = obj.ticks;
        this.distanceY = obj.distanceY;
        this.direction = obj.direction;
        this.xOffsetText = obj.xOffsetText;
        this.yOffsetText = obj.yOffsetText;
        this.getPublicMax = obj.getPublicMax;
        return dreamCharts.yAxis;
    },
    /****************画y轴长垂线************/
    drawYLine:function(wStart,hStart,hEnd){
        return dreamCharts.SVG.paper.line(wStart,hStart,wStart,hEnd);//纵轴垂直线
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性

    /****************画y轴刻度线************/
    drawYGraduationLine:function(wStart,hStart,hEnd,className){
        var interval = (hEnd-hStart-this.distanceY)/this.ticks;//刻度间的间隔
        for(let i = 0;i < this.ticks+1; i++) {
            dreamCharts.SVG.paper.line(wStart, hEnd - interval * i, wStart + this.direction,
                    hEnd - interval * i).addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，direction决定刻度线在长垂线左侧（负数）还是右侧（正数），绝对值决定长度

    /****************画y轴文本************/
    drawYText:function(wStart,hStart,hEnd,className){
        var interval = (hEnd-hStart-this.distanceY)/this.ticks;//刻度间的间隔
        var dataMax = 0;
        if(this.getPublicMax == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxData;
        }

        /******************画刻度文本********************/
        for(let i = 0;i < this.ticks+1; i++){
            dreamCharts.SVG.paper.text(wStart+this.xOffsetText,hEnd-(interval)*i+this.yOffsetText,(i*Math.ceil((dataMax/this.ticks))).toString())
                .addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    }//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，xOffsetText是决定文本沿水平方向左右移动，yOffsetText是决定文本沿垂直方向上下移动，dataMax是取出数据中最大的数据值
};

/*****************平行坐标系******************/
var parallel = {
    distanceY:0,
    ticks:0,
    direction:0,
    xOffsetText:0,
    yOffsetText:0,
    data:[],
    dataLength:0,
    settings:function(obj){
        this.data = obj.data;
        this.ticks = obj.ticks;
        this.distanceY = obj.distanceY;
        this.direction = obj.direction;
        this.xOffsetText = obj.xOffsetText;
        this.yOffsetText = obj.yOffsetText;
        this.dataLength = obj.data.length;
        return dreamCharts.parallel;
    },
    drawParallelYAxis:function(wStart,hStart,hEnd,flag,title,className){
        var point = [];
        var that = this;
        //竖直长线
        var YLine = dreamCharts.SVG.paper.line(wStart,hStart,wStart,hEnd).addClass("YLine "+className+"Line"+`${flag}`);
        //隐藏的矩形
        var hiddenRect = dreamCharts.SVG.paper.rect(wStart+this.direction,hStart,Math.abs(2*this.direction),hEnd-hStart).addClass("hiddenRect").attr({
            opacity:0
        }).mousemove(function(){
            var x = dreamCharts.toolOption.mousePosition().x;
            var y = dreamCharts.toolOption.mousePosition().y;
            var el = dreamCharts.SVG.select(".ten");
            if(el){
                el.remove();
            }
            else {
                var rect1 = dreamCharts.SVG.paper.rect(x - Math.abs(that.direction), y - 2, Math.abs(2 * that.direction), 4).attr({
                    stroke: "white",
                    opacity: 0.8,
                    borderOpacity: 1
                });
                var rect2 = dreamCharts.SVG.paper.rect(x - 2, y - Math.abs(that.direction), 4, Math.abs(2 * that.direction)).attr({
                    stroke: "white",
                    opacity: 0.8,
                    borderOpacity: 1
                });
                var group = dreamCharts.SVG.paper.g(rect1, rect2);
                group.addClass("ten");
            }
        }).mouseout(function(){
            var el = dreamCharts.SVG.select(".ten");
            if(el){
                el.remove();
            }
        }).click(function(){
            var ten = dreamCharts.SVG.select(".ten");
            if(ten) {
                ten.remove();
            }
            this.unmousemove();
            var flag = dreamCharts.SVG.selectAll(".sta").length;
            //console.log(that.flag%2);
            if(flag == 0) {
                dreamCharts.SVG.selectAll(".diagram").attr({
                    opacity: 0.1
                });
            }
            var diagram = dreamCharts.SVG.selectAll(".diagram");
            if((flag%2) == 1) {
                for (let i = 0; i < diagram.length; i++) {
                    diagram[i].unmouseover();
                }
            }
            else{
                //需要在下面写多数轴共同筛选的功能
                for (let i = 0; i < diagram.length; i++) {
                    diagram[i].mouseover(function () {
                        this.attr({
                            opacity: 1
                        });
                    });
                }
            }
            var y1 = dreamCharts.toolOption.mousePosition().y;
            var el = dreamCharts.SVG.selectAll(".sta");
            var len = el.length;
            if(len == 0){
                point.push(y1);
                dreamCharts.SVG.paper.line(wStart-Math.abs(that.direction),y1,wStart+Math.abs(that.direction),y1).attr({
                    stroke:"white"
                }).addClass("sta "+"sta"+`${len+1}`);
            }
            else{
                if(y1 > point[0]){
                    dreamCharts.SVG.paper.rect(wStart-Math.abs(that.direction),point[0],Math.abs(that.direction*2),y1-point[0]).attr({stroke:"white",opacity:0.2}).addClass("rectShow").dblclick(function(){
                        this.remove();
                        var someLine = dreamCharts.SVG.selectAll(".sta");
                        if(someLine) {
                            let len = someLine.length;
                            for(let i = 0;i < len;i++){
                                someLine[i].remove();
                            }
                        }
                        dreamCharts.SVG.selectAll(".diagram").attr({
                            opacity: 1
                        });
                    });
                }
                if(y1 < point[0]){
                    dreamCharts.SVG.paper.rect(wStart-Math.abs(that.direction),y1,Math.abs(that.direction*2),point[0]-y1).attr({stroke:"white",opacity:0.2}).addClass("rectShow").dblclick(function(){
                        this.remove();
                        var someLine = dreamCharts.SVG.selectAll(".sta");
                        if(someLine) {
                            let len = someLine.length;
                            for(let i = 0;i < len;i++){
                                someLine[i].remove();
                            }
                        }
                        dreamCharts.SVG.selectAll(".diagram").attr({
                            opacity: 1
                        });
                        if(dreamCharts.SVG.selectAll(".rectShow").length == 0){
                            that.flag =0;
                        }
                    });
                }
                dreamCharts.SVG.paper.line(wStart-Math.abs(that.direction),y1,wStart+Math.abs(that.direction),y1).attr({
                    stroke:"white"
                }).addClass("sta "+"sta"+`${len+1}`);
                point.push(y1);
            }

        });
        //刻度线
        var interval = (hEnd-hStart-this.distanceY)/this.ticks;//刻度间的间隔
        for(let i = 0;i < this.ticks+1; i++) {
            dreamCharts.SVG.paper.line(wStart, hEnd - interval * i, wStart + this.direction,
                    hEnd - interval * i).addClass("YGraduationLine "+className+"GraduationLine"+`${flag}`);
        }
        var YGraduationLine = dreamCharts.SVG.selectAll("."+className+"GraduationLine"+`${flag}`);
        //刻度文本
        var dataMax = Math.max.apply(Math,this.data[flag-1]);
        /******************画刻度文本********************/
        for(let i = 0;i < this.ticks+1; i++){
            dreamCharts.SVG.paper.text(wStart+this.xOffsetText,hEnd-(interval)*i+this.yOffsetText,(i*Math.ceil((dataMax/this.ticks))).toString())
                .addClass("YText "+className+"Text"+`${flag}`);
        }
        var YText = dreamCharts.SVG.selectAll("."+className+"Text"+`${flag}`);
        //标题
        var titleLen = title.length;
        dreamCharts.SVG.paper.text(wStart-titleLen*3.7,hStart-10,title).addClass("title"+" "+className+"Title"+`${flag}`);
        var Title = dreamCharts.SVG.select("."+className+"Title"+`${flag}`);
        var g = dreamCharts.SVG.paper.g(YLine,YGraduationLine,YText,Title,hiddenRect);
        g.addClass(className+" "+className+`${flag}`);
        return g;
    },
    drawParallelPoly:function(wStart,wEnd,hStart,hEnd,className){
        var len = this.data.length,len2 = this.data[0].length;//len表示数据的字段数，len2表示每个字段数据的个数
        var arr1 = [];//获取每个数据值
        var dataMax = [];//获取每个字段数据最大值
        for(let i = 0;i < len;i++){
            for(let j = 0;j < len2;j++){
                arr1.push(this.data[i][j]);
            }
        }
        for(let i = 0;i < len;i++){
            dataMax.push(Math.max.apply(Math,this.data[i]));
        }

        var interval = (wEnd-wStart)/this.dataLength;//x轴刻度间的间隔
        var d = "";
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        var arr2 = [];//每次获取一个字段数据
        var arr3 = [];//一个字段一个字段地存所有数据
        var firstIndex = 0;
        for(let i = 0;i < len2;i++){
            for(let g =0;g < len;g++){
                if(arr2.length == 0){
                    arr2.push(arr1[i]);
                    firstIndex = i;
                }
                else{
                    arr2.push(arr1[firstIndex+g*len2]);
                }
            }
            for(let xx = 0;xx < arr2.length;xx++){
                arr3.push(arr2[xx]);
            }
            arr2.splice(0,arr2.length);
        }
        for(let j = 0;j < len2;j++) {
            for (let i = 0; i < this.data.length; i++) {
                x = wStart + i * interval;
                y = hEnd - Math.floor(arr3.slice(0,len)[i] / Math.ceil(dataMax[i] / this.dataLength)) * a - (arr3.slice(0,len)[i] % Math.ceil(dataMax[i] / this.dataLength)) / Math.ceil(dataMax[i] / this.dataLength) * a;
                if (i == 0) {
                    d = "M" + x + " " + y;
                }
                else {
                    d = d + "L" + x + " " + y + " ";
                }
            }
            arr3.splice(0,len);
            dreamCharts.SVG.paper.path(d)
                .addClass(className);
            d = "";
        }
        return dreamCharts.SVG.selectAll("."+className);
    },
    drawParallelDiagram:function(wStart,wEnd,hStart,hEnd,className){
        var that = this;
        var len = this.data.length,len2 = this.data[0].length;
        var arr1 = [];
        var dataMax = [];
        for(let i = 0;i < len;i++){
            for(let j = 0;j < len2;j++){
                arr1.push(this.data[i][j]);
            }
        }
        for(let i = 0;i < len;i++){
            dataMax.push(Math.max.apply(Math,this.data[i]));
        }
        var interval = (wEnd-wStart)/this.dataLength;//x轴刻度间的间隔
        var arr2 = [];
        var arr3 = [];
        var firstIndex = 0;
        for(let i = 0;i < len2;i++){
            for(let g =0;g < len;g++){
                if(arr2.length == 0){
                    arr2.push(arr1[i]);
                    firstIndex = i;
                }
                else{
                    arr2.push(arr1[firstIndex+g*len2]);
                }
            }
            for(let xx = 0;xx < arr2.length;xx++){
                arr3.push(arr2[xx]);
            }
            arr2.splice(0,arr2.length);
        }
        var point = [];
        var d = "";
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        for(let j = 0;j < len2;j++) {
            for (let i = 0; i < len; i++) {
                x = wStart + i * interval;
                y = hEnd - Math.floor(arr3.slice(0,len)[i] / Math.ceil(dataMax[i] / this.dataLength)) * a - (arr3.slice(0,len)[i] % Math.ceil(dataMax[i] / this.dataLength)) / Math.ceil(dataMax[i] / this.dataLength) * a;
                if (i === 0) {
                    d = "M"+x+" "+y+" C";
                    point.push(x,y);
                    x = 0;
                }
                else {
                    d = d+(point[0]+0.5*interval)+" "+point[1]+" "+(point[0]+0.5*interval)+" "+y+" "+x+" "+y+" ";
                    point.splice(0,point.length);
                    point.push(x,y);
                }
            }
            arr3.splice(0,len);
            dreamCharts.SVG.paper.path(d)
                .addClass("diagram "+className+`${j+1}`);
            d = "";
            point.splice(0,point.length);
        }
        return dreamCharts.SVG.selectAll(".diagram");
    }
};

/****************x轴****************/
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
    getPublicMax:new Boolean(false),
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.multiple = obj.multiple;
        this.getPublicMax = obj.getPublicMax;
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
        for(let i = 0;i < this.dataLength;i++){
            x = wStart+i*interval+this.multiple*interval;
            y = hEnd-Math.floor(this.data[i]/Math.ceil(dataMax/this.dataLength))*a-(this.data[i]%Math.ceil(dataMax/this.dataLength))/Math.ceil(dataMax/this.dataLength)*a;
            dreamCharts.SVG.paper.rect(x,y,interval*(1-this.multiple)*2,hEnd-y)
                .addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    }//num是一个系倍数，用来调节直方图方块的宽度
};

/****************堆叠图****************/
var stack = {
    dataLength:0,
    data:[],
    multiple:0.5,
    getPublicMax:new Boolean(false),
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data[0].length;
        this.multiple = obj.multiple;
        this.getPublicMax = obj.getPublicMax;
        return dreamCharts.stack;
    },
    /****************画堆叠图************/
    drawStack:function(wStart,wEnd,hStart,hEnd,className){
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var dataMax = 0;
        if(this.getPublicMax == false){
            dataMax = dreamCharts.maxData;
        }
        else {
            dataMax = dreamCharts.maxData;
        }
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        var arr = [];//保存堆叠图每一个柱子的起始点y坐标
        var color = "";
        for(let j = 0;j < this.data.length;j++){
            color = dreamCharts.catogaryColor5(j);
            if(j == 0){
                for (let i = 0; i < this.dataLength; i++) {
                    x = wStart + i * interval + this.multiple * interval;
                    y = hEnd - Math.floor(this.data[j][i] / Math.ceil(dataMax / this.dataLength)) * a - (this.data[j][i] % Math.ceil(dataMax / this.dataLength)) / Math.ceil(dataMax / this.dataLength) * a;
                    dreamCharts.SVG.paper.rect(x, y, interval * (1 - this.multiple) * 2, hEnd - y)
                        .addClass(className+" "+className+`${j+1}`).attr({
                            fill:color
                        });
                    arr.push(y);
                }
            }
            else{
                color = dreamCharts.catogaryColor5(j);
                for (let i = 0; i < this.dataLength; i++) {
                    x = wStart + i * interval + this.multiple * interval;
                    y = hEnd - Math.floor(this.data[j][i] / Math.ceil(dataMax / this.dataLength)) * a - (this.data[j][i] % Math.ceil(dataMax / this.dataLength)) / Math.ceil(dataMax / this.dataLength) * a;

                    dreamCharts.SVG.paper.rect(x, y-(hEnd-arr[i]), interval * (1 - this.multiple) * 2, hEnd - y)
                        .addClass(className+" "+className+`${j+1}`).attr({
                            fill:color
                        });
                    arr[i] = y-(hEnd-arr[i]);
                }
            }
        }
    }//num是一个系倍数，用来调节直方图方块的宽度
};

/****************折线图****************/
var polyLine = {
    dataLength:0,
    data:[],
    allOffset:0,
    getPublicMax:new Boolean(false),
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.allOffset = obj.allOffset;
        this.getPublicMax = obj.getPublicMax;
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
    },
    drawDiagram:function(wStart,wEnd,hStart,hEnd,className){
        var dataMax = 0;
        if(this.getPublicMax == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxData;
        }
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var point = [];
        var d = "";
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        for(let i = 0;i < this.dataLength+1;i++){
            x = wStart+(i+this.allOffset)*interval;
            y = hEnd-Math.floor(this.data[i]/Math.ceil(dataMax/this.dataLength))*a-(this.data[i]%Math.ceil(dataMax/this.dataLength))/Math.ceil(dataMax/this.dataLength)*a;
            if(i == 0){
                d = "M"+x+" "+y+" C";
                point.push(x,y);
            }
            else{
                d = d+(point[0]+0.5*interval)+" "+point[1]+" "+(point[0]+0.5*interval)+" "+y+" "+x+" "+y+" ";
                point.splice(0,point.length);
                point.push(x,y);
            }
        }
        return dreamCharts.SVG.paper.path(d)
            .addClass(className);
    }
};

var toolOption = {
    //获取鼠标真实位置
    mousePosition:function(ev){
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.documentElement.scrollTop - document.body.clientTop
        };
    }
};
dreamCharts.yAxis = yAxis;
dreamCharts.xAxis = xAixs;
dreamCharts.histogram = histogram;
dreamCharts.stack = stack;
dreamCharts.polyLine = polyLine;
dreamCharts.legend = legend;
dreamCharts.parallel = parallel;
dreamCharts.toolOption = toolOption;