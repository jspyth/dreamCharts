/**
 * Created by zhangxiaoman on 2017/7/28.
 */
var svg = dreamCharts.getSVG("#svg");
//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.25,wEnd = svg_width*0.85,hStart = svg_height*0.2,hEnd = svg_height*0.9;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标
var data1 = [176,58,112,61,38,50,200,39,66,100,333,122,30];
var data2 = [222,34,66,12,256,444,56,98,56,122,11,12];
dreamCharts.calPublicMaxY([data1,data2]);//如果多列数据就使用这个方法
dreamCharts.calPublicMinY([data1,data2]);//如果多列数据就使用这个方法
var yAxis = dreamCharts.yAxis
    .settings(
    {
        data:data1,
        ticks:20,
        distanceY:25,
        direction:-18,
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

var box1 = dreamCharts.box.settings({
    data:data1,
    getPublicMaxY:true
});

box1.drawBoxLine(wStart,wEnd,hStart,hEnd,"boxLine").attr({
    stroke:"#434eaf",
    strokeWidth:"3px"
});

box1.drawBoxRect(wStart,wEnd,hStart,hEnd,"boxRect").attr({
    fill:"pink"
});

box1.drawBoxMedian(wStart,wEnd,hStart,hEnd,"boxMedian").attr({
    fill:"red",
    strokeWidth:"5px"
});
