/**
 * Created by DELL on 2017/6/9.
 */
var svg = dreamCharts.getSVG("#svg");

//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.1,wEnd = svg_width*0.9,hStart = svg_height*0.1,hEnd = svg_height*0.9;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标

//给数据
var data = [176,58,112,61,38,50,200,39,66,100,333,234];
var catogary = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

var yAxis = dreamCharts.yAxis
    .settings(
    {
        data:data,
        ticks:20,
        distanceY:25,
        direction:wEnd-wStart,
        xOffsetText:-45,
        yOffsetText:7,
        getPublicMaxY:false
    }
);

yAxis.drawYLine(wStart,hStart,hEnd)
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px"
    });
yAxis.drawYGraduationLine(wStart,hStart,hEnd,"yGraduationLine")
    .attr({
        stroke: "white",
        strokeWidth: "1px",
        opacity:0.5
    });
yAxis.drawYText(wStart,hStart,hEnd,"yText")
    .attr(
    {
        fill:"rgb(233,98,9)",
        strokeWidth:"1px"
    }
);

/*******************x轴************************/
var xAxis = dreamCharts.xAxis
    .settings({
        data:catogary,
        distanceX:85,
        xOffsetText:-15,
        yOffsetText:30,
        direction:15,
        allOffset:1,
        showCatogary:true
    });
//x轴水平长线
xAxis.drawXLine(wStart,wEnd,hEnd)
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px"
    });

//x轴刻度线
xAxis.drawXGraduationLine(wStart,wEnd,hEnd,"xGraduationLine")
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px",
        opacity:1
    });

//x轴文本值
xAxis.drawXText(wStart,hEnd,wEnd,"xText")
    .attr({
        fill:"rgb(233,98,9)",
        strokeWidth:"1px"
    });
/*******************直方图矩形方块******************/
var histogram1 = dreamCharts.histogram
    .settings({
        data:data,
        multiple:0.7,
        getPublicMaxY:false
    });

histogram1.drawBar(wStart,wEnd,hStart,hEnd,"bar1")
    .attr({
        stroke:"white",
        strokeWidth:"3px",
        fill:"#0000ff"
    });

var title = dreamCharts.title.settings({
    bigTitle:"一年网络攻击出现频率柱形图",
    smallTitle:"本图所用网络攻数据是自己构造的",
    yOffsetText:-25,
    xOffsetText:35
});

title.drawBigTitle(wStart,wEnd,hStart,"bigTitle")
    .attr({
        stroke:"white",
        fill:"white",
        fontSize:"25px"
    });

title.drawSmallTitle(wStart-125,wEnd,hStart,"smallTitle")
    .attr({
        stroke:"white",
        fill:"white",
        fontSize:"14px",
        opacity:0.8
    });




