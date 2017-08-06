/**
 * Created by Zhangxiaoman on 2017/6/9.
 */
var dreamCharts = {
    SVG:{},//获取SVG对象
    maxDataY:0,//多组数值数组的最大数值
    minDataY:0,//多组数值数组的最大数值
    maxDataX:0,//多组数值数组的最大数值
    /****************计算多组数值数组的最大数值************/
    calPublicMaxY:function(arr){
        var maxDataArr = [];
        for(let i = 0;i < arr.length;i++){
            maxDataArr.push(Math.max.apply(Math,arr[i]));
    }
        this.maxDataY = Math.max.apply(Math,maxDataArr);
    },
    calPublicMinY:function(arr){
        var minDataArr = [];
        for(let i = 0;i < arr.length;i++){
            minDataArr.push(Math.min.apply(Math,arr[i]));
        }
        this.minDataY = Math.min.apply(Math,minDataArr);
    },
    calPublicMaxX:function(arr){
        var maxDataArr = [];
        for(let i = 0;i < arr.length;i++){
            maxDataArr.push(Math.max.apply(Math,arr[i]));
        }
        this.maxDataX = Math.max.apply(Math,maxDataArr);
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
    catogaryColor20:function(index){
        var color = ["#deb887","#5f9ea0","#7fff00","#d2691e","#ff7f50","yellow","white","blue","green","silver","#f0f8ff","#faebd7","#00ffff","#7fffd4","#f0ffff","#f5f5dc","#ffe4c4","#ffebcd","#8a2be2","#a52a2a"];
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
    ticks:10,
    direction:0,
    xOffsetText:0,
    yOffsetText:0,
    showCatogary:false,
    data:[],
    getPublicMaxY:new Boolean(false),
    settings:function(obj){
        if(obj.data){
            this.data = obj.data;
        }
        if(obj.showCatogary){
            if(obj.showCatogary == true){
                this.showCatogary = obj.showCatogary;
                this.ticks = obj.data.length;
            }
            else{
                this.ticks = obj.ticks;
            }
        }
        else{
            this.ticks = obj.ticks;
        }
        //this.ticks = obj.ticks;
        this.distanceY = obj.distanceY;
        this.direction = obj.direction;
        this.xOffsetText = obj.xOffsetText;
        this.yOffsetText = obj.yOffsetText;
        this.getPublicMaxY = obj.getPublicMaxY;
        return dreamCharts.yAxis;
    },
    /****************画y轴长垂线************/
    drawYLine:function(wStart,hStart,hEnd,className="YLine"){
        return dreamCharts.SVG.paper.line(wStart,hStart,wStart,hEnd).addClass(className);//纵轴垂直线
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性

    /****************画y轴刻度线************/
    drawYGraduationLine:function(wStart,hStart,hEnd,className="YGraduationLine"){
        var interval = (hEnd-hStart-this.distanceY)/this.ticks;//刻度间的间隔
        for(let i = 0;i < this.ticks+1; i++) {
            if(this.showCatogary == false) {
                dreamCharts.SVG.paper.line(wStart, hEnd - interval * i, wStart + this.direction,
                        hEnd - interval * i).addClass(className);
            }
            else{
                if(i > 0) {
                    dreamCharts.SVG.paper.line(wStart, hEnd - interval * i, wStart + this.direction,
                            hEnd - interval * i).addClass(className);
                }
            }
        }
        return dreamCharts.SVG.selectAll("."+className);
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，direction决定刻度线在长垂线左侧（负数）还是右侧（正数），绝对值决定长度

    /****************画y轴文本************/
    drawYText:function(wStart,hStart,hEnd,className="YText"){
        var interval = (hEnd-hStart-this.distanceY)/this.ticks;//刻度间的间隔
        var dataMax = 0;
        var dataMin = 0;
        if(this.getPublicMaxY == false){
            dataMax = Math.max.apply(Math,this.data);
            dataMin = Math.min.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxDataY;
            dataMin = dreamCharts.minDataY;
        }

        var textData = [];
        textData.push(dataMin);
        var a,k,b = 0;
        if(dataMin < 0) {
            a = dataMax - dataMin;
            k = a / this.ticks;
            b = 0;
            for (let i = 1; i < this.ticks + 1; i++) {
                b = i * k;
                if (b < Math.abs(dataMin)) {
                    b = Math.abs(dataMin) - Math.ceil(b);
                    textData.push(-b);
                }
                else {
                    b = Math.ceil(b);
                    textData.push(b - Math.abs(dataMin));
                }
            }
        }
        //console.log(dataMax);
        /******************画刻度文本********************/
        for(let i = 0;i < this.ticks+1; i++){
            if(this.showCatogary == false) {
                if(dataMin < 0) {
                    dreamCharts.SVG.paper.text(wStart + this.xOffsetText, hEnd - (interval) * i + this.yOffsetText, textData[i].toString())
                        .addClass(className);
                }else{
                    dreamCharts.SVG.paper.text(wStart + this.xOffsetText, hEnd - (interval) * i + this.yOffsetText,Math.ceil(i*dataMax/this.ticks).toString())
                        .addClass(className);
                }
            }
            else{
                if(i > 0) {
                    dreamCharts.SVG.paper.text(wStart + this.xOffsetText, hStart + (interval) * i + this.yOffsetText, this.data[i-1])
                        .addClass(className);
                }
            }
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
    ticks:0,
    xOffsetText:0,
    yOffsetText:0,
    data:[],
    showCatogary:false,
    getPublicMaxX:false,
    settings:function(obj){
        this.data = obj.data;
        if(obj.showCatogary){
            if(obj.showCatogary == true){
                this.dataLength = obj.data.length;
                this.showCatogary = obj.showCatogary;
            }
            else{
                this.dataLength = obj.ticks;
            }
        }
        else{
            if(obj.ticks){
                this.ticks = obj.ticks;
                this.dataLength = this.ticks;
            }
            else{
                this.dataLength = obj.data.length;
            }
        }
        if(obj.getPublicMaxX){
            this.getPublicMaxX = obj.getPublicMaxX;
        }
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
        if(this.showCatogary == true) {
            for (let i = 1; i < this.dataLength+1; i++) {
                dreamCharts.SVG.paper.line(wStart + i * interval, hEnd, wStart + i * interval,
                        hEnd + this.direction).addClass(className);
            }
        }
        else{
            for (let i = 1; i < this.dataLength+1; i++) {
                dreamCharts.SVG.paper.line(wStart + i * interval, hEnd, wStart + i * interval,
                        hEnd + this.direction).addClass(className);
            }
        }
        return dreamCharts.SVG.selectAll("."+className);
    },//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，direction决定刻度线在长垂线左侧（负数）还是右侧（正数），绝对值决定长度

    /****************画x轴文本************/
    drawXText:function(wStart,hEnd,wEnd,className){
        var interval = (wEnd-wStart-this.distanceX)/this.dataLength;//刻度间的间隔
        var dataMax = 0;
        if(this.showCatogary == false){
            if(this.getPublicMaxX == true){
                dataMax = dreamCharts.maxDataX;
            }
            else {
                dataMax = Math.max.apply(Math, this.data);
            }
        }
        /******************画刻度线和刻度文本********************/
        for(let i = 0;i < this.dataLength+1; i++){
            if(this.showCatogary == true) {
                dreamCharts.SVG.paper.text(wStart + (i + this.allOffset) * interval + this.xOffsetText, hEnd + this.yOffsetText, this.data[i])
                    .addClass(className);
                dreamCharts.scatter.showCatogaryX = false;
            }
            else{
                dreamCharts.SVG.paper.text(wStart + (i + this.allOffset) * interval + this.xOffsetText, hEnd + this.yOffsetText, (i * Math.ceil((dataMax / this.dataLength))).toString())
                    .addClass(className);
            }
        }
        return dreamCharts.SVG.selectAll("."+className);
    }//wStart,hStart,wEnd,heightEnd是直方图的起始宽高和终点宽高，Attr是给线段赋属性，distance是第一根刻度线距离y轴长垂线顶端的距离，dataLength是数据的个数，xOffsetText是决定文本沿水平方向左右移动，yOffsetText是决定文本沿垂直方向上下移动，catogary是类目数据数组
};

/****************直方图****************/
var histogram = {
    dataLength:0,
    data:[],
    multiple:0.5,
    getPublicMaxY:new Boolean(false),
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.multiple = obj.multiple;
        this.getPublicMaxY = obj.getPublicMaxY;
        return dreamCharts.histogram;
    },
    /****************画直方图矩形************/
    drawBar:function(wStart,wEnd,hStart,hEnd,className){
        var dataMax = 0;
        if(this.getPublicMaxY == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxDataY;
        }
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        for(let i = this.dataLength-1;i >= 0;i--){
            x = wStart+i*interval+this.multiple*interval;
            y = hEnd-Math.floor(this.data[i]/Math.ceil(dataMax/this.dataLength))*a-(this.data[i]%Math.ceil(dataMax/this.dataLength))/Math.ceil(dataMax/this.dataLength)*a;
            dreamCharts.SVG.paper.rect(x,y,interval*(1-this.multiple)*2,hEnd-y)
                .addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    },//num是一个系倍数，用来调节直方图方块的宽度
    drawBarHorizon:function(wStart,wEnd,hStart,hEnd,className){
        var dataMax = Math.max.apply(Math,this.data);
        var interval = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴刻度间的间隔
        var x = 0;
        var y = 0;
        var w = 0;
        var a = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴每段刻度之间的x坐标间隔
        for(let i = 0;i < this.dataLength;i++){
            x = wStart;
            y = hStart+dreamCharts.yAxis.distanceY+(i-1)*interval+this.multiple*interval;
            w = wEnd-Math.floor(this.data[i]/Math.ceil(dataMax/this.dataLength))*a-(this.data[i]%Math.ceil(dataMax/this.dataLength))/Math.ceil(dataMax/this.dataLength)*a;
            dreamCharts.SVG.paper.rect(x,y,wEnd-w,interval*(1-this.multiple)*2)
                .addClass(className);
        }
        return dreamCharts.SVG.selectAll("."+className);
    }
};

var scatter = {
    dataLengthY:0,
    dataLengthX:0,
    dataLength:0,
    dataX:[],
    dataY:[],
    dataR:[],
    domain:[],
    allOffset:0,
    getPublicMaxY:new Boolean(false),
    getPublicMaxX:new Boolean(false),
    radius:5,
    showCatogaryX:true,
    settings:function(obj){
        this.dataY = obj.dataY;
        this.dataX = obj.dataX;
        this.dataLength = obj.dataY.length;
        if(obj.dataR) {
            this.dataR = obj.dataR;
        }
        if(obj.domain) {
            this.domain = obj.domain;
        }
        this.allOffset = obj.allOffset;
        this.dataLengthY = dreamCharts.yAxis.ticks;
        if(this.showCatogaryX == true) {
            this.dataLengthX = dreamCharts.xAxis.ticks;
        }
        else{
            this.dataLengthX = this.dataX.length;
        }
        if(obj.radius) {
            this.radius = obj.radius;
        }
        if(obj.getPublicMaxY){
            this.getPublicMaxY = obj.getPublicMaxY;
        }
        if(obj.getPublicMaxX){
            this.getPublicMaxX = obj.getPublicMaxX;
        }
        return this;
    },
    /****************画散点图************/
    drawScatter:function(wStart,wEnd,hStart,hEnd,className) {
        var dataMaxX = 0;
        if (this.getPublicMaxX == false) {
            dataMaxX = Math.max.apply(Math, this.dataX);
        }
        else {
            dataMaxX = dreamCharts.maxDataX;
        }
        var aX = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLengthX,w=0;
        var dataMaxY = 0;
        if (this.getPublicMaxY == false) {
            dataMaxY = Math.max.apply(Math, this.dataY);
        }
        else {
            dataMaxY = dreamCharts.maxDataY;
        }
        var interval = (wEnd - wStart - dreamCharts.xAxis.distanceX) / this.dataLengthX;//x轴刻度间的间隔
        var x = 0,y = 0;
        var aY = (hEnd - hStart - dreamCharts.yAxis.distanceY) / this.dataLengthY;//y轴每段刻度之间的y坐标间隔
        var min = Math.min.apply(Math, this.dataR),max = Math.max.apply(Math, this.dataR);
        var num = max-min;
        for (let i = this.dataLength-1; i >= 0; i--) {
            if(this.showCatogaryX == true) {
                w = wEnd-Math.floor(this.dataX[i]/Math.ceil(dataMaxX/this.dataLengthX))*aX-(this.dataX[i]%Math.ceil(dataMaxX/this.dataLengthX))/Math.ceil(dataMaxX/this.dataLengthX)*aX;
                x = wStart + (wEnd-w);
            }
            else{
                x = wStart + (i + this.allOffset) * interval;
            }
            y = hEnd - Math.floor(this.dataY[i] / Math.ceil(dataMaxY / this.dataLengthY)) * aY - (this.dataY[i] % Math.ceil(dataMaxY / this.dataLengthY)) / Math.ceil(dataMaxY / this.dataLengthY) * aY;
            if((this.dataR.length != 0) && (this.domain.length != 0)) {
                if (this.dataR[i] - min == 0) {
                    this.radius = this.domain[0];
                }
                else {
                    this.radius = this.domain[0] + (this.dataR[i] - min) / num * (this.domain[1] - this.domain[0]);
                }
            }
            dreamCharts.SVG.paper.circle(parseInt(x),parseInt(y),this.radius)
                .addClass(className);
        }
        this.radius = 5;//重置默认值
        //this.dataR.splice(0,this.dataR.length);
        this.domain.splice(0,this.domain.length);
        return dreamCharts.SVG.selectAll("." + className);
    }
};

/****************堆叠图****************/
var stack = {
    dataLength:0,
    data:[],
    multiple:0.5,
    getPublicMaxY:new Boolean(false),
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data[0].length;
        this.multiple = obj.multiple;
        this.getPublicMaxY = obj.getPublicMaxY;
        return dreamCharts.stack;
    },
    /****************画堆叠图************/
    drawStack:function(wStart,wEnd,hStart,hEnd,className){
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var dataMax = 0;
        if(this.getPublicMaxY == false){
            dataMax = dreamCharts.maxDataY;
        }
        else {
            dataMax = dreamCharts.maxDataY;
        }
        var x = 0;
        var y = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        var arr = [];//保存堆叠图每一个柱子的起始点y坐标
        var color = "";
        for(let j = 0;j < this.data.length;j++){
            color = dreamCharts.catogaryColor20(j);
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
                color = dreamCharts.catogaryColor20(j);
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
    getPublicMaxY:new Boolean(false),
    settings:function(obj){
        this.data = obj.data;
        this.dataLength = obj.data.length;
        this.allOffset = obj.allOffset;
        this.getPublicMaxY = obj.getPublicMaxY;
        return dreamCharts.polyLine;
    },
    /****************画折线************/
    drawPolyLine:function(wStart,wEnd,hStart,hEnd,className){
        var dataMax = 0;
        if(this.getPublicMaxY == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxDataY;
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
        if(this.getPublicMaxY == false){
            dataMax = Math.max.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxDataY;
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

/****************矩形分区图****************/
var pack = {
    xOffsetText:-10,
    yOffsetText:30,
    settings:function(obj){
        this.data = obj.data;
        if(obj.xOffsetText){
            this.xOffsetText = obj.xOffsetText;
        }
        if(obj.yOffsetText){
            this.yOffsetText = obj.yOffsetText;
        }
        return dreamCharts.pack;
    },
    drawPack:function(wStart,wEnd,hStart,hEnd,className){
        var sum = 0,typeNum = [],allFloor = [],size = [],interval = 0,width = 0,dex1 = [],dex2 = [],a = 0,number = [],leafNum = 0,leafNumArr = [],dex11 = [],index = 0,len = [],sizeJson = [],dex1Json = [];
        var data = this.data;
        setIndex(data);
        setSize(data);
        getSize(data);
        getSomeArr(data);
        uniqueArr(typeNum);
        for(let i = 0;i < dex1.length;i++){
            dex11.push(dex1[i]);
        }
        for(let i = 0;i < number.length;i++){
            for(let j = 0;j < number[i];j++){
                a = a + allFloor[j];
            }
            for(let j  = 0;j < number[i];j++){
                dex2.splice(a,0,dex1[j]);
                sizeJson.splice(a,0,dex1Json[j]);
                a++;
            }
            for(let j  = 0;j < number[i];j++){
                a--;
            }
            dex1.splice(0,number[i]);
            dex1Json.splice(0,number[i]);
            allFloor.splice(0,number[i]);
        }
        var floorNum = Math.max.apply(Math,len)+2;
        var rectHeight = (hEnd-hStart)/floorNum;
        var color = "";
        for(let i = 1;i < floorNum;i++){
            getLeafNum(data,i);
            leafNumArr.push(leafNum);
            leafNum = 0;
        }

        for(let j = leafNumArr.length;j >=0;j--) {
            color = dreamCharts.catogaryColor20(j);
            if (j == leafNumArr.length) {
                svg.paper.rect(wStart, hStart, wEnd - wStart, rectHeight).attr({
                    stroke: "black",
                    fill: color
                }).addClass(className+" "+className + "1");
                svg.paper.text(wStart + (wEnd - wStart) / 2 + this.xOffsetText, hStart + this.yOffsetText, data.name).attr({
                    fill: "black"
                });
            }
            else {
                interval = 0;
                for (let g = 0; g < leafNumArr[j]; g++) {
                    width = dex2[g] / dex11[dex11.length - 1] * (wEnd - wStart);
                    if (g == 0) {
                        svg.paper.rect(wStart, hStart + (j + 1) * rectHeight, width, rectHeight).attr({
                            stroke: "black",
                            fill: color
                        }).addClass(className+" "+className + `${j + 2}`);
                        svg.paper.text(wStart + width / 2 + this.xOffsetText, hStart + (j + 1) * rectHeight + this.yOffsetText, sizeJson[g].name).attr({
                            fill: "black"
                        });
                    }
                    else {
                        svg.paper.rect(wStart + interval, hStart + (j + 1) * rectHeight, width, rectHeight).attr({
                            stroke: "black",
                            fill: color
                        }).addClass(className+" "+className + `${j + 2}`);
                        svg.paper.text(wStart + interval + width / 2 + this.xOffsetText, hStart + (j + 1) * rectHeight + this.yOffsetText, sizeJson[g].name).attr({
                            fill: "black"
                        });
                    }
                    interval = interval + width;
                }
                dex2.splice(0, leafNumArr[j]);
                sizeJson.splice(0, leafNumArr[j]);
            }
        }

        function uniqueArr(arr){
            var res = [];
            var json = {};
            var index = 0;
            for(let i = 0;i < arr.length;i++){
                if(!json[arr[i]]){
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            for(let i = 0;i < res.length;i++){
                for(let j = 0;j < typeNum.length;j++){
                    if(typeNum[j] == res[i]){
                        index++;
                    }
                }
                number.push(index);
                index = 0;
            }
            return res;
        }

        function setIndex(obj){
            index++;
            obj.children.forEach(function(e){
                e.number = index;
                if(e.children){
                    e.type = index;
                    len.push(index);
                    setIndex(e);
                    index--;
                }
                else{
                    e.type = 0;
                }
            });
        }
        function getLeafNum(obj,i){//获取树每层叶子节点
            obj.children.forEach(function(e){
                if(e.number == i){
                    leafNum++;
                }
                if(e.children){
                    getLeafNum(e,i);
                }
            });
        }

        /***************给每个有儿子的父亲节点赋一个size**************/
        function setSize(obj){
            obj.children.forEach(function (e) {
                if(!e.size){
                    for(let i = 0;i < e.children.length;i++){
                        if(i == e.children.length-1){
                            allFloor.push(e.children.length);//checked
                        }
                        if(e.children[i].children){
                            setSize(e);
                        }
                        else{
                            sum = sum + e.children[i].size;
                            dex2.push(e.children[i].size);
                            sizeJson.push({"name":e.children[i].name,"size":e.children[i].size});
                        }
                    }
                    e.size = sum;//checked
                    if(size.length == 0){
                        size.push({"name":e.name,"number":e.number,"size":e.size});//checked
                    }
                    else{
                        if(e.number == size[0].number){
                            e.size = sum - size[0].size;
                            size[0].size = sum;
                        }
                        else{
                            size.splice(0,size.length);
                            size.push({"name":e.name,"size":e.size,"number":e.number});
                        }
                    }
                }
            });
        }

        function getSize(obj){
            obj.children.forEach(function (e) {
                if(e.children){
                    getSize(e);
                    dex1.push(e.size);
                    dex1Json.push({"name":e.name,"size":e.size});
                    typeNum.push(e.type);
                }
            });
        }
        function getSomeArr(obj){
            var sum = 0;
            obj.children.forEach(function (e) {
                sum = sum + e.size;
                if(!e.children){
                    dex2.push(e.size);
                    sizeJson.push({"name":e.name,"size":e.size});
                }
            });
            dex1.push(sum);
            dex1Json.push({"name":obj.name,"size":sum});
        }
    }
};

var box = {
    data:[],
    dataLength:0,
    multiple:0.6,
    getPublicMaxY:false,
    settings:function(obj){
        this.data = obj.data;
        if(obj.multiple){
            this.multiple = obj.multiple;
        }
        if(obj.getPublicMaxY){
            this.getPublicMaxY = obj.getPublicMaxY;
        }
        if(dreamCharts.yAxis.ticks){
            this.dataLength = dreamCharts.yAxis.ticks;
        }
        return dreamCharts.box;
    },
    getNegativePosition,
    /****************画箱型图************/
    drawBoxLine:function(wStart,wEnd,hStart,hEnd,className) {
        var median = dreamCharts.toolOption.getMedian(this.data);
        var arr = dreamCharts.toolOption.getQuartile(this.data);
        var dataMax = 0;
        var dataMin = 0;
        if(this.getPublicMaxY == false){
            dataMax = Math.max.apply(Math,this.data);
            dataMin = Math.min.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxDataY;
            dataMin = dreamCharts.minDataY;
        }
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var q1,q2,max,min = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        if(dataMin < 0) {
            if (arr[0] < 0) {
                q1 = hEnd - Math.floor((Math.abs(dataMin) - Math.abs(arr[0])) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(dataMin) - Math.abs(arr[0])) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            else {
                q1 = hEnd - Math.floor((Math.abs(arr[0]) + Math.abs(dataMin)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(arr[0]) + Math.abs(dataMin)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            if (arr[1] < 0) {
                q2 = hEnd - Math.floor((Math.abs(dataMin) - Math.abs(arr[1])) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(dataMin) - Math.abs(arr[1])) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            else {
                q2 = hEnd - Math.floor((Math.abs(arr[1]) + Math.abs(dataMin)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(arr[1]) + Math.abs(dataMin)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            if (arr[2] < 0) {
                min = hEnd - Math.floor((Math.abs(dataMin) - Math.abs(arr[2])) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(dataMin) - Math.abs(arr[2])) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            else {
                min = hEnd - Math.floor((Math.abs(arr[2]) + Math.abs(dataMin)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(arr[2]) + Math.abs(dataMin)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            if (arr[3] < 0) {
                max = hEnd - Math.floor((Math.abs(dataMin) - Math.abs(arr[3])) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(dataMin) - Math.abs(arr[3])) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            else {
                max = hEnd - Math.floor((Math.abs(arr[3]) + Math.abs(dataMin)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(arr[3]) + Math.abs(dataMin)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
        }
        else{
            if (arr[0] < 0) {
                q1 = hEnd - Math.floor(arr[0] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[0] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            else {
                q1 = hEnd - Math.floor(arr[0] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[0] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            if (arr[1] < 0) {
                q2 = hEnd - Math.floor(arr[1] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[1] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            else {
                q2 = hEnd - Math.floor(arr[1] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[1] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            if (arr[2] < 0) {
                min = hEnd - Math.floor(0 / Math.ceil((dataMax) / this.dataLength)) * a - (0 % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            else {
                min = hEnd - Math.floor(arr[2] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[2] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            if (arr[3] < 0) {
                max = hEnd - Math.floor(0 / Math.ceil((dataMax) / this.dataLength)) * a - (arr[3] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            else {
                max = hEnd - Math.floor(arr[3] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[3] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
        }
        var dreamChart = dreamCharts.SVG.paper;
        dreamChart.line(wStart+this.multiple*interval,max,wStart+this.multiple*interval+interval*(1-this.multiple)*2,max).attr({
            stroke:"rgb(233,98,9)",
            strokeWidth:"1px"
        }).addClass(className);
        dreamChart.line(wStart+this.multiple*interval,min,wStart+this.multiple*interval+interval*(1-this.multiple)*2,min).attr({
            stroke:"rgb(233,98,9)",
            strokeWidth:"1px"
        }).addClass(className);
        dreamChart.line(wStart+interval,max,wStart+interval,q2).attr({
            stroke:"rgb(233,98,9)",
            strokeWidth:"1px"
        }).addClass(className);
        dreamChart.line(wStart+interval,q1,wStart+interval,min).attr({
            stroke:"rgb(233,98,9)",
            strokeWidth:"1px"
        }).addClass(className);
        return dreamCharts.SVG.selectAll("."+className);
    },
    drawBoxRect:function(wStart,wEnd,hStart,hEnd,className){
        var arr = dreamCharts.toolOption.getQuartile(this.data);
        //console.log(arr);
        var dataMax = 0;
        var dataMin = 0;
        if(this.getPublicMaxY == false){
            dataMax = Math.max.apply(Math,this.data);
            dataMin = Math.min.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxDataY;
            dataMin = dreamCharts.minDataY;
        }
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var q1,q2 = 0;
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        if(dataMin < 0) {
            if (arr[0] < 0) {
                q1 = hEnd - Math.floor((Math.abs(dataMin) - Math.abs(arr[0])) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(dataMin) - Math.abs(arr[0])) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            else {
                q1 = hEnd - Math.floor((Math.abs(arr[0]) + Math.abs(dataMin)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(arr[0]) + Math.abs(dataMin)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            if (arr[1] < 0) {
                q2 = hEnd - Math.floor((Math.abs(dataMin) - Math.abs(arr[1])) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(dataMin) - Math.abs(arr[1])) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            else {
                q2 = hEnd - Math.floor((Math.abs(arr[1]) + Math.abs(dataMin)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(arr[1]) + Math.abs(dataMin)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
        }
        else{
            if (arr[0] < 0) {
                q1 = hEnd - Math.floor(arr[0] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[0] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            else {
                q1 = hEnd - Math.floor(arr[0] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[0] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            if (arr[1] < 0) {
                q2 = hEnd - Math.floor(arr[1] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[1] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            else {
                q2 = hEnd - Math.floor(arr[1] / Math.ceil((dataMax) / this.dataLength)) * a - (arr[1] % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
        }
        dreamCharts.SVG.paper.rect(wStart+this.multiple*interval,q2,interval*(1-this.multiple)*2,q1-q2).attr({
            stroke:"rgb(233,98,9)",
            strokeWidth:"1px",
            fill:"white"
        }).addClass(className);

        return dreamCharts.SVG.selectAll("."+className);
    },
    drawBoxMedian:function(wStart,wEnd,hStart,hEnd,className){
        var median = dreamCharts.toolOption.getMedian(this.data);
        var dataMax = 0;
        var dataMin = 0;
        var yMedian = 0;
        if(this.getPublicMaxY == false){
            dataMax = Math.max.apply(Math,this.data);
            dataMin = Math.min.apply(Math,this.data);
        }
        else{
            dataMax = dreamCharts.maxDataY;
            dataMin = dreamCharts.minDataY;
        }
        var interval = (wEnd-wStart-dreamCharts.xAxis.distanceX)/this.dataLength;//x轴刻度间的间隔
        var a = (hEnd-hStart-dreamCharts.yAxis.distanceY)/this.dataLength;//y轴每段刻度之间的y坐标间隔
        if(dataMin < 0) {
            if (median < 0) {
                yMedian = hEnd - Math.floor((Math.abs(dataMin) - Math.abs(median)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(dataMin) - Math.abs(median)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
            else {
                yMedian = hEnd - Math.floor((Math.abs(median) + Math.abs(dataMin)) / Math.ceil((dataMax - dataMin) / this.dataLength)) * a - ((Math.abs(median) + Math.abs(dataMin)) % Math.ceil((dataMax - dataMin) / this.dataLength)) / Math.ceil((dataMax - dataMin) / this.dataLength) * a;
            }
        }else{
            if (median < 0) {
                yMedian = hEnd - Math.floor(median / Math.ceil((dataMax) / this.dataLength)) * a - (median % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
            else {
                yMedian = hEnd - Math.floor(median / Math.ceil((dataMax) / this.dataLength)) * a - (median % Math.ceil((dataMax) / this.dataLength)) / Math.ceil((dataMax) / this.dataLength) * a;
            }
        }
        dreamCharts.SVG.paper.line(wStart+this.multiple*interval,yMedian,wStart+this.multiple*interval+interval*(1-this.multiple)*2,yMedian).attr({
            stroke:"rgb(233,98,9)",
            strokeWidth:"3px"
        }).addClass(className);
        return dreamCharts.SVG.selectAll("."+className);
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
    },
    getQuartile:function(data){
        var arr = [];
        var max,min,q1_id,q2_id,q1,q2 = 0;
        var s1 = [];
        for(let i = 0;i < data.length;i++){
            s1.push(data[i]);
        }
        s1.sort(zheng);
        function zheng(a,b){
            return a-b;
        }
        var len = s1.length;
        q1_id = (len+1)*0.25;
        q2_id = (len+1)*0.75;
        if(q1_id %2 == 0){
            q1 = s1[q1_id-1];
            q2 = s1[q2_id-1];
            min = q1 - (q2-q1)*0.5;
            max = q2 + (q2-q1)*0.5;
            arr.push(q1,q2,min,max);
        }
        else{
            q1 = s1[Math.floor(q1_id)-1]+(s1[Math.floor(q1_id)]-s1[Math.floor(q1_id)-1])*(q1_id-Math.floor(q1_id));
            q2 = s1[Math.floor(q2_id)-1]+(s1[Math.floor(q2_id)]-s1[Math.floor(q2_id)-1])*(q2_id-Math.floor(q2_id));
            min = q1 - (q2-q1)*0.5;
            max = q2 + (q2-q1)*0.5;
            arr.push(q1,q2,min,max);
        }
        return arr;
    },
    //获取跟随数据数组排序之后的类目排序数组
    arrayReverse:function(data,catogary){
        var s1 = [];
        for(let i = 0;i < data.length;i++){
            s1.push(data[i]);
        }

        data.sort(zheng);
        function zheng(a,b){
            return b-a;
        }
        var index = [];
        for(let i = 0;i < s1.length;i++){
            for(let j = 0;j < catogary.length;j++){
                if((s1[j] == data[i])&&(this.checkArray(j,index) == false)){
                    index.push(j);
                    break;
                }
            }
        }
        var catogary2 = [];
        for(let i = 0;i < catogary.length;i++){
            catogary2.push(catogary[index[i]]);
        }
        return catogary2;
    },
    sort:function(data){
        var s1 = [];
        for(let i = 0;i < data.length;i++){
            s1.push(data[i]);
        }
        s1.sort(zheng);
        function zheng(a,b){
            return a-b;
        }
        return s1;
    },
    reverse:function(data){
        var s1 = [];
        for(let i = 0;i < data.length;i++){
            s1.push(data[i]);
        }
        s1.sort(zheng);
        function zheng(a,b){
            return b-a;
        }
        return s1;
    },
    arraySort:function(data,catogary){
        var s1 = [];
        for(let i = 0;i < data.length;i++){
            s1.push(data[i]);
        }

        data.sort(zheng);
        function zheng(a,b){
            return a-b;
        }
        var index = [];
        for(let i = 0;i < s1.length;i++){
            for(let j = 0;j < catogary.length;j++){
                if((s1[j] == data[i])&&(this.checkArray(j,index) == false)){
                    index.push(j);
                    break;
                }
            }
        }
        var catogary2 = [];
        for(let i = 0;i < catogary.length;i++){
            catogary2.push(catogary[index[i]]);
        }
        return catogary2;
    },
    uniqueArr:function(arr){//数组去重
        var res = [];
        var json = {};
        for(var i = 0;i < arr.length;i++){
            if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    },
    getMedian:function(arr){
        var s1 = [],median = 0;
        for(let i = 0;i < arr.length;i++){
            s1.push(arr[i]);
        }
        s1.sort(zheng);
        function zheng(a,b){
            return a-b;
        }
        var len = s1.length;
        if(len % 2 == 0){
            median = (s1[len/2-1]+s1[len/2])/2;
        }
        else{
            median = s1[Math.floor(len/2)];
        }
        return median;
    },
    checkArray:function(t,arr){//判断元素是否在数组中
        for(let i = 0;i < arr.length;i++){
            if(t == arr[i]){
                return true;
            }
        }
        return false;
    }/*,
    getScale:function(data,domain){
        var min = Math.min.apply(Math, this.data),max = Math.max.apply(Math, this.data),radius = 0;
        var num = max-min;
        var arr = [];
        for(let i = data.length-1;i >= 0;i--){
            if(data[i]-min == 0){
                radius = domain[0];
                arr.push(radius);
            }
            else{
                radius = domain[0]+(data[i]-min)/num*(domain[1]-domain[0]);
                arr.push(radius);
            }
        }
        console.log(arr);
        return arr;
    }*/
};

var title = {
    xOffsetText:0,//用于对标题进行左右移动，同时作用于主标题和副标题
    yOffsetText:0,//用于对标题进行上下移动，同时作用于主标题和副标题
    bigTitle:"",
    smallTitle:"",
    settings:function(obj){
        this.bigTitle = obj.bigTitle;
        this.smallTitle = obj.smallTitle;
        this.xOffsetText = obj.xOffsetText;
        this.yOffsetText = obj.yOffsetText;
        return dreamCharts.title;
    },
    drawBigTitle:function(wStart,wEnd,hStart,className){
        var len = this.bigTitle.length;
        return dreamCharts.SVG.paper.text((wEnd-wStart)/2-len*4.7+this.xOffsetText,hStart+this.yOffsetText-15,this.bigTitle).addClass(className);
    },
    drawSmallTitle:function(wStart,wEnd,hStart,className){
        var len = this.smallTitle.length;
        return dreamCharts.SVG.paper.text((wEnd-wStart)/2-len*4.7+this.xOffsetText,hStart+this.yOffsetText+15,this.smallTitle).addClass(className);
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
dreamCharts.title = title;
dreamCharts.scatter = scatter;
dreamCharts.pack = pack;
dreamCharts.box = box;

