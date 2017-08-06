/**
 * Created by DELL on 2017/7/10.
 */
var svg = dreamCharts.getSVG("#svg");
//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.1,wEnd = svg_width*0.95,hStart = svg_height*0.1,hEnd = svg_height*0.9;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标

var catogary = ["cat","dog","mouse","bird","fish","graffit","elephant","banana","app","pear","bear","flower","China","America","Pc","Ad","Africa"];
var data = [276,180,412,561,238,450,1000,139,66,100,133,234,66,452,85,144,231];

var cat = dreamCharts.toolOption.arrayReverse(data,catogary);//获取排序后的类目数组

var yAxis = dreamCharts.yAxis
    .settings(
    {
        data:cat,
        ticks:6,
        distanceY:25,
        direction:0,
        xOffsetText:-75,
        yOffsetText:-1,
        showCatogary:true
    }
);
yAxis.drawYLine(wStart,hStart,hEnd)
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px"
    });
yAxis.drawYGraduationLine(wStart,hStart,hEnd,"yGraduationLine")
    .attr({
        stroke: "rgb(233,98,9)",
        strokeWidth: "1px"
    });
yAxis.drawYText(wStart,hStart,hEnd,"yText")
    .attr(
    {
        fill:"yellow",
        strokeWidth:"1px"
    }
);
/*******************x轴************************/
var xAxis = dreamCharts.xAxis
    .settings({
        data:data,
        distanceX:85,
        xOffsetText:-15,
        yOffsetText:30,
        direction:hStart-hEnd,
        allOffset:0,
        ticks:16,
        showCatogary:false
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
        strokeWidth:"1px",
        stroke:"white",
        opacity:0.6
    });
//x轴文本值
xAxis.drawXText(wStart,hEnd,wEnd,"xText")
    .attr({
        fill:"yellow",
        strokeWidth:"1px"
    });

var histogram1 = dreamCharts.histogram
    .settings({
        data:data,
        multiple:0.65,
        getPublicMax:false
    });
histogram1.drawBarHorizon(wStart,wEnd,hStart,hEnd,"bar1")
    .attr({
        stroke:"white",
        strokeWidth:"2px",
        fill:"#0000ff"
    });

var title = dreamCharts.title.settings({
    bigTitle:"词汇出现频率柱形图",
    smallTitle:"本图所用词汇频率数据是自己构造的",
    yOffsetText:-25,
    xOffsetText:0
});
title.drawBigTitle(wStart,wEnd,hStart,"bigTitle")
    .attr({
        stroke:"white",
        fill:"white",
        fontSize:"25px"
    });
title.drawSmallTitle(wStart-65,wEnd,hStart,"smallTitle")
    .attr({
        stroke:"white",
        fill:"white",
        fontSize:"14px",
        opacity:0.8
    });