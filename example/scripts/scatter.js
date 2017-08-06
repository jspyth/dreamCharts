/**
 * Created by DELL on 2017/7/12.
 */
var svg = dreamCharts.getSVG("#svg");

//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.1,wEnd = svg_width*0.9,hStart = svg_height*0.1,hEnd = svg_height*0.9;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标

//给数据
var data1 = [176,58,112,61,38,50,200,39,66,100,533,634];//因变量1
var data2 = [34,581,232,338,225,302,439,326,200,433,434,65];//因变量2
var data3 = [126,88,132,368,28,100,437,329,16,110,493,534];//因变量3
var dataX1= [21,22,22,41,63,67,79,81,8,55,89,98];//自变量
var dataX2= [11,40,32,51,57,57,7,81,40,5,89,89];//自变量
var dataX3= [15,12,52,41,77,16,23,81,88,55,95,5];//自变量
var dataR= [1500,1200,752,741,77,1600,230,810,880,556,987,115];//自变量
var dataR2= [500,1100,1752,74,177,1800,1230,1810,800,556,787,1125];//自变量
dreamCharts.calPublicMaxY([data1,data2,data3]);
var yAxis = dreamCharts.yAxis
    .settings(
    {
        data:data1,
        ticks:12,
        distanceY:25,
        direction:wEnd-wStart,
        xOffsetText:-45,
        yOffsetText:7,
        getPublicMaxY:true
    }
);

yAxis.drawYLine(wStart,hStart,hEnd)
    .attr({
        stroke:"black",
        strokeWidth:"1px"
    });
yAxis.drawYGraduationLine(wStart,hStart,hEnd,"yGraduationLine")
    .attr({
        stroke: "black",
        strokeWidth: "1px",
        opacity:0.5
    });
yAxis.drawYText(wStart,hStart,hEnd,"yText")
    .attr(
    {
        fill:"black",
        strokeWidth:"1px"
    }
);

/*******************x轴************************/
dreamCharts.calPublicMaxX([dataX1,dataX2,dataX3]);
var xAxis = dreamCharts.xAxis
    .settings({
        data:dataX1,
        distanceX:85,
        xOffsetText:-5,
        yOffsetText:30,
        ticks:10,
        direction:-(hEnd-hStart),
        allOffset:0,
        showCatogary:false,
        getPublicMaxX:true
    });
//x轴水平长线
xAxis.drawXLine(wStart,wEnd,hEnd)
    .attr({
        stroke:"black",
        strokeWidth:"1px"
    });

//x轴刻度线
xAxis.drawXGraduationLine(wStart,wEnd,hEnd,"xGraduationLine")
    .attr({
        stroke:"black",
        strokeWidth:"1px",
        opacity:1
    });

//x轴文本值
xAxis.drawXText(wStart,hEnd,wEnd,"xText")
    .attr({
        fill:"black",
        strokeWidth:"1px"
    });

var title = dreamCharts.title.settings({
    bigTitle:"一年网络攻击出现频率散点图",
    smallTitle:"本图所用网络攻击数据是自己构造的",
    yOffsetText:-25,
    xOffsetText:35
});

title.drawBigTitle(wStart,wEnd,hStart,"bigTitle")
    .attr({
        fill:"black",
        fontSize:"25px"
    });

title.drawSmallTitle(wStart-125,wEnd,hStart,"smallTitle")
    .attr({
        fill:"grey",
        fontSize:"14px",
        opacity:0.8
    });
var scatter1 = dreamCharts.scatter.settings({
    dataY:data1,
    dataX:dataX1,
    /*dataR:dataR,
    domain:[15,25],*/
    allOffset:1,
    radius:15,
    getPublicMaxY:true,
    getPublicMaxX:true
});

scatter1.drawScatter(wStart,wEnd,hStart,hEnd,"scatter1")
.attr({
        fill:"blue",
        opacity:0.6
    });

var scatter2 = dreamCharts.scatter.settings({
    dataY:data2,
    dataX:dataX2,
    //dataR:dataR2,
    //domain:[25,35],
    allOffset:1,
    radius:15,
    getPublicMaxY:true,
    getPublicMaxX:true
});

scatter2.drawScatter(wStart,wEnd,hStart,hEnd,"scatter2")
    .attr({
        fill:"yellow",
        opacity:0.6
    });

var scatter3 = dreamCharts.scatter.settings({
    dataY:data3,
    dataX:dataX3,
    allOffset:1,
    radius:15,
    getPublicMaxY:true,
    getPublicMaxX:true
});

scatter3.drawScatter(wStart,wEnd,hStart,hEnd,"scatter3")
    .attr({
        fill:"red",
        opacity:0.6
    });
